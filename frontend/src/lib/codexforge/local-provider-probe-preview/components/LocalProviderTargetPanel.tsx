"use client";
import type { CSSProperties } from "react";
import type { LocalProviderTarget } from "../local-provider-probe-types";
export function LocalProviderTargetPanel({ targets }: { targets: LocalProviderTarget[] }) { return <article style={card}><span style={tag}>Targets</span><h2 style={title}>Local servers</h2>{targets.map((target) => <p key={target.id} style={copy}><strong>{target.name}</strong>: {target.baseUrlEnvKey}, default {target.defaultLocalUrl}, {target.hostRule}.</p>)}</article>; }
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 8 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
