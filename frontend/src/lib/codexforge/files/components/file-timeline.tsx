"use client";

import type { CSSProperties } from "react";
import type { CodexForgeFileNode } from "../types";

export function FileTimeline({ file }: { file: CodexForgeFileNode }) {
  return (
    <section data-codexforge-file-timeline style={panel}>
      <div style={eyebrow}>Timeline</div>
      <div style={items}>
        {file.timeline.map((item) => (
          <article key={item.id} style={row}>
            <div style={dot} />
            <div style={{ minWidth: 0 }}>
              <div style={rowTop}>
                <strong>{item.label}</strong>
                <span>{item.timestamp.slice(0, 10)}</span>
              </div>
              <p style={body}>{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.62,
};

const items: CSSProperties = {
  display: "grid",
  gap: 8,
};

const row: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "10px minmax(0, 1fr)",
  gap: 9,
  alignItems: "start",
};

const dot: CSSProperties = {
  width: 8,
  height: 8,
  marginTop: 5,
  borderRadius: 8,
  background: "#34D399",
  boxShadow: "0 0 18px rgba(52,211,153,0.7)",
};

const rowTop: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  fontSize: 12,
};

const body: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 12,
  lineHeight: 1.45,
  opacity: 0.74,
};
