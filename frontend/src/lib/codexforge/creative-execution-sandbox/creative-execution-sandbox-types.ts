export type SandboxExecutorKind =
  | "blender"
  | "comfyui"
  | "unreal"
  | "ffmpeg"
  | "local-renderer"
  | "artifact-capture"
  | "manual-export"
  | "unknown";

export type SandboxMode =
  | "dry-run-simulation"
  | "lifecycle-simulation"
  | "cancellation-simulation"
  | "artifact-capture-simulation"
  | "verification-simulation"
  | "full-sandbox";

export type SandboxApprovalPosture =
  | "approval-required"
  | "approval-reviewed"
  | "copy-only"
  | "blocked"
  | "unknown";

export type SandboxBridgeHealthPosture =
  | "reviewed"
  | "preview-only"
  | "manual-only"
  | "missing"
  | "unknown";

export type SandboxRunStepId =
  | "request-accepted"
  | "policy-reviewed"
  | "bridge-health-reviewed"
  | "inputs-validated"
  | "queue-position-simulated"
  | "execution-start-simulated"
  | "progress-simulated"
  | "artifact-capture-simulated"
  | "verification-simulated"
  | "review-handoff-ready"
  | "completed-simulated"
  | "cancelled-simulated"
  | "blocked";

export type SandboxStepStatus =
  | "pending"
  | "ready"
  | "simulated"
  | "completed"
  | "cancelled"
  | "blocked";

export type SandboxLifecycleEventKind =
  | "created"
  | "queued"
  | "preflight-reviewed"
  | "dry-run-started"
  | "running-simulated"
  | "progress-updated"
  | "output-placeholder-created"
  | "cancelled"
  | "failed-simulated"
  | "completed-simulated"
  | "handoff-ready"
  | "review-required"
  | "blocked";

export type SandboxLifecycleStatus =
  | "pending"
  | "simulated"
  | "completed"
  | "cancelled"
  | "blocked"
  | "warning";

export type SandboxCancellationStatus =
  | "not-needed"
  | "available"
  | "simulated"
  | "blocked"
  | "future-only"
  | "unknown";

export type SandboxArtifactType =
  | "image-placeholder"
  | "video-placeholder"
  | "frame-placeholder"
  | "render-log-placeholder"
  | "workflow-json-placeholder"
  | "command-preview-placeholder"
  | "metadata-placeholder"
  | "unknown";

export type SandboxArtifactPreviewStatus =
  | "placeholder-visible"
  | "supplied-evidence"
  | "incomplete"
  | "blocked"
  | "unknown";

export type SandboxArtifactReviewStatus =
  | "review-required"
  | "ready-for-review"
  | "needs-labeling"
  | "blocked"
  | "unknown";

export type SandboxLogLevel =
  | "info"
  | "warning"
  | "error"
  | "blocked"
  | "success"
  | "unknown";

export type SandboxVerificationStatus =
  | "pass"
  | "warning"
  | "risk"
  | "blocker"
  | "unknown";

export type SandboxNextActionId =
  | "review-sandbox-verification"
  | "inspect-fake-artifacts"
  | "open-creative-artifact-review"
  | "review-local-bridge-health"
  | "review-guarded-creative-executor"
  | "revise-adapter-packet"
  | "revise-render-job-preview"
  | "prepare-future-guarded-executor-phase"
  | "stop-and-stabilize";

export type SandboxExecutionRequest = {
  requestId: string;
  sourceExecutorRequestId: string;
  sourceExecutionPacketId: string;
  sourceRoute: string;
  executorKind: SandboxExecutorKind;
  adapterId: string;
  sandboxMode: SandboxMode;
  operatorIntent: string;
  suppliedFakeInputs: string[];
  expectedFakeOutputs: string[];
  approvalPosture: SandboxApprovalPosture;
  localBridgeHealthPosture: SandboxBridgeHealthPosture;
  noRealExecutionGuarantee: string;
  latestMessageAuthorityReminder: string;
};

export type SandboxValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type SandboxRunStep = {
  stepId: SandboxRunStepId;
  order: number;
  label: string;
  status: SandboxStepStatus;
  detail: string;
  sideEffectSummary: string;
  noRealExecution: true;
};

export type SandboxRunModel = {
  runId: string;
  requestId: string;
  executorKind: SandboxExecutorKind;
  adapterId: string;
  lifecycleSteps: SandboxRunStep[];
  simulatedDurationLabel: string;
  expectedFakeArtifacts: string[];
  simulatedLogs: string[];
  simulatedVerificationChecks: string[];
  riskPosture: SandboxVerificationStatus;
  reviewRequired: boolean;
  noExecutionGuarantee: string;
  summary: string[];
};

export type SandboxLifecycleEvent = {
  eventId: string;
  order: number;
  kind: SandboxLifecycleEventKind;
  label: string;
  status: SandboxLifecycleStatus;
  detail: string;
  simulatedTimestampLabel?: string;
  sideEffectSummary: string;
  noRealWorldAction: boolean;
};

