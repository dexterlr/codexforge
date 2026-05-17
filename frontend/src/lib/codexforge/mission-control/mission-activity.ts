import type {
  MissionActivityItem,
  MissionActivityTimeline,
  MissionReadinessLevel,
} from "./mission-control-types";

export function buildMissionActivityItem(
  id: string,
  label: string,
  phase: string,
  detail: string,
  readiness: MissionReadinessLevel
): MissionActivityItem {
  return { id, label, phase, detail, readiness };
}

export function buildMissionActivityTimeline(): MissionActivityTimeline {
  const items = [
    buildMissionActivityItem("brain-runtime-established", "Brain runtime established", "Foundation", "Runtime memory, context, and health foundations became inspectable.", "ready"),
    buildMissionActivityItem("memory-foundations-added", "Memory foundations added", "Foundation", "Cognitive memory and graph continuity became part of the product posture.", "ready"),
    buildMissionActivityItem("files-command-center-added", "Files command center added", "Engineering", "File context and safe workflow views became available.", "ready"),
    buildMissionActivityItem("safe-patch-preview-added", "Safe patch preview added", "Engineering", "Patch planning moved into preview-first review.", "preview-only"),
    buildMissionActivityItem("creative-production-studio-added", "Creative production studio added", "Production", "Creative briefs, plans, and render queues became reviewable.", "ready"),
    buildMissionActivityItem("operator-run-center-added", "Operator run center added", "Execution", "Run queues and approval gates became visible.", "preview-only"),
    buildMissionActivityItem("local-bridge-added", "Local bridge added", "Execution", "Bridge consent and local handoff posture became explicit.", "future-gated"),
    buildMissionActivityItem("artifact-executor-added", "Artifact executor added", "Artifacts", "Artifact execution previews became inspectable without dashboard execution.", "needs-review"),
    buildMissionActivityItem("artifact-workspace-added", "Artifact workspace added", "Artifacts", "Guarded artifact export boundaries became visible.", "needs-review"),
    buildMissionActivityItem("production-pack-builder-added", "Production pack builder added", "Production", "Packs, manifests, validation, and replay prompts became reviewable.", "needs-review"),
    buildMissionActivityItem("mission-control-added", "Mission control added", "Phase 13", "Unified cockpit brings health, surfaces, actions, readiness, and safety into one readonly view.", "ready"),
    buildMissionActivityItem("reviewed-task-activation-added", "Reviewed Task Activation added", "Phase 23", "Accepted suggestions can become reviewed active plan previews and copy-only /ai handoffs.", "needs-review"),
    buildMissionActivityItem("execution-readiness-added", "Execution Readiness added", "Phase 24", "Activated task plans gain readiness input, step preflight, tool posture, risk, tests, and approval readiness while execution remains blocked.", "needs-review"),
    buildMissionActivityItem("step-runner-preview-added", "Step Runner Preview added", "Phase 25", "Active task steps gain policy posture, approval packet, dry run plan, result preview, and local ledger without execution.", "needs-review"),
    buildMissionActivityItem("read-only-step-execution-added", "Read-Only Step Execution added", "Phase 26", "Approved task steps can run only guarded read-only tools and capture visible evidence while mutation tools remain blocked.", "needs-review"),
    buildMissionActivityItem("evidence-memory-added", "Evidence Memory added", "Phase 27", "Read-only execution evidence becomes reviewable memory candidates with source trace and preview-only Brain merge handoff; no auto-promotion and no graph mutation.", "needs-review"),
    buildMissionActivityItem("evidence-grounded-chat-added", "Evidence-Grounded Chat added", "Phase 28", "Selected reviewed evidence becomes visible chat grounding with local citations, prompt preview, stale or weak warnings, and no hidden context injection.", "needs-review"),
    buildMissionActivityItem("apply-diff-dry-run-added", "Apply-Diff Dry Run added", "Phase 33", "Human-approved apply packets gain deterministic dry-run simulation, affected file validation, conflict checks, result ledger, and no mutation.", "needs-review"),
  ];

  return {
    id: "mission-activity",
    items,
    summary: summarizeMissionActivity(items),
  };
}

export function summarizeMissionActivity(
  timelineOrItems: MissionActivityTimeline | MissionActivityItem[]
): string[] {
  const items = Array.isArray(timelineOrItems)
    ? timelineOrItems
    : timelineOrItems.items;

  return [
    `${items.length} deterministic milestones recorded.`,
    "Timeline order is static and does not use current time.",
  ];
}
