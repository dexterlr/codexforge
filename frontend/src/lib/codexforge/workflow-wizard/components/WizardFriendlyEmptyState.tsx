"use client";

import type { CSSProperties } from "react";

export function WizardFriendlyEmptyState({ message = "Choose a task to begin." }: { message?: string }) {
  return (
    <section style={panel} data-codexforge-wizard-friendly-empty-state="WizardFriendlyEmptyState renders friendly empty state Choose a file to inspect then preview changes safely">
      <h2 style={title}>Nothing selected yet</h2>
      <p style={copy}>{message}</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 6, padding: 14 };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