export type SandboxLifecycle = {
  lifecycleId: string;
  requestId: string;
  events: SandboxLifecycleEvent[];
  status: SandboxLifecycleStatus;
  summary: string[];
};

export type SandboxCancellationEvent = {
  eventId: string;
  order: number;
  label: string;
  status: SandboxCancellationStatus;
  detail: string;
  noRealAction: true;
};

export type SandboxCancellationPlan = {
  planId: string;
  requestId: string;
  status: SandboxCancellationStatus;
  events: SandboxCancellationEvent[];
  noLocalProcessToKill: string;
  noRealRenderToStop: string;
  futureExecutorKillSwitchRequirement: string;
  reviewRequired: boolean;
  summary: string[];
};

export type SandboxArtifactSimulationItem = {
  artifactId: string;
  type: SandboxArtifactType;
  label: string;
  sourceExecutorKind: SandboxExecutorKind;
  sourceSandboxStep: SandboxRunStepId;
  fakePathLabel: string;
  fakeMetadata: string[];
  previewStatus: SandboxArtifactPreviewStatus;
  reviewStatus: SandboxArtifactReviewStatus;
  provenanceNote: string;
  captureRoute: string;
  noFileWrittenGuarantee: string;
};

export type SandboxArtifactSimulation = {
  simulationId: string;
  requestId: string;
  items: SandboxArtifactSimulationItem[];
  noFileWritesGuarantee: string;
  summary: string[];
};

export type SandboxLogLine = {
  lineId: string;
  order: number;
  level: SandboxLogLevel;
  source: string;
  message: string;
  relatedStepId: SandboxRunStepId;
  simulated: boolean;
  reviewNote: string;
};

export type SandboxLogSimulation = {
  logId: string;
  requestId: string;
  lines: SandboxLogLine[];
  cappedAt: number;
  summary: string[];
};

export type SandboxVerificationCheck = {
  checkId: string;
  label: string;
  status: SandboxVerificationStatus;
  detail: string;
  requiredBeforeHandoff: boolean;
};

export type SandboxVerificationReport = {
  reportId: string;
  requestId: string;
  checks: SandboxVerificationCheck[];
  posture: SandboxVerificationStatus;
  blockerCount: number;
  summary: string[];
};

export type SandboxArtifactReviewPacket = {
  packetId: string;
  runId: string;
  route: string;
  artifacts: SandboxArtifactSimulationItem[];
  safetyNote: string;
  placeholderOnly: true;
};

export type SandboxReviewHandoff = {
  handoffId: string;
  runId: string;
  sandboxRunSummary: string[];
  fakeArtifactList: string[];
  fakeLogSummary: string[];
  verificationSummary: string[];
  reviewBoardRoute: string;
  futureExecutorRoute: string;
  safetyNotes: string[];
  nextOperatorAction: string;
  artifactReviewPacket: SandboxArtifactReviewPacket;
  executorReviewPrompt: string;
  summary: string[];
};

export type SandboxNextAction = {
  actionId: SandboxNextActionId;
  label: string;
  route: string;
  reason: string;
  priority: number;
};

export type SandboxNextActionPlan = {
  planId: string;
  selected: SandboxNextAction;
  candidates: SandboxNextAction[];
  summary: string[];
};

export type CreativeExecutionSandboxSummary = {
  requestReady: boolean;
  runModelReady: boolean;
  lifecycleEventCount: number;
  fakeArtifactCount: number;
  fakeLogCount: number;
  verificationPosture: SandboxVerificationStatus;
  cancellationReadiness: SandboxCancellationStatus;
  reviewHandoffReadiness: string;
  nextSafeAction: string;
};

export type CreativeExecutionSandboxModel = {
  request: SandboxExecutionRequest;
  requestValidation: SandboxValidation;
  runModel: SandboxRunModel;
  lifecycle: SandboxLifecycle;
  cancellationPlan: SandboxCancellationPlan;
  artifactSimulation: SandboxArtifactSimulation;
  logSimulation: SandboxLogSimulation;
  verificationReport: SandboxVerificationReport;
  reviewHandoff: SandboxReviewHandoff;
  nextActionPlan: SandboxNextActionPlan;
  summary: CreativeExecutionSandboxSummary;
};

export function buildCreativeExecutionSandboxStableId(
  prefix: string,
  parts: ReadonlyArray<string | number | boolean | null | undefined>
): string {
  const slug = parts
    .map((part) => String(part ?? "unknown").trim().toLowerCase())
    .join("-")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 110);

  return `${prefix}-${slug || "unknown"}`;
}

export function buildCreativeExecutionSandboxReactKey(
  ...parts: ReadonlyArray<string | number | boolean | null | undefined>
): string {
  return buildCreativeExecutionSandboxStableId("creative-execution-sandbox-key", parts);
}
