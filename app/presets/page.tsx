import { generateMetadata } from "../lib/generate-metadata";


export const metadata = generateMetadata({
  title: "Preset | Moodplay | Turn Feelings into Playlists",
  description: "Create emotionally-personalized Spotify playlists using AI",
});

import PresetsPage from "./presets";

function page() {
  return (
   <PresetsPage/>
  )
}

export default page;
