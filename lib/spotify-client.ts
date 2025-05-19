/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Client-side utilities for interacting with Spotify
 * These functions use our secure API proxy to avoid exposing tokens to the client
 */



/**
 * Fetches data from our secure Spotify API proxy
 */
export async function spotifyClientFetch<T>(
  endpoint: string,
  method: "GET" | "POST" = "GET",
  body?: any,
): Promise<T | null> {
  try {
    const response = await fetch(`/api/spotify?endpoint=${encodeURIComponent(endpoint)}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    // If unauthorized, redirect to refresh
    if (response.status === 401) {
      window.location.href = `/api/refresh?returnTo=${encodeURIComponent(window.location.pathname)}`
      return null
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return (await response.json()) as T
  } catch (error) {
    console.error("Error fetching from Spotify API proxy:", error)
    return null
  }
}

/**
 * Gets the current user's profile (client-side)
 */
export async function getSpotifyUserProfile() {
  return spotifyClientFetch<SpotifyApi.CurrentUsersProfileResponse>("/me")
}

/**
 * Gets the user's playlists (client-side)
 */
export async function getUserPlaylists(limit = 20, offset = 0) {
  return spotifyClientFetch<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
    `/me/playlists?limit=${limit}&offset=${offset}`,
  )
}

/**
 * Searches for tracks (client-side)
 */
export async function searchTracks(query: string, limit = 20) {
  return spotifyClientFetch<SpotifyApi.SearchResponse>(
    `/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
  )
}

/**
 * Creates a playlist (client-side)
 */
export async function createPlaylist(userId: string, name: string, description: string, isPublic = true) {
  return spotifyClientFetch<SpotifyApi.CreatePlaylistResponse>(`/users/${userId}/playlists`, "POST", {
    name,
    description,
    public: isPublic,
  })
}

/**
 * Adds tracks to a playlist (client-side)
 */
export async function addTracksToPlaylist(playlistId: string, trackUris: string[]) {
  return spotifyClientFetch<SpotifyApi.AddTracksToPlaylistResponse>(`/playlists/${playlistId}/tracks`, "POST", {
    uris: trackUris,
  })
}
