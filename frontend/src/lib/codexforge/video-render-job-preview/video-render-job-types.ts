export type VideoRenderKind =
  | "blender-animation-preview"
  | "comfyui-image-sequence-preview"
  | "unreal-sequencer-preview"
  | "mixed-pipeline-preview"
  | "generic-local-render-preview"
  | "storyboard-video-preview"
  | "unknown";

export type VideoRenderSourceAdapter =
  | "blender"
  | "comfyui"
  | "unreal"
  | "mixed"
  | "manual"
  | "unknown";

export type VideoRenderProviderKind =
  | "blender"
  | "comfyui"
  | "unreal"
  | "ffmpeg"
  | "local-renderer"
  | "manual-export"
  | "unknown";

export type VideoRenderExecutionMode =
  | "preview-only"
  | "future-guarded"
  | "disabled"
  | "manual-only";

export type VideoRenderRiskLevel = "low" | "medium" | "high" | "critical" | "unknown";

export type VideoRenderQueueStatus =
  | "planned"
  | "blocked"
  | "approval-required"
  | "waiting-for-assets"
  | "ready-for-future-executor"
  | "manual-only"
  | "unknown";

export type VideoRenderArtifactType =
  | "video"
  | "image-sequence"
  | "frame"
  | "thumbnail"
  | "audio-placeholder"
  | "subtitle-placeholder"
  | "render-log"
  | "project-file-placeholder"
  | "workflow-json"
  | "command-preview"
  | "metadata"
  | "unknown";

export type VideoRenderInput = {
  renderInputId: string;
  sourceCreativePlanId: string;
  sourceAdapterPacketIds: string[];
  renderGoal: string;
  renderKind: VideoRenderKind;
  medium: string;
  outputStyle: string;
  targetDurationLabel: string;
  targetResolutionLabel: string;
  targetFps: number;
  aspectRatio: string;
  frameRangeIntent: string;
  shotHints: string[];
  audioMusicPlaceholder: string;
  subtitleCaptionPlaceholder: string;
  outputArtifactIntent: string[];
  operatorConstraints: string[];
  noExecutionGuarantee: string;
  summary: string[];
};

export type VideoRenderValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type VideoRenderTimelineSegment = {
  segmentId: string;
  label: string;
  startTimeLabel: string;
  durationLabel: string;
  frameRangeLabel: string;
  sourceShotId: string;
  providerHint: VideoRenderProviderKind;
  transitionNote: string;
  expectedArtifactNote: string;
  riskNote: string;
};

export type VideoRenderTimeline = {
  timelineId: string;
  totalDurationLabel: string;
  fps: number;
  frameRange: string;
  segments: VideoRenderTimelineSegment[];
  audioPlaceholder: string;
  captionsPlaceholder: string;
  reviewNotes: string[];
  summary: string[];
};

export type VideoRenderShot = {
  shotId: string;
  label: string;
  visualDescription: string;
  sourceAdapter: VideoRenderSourceAdapter;
  cameraMovement: string;
  durationEstimate: string;
  frameRangeEstimate: string;
  inputAssets: string[];
  outputArtifacts: string[];
  renderNotes: string[];
  safetyNotes: string[];
};

export type VideoRenderShotPlan = {
  shotPlanId: string;
  shots: VideoRenderShot[];
  summary: string[];
};

export type VideoRenderProviderItem = {
  providerId: string;
  label: string;
  providerKind: VideoRenderProviderKind;
  sourceRoute: string;
  requiredAdapterPacket: string;
  expectedInput: string;
  expectedOutput: string;
  executionMode: VideoRenderExecutionMode;
  localRequirement: string;
  riskLevel: VideoRenderRiskLevel;
  approvalRequired: boolean;
  blockedReasons: string[];
};

export type VideoRenderProviderPlan = {
  providerPlanId: string;
  providers: VideoRenderProviderItem[];
  summary: string[];
};

export type VideoRenderQueueItem = {
  queueItemId: string;
  order: number;
  label: string;
  providerKind: VideoRenderProviderKind;
  sourceShotId: string;
  commandPreviewLabel: string;
  expectedArtifacts: string[];
  status: VideoRenderQueueStatus;
  approvalRequired: boolean;
  dependencyIds: string[];
  riskNotes: string[];
  noExecutionGuarantee: string;
};

export type VideoRenderQueuePreview = {
  queuePreviewId: string;
  items: VideoRenderQueueItem[];
  summary: string[];
};

export type VideoRenderArtifactItem = {
  artifactId: string;
  type: VideoRenderArtifactType;
  label: string;
  providerKind: VideoRenderProviderKind;
  sourceQueueItemId: string;
  placeholderOutputPath: string;
  metadataToCapture: string[];
  reviewRoute: string;
  retentionStrategy: string;
  safetyNote: string;
  noWriteGuarantee: string;
};

export type VideoRenderArtifactPlan = {
  artifactPlanId: string;
  items: VideoRenderArtifactItem[];
  summary: string[];
};

export type VideoRenderApprovalPacket = {
  approvalId: string;
  renderInputId: string;
  queueId: string;
  approved: boolean;
  approvalNote: string;
  acknowledgedProviders: boolean;
  acknowledgedExpectedArtifacts: boolean;
  acknowledgedLocalAppRequirements: boolean;
  acknowledgedRenderTimeResourceRisk: boolean;
  acknowledgedFileOutputBoundary: boolean;
  acknowledgedNoAutomaticExecution: boolean;
  acknowledgedCancellationRollbackLimits: boolean;
  acknowledgedLatestMessageAuthority: boolean;
};

export type VideoRenderPolicy = {
  policyId: string;
  previewAllowed: boolean;
  executionAllowed: boolean;
  requestReady: boolean;
  blockedReasons: string[];
  warnings: string[];
  nextSafeAction: string;
};

export type VideoRenderExecutionPacket = {
  packetId: string;
  renderInputId: string;
  providerPlanId: string;
  queuePreviewId: string;
  artifactPlanId: string;
  approvalRequirement: string;
  safetyPolicy: VideoRenderPolicy;
  futureExecutorBoundary: string;
  validationRecommendations: string[];
  noExecutionGuarantee: string;
  summary: string[];
};

export type VideoRenderSummary = {
  renderInputReady: boolean;
  timelineSegmentCount: number;
  shotCount: number;
  providerCount: number;
  queueItemCount: number;
  artifactCount: number;
  approvalReady: boolean;
  policyPosture: string;
  executionBlockedCount: number;
  nextSafeAction: string;
};

export type VideoRenderJobPreviewModel = {
  input: VideoRenderInput;
  inputValidation: VideoRenderValidation;
  timeline: VideoRenderTimeline;
  shotPlan: VideoRenderShotPlan;
  providerPlan: VideoRenderProviderPlan;
  queuePreview: VideoRenderQueuePreview;
  artifactPlan: VideoRenderArtifactPlan;
  approvalPacket: VideoRenderApprovalPacket;
  approvalValidation: VideoRenderValidation;
  policy: VideoRenderPolicy;
  executionPacket: VideoRenderExecutionPacket;
  executionPacketValidation: VideoRenderValidation;
  summary: VideoRenderSummary;
};

export function buildVideoRenderReactKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._/-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
