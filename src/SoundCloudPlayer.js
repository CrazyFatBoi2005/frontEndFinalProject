import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const SoundCloudPlayer = ({ url, id, height, opts = {}, onPlay, onPause, onEnd }) => {
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    const loadWidget = () => {
      if (window.SC && window.SC.Widget) {
        widgetRef.current = window.SC.Widget(iframeRef.current);

        // Bind events
        if (onPlay) widgetRef.current.bind(window.SC.Widget.Events.PLAY, onPlay);
        if (onPause) widgetRef.current.bind(window.SC.Widget.Events.PAUSE, onPause);
        if (onEnd) widgetRef.current.bind(window.SC.Widget.Events.FINISH, onEnd);

        // Load the track
        widgetRef.current.load(url, opts);
      } else {
        console.error('SoundCloud Widget API failed to load.');
      }
    };

    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.onload = loadWidget;
    document.body.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.unbind(window.SC.Widget.Events.PLAY);
        widgetRef.current.unbind(window.SC.Widget.Events.PAUSE);
        widgetRef.current.unbind(window.SC.Widget.Events.FINISH);
      }
      document.body.removeChild(script);
    };
  }, [url, opts, onPlay, onPause, onEnd]);

  return (
    <iframe
      ref={iframeRef}
      id={id}
      width="100%"
      height={height || (opts.visual ? '450' : '166')}
      scrolling="no"
      frameBorder="no"
      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`}
    ></iframe>
  );
};

SoundCloudPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  opts: PropTypes.object,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onEnd: PropTypes.func,
};

SoundCloudPlayer.defaultProps = {
  id: 'react-sc-widget',
  opts: {}, // Default value for opts
  onPlay: () => {},
  onPause: () => {},
  onEnd: () => {},
};

export default SoundCloudPlayer;
