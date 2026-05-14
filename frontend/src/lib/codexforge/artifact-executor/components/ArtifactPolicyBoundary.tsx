"use client";

import type { CSSProperties } from "react";
import { buildArtifactReactKey, type ArtifactPolicyBoundary as Boundary } from "@/lib/codexforge/artifact-executor";

export function ArtifactPolicyBoundary({ boundary }: { boundary: Boundary }) {
  return (
    <section style={panel} data-codexforge-artifact-policy-boundary="ArtifactPolicyBoundary renders">
      <div style={header}>
        <span style={eyebrow}>Policy boundary</span>
        <strong style={badge}>enforced</strong>
      </div>
      <h2 style={title}>Preview-only safety boundary</h2>
      <ul style={list}>
        {boundary.rules.map((rule) => (
          <li key={buildArtifactReactKey("policy", rule.id)} style={item}>
            <strong>{rule.label}</strong>
            <span style={rule.blocked ? blocked : allowed}>{rule.blocked ? "blocked" : "allowed"}</span>
            <p>{rule.detail}</p>
            <small>{rule.futureRequirement}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(248,113,113,0.22)", background: "rgba(26,8,18,0.78)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(248,113,113,0.3)", color: "#fecaca", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 22, letterSpacing: 0 };
const list: CSSProperties = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 9 };
const item: CSSProperties = { border: "1px solid rgba(248,113,113,0.14)", background: "rgba(15,23,42,0.52)", borderRadius: 8, padding: 10, display: "grid", gap: 5, color: "#fee2e2", fontSize: 13, lineHeight: 1.45 };
const blocked: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const allowed: CSSProperties = { color: "#86efac", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
