import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Environment variables
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || "http://localhost:3000/api/callback"

/**
 * Generates a random string of specified length
 */
function generateRandomString(length: number): string {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let text = ""

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

/**
 * GET handler for /api/login
 * Redirects the user to Spotify's authorization page
 */
export async function GET() {
  // Generate a random state string for security
  const state = generateRandomString(16)

  // Define the scopes we need
  const scope = "user-read-private user-read-email";

  // Store the state in cookies for verification when the user returns
  (await cookies()).set("spotify_auth_state", state, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 5, // 5 minutes
    secure: process.env.NODE_ENV === "production",
  })

  // Build the authorization URL with query parameters
  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
    state: state,
  })

  // Redirect to Spotify authorization page
  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`)
}
