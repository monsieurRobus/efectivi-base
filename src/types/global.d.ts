export {};

declare global {
  interface Window {
    google: typeof google;
  }

  const google: typeof google;
}