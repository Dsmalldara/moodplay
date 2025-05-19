/**
 * Utility functions for authentication
 */

/**
 * Validates a Spotify access token by making a request to the Spotify API
 */
export async function validateSpotifyToken(accessToken: string): Promise<boolean> {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
  
      return response.ok
    } catch (error) {
      console.error("Error validating Spotify token:", error)
      return false
    }
  }
  
  /**
   * Refreshes a Spotify access token using the refresh token
   */
  export async function refreshSpotifyToken(
    refreshToken: string,
    clientId: string,
    clientSecret: string,
  ): Promise<{ access_token: string; refresh_token?: string; expires_in: number } | null> {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      })
  
      if (!response.ok) {
        throw new Error("Failed to refresh token")
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error refreshing Spotify token:", error)
      return null
    }
  }
  
  /**
   * Gets the current user's Spotify profile
   */
  export async function getSpotifyUserProfile(accessToken: string) {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
  
      if (!response.ok) {
        throw new Error("Failed to fetch user profile")
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error fetching Spotify user profile:", error)
      return null
    }
  }
  