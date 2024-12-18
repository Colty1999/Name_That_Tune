import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  error?: string;
}

const clientId = process.env.CLIENT_ID!;
const clientSecret = process.env.CLIENT_SECRET!;
const tokenEndpoint = "https://accounts.spotify.com/api/token";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { refreshToken } = body;

    if (!refreshToken) return NextResponse.json({ error: "Refresh token is required" });

    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    const data = (await response.json()) as SpotifyTokenResponse;

    if (!response.ok) {
      throw new Error(data?.error || "Failed to refresh access token");
    }

    return NextResponse.json({
      accessToken: data.access_token,
      expiresIn: data.expires_in,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during token refresh:", err.message);
      return NextResponse.json(
        { error: err.message || "Something went wrong" },
        { status: 500 }
      );
    } else {
      console.error("An unknown error occurred", err);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}
