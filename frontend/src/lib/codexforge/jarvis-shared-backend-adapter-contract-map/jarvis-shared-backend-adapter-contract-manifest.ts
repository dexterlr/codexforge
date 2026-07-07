import { JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_WORKSPACE_MARKERS } from "./jarvis-shared-backend-adapter-contract-safety";

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_CAPABILITY_IDS = [
  "video.generate",
  "website.create",
  "avatar.prepare",
  "chatbot.plan",
  "trading.paperReview",
  "workflow.prepare",
  "render.publishReview",
] as const;

export type JarvisSharedBackendAdapterContractCapabilityId =
  (typeof JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_CAPABILITY_IDS)[number];

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_FEATURE_DOMAINS = [
  "video",
  "website",
  "avatar",
  "chatbot-brain",
  "trading",
  "workflow",
  "render-publish",
] as const;

export type JarvisSharedBackendAdapterContractFeatureDomain =
  (typeof JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_FEATURE_DOMAINS)[number];

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_RISK_TIERS = [
  "operator-moderate",
  "operator-high",
  "operator-critical",
] as const;

export type JarvisSharedBackendAdapterContractRiskTier =
  (typeof JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_RISK_TIERS)[number];

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_PERMISSION_POSTURES = [
  "approval-required",
  "approval-and-audit-required",
] as const;

export type JarvisSharedBackendAdapterContractPermissionPosture =
  (typeof JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_PERMISSION_POSTURES)[number];

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_APPROVAL_MODES = [
  "operator-review-required",
  "operator-and-policy-review-required",
] as const;

export type JarvisSharedBackendAdapterContractApprovalMode =
  (typeof JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_APPROVAL_MODES)[number];

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_DRY_RUN_MODES = [
  "dry-run-first-required",
] as const;

export type JarvisSharedBackendAdapterContractDryRunMode =
  (typeof JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_DRY_RUN_MODES)[number];

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_BACKEND_ONLY_MODES = [
  "backend-only-required",
] as const;

export type JarvisSharedBackendAdapterContractBackendOnlyMode =
  (typeof JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_BACKEND_ONLY_MODES)[number];

export type JarvisSharedBackendAdapterContractWorkspacePlugStatement =
  (typeof JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_WORKSPACE_MARKERS)[number];

export type JarvisSharedBackendAdapterContractInputEnvelopeName =
  `${string}InputEnvelope`;

export type JarvisSharedBackendAdapterContractOutputEnvelopeName =
  `${string}OutputEnvelope`;

export type JarvisSharedBackendAdapterContractErrorEnvelopeName =
  `${string}ErrorEnvelope`;

