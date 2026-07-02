export type ProviderGatewayContractBoundaryRouteSlug =
  | "provider-gateway-contract-boundary"
  | "provider-selection-policy-preview"
  | "model-routing-policy-preview"
  | "prompt-review-packet-preview"
  | "credential-vault-boundary-preview"
  | "generation-request-schema-preview"
  | "generation-response-schema-preview"
  | "provider-safety-review-preview"
  | "provider-rate-limit-policy-preview"
  | "provider-quota-policy-preview"
  | "provider-audit-event-preview"
  | "provider-failure-retry-boundary-preview"
  | "frontend-provider-call-blocked-preview"
  | "cockpit-provider-gateway-contract-summary"
  | "first-provider-gateway-contract-candidate"
  | "controlled-provider-gateway-contract-release-candidate";

export type ProviderGatewayContractKind =
  | "controlled-provider-gateway-contract-release-candidate-v1"
  | ProviderGatewayContractBoundaryRouteSlug;

export type ProviderGatewayContractState =
  | "review-only"
  | "synthetic-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type ProviderGatewayContractItem = {
  id: string;
  label: string;
  detail: string;
  state: ProviderGatewayContractState;
};

export type ProviderGatewayContractSectionId =
  | "providerGatewayContract"
  | "providerSelectionPolicy"
  | "modelRoutingPolicy"
  | "promptReviewPacket"
  | "credentialVaultBoundary"
  | "generationRequestSchema"
  | "generationResponseSchema"
  | "providerSafetyReview"
  | "providerRateLimitPolicy"
  | "providerQuotaPolicy"
  | "providerAuditEvent"
  | "providerFailureRetryBoundary"
  | "frontendProviderCallBlocked"
  | "deniedProviderGatewayContractBoundaries";

export type ProviderGatewayContractSection = {
  sectionId: ProviderGatewayContractSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly ProviderGatewayContractItem[];
  state: ProviderGatewayContractState;
};

export type ProviderGatewayContractModel = {
  providerGatewayContractId: string;
  providerGatewayContractKind: ProviderGatewayContractKind;
  providerSelectionPolicy: ProviderGatewayContractSection;
  modelRoutingPolicy: ProviderGatewayContractSection;
  promptReviewPacket: ProviderGatewayContractSection;
  credentialVaultBoundary: ProviderGatewayContractSection;
  generationRequestSchema: ProviderGatewayContractSection;
  generationResponseSchema: ProviderGatewayContractSection;
  providerSafetyReview: ProviderGatewayContractSection;
  providerRateLimitPolicy: ProviderGatewayContractSection;
  providerQuotaPolicy: ProviderGatewayContractSection;
  providerAuditEvent: ProviderGatewayContractSection;
  providerFailureRetryBoundary: ProviderGatewayContractSection;
  frontendProviderCallBlocked: ProviderGatewayContractSection;
  deniedProviderGatewayContractBoundaries: ProviderGatewayContractSection;
  cockpitSummary: readonly ProviderGatewayContractItem[];
  explicitSafetyLimits: readonly string[];
};

export type ProviderGatewayContractRouteDefinition = {
  slug: ProviderGatewayContractBoundaryRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly ProviderGatewayContractSectionId[];
  devOnly: boolean;
};

