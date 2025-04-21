import { useState } from "react";
import React from "react";
import "./styles.css";
import SoundCloudPlayer from "./SoundCloudPlayer";
import EvilCover from "./img/Evil.jpg";
import SwagaCover from "./img/swaga.jpg";

const tracks = [
  {
    title: "internet horror",
    cover: EvilCover,
    duration: "1:16",
    links: ["https://soundcloud.com/crazysadboi/internet-horror-prod-by-greyrock-lindo"],
    hashtags: ["#hashtag", "#hashtag"],
  },
  {
    title: "#swaga",
    cover: SwagaCover,
    duration: "1:37",
    links: ["https://soundcloud.com/crazysadboi/hashtag-swaga"],
    hashtags: ["#hashtag", "#hashtag"],
  },
];

function Header({ isHidden }) {
  return (
    <header className={`header retro-header ${isHidden ? "hidden" : ""}`}>
      <h1 className="header-title transition-text">SoundCloud Chronicles</h1>
      <p className="header-description transition-text">
        Beep Beep Boop Boop.
      </p>
    </header>
  );
}

function TrackCard({ track, isVisible }) {
  if (!track.cover) {
    // Special rendering for the welcome frame
    return (
      <div className={`track-card retro-card transition-text ${isVisible ? "" : "hidden"}`}>
        <h2 className="track-title retro-text transition-text">{track.title}</h2>
        <p className="track-description retro-text transition-text">
          Explore the music and enjoy the journey!
        </p>
        <div className="track-hashtags">
          {track.hashtags.map((tag, i) => (
            <span key={i} className="track-tag retro-text transition-text">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Regular track rendering
  return (
    <div className={`track-card retro-card transition-text ${isVisible ? "" : "hidden"}`}>
      <img src={track.cover} alt="Track cover" className="track-cover" />
      <h2 className="track-title retro-text transition-text">{track.title}</h2>
      <p className="track-duration retro-text transition-text">{track.duration}</p>
      <div className="progress-bar">
        <div className="progress"></div>
      </div>
      <div className="track-links">
        {track.links.map((link, i) => (
          <a key={i} href={link} className="track-link retro-button transition-text">
            Listen
          </a>
        ))}
      </div>
      <div className="track-hashtags">
        {track.hashtags.map((tag, i) => (
          <span key={i} className="track-tag retro-text transition-text">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MusicPortfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeTrack = (newIndex) => {
    if (isTransitioning || newIndex < 0 || newIndex > tracks.length) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 300);
  };

  const nextTrack = () => {
    if (currentIndex < tracks.length) {
      changeTrack(currentIndex + 1);
    }
  };

  const prevTrack = () => {
    if (currentIndex > 0) {
      changeTrack(currentIndex - 1);
    }
  };

  const onPlay = () => {
    console.log("Track is playing!");
  };

  return (
    <div className="music-portfolio retro-bg">
      {currentIndex === 0 ? (
        <div className="welcome-frame">
          <h1 className="header-title transition-text">Welcome to SoundCloud Chronicles</h1>
          <p className="header-description transition-text">
            Explore the music and enjoy the journey!
          </p>
          <div className="track-hashtags">
            <span className="track-tag retro-text transition-text">#Welcome</span>
            <span className="track-tag retro-text transition-text">#EnjoyTheMusic</span>
          </div>
        </div>
      ) : (
        <TrackCard track={tracks[currentIndex - 1]} isVisible={!isTransitioning} />
      )}
      <div className="nav-buttons">
        {currentIndex > 0 && (
          <button className="nav-button left retro-button transition-text" onClick={prevTrack}>
            ◀
          </button>
        )}
        {currentIndex < tracks.length && (
          <button className="nav-button right retro-button transition-text" onClick={nextTrack}>
            ▶
          </button>
        )}
      </div>
      {currentIndex > 0 && (
        <div className="player-container">
          <SoundCloudPlayer
            url={tracks[currentIndex - 1].links[0]}
            onPlay={onPlay}
            opts={{ visual: false }}
          />
        </div>
      )}
    </div>
  );
}