export type JarvisSharedBackendAdapterContractManifestRecord = Readonly<{
  adapterId: `jarvis.${JarvisSharedBackendAdapterContractCapabilityId}`;
  capabilityId: JarvisSharedBackendAdapterContractCapabilityId;
  featureDomain: JarvisSharedBackendAdapterContractFeatureDomain;
  workspaceLabel: string;
  riskTier: JarvisSharedBackendAdapterContractRiskTier;
  permissionPosture: JarvisSharedBackendAdapterContractPermissionPosture;
  approvalMode: JarvisSharedBackendAdapterContractApprovalMode;
  dryRunMode: JarvisSharedBackendAdapterContractDryRunMode;
  backendOnlyMode: JarvisSharedBackendAdapterContractBackendOnlyMode;
  inputEnvelopeName: JarvisSharedBackendAdapterContractInputEnvelopeName;
  outputEnvelopeName: JarvisSharedBackendAdapterContractOutputEnvelopeName;
  errorEnvelopeName: JarvisSharedBackendAdapterContractErrorEnvelopeName;
  credentialReferencePosture: "credential reference policy only";
  tokenReferencePosture: "token reference policy only";
  executionPosture: "execution policy remains blocked";
  auditHookPosture: "audit hook readiness only";
  observabilityHookPosture: "observability hook readiness only";
  resultLedgerHookPosture: "result ledger hook readiness only";
  memoryBoundaryPosture: "memory boundary hook readiness only";
  killSwitchPosture: "kill switch hook required";
  lockManagerPosture: "lock manager hook required";
  idempotencyPosture: "idempotency hook required";
  replayBlockPosture: "replay block hook required";
  operatorReviewPosture: "operator review required before adapter execution";
  workspacePlugStatement: JarvisSharedBackendAdapterContractWorkspacePlugStatement;
}>;

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_MANIFEST = [
  {
    adapterId: "jarvis.video.generate",
    capabilityId: "video.generate",
    featureDomain: "video",
    workspaceLabel: "Video Workspace",
    riskTier: "operator-high",
    permissionPosture: "approval-required",
    approvalMode: "operator-review-required",
    dryRunMode: "dry-run-first-required",
    backendOnlyMode: "backend-only-required",
    inputEnvelopeName: "JarvisSharedVideoGenerateInputEnvelope",
    outputEnvelopeName: "JarvisSharedVideoGenerateOutputEnvelope",
    errorEnvelopeName: "JarvisSharedVideoGenerateErrorEnvelope",
    credentialReferencePosture: "credential reference policy only",
    tokenReferencePosture: "token reference policy only",
    executionPosture: "execution policy remains blocked",
    auditHookPosture: "audit hook readiness only",
    observabilityHookPosture: "observability hook readiness only",
    resultLedgerHookPosture: "result ledger hook readiness only",
    memoryBoundaryPosture: "memory boundary hook readiness only",
    killSwitchPosture: "kill switch hook required",
    lockManagerPosture: "lock manager hook required",
    idempotencyPosture: "idempotency hook required",
    replayBlockPosture: "replay block hook required",
    operatorReviewPosture: "operator review required before adapter execution",
    workspacePlugStatement: "video workspace plugs into shared adapter contract",
  },
  {
    adapterId: "jarvis.website.create",
    capabilityId: "website.create",
    featureDomain: "website",
    workspaceLabel: "Website Workspace",
    riskTier: "operator-high",
    permissionPosture: "approval-required",
    approvalMode: "operator-review-required",
    dryRunMode: "dry-run-first-required",
    backendOnlyMode: "backend-only-required",
    inputEnvelopeName: "JarvisSharedWebsiteCreateInputEnvelope",
    outputEnvelopeName: "JarvisSharedWebsiteCreateOutputEnvelope",
    errorEnvelopeName: "JarvisSharedWebsiteCreateErrorEnvelope",
    credentialReferencePosture: "credential reference policy only",
    tokenReferencePosture: "token reference policy only",
    executionPosture: "execution policy remains blocked",
    auditHookPosture: "audit hook readiness only",
    observabilityHookPosture: "observability hook readiness only",
    resultLedgerHookPosture: "result ledger hook readiness only",
    memoryBoundaryPosture: "memory boundary hook readiness only",
    killSwitchPosture: "kill switch hook required",
    lockManagerPosture: "lock manager hook required",
    idempotencyPosture: "idempotency hook required",
    replayBlockPosture: "replay block hook required",
    operatorReviewPosture: "operator review required before adapter execution",
    workspacePlugStatement: "website workspace plugs into shared adapter contract",
  },
  {
    adapterId: "jarvis.avatar.prepare",
    capabilityId: "avatar.prepare",
    featureDomain: "avatar",
    workspaceLabel: "Avatar Workspace",
    riskTier: "operator-high",
    permissionPosture: "approval-required",
    approvalMode: "operator-review-required",
    dryRunMode: "dry-run-first-required",
    backendOnlyMode: "backend-only-required",
    inputEnvelopeName: "JarvisSharedAvatarPrepareInputEnvelope",
    outputEnvelopeName: "JarvisSharedAvatarPrepareOutputEnvelope",
    errorEnvelopeName: "JarvisSharedAvatarPrepareErrorEnvelope",
    credentialReferencePosture: "credential reference policy only",
    tokenReferencePosture: "token reference policy only",
    executionPosture: "execution policy remains blocked",
    auditHookPosture: "audit hook readiness only",
    observabilityHookPosture: "observability hook readiness only",
    resultLedgerHookPosture: "result ledger hook readiness only",
    memoryBoundaryPosture: "memory boundary hook readiness only",
    killSwitchPosture: "kill switch hook required",
    lockManagerPosture: "lock manager hook required",
    idempotencyPosture: "idempotency hook required",
    replayBlockPosture: "replay block hook required",
    operatorReviewPosture: "operator review required before adapter execution",
    workspacePlugStatement: "avatar workspace plugs into shared adapter contract",
  },
  {
    adapterId: "jarvis.chatbot.plan",
    capabilityId: "chatbot.plan",
    featureDomain: "chatbot-brain",
    workspaceLabel: "Chatbot Brain Workspace",
    riskTier: "operator-moderate",
    permissionPosture: "approval-required",
    approvalMode: "operator-review-required",
    dryRunMode: "dry-run-first-required",
    backendOnlyMode: "backend-only-required",
    inputEnvelopeName: "JarvisSharedChatbotPlanInputEnvelope",
    outputEnvelopeName: "JarvisSharedChatbotPlanOutputEnvelope",
    errorEnvelopeName: "JarvisSharedChatbotPlanErrorEnvelope",
    credentialReferencePosture: "credential reference policy only",
    tokenReferencePosture: "token reference policy only",
    executionPosture: "execution policy remains blocked",
    auditHookPosture: "audit hook readiness only",
    observabilityHookPosture: "observability hook readiness only",
    resultLedgerHookPosture: "result ledger hook readiness only",
    memoryBoundaryPosture: "memory boundary hook readiness only",
    killSwitchPosture: "kill switch hook required",
    lockManagerPosture: "lock manager hook required",
    idempotencyPosture: "idempotency hook required",
    replayBlockPosture: "replay block hook required",
    operatorReviewPosture: "operator review required before adapter execution",
    workspacePlugStatement: "chatbot brain plugs into shared adapter contract",
  },
  {
    adapterId: "jarvis.trading.paperReview",
    capabilityId: "trading.paperReview",
    featureDomain: "trading",
    workspaceLabel: "Trading Workspace",
    riskTier: "operator-critical",
    permissionPosture: "approval-and-audit-required",
    approvalMode: "operator-and-policy-review-required",
    dryRunMode: "dry-run-first-required",
    backendOnlyMode: "backend-only-required",
    inputEnvelopeName: "JarvisSharedTradingPaperReviewInputEnvelope",
    outputEnvelopeName: "JarvisSharedTradingPaperReviewOutputEnvelope",
    errorEnvelopeName: "JarvisSharedTradingPaperReviewErrorEnvelope",
    credentialReferencePosture: "credential reference policy only",
    tokenReferencePosture: "token reference policy only",
    executionPosture: "execution policy remains blocked",
    auditHookPosture: "audit hook readiness only",
    observabilityHookPosture: "observability hook readiness only",
    resultLedgerHookPosture: "result ledger hook readiness only",
    memoryBoundaryPosture: "memory boundary hook readiness only",
    killSwitchPosture: "kill switch hook required",
    lockManagerPosture: "lock manager hook required",
    idempotencyPosture: "idempotency hook required",
    replayBlockPosture: "replay block hook required",
    operatorReviewPosture: "operator review required before adapter execution",
    workspacePlugStatement: "trading workspace plugs into shared adapter contract",
  },
  {
    adapterId: "jarvis.workflow.prepare",
    capabilityId: "workflow.prepare",
    featureDomain: "workflow",
    workspaceLabel: "Workflow Workspace",
    riskTier: "operator-high",
    permissionPosture: "approval-required",
    approvalMode: "operator-review-required",
    dryRunMode: "dry-run-first-required",
    backendOnlyMode: "backend-only-required",
    inputEnvelopeName: "JarvisSharedWorkflowPrepareInputEnvelope",
    outputEnvelopeName: "JarvisSharedWorkflowPrepareOutputEnvelope",
    errorEnvelopeName: "JarvisSharedWorkflowPrepareErrorEnvelope",
    credentialReferencePosture: "credential reference policy only",
    tokenReferencePosture: "token reference policy only",
    executionPosture: "execution policy remains blocked",
    auditHookPosture: "audit hook readiness only",
    observabilityHookPosture: "observability hook readiness only",
    resultLedgerHookPosture: "result ledger hook readiness only",
    memoryBoundaryPosture: "memory boundary hook readiness only",
    killSwitchPosture: "kill switch hook required",
    lockManagerPosture: "lock manager hook required",
    idempotencyPosture: "idempotency hook required",
    replayBlockPosture: "replay block hook required",
    operatorReviewPosture: "operator review required before adapter execution",
    workspacePlugStatement: "workflow workspace plugs into shared adapter contract",
  },
  {
    adapterId: "jarvis.render.publishReview",
    capabilityId: "render.publishReview",
    featureDomain: "render-publish",
    workspaceLabel: "Render Publish Workspace",
    riskTier: "operator-high",
    permissionPosture: "approval-and-audit-required",
    approvalMode: "operator-review-required",
    dryRunMode: "dry-run-first-required",
    backendOnlyMode: "backend-only-required",
    inputEnvelopeName: "JarvisSharedRenderPublishReviewInputEnvelope",
    outputEnvelopeName: "JarvisSharedRenderPublishReviewOutputEnvelope",
    errorEnvelopeName: "JarvisSharedRenderPublishReviewErrorEnvelope",
    credentialReferencePosture: "credential reference policy only",
    tokenReferencePosture: "token reference policy only",
    executionPosture: "execution policy remains blocked",
    auditHookPosture: "audit hook readiness only",
    observabilityHookPosture: "observability hook readiness only",
    resultLedgerHookPosture: "result ledger hook readiness only",
    memoryBoundaryPosture: "memory boundary hook readiness only",
    killSwitchPosture: "kill switch hook required",
    lockManagerPosture: "lock manager hook required",
    idempotencyPosture: "idempotency hook required",
    replayBlockPosture: "replay block hook required",
    operatorReviewPosture: "operator review required before adapter execution",
    workspacePlugStatement: "render export publish plugs into shared adapter contract",
  },
] satisfies readonly JarvisSharedBackendAdapterContractManifestRecord[];

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_MANIFEST_DOMAINS =
  JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_MANIFEST.map(
    (record) => record.featureDomain + ": " + record.workspaceLabel
  );
