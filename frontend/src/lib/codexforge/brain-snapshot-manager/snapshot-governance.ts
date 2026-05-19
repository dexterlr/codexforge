import type { BrainSnapshotGovernanceItem, BrainSnapshotGovernanceReport, BrainSnapshotModel } from "./brain-snapshot-types";

export function buildBrainSnapshotGovernanceItem(input: BrainSnapshotGovernanceItem): BrainSnapshotGovernanceItem {
  return input;
}

export function buildBrainSnapshotGovernanceReport(snapshot: BrainSnapshotModel): BrainSnapshotGovernanceReport {
  const items: BrainSnapshotGovernanceItem[] = [
    buildBrainSnapshotGovernanceItem({ id: "live-graph-mutation-blocked", label: "Live graph mutation blocked", detail: "Brain Snapshot Manager does not mutate the live Brain graph.", status: "blocked" }),
    buildBrainSnapshotGovernanceItem({ id: "snapshot-restore-blocked-phase-50", label: "Snapshot restore blocked in Phase 50", detail: "Snapshot restore is review-only and future-gated.", status: "blocked" }),
    buildBrainSnapshotGovernanceItem({ id: "runtime-replay-required-before-restore", label: "Runtime replay required before restore", detail: "Replay source selection and reducer preview are required before any future restore path.", status: "required" }),
    buildBrainSnapshotGovernanceItem({ id: "governance-review-required", label: "Governance review required", detail: "Brain Mutation Governance must review comparison and integrity posture.", status: "required" }),
    buildBrainSnapshotGovernanceItem({ id: "runtime-journal-review-required", label: "Runtime journal review required", detail: "Runtime Event Journal review is required before rollback planning.", status: "required" }),
    buildBrainSnapshotGovernanceItem({ id: "memory-promotion-replay-recommended", label: "Memory promotion replay recommended", detail: "Memory promotion replay is recommended when memory density or concept coverage changes.", status: "recommended" }),
    buildBrainSnapshotGovernanceItem({ id: "direct-saveBrainGraph-from-UI-blocked", label: "Direct saveBrainGraph from UI blocked", detail: "Direct saveBrainGraph from UI blocked.", status: "blocked" }),
    buildBrainSnapshotGovernanceItem({ id: "direct-appendEvent-from-UI-blocked", label: "Direct appendEvent from UI blocked", detail: "Direct appendEvent from UI blocked.", status: "blocked" }),
  ];

  const report: BrainSnapshotGovernanceReport = {
    snapshotId: snapshot.id,
    items,
    summary: [],
  };
  report.summary = summarizeBrainSnapshotGovernanceReport(report);
  return report;
}

export function summarizeBrainSnapshotGovernanceReport(report: BrainSnapshotGovernanceReport): string[] {
  const blocked = report.items.filter((item) => item.status === "blocked").length;
  return [
    `${report.items.length} governance controls visible for ${report.snapshotId}.`,
    `${blocked} controls are explicitly blocked-policy items.`,
    "Governance report is read-only and does not auto-promote memory or auto-merge graph events.",
  ];
}
