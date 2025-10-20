import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-serif font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your Audiobook & Podcast Studio.</p>
      </main>
    </div>
  );
}