import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

export const generatePodcast = async (req: Request) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
  )

  const {
    aiModel,
    hostAVoice,
    hostBVoice,
    podcastMode,
    inputFile,
  } = await req.json()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { data: job, error } = await supabase
    .from("jobs")
    .insert({
      user_id: user.id,
      type: "podcast",
      input_file: inputFile,
      status: "pending",
      book_name: inputFile.name, // Or a title from the script
      // In a real app, you'd store the config here
    })
    .select()
    .single()

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  // In a real implementation, you would now invoke a background
  // worker function to process the job.
  // e.g., await supabase.functions.invoke("podcast-worker", { body: { jobId: job.id } })

  return new Response(JSON.stringify(job), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
