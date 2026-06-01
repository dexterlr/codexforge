"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { buildProviderAdapterSummary } from "@/lib/codexforge/provider-adapters";
import { ProviderAdapterCapabilityPanel } from "./ProviderAdapterCapabilityPanel";
import { ProviderAdapterCard } from "./ProviderAdapterCard";
import { ProviderAdapterContractPanel } from "./ProviderAdapterContractPanel";
import { ProviderAdapterModelFamilyPanel } from "./ProviderAdapterModelFamilyPanel";
import { ProviderAdapterReadinessPanel } from "./ProviderAdapterReadinessPanel";
import { ProviderAdapterRoutingHintPanel } from "./ProviderAdapterRoutingHintPanel";
import { ProviderAdapterSafetyPanel } from "./ProviderAdapterSafetyPanel";
import { ProviderAdapterSafetyStrip } from "./ProviderAdapterSafetyStrip";
import { ProviderAdapterSummaryPanel } from "./ProviderAdapterSummaryPanel";
import { ProviderAdaptersEmptyState } from "./ProviderAdaptersEmptyState";

export function ProviderAdaptersPanel() {
  const summary = buildProviderAdapterSummary();
  const adapters = summary.adapters;

  return (
    <div
      style={shell}
      data-codexforge-provider-adapters-panel="ProviderAdaptersPanel route imports/renders main panel Provider adapters OpenAI-compatible Claude-compatible Gemini DeepSeek Ollama LM Studio No live provider calls yet No raw password storage No localStorage secrets .env.local manual browser handoff local/private approximate planning hints no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no external network dependency no hardcoded API keys"
    >
      <section style={hero}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Phases 118-121</span>
          <h1 style={headline}>Provider adapters</h1>
          <p style={lede}>
            Understand how CodexForge can safely talk to AI providers later. Adapters describe capabilities and safe
            setup only. No live provider calls yet.
          </p>
        </div>
        <div style={linkRow}>
          <Link href="#readiness" style={primaryLink}>Review adapter readiness</Link>
          <Link href="/ai-providers" style={link}>Provider profiles</Link>
          <Link href="/provider-health" style={link}>Provider health</Link>
          <Link href="/credentials" style={link}>Credential safety</Link>
          <Link href="/token-router" style={link}>Token router</Link>
        </div>
      </section>

      <ProviderAdapterSafetyStrip />
      <ProviderAdapterSummaryPanel summary={summary} />
      <ProviderAdaptersEmptyState />

      <section style={grid} aria-label="Provider adapter cards">
        {adapters.map((adapter) => <ProviderAdapterCard key={adapter.id} adapter={adapter} />)}
      </section>

      <section style={explainGrid}>
        <article style={explainCard}>
          <h2 style={smallTitle}>OpenAI-compatible</h2>
          <p style={copy}>OpenAI-compatible means the request format is familiar, not that every provider is identical.</p>
        </article>
        <article style={explainCard}>
          <h2 style={smallTitle}>Claude-compatible</h2>
          <p style={copy}>Claude web subscriptions stay manual unless you connect an official API key. No password or browser cookie storage.</p>
        </article>
        <article style={explainCard}>
          <h2 style={smallTitle}>Local/private</h2>
          <p style={copy}>Local models are best for privacy-first preprocessing and cheap drafts; quality depends on the model you have loaded.</p>
        </article>
      </section>

      <section id="readiness" style={detailsGrid}>
        <ProviderAdapterReadinessPanel adapters={adapters} />
        <ProviderAdapterSafetyPanel adapters={adapters} />
        <ProviderAdapterRoutingHintPanel adapters={adapters} />
        <ProviderAdapterCapabilityPanel adapters={adapters} />
        <ProviderAdapterModelFamilyPanel adapters={adapters} />
        <ProviderAdapterContractPanel adapters={adapters} />
      </section>

      <details style={advanced}>
        <summary>Advanced adapter notes</summary>
        <p style={copy}>
          Gemini is represented separately so multimodal and long-context routing can stay clear. DeepSeek can be
          routed as its own provider or through compatible endpoints later. CodexForge will still show which provider,
          model, and privacy posture is being used.
        </p>
        <p style={copy}>
          Local placeholders use http://localhost:11434 and http://localhost:1234 as setup labels only. CodexForge will
          not assume your local server is running until a guarded health check is added.
        </p>
      </details>
    </div>
  );
}

const shell: CSSProperties = { color: "#f8fafc", display: "grid", gap: 16, minWidth: 0, width: "100%" };
const hero: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", padding: 18 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: 0, lineHeight: 1, margin: "8px 0", overflowWrap: "anywhere" };
const lede: CSSProperties = { color: "rgba(226,232,240,0.76)", fontSize: 14, lineHeight: 1.55, margin: 0, maxWidth: 780 };
const linkRow: CSSProperties = { alignContent: "flex-start", display: "flex", flexWrap: "wrap", gap: 8 };
const link: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none" };
const primaryLink: CSSProperties = { ...link, background: "#5eead4", color: "#042f2e" };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" };
const explainGrid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))" };
const explainCard: CSSProperties = { background: "rgba(14,165,233,0.08)", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, display: "grid", gap: 6, padding: 12 };
const smallTitle: CSSProperties = { fontSize: 16, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
const detailsGrid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))" };
const advanced: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#cbd5e1", padding: 12 };
