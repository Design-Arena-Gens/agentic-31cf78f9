import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

export const upload = async (req: Request) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
  )

  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return new Response(JSON.stringify({ error: "No file provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { data, error } = await supabase.storage
    .from("uploads")
    .upload(`/${file.name}`, file)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  // In a real implementation, you would also extract metadata
  // like page count from the uploaded file here.
  const jobId = Math.floor(Math.random() * 1000)
  const pages = 100 // Dummy data
  const bookName = file.name.replace(/\.[^/.]+$/, "")

  return new Response(JSON.stringify({ jobId, pages, bookName, path: data.path }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
