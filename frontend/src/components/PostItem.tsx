"use client";
import { supabaseClient } from "@/api/config";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
export type TPost = {
  post_id: string;
  author_id: {
    email: string;
  };
  title: string;
  content: string;
  created_at: string;
  updated_at?: any;
};

export const PostItem = ({ post }: { post: TPost }) => {
  const router = useRouter();
  const handelDeletePost = async (id: string) => {
    const { error } = await supabaseClient
      .from("posts")
      .delete()
      .match({ post_id: id });
    if (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    } else {
      enqueueSnackbar("Post deleted successfully", { variant: "success" });
      router.refresh();
    }
  };

  return (
    <div
      key={post.post_id}
      className="border-2 p-4 mb-4 rounded-md cursor-pointer"
      onClick={() => router.push(`post/view/${post.post_id}`)}
    >
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <div className="pb-1">
          <button
            onClick={() => router.push(`post/edit/${post.post_id}`)}
            className="rounded-md border border-gray-300 p-1 hover:bg-gray-500"
          >
            <PencilIcon className="h-6 w-6 text-orange-500" />
          </button>
          <button
            onClick={() => handelDeletePost(post.post_id)}
            className="rounded-md border border-gray-300 p-1 ml-1  hover:bg-gray-500"
          >
            <TrashIcon className="h-6 w-6 text-red-500" />
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-gray-700">{post.content}</p>
        <p className="text-gray-700">{post.author_id.email}</p>
      </div>
    </div>
  );
};
