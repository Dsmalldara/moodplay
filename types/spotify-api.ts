export interface ImageObject {
  url: string
  height: number | null
  width: number | null
}

export interface ArtistObjectSimplified {
  name: string
}

export interface AlbumObjectSimplified {
  name: string
  images: ImageObject[]
}

export interface TrackObjectFull {
  album: AlbumObjectSimplified
  artists: ArtistObjectSimplified[]
  duration_ms: number
  id: string
  name: string
  uri: string
}

export interface SearchResponse {
  tracks: {
    items: TrackObjectFull[]
  }
}

export interface CurrentUsersProfileResponse {
  display_name: string
  email: string
  images: ImageObject[]
}

export interface ListOfCurrentUsersPlaylistsResponse {
  items: PlaylistObjectSimplified[]
}

export interface PlaylistObjectSimplified {
  id: string
  name: string
  images: ImageObject[]
  tracks: {
    total: number
  }
}

export interface CreatePlaylistResponse {
  id: string
}

export interface AddTracksToPlaylistResponse {
  snapshot_id: string
}
  