import { generateMetadata } from "../lib/generate-metadata";
import DashboardPage from "./Dashboard";


export const metadata = generateMetadata({
  title: "Dashboard | Moodplay | Turn Feelings into Playlists",
  description: "Create emotionally-personalized Spotify playlists using AI",
});



function page() {
  return (
  <DashboardPage/>
  )
}

export default page;
