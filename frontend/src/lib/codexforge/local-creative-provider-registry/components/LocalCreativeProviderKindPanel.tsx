"use client";

import type { CSSProperties } from "react";
import type { LocalCreativeProviderKind } from "../local-creative-provider-types";

export function LocalCreativeProviderKindPanel({ kind }: { kind: LocalCreativeProviderKind }) {
  return <div style={box}><strong>{kind.label}</strong><p style={copy}>{kind.plainEnglish}</p><p style={meta}>Setup: {kind.setupStatus}</p></div>;
}

const box: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 6, padding: 10 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const meta: CSSProperties = { color: "#93c5fd", fontSize: 12, fontWeight: 800, margin: 0 };
