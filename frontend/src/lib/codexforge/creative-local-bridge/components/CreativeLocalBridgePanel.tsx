"use client";

import type { CSSProperties } from "react";
import type { CreativeLocalBridgeModel } from "../creative-local-bridge-types";
import { summarizeCreativeLocalBridgeSession } from "../creative-local-bridge-summary";
import { CreativeAdapterCatalogPanel } from "./CreativeAdapterCatalogPanel";
import { CreativeArtifactCapturePanel } from "./CreativeArtifactCapturePanel";
import { CreativeBridgeHandoffPanel } from "./CreativeBridgeHandoffPanel";
import { CreativeBridgeHealthPanel } from "./CreativeBridgeHealthPanel";
import { CreativeBridgeProfilePanel } from "./CreativeBridgeProfilePanel";
import { CreativeJobApprovalPanel } from "./CreativeJobApprovalPanel";
import { CreativeJobPolicyPanel } from "./CreativeJobPolicyPanel";
import { CreativeJobRequestPanel } from "./CreativeJobRequestPanel";
import { CreativeLocalBridgeEmptyState } from "./CreativeLocalBridgeEmptyState";
import { CreativeLocalBridgeSafetyNotice } from "./CreativeLocalBridgeSafetyNotice";

export function CreativeLocalBridgePanel({ model }: { model: CreativeLocalBridgeModel }) {
  const copyText = (label: string, text: string) => {
    void navigator.clipboard?.writeText(text);
    void label;
  };

  if (!model.profiles.length || !model.adapters.length) {
    return <CreativeLocalBridgeEmptyState reason="Creative Local Bridge metadata is missing." />;
  }

  return (
    <main style={page} data-codexforge-creative-local-bridge-panel="CreativeLocalBridgePanel renders Creative Local Bridge preview-only no render execution no command execution no file writes future guarded executor Creative Execution Sandbox preserve latest-message authority">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>CodexForge Phase 61</span>
          <h1 style={headline}>Creative Local Bridge</h1>
          <p style={lede}>
            Creative plan to local bridge profile, Local Bridge Health profile summary, adapter readiness, job request preview,
            approval packet, and artifact capture plan. Preview-only and request-ready; no
            local render tools are launched.
          </p>
          <div style={links}>
            <a href="/creative" style={link}>Creative Production Studio</a>
            <a href="/capabilities" style={link}>Capability Cockpit</a>
            <a href="/artifacts" style={link}>Artifact Workspace</a>
            <a href="/local-bridge-health" style={link}>Local Bridge Health</a>
            <a href="/creative-executor" style={link}>Guarded Creative Executor</a>
            <a href="/creative-sandbox" style={link}>Creative Sandbox</a>
          </div>
        </div>
        <div style={statusGrid}>
          <Status label="Profiles" value={String(model.summary.bridgeProfileCount)} />
          <Status label="Ready" value={String(model.summary.readyProfileCount)} />
          <Status label="Adapters" value={String(model.summary.adapterCount)} />
          <Status label="Execution" value="blocked" />
        </div>
      </section>

      <CreativeLocalBridgeSafetyNotice />

      <section style={summaryStrip}>
        {summarizeCreativeLocalBridgeSession(model.summary).map((line) => (
          <span key={`creative-bridge-summary-${line.slice(0, 32)}`}>{line}</span>
        ))}
      </section>

      <div style={layout}>
        <div style={mainColumn}>
          <CreativeBridgeProfilePanel profiles={model.profiles} />
          <CreativeAdapterCatalogPanel adapters={model.adapters} />
          <CreativeBridgeHealthPanel health={model.health} />
          <CreativeJobRequestPanel request={model.jobRequest} />
          <CreativeArtifactCapturePanel plan={model.artifactPlan} />
          <CreativeBridgeHandoffPanel handoff={model.handoff} onCopy={copyText} />
        </div>
        <aside style={rail}>
          <CreativeJobApprovalPanel approval={model.approvalPacket} />
          <CreativeJobPolicyPanel policy={model.policy} />
        </aside>
      </div>
    </main>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return <div style={statusCard}><span>{label}</span><strong>{value}</strong></div>;
}

const page: CSSProperties = { minHeight: 0, color: "#f8fafc", background: "transparent", padding: 0, display: "grid", gap: 16, minWidth: 0, maxWidth: "100%", fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" };
const hero: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(56,189,248,0.2)", background: "linear-gradient(135deg, rgba(8,13,28,0.98), rgba(15,23,42,0.86))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 18, alignItems: "end", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 44, lineHeight: 1.05, letterSpacing: 0, maxWidth: 980, minWidth: 0, overflowWrap: "normal", wordBreak: "normal" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 980, minWidth: 0, overflowWrap: "anywhere" };
const links: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const link: CSSProperties = { border: "1px solid rgba(125,211,252,0.24)", background: "rgba(14,165,233,0.12)", borderRadius: 8, padding: "8px 10px", color: "#e0f2fe", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none", maxWidth: "100%", overflowWrap: "anywhere" };
const statusGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 145px), 1fr))", gap: 8, minWidth: 0 };
const statusCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.62)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere" };
const summaryStrip: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.66)", borderRadius: 8, padding: 12, display: "flex", flexWrap: "wrap", gap: 10, color: "#cbd5e1", fontSize: 12, fontWeight: 800, minWidth: 0, overflowWrap: "anywhere" };
const layout: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 400px)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
