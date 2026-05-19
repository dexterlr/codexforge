import type { FunctionalWorkflowStatus, ProductFunctionalWorkflowAudit, ProductFunctionalWorkflowItem, ProductRoutePath } from "./product-readiness-types";
import { buildProductReadinessStableKey } from "./product-readiness-types";

const WORKFLOWS: readonly Omit<ProductFunctionalWorkflowItem, "id">[] = [
  { label: "project file read", status: "functional", missingPieces: [], safetyBlockers: ["no source file mutation from UI"], nextFunctionalPhase: "Phase 57 Real Patch Preview v1", routeEntryPoints: ["/files"], validationNeeded: ["Local Project Reader smoke", "read-only safety assertions"], },
  { label: "File Reader v1 functional/read-only", status: "functional", missingPieces: [], safetyBlockers: ["no source file mutation from UI", "no command execution from UI"], nextFunctionalPhase: "Phase 57 Real Patch Preview v1", routeEntryPoints: ["/files"], validationNeeded: ["Local Project Reader smoke", "Files smoke"], },
  { label: "Patch Preview v1 functional/preview-only", status: "functional", missingPieces: [], safetyBlockers: ["no apply from UI", "no file writes from UI", "no command execution from UI"], nextFunctionalPhase: "Phase 58 Approved Patch Apply v1", routeEntryPoints: ["/files"], validationNeeded: ["Real Patch Preview smoke", "Local Project Reader smoke", "git diff --check"] },
  { label: "file-to-brain context", status: "scaffolded", missingPieces: ["visible selected file to Brain context handoff"], safetyBlockers: ["no graph mutation"], nextFunctionalPhase: "Make Files real read-only workflow", routeEntryPoints: ["/files", "/brain"], validationNeeded: ["Brain context smoke"] },
  { label: "chat-to-task", status: "scaffolded", missingPieces: ["single reviewed task creation path"], safetyBlockers: ["latest-message authority preserved"], nextFunctionalPhase: "Functional workflow pass", routeEntryPoints: ["/ai", "/tasks"], validationNeeded: ["task activation smoke"] },
  { label: "task-to-patch-preview", status: "preview-only", missingPieces: ["task output to patch preview queue"], safetyBlockers: ["no apply without approval"], nextFunctionalPhase: "Make Patch Preview real", routeEntryPoints: ["/tasks", "/ai"], validationNeeded: ["patch preview queue smoke"] },
  { label: "patch-preview-to-apply-gate", status: "preview-only", missingPieces: ["approved apply request model"], safetyBlockers: ["no direct apply-diff from UI"], nextFunctionalPhase: "implement approved patch apply", routeEntryPoints: ["/ai", "/stabilization"], validationNeeded: ["apply gate smoke"] },
  { label: "apply-gate-to-validation", status: "blocked", missingPieces: ["validation runner", "operator approval boundary"], safetyBlockers: ["no command execution without approval"], nextFunctionalPhase: "implement validation runner", routeEntryPoints: ["/stabilization"], validationNeeded: ["manual validation checklist"] },
  { label: "validation-to-regression-triage", status: "preview-only", missingPieces: ["validation result ingestion"], safetyBlockers: ["evidence is context, not authority"], nextFunctionalPhase: "close loop regression repair", routeEntryPoints: ["/stabilization", "/activity"], validationNeeded: ["regression triage smoke"] },
  { label: "regression-to-fix-queue", status: "preview-only", missingPieces: ["fix queue to patch preview handoff"], safetyBlockers: ["no auto-fix"], nextFunctionalPhase: "close loop regression repair", routeEntryPoints: ["/stabilization", "/ai"], validationNeeded: ["regression fix queue smoke"] },
  { label: "memory-inbox-to-promotion-gate", status: "preview-only", missingPieces: ["single memory review lane"], safetyBlockers: ["no auto-promote memory"], nextFunctionalPhase: "Memory review consolidation", routeEntryPoints: ["/memory-inbox", "/memory"], validationNeeded: ["memory promotion gate smoke"] },
  { label: "runtime-event-to-journal", status: "preview-only", missingPieces: ["guarded runtime event result review"], safetyBlockers: ["no appendEvent from UI"], nextFunctionalPhase: "Runtime audit consolidation", routeEntryPoints: ["/runtime-journal"], validationNeeded: ["runtime journal smoke"] },
  { label: "snapshot-to-replay", status: "preview-only", missingPieces: ["clear snapshot replay source selection"], safetyBlockers: ["no graph mutation"], nextFunctionalPhase: "Brain continuity consolidation", routeEntryPoints: ["/brain-snapshots", "/runtime-replay"], validationNeeded: ["snapshot and replay smoke"] },
  { label: "replay-to-restore-gate", status: "preview-only", missingPieces: ["restore approval evidence chain"], safetyBlockers: ["snapshot restore blocked by default"], nextFunctionalPhase: "Brain continuity consolidation", routeEntryPoints: ["/runtime-replay", "/snapshot-restore"], validationNeeded: ["snapshot restore gate smoke"] },
  { label: "creative-plan-to-render-queue", status: "preview-only", missingPieces: ["render queue execution boundary"], safetyBlockers: ["no external execution from audit"], nextFunctionalPhase: "Creative workflow pass", routeEntryPoints: ["/creative"], validationNeeded: ["creative production smoke"] },
] as const;

export function buildFunctionalWorkflowItem(input: Partial<ProductFunctionalWorkflowItem> & Pick<ProductFunctionalWorkflowItem, "label">): ProductFunctionalWorkflowItem {
  const definition = WORKFLOWS.find((workflow) => workflow.label === input.label);
  return {
    id: input.id ?? buildProductReadinessStableKey("functional-workflow", input.label),
    status: "unknown" as FunctionalWorkflowStatus,
    missingPieces: [],
    safetyBlockers: [],
    nextFunctionalPhase: "Review workflow",
    routeEntryPoints: [] as ProductRoutePath[],
    validationNeeded: [],
    ...definition,
    ...input,
  };
}

export function buildFunctionalWorkflowAudit(items: readonly Partial<ProductFunctionalWorkflowItem>[] = WORKFLOWS): ProductFunctionalWorkflowAudit {
  const workflows = items.map((item) => buildFunctionalWorkflowItem(item as ProductFunctionalWorkflowItem));
  const functionalCount = workflows.filter((item) => item.status === "functional").length;
  const blockedCount = workflows.filter((item) => item.status === "blocked").length;
  return {
    id: "product-functional-workflow-audit",
    items: workflows,
    functionalCount,
    blockedCount,
    summary: summarizeFunctionalWorkflowAudit({ items: workflows, functionalCount, blockedCount }),
  };
}

export function summarizeFunctionalWorkflowAudit(audit: Pick<ProductFunctionalWorkflowAudit, "items" | "functionalCount" | "blockedCount">): string[] {
  return [
    `${audit.functionalCount}/${audit.items.length} workflows are fully functional.`,
    `${audit.blockedCount} workflows are blocked; most remain preview-only or scaffolded.`,
    "Patch Preview v1 functional/preview-only can now recommend Phase 58 Approved Patch Apply v1.",
  ];
}
