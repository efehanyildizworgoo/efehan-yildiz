import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Efehan Yıldız";
  const subtitle = searchParams.get("subtitle") || "SEO & Dijital Pazarlama Uzmanı";

  // SVG-based OG image (no next/og dependency)
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#060918"/>
        <stop offset="40%" style="stop-color:#0c1029"/>
        <stop offset="100%" style="stop-color:#0d1340"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="4" fill="#1d47f0"/>
    <circle cx="1100" cy="100" r="200" fill="rgba(29,71,240,0.08)"/>
    <rect x="80" y="200" width="40" height="40" rx="10" fill="rgba(29,71,240,0.15)" stroke="rgba(29,71,240,0.3)" stroke-width="1"/>
    <text x="90" y="228" font-family="sans-serif" font-size="18" font-weight="700" fill="#1d47f0">EY</text>
    <text x="132" y="226" font-family="sans-serif" font-size="16" font-weight="500" fill="rgba(122,130,166,0.8)">efehanyildiz.com</text>
    <text x="80" y="320" font-family="sans-serif" font-size="${title.length > 40 ? 42 : 52}" font-weight="800" fill="#ffffff">${escapeXml(title.substring(0, 60))}</text>
    <text x="80" y="380" font-family="sans-serif" font-size="20" font-weight="400" fill="rgba(122,130,166,0.9)">${escapeXml(subtitle)}</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
