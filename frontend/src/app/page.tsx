import { supabaseServerClient } from "@/api/config";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = supabaseServerClient(cookieStore);

  const { data: posts } = await supabase.from("posts").select("*");

  return (
    <main className="max-w-6xl container p-4">
      <h1 className="text-5xl mb-4">Supabase Project</h1>
      <h2 className="text-4xl mb-4">Posts Page</h2>
      {posts &&
        posts.map((post) => (
          <div key={post.post_id} className="border-2 p-4 mb-4 rounded-md">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-gray-700">{post.created_at}</p>
          </div>
        ))}
    </main>
  );
}
