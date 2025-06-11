import { generateMetadata } from "../lib/generate-metadata";
import PlaylistResultPage from "./Playlist";


export const metadata = generateMetadata({
  title: "Playlists | Moodplay | Turn Feelings into Playlists",
  description: "Create emotionally-personalized Spotify playlists using AI",
});



function page() {
  return (
   <PlaylistResultPage/ >
  )
}

export default page;
