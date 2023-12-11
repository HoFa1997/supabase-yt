"use client";
import { supabaseClient } from "@/api/config";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

type NewPost = Database["public"]["Tables"]["posts"]["Insert"];

export const NewPostModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await supabaseClient.from("posts").insert({ title, content });
      enqueueSnackbar("Post created successfully", { variant: "success" });
      // Reset the form fields
      setTitle("");
      setContent("");
      // Close the modal
      handleClose();
      router.refresh();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="px-4 py-2 text-white bg-green-500 rounded-md"
      >
        New Post
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">New Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
