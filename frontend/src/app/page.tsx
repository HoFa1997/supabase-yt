import { supabaseServerClient } from "@/api/config";
import { NewPostModal, PostItem, TPost } from "@/components";

import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = supabaseServerClient(cookieStore);

  const { data: posts } = await supabase
    .from("posts")
    .select("* , author_id(email)")
    .returns<TPost[]>();

  return (
    <main className="max-w-6xl container p-4">
      <h1 className="text-5xl mb-4">Supabase Project</h1>
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-4xl mb-4">Posts Page</h2>
        <NewPostModal />
      </div>
      {posts &&
        posts.map((post) => <PostItem key={post.post_id} post={post} />)}
    </main>
  );
}
