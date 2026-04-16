import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Efehan Yıldız";
  const subtitle = searchParams.get("subtitle") || "SEO & Dijital Pazarlama Uzmanı";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #060918 0%, #0c1029 40%, #0d1340 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #1d47f0, #3b63f7, #1d47f0)",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(29, 71, 240, 0.08)",
            filter: "blur(80px)",
          }}
        />

        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(29, 71, 240, 0.15)",
              border: "1px solid rgba(29, 71, 240, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1d47f0",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            EY
          </div>
          <span
            style={{
              color: "rgba(122, 130, 166, 0.8)",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            efehanyildiz.com
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            color: "#ffffff",
            fontSize: title.length > 40 ? "42px" : "52px",
            fontWeight: 800,
            lineHeight: 1.2,
            margin: 0,
            maxWidth: "900px",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: "rgba(122, 130, 166, 0.9)",
            fontSize: "20px",
            fontWeight: 400,
            marginTop: "20px",
            maxWidth: "700px",
          }}
        >
          {subtitle}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
