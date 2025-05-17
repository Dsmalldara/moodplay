import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// Environment variables
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || "http://localhost:3000/api/callback"

/**
 * GET handler for /api/callback
 * Handles the callback from Spotify's authorization
 */
export async function GET(request: NextRequest) {
  // Get the query parameters from the request URL
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  // Get the stored state from cookies
  const storedState = (await cookies()).get("spotify_auth_state")?.value

  // If state doesn't match or code is missing, return error
  if (!state || state !== storedState || !code) {
    return NextResponse.redirect(new URL("/error?error=state_mismatch", request.url))
  }

  // Clear the state cookie
  (await
        // Clear the state cookie
        cookies()).delete("spotify_auth_state")

  try {
    // Exchange the code for an access token
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error("Failed to get access token")
    }

    const tokenData = await tokenResponse.json();

    // Store tokens in cookies (in a real app, you might want to use a more secure method)
    (await
          // Store tokens in cookies (in a real app, you might want to use a more secure method)
          cookies()).set("spotify_access_token", tokenData.access_token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: tokenData.expires_in,
      secure: process.env.NODE_ENV === "production",
    })

    if (tokenData.refresh_token) {
      (await cookies()).set("spotify_refresh_token", tokenData.refresh_token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        secure: process.env.NODE_ENV === "production",
      })
    }

    // Redirect to the dashboard or home page after successful login
    return NextResponse.redirect(new URL("/", request.url))
  } catch (error) {
    console.error("Error during token exchange:", error)
    return NextResponse.redirect(new URL("/error?error=token_exchange_failed", request.url))
  }
}
