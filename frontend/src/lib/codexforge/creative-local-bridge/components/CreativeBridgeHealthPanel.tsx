"use client";

import type { CSSProperties } from "react";
import type { CreativeBridgeHealthReport } from "../creative-local-bridge-types";
import { buildCreativeLocalBridgeReactKey } from "../creative-local-bridge-summary";

export function CreativeBridgeHealthPanel({ health }: { health: CreativeBridgeHealthReport }) {
  return (
    <section style={card} data-codexforge-creative-bridge-health-panel="CreativeBridgeHealthPanel renders no external provider calls no secrets exposed">
      <div style={header}><span style={eyebrow}>Health</span><strong>Bridge Health</strong><span style={pill}>{health.status}</span></div>
      <div style={list}>
        {health.checks.map((check) => (
          <div key={buildCreativeLocalBridgeReactKey("health", check.id)} style={row}>
            <strong>{check.label}</strong>
            <span style={status}>{check.status}</span>
            <p style={copy}>{check.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(250,204,21,0.2)", background: "rgba(28,20,8,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12 };
const header: CSSProperties = { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#fde68a", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const pill: CSSProperties = { marginLeft: "auto", border: "1px solid rgba(250,204,21,0.26)", borderRadius: 8, padding: "4px 7px", color: "#fef3c7", fontSize: 11, fontWeight: 900 };
const list: CSSProperties = { display: "grid", gap: 8 };
const row: CSSProperties = { borderTop: "1px solid rgba(250,204,21,0.12)", paddingTop: 8, display: "grid", gap: 4 };
const status: CSSProperties = { color: "#fef08a", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const copy: CSSProperties = { margin: 0, color: "#fde68a", fontSize: 12, lineHeight: 1.45 };
