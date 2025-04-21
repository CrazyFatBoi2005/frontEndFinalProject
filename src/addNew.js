import React, { useState } from 'react';
import "./styles.css";

const AddNewForm = () => {
    const [link, setLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!link) {
            alert('Please enter a link');
            return;
        }

        try {
            // const response = await fetch('https://api.example.com/submit', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ link }),
            // });
            // if (response.ok) {
            //     alert('Link submitted successfully!');
            //     setLink('');
            // } else {
            //     alert('Failed to submit the link');
            // }
            getTrackInfo(link).then((trackInfo) => {
                if (trackInfo) {
                    console.log('Track Info:', trackInfo);
                } else {
                    alert('Failed to fetch track info');
                }
            });
        } catch (error) {
            console.error('Error submitting the link:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h1>Enter Link From Soundcloud:</h1>
            <form onSubmit={handleSubmit} className="add-new-form">
                <input
                    type="url"
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://soundcloud.com/..."
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );

    async function getTrackInfo(soundcloudUrl) {
        const clientId = "2t9loNQH90kzJcsFCODdigxfp325aq4z";
      
        try {
          // Step 1: resolve URL to get track ID
          const resolveRes = await fetch(`https://api-v2.soundcloud.com/resolve?url=${encodeURIComponent(soundcloudUrl)}&client_id=${clientId}`);
          const trackData = await resolveRes.json();
      
          // Now you have everything!
          const trackInfo = {
            title: trackData.title,
            artist: trackData.user.username,
            duration: Math.floor(trackData.duration / 1000), // в секундах
            artwork: trackData.artwork_url || trackData.user.avatar_url,
            audioStream: `${trackData.media.transcodings[0].url}?client_id=${clientId}`
          };
      
          // Step 2: get actual stream URL (optional)
          const streamRes = await fetch(trackInfo.audioStream);
          const streamData = await streamRes.json();
          trackInfo.audioUrl = streamData.url;
      
          return trackInfo;
      
        } catch (error) {
          console.error("Error fetching SoundCloud data:", error);
          return null;
        }
      }
      
};

export default AddNewForm;