import React, { useState } from 'react';
import "./styles.css";

const AddNewForm = () => {
  const [link, setLink] = useState('');
  const [trackInfo, setTrackInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!link) {
      alert('Please enter a SoundCloud link');
      return;
    }

    setLoading(true);
    setError(null);
    setTrackInfo(null);

    try {
      const track = await getTrackInfo(link);
      if (track) {
        setTrackInfo(track);
      } else {
        setError('Failed to fetch track info. Please check the link and try again.');
      }
    } catch (err) {
      console.error('Error fetching track info:', err);
      setError('An error occurred while fetching track info. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  async function getTrackInfo(soundcloudUrl) {
    const clientId = "2t9loNQH90kzJcsFCODdigxfp325aq4z";

    try {
      // Step 1: Resolve URL to get track data
      const resolveRes = await fetch(
        `https://api-v2.soundcloud.com/resolve?url=${encodeURIComponent(soundcloudUrl)}&client_id=${clientId}`
      );
      if (!resolveRes.ok) {
        throw new Error('Failed to resolve SoundCloud URL');
      }
      const trackData = await resolveRes.json();

      // Step 2: Extract track info
      const trackInfo = {
        title: trackData.title,
        artist: trackData.user.username,
        duration: Math.floor(trackData.duration / 1000), // in seconds
        artwork: trackData.artwork_url || trackData.user.avatar_url,
        audioStream: `${trackData.media.transcodings[0].url}?client_id=${clientId}`,
      };

      // Step 3: Get actual stream URL (optional)
      const streamRes = await fetch(trackInfo.audioStream);
      if (!streamRes.ok) {
        throw new Error('Failed to fetch audio stream URL');
      }
      const streamData = await streamRes.json();
      trackInfo.audioUrl = streamData.url;

      return trackInfo;
    } catch (error) {
      console.error("Error fetching SoundCloud data:", error);
      return null;
    }
  }

  return (
    <div className="form-container">
      <h1>Enter a SoundCloud Link:</h1>
      <form onSubmit={handleSubmit} className="add-new-form">
        <input
          type="url"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://soundcloud.com/..."
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {trackInfo && (
        <div className="track-info">
          <h2>Track Info:</h2>
          <img src={trackInfo.artwork} alt="Track artwork" className="track-artwork" />
          <p><strong>Title:</strong> {trackInfo.title}</p>
          <p><strong>Artist:</strong> {trackInfo.artist}</p>
          <p><strong>Duration:</strong> {trackInfo.duration} seconds</p>
          <a href={trackInfo.audioUrl} target="_blank" rel="noopener noreferrer" className="track-link">
            Listen to Track
          </a>
        </div>
      )}
    </div>
  );
};

export default AddNewForm;