"use client";

import type { CSSProperties } from "react";
import type { AiProviderProfile } from "../ai-router-types";
import { summarizeAiProviderProfile } from "../ai-provider-profile";

export function AiProviderProfilePanel({ providers }: { providers: AiProviderProfile[] }) {
  return (
    <section style={panel}>
      <div>
        <span style={eyebrow}>Provider profiles</span>
        <h2 style={title}>Local, API, server, and manual profiles</h2>
      </div>
      <div style={grid}>
        {providers.map((provider) => (
          <article key={provider.id} style={card}>
            <div style={cardTop}>
              <strong style={cardTitle}>{provider.label}</strong>
              <span style={badge}>{provider.status}</span>
            </div>
            <p style={body}>{summarizeAiProviderProfile(provider)}</p>
            <div style={chips}>
              <span style={chip}>{provider.connectionMode}</span>
              <span style={chip}>{provider.secretStrategy}</span>
              {provider.supportsLocalOffline ? <span style={chip}>offline</span> : null}
              {provider.supportsToolUse ? <span style={chip}>tools</span> : null}
              {provider.supportsVision ? <span style={chip}>vision</span> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 14 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.68)", borderRadius: 8, padding: 12, minWidth: 0 };
const cardTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start" };
const cardTitle: CSSProperties = { fontSize: 14, overflowWrap: "anywhere" };
const badge: CSSProperties = { fontSize: 10, color: "#ccfbf1", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 999, padding: "3px 7px", whiteSpace: "nowrap" };
const body: CSSProperties = { color: "rgba(226,232,240,0.72)", fontSize: 12, lineHeight: 1.45, margin: "8px 0", overflowWrap: "anywhere" };
const chips: CSSProperties = { display: "flex", gap: 6, flexWrap: "wrap" };
const chip: CSSProperties = { fontSize: 10, color: "#bae6fd", background: "rgba(14,165,233,0.1)", borderRadius: 999, padding: "3px 7px" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 22, margin: "4px 0 0", letterSpacing: 0, overflowWrap: "anywhere" };
