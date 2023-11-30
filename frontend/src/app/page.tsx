import { supabaseServerClient } from "@/api/config";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = supabaseServerClient(cookieStore);

  const { data: posts } = await supabase.from("posts").select("*");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl">Supabase Project</h1>
      {JSON.stringify(posts)}
    </main>
  );
}
