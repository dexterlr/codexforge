"use client";

import type { CSSProperties } from "react";

export function ProviderAdaptersEmptyState() {
  return (
    <section style={card} data-codexforge-provider-adapters-empty-state="Provider adapters empty state definition only">
      <strong>No adapter needs a live connection right now.</strong>
      <p style={copy}>
        This page is a readiness map. It helps a novice understand what each adapter is for before any API call,
        local server call, or credential test is added.
      </p>
    </section>
  );
}

const card: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#dbeafe", display: "grid", gap: 6, padding: 14 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
