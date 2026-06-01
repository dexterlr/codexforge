"use client";
import type { CSSProperties } from "react";
import type { ProviderTestScope } from "../provider-connection-test-types";
export function ProviderTestScopePanel({ scopes }: { scopes: ProviderTestScope[] }) { return <article style={card}><span style={tag}>Scopes</span><h2 style={title}>Safe now vs future</h2>{scopes.map((scope) => <p key={scope.id} style={copy}><strong>{scope.scope}</strong>: {scope.safeNow ? "safe now" : "future approved live test"}. {scope.explanation}</p>)}</article>; }
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 8 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
