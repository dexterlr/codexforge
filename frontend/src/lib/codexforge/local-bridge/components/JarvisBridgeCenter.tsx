"use client";

import type { CSSProperties } from "react";
import type { BridgeCenterModel } from "@/lib/codexforge/local-bridge";
import { BridgeAdapterMatrix } from "./BridgeAdapterMatrix";
import { BridgeAuditTrail } from "./BridgeAuditTrail";
import { BridgeBlockedActionNotice } from "./BridgeBlockedActionNotice";
import { BridgeConsentPanel } from "./BridgeConsentPanel";
import { BridgeHandshakePanel } from "./BridgeHandshakePanel";
import { BridgePolicyBoundary } from "./BridgePolicyBoundary";
import { BridgeReadinessBoard } from "./BridgeReadinessBoard";
import { BridgeRunHandoffPanel } from "./BridgeRunHandoffPanel";
import { BridgeSessionPanel } from "./BridgeSessionPanel";

export function JarvisBridgeCenter({ model }: { model: BridgeCenterModel }) {
  return (
    <main
      style={page}
      data-codexforge-local-bridge-center="JarvisBridgeCenter renders"
      data-codexforge-local-bridge-preview-only="preview-only"
    >
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>CodexForge Phase 9</span>
          <h1 style={headline}>Jarvis Local Bridge</h1>
          <p style={lede}>
            A preview-only local bridge foundation for session consent, adapter readiness,
            policy boundaries, operator presence, and Operator Run Center handoff. It prepares
            safe control paths and performs no desktop, camera, command, creative, file, broker,
            or external execution.
          </p>
          <div style={links}>
            <a href="/runs" style={link}>Open Operator Run Center</a>
            <a href="/capabilities" style={link}>Open Capability Cockpit</a>
          </div>
        </div>
        <div style={statusGrid}>
          <Status label="Mode" value="preview-only" />
          <Status label="Presence" value={model.session.operatorPresence.label} />
          <Status label="Readiness" value={`${model.readiness.score}`} />
          <Status label="Boundary" value="explicit session consent required" />
        </div>
      </section>

      <section style={statusStrip}>
        <strong>no silent desktop control</strong>
        <span>no camera access without consent</span>
        <span>broker execution blocked</span>
        <span>no file mutation without preview/approval</span>
      </section>

      <div style={layout}>
        <div style={mainColumn}>
          <BridgeSessionPanel session={model.session} />
          <BridgeReadinessBoard readiness={model.readiness} />
          <BridgeHandshakePanel handshake={model.handshake} />
          <BridgeAdapterMatrix matrix={model.adapterMatrix} />
          <BridgeRunHandoffPanel handoff={model.runHandoff} />
        </div>
        <aside style={rail}>
          <BridgeBlockedActionNotice />
          <BridgeConsentPanel boundary={model.consentBoundary} />
          <BridgePolicyBoundary boundary={model.policyBoundary} />
          <BridgeAuditTrail trail={model.auditTrail} />
        </aside>
      </div>
    </main>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return (
    <div style={statusCard}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const page: CSSProperties = {
  minHeight: "100vh",
  color: "#f8fafc",
  background:
    "radial-gradient(900px 420px at 10% 0%, rgba(45,212,191,0.16), transparent 62%)," +
    "radial-gradient(760px 360px at 92% 2%, rgba(244,63,94,0.12), transparent 60%)," +
    "linear-gradient(180deg, #050814 0%, #02040A 100%)",
  padding: "24px min(4vw, 44px)",
  display: "grid",
  gap: 16,
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
};
const hero: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(45,212,191,0.18)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.82))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(min(100%, 420px), 0.65fr)", gap: 18, alignItems: "end" };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 44, lineHeight: 1.05, letterSpacing: 0 };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 980 };
const links: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const link: CSSProperties = { border: "1px solid rgba(45,212,191,0.3)", background: "rgba(45,212,191,0.10)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none" };
const statusGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8 };
const statusCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.62)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0, overflowWrap: "anywhere" };
const statusStrip: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(248,113,113,0.18)", background: "rgba(32,8,18,0.72)", borderRadius: 8, padding: "10px 12px", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", color: "#fee2e2", fontSize: 12, fontWeight: 800 };
const layout: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(min(100%, 430px), 0.7fr)", gap: 16, alignItems: "start" };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
