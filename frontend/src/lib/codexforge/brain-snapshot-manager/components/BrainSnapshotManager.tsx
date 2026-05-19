"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  buildBrainSnapshot,
  buildBrainSnapshotDiff,
  buildBrainSnapshotGovernanceReport,
  buildBrainSnapshotIntegrityReport,
  buildBrainSnapshotRollbackPlan,
  buildBrainSnapshotStableKey,
  buildBrainSnapshotSummary,
  compareBrainSnapshots,
  selectBrainSnapshotForReplay,
  summarizeBrainSnapshot,
  type BrainSnapshotModel,
} from "../index";
import { BrainSnapshotCard } from "./BrainSnapshotCard";
import { BrainSnapshotComparisonPanel } from "./BrainSnapshotComparisonPanel";
import { BrainSnapshotDiffPanel } from "./BrainSnapshotDiffPanel";
import { BrainSnapshotEmptyState } from "./BrainSnapshotEmptyState";
import { BrainSnapshotGovernancePanel } from "./BrainSnapshotGovernancePanel";
import { BrainSnapshotIntegrityPanel } from "./BrainSnapshotIntegrityPanel";
import { brainSnapshotGridStyle, brainSnapshotWrapStyle } from "./BrainSnapshotPanel";
import { BrainSnapshotReplaySelectorPanel } from "./BrainSnapshotReplaySelectorPanel";
import { BrainSnapshotRollbackPanel } from "./BrainSnapshotRollbackPanel";
import { BrainSnapshotSafetyNotice } from "./BrainSnapshotSafetyNotice";
import { BrainSnapshotSummaryPanel } from "./BrainSnapshotSummaryPanel";

export function buildBrainSnapshotManagerReactKey(...parts: Array<string | number | null | undefined>): string {
  return buildBrainSnapshotStableKey("brain-snapshot-ui", ...parts);
}

function copyText(text: string): void {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    void navigator.clipboard.writeText(text);
  }
}

function buildDemoSnapshots(): BrainSnapshotModel[] {
  return [
    buildBrainSnapshot({
      id: "snapshot:phase-50-empty-warning",
      label: "Phase 50 empty read-only model",
      source: "empty",
      graph: null,
      updatedAtLabel: "not supplied",
    }),
    buildBrainSnapshot({
      id: "snapshot:phase-50-operator-selection",
      label: "Operator-selected replay placeholder",
      source: "operator-selected",
      graph: null,
      focusNodeIds: ["memory:review", "task:stabilize"],
      updatedAtLabel: "operator supplied label",
    }),
  ];
}

export function BrainSnapshotManager({ snapshots: suppliedSnapshots }: { snapshots?: BrainSnapshotModel[] }) {
  const snapshots = useMemo(() => suppliedSnapshots && suppliedSnapshots.length > 0 ? suppliedSnapshots : buildDemoSnapshots(), [suppliedSnapshots]);
  const [selectedSnapshotId, setSelectedSnapshotId] = useState(snapshots[0]?.id ?? "");
  const selected = snapshots.find((snapshot) => snapshot.id === selectedSnapshotId) ?? snapshots[0];
  const target = snapshots.find((snapshot) => snapshot.id !== selected.id) ?? selected;
  const summary = useMemo(() => buildBrainSnapshotSummary(selected), [selected]);
  const comparison = useMemo(() => compareBrainSnapshots(target, selected), [target, selected]);
  const diff = useMemo(() => buildBrainSnapshotDiff({ beforeSnapshot: target, afterSnapshot: selected }), [target, selected]);
  const integrity = useMemo(() => buildBrainSnapshotIntegrityReport({ snapshot: selected, updatedAtRequired: false }), [selected]);
  const selector = useMemo(() => selectBrainSnapshotForReplay({
    snapshots,
    mode: "operator-review",
    eventTypes: ["memory.promoted", "task.updated"],
    integrityReports: [integrity],
    operatorSelectedSnapshotId: selected.id,
    sourceFreshnessLabel: selected.updatedAtLabel,
  }), [snapshots, integrity, selected]);
  const rollback = useMemo(() => buildBrainSnapshotRollbackPlan({ currentSnapshot: selected, targetSnapshot: target }), [selected, target]);
  const governance = useMemo(() => buildBrainSnapshotGovernanceReport(selected), [selected]);
  const snapshotSummaryText = summarizeBrainSnapshot(selected).concat(summary.summary, integrity.summary, governance.summary).join("\n");

  return (
    <CodexForgeAppShell activePath="/brain-snapshots" contentMaxWidth={1440}>
      <main
        data-codexforge-brain-snapshot-manager="BrainSnapshotManager renders Brain Snapshot Manager read-only no graph mutation no snapshot restore in Phase 50 no appendEvent no saveBrainGraph from UI canonical graph schema preserve latest-message authority stable key helper"
        style={{
          color: "#e5f4ff",
          display: "grid",
          gap: 18,
          minWidth: 0,
        }}
      >
        <section style={{ display: "grid", gap: 14, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
              <span style={{ color: "#7dd3fc", fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>Phase 50 / Brain Snapshot Manager</span>
              <h1 style={{ margin: 0, fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, ...brainSnapshotWrapStyle }}>Brain graph snapshot review cockpit</h1>
              <p style={{ margin: 0, maxWidth: 900, opacity: 0.78, lineHeight: 1.6, ...brainSnapshotWrapStyle }}>
                Snapshot summary, comparison, replay source selection, rollback planning, and memory governance review without live graph mutation.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/runtime-replay" style={heroLink}>Runtime Event Replay</Link>
              <Link href="/brain-governance" style={heroLink}>Brain Governance</Link>
              <Link href="/runtime-journal" style={heroLink}>Runtime Journal</Link>
              <button type="button" onClick={() => copyText(snapshotSummaryText)} style={button}>Copy snapshot summary</button>
            </div>
          </div>
          <BrainSnapshotSafetyNotice />
        </section>

        <section style={brainSnapshotGridStyle}>
          {snapshots.map((snapshot, index) => (
            <BrainSnapshotCard
              key={buildBrainSnapshotManagerReactKey("card", snapshot.id, index)}
              snapshot={snapshot}
              selected={snapshot.id === selected.id}
              onSelect={() => setSelectedSnapshotId(snapshot.id)}
            />
          ))}
        </section>

        {selected.nodeCount === 0 ? <BrainSnapshotEmptyState /> : null}

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 18, minWidth: 0 }}>
          <BrainSnapshotSummaryPanel summary={summary} />
          <BrainSnapshotComparisonPanel comparison={comparison} />
          <BrainSnapshotDiffPanel diff={diff} />
          <BrainSnapshotIntegrityPanel report={integrity} />
          <BrainSnapshotReplaySelectorPanel selector={selector} onCopy={() => copyText(selector.runtimeReplayHandoff)} />
          <BrainSnapshotRollbackPanel plan={rollback} />
          <BrainSnapshotGovernancePanel report={governance} />
        </section>
      </main>
    </CodexForgeAppShell>
  );
}

const heroLink = {
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(14,165,233,0.1)",
  borderRadius: 8,
  color: "#e0f2fe",
  padding: "10px 12px",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 800,
} as const;

const button = {
  border: "1px solid rgba(45,212,191,0.35)",
  background: "rgba(20,184,166,0.12)",
  borderRadius: 8,
  color: "#e0f2fe",
  padding: "10px 12px",
  fontSize: 13,
  fontWeight: 800,
  cursor: "pointer",
} as const;
