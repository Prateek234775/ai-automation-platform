/**
 * app/icon.tsx — generates /favicon.ico and /icon.png via Next.js ImageResponse.
 * Renders a minimal branded icon (indigo "N" on dark background).
 */
import { ImageResponse } from "next/og";

export const size        = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius:    "6px",
        }}
      >
        <div
          style={{
            width:           "24px",
            height:          "24px",
            background:      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            borderRadius:    "4px",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            color:           "#fff",
            fontSize:        "14px",
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
