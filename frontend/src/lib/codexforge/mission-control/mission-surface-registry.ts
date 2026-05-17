import type {
  MissionSurface,
  MissionSurfaceId,
  MissionSurfaceRegistry,
  MissionSurfaceStatus,
  MissionReadinessLevel,
  MissionRiskPosture,
} from "./mission-control-types";

export function buildMissionSurface(args: {
  id: MissionSurfaceId;
  label: string;
  href: string;
  status: MissionSurfaceStatus;
  role: string;
  riskPosture: MissionRiskPosture;
  nextAction: string;
  readiness: MissionReadinessLevel;
  relatedPhase: string;
}): MissionSurface {
  return { ...args };
}

export function buildMissionSurfaceRegistry(): MissionSurfaceRegistry {
  const surfaces: MissionSurface[] = [
    buildMissionSurface({
      id: "tasks",
      label: "Task Autopilot, Reviewed Task Activation, Execution Readiness, Step Runner Preview, Read-Only Step Execution, and Evidence Memory",
      href: "/tasks",
      status: "review-needed",
      role: "Task suggestions from recalled memory, active context, file risk, patch preview posture, mission readiness, reviewed activation requests, execution readiness review, approval-ready Step Runner Preview packets, approved Read-Only Step Execution evidence capture, and Evidence Memory candidate previews.",
      riskPosture: "preview-only",
      nextAction: "Review read-only evidence memory.",
      readiness: "needs-review",
      relatedPhase: "Task Memory Autopilot, Reviewed Task Activation, Active Task Execution Readiness, Approved Step Runner Preview, Read-Only Step Execution, and Evidence Memory",
    }),
    buildMissionSurface({
      id: "brain",
      label: "Brain",
      href: "/brain",
      status: "online",
      role: "Runtime memory, context continuity, approved Brain memory search, and deterministic local recall signals.",
      riskPosture: "readonly",
      nextAction: "Search Brain memory.",
      readiness: "ready",
      relatedPhase: "Brain Command Center and Brain Memory Search + Recall",
    }),
    buildMissionSurface({
      id: "memory",
      label: "Evidence Memory, Memory Review, and Persistence",
      href: "/memory",
      status: "review-needed",
      role: "Read-only evidence memory candidates, confidence, contradiction risk review, explicit approval, local event persistence, Brain merge readiness, graph diff previews, and approved local graph merge.",
      riskPosture: "preview-only",
      nextAction: "Review read-only evidence memory.",
      readiness: "needs-review",
      relatedPhase: "Evidence Memory, Memory Promotion Review Queue, Approved Memory Persistence, Brain Event Merge Review, and Approved Brain Graph Merge",
    }),
    buildMissionSurface({
      id: "files",
      label: "Files",
      href: "/files",
      status: "preview-ready",
      role: "File context, workflow readiness, and patch preparation.",
      riskPosture: "preview-only",
      nextAction: "Open Files Command Center.",
      readiness: "needs-review",
      relatedPhase: "Files Command Center",
    }),
    buildMissionSurface({
      id: "capabilities",
      label: "Capabilities",
      href: "/capabilities",
      status: "review-needed",
      role: "Tool posture, adapter readiness, and policy boundaries.",
      riskPosture: "approval-required",
      nextAction: "Review capability readiness.",
      readiness: "needs-review",
      relatedPhase: "Capability Cockpit",
    }),
    buildMissionSurface({
      id: "runs",
      label: "Runs",
      href: "/runs",
      status: "approval-gated",
      role: "Operator run queues, replay packets, and guarded execution state.",
      riskPosture: "approval-required",
      nextAction: "Open Operator Run Center.",
      readiness: "preview-only",
      relatedPhase: "Operator Run Center",
    }),
    buildMissionSurface({
      id: "bridge",
      label: "Bridge",
      href: "/bridge",
      status: "approval-gated",
      role: "Local bridge consent, adapter handshake, and run handoff posture.",
      riskPosture: "guarded-handoff",
      nextAction: "Inspect bridge readiness.",
      readiness: "future-gated",
      relatedPhase: "Jarvis Local Bridge",
    }),
    buildMissionSurface({
      id: "creative",
      label: "Creative",
      href: "/creative",
      status: "preview-ready",
      role: "Creative briefs, production planning, and artifact handoffs.",
      riskPosture: "preview-only",
      nextAction: "Review creative production queue.",
      readiness: "ready",
      relatedPhase: "Creative Production Studio",
    }),
    buildMissionSurface({
      id: "artifacts",
      label: "Artifacts",
      href: "/artifacts",
      status: "approval-gated",
      role: "Executor previews and guarded artifact workspace review.",
      riskPosture: "approval-required",
      nextAction: "Review artifact workspace.",
      readiness: "needs-review",
      relatedPhase: "Artifact Executor and Guarded Artifact Workspace",
    }),
    buildMissionSurface({
      id: "production",
      label: "Production",
      href: "/production",
      status: "approval-gated",
      role: "Preview packs, manifests, validation, and export readiness.",
      riskPosture: "approval-required",
      nextAction: "Build production pack.",
      readiness: "needs-review",
      relatedPhase: "Production Pack Builder",
    }),
    buildMissionSurface({
      id: "patch-preview",
      label: "Patch Preview, Patch Preview Queue, Preview Diff Composer, Patch Application Gate, Apply-Diff Dry Run, and Grounded Fix Recommendation",
      href: "/ai",
      status: "preview-ready",
      role: "Safe patch preview before any file mutation path, grounded fix recommendations that route edits to preview-only handoff, queued patch preview items, Preview Diff Composer pseudo-diff packages, Patch Application Gate approval packets, and Apply-Diff Dry Run result ledgers.",
      riskPosture: "preview-only",
      nextAction: "Review dry-run result.",
      readiness: "preview-only",
      relatedPhase: "Safe Patch Preview, Patch Preview Queue, Preview Diff Composer, Patch Application Gate, Apply-Diff Dry Run, and Grounded Fix Recommendation",
    }),
    buildMissionSurface({
      id: "chat",
      label: "Chat and Evidence-Grounded Chat",
      href: "/ai",
      status: "online",
      role: "Primary workspace for planning, operator context, replies, visible chat recall context cards, Evidence-Grounded Chat readiness with selected evidence only, and Grounded Fix Recommendation readiness.",
      riskPosture: "readonly",
      nextAction: "Review grounded fix recommendation.",
      readiness: "ready",
      relatedPhase: "Chat Context Injection from Brain Recall, Evidence-Grounded Chat, and Grounded Fix Recommendation",
    }),
  ];

  return {
    id: "mission-surface-registry",
    surfaces,
    summary: summarizeMissionSurfaces(surfaces),
  };
}

export function summarizeMissionSurfaces(surfaces: MissionSurface[]): string[] {
  const readyCount = surfaces.filter((surface) => surface.readiness === "ready").length;
  const gatedCount = surfaces.filter(
    (surface) =>
      surface.riskPosture === "approval-required" ||
      surface.riskPosture === "guarded-handoff"
  ).length;

  return [
    `${surfaces.length} mission surfaces registered.`,
    `${readyCount} surfaces are ready for readonly review.`,
    `${gatedCount} surfaces are approval gated or guarded handoffs.`,
  ];
}
