import { generateMetadata } from "../lib/generate-metadata";
import LoginPage from "./Login";



export const metadata = generateMetadata({
  title: "Login | Moodplay | Turn Feelings into Playlists",
  description: "Create emotionally-personalized Spotify playlists using AI",
});



function page() {
  return (
  <LoginPage/>
  )
}

export default page;
