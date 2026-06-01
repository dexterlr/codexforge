"use client";

import type { CSSProperties } from "react";

export function LocalVideoWorkflowEmptyState() {
  return <section style={card}><h2 style={title}>What a workflow means</h2><p style={copy}>A workflow is the ordered plan for turning an idea into frames, drafts, review artifacts, and maybe a later final render. CodexForge is only cataloging the plan here.</p></section>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: "0 0 8px" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
