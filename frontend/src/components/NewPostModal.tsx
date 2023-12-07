"use client";
import { supabaseClient } from "@/api/config";
import { Database } from "@/types/supabase";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

type NewPost = Database["public"]["Tables"]["posts"]["Insert"];

export const NewPostModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: { session },
    } = await supabaseClient.auth.getSession();

    if (session?.user.id) {
      const { error } = await supabaseClient
        .from("posts")
        .insert({ title, content, author_id: session.user.id });

      if (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      } else {
        enqueueSnackbar("Post created successfully", { variant: "success" });
      }

      // Reset the form fields
      setTitle("");
      setContent("");
      // Close the modal
      handleClose();
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
                  Close Modal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
