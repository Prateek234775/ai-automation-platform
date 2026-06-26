/**
 * app/opengraph-image.tsx — generates /opengraph-image.png (1200×630).
 * Auto-used by Next.js for og:image and twitter:image meta tags.
 *
 * Satori (the renderer behind ImageResponse) requires every element
 * that has more than one child to have an explicit display value.
 * All containers here use display:"flex".
 */
import { ImageResponse } from "next/og";

export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt         = "AI Automation Platform – Automate Everything";

export default function OGImage() {
  return new ImageResponse(
    (
      /* Root — position:relative so absolute children resolve against it */
      <div
        style={{
          width:          "100%",
          height:         "100%",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          background:     "#0a0a0f",
          position:       "relative",
          overflow:       "hidden",
        }}
      >
        {/* ── Background glow orb 1 ── */}
        <div
          style={{
            position:   "absolute",
            top:        "-120px",
            left:       "200px",
            width:      "800px",
            height:     "600px",
            background: "radial-gradient(ellipse, rgba(99,102,241,0.30) 0%, transparent 70%)",
            filter:     "blur(60px)",
            display:    "flex",
          }}
        />

        {/* ── Background glow orb 2 ── */}
        <div
          style={{
            position:   "absolute",
            bottom:     "-60px",
            right:      "60px",
            width:      "400px",
            height:     "400px",
            background: "radial-gradient(ellipse, rgba(139,92,246,0.20) 0%, transparent 70%)",
            filter:     "blur(50px)",
            display:    "flex",
          }}
        />

        {/* ── Domain watermark ── */}
        <div
          style={{
            position:   "absolute",
            bottom:     "28px",
            right:      "40px",
            display:    "flex",
            fontSize:   "16px",
            color:      "#3a3a55",
            fontFamily: "monospace",
          }}
        >
          your-domain.com
        </div>

        {/* ── Main content column ── */}
        <div
          style={{
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            justifyContent: "center",
            gap:            "0px",
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              width:          "80px",
              height:         "80px",
              background:     "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
              borderRadius:   "18px",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              color:          "#fff",
              fontSize:       "44px",
              fontWeight:     800,
              fontFamily:     "monospace",
              marginBottom:   "32px",
            }}
          >
            N
          </div>

          {/* Headline line 1 */}
          <div
            style={{
              display:       "flex",
              fontSize:      "64px",
              fontWeight:    800,
              color:         "#f0f0ff",
              letterSpacing: "-2px",
              lineHeight:    1.05,
              textAlign:     "center",
              fontFamily:    "monospace",
            }}
          >
            Automate Everything.
          </div>

          {/* Headline line 2 */}
          <div
            style={{
              display:       "flex",
              fontSize:      "64px",
              fontWeight:    800,
              color:         "#818cf8",
              letterSpacing: "-2px",
              lineHeight:    1.05,
              textAlign:     "center",
              fontFamily:    "monospace",
              marginBottom:  "20px",
            }}
          >
            Scale Infinitely.
          </div>

          {/* Sub-copy */}
          <div
            style={{
              display:       "flex",
              fontSize:      "24px",
              color:         "#a8a8c8",
              textAlign:     "center",
              maxWidth:      "680px",
              lineHeight:    1.5,
              marginBottom:  "40px",
              fontFamily:    "sans-serif",
              fontWeight:    400,
            }}
          >
            The AI-native automation platform for teams that ship fast.
          </div>

          {/* Stats strip */}
          <div
            style={{
              display:     "flex",
              gap:         "40px",
              alignItems:  "center",
            }}
          >
            {/* Stat: Uptime */}
            <div
              style={{
                display:        "flex",
                flexDirection:  "column",
                alignItems:     "center",
                gap:            "4px",
              }}
            >
              <div style={{ display: "flex", fontSize: "28px", fontWeight: 700, color: "#818cf8", letterSpacing: "-1px", fontFamily: "monospace" }}>
                99.98%
              </div>
              <div style={{ display: "flex", fontSize: "14px", color: "#64648a", fontFamily: "sans-serif" }}>
                Uptime
              </div>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", width: "1px", height: "40px", background: "rgba(255,255,255,0.10)" }} />

            {/* Stat: Latency */}
            <div
              style={{
                display:        "flex",
                flexDirection:  "column",
                alignItems:     "center",
                gap:            "4px",
              }}
            >
              <div style={{ display: "flex", fontSize: "28px", fontWeight: 700, color: "#818cf8", letterSpacing: "-1px", fontFamily: "monospace" }}>
                10ms
              </div>
              <div style={{ display: "flex", fontSize: "14px", color: "#64648a", fontFamily: "sans-serif" }}>
                Latency
              </div>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", width: "1px", height: "40px", background: "rgba(255,255,255,0.10)" }} />

            {/* Stat: Integrations */}
            <div
              style={{
                display:        "flex",
                flexDirection:  "column",
                alignItems:     "center",
                gap:            "4px",
              }}
            >
              <div style={{ display: "flex", fontSize: "28px", fontWeight: 700, color: "#818cf8", letterSpacing: "-1px", fontFamily: "monospace" }}>
                500+
              </div>
              <div style={{ display: "flex", fontSize: "14px", color: "#64648a", fontFamily: "sans-serif" }}>
                Integrations
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
