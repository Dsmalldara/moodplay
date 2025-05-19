import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

/**
 * This is a secure API route that proxies requests to the Spotify API
 * It keeps the access token on the server side and never exposes it to the client
 */
export async function GET(request: NextRequest) {
  const accessToken = (await cookies()).get("spotify_access_token")?.value

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get the endpoint from the query parameter
  const endpoint = request.nextUrl.searchParams.get("endpoint")

  if (!endpoint) {
    return NextResponse.json({ error: "Missing endpoint parameter" }, { status: 400 })
  }

  try {
    // Make the request to Spotify API
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    // If token is expired, return 401 so client can redirect to refresh
    if (response.status === 401) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 })
    }

    // Return the response from Spotify
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Error proxying request to Spotify:", error)
    return NextResponse.json({ error: "Failed to fetch from Spotify" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const accessToken = (await cookies()).get("spotify_access_token")?.value

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get the endpoint from the query parameter
  const endpoint = request.nextUrl.searchParams.get("endpoint")

  if (!endpoint) {
    return NextResponse.json({ error: "Missing endpoint parameter" }, { status: 400 })
  }

  try {
    // Get the request body
    const body = await request.json()

    // Make the request to Spotify API
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    // If token is expired, return 401 so client can redirect to refresh
    if (response.status === 401) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 })
    }

    // Return the response from Spotify
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Error proxying request to Spotify:", error)
    return NextResponse.json({ error: "Failed to fetch from Spotify" }, { status: 500 })
  }
}
