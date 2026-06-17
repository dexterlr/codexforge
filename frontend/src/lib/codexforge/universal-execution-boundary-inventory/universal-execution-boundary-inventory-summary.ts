import type { UniversalExecutionBoundaryInventory, UniversalExecutionBoundaryInventoryBoundary, UniversalExecutionBoundaryInventoryModel } from "./universal-execution-boundary-inventory-types";
import { buildUniversalExecutionBoundaryInventoryStableKey } from "./universal-execution-boundary-inventory-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const UNIVERSAL_EXECUTION_BOUNDARY_INVENTORY_LANGUAGE = [
  "Universal execution boundary inventory",
  "Universal execution boundary inventory does not execute actions",
  "Execution requires explicit operator approval",
  "Unresolved execution boundary blockers stay blocked",
  "Execution family groups",
  "File write boundary",
] as const;

export function buildUniversalExecutionBoundaryInventory(input: Omit<UniversalExecutionBoundaryInventory, "id"> & { idHint: string }): UniversalExecutionBoundaryInventory {
  const { idHint, ...inventory } = input;
  return { id: buildUniversalExecutionBoundaryInventoryStableKey("universal-execution-boundary-inventory", idHint, input.status), ...inventory };
}

export function buildUniversalExecutionBoundaryInventories(): UniversalExecutionBoundaryInventory[] {
  return [
    buildUniversalExecutionBoundaryInventory({
      idHint: "universal-execution-boundary-inventory",
      status: "blocked",
      identity: "Universal execution boundary inventory identity: universal-execution-boundary-inventory maps execution families without running probes, workflows, files, commands, providers, connectors, automations, or runtimes.",
      sections: [
        { label: "Execution family groups", items: ["Execution family groups: coding/project builder, game/server/world builder, video generation, creative pipeline, chatbot/agent builder, research/live research, video-call/meeting assistant, monitoring, connector workflows, provider/local model orchestration, evidence, result, recovery, packaging, and handoff."] },
        { label: "File write boundary", items: ["File write boundary: create, update, delete, rename, move, diff preview, rollback, path allowlist, and path denylist stay blocked until explicitly approved."] },
        { label: "Command boundary", items: ["Command boundary: shell, git, test, build, smoke, package, and server commands are review-only until an approved command execution boundary exists."] },
        { label: "Local runtime boundary", items: ["Local runtime boundary: local servers, ports, processes, bridge calls, lifecycle controls, logs, and stop plans stay blocked until approved."] },
        { label: "Provider/model boundary", items: ["Provider/model boundary: prompts, redaction, cost/rate limit, output handling, provider calls, and local model calls require explicit operator approval."] },
        { label: "Connector boundary", items: ["Connector boundary: account permissions, data scopes, fetches, mutations, redaction, and audit review stay blocked until approved."] },
        { label: "Automation/schedule boundary", items: ["Automation/schedule boundary: schedules, watches, reminders, tasks, background jobs, polling loops, and notifications are not created here."] },
        { label: "Evidence/result/recovery/export boundaries", items: ["Evidence/result/recovery/export boundaries: capture, ingestion, review, persistence, retry, rollback, packaging, and export remain review-only and approval required."] },
        { label: "Denied inventory actions", items: ["Denied inventory actions: execute actions, run probes, write files, run commands, start runtimes, call providers or models, connect accounts, fetch connector data, create automations, capture evidence, store results, trigger recovery, or export packages."] },
        { label: "Unresolved inventory blockers", items: ["Unresolved execution boundary blockers stay blocked: missing approved backend, file, command, runtime, provider, connector, automation, evidence, result, recovery, export, audit, credential, and retention boundaries."] },
      ],
      routes: ["/file-write-approval-boundary", "/command-execution-approval-boundary", "/workflow-profile-registry"],
      nextRecommendedAction: "Next recommended action: review the specific approval boundary pages, keep unresolved execution boundary blockers blocked, and request explicit operator approval only after implementation evidence exists.",
      advancedDetails: `Advanced universal execution boundary inventory details: Universal execution boundary inventory does not execute actions. Execution requires explicit operator approval. Unresolved execution boundary blockers stay blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildUniversalExecutionBoundaryInventoryBoundary(): UniversalExecutionBoundaryInventoryBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeUniversalExecutionBoundaryInventory(model: Pick<UniversalExecutionBoundaryInventoryModel, "universalExecutionBoundaryInventories">): string {
  return "Universal execution boundary inventory reviews " + model.universalExecutionBoundaryInventories.length + " universal execution boundary packet without executing actions. Execution requires explicit operator approval, and unresolved execution boundary blockers stay blocked.";
}

export function buildUniversalExecutionBoundaryInventoryModel(): UniversalExecutionBoundaryInventoryModel {
  const universalExecutionBoundaryInventories = buildUniversalExecutionBoundaryInventories();
  const model: UniversalExecutionBoundaryInventoryModel = {
    title: "Universal execution boundary inventory",
    summary: "",
    reviewPackets: universalExecutionBoundaryInventories,
    universalExecutionBoundaryInventories,
    boundary: buildUniversalExecutionBoundaryInventoryBoundary(),
    language: [...UNIVERSAL_EXECUTION_BOUNDARY_INVENTORY_LANGUAGE],
    advancedDetails: [
      "Boundary inventory identity",
      "Execution family groups",
      "File write boundary",
      "Command boundary",
      "Local runtime boundary",
      "Provider/model boundary",
      "Connector boundary",
      "Automation/schedule boundary",
      "Evidence/result/recovery/export boundaries",
      "Denied inventory actions",
      "Unresolved inventory blockers",
      "Next recommended action",
      "advanced universal execution boundary inventory details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeUniversalExecutionBoundaryInventory(model) };
}
