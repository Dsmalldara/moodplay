import { generateMetadata } from "../lib/generate-metadata";
import ErrorPage from "./Errorpage";



export const metadata = generateMetadata({
  title: "Mood | Moodplay | Turn Feelings into Playlists",
  description: "Create emotionally-personalized Spotify playlists using AI",
});



function page() {
  return (
    <ErrorPage/>
  )
}

export default page;
