import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/playlist/create", "/mood", "/presets"]

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))

  // If it's a protected route, check for the access token
  if (isProtectedRoute) {
    const accessToken = request.cookies.get("spotify_access_token")?.value
    const refreshToken = request.cookies.get("spotify_refresh_token")?.value

    // If no token is found, redirect to login
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      // Validate the token by making a request to Spotify API
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      // If the token is valid, allow the request to proceed
      if (response.ok) {
        return NextResponse.next()
      }

      // If we have a refresh token, try to refresh the access token
      if (refreshToken) {
        // Redirect to the refresh endpoint with the original URL as the return path
        const returnTo = encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search)
        return NextResponse.redirect(new URL(`/api/refresh?returnTo=${returnTo}`, request.url))
      }

      // If token validation failed and we couldn't refresh, redirect to login
      return NextResponse.redirect(new URL("/login", request.url))
    } catch (error) {
      // If there's an error validating the token, redirect to login
      console.error("Error validating token:", error)
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

// Fix the typo in the matcher configuration
export const config = {
  matcher: ["/mood/:path*", "/presets/:path*", "/dashboard/:path*", "/playlist/create/:path*"],
}
