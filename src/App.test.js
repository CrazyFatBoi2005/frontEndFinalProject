import { render, screen } from '@testing-library/react';
import App from './App';
import MusicPortfolio from './musicCard';
import SoundCloudPlayer from './SoundCloudPlayer';
import MyVirtualizedList from './virualization';

// App.js
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// MusicPortfolio
test('renders welcome frame in MusicPortfolio', () => {
  render(<MusicPortfolio />);
  const welcomeText = screen.getByText(/Welcome to SoundCloud Chronicles/i);
  expect(welcomeText).toBeInTheDocument();
});

test('renders track card when currentIndex > 0 in MusicPortfolio', () => {
  render(<MusicPortfolio />);
  const nextButton = screen.getByText('▶');
  nextButton.click();
  const trackTitle = screen.getByText(/internet horror/i);
  expect(trackTitle).toBeInTheDocument();
});

// SoundCloudPlayer
test('renders SoundCloudPlayer iframe with valid URL', () => {
  const url = 'https://soundcloud.com/crazysadboi/internet-horror-prod-by-greyrock-lindo';
  render(<SoundCloudPlayer url={url} />);
  const iframe = screen.getByTitle(`SoundCloud Player - ${url}`);
  expect(iframe).toBeInTheDocument();
});

test('does not render SoundCloudPlayer iframe if no URL is provided', () => {
  render(<SoundCloudPlayer url="" />);
  const iframe = screen.queryByTitle(/SoundCloud Player/i);
  expect(iframe).not.toBeInTheDocument();
});

// MusicLib
test('renders virtualized list with items', () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
  render(<MyVirtualizedList items={items} />);
  const firstItem = screen.getByText(/Item 1/i);
  expect(firstItem).toBeInTheDocument();
});

test('renders virtualized list header', () => {
  render(<MyVirtualizedList />);
  const header = screen.getByText(/Virtualized List Example/i);
  expect(header).toBeInTheDocument();
});
