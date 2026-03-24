import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // The secret password. 
    // We use Vercel Environment variables, but we provide a default backup 
    // just in case they aren't configured during the very first deployment!
    const correctPassword = process.env.STAGING_PASSWORD || 'whitetail101';

    if (password === correctPassword) {
      // Set a secure, HTTP-only cookie to track the session
      // This cookie lasts for 7 days
      const cookieStore = await cookies();
      cookieStore.set("auth_session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
