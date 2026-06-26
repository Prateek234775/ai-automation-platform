/**
 * app/apple-icon.tsx — generates /apple-touch-icon.png at 180×180.
 */
import { ImageResponse } from "next/og";

export const size        = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width:           "100%",
          height:          "100%",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          background:      "#0a0a0f",
        }}
      >
        <div
          style={{
            width:           "120px",
            height:          "120px",
            background:      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
            borderRadius:    "28px",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            color:           "#fff",
            fontSize:        "72px",
            fontWeight:      800,
            fontFamily:      "monospace",
          }}
        >
          N
        </div>
      </div>
    ),
    size,
  );
}
