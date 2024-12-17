import { NextRequest, NextResponse } from "next/server";

const clientId = process.env.CLIENT_ID!;
const clientSecret = process.env.CLIENT_SECRET!;
const frontend = process.env.FRONTEND_URI!;
const tokenEndpoint = "https://accounts.spotify.com/api/token";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code) return NextResponse.json({ error: "Code is required" }, { status: 400 });

    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: frontend,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error_description || data.error || "Failed to fetch access token";
      throw new Error(errorMessage);
    }

    return NextResponse.json({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    });
  } catch (err: any) {
    console.error("Error during login:", err.message);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
