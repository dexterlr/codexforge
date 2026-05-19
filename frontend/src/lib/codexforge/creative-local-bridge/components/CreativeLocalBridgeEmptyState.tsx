"use client";

import type { CSSProperties } from "react";

export function CreativeLocalBridgeEmptyState({ reason = "Bridge metadata is not available." }: { reason?: string }) {
  return (
    <section style={card} data-codexforge-creative-local-bridge-empty-state="CreativeLocalBridgeEmptyState renders">
      <strong>Creative Local Bridge</strong>
      <p style={copy}>{reason}</p>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 16 };
const copy: CSSProperties = { margin: "6px 0 0", color: "#cbd5e1", lineHeight: 1.5 };
