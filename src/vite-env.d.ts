/// <reference types="vite/client" />

declare global {
  interface Window {
    __AD_DATA__?: import("@/data/ads").IAd;
  }
}

export {};
