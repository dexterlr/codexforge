import type { WorkflowEntrypoint, WorkflowEntrypoints } from "./consolidation-types";
import { buildConsolidationStableKey } from "./consolidation-types";

const ITEMS: readonly Omit<WorkflowEntrypoint, "id">[] = [
  { label: "File Reader v1", route: "/files", readiness: "ready", missingPieces: [], safetyBoundary: "File Reader v1 functional/read-only; no file writes without approval, no command execution, no Brain graph mutation, no auto-persistence.", nextImplementationPhase: "Phase 57 Real Patch Preview v1", recommendedValidation: "Local Project Reader smoke, Files smoke, and git diff --check." },
  { label: "Patch Preview v1", route: "/files", readiness: "ready", missingPieces: [], safetyBoundary: "Patch Preview v1 functional/preview-only; no apply, no file writes, no command execution, no Brain graph mutation, and Patch Application Gate before future apply.", nextImplementationPhase: "Phase 58 Approved Patch Apply v1", recommendedValidation: "Real Patch Preview smoke, Patch Preview smoke, Local Project Reader smoke, and git diff --check." },
  { label: "Approved Patch Apply v1", route: "/stabilization", readiness: "blocked", missingPieces: ["Explicit approval record", "Dry-run verification", "Rollback evidence"], safetyBoundary: "Approval-gated executor only; no direct write-file call from UI.", nextImplementationPhase: "Future guarded apply boundary", recommendedValidation: "Apply gate and dry-run smoke." },
  { label: "Validation Runner v1", route: "/stabilization", readiness: "blocked", missingPieces: ["Approval prompt", "Command allowlist", "Result ingestion"], safetyBoundary: "No direct run-command call from UI; approval and runner boundary required.", nextImplementationPhase: "Future approved validation runner", recommendedValidation: "Validation runner policy smoke." },
  { label: "Closed Loop Fix Workflow", route: "/ai", readiness: "needs-review", missingPieces: ["Regression triage to fix queue", "Fix queue to patch preview", "Post-apply verification"], safetyBoundary: "No auto-fix, no auto-rollback, and review before each handoff.", nextImplementationPhase: "Phase 58 Closed Loop Repair", recommendedValidation: "Regression triage and fix queue smoke." },
  { label: "Creative Local Bridge v1", route: "/creative", readiness: "needs-review", missingPieces: ["Local bridge consent", "Artifact handoff", "Production pack review"], safetyBoundary: "Guarded handoff only; no background network dependency.", nextImplementationPhase: "Future Creative Local Bridge", recommendedValidation: "Creative and local bridge smoke." },
  { label: "Runtime Memory Promotion v1", route: "/memory-inbox", readiness: "blocked", missingPieces: ["Promotion approval", "Runtime event executor", "Journal result review"], safetyBoundary: "No auto-promote memory and no appendEvent from UI.", nextImplementationPhase: "Future guarded runtime memory promotion", recommendedValidation: "Memory promotion gate and runtime journal smoke." },
];

export function buildWorkflowEntrypoint(input: Omit<WorkflowEntrypoint, "id">): WorkflowEntrypoint {
  return { id: buildConsolidationStableKey("workflow", input.label), ...input };
}

export function buildWorkflowEntrypoints(): WorkflowEntrypoints {
  const items = ITEMS.map(buildWorkflowEntrypoint);
  const readyCount = items.filter((item) => item.readiness === "ready").length;
  return {
    id: "workflow-entrypoints",
    items,
    readyCount,
    summary: summarizeWorkflowEntrypoints({ items, readyCount }),
  };
}

export function summarizeWorkflowEntrypoints(model: Pick<WorkflowEntrypoints, "items" | "readyCount">): string[] {
  return [
    `${model.items.length} workflow entrypoints are defined including File Reader v1 functional/read-only, Patch Preview v1 functional/preview-only, and Validation Runner v1.`,
    `${model.readyCount} workflows are ready; the rest remain review-required or blocked until approval boundaries exist.`,
    "Phase 58 Approved Patch Apply v1 is the recommended next functional workflow.",
  ];
}
