"use client";

import type { CSSProperties } from "react";
import type { ProviderAdapterDefinition } from "../provider-adapter-types";

export function ProviderAdapterCard({ adapter }: { adapter: ProviderAdapterDefinition }) {
  return (
    <article style={card} data-codexforge-provider-adapter-card={adapter.id}>
      <div style={cardTop}>
        <span style={tag}>{adapter.privacyPosture}</span>
        <span style={status}>{adapter.setupStatus}</span>
      </div>
      <h2 style={title}>{adapter.label}</h2>
      <p style={copy}>{adapter.plainEnglishSummary}</p>
      <div style={columns}>
        <div>
          <strong>What it can do later</strong>
          <div style={pillRow}>{adapter.supportedTaskTypes.slice(0, 5).map((task) => <span key={`${adapter.id}-${task}`} style={pill}>{task}</span>)}</div>
        </div>
        <div>
          <strong>Next setup step</strong>
          <p style={copy}>{adapter.nextSetupStep}</p>
        </div>
      </div>
    </article>
  );
}

const card: CSSProperties = { background: "rgba(2,6,23,0.7)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color: "#f8fafc", display: "grid", gap: 10, minWidth: 0, padding: 14 };
const cardTop: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "space-between" };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const status: CSSProperties = { color: "#ccfbf1", fontSize: 11, fontWeight: 900 };
const title: CSSProperties = { fontSize: 20, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45, margin: 0 };
const columns: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))" };
const pillRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 };
const pill: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", borderRadius: 999, color: "#ccfbf1", fontSize: 11, padding: "4px 8px" };
