"use client";
import { supabaseClient } from "@/api/config";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";

type SinglePostPageProps = {
  params: { postId: string };
};

type TPost = Database["public"]["Tables"]["posts"]["Row"];

export default function SinglePostPage({
  params: { postId },
}: SinglePostPageProps) {
  const [postData, setPostData] = useState<TPost | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const { data } = await supabaseClient
          .from("posts")
          .select("*")
          .eq("post_id", postId)
          .returns<TPost>()
          .single();

        setPostData(data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  return (
    <div className="container max-w-6xl p-4">
      {postData && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h1 className="text-2xl font-bold mb-4">{postData.title}</h1>
          <p className="text-gray-600">{postData.content}</p>
        </div>
      )}
    </div>
  );
}
