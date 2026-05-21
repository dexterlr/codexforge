"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { FriendlyEmptyState as FriendlyEmptyStateModel } from "../product-simplification-types";

export function FriendlyEmptyState({ state }: { state: FriendlyEmptyStateModel }) {
  return (
    <section style={empty} data-codexforge-friendly-empty-state="FriendlyEmptyState renders useful empty state no scolding language">
      <h2 style={title}>{state.title}</h2>
      <p style={body}>{state.body}</p>
      <div style={actions}>
        <Link href={state.route} style={primary}>{state.primaryActionLabel}</Link>
        <Link href={state.routeSuggestion} style={secondary}>{state.secondaryActionLabel}</Link>
      </div>
      <p style={note}>{state.safetyNote}</p>
    </section>
  );
}

const empty: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(14,165,233,0.08)", borderRadius: 8, display: "grid", gap: 10, padding: 14 };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.25, margin: 0 };
const body: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.5, margin: 0 };
const actions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const primary: CSSProperties = { border: "1px solid rgba(45,212,191,0.34)", borderRadius: 8, color: "#ccfbf1", fontSize: 12, fontWeight: 900, padding: "9px 10px", textDecoration: "none" };
const secondary: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color: "#e2e8f0", fontSize: 12, fontWeight: 900, padding: "9px 10px", textDecoration: "none" };
const note: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0 };
