import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

import { upload } from "./upload.ts"
import { generateAudiobook } from "./generate-audiobook.ts"
import { generatePodcast } from "./generate-podcast.ts"

serve(async (req) => {
  const { url, method } = req
  const { pathname } = new URL(url)

  if (pathname === "/upload" && method === "POST") {
    return upload(req)
  }

  if (pathname === "/generate-audiobook" && method === "POST") {
    return generateAudiobook(req)
  }

  if (pathname === "/generate-podcast" && method === "POST") {
    return generatePodcast(req)
  }

  return new Response("Not Found", { status: 404 })
})
