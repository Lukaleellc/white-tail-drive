import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // The secret passwords (Concierge System).
    // We check against the master environment variable, as well as a
    // hardcoded list of guest passwords managed directly in this file.
    const validPasswords = [
      process.env.STAGING_PASSWORD || 'whitetail101',
      'whitetail140' // Added on request
    ];

    if (validPasswords.includes(password)) {
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
