"use client";

import { useEffect, useState } from "react";

type Track = {
  id: number;
  title: string;
  artist: string;
  album: string;
  cover: string;
  preview: string;
  link: string;
  duration: number;
};

export default function Home() {
  const [intro, setIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [playing, setPlaying] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  async function searchMusic() {
    const value = query.trim();

    if (!value) {
      setError("Ketik judul lagu atau nama artis.");
      return;
    }

    setLoading(true);
    setError("");
    setTracks([]);

    try {
      const response = await fetch(
        `/api/music-search?q=${encodeURIComponent(value)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Pencarian gagal.");
      }

      setTracks(data.tracks || []);

      if (!data.tracks?.length) {
        setError("Lagu tidak ditemukan.");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  function chooseMenu(name: string) {
    setActive(name);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (intro) {
    return (
      <main className="intro-screen">
        <div className="intro-circle circle-one" />
        <div className="intro-circle circle-two" />

        <div className="intro-content">
          <div className="intro-a">A</div>
          <div className="intro-label">MAOU PORTAL</div>
          <h1>ANOS VOLDIGOAD</h1>
          <p>THE DEMON KING SYSTEM</p>

          <div className="loading">
            <div className="loading-bar" />
          </div>

          <span>INITIALIZING PORTAL...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="site">
      <div className="bg-magic magic-a" />
      <div className="bg-magic magic-b" />

      <header className="topbar">
        <div>
          <span className="top-small">DEMON KING</span>
          <strong>MAOU PORTAL</strong>
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <section className="hero">
        <div className="hero-glow" />

        <div className="hero-copy">
          <div className="eyebrow">WELCOME TO THE PORTAL</div>

          <h1>
            ANOS
            <br />
            <span>VOLDIGOAD</span>
          </h1>

          <p>
            Music, anime and digital modules inside one demon king portal.
          </p>

          <button
            className="primary-btn"
            onClick={() => chooseMenu("music")}
          >
            OPEN MUSIC
          </button>
        </div>

        <div className="anos-wrap">
          <div className="anos-aura" />
          <img
            src="https://demonkingacademy-anime.com/1st/assets/img/chara/thumb_anos.jpg"
            alt="Anos Voldigoad"
            className="anos"
          />
        </div>
      </section>

      <section className="modules">
        <div
          className="module-card featured"
          onClick={() => chooseMenu("music")}
        >
          <div className="spotify-mark">●</div>

          <div>
            <small>MODULE 01</small>
            <h2>MUSIC PORTAL</h2>
            <p>Search music instantly</p>
          </div>

          <span className="arrow">→</span>
        </div>

        <div
          className="module-card"
          onClick={() => chooseMenu("gallery")}
        >
          <small>MODULE 02</small>
          <h2>GALLERY</h2>
          <p>Anime visual archive</p>
          <span className="arrow">→</span>
        </div>

        <div
          className="module-card"
          onClick={() => chooseMenu("anime")}
        >
          <small>MODULE 03</small>
          <h2>ANIME</h2>
          <p>Maou Gakuin portal</p>
          <span className="arrow">→</span>
        </div>
      </section>

      {active === "music" && (
        <section className="panel">
          <button className="close-panel" onClick={() => setActive("home")}>
            ×
          </button>

          <div className="panel-label">MODULE 01</div>

          <div className="music-heading">
            <div className="music-icon">♫</div>

            <div>
              <div className="green-label">MUSIC SEARCH</div>
              <h2>
                YOUR
                <br />
                <span>MUSIC PORTAL</span>
              </h2>
            </div>
          </div>

          <p className="panel-description">
            Cari lagu atau artis langsung dari portal. Tidak perlu memasukkan
            link Spotify.
          </p>

          <div className="search-box">
            <span>⌕</span>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchMusic();
              }}
              placeholder="Search song, artist..."
            />

            <button onClick={searchMusic}>
              {loading ? "..." : "SEARCH"}
            </button>
          </div>

          {error && <div className="error-box">{error}</div>}

          {loading && (
            <div className="search-loading">
              <div className="spinner" />
              <span>SEARCHING MUSIC DATABASE...</span>
            </div>
          )}

          {tracks.length > 0 && (
            <div className="results">
              <div className="results-title">
                SEARCH RESULTS
                <span>{tracks.length} TRACKS</span>
              </div>

              {tracks.map((track) => (
                <article className="track" key={track.id}>
                  <img src={track.cover} alt={track.album} />

                  <div className="track-info">
                    <strong>{track.title}</strong>
                    <span>{track.artist}</span>
                    <small>{track.album}</small>
                  </div>

                  <div className="track-actions">
                    {track.preview ? (
                      <button
                        className="play-btn"
                        onClick={() =>
                          setPlaying(
                            playing === track.id ? null : track.id
                          )
                        }
                      >
                        {playing === track.id ? "❚❚" : "▶"}
                      </button>
                    ) : (
                      <span className="no-preview">NO PREVIEW</span>
                    )}

                    {track.link && (
                      <a
                        href={track.link}
                        target="_blank"
                        rel="noreferrer"
                        className="source-btn"
                      >
                        ↗
                      </a>
                    )}
                  </div>

                  {playing === track.id && track.preview && (
                    <audio
                      className="audio"
                      src={track.preview}
                      controls
                      autoPlay
                    />
                  )}
                </article>
              ))}
            </div>
          )}

          {!loading && tracks.length === 0 && !error && (
            <div className="empty-music">
              <div>♫</div>
              <p>SEARCH FOR YOUR NEXT TRACK</p>
              <span>Try: Love Me Not, APT., anime opening...</span>
            </div>
          )}

          <div className="music-note">
            <span>✦</span>
            Preview playback tersedia jika track menyediakan preview.
            Gunakan tombol sumber untuk membuka halaman musik resminya.
          </div>
        </section>
      )}

      {active === "gallery" && (
        <section className="panel">
          <button className="close-panel" onClick={() => setActive("home")}>
            ×
          </button>

          <div className="panel-label">MODULE 02</div>
          <h2 className="big-title">
            DEMON
            <br />
            <span>GALLERY</span>
          </h2>

          <div className="gallery-grid">
            <img
              src="https://demonkingacademy-anime.com/1st/assets/img/chara/thumb_anos.jpg"
              alt="Anos"
            />
            <div className="gallery-placeholder">DEMON KING</div>
            <div className="gallery-placeholder">MAOU GAKUIN</div>
          </div>
        </section>
      )}

      {active === "anime" && (
        <section className="panel">
          <button className="close-panel" onClick={() => setActive("home")}>
            ×
          </button>

          <div className="panel-label">MODULE 03</div>

          <h2 className="big-title">
            MAOU
            <br />
            <span>GAKUIN</span>
          </h2>

          <p className="panel-description">
            Portal resmi untuk dunia The Misfit of Demon King Academy.
          </p>

          <a
            href="https://maohgakuin.com/"
            target="_blank"
            rel="noreferrer"
            className="primary-btn link-btn"
          >
            OPEN OFFICIAL SITE ↗
          </a>
        </section>
      )}

      <footer>
        <span>MAOU PORTAL</span>
        <span>DEMON KING SYSTEM © 2026</span>
      </footer>

      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <aside
            className="side-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="menu-close"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>

            <div className="menu-head">
              <small>PORTAL MENU</small>
              <h2>MAOU</h2>
            </div>

            <button onClick={() => chooseMenu("home")}>01 — HOME</button>
            <button onClick={() => chooseMenu("music")}>
              02 — MUSIC
            </button>
            <button onClick={() => chooseMenu("gallery")}>
              03 — GALLERY
            </button>
            <button onClick={() => chooseMenu("anime")}>04 — ANIME</button>

            <div className="menu-bottom">
              ANOS VOLDIGOAD
              <br />
              DEMON KING PORTAL
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