export type ProviderGatewayContractRouteModel = {
  route: ProviderGatewayContractRouteDefinition;
  providerGatewayContract: ProviderGatewayContractModel;
  sections: readonly ProviderGatewayContractSection[];
  diagnosticRoutes: readonly ProviderGatewayContractRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const PROVIDER_GATEWAY_CONTRACT_MARKERS = [
  "Provider Gateway Contract",
  "Provider Gateway Contract Boundary",
  "Provider Selection Policy",
  "Model Routing Policy",
  "Prompt Review Packet",
  "Credential Vault Boundary",
  "Generation Request Schema",
  "Generation Response Schema",
  "Provider Safety Review",
  "Provider Rate Limit Policy",
  "Provider Quota Policy",
  "Provider Audit Event",
  "Provider Failure Retry Boundary",
  "Frontend Provider Call Blocked",
  "Review-only provider gateway contract",
  "Synthetic data only",
  "No provider calls from the cockpit",
  "No model calls from the cockpit",
  "No connector calls from the cockpit",
  "No prompt sending from the cockpit",
  "No credential storage from the cockpit",
  "No API key storage from the cockpit",
  "No generation from the cockpit",
  "No image generation from the cockpit",
  "No video generation from the cockpit",
  "No voice generation from the cockpit",
  "No script generation from the cockpit",
  "No caption generation from the cockpit",
  "No backend implementation from the cockpit",
  "No API creation from the cockpit",
  "No service deployment from the cockpit",
  "No command execution from the cockpit",
  "No worker dispatch from the cockpit",
  "No render queue creation from the cockpit",
  "No artifact creation from the cockpit",
  "No frontend persistence",
  "Backend-owned provider gateway remains required",
  "Backend-owned credential vault remains required",
  "Backend-owned prompt review remains required",
  "Backend-owned safety review remains required",
  "Backend-owned audit trail remains required",
  "Backend-owned approval capture remains required",
  "Operator review remains required",
  "Explicit operator approval remains required",
] as const;

export const PROVIDER_GATEWAY_CONTRACT_MODEL_FIELDS = [
  "providerGatewayContractId",
  "providerGatewayContractKind",
  "providerSelectionPolicy",
  "modelRoutingPolicy",
  "promptReviewPacket",
  "credentialVaultBoundary",
  "generationRequestSchema",
  "generationResponseSchema",
  "providerSafetyReview",
  "providerRateLimitPolicy",
  "providerQuotaPolicy",
  "providerAuditEvent",
  "providerFailureRetryBoundary",
  "frontendProviderCallBlocked",
  "deniedProviderGatewayContractBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Review-only provider gateway contract.",
  "Synthetic data only.",
  "No provider calls from the cockpit.",
  "No model calls from the cockpit.",
  "No connector calls from the cockpit.",
  "No prompt sending from the cockpit.",
  "No credential storage from the cockpit.",
  "No API key storage from the cockpit.",
  "No generation from the cockpit.",
  "No image generation from the cockpit.",
  "No video generation from the cockpit.",
  "No voice generation from the cockpit.",
  "No script generation from the cockpit.",
  "No caption generation from the cockpit.",
  "No backend implementation from the cockpit.",
  "No API creation from the cockpit.",
  "No service deployment from the cockpit.",
  "No command execution from the cockpit.",
  "No worker dispatch from the cockpit.",
  "No render queue creation from the cockpit.",
  "No artifact creation from the cockpit.",
  "No frontend persistence.",
  "Backend-owned provider gateway remains required.",
  "Backend-owned credential vault remains required.",
  "Backend-owned prompt review remains required.",
  "Backend-owned safety review remains required.",
  "Backend-owned audit trail remains required.",
  "Backend-owned approval capture remains required.",
  "Operator review remains required.",
  "Explicit operator approval remains required.",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic synthetic provider gateway contract planning only.",
  "The cockpit exposes reviewable provider gateway contract surfaces without frontend provider calls, model calls, connector calls, prompt sending, credential storage, API key storage, generation, request dispatch, response persistence, quota mutation, audit persistence, backend implementation, API creation, service deployment, command execution, artifact creation, file mutation, browser storage writes, or frontend persistence.",
  "Provider gateway, credential vault, prompt review, safety review, quota ledger, retry policy, audit trail, and approval capture workflows remain backend-owned and explicitly approved.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No provider call, model call, connector call, prompt send, credential storage, API key storage, generation, request dispatch, response persistence, quota mutation, audit persistence, backend implementation, API creation, service deployment, command execution, worker dispatch, render queue creation, artifact creation, browser storage write, frontend persistence, or frontend file mutation from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned provider gateway remains required.",
  "Backend-owned credential vault remains required.",
  "Backend-owned prompt review remains required.",
  "Backend-owned safety review remains required.",
  "Backend-owned audit trail remains required.",
  "Backend-owned approval capture remains required.",
  "Operator review remains required.",
  "Explicit operator approval remains required.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly ProviderGatewayContractItem[] {
  return [
    {
      id: prefix + "-summary",
      label: "Review summary",
      detail: summary,
      state: "review-only",
    },
    {
      id: prefix + "-blocked",
      label: "Denied path",
      detail: blocked,
      state: "blocked",
    },
    {
      id: prefix + "-approval",
      label: "Approval requirement",
      detail: approval,
      state: "needs-approval",
    },
  ];
}

function createSection({
  sectionId,
  label,
  title,
  humanReadableSummary,
  plannedInputs,
  plannedOutputs,
  checklistPrefix,
  checklistSummary,
  blocked,
  approval,
  state = "synthetic-only",
}: {
  sectionId: ProviderGatewayContractSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  checklistPrefix: string;
  checklistSummary: string;
  blocked: string;
  approval: string;
  state?: ProviderGatewayContractState;
}): ProviderGatewayContractSection {
  return {
    sectionId,
    label,
    title,
    humanReadableSummary,
    plannedInputs,
    plannedOutputs,
    reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
    deniedActions: COMMON_DENIED_ACTIONS,
    safetyNotes: COMMON_SAFETY_NOTES,
    checklist: checklist(checklistPrefix, checklistSummary, blocked, approval),
    state,
  };
}

const SECTIONS: Record<ProviderGatewayContractSectionId, ProviderGatewayContractSection> = {
  providerGatewayContract: createSection({
    sectionId: "providerGatewayContract",
    label: "Provider Gateway Contract Boundary",
    title: "Review-Only Provider Gateway Contract Boundary",
    humanReadableSummary:
      "Provider gateway contract boundary prepares deterministic synthetic provider gateway contract review without frontend provider calls, model calls, prompt sending, credential storage, generation, API creation, service deployment, or persistence.",
    plannedInputs: ["Synthetic gateway map", "Backend prerequisite list", "Denied frontend provider path list", "Explicit approval requirement"],
    plannedOutputs: ["Provider Gateway Contract Boundary", "Review-only provider gateway contract", "Denied provider gateway contract paths", "Explicit operator approval required"],
    checklistPrefix: "provider-gateway-contract-boundary",
    checklistSummary:
      "Provider gateway contract boundary prepares deterministic synthetic provider gateway contract review without frontend provider calls model calls prompt sending credential storage generation API creation service deployment or persistence.",
    blocked:
      "Provider gateway contract boundary does not call providers call models call connectors send prompts store API keys store credentials generate scripts generate images generate videos generate voice generate captions create APIs create services deploy runtimes run commands persist prompts persist requests persist responses persist jobs persist approvals or write files from the UI.",
    approval: "Provider gateway contract boundary requires explicit operator approval.",
    state: "needs-approval",
  }),
  providerSelectionPolicy: createSection({
    sectionId: "providerSelectionPolicy",
    label: "Provider Selection Policy",
    title: "Synthetic Provider Selection Policy Preview",
    humanReadableSummary:
      "Provider selection policy preview shows simulated provider allowlist, capability map, policy owner, approval gate, and denied frontend provider routing.",
    plannedInputs: ["Simulated provider allowlist", "Simulated capability map", "Simulated policy owner", "Simulated approval gate"],
    plannedOutputs: ["Provider Selection Policy", "Denied frontend provider routing", "Backend-owned provider allowlist", "Backend-owned audit trail requirement"],
    checklistPrefix: "provider-selection-policy",
    checklistSummary:
      "Provider selection policy preview shows simulated provider allowlist simulated capability map simulated policy owner simulated approval gate simulated denied frontend provider routing.",
    blocked:
      "Provider selection policy preview does not call providers choose live vendors store credentials or route real requests from the UI.",
    approval:
      "Provider selection policy preview requires backend-owned provider gateway provider allowlist approval capture and audit trail.",
    state: "backend-owned",
  }),
  modelRoutingPolicy: createSection({
    sectionId: "modelRoutingPolicy",
    label: "Model Routing Policy",
    title: "Synthetic Model Routing Policy Preview",
    humanReadableSummary:
      "Model routing policy preview shows simulated model class, routing reason, fallback rule, safety gate, and denied frontend model routing.",
    plannedInputs: ["Simulated model class", "Simulated routing reason", "Simulated fallback rule", "Simulated safety gate"],
    plannedOutputs: ["Model Routing Policy", "Denied frontend model routing", "Backend-owned prompt review requirement", "Backend-owned audit trail requirement"],
    checklistPrefix: "model-routing-policy",
    checklistSummary:
      "Model routing policy preview shows simulated model class simulated routing reason simulated fallback rule simulated safety gate simulated denied frontend model routing.",
    blocked:
      "Model routing policy preview does not call models send prompts route live inference or persist model choices from the UI.",
    approval: "Model routing policy preview requires backend-owned model routing policy safety review prompt review and audit trail.",
    state: "backend-owned",
  }),
  promptReviewPacket: createSection({
    sectionId: "promptReviewPacket",
    label: "Prompt Review Packet",
    title: "Synthetic Prompt Review Packet Preview",
    humanReadableSummary:
      "Prompt review packet preview shows simulated prompt purpose, redaction note, review owner, approval state, and denied frontend prompt sending.",
    plannedInputs: ["Simulated prompt purpose", "Simulated redaction note", "Simulated review owner", "Simulated approval state"],
    plannedOutputs: ["Prompt Review Packet", "Denied frontend prompt sending", "Backend-owned redaction policy", "Backend-owned audit trail requirement"],
    checklistPrefix: "prompt-review-packet",
    checklistSummary:
      "Prompt review packet preview shows simulated prompt purpose simulated redaction note simulated review owner simulated approval state simulated denied frontend prompt sending.",
    blocked:
      "Prompt review packet preview does not send prompts call providers persist prompts or generate outputs from the UI.",
    approval: "Prompt review packet preview requires backend-owned prompt review approval capture redaction policy and audit trail.",
    state: "backend-owned",
  }),
  credentialVaultBoundary: createSection({
    sectionId: "credentialVaultBoundary",
    label: "Credential Vault Boundary",
    title: "Synthetic Credential Vault Boundary Preview",
    humanReadableSummary:
      "Credential vault boundary preview shows simulated vault prerequisite, key rotation prerequisite, access boundary, audit requirement, and denied frontend credential storage.",
    plannedInputs: ["Simulated vault prerequisite", "Simulated key rotation prerequisite", "Simulated access boundary", "Simulated audit requirement"],
    plannedOutputs: ["Credential Vault Boundary", "Denied frontend credential storage", "Backend-owned access policy", "Backend-owned rotation policy"],
    checklistPrefix: "credential-vault-boundary",
    checklistSummary:
      "Credential vault boundary preview shows simulated vault prerequisite simulated key rotation prerequisite simulated access boundary simulated audit requirement simulated denied frontend credential storage.",
    blocked:
      "Credential vault boundary preview does not store API keys store tokens read secrets write secrets or expose credentials from the UI.",
    approval:
      "Credential vault boundary preview requires backend-owned credential vault access policy rotation policy secret scanning and audit trail.",
    state: "backend-owned",
  }),
  generationRequestSchema: createSection({
    sectionId: "generationRequestSchema",
    label: "Generation Request Schema",
    title: "Synthetic Generation Request Schema Preview",
    humanReadableSummary:
      "Generation request schema preview shows simulated request id, content type, input summary, safety flags, and denied frontend request dispatch.",
    plannedInputs: ["Simulated request id", "Simulated content type", "Simulated input summary", "Simulated safety flags"],
    plannedOutputs: ["Generation Request Schema", "Denied frontend request dispatch", "Backend-owned schema validation", "Backend-owned approval capture"],
    checklistPrefix: "generation-request-schema",
    checklistSummary:
      "Generation request schema preview shows simulated request id simulated content type simulated input summary simulated safety flags simulated denied frontend request dispatch.",
    blocked:
      "Generation request schema preview does not create live requests call providers send prompts or persist request payloads from the UI.",
    approval:
      "Generation request schema preview requires backend-owned request schema validation prompt review approval capture and audit trail.",
    state: "backend-owned",
  }),
  generationResponseSchema: createSection({
    sectionId: "generationResponseSchema",
    label: "Generation Response Schema",
    title: "Synthetic Generation Response Schema Preview",
    humanReadableSummary:
      "Generation response schema preview shows simulated response id, output summary, moderation status, artifact pointer placeholder, and denied frontend output persistence.",
    plannedInputs: ["Simulated response id", "Simulated output summary", "Simulated moderation status", "Simulated artifact pointer placeholder"],
    plannedOutputs: ["Generation Response Schema", "Denied frontend output persistence", "Backend-owned moderation review", "Backend-owned artifact policy"],
    checklistPrefix: "generation-response-schema",
    checklistSummary:
      "Generation response schema preview shows simulated response id simulated output summary simulated moderation status simulated artifact pointer placeholder simulated denied frontend output persistence.",
    blocked:
      "Generation response schema preview does not receive live provider responses persist outputs create artifacts or write files from the UI.",
    approval:
      "Generation response schema preview requires backend-owned response schema validation moderation review artifact policy and audit trail.",
    state: "backend-owned",
  }),
  providerSafetyReview: createSection({
    sectionId: "providerSafetyReview",
    label: "Provider Safety Review",
    title: "Synthetic Provider Safety Review Preview",
    humanReadableSummary:
      "Provider safety review preview shows simulated policy check, rights check, brand check, moderation note, and denied frontend approval persistence.",
    plannedInputs: ["Simulated policy check", "Simulated rights check", "Simulated brand check", "Simulated moderation note"],
    plannedOutputs: ["Provider Safety Review", "Denied frontend approval persistence", "Backend-owned moderation workflow", "Backend-owned audit trail requirement"],
    checklistPrefix: "provider-safety-review",
    checklistSummary:
      "Provider safety review preview shows simulated policy check simulated rights check simulated brand check simulated moderation note simulated denied frontend approval persistence.",
    blocked:
      "Provider safety review preview does not moderate live outputs call safety providers approve outputs or publish content from the UI.",
    approval:
      "Provider safety review preview requires backend-owned safety review moderation workflow approval capture and audit trail.",
    state: "backend-owned",
  }),
  providerRateLimitPolicy: createSection({
    sectionId: "providerRateLimitPolicy",
    label: "Provider Rate Limit Policy",
    title: "Synthetic Provider Rate Limit Policy Preview",
    humanReadableSummary:
      "Provider rate limit policy preview shows simulated rate limit, retry window, provider budget, operator threshold, and denied frontend quota mutation.",
    plannedInputs: ["Simulated rate limit", "Simulated retry window", "Simulated provider budget", "Simulated operator threshold"],
    plannedOutputs: ["Provider Rate Limit Policy", "Denied frontend quota mutation", "Backend-owned rate limiter", "Backend-owned retry policy"],
    checklistPrefix: "provider-rate-limit-policy",
    checklistSummary:
      "Provider rate limit policy preview shows simulated rate limit simulated retry window simulated provider budget simulated operator threshold simulated denied frontend quota mutation.",
    blocked:
      "Provider rate limit policy preview does not call providers consume quota create jobs or throttle real requests from the UI.",
    approval: "Provider rate limit policy preview requires backend-owned quota ledger rate limiter retry policy and audit trail.",
    state: "backend-owned",
  }),
  providerQuotaPolicy: createSection({
    sectionId: "providerQuotaPolicy",
    label: "Provider Quota Policy",
    title: "Synthetic Provider Quota Policy Preview",
    humanReadableSummary:
      "Provider quota policy preview shows simulated quota bucket, cost guard, approval threshold, usage summary, and denied frontend billing mutation.",
    plannedInputs: ["Simulated quota bucket", "Simulated cost guard", "Simulated approval threshold", "Simulated usage summary"],
    plannedOutputs: ["Provider Quota Policy", "Denied frontend billing mutation", "Backend-owned quota ledger", "Backend-owned cost controls"],
    checklistPrefix: "provider-quota-policy",
    checklistSummary:
      "Provider quota policy preview shows simulated quota bucket simulated cost guard simulated approval threshold simulated usage summary simulated denied frontend billing mutation.",
    blocked:
      "Provider quota policy preview does not spend credits call providers persist usage or mutate billing state from the UI.",
    approval: "Provider quota policy preview requires backend-owned quota ledger cost controls budget approval and audit trail.",
    state: "backend-owned",
  }),
  providerAuditEvent: createSection({
    sectionId: "providerAuditEvent",
    label: "Provider Audit Event",
    title: "Synthetic Provider Audit Event Preview",
    humanReadableSummary:
      "Provider audit event preview shows simulated audit event, actor binding, redaction state, retention rule, and denied frontend audit persistence.",
    plannedInputs: ["Simulated audit event", "Simulated actor binding", "Simulated redaction state", "Simulated retention rule"],
    plannedOutputs: ["Provider Audit Event", "Denied frontend audit persistence", "Backend-owned event schema", "Backend-owned retention policy"],
    checklistPrefix: "provider-audit-event",
    checklistSummary:
      "Provider audit event preview shows simulated audit event simulated actor binding simulated redaction state simulated retention rule simulated denied frontend audit persistence.",
    blocked:
      "Provider audit event preview does not persist logs transmit telemetry inspect secrets or call audit services from the UI.",
    approval:
      "Provider audit event preview requires backend-owned audit trail event schema redaction policy retention policy and operator review.",
    state: "backend-owned",
  }),
  providerFailureRetryBoundary: createSection({
    sectionId: "providerFailureRetryBoundary",
    label: "Provider Failure Retry Boundary",
    title: "Synthetic Provider Failure Retry Boundary Preview",
    humanReadableSummary:
      "Provider failure retry boundary preview shows simulated provider timeout, moderation hold, quota hold, retry policy, and denied frontend retry dispatch.",
    plannedInputs: ["Simulated provider timeout", "Simulated moderation hold", "Simulated quota hold", "Simulated retry policy"],
    plannedOutputs: ["Provider Failure Retry Boundary", "Denied frontend retry dispatch", "Backend-owned failure ledger", "Backend-owned provider health monitor"],
    checklistPrefix: "provider-failure-retry-boundary",
    checklistSummary:
      "Provider failure retry boundary preview shows simulated provider timeout simulated moderation hold simulated quota hold simulated retry policy simulated denied frontend retry dispatch.",
    blocked:
      "Provider failure retry boundary preview does not retry live requests create jobs dispatch workers call providers or persist failures from the UI.",
    approval:
      "Provider failure retry boundary preview requires backend-owned retry policy failure ledger provider health monitor and audit trail.",
    state: "backend-owned",
  }),
  frontendProviderCallBlocked: createSection({
    sectionId: "frontendProviderCallBlocked",
    label: "Frontend Provider Call Blocked",
    title: "Synthetic Frontend Provider Call Blocked Preview",
    humanReadableSummary:
      "Frontend provider call blocked preview shows denied provider call, model call, prompt send, credential storage, response persistence, and backend prerequisite.",
    plannedInputs: ["Denied provider call", "Denied model call", "Denied prompt send", "Denied credential storage"],
    plannedOutputs: ["Frontend Provider Call Blocked", "Denied response persistence", "Backend-owned provider gateway prerequisite", "Backend-owned audit trail requirement"],
    checklistPrefix: "frontend-provider-call-blocked",
    checklistSummary:
      "Frontend provider call blocked preview shows denied provider call denied model call denied prompt send denied credential storage denied response persistence and backend prerequisite.",
    blocked:
      "Frontend provider call blocked preview blocks frontend provider calls frontend model calls frontend connector calls frontend prompt sending frontend credential storage frontend request dispatch frontend response persistence frontend quota mutation and frontend audit persistence.",
    approval:
      "Frontend provider call blocked preview requires backend-owned provider gateway credential vault prompt review safety review approval capture and audit trail.",
    state: "blocked",
  }),
  deniedProviderGatewayContractBoundaries: createSection({
    sectionId: "deniedProviderGatewayContractBoundaries",
    label: "Denied Provider Gateway Contract Boundaries",
    title: "Denied Provider Gateway Contract Paths",
    humanReadableSummary:
      "Denied provider gateway contract paths remain blocked across frontend provider calls, model calls, connector calls, prompt sending, credential storage, request dispatch, response persistence, quota mutation, audit persistence, generation, service deployment, command execution, artifact creation, and frontend persistence.",
    plannedInputs: ["Denied frontend path list", "Backend prerequisite list", "Operator approval requirement", "Review-only cockpit summary"],
    plannedOutputs: ["Denied provider gateway contract paths", "Backend-owned prerequisites", "Explicit operator approval required", "Synthetic-only review state"],
    checklistPrefix: "denied-provider-gateway-contract-boundaries",
    checklistSummary:
      "Denied provider gateway contract paths remain blocked across frontend provider calls model calls connector calls prompt sending credential storage request dispatch response persistence quota mutation audit persistence generation service deployment command execution artifact creation and frontend persistence.",
    blocked:
      "Denied provider gateway contract paths do not enable provider calls model calls connector calls prompt sending credential storage request dispatch response persistence quota mutation audit persistence generation backend implementation API creation service deployment command execution artifact creation or frontend persistence.",
    approval: "Denied provider gateway contract paths require backend-owned provider gateway, approval capture, audit trail, and explicit operator approval.",
    state: "blocked",
  }),
};

const ALL_SECTION_IDS: readonly ProviderGatewayContractSectionId[] = [
  "providerGatewayContract",
  "providerSelectionPolicy",
  "modelRoutingPolicy",
  "promptReviewPacket",
  "credentialVaultBoundary",
  "generationRequestSchema",
  "generationResponseSchema",
  "providerSafetyReview",
  "providerRateLimitPolicy",
  "providerQuotaPolicy",
  "providerAuditEvent",
  "providerFailureRetryBoundary",
  "frontendProviderCallBlocked",
  "deniedProviderGatewayContractBoundaries",
];

const PROVIDER_GATEWAY_CONTRACT_MODEL: ProviderGatewayContractModel = {
  providerGatewayContractId: "codexforge-provider-gateway-contract-v1",
  providerGatewayContractKind: "controlled-provider-gateway-contract-release-candidate-v1",
  providerSelectionPolicy: SECTIONS.providerSelectionPolicy,
  modelRoutingPolicy: SECTIONS.modelRoutingPolicy,
  promptReviewPacket: SECTIONS.promptReviewPacket,
  credentialVaultBoundary: SECTIONS.credentialVaultBoundary,
  generationRequestSchema: SECTIONS.generationRequestSchema,
  generationResponseSchema: SECTIONS.generationResponseSchema,
  providerSafetyReview: SECTIONS.providerSafetyReview,
  providerRateLimitPolicy: SECTIONS.providerRateLimitPolicy,
  providerQuotaPolicy: SECTIONS.providerQuotaPolicy,
  providerAuditEvent: SECTIONS.providerAuditEvent,
  providerFailureRetryBoundary: SECTIONS.providerFailureRetryBoundary,
  frontendProviderCallBlocked: SECTIONS.frontendProviderCallBlocked,
  deniedProviderGatewayContractBoundaries: SECTIONS.deniedProviderGatewayContractBoundaries,
  cockpitSummary: [
    {
      id: "provider-gateway-contract-summary-provider-selection",
      label: "Provider selection policy",
      detail: "Show provider selection policy as synthetic review-only contract planning with backend-owned provider allowlist.",
      state: "backend-owned",
    },
    {
      id: "provider-gateway-contract-summary-model-routing",
      label: "Model routing policy",
      detail: "Show model routing policy as synthetic review-only contract planning with backend-owned routing, prompt review, and safety review.",
      state: "backend-owned",
    },
    {
      id: "provider-gateway-contract-summary-prompt-review",
      label: "Prompt review packet",
      detail: "Show prompt review packet as synthetic review-only planning with denied frontend prompt sending.",
      state: "review-only",
    },
    {
      id: "provider-gateway-contract-summary-credential-vault",
      label: "Credential vault boundary",
      detail: "Show credential vault boundary as backend-owned only with no frontend credential or API key storage.",
      state: "blocked",
    },
    {
      id: "provider-gateway-contract-summary-frontend-blocked",
      label: "Frontend provider call blocked",
      detail: "Keep frontend provider calls, model calls, connector calls, request dispatch, response persistence, quota mutation, and audit persistence blocked.",
      state: "blocked",
    },
  ],
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

export const PROVIDER_GATEWAY_CONTRACT_ROUTES: readonly ProviderGatewayContractRouteDefinition[] = [
  {
    slug: "provider-gateway-contract-boundary",
    href: "/provider-gateway-contract-boundary",
    phase: "Phase 2042",
    title: "Provider Gateway Contract Boundary",
    commandLabel: "Go to Provider Gateway Contract Boundary",
    summary:
      "Defines the provider gateway contract boundary without frontend provider calls, model calls, connector calls, prompt sending, credential storage, generation, API creation, service deployment, or persistence.",
    markerPhrases: [
      "Provider gateway contract boundary",
      "Provider gateway contract boundary does not call providers call models call connectors send prompts store API keys store credentials generate scripts generate images generate videos generate voice generate captions create APIs create services deploy runtimes run commands persist prompts persist requests persist responses persist jobs persist approvals or write files from the UI",
      "Provider gateway contract boundary requires explicit operator approval",
      "Provider gateway contract boundary prepares deterministic synthetic provider gateway contract review without frontend provider calls model calls prompt sending credential storage generation API creation service deployment or persistence",
      "Denied provider gateway contract paths remain blocked",
      "Provider gateway contract boundary checklist",
    ],
    sectionIds: ["providerGatewayContract", "frontendProviderCallBlocked", "deniedProviderGatewayContractBoundaries"],
    devOnly: true,
  },
  {
    slug: "provider-selection-policy-preview",
    href: "/provider-selection-policy-preview",
    phase: "Phase 2043",
    title: "Provider Selection Policy Preview",
    commandLabel: "Go to Provider Selection Policy Preview",
    summary:
      "Previews provider selection policy without frontend provider calls, live vendor choice, credential storage, or real request routing.",
    markerPhrases: [
      "Provider selection policy preview",
      "Provider selection policy preview does not call providers choose live vendors store credentials or route real requests from the UI",
      "Provider selection policy preview requires backend-owned provider gateway provider allowlist approval capture and audit trail",
      "Provider selection policy preview shows simulated provider allowlist simulated capability map simulated policy owner simulated approval gate simulated denied frontend provider routing",
      "Denied provider selection policy paths remain blocked",
      "Provider selection policy checklist",
    ],
    sectionIds: ["providerSelectionPolicy", "providerGatewayContract", "deniedProviderGatewayContractBoundaries"],
    devOnly: true,
  },
  {
    slug: "model-routing-policy-preview",
    href: "/model-routing-policy-preview",
    phase: "Phase 2044",
    title: "Model Routing Policy Preview",
    commandLabel: "Go to Model Routing Policy Preview",
    summary:
      "Previews model routing policy without model calls, prompt sending, live inference routing, or model choice persistence.",
    markerPhrases: [
      "Model routing policy preview",
      "Model routing policy preview does not call models send prompts route live inference or persist model choices from the UI",
      "Model routing policy preview requires backend-owned model routing policy safety review prompt review and audit trail",
      "Model routing policy preview shows simulated model class simulated routing reason simulated fallback rule simulated safety gate simulated denied frontend model routing",
      "Denied model routing policy paths remain blocked",
      "Model routing policy checklist",
    ],
    sectionIds: ["modelRoutingPolicy", "promptReviewPacket", "deniedProviderGatewayContractBoundaries"],
    devOnly: true,
  },
  {
    slug: "prompt-review-packet-preview",
    href: "/prompt-review-packet-preview",
    phase: "Phase 2045",
    title: "Prompt Review Packet Preview",
    commandLabel: "Go to Prompt Review Packet Preview",
    summary:
      "Previews prompt review packet without prompt sending, provider calls, prompt persistence, or generated outputs.",
    markerPhrases: [
      "Prompt review packet preview",
      "Prompt review packet preview does not send prompts call providers persist prompts or generate outputs from the UI",
      "Prompt review packet preview requires backend-owned prompt review approval capture redaction policy and audit trail",
      "Prompt review packet preview shows simulated prompt purpose simulated redaction note simulated review owner simulated approval state simulated denied frontend prompt sending",
      "Denied prompt review packet paths remain blocked",
      "Prompt review packet checklist",
    ],
    sectionIds: ["promptReviewPacket", "modelRoutingPolicy", "deniedProviderGatewayContractBoundaries"],
    devOnly: true,
  },
  {
    slug: "credential-vault-boundary-preview",
    href: "/credential-vault-boundary-preview",
    phase: "Phase 2046",
    title: "Credential Vault Boundary Preview",
    commandLabel: "Go to Credential Vault Boundary Preview",
    summary:
      "Previews credential vault boundary without API key storage, token storage, secret reads, secret writes, or credential exposure.",
    markerPhrases: [
      "Credential vault boundary preview",
      "Credential vault boundary preview does not store API keys store tokens read secrets write secrets or expose credentials from the UI",
      "Credential vault boundary preview requires backend-owned credential vault access policy rotation policy secret scanning and audit trail",
      "Credential vault boundary preview shows simulated vault prerequisite simulated key rotation prerequisite simulated access boundary simulated audit requirement simulated denied frontend credential storage",
      "Denied credential vault paths remain blocked",
      "Credential vault boundary checklist",
    ],
    sectionIds: ["credentialVaultBoundary", "providerSelectionPolicy", "deniedProviderGatewayContractBoundaries"],
    devOnly: true,
  },
  {
    slug: "generation-request-schema-preview",
    href: "/generation-request-schema-preview",
    phase: "Phase 2047",
    title: "Generation Request Schema Preview",
    commandLabel: "Go to Generation Request Schema Preview",
    summary:
      "Previews generation request schema without live request creation, provider calls, prompt sending, or request payload persistence.",
    markerPhrases: [
      "Generation request schema preview",
      "Generation request schema preview does not create live requests call providers send prompts or persist request payloads from the UI",
      "Generation request schema preview requires backend-owned request schema validation prompt review approval capture and audit trail",
      "Generation request schema preview shows simulated request id simulated content type simulated input summary simulated safety flags simulated denied frontend request dispatch",
      "Denied generation request schema paths remain blocked",
      "Generation request schema checklist",
    ],
    sectionIds: ["generationRequestSchema", "promptReviewPacket", "deniedProviderGatewayContractBoundaries"],
    devOnly: true,
  },
  {
    slug: "generation-response-schema-preview",
    href: "/generation-response-schema-preview",
    phase: "Phase 2048",
    title: "Generation Response Schema Preview",
    commandLabel: "Go to Generation Response Schema Preview",
    summary:
      "Previews generation response schema without live provider responses, output persistence, artifact creation, or file writes.",
    markerPhrases: [
      "Generation response schema preview",
      "Generation response schema preview does not receive live provider responses persist outputs create artifacts or write files from the UI",
      "Generation response schema preview requires backend-owned response schema validation moderation review artifact policy and audit trail",
      "Generation response schema preview shows simulated response id simulated output summary simulated moderation status simulated artifact pointer placeholder simulated denied frontend output persistence",
      "Denied generation response schema paths remain blocked",
      "Generation response schema checklist",
    ],
    sectionIds: ["generationResponseSchema", "generationRequestSchema", "deniedProviderGatewayContractBoundaries"],
    devOnly: true,
  },
  {
    slug: "provider-safety-review-preview",
    href: "/provider-safety-review-preview",
    phase: "Phase 2049",
    title: "Provider Safety Review Preview",
    commandLabel: "Go to Provider Safety Review Preview",
    summary:
      "Previews provider safety review without live moderation, safety provider calls, output approval, or publishing.",
    markerPhrases: [
      "Provider safety review preview",
      "Provider safety review preview does not moderate live outputs call safety providers approve outputs or publish content from the UI",
      "Provider safety review preview requires backend-owned safety review moderation workflow approval capture and audit trail",
      "Provider safety review preview shows simulated policy check simulated rights check simulated brand check simulated moderation note simulated denied frontend approval persistence",
      "Denied provider safety review paths remain blocked",
      "Provider safety review checklist",
    ],
    sectionIds: ["providerSafetyReview", "generationResponseSchema", "deniedProviderGatewayContractBoundaries"],
    devOnly: true,
  },
  {
    slug: "provider-rate-limit-policy-preview",
    href: "/provider-rate-limit-policy-preview",
    phase: "Phase 2050",
    title: "Provider Rate Limit Policy Preview",
    commandLabel: "Go to Provider Rate Limit Policy Preview",
    summary:
      "Previews provider rate limit policy without provider calls, quota consumption, job creation, or real request throttling.",
    markerPhrases: [
      "Provider rate limit policy preview",
      "Provider rate limit policy preview does not call providers consume quota create jobs or throttle real requests from the UI",
      "Provider rate limit policy preview requires backend-owned quota ledger rate limiter retry policy and audit trail",
      "Provider rate limit policy preview shows simulated rate limit simulated retry window simulated provider budget simulated operator threshold simulated denied frontend quota mutation",
      "Denied provider rate limit policy paths remain blocked",
      "Provider rate limit policy checklist",
    ],
    sectionIds: ["providerRateLimitPolicy", "providerQuotaPolicy", "deniedProviderGatewayContractBoundaries"],
    devOnly: true,
  },
  {
    slug: "provider-quota-policy-preview",
    href: "/provider-quota-policy-preview",
    phase: "Phase 2051",
    title: "Provider Quota Policy Preview",
    commandLabel: "Go to Provider Quota Policy Preview",
    summary:
      "Previews provider quota policy without credit spend, provider calls, usage persistence, or billing state mutation.",
    markerPhrases: [
      "Provider quota policy preview",
      "Provider quota policy preview does not spend credits call providers persist usage or mutate billing state from the UI",
      "Provider quota policy preview requires backend-owned quota ledger cost controls budget approval and audit trail",
      "Provider quota policy preview shows simulated quota bucket simulated cost guard simulated approval threshold simulated usage summary simulated denied frontend billing mutation",
      "Denied provider quota policy paths remain blocked",
      "Provider quota policy checklist",
    ],
    sectionIds: ["providerQuotaPolicy", "providerRateLimitPolicy", "deniedProviderGatewayContractBoundaries"],
    devOnly: true,
  },
  {
    slug: "provider-audit-event-preview",
    href: "/provider-audit-event-preview",
    phase: "Phase 2052",
    title: "Provider Audit Event Preview",
    commandLabel: "Go to Provider Audit Event Preview",
    summary:
      "Previews provider audit event without log persistence, telemetry transmission, secret inspection, or audit service calls.",
    markerPhrases: [
      "Provider audit event preview",
      "Provider audit event preview does not persist logs transmit telemetry inspect secrets or call audit services from the UI",
      "Provider audit event preview requires backend-owned audit trail event schema redaction policy retention policy and operator review",
      "Provider audit event preview shows simulated audit event simulated actor binding simulated redaction state simulated retention rule simulated denied frontend audit persistence",
      "Denied provider audit event paths remain blocked",
      "Provider audit event checklist",
    ],
    sectionIds: ["providerAuditEvent", "providerSafetyReview", "deniedProviderGatewayContractBoundaries"],
    devOnly: true,
  },
  {
    slug: "provider-failure-retry-boundary-preview",
    href: "/provider-failure-retry-boundary-preview",
    phase: "Phase 2053",
    title: "Provider Failure Retry Boundary Preview",
    commandLabel: "Go to Provider Failure Retry Boundary Preview",
    summary:
      "Previews provider failure retry boundary without live request retry, job creation, worker dispatch, provider calls, or failure persistence.",
    markerPhrases: [
      "Provider failure retry boundary preview",
      "Provider failure retry boundary preview does not retry live requests create jobs dispatch workers call providers or persist failures from the UI",
      "Provider failure retry boundary preview requires backend-owned retry policy failure ledger provider health monitor and audit trail",
      "Provider failure retry boundary preview shows simulated provider timeout simulated moderation hold simulated quota hold simulated retry policy simulated denied frontend retry dispatch",
      "Denied provider failure retry paths remain blocked",
      "Provider failure retry boundary checklist",
    ],
    sectionIds: ["providerFailureRetryBoundary", "providerAuditEvent", "deniedProviderGatewayContractBoundaries"],
    devOnly: true,
  },
  {
    slug: "frontend-provider-call-blocked-preview",
    href: "/frontend-provider-call-blocked-preview",
    phase: "Phase 2054",
    title: "Frontend Provider Call Blocked Preview",
    commandLabel: "Go to Frontend Provider Call Blocked Preview",
    summary:
      "Previews frontend provider call blocked policy across provider calls, model calls, connector calls, prompt sending, credential storage, request dispatch, response persistence, quota mutation, and audit persistence.",
    markerPhrases: [
      "Frontend provider call blocked preview",
      "Frontend provider call blocked preview blocks frontend provider calls frontend model calls frontend connector calls frontend prompt sending frontend credential storage frontend request dispatch frontend response persistence frontend quota mutation and frontend audit persistence",
      "Frontend provider call blocked preview requires backend-owned provider gateway credential vault prompt review safety review approval capture and audit trail",
      "Frontend provider call blocked preview shows denied provider call denied model call denied prompt send denied credential storage denied response persistence and backend prerequisite",
      "Denied frontend provider call paths remain blocked",
      "Frontend provider call blocked checklist",
    ],
    sectionIds: ["frontendProviderCallBlocked", "providerGatewayContract", "deniedProviderGatewayContractBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-provider-gateway-contract-summary",
    href: "/cockpit-provider-gateway-contract-summary",
    phase: "Phase 2055",
    title: "Cockpit Provider Gateway Contract Summary",
    commandLabel: "Go to Cockpit Provider Gateway Contract Summary",
    summary:
      "Summarizes the provider gateway contract as grouped cockpit content while phase pages remain dev test diagnostics only.",
    markerPhrases: [
      "Cockpit provider gateway contract summary",
      "Cockpit provider gateway contract summary keeps the cockpit as the normal user surface",
      "Cockpit provider gateway contract summary does not call providers call models call connectors send prompts store API keys store credentials generate scripts generate images generate videos generate voice generate captions create APIs create services deploy runtimes run commands persist prompts persist requests persist responses persist jobs persist approvals or write files from the cockpit",
      "Cockpit provider gateway contract summary shows provider selection model routing prompt review credential vault generation request schema generation response schema provider safety review rate limit policy quota policy audit event failure retry frontend provider call blocked and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit provider gateway contract checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-provider-gateway-contract-candidate",
    href: "/first-provider-gateway-contract-candidate",
    phase: "Phase 2056",
    title: "First Provider Gateway Contract Candidate",
    commandLabel: "Go to First Provider Gateway Contract Candidate",
    summary:
      "Combines the first provider gateway contract candidate without provider integration, model integration, connector calls, prompt sending, credential storage, generation, request dispatch, response persistence, quota mutation, audit persistence, API creation, service deployment, command execution, or frontend persistence.",
    markerPhrases: [
      "First provider gateway contract candidate",
      "First provider gateway contract candidate does not enable provider integration model integration connector calls prompt sending credential storage API key storage generation request dispatch response persistence quota mutation audit persistence API creation service deployment command execution or frontend persistence from the UI",
      "First provider gateway contract candidate requires explicit operator approval",
      "Candidate combines provider selection model routing prompt review credential vault request schema response schema safety review rate limits quota policy audit event failure retry frontend provider blocked cockpit summary and denied paths",
      "Denied first provider gateway contract paths remain blocked",
      "First provider gateway contract checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-provider-gateway-contract-release-candidate",
    href: "/controlled-provider-gateway-contract-release-candidate",
    phase: "Phase 2057",
    title: "Controlled Provider Gateway Contract Release Candidate",
    commandLabel: "Go to Controlled Provider Gateway Contract Release Candidate",
    summary:
      "Release candidate deepens the provider gateway contract lane as review-only contract planning without frontend provider calls, model calls, prompt sending, credential storage, request dispatch, response persistence, quota mutation, audit persistence, API creation, service deployment, command execution, generation, or file mutation.",
    markerPhrases: [
      "Controlled provider gateway contract release candidate",
      "Controlled provider gateway contract release candidate does not call providers call models call connectors send prompts store API keys store credentials generate images generate videos generate voice generate scripts generate captions create APIs create services bind ports spawn workers run commands deploy runtimes start runtimes persist prompts persist requests persist responses persist jobs persist approvals persist audit events dispatch workers create artifacts export files upload files download files publish posts schedule content probe localhost write browser storage or guarantee performance from the frontend",
      "Controlled provider gateway contract release requires explicit operator approval",
      "Release candidate deepens the provider gateway contract lane as review-only contract planning without frontend provider calls model calls prompt sending credential storage request dispatch response persistence quota mutation audit persistence API creation service deployment command execution generation or file mutation",
      "Denied controlled provider gateway contract paths remain blocked",
      "Controlled provider gateway contract checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
];

export function buildProviderGatewayContractRouteModel(
  slug: ProviderGatewayContractBoundaryRouteSlug = "controlled-provider-gateway-contract-release-candidate"
): ProviderGatewayContractRouteModel {
  const route = PROVIDER_GATEWAY_CONTRACT_ROUTES.find((candidate) => candidate.slug === slug) ?? PROVIDER_GATEWAY_CONTRACT_ROUTES[0];
  const sections = route.sectionIds.map((sectionId) => SECTIONS[sectionId]);

  return {
    route,
    providerGatewayContract: PROVIDER_GATEWAY_CONTRACT_MODEL,
    sections,
    diagnosticRoutes: PROVIDER_GATEWAY_CONTRACT_ROUTES,
    cockpitMarkers: PROVIDER_GATEWAY_CONTRACT_MARKERS,
    summary:
      "Controlled Provider Gateway Contract Release Candidate keeps provider gateway contracts review-only, synthetic-only, backend-owned, and explicitly approval-gated.",
  };
}

export function buildProviderGatewayContractStableKey(parts: readonly string[]): string {
  return parts.join("__").replace(/[^a-zA-Z0-9_-]/g, "_");
}
