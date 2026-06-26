/**
 * app/opengraph-image.tsx — generates /opengraph-image.png (1200×630).
 * Auto-used by Next.js for og:image and twitter:image meta tags.
 */
import { ImageResponse } from "next/og";

export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt         = "AI Automation Platform – Automate Everything";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width:           "100%",
          height:          "100%",
          display:         "flex",
          flexDirection:   "column",
          alignItems:      "center",
          justifyContent:  "center",
          background:      "#0a0a0f",
          position:        "relative",
          overflow:        "hidden",
          fontFamily:      "monospace",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position:     "absolute",
            top:          "-20%",
            left:         "50%",
            transform:    "translateX(-50%)",
            width:        "800px",
            height:       "600px",
            background:   "radial-gradient(ellipse, rgba(99,102,241,0.30) 0%, transparent 70%)",
            filter:       "blur(60px)",
          }}
        />
        <div
          style={{
            position:     "absolute",
            bottom:       "-10%",
            right:        "5%",
            width:        "400px",
            height:       "400px",
            background:   "radial-gradient(ellipse, rgba(139,92,246,0.20) 0%, transparent 70%)",
            filter:       "blur(50px)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            width:           "80px",
            height:          "80px",
            background:      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
            borderRadius:    "18px",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            color:           "#fff",
            fontSize:        "44px",
            fontWeight:      800,
            marginBottom:    "32px",
          }}
        >
          N
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize:      "64px",
            fontWeight:    800,
            color:         "#f0f0ff",
            letterSpacing: "-2px",
            lineHeight:    1.05,
            textAlign:     "center",
            maxWidth:      "900px",
            marginBottom:  "20px",
          }}
        >
          Automate Everything.
          <br />
          <span style={{ color: "#818cf8" }}>Scale Infinitely.</span>
        </div>

        {/* Sub-copy */}
        <div
          style={{
            fontSize:     "24px",
            color:        "#a8a8c8",
            textAlign:    "center",
            maxWidth:     "680px",
            lineHeight:   1.5,
            marginBottom: "40px",
            fontFamily:   "sans-serif",
            fontWeight:   400,
          }}
        >
          The AI-native automation platform for teams that ship fast.
        </div>

        {/* Stats strip */}
        <div
          style={{
            display:       "flex",
            gap:           "40px",
            alignItems:    "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#818cf8", letterSpacing: "-1px" }}>99.98%</span>
            <span style={{ fontSize: "14px", color: "#64648a", fontFamily: "sans-serif" }}>Uptime</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#818cf8", letterSpacing: "-1px" }}>10ms</span>
            <span style={{ fontSize: "14px", color: "#64648a", fontFamily: "sans-serif" }}>Latency</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#818cf8", letterSpacing: "-1px" }}>500+</span>
            <span style={{ fontSize: "14px", color: "#64648a", fontFamily: "sans-serif" }}>Integrations</span>
          </div>
        </div>

        {/* Domain watermark */}
        <div
          style={{
            position:   "absolute",
            bottom:     "28px",
            right:      "40px",
            fontSize:   "16px",
            color:      "#3a3a55",
            fontFamily: "monospace",
          }}
        >
          your-domain.com
        </div>
      </div>
    ),
    size,
  );
}
