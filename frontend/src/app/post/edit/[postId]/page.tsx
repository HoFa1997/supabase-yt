"use client";
import { supabaseClient } from "@/api/config";
import { BackComponent } from "@/components";
import { Database } from "@/types/supabase";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

type EditPostPageProps = {
  params: { postId: string };
};

type TPost = Database["public"]["Tables"]["posts"]["Row"];

export default function EditPostPage({
  params: { postId },
}: EditPostPageProps) {
  const [postData, setPostData] = useState<TPost | null>(null);
  const [formData, setFormData] = useState<TPost | null>(null);

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
        setFormData(data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) => {
    const value =
      e.target.type === "checkbox" ? (e.target as any).checked : e.target.value;
    setFormData((prevData) => ({
      ...prevData!,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await supabaseClient
        .from("posts")
        .update({ ...formData })
        .eq("post_id", postId);
      enqueueSnackbar("Post data updated successfully!", {
        variant: "success",
      });
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div className="container max-w-6xl p-4">
      <BackComponent />

      {postData ? (
        <div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="is_published" className="block text-gray-700">
                Is Published:
              </label>
              <input
                type="checkbox"
                id="is_published"
                name="is_published"
                checked={formData?.is_published || false}
                onChange={handleChange}
                className="form-checkbox mt-1 block"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData?.title || ""}
                onChange={handleChange}
                className="form-input mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700">
                Content:
              </label>
              <textarea
                id="content"
                name="content"
                value={formData?.content || ""}
                onChange={handleChange}
                className="form-textarea mt-1 block w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </form>
        </div>
      ) : (
        <p>Loading post data...</p>
      )}
    </div>
  );
}
