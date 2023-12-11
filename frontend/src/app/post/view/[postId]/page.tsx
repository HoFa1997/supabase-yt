"use client";
import { supabaseClient } from "@/api/config";
import { BackComponent } from "@/components";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

type SinglePostPageProps = {
  params: { postId: string };
};

type TPost = Database["public"]["Tables"]["posts"]["Row"];

type TComment = Database["public"]["Tables"]["comments"]["Row"];

export default function SinglePostPage({
  params: { postId },
}: SinglePostPageProps) {
  const [postData, setPostData] = useState<TPost | null>(null);
  const [commentData, setCommentData] = useState<TComment[] | null>(null);
  const [newComment, setNewComment] = useState("");
  const router = useRouter();

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
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    };

    fetchPostData();
  }, [postId]);

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const { data } = await supabaseClient
          .from("comments")
          .select("* , author_id(email)")
          .eq("post_id", postId)
          .returns<TComment[]>();

        setCommentData(data);
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    };

    fetchCommentData();
  }, [postId]);

  const addComment = async () => {
    try {
      const { error } = await supabaseClient
        .from("comments")
        .insert({ comment: newComment, post_id: postId });

      if (!error) {
        router.refresh();
        setNewComment("");
        enqueueSnackbar("Comment created successfully", { variant: "success" });
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handelDeleteComment = async (id: string) => {
    try {
      const { error } = await supabaseClient
        .from("comments")
        .delete()
        .eq("comment_id", id);

      if (!error) {
        router.refresh();
        enqueueSnackbar("Comment deleted successfully", { variant: "success" });
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div className="container max-w-6xl p-4">
      <BackComponent />
      {postData && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h1 className="text-2xl font-bold mb-4">{postData.title}</h1>
          <p className="text-gray-600">{postData.content}</p>
        </div>
      )}

      <div className="mt-5">
        <h5 className="font-bold text-lg pb-2">Add Comment</h5>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={addComment}
        >
          Add Comment
        </button>
      </div>

      <div className="mt-5">
        <h5 className="font-bold text-lg pb-2 flex flex-row">Comments</h5>
        {commentData?.map((comment) => (
          <div
            key={comment?.comment_id}
            className="bg-white shadow-md rounded-lg p-4 m-2 flex-col inline-flex justify-start items-start "
          >
            <p className="text-gray-600">{comment?.comment}</p>
            <p className="text-gray-600">
              user : {(comment as any)?.author_id?.email}
            </p>
            <button
              onClick={() => handelDeleteComment(comment.comment_id)}
              className="rounded-md border border-gray-300 p-1 ml-1  hover:bg-gray-500"
            >
              <TrashIcon className="h-6 w-6 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
