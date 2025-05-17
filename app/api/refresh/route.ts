import {  NextResponse } from "next/server"
import { cookies } from "next/headers"

// Environment variables
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string

/**
 * GET handler for /api/refresh
 * Refreshes the Spotify access token using the refresh token
 */
export async function GET() {
  // Get the refresh token from cookies
  const refreshToken = (await cookies()).get("spotify_refresh_token")?.value

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token available" }, { status: 401 })
  }

  try {
    // Request a new access token
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to refresh token")
    }

    const data = await response.json()

    // Update the access token cookie
    ;(await
          // Update the access token cookie
          cookies()).set("spotify_access_token", data.access_token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: data.expires_in,
      secure: process.env.NODE_ENV === "production",
    })

    // Update the refresh token if a new one was provided
    if (data.refresh_token) {
      (await cookies()).set("spotify_refresh_token", data.refresh_token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        secure: process.env.NODE_ENV === "production",
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error refreshing token:", error)
    return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 })
  }
}
