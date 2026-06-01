"use client";
import type { CSSProperties } from "react";
import type { EnvKeyProviderMap } from "../safe-env-key-types";
export function EnvKeyProviderMapPanel({ providerMap }: { providerMap: EnvKeyProviderMap[] }) { return <article style={card}><span style={tag}>Provider map</span><h2 style={title}>What each provider needs</h2>{providerMap.map((item) => <p key={item.id} style={copy}><strong>{item.provider}</strong>: {item.keys.join(", ")}. Status: {item.readiness}.</p>)}</article>; }
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 8 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
