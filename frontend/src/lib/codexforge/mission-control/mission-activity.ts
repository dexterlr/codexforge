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
