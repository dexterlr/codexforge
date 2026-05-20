export type MissionReadinessLevel =
  | "ready"
  | "needs-review"
  | "preview-only"
  | "blocked"
  | "future-gated";

export type MissionSurfaceId =
  | "operator-home"
  | "brain"
  | "memory"
  | "memory-inbox"
  | "runtime-journal"
  | "runtime-replay"
  | "brain-snapshots"
  | "snapshot-restore"
  | "brain-continuity"
  | "handoff"
  | "brain-governance"
  | "files"
  | "stabilization"
  | "activity"
  | "readiness"
  | "consolidation"
  | "capabilities"
  | "runs"
  | "bridge"
  | "creative"
  | "video-render"
  | "creative-executor"
  | "local-bridge-health"
  | "blender"
  | "unreal"
  | "creative-bridge"
  | "artifacts"
  | "production"
  | "patch-preview"
  | "approved-patch-apply"
  | "validation-runner"
  | "tasks"
  | "chat";

export type MissionSurfaceStatus =
  | "online"
  | "preview-ready"
  | "approval-gated"
  | "review-needed"
  | "future-gated";

export type MissionRiskPosture =
  | "readonly"
  | "preview-only"
  | "approval-required"
  | "guarded-handoff"
  | "blocked";

export type MissionSurface = {
  id: MissionSurfaceId;
  label: string;
  href: string;
  status: MissionSurfaceStatus;
  role: string;
  riskPosture: MissionRiskPosture;
  nextAction: string;
  readiness: MissionReadinessLevel;
  relatedPhase: string;
};

export type MissionSurfaceRegistry = {
  id: "mission-surface-registry";
  surfaces: MissionSurface[];
  summary: string[];
};

export type MissionHealthDimensionId =
  | "operator-home-dashboard"
  | "runtime"
  | "memory"
  | "brain-recall"
  | "evidence-memory"
  | "evidence-grounded-chat"
  | "memory-review"
  | "operator-memory-inbox"
  | "runtime-event-journal"
  | "runtime-event-replay"
  | "brain-snapshot-manager"
  | "snapshot-restore-gate"
  | "brain-continuity-dashboard"
  | "brain-mutation-governance"
  | "memory-persistence"
  | "brain-merge"
  | "files"
  | "capabilities"
  | "runs"
  | "bridge-consent"
  | "creative-local-bridge"
  | "video-render-job-preview"
  | "guarded-creative-executor"
  | "local-bridge-health"
  | "blender-adapter-preview"
  | "unreal-adapter-preview"
  | "artifacts"
  | "artifact-ingestion"
  | "task-autopilot"
  | "task-activation"
  | "execution-readiness"
  | "step-runner-preview"
  | "read-only-step-execution"
  | "grounded-fix-recommendation"
  | "regression-triage"
  | "regression-fix-queue"
  | "apply-evidence-pack"
  | "apply-diff-dry-run"
  | "apply-diff-execution-gate"
  | "approved-patch-apply"
  | "validation-runner"
  | "stabilization-command-center"
  | "global-activity-feed"
  | "production-pack"
  | "safety";

export type MissionHealthDimension = {
  id: MissionHealthDimensionId;
  label: string;
  readiness: MissionReadinessLevel;
  signal: string;
  detail: string;
};

export type MissionHealthReport = {
  id: "mission-health-report";
  posture: MissionReadinessLevel;
  dimensions: MissionHealthDimension[];
  summary: string[];
};

export type MissionSystemNode = {
  id: MissionSurfaceId | "future-memory";
  label: string;
  detail: string;
};

export type MissionSystemEdge = {
  id: string;
  from: MissionSystemNode["id"];
  to: MissionSystemNode["id"];
  label: string;
  safety: MissionRiskPosture;
};

export type MissionSystemMap = {
  id: "mission-system-map";
  nodes: MissionSystemNode[];
  edges: MissionSystemEdge[];
  summary: string[];
};

export type MissionNextAction = {
  id: string;
  label: string;
  href: string;
  priority: "primary" | "secondary";
  readiness: MissionReadinessLevel;
  safetyNote: string;
};

export type MissionReadinessReport = {
  id: "mission-readiness";
  score: number;
  level: MissionReadinessLevel;
  checks: Array<{
    id: string;
    label: string;
    level: MissionReadinessLevel;
    detail: string;
  }>;
  summary: string[];
};

export type MissionActivityItem = {
  id: string;
  label: string;
  phase: string;
  detail: string;
  readiness: MissionReadinessLevel;
};

export type MissionActivityTimeline = {
  id: "mission-activity";
  items: MissionActivityItem[];
  summary: string[];
};

export type MissionSafetyBoundary = {
  id: "mission-safety-boundary";
  posture: "operator-safe-readonly";
  rules: string[];
  blockedCapabilities: string[];
  summary: string[];
};

export type MissionControlSummary = {
  id: "mission-control-summary";
  registry: MissionSurfaceRegistry;
  health: MissionHealthReport;
  systemMap: MissionSystemMap;
  nextActions: MissionNextAction[];
  primaryAction: MissionNextAction;
  readiness: MissionReadinessReport;
  activity: MissionActivityTimeline;
  safety: MissionSafetyBoundary;
};

export function buildMissionControlReactKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
