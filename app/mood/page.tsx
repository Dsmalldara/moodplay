import { generateMetadata } from "../lib/generate-metadata";
import MoodInputPage from "./Mood";


export const metadata = generateMetadata({
  title: "Mood | Moodplay | Turn Feelings into Playlists",
  description: "Create emotionally-personalized Spotify playlists using AI",
});



function page() {
  return (
  <MoodInputPage/ >
  )
}

export default page;
