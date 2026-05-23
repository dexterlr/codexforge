"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

export function LiveTrialEmptyState() {
  return (
    <section style={box} data-codexforge-live-trial-empty-state="LiveTrialEmptyState renders Coding Trial empty state suggests Start trial without auto-apply no auto-run approval required">
      <h2 style={title}>Not sure what to change?</h2>
      <p style={copy}>Start with a copy-only wording change in a UI copy component, empty state, docs file, or demo/sample data.</p>
      <Link href="/code-flow" style={link}>Start trial in Code Flow</Link>
    </section>
  );
}

const box: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 16 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.55, margin: 0 };
const link: CSSProperties = { border: "1px solid rgba(45,212,191,0.35)", borderRadius: 8, color: "#ccfbf1", display: "inline-flex", fontSize: 13, fontWeight: 900, padding: "9px 11px", textDecoration: "none", width: "fit-content" };
