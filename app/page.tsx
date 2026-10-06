"use client";

import { useEffect, useState } from "react";

type MenuId =
  | "home"
  | "spotify"
  | "downloads"
  | "gallery"
  | "anime"
  | "settings";

const menuItems: {
  id: MenuId;
  icon: string;
  title: string;
  subtitle: string;
}[] = [
  {
    id: "home",
    icon: "⌂",
    title: "HOME",
    subtitle: "Demon King Portal",
  },
  {
    id: "spotify",
    icon: "spotify",
    title: "SPOTIFY MUSIC",
    subtitle: "Music Portal",
  },
  {
    id: "downloads",
    icon: "↓",
    title: "DOWNLOADS",
    subtitle: "Your Downloads",
  },
  {
    id: "gallery",
    icon: "▣",
    title: "GALLERY",
    subtitle: "Demon Gallery",
  },
  {
    id: "anime",
    icon: "✦",
    title: "ANIME",
    subtitle: "Maou Gakuin",
  },
  {
    id: "settings",
    icon: "⚙",
    title: "SETTINGS",
    subtitle: "Portal Settings",
  },
];

function SpotifyLogo({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={`spotify-logo ${small ? "small" : ""}`}
      viewBox="0 0 24 24"
      aria-label="Spotify"
    >
      <circle cx="12" cy="12" r="12" fill="#1ED760" />

      <path
        d="M7.1 9.1c3.4-1 7.3-.7 10.1.8"
        fill="none"
        stroke="#061009"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M7.8 12.4c2.8-.7 6.1-.5 8.5.7"
        fill="none"
        stroke="#061009"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M8.5 15.4c2.1-.5 4.5-.3 6.3.5"
        fill="none"
        stroke="#061009"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<MenuId>("home");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [message, setMessage] = useState("");

  const [intro, setIntro] = useState(true);
  const [pageReady, setPageReady] = useState(false);

  const anosImage =
    "https://demonkingacademy-anime.com/1st/assets/img/chara/thumb_anos.jpg";

  function selectMenu(id: MenuId) {
    setActive(id);
    setMenuOpen(false);
    setMessage("");
  }

  function openSpotify() {
    if (!spotifyUrl.trim()) {
      setMessage("Masukkan link Spotify terlebih dahulu.");
      return;
    }

    if (
      !spotifyUrl.includes("spotify.com") &&
      !spotifyUrl.includes("spotify.link")
    ) {
      setMessage("Link tersebut bukan link Spotify.");
      return;
    }

    window.open(
      spotifyUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function openOfficialAnime() {
    window.open(
      "https://maohgakuin.com/",
      "_blank",
      "noopener,noreferrer"
    );
  }

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setIntro(false);

      setTimeout(() => {
        setPageReady(true);
      }, 100);
    }, 2400);

    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      intro || menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [intro, menuOpen]);

  return (
    <main
      className={`portal ${
        pageReady ? "page-ready" : ""
      }`}
    >
      {/* OPENING SCREEN */}
      <div
        className={`intro-screen ${
          !intro ? "intro-hide" : ""
        }`}
      >
        <div className="intro-background" />

        <div className="intro-magic magic-a" />
        <div className="intro-magic magic-b" />

        <div className="intro-content">
          <div className="intro-symbol">
            <span>A</span>
          </div>

          <div className="intro-line" />

          <div className="intro-kicker">
            DEMON KING SYSTEM
          </div>

          <h1>
            ANOS
            <span>VOLDIGOAD</span>
          </h1>

          <div className="intro-loading">
            <div className="intro-loading-bar" />
          </div>

          <div className="intro-status">
            INITIALIZING PORTAL...
          </div>
        </div>
      </div>

      <div className="noise" />
      <div className="grid-background" />

      <div className="red-glow glow-one" />
      <div className="red-glow glow-two" />

      <div className="magic-circle circle-one">
        <span>
          ANOS VOLDIGOAD • DEMON KING • ANOS VOLDIGOAD •
        </span>
      </div>

      <div className="magic-circle circle-two">
        <span>✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧</span>
      </div>

      {/* TOP BAR */}
      <header className="topbar">
        <button
          className="logo"
          onClick={() => selectMenu("home")}
          aria-label="Home"
        >
          <div className="logo-symbol">A</div>

          <div className="logo-text">
            <strong>MAOU</strong>
            <span>PORTAL</span>
          </div>
        </button>

        <div className="top-status">
          <span className="status-dot" />
          <span>DEMON KING SYSTEM</span>
        </div>

        <button
          className={`menu-button ${
            menuOpen ? "active" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <span className="menu-word">MENU</span>

          <span className="hamburger">
            <i />
            <i />
            <i />
          </span>
        </button>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="small-title">
            <span />
            WELCOME TO THE DEMON KING PORTAL
          </div>

          <h1>
            ANOS
            <br />
            <span>VOLDIGOAD</span>
          </h1>

          <p className="hero-description">
            Sebuah portal bergaya Demon King untuk musik,
            anime, gallery, downloads, dan berbagai fitur
            yang akan lu tambahkan nanti.
          </p>

          <div className="hero-buttons">
            <button
              className="main-action"
              onClick={() => setMenuOpen(true)}
            >
              <span>✦</span>
              OPEN PORTAL
            </button>

            <button
              className="ghost-action"
              onClick={() => selectMenu("spotify")}
            >
              <SpotifyLogo small />
              MUSIC
            </button>
          </div>

          <div className="hero-info">
            <div>
              <strong>01</strong>
              <span>DEMON KING</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>POWER</span>
            </div>

            <div>
              <strong>2000</strong>
              <span>YEARS</span>
            </div>
          </div>
        </div>

        <div className="anos-container">
          <div className="energy energy-one" />
          <div className="energy energy-two" />

          <div className="anos-aura" />

          <div className="anos-ring ring-main">
            <div />
          </div>

          <div className="anos-ring ring-small">
            <div />
          </div>

          <img
            className="anos"
            src={anosImage}
            alt="Anos Voldigoad"
          />

          <div className="anos-name">
            <span>THE TYRANNICAL</span>
            <strong>DEMON KING</strong>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>SCROLL</span>
          <i />
        </div>
      </section>

      {/* QUICK CARDS */}
      <section className="quick-section">
        <div className="quick-title">
          <span>PORTAL MODULES</span>
          <small>SELECT A MODULE</small>
        </div>

        <div className="quick-grid">
          {menuItems.slice(1, 5).map((item, index) => (
            <button
              key={item.id}
              className="quick-card"
              onClick={() => selectMenu(item.id)}
            >
              <span className="quick-number">
                0{index + 1}
              </span>

              <span className="quick-icon">
                {item.icon === "spotify" ? (
                  <SpotifyLogo />
                ) : (
                  item.icon
                )}
              </span>

              <span className="quick-card-title">
                {item.title}
              </span>

              <span className="quick-card-subtitle">
                {item.subtitle}
              </span>

              <span className="quick-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      {/* BACKDROP */}
      <div
        className={`menu-backdrop ${
          menuOpen ? "show" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* SIDE MENU */}
      <aside
        className={`side-menu ${
          menuOpen ? "open" : ""
        }`}
      >
        <div className="side-menu-header">
          <div>
            <span>MAIN MENU</span>
            <strong>DEMON PORTAL</strong>
          </div>

          <button
            className="close-menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="menu-line" />

        <nav className="menu-list">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              className={`menu-item ${
                active === item.id ? "selected" : ""
              }`}
              onClick={() => selectMenu(item.id)}
            >
              <span className="menu-index">
                0{index + 1}
              </span>

              <span className="menu-icon">
                {item.icon === "spotify" ? (
                  <SpotifyLogo small />
                ) : (
                  item.icon
                )}
              </span>

              <span className="menu-content">
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </span>

              <span className="menu-arrow">→</span>
            </button>
          ))}
        </nav>

        <div className="menu-footer">
          <div className="mini-circle">A</div>

          <div>
            <strong>ANOS SYSTEM</strong>
            <span>ONLINE</span>
          </div>
        </div>
      </aside>

      {/* CONTENT PANEL */}
      {active !== "home" && (
        <div className="content-overlay">
          <div className="content-panel">
            <button
              className="content-close"
              onClick={() => setActive("home")}
            >
              ×
            </button>

            {active === "spotify" && (
              <section className="module">
                <span className="module-number">
                  MODULE 01
                </span>

                <div className="spotify-heading">
                  <SpotifyLogo />
                  <span>SPOTIFY MUSIC</span>
                </div>

                <h2>
                  YOUR
                  <br />
                  <span>MUSIC PORTAL</span>
                </h2>

                <p>
                  Masukkan link Spotify untuk membuka lagu,
                  album, playlist, atau artist langsung di
                  Spotify.
                </p>

                <div className="spotify-box">
                  <div className="spotify-icon-big">
                    <SpotifyLogo />
                  </div>

                  <div className="spotify-input">
                    <label>SPOTIFY URL</label>

                    <input
                      value={spotifyUrl}
                      onChange={(e) =>
                        setSpotifyUrl(e.target.value)
                      }
                      placeholder="https://open.spotify.com/..."
                    />
                  </div>

                  <button onClick={openSpotify}>
                    OPEN SPOTIFY
                  </button>
                </div>

                {message && (
                  <div className="module-message">
                    {message}
                  </div>
                )}

                <div className="info-box">
                  <span>✦</span>

                  <p>
                    Portal ini membuka konten melalui
                    Spotify. Untuk download offline,
                    gunakan fitur resmi Spotify di
                    aplikasinya.
                  </p>
                </div>
              </section>
            )}

            {active === "downloads" && (
              <section className="module">
                <span className="module-number">
                  MODULE 02
                </span>

                <h2>
                  YOUR
                  <br />
                  <span>DOWNLOADS</span>
                </h2>

                <p>
                  Tempat ini disiapkan untuk file atau
                  resource yang nanti ingin lu tambahkan
                  sendiri ke website.
                </p>

                <div className="empty-module">
                  <div>↓</div>
                  <strong>NO DOWNLOADS YET</strong>
                  <span>
                    Download module siap dikembangkan.
                  </span>
                </div>
              </section>
            )}

            {active === "gallery" && (
              <section className="module">
                <span className="module-number">
                  MODULE 03
                </span>

                <h2>
                  DEMON
                  <br />
                  <span>GALLERY</span>
                </h2>

                <p>
                  Koleksi gambar yang nantinya bisa lu
                  tambahkan ke portal.
                </p>

                <div className="gallery-grid">
                  <div className="gallery-card main-gallery">
                    <img
                      src={anosImage}
                      alt="Anos"
                    />
                    <span>ANOS</span>
                  </div>

                  <div className="gallery-placeholder">
                    <strong>+</strong>
                    <span>ADD IMAGE</span>
                  </div>

                  <div className="gallery-placeholder">
                    <strong>+</strong>
                    <span>ADD IMAGE</span>
                  </div>
                </div>
              </section>
            )}

            {active === "anime" && (
              <section className="module">
                <span className="module-number">
                  MODULE 04
                </span>

                <h2>
                  MAOU
                  <br />
                  <span>GAKUIN</span>
                </h2>

                <p>
                  Portal anime bertema Anos Voldigoad.
                  Informasi karakter dan konten resmi bisa
                  diarahkan ke situs resmi anime.
                </p>

                <div className="anime-card">
                  <div>
                    <span>THE MISFIT OF</span>
                    <strong>
                      DEMON KING ACADEMY
                    </strong>
                  </div>

                  <button onClick={openOfficialAnime}>
                    OFFICIAL SITE ↗
                  </button>
                </div>
              </section>
            )}

            {active === "settings" && (
              <section className="module">
                <span className="module-number">
                  MODULE 05
                </span>

                <h2>
                  PORTAL
                  <br />
                  <span>SETTINGS</span>
                </h2>

                <p>
                  Pengaturan portal akan ditempatkan di
                  sini.
                </p>

                <div className="settings-list">
                  <div>
                    <span>THEME</span>
                    <strong>DEMON KING</strong>
                  </div>

                  <div>
                    <span>ACCENT</span>
                    <strong>RED / PURPLE</strong>
                  </div>

                  <div>
                    <span>STATUS</span>
                    <strong className="online">
                      ONLINE
                    </strong>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
