"use client";
import { supabaseClient } from "@/api/config";
import { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const handelLoutOut = async () => {
    await supabaseClient.auth.signOut().then(() => router.push("/login"));
  };
  return (
    path !== "/login" && (
      <header className=" bg-gray-800 ">
        <div className="flex items-center justify-between p-4 text-white container max-w-6xl">
          {user?.email && (
            <div className="px-4 py-2 mr-2 text-white  rounded-md">
              User : {user.email}
            </div>
          )}
          <button
            onClick={handelLoutOut}
            className="px-4 py-2 text-white bg-red-500 rounded-md"
          >
            Logout
          </button>
        </div>
      </header>
    )
  );
};
