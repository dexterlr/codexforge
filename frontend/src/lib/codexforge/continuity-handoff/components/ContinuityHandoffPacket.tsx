"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { buildContinuityHandoffSummary, type ContinuityHandoffSession } from "../index";
import { button, muted, panel, pill, postureColor } from "./ContinuityHandoffStyles";
import { ContinuityHandoffEmptyState } from "./ContinuityHandoffEmptyState";
import { ContinuityHandoffPanel } from "./ContinuityHandoffPanel";
import { ContinuityHandoffSafetyNotice } from "./ContinuityHandoffSafetyNotice";
import { HandoffBrainPosturePanel } from "./HandoffBrainPosturePanel";
import { HandoffExportPanel } from "./HandoffExportPanel";
import { HandoffMemoryPosturePanel } from "./HandoffMemoryPosturePanel";
import { HandoffNextActionsPanel } from "./HandoffNextActionsPanel";
import { HandoffRiskSummaryPanel } from "./HandoffRiskSummaryPanel";
import { HandoffRollbackPosturePanel } from "./HandoffRollbackPosturePanel";
import { HandoffStatePanel } from "./HandoffStatePanel";
import { HandoffValidationPlanPanel } from "./HandoffValidationPlanPanel";

export function ContinuityHandoffPacket({ session: providedSession }: { session?: ContinuityHandoffSession }) {
  const session = useMemo(() => providedSession ?? buildContinuityHandoffSummary(), [providedSession]);
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard?.writeText(text).then(() => setCopied(label)).catch(() => setCopied(null));
  }

  return (
    <CodexForgeAppShell activePath="/handoff" workspaceLabel="Continuity Handoff Packet">
      <main style={shell} data-codexforge-continuity-handoff-packet="ContinuityHandoffPacket renders read-only no graph mutation no snapshot restore no appendEvent no saveBrainGraph from UI no command execution copy only preserve latest-message authority stable key helper buildContinuityHandoffStableKey">
        <section style={hero}>
          <div style={heroCopy}>
            <span style={eyebrow}>CodexForge Phase 53</span>
            <h1 style={headline}>Continuity Handoff Packet</h1>
            <p style={lede}>
              Current state, risks, validation, rollback posture, memory posture, Brain continuity posture,
              and next safe actions in one deterministic review-first packet.
            </p>
            <div style={heroActions}>
              <Link href="/brain-continuity" style={heroLink}>Brain Continuity</Link>
              <Link href="/stabilization" style={heroLink}>Stabilization</Link>
              <Link href="/activity" style={heroLink}>Activity Feed</Link>
              <Link href="/brain" style={heroLink}>Brain Inspector</Link>
              <button type="button" style={button} onClick={() => copyText("handoff packet", session.exportPayload.markdownPacket)}>Copy handoff packet</button>
              <button type="button" style={button} onClick={() => copyText("next-session prompt", session.exportPayload.nextSessionPrompt)}>Copy next session prompt</button>
              <span style={pill}>{copied ? `${copied} copied` : "copy-only controls"}</span>
            </div>
          </div>
          <div style={heroStats}>
            <HeroStat label="Packet" value={session.sessionSummary.packetReady ? "ready" : "review"} />
            <HeroStat label="Risks" value={String(session.sessionSummary.riskCount)} />
            <HeroStat label="Blockers" value={String(session.sessionSummary.blockerCount)} />
            <HeroStat label="Next" value={session.sessionSummary.nextSafeAction} />
          </div>
        </section>

        <ContinuityHandoffSafetyNotice />
        {session.state.items.length === 0 ? <ContinuityHandoffEmptyState /> : null}

        <div style={layout}>
          <div style={mainColumn}>
            <HandoffStatePanel state={session.state} />
            <ContinuityHandoffPanel sections={session.packet.sections} />
            <HandoffRiskSummaryPanel risks={session.risks} />
            <HandoffValidationPlanPanel plan={session.validationPlan} onCopy={copyText} />
            <HandoffRollbackPosturePanel posture={session.rollbackPosture} />
          </div>
          <aside style={sideColumn}>
            <HandoffNextActionsPanel plan={session.nextActions} />
            <HandoffMemoryPosturePanel posture={session.memoryPosture} />
            <HandoffBrainPosturePanel posture={session.brainPosture} />
            <HandoffExportPanel exportPayload={session.exportPayload} onCopy={copyText} />
            <section style={panel}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Session Summary</h2>
              {session.sessionSummary.summary.map((line) => (
                <p key={line} style={muted}>{line}</p>
              ))}
            </section>
          </aside>
        </div>
      </main>
    </CodexForgeAppShell>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={{ ...statValue, color: postureColor(value) }}>{value}</strong>
    </div>
  );
}

const shell: CSSProperties = { width: "100%", display: "grid", gap: 16, minWidth: 0 };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "linear-gradient(135deg, rgba(3,7,18,0.96), rgba(12,20,32,0.88))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(min(100%, 420px), 0.85fr)", gap: 18, alignItems: "center", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const headline: CSSProperties = { margin: 0, fontSize: 42, lineHeight: 1.06, letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 980, overflowWrap: "anywhere" };
const heroActions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const heroLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none", overflowWrap: "anywhere" };
const heroStats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 14, display: "grid", gap: 5, minWidth: 0 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 11, textTransform: "uppercase", fontWeight: 850, overflowWrap: "anywhere" };
const statValue: CSSProperties = { fontSize: 22, lineHeight: 1.1, overflowWrap: "anywhere" };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(min(100%, 520px), 0.75fr)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
