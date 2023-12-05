import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { supabaseServerClient } from "./api/config";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = supabaseServerClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if user is not signed in, redirect the user to /login
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if user is signed in, do not redirect
  return response;
}

/**
 * Add path to the matcher array to apply this middleware to a specific path.
 */
export const config = {
  matcher: ["/"],
};
