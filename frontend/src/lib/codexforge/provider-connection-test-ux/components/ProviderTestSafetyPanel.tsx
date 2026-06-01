"use client";
import type { CSSProperties } from "react";
import type { ProviderTestSafety } from "../provider-connection-test-types";
export function ProviderTestSafetyPanel({ safety }: { safety: ProviderTestSafety }) { return <article style={card}><span style={tag}>Safety</span><h2 style={title}>Connection test boundary</h2><ul style={list}>{safety.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul><p style={copy}>Blocked: {safety.blocked.join(", ")}.</p></article>; }
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 8 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.5 };
