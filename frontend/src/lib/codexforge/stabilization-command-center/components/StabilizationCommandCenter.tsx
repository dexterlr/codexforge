"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  buildStabilizationCommandCenterSummary,
  type StabilizationCommandCenterSummary,
} from "../index";
import { StabilizationHandoffPanel } from "./StabilizationHandoffPanel";
import { StabilizationHealthPanel } from "./StabilizationHealthPanel";
import { StabilizationNextActionPanel } from "./StabilizationNextActionPanel";
import { StabilizationQueueRollupPanel } from "./StabilizationQueueRollupPanel";
import { StabilizationReadinessPanel } from "./StabilizationReadinessPanel";
import { StabilizationRiskBoardPanel } from "./StabilizationRiskBoardPanel";
import { StabilizationSafetyNotice } from "./StabilizationSafetyNotice";
import { StabilizationSignalPanel } from "./StabilizationSignalPanel";
import { StabilizationTimelinePanel } from "./StabilizationTimelinePanel";

export function StabilizationCommandCenter({ summary: providedSummary }: { summary?: StabilizationCommandCenterSummary }) {
  const summary = useMemo(() => providedSummary ?? buildStabilizationCommandCenterSummary(), [providedSummary]);
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard?.writeText(text).then(() => setCopied(label)).catch(() => setCopied(null));
  }

  return (
    <CodexForgeAppShell
      activePath="/stabilization"
      workspaceLabel="Stabilization Command Center"
      nextActionContext={{ hasStabilizationBlockers: summary.sessionSummary.blockerCount > 0 }}
    >
      <div
        style={contentShell}
        data-codexforge-stabilization-command-center="StabilizationCommandCenter renders CodexForgeAppShell Command Palette no auto-fix no auto-rollback no command execution without approval no file writes without approval Safe Patch Preview Preview Diff Composer evidence is context, not proof preserve latest-message authority"
      >
        <section style={hero}>
          <div style={heroCopy}>
            <span style={eyebrow}>CodexForge Phase 39</span>
            <h1 style={headline}>Stabilization Command Center</h1>
            <p style={lede}>
              Build and smoke posture, verification signals, regression triage, fix queue, patch queue, apply gates,
              post-apply verification, and the next safest action in one read-only operator cockpit.
            </p>
            <div style={heroActions}>
              <Link href="/mission" style={heroLink}>Mission Control</Link>
              <Link href="/activity" style={heroLink}>Activity Feed</Link>
              <Link href="/memory-inbox" style={heroLink}>Memory Inbox readiness</Link>
              <Link href="/runtime-journal" style={heroLink}>Runtime Event Journal</Link>
              <Link href="/runtime-replay" style={heroLink}>Runtime Event Replay</Link>
              <Link href="/brain-governance" style={heroLink}>Brain Mutation Governance</Link>
              <Link href="/ai" style={heroLink}>Review pipeline</Link>
              <span style={copiedPill}>{copied ? `${copied} copied` : "copy-only controls"}</span>
            </div>
          </div>
          <div style={heroStats}>
            <HeroStat label="Health" value={summary.health.overallLevel} />
            <HeroStat label="Blockers" value={String(summary.sessionSummary.blockerCount)} />
            <HeroStat label="Warnings" value={String(summary.sessionSummary.warningCount)} />
            <HeroStat label="Next" value={summary.nextActionPlan.selected.action} />
          </div>
        </section>

        <StabilizationSafetyNotice />

        <div style={layout}>
          <div style={mainColumn}>
            <StabilizationHealthPanel health={summary.health} />
            <StabilizationSignalPanel signals={summary.signals} summary={summary.signalSummary} />
            <StabilizationQueueRollupPanel rollup={summary.queueRollup} />
            <StabilizationRiskBoardPanel board={summary.riskBoard} />
            <StabilizationReadinessPanel readiness={summary.readiness} />
          </div>
          <aside style={sideColumn}>
            <StabilizationNextActionPanel plan={summary.nextActionPlan} />
            <StabilizationTimelinePanel timeline={summary.timeline} />
            <StabilizationHandoffPanel
              handoff={summary.handoff}
              onCopyPrompt={(prompt) => copyText("prompt", prompt)}
              onCopyValidationChecklist={(commands) => copyText("validation checklist", commands)}
            />
          </aside>
        </div>
      </div>
    </CodexForgeAppShell>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={statValue}>{value}</strong>
    </div>
  );
}

const contentShell: CSSProperties = { width: "100%", display: "grid", gap: 16, minWidth: 0 };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.8))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(min(100%, 440px), 0.8fr)", gap: 18, alignItems: "center", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const headline: CSSProperties = { margin: 0, fontSize: 42, lineHeight: 1.06, letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 980, overflowWrap: "anywhere" };
const heroActions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const heroLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none", overflowWrap: "anywhere" };
const copiedPill: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(20,184,166,0.1)", borderRadius: 8, color: "#ccfbf1", fontSize: 12, fontWeight: 850, padding: "9px 11px", overflowWrap: "anywhere" };
const heroStats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 14, display: "grid", gap: 5, minWidth: 0 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 11, textTransform: "uppercase", fontWeight: 850, overflowWrap: "anywhere" };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 24, lineHeight: 1.1, overflowWrap: "anywhere" };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1.28fr) minmax(min(100%, 500px), 0.72fr)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
