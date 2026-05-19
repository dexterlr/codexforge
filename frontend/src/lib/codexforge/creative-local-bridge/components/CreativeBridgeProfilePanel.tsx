"use client";

import type { CSSProperties } from "react";
import type { CreativeBridgeProfile } from "../creative-local-bridge-types";
import { buildCreativeLocalBridgeReactKey } from "../creative-local-bridge-summary";

export function CreativeBridgeProfilePanel({ profiles }: { profiles: CreativeBridgeProfile[] }) {
  return (
    <section style={card} data-codexforge-creative-bridge-profile-panel="CreativeBridgeProfilePanel renders bridge profiles include blender-local comfyui-local unreal-local">
      <div style={header}>
        <span style={eyebrow}>Profiles</span>
        <strong>Creative Bridge Profile</strong>
      </div>
      <div style={grid}>
        {profiles.map((profile) => (
          <article key={buildCreativeLocalBridgeReactKey("profile", profile.id)} style={tile}>
            <div style={row}><strong>{profile.label}</strong><span style={pill}>{profile.status}</span></div>
            <p style={copy}>{profile.id} / {profile.bridgeKind} / {profile.connectionMode}</p>
            <p style={copy}>{profile.executableSourceHint}</p>
            <p style={copy}>{profile.endpointHint}</p>
            <p style={muted}>{profile.artifactOutputStrategy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(56,189,248,0.2)", background: "rgba(8,13,28,0.86)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "grid", gap: 4 };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 10 };
const tile: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.6)", borderRadius: 8, padding: 12, minWidth: 0, overflowWrap: "anywhere" };
const row: CSSProperties = { display: "flex", gap: 8, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" };
const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.28)", borderRadius: 8, padding: "4px 7px", color: "#bae6fd", fontSize: 11, fontWeight: 900 };
const copy: CSSProperties = { margin: "7px 0 0", color: "#cbd5e1", fontSize: 13, lineHeight: 1.45 };
const muted: CSSProperties = { margin: "7px 0 0", color: "#94a3b8", fontSize: 12, lineHeight: 1.45 };
