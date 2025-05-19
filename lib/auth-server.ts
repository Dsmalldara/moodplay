import { cookies } from "next/headers"
import { redirect } from "next/navigation"


// Server-side only authentication utilities
// This file should never be imported from client components

/**
 * Gets the Spotify access token from cookies (server-side only)
 */
export async function getServerSideToken() {
  const accessToken = (await cookies()).get("spotify_access_token")?.value

  if (!accessToken) {
    return null
  }

  return accessToken
}

/**
 * Makes a server-side request to the Spotify API
 */
export async function spotifyServerFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  const accessToken = await getServerSideToken()

  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
    })

    if (response.status === 401) {
      // Token is invalid or expired, redirect to refresh
      redirect("/api/refresh?returnTo=" + encodeURIComponent(endpoint))
    }

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`)
    }

    return (await response.json()) as T
  } catch (error) {
    console.error("Error fetching from Spotify API:", error)
    return null
  }
}

/**
 * Gets the current user's Spotify profile (server-side only)
 */
export async function getSpotifyUserProfileServer() {
  return spotifyServerFetch<SpotifyApi.CurrentUsersProfileResponse>("/me")
}

/**
 * Gets the user's playlists (server-side only)
 */
export async function getUserPlaylistsServer(limit = 20, offset = 0) {
  return spotifyServerFetch<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
    `/me/playlists?limit=${limit}&offset=${offset}`,
  )
}

/**
 * Creates a playlist for the user (server-side only)
 */
export async function createPlaylistServer(userId: string, name: string, description: string, isPublic = true) {
  return spotifyServerFetch<SpotifyApi.CreatePlaylistResponse>(`/users/${userId}/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      public: isPublic,
    }),
  })
}

/**
 * Adds tracks to a playlist (server-side only)
 */
export async function addTracksToPlaylistServer(playlistId: string, trackUris: string[]) {
  return spotifyServerFetch<SpotifyApi.AddTracksToPlaylistResponse>(`/playlists/${playlistId}/tracks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: trackUris,
    }),
  })
}

/**
 * Searches for tracks (server-side only)
 */
export async function searchTracksServer(query: string, limit = 20) {
  return spotifyServerFetch<SpotifyApi.SearchResponse>(
    `/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
  )
}
