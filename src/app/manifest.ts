import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Efehan Yıldız — SEO Uzmanı & Dijital Pazarlama Danışmanı",
    short_name: "Efehan Yıldız",
    description:
      "SEO, dijital pazarlama, teknik SEO danışmanlığı ve uygulamalı eğitimler.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#6d28d9",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
