import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json(
      { error: "Masukkan nama lagu atau artis." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=12`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Gagal mengambil hasil musik." },
        { status: 502 }
      );
    }

    const data = await response.json();

    const tracks = (data.data || []).map((track: any) => ({
      id: track.id,
      title: track.title,
      artist: track.artist?.name || "Unknown Artist",
      album: track.album?.title || "Unknown Album",
      cover:
        track.album?.cover_xl ||
        track.album?.cover_big ||
        track.album?.cover_medium ||
        "",
      preview: track.preview || "",
      link: track.link || "",
      duration: track.duration || 0,
    }));

    return NextResponse.json({ tracks });
  } catch {
    return NextResponse.json(
      { error: "Server gagal menghubungi layanan musik." },
      { status: 500 }
    );
  }
}
