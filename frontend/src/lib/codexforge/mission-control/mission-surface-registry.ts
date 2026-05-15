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
      label: "Task Autopilot, Reviewed Task Activation, and Execution Readiness",
      href: "/tasks",
      status: "review-needed",
      role: "Task suggestions from recalled memory, active context, file risk, patch preview posture, mission readiness, reviewed activation requests, and execution readiness review.",
      riskPosture: "preview-only",
      nextAction: "Review execution readiness.",
      readiness: "needs-review",
      relatedPhase: "Task Memory Autopilot, Reviewed Task Activation, and Active Task Execution Readiness",
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
      label: "Memory Review and Persistence",
      href: "/memory",
      status: "review-needed",
      role: "Candidate confidence, contradiction risk review, explicit approval, local event persistence, Brain merge readiness, graph diff previews, and approved local graph merge.",
      riskPosture: "preview-only",
      nextAction: "Apply approved Brain merge.",
      readiness: "needs-review",
      relatedPhase: "Memory Promotion Review Queue, Approved Memory Persistence, Brain Event Merge Review, and Approved Brain Graph Merge",
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
      label: "Patch Preview",
      href: "/files",
      status: "preview-ready",
      role: "Safe patch preview before any file mutation path.",
      riskPosture: "preview-only",
      nextAction: "Prepare patch preview.",
      readiness: "preview-only",
      relatedPhase: "Safe Patch Preview",
    }),
    buildMissionSurface({
      id: "chat",
      label: "Chat",
      href: "/ai",
      status: "online",
      role: "Primary workspace for planning, operator context, replies, and visible chat recall context cards.",
      riskPosture: "readonly",
      nextAction: "Use recalled memory in chat.",
      readiness: "ready",
      relatedPhase: "Chat Context Injection from Brain Recall",
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
