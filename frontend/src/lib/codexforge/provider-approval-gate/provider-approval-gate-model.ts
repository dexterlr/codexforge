export type ProviderApprovalGateRouteSlug =
  | "codexforge-cockpit"
  | "provider-approval-gate-boundary"
  | "provider-request-packet"
  | "provider-identity-preview"
  | "prompt-payload-approval-preview"
  | "data-boundary-approval-preview"
  | "privacy-class-approval-preview"
  | "cost-class-approval-preview"
  | "capability-justification-approval-preview"
  | "expiry-replay-protection-preview"
  | "provider-fallback-approval-preview"
  | "provider-denial-route-preview"
  | "provider-evidence-capture-preview"
  | "provider-result-capture-preview"
  | "cockpit-provider-approval-summary"
  | "first-provider-approval-gate-candidate"
  | "controlled-provider-approval-gate-release-candidate";

export type ProviderApprovalGateKind =
  | "provider-approval-gate-preview"
  | "provider-approval-gate-boundary"
  | "provider-request-packet"
  | "provider-identity-preview"
  | "prompt-payload-approval-preview"
  | "data-boundary-approval-preview"
  | "privacy-class-approval-preview"
  | "cost-class-approval-preview"
  | "capability-justification-approval-preview"
  | "expiry-replay-protection-preview"
  | "provider-fallback-approval-preview"
  | "provider-denial-route-preview"
  | "provider-evidence-capture-preview"
  | "provider-result-capture-preview"
  | "first-provider-approval-gate-candidate"
  | "controlled-provider-approval-gate-release-candidate";

export type ProviderApprovalGateState =
  | "preview-only"
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "manual-review"
  | "redacted"
  | "candidate"
  | "release-candidate";

export type ProviderApprovalGateItem = {
  id: string;
  label: string;
  detail: string;
  state: ProviderApprovalGateState;
};

export type ProviderApprovalGateRecord = {
  id: string;
  label: string;
  title: string;
  summary: string;
  state: ProviderApprovalGateState;
  items: readonly ProviderApprovalGateItem[];
};

export type ProviderApprovalGateModel = {
  providerApprovalGateId: string;
  providerApprovalGateKind: ProviderApprovalGateKind;
  modelRouterRef: ProviderApprovalGateRecord;
  goalRef: ProviderApprovalGateRecord;
  projectContextRef: ProviderApprovalGateRecord;
  workProposalRef: ProviderApprovalGateRecord;
  providerRequestPacket: ProviderApprovalGateRecord;
  providerIdentityPreview: ProviderApprovalGateRecord;
  promptPayloadApprovalPreview: ProviderApprovalGateRecord;
  dataBoundaryApprovalPreview: ProviderApprovalGateRecord;
  privacyClassApprovalPreview: ProviderApprovalGateRecord;
  costClassApprovalPreview: ProviderApprovalGateRecord;
  capabilityJustificationApprovalPreview: ProviderApprovalGateRecord;
  expiryReplayProtectionPreview: ProviderApprovalGateRecord;
  providerFallbackApprovalPreview: ProviderApprovalGateRecord;
  providerDenialRoutePreview: ProviderApprovalGateRecord;
  providerEvidenceCapturePreview: ProviderApprovalGateRecord;
  providerResultCapturePreview: ProviderApprovalGateRecord;
  deniedProviderBoundaries: ProviderApprovalGateRecord;
  cockpitSummary: readonly ProviderApprovalGateItem[];
  explicitSafetyLimits: readonly string[];
};

export type ProviderApprovalGateRouteDefinition = {
  slug: ProviderApprovalGateRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  recordIds: readonly string[];
  devOnly: boolean;
};

export type ProviderApprovalGateRouteModel = {
  route: ProviderApprovalGateRouteDefinition;
  providerApprovalGate: ProviderApprovalGateModel;
  records: readonly ProviderApprovalGateRecord[];
  diagnosticRoutes: readonly ProviderApprovalGateRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const PROVIDER_APPROVAL_GATE_COCKPIT_MARKERS = [
  "Provider Approval Gate",
  "Provider Approval",
  "Provider",
  "Model",
  "Prompt",
  "Data Boundary",
  "Privacy",
  "Cost",
  "Capability",
  "Expiry",
  "Replay Protection",
  "Fallback",
  "Denied",
  "Evidence",
  "Result",
  "Audit",
  "No provider calls from the cockpit",
  "No model calls from the cockpit",
  "No connector calls from the cockpit",
  "No prompt sending from the cockpit",
  "No credential storage from the cockpit",
  "Backend-owned provider approval remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Provider Approval Gate is preview-only from the frontend.",
  "It does not call providers from the UI.",
  "It does not call models from the UI.",
  "It does not call connectors from the UI.",
  "It does not send prompts from the UI.",
  "It does not read secrets or API keys.",
  "It does not store credentials in browser storage.",
  "It does not persist provider approvals from the UI.",
  "It does not persist provider evidence/results/audit from the UI.",
  "It does not release execution from the frontend.",
  "It does not hide provider choice.",
  "It does not hide prompt payload.",
  "It does not hide privacy class.",
  "It does not hide cost class.",
  "It prepares a future backend-owned provider approval path.",
  "Explicit operator approval remains required.",
] as const;

function createRecord(
  id: string,
  label: string,
  title: string,
  summary: string,
  state: ProviderApprovalGateState,
  items: readonly ProviderApprovalGateItem[]
): ProviderApprovalGateRecord {
  return { id, label, title, summary, state, items };
}

const MODEL_ROUTER_REF = createRecord(
  "modelRouterRef",
  "Model Router",
  "modelRouterRef",
  "Model Router v2 remains the upstream reference, but Provider Approval Gate adds a visible human boundary before any provider, model, or connector use.",
  "backend-owned",
  [
    {
      id: "router-reference",
      label: "Router reference",
      detail: "Future backend routing can point to a reviewed model router decision after provider approval is granted.",
      state: "backend-owned",
    },
    {
      id: "router-hidden-denied",
      label: "Hidden routing denied",
      detail: "Provider selection, model selection, fallback selection, and denied provider paths stay operator-visible.",
      state: "denied",
    },
    {
      id: "router-no-ui-release",
      label: "No UI release",
      detail: "The frontend does not release model/provider execution from this preview.",
      state: "blocked",
    },
  ]
);

const GOAL_REF = createRecord(
  "goalRef",
  "Goal",
  "goalRef",
  "Goal reference previews why provider help might be requested while keeping the request static and review-only.",
  "review-only",
  [
    {
      id: "goal-visible",
      label: "Visible goal",
      detail: "The operator can review the goal before any provider request packet exists in a future backend path.",
      state: "review-only",
    },
    {
      id: "goal-no-send",
      label: "No prompt sending",
      detail: "The cockpit does not send the goal or derived prompts to providers.",
      state: "blocked",
    },
    {
      id: "goal-approval",
      label: "Approval required",
      detail: "Explicit operator approval remains required before any provider call.",
      state: "needs-approval",
    },
  ]
);

const PROJECT_CONTEXT_REF = createRecord(
  "projectContextRef",
  "Project Context",
  "projectContextRef",
  "Project context reference previews sensitivity and data boundaries without reading secrets or transmitting project content.",
  "review-only",
  [
    {
      id: "context-sensitive",
      label: "Project-sensitive",
      detail: "Project-sensitive context defaults to local-only or manually redacted review before provider consideration.",
      state: "review-only",
    },
    {
      id: "context-secret-block",
      label: "Secret blocked",
      detail: "Secrets, API keys, credentials, and environment values are outside the provider request packet.",
      state: "denied",
    },
    {
      id: "context-connector-block",
      label: "Connector blocked",
      detail: "Connector data does not flow from the cockpit into provider prompts.",
      state: "blocked",
    },
  ]
);

const WORK_PROPOSAL_REF = createRecord(
  "workProposalRef",
  "Work Proposal",
  "workProposalRef",
  "Work proposal reference ties provider approval to a visible capability need, cost class, privacy class, and audit expectation.",
  "review-only",
  [
    {
      id: "proposal-capability-need",
      label: "Capability need",
      detail: "Provider use must be justified by a capability gap that local or cheaper alternatives cannot satisfy.",
      state: "needs-approval",
    },
    {
      id: "proposal-audit",
      label: "Audit expectation",
      detail: "Future backend approval must capture request, approval, evidence, result, and audit references.",
      state: "backend-owned",
    },
    {
      id: "proposal-no-execution",
      label: "No execution",
      detail: "The cockpit remains preview-only and does not start provider work.",
      state: "blocked",
    },
  ]
);

const PROVIDER_REQUEST_PACKET = createRecord(
  "providerRequestPacket",
  "Provider Request Packet",
  "providerRequestPacket",
  "Provider request packet previews provider, model, prompt payload, privacy class, cost class, data boundary, capability justification, and audit needs without sending prompts.",
  "needs-approval",
  [
    {
      id: "request-provider-model",
      label: "Provider and model",
      detail: "The requested provider and model class must be named before approval.",
      state: "review-only",
    },
    {
      id: "request-prompt-privacy-cost",
      label: "Prompt privacy cost",
      detail: "Prompt payload, privacy class, cost class, and data boundary are visible in the packet.",
      state: "needs-approval",
    },
    {
      id: "request-no-send",
      label: "No prompt send",
      detail: "The packet is static preview content and does not transmit prompt payloads.",
      state: "blocked",
    },
  ]
);

const PROVIDER_IDENTITY_PREVIEW = createRecord(
  "providerIdentityPreview",
  "Provider Identity",
  "providerIdentityPreview",
  "Provider identity preview shows provider name, model class, local, private, paid, pro, specialist, connector status, and denied identities without querying providers.",
  "review-only",
  [
    {
      id: "identity-provider",
      label: "Provider",
      detail: "Provider name and model class are visible to prevent hidden provider choice.",
      state: "review-only",
    },
    {
      id: "identity-classes",
      label: "Class flags",
      detail: "Local, private, paid, pro, specialist, and connector status are listed before use.",
      state: "review-only",
    },
    {
      id: "identity-denied",
      label: "Denied identities",
      detail: "Unknown, disallowed, stale, or hidden provider identities remain blocked.",
      state: "denied",
    },
  ]
);

const PROMPT_PAYLOAD_APPROVAL_PREVIEW = createRecord(
  "promptPayloadApprovalPreview",
  "Prompt Payload",
  "promptPayloadApprovalPreview",
  "Prompt payload approval preview shows goal, context, files, commands, evidence, redaction, privacy, and denied payload sections before provider use.",
  "needs-approval",
  [
    {
      id: "prompt-visible",
      label: "Prompt visible",
      detail: "The prompt payload that would be approved is shown before any provider call.",
      state: "review-only",
    },
    {
      id: "prompt-redaction",
      label: "Redaction",
      detail: "Redacted, blocked, and manually reviewed payload sections are explicit.",
      state: "redacted",
    },
    {
      id: "prompt-no-send",
      label: "No sending",
      detail: "The UI does not send prompt payloads to providers, models, or connectors.",
      state: "blocked",
    },
  ]
);

const DATA_BOUNDARY_APPROVAL_PREVIEW = createRecord(
  "dataBoundaryApprovalPreview",
  "Data Boundary",
  "dataBoundaryApprovalPreview",
  "Data boundary approval preview shows local-only, project-sensitive, provider-allowed, connector-blocked, secret-blocked, and manually-redacted data boundaries.",
  "review-only",
  [
    {
      id: "data-local-project",
      label: "Local and project",
      detail: "Local-only and project-sensitive boundaries are favored before provider-allowed data.",
      state: "review-only",
    },
    {
      id: "data-provider-allowed",
      label: "Provider-allowed",
      detail: "Provider-allowed data must be manually reviewed and approved by the operator.",
      state: "needs-approval",
    },
    {
      id: "data-blocked",
      label: "Blocked data",
      detail: "Connector data, secrets, credentials, and unredacted private sections remain denied.",
      state: "denied",
    },
  ]
);

const PRIVACY_CLASS_APPROVAL_PREVIEW = createRecord(
  "privacyClassApprovalPreview",
  "Privacy",
  "privacyClassApprovalPreview",
  "Privacy class approval preview shows local-only, private, project-sensitive, provider-allowed, public-safe, and blocked privacy classes.",
  "review-only",
  [
    {
      id: "privacy-local-private",
      label: "Local/private",
      detail: "Local-only and private classes remain preferred when project data is sensitive.",
      state: "review-only",
    },
    {
      id: "privacy-provider",
      label: "Provider allowed",
      detail: "Provider-allowed and public-safe classes require visible approval scope.",
      state: "needs-approval",
    },
    {
      id: "privacy-blocked",
      label: "Blocked",
      detail: "Blocked privacy classes cannot be routed to providers.",
      state: "denied",
    },
  ]
);

const COST_CLASS_APPROVAL_PREVIEW = createRecord(
  "costClassApprovalPreview",
  "Cost",
  "costClassApprovalPreview",
  "Cost class approval preview shows free, local, low-cost, paid, pro, specialist, unknown, and blocked cost classes without spending tokens.",
  "review-only",
  [
    {
      id: "cost-cheapest",
      label: "Cheapest capable",
      detail: "Free, local, and low-cost classes are preferred when capability and privacy requirements are satisfied.",
      state: "review-only",
    },
    {
      id: "cost-paid-pro",
      label: "Paid/pro/specialist",
      detail: "Paid, pro, and specialist classes require explicit capability and cost justification.",
      state: "needs-approval",
    },
    {
      id: "cost-unknown-blocked",
      label: "Unknown or blocked",
      detail: "Unknown and blocked cost classes cannot be approved from the cockpit.",
      state: "denied",
    },
  ]
);

const CAPABILITY_JUSTIFICATION_APPROVAL_PREVIEW = createRecord(
  "capabilityJustificationApprovalPreview",
  "Capability",
  "capabilityJustificationApprovalPreview",
  "Capability justification approval preview explains capability gap, domain fit, cheaper alternatives, local alternatives, privacy tradeoff, cost class, and expected benefit.",
  "needs-approval",
  [
    {
      id: "capability-gap",
      label: "Capability gap",
      detail: "Provider use must explain the gap that local, free, or cheaper classes cannot cover.",
      state: "needs-approval",
    },
    {
      id: "capability-tradeoff",
      label: "Tradeoff",
      detail: "Domain fit, privacy tradeoff, cost class, and expected benefit are shown before approval.",
      state: "review-only",
    },
    {
      id: "capability-no-model-call",
      label: "No model call",
      detail: "The preview does not call models to prove capability.",
      state: "blocked",
    },
  ]
);

const EXPIRY_REPLAY_PROTECTION_PREVIEW = createRecord(
  "expiryReplayProtectionPreview",
  "Expiry and Replay Protection",
  "expiryReplayProtectionPreview",
  "Expiry replay protection preview shows approval scope, expiry, stale approval handling, replay prevention, prompt hash, provider hash, and operator confirmation.",
  "needs-approval",
  [
    {
      id: "expiry-scope",
      label: "Approval scope",
      detail: "Future approval must bind to a specific provider, model, prompt, data boundary, privacy class, and cost class.",
      state: "backend-owned",
    },
    {
      id: "expiry-replay",
      label: "Replay protection",
      detail: "Stale approvals, prompt hash mismatch, provider hash mismatch, and replay attempts remain blocked.",
      state: "blocked",
    },
    {
      id: "expiry-no-persist",
      label: "No UI persistence",
      detail: "The cockpit does not persist approvals or replay tokens.",
      state: "denied",
    },
  ]
);

const PROVIDER_FALLBACK_APPROVAL_PREVIEW = createRecord(
  "providerFallbackApprovalPreview",
  "Fallback",
  "providerFallbackApprovalPreview",
  "Provider fallback approval preview shows local fallback, cheaper fallback, safer fallback, manual review fallback, provider denied fallback, and blocked fallback states.",
  "needs-approval",
  [
    {
      id: "fallback-allowed",
      label: "Allowed fallback",
      detail: "Local, cheaper, and safer fallback options can be previewed only when operator-visible.",
      state: "review-only",
    },
    {
      id: "fallback-manual",
      label: "Manual review",
      detail: "Fallback to a different provider requires separate explicit approval.",
      state: "manual-review",
    },
    {
      id: "fallback-blocked",
      label: "Blocked fallback",
      detail: "Provider-denied, hidden, or higher-risk fallback paths remain blocked.",
      state: "denied",
    },
  ]
);

const PROVIDER_DENIAL_ROUTE_PREVIEW = createRecord(
  "providerDenialRoutePreview",
  "Denied Route",
  "providerDenialRoutePreview",
  "Provider denial route preview blocks secret payloads, private context, disallowed providers, high-cost unapproved specialist routes, connector leakage, stale approval, and unsupported capability routes.",
  "blocked",
  [
    {
      id: "denial-secret-private",
      label: "Secret/private blocked",
      detail: "Secret payloads and private context cannot route to providers.",
      state: "denied",
    },
    {
      id: "denial-provider-cost",
      label: "Provider and cost blocked",
      detail: "Disallowed providers, high-cost classes, and unapproved specialist routes remain denied.",
      state: "denied",
    },
    {
      id: "denial-stale-unsupported",
      label: "Stale or unsupported",
      detail: "Connector leakage, stale approval, and unsupported capability routes are blocked.",
      state: "blocked",
    },
  ]
);

const PROVIDER_EVIDENCE_CAPTURE_PREVIEW = createRecord(
  "providerEvidenceCapturePreview",
  "Evidence",
  "providerEvidenceCapturePreview",
  "Provider evidence capture preview shows provider request, prompt payload, redaction, approval, provider class, model class, response reference, and audit linkage without UI persistence.",
  "backend-owned",
  [
    {
      id: "evidence-request",
      label: "Request evidence",
      detail: "Future backend evidence capture can link provider request, prompt payload, redaction, and approval.",
      state: "backend-owned",
    },
    {
      id: "evidence-response",
      label: "Response reference",
      detail: "Provider class, model class, response reference, and audit linkage stay backend-owned.",
      state: "backend-owned",
    },
    {
      id: "evidence-no-persist",
      label: "No UI persistence",
      detail: "The cockpit does not persist provider evidence from the UI.",
      state: "blocked",
    },
  ]
);

const PROVIDER_RESULT_CAPTURE_PREVIEW = createRecord(
  "providerResultCapturePreview",
  "Result",
  "providerResultCapturePreview",
  "Provider result capture preview shows success, blocked, denied, failed, timeout, canceled, fallback, manual-review, redacted, and operator-accepted provider outcomes without UI persistence.",
  "backend-owned",
  [
    {
      id: "result-outcomes",
      label: "Outcome states",
      detail: "Success, blocked, denied, failed, timeout, canceled, fallback, manual-review, redacted, and operator-accepted outcomes are visible.",
      state: "review-only",
    },
    {
      id: "result-backend",
      label: "Backend-owned capture",
      detail: "Future backend result capture owns provider outcome persistence and audit linkage.",
      state: "backend-owned",
    },
    {
      id: "result-no-persist",
      label: "No UI persistence",
      detail: "The cockpit does not persist provider results from the UI.",
      state: "blocked",
    },
  ]
);

const DENIED_PROVIDER_BOUNDARIES = createRecord(
  "deniedProviderBoundaries",
  "Denied Provider Boundaries",
  "deniedProviderBoundaries",
  "Denied provider boundaries keep hidden approvals, hidden provider routing, hidden model routing, prompt sending, credential storage, connector calls, and frontend execution blocked.",
  "denied",
  [
    {
      id: "denied-hidden-approval",
      label: "Hidden approval denied",
      detail: "No hidden approvals, hidden provider choice, or hidden model routing are allowed.",
      state: "denied",
    },
    {
      id: "denied-credentials",
      label: "Credentials denied",
      detail: "API keys, secrets, credentials, and browser credential storage are blocked.",
      state: "denied",
    },
    {
      id: "denied-execution",
      label: "Execution denied",
      detail: "Provider calls, connector calls, prompt sending, file mutation, command execution, queues, transactions, and audit persistence are not released from the frontend.",
      state: "blocked",
    },
  ]
);

const COCKPIT_SUMMARY: readonly ProviderApprovalGateItem[] = [
  {
    id: "provider",
    label: "Provider",
    detail: "Provider name is visible before approval and no provider calls from the cockpit occur.",
    state: "review-only",
  },
  {
    id: "model",
    label: "Model",
    detail: "Model class is visible before approval and no model calls from the cockpit occur.",
    state: "review-only",
  },
  {
    id: "prompt",
    label: "Prompt",
    detail: "Prompt payload is visible for approval and no prompt sending from the cockpit occurs.",
    state: "needs-approval",
  },
  {
    id: "data-boundary",
    label: "Data Boundary",
    detail: "Local-only, project-sensitive, provider-allowed, connector-blocked, secret-blocked, and manually-redacted boundaries are explicit.",
    state: "review-only",
  },
  {
    id: "privacy",
    label: "Privacy",
    detail: "Privacy class is visible and cannot be hidden or widened by the frontend.",
    state: "needs-approval",
  },
  {
    id: "cost",
    label: "Cost",
    detail: "Cost class is visible and cannot spend tokens or call providers from the cockpit.",
    state: "needs-approval",
  },
  {
    id: "capability",
    label: "Capability",
    detail: "Capability justification shows gap, alternatives, tradeoff, and expected benefit before use.",
    state: "needs-approval",
  },
  {
    id: "expiry",
    label: "Expiry",
    detail: "Approval scope and expiry prevent stale provider approval.",
    state: "backend-owned",
  },
  {
    id: "replay-protection",
    label: "Replay Protection",
    detail: "Prompt hash, provider hash, and operator confirmation prevent approval replay.",
    state: "backend-owned",
  },
  {
    id: "fallback",
    label: "Fallback",
    detail: "Fallback is allowed only when explicitly visible and approved.",
    state: "manual-review",
  },
  {
    id: "denied",
    label: "Denied",
    detail: "Denied provider paths remain blocked before any provider use.",
    state: "denied",
  },
  {
    id: "evidence",
    label: "Evidence",
    detail: "Evidence capture is backend-owned and not persisted from the UI.",
    state: "backend-owned",
  },
  {
    id: "result",
    label: "Result",
    detail: "Provider result capture is backend-owned and not persisted from the UI.",
    state: "backend-owned",
  },
  {
    id: "audit",
    label: "Audit",
    detail: "Audit linkage remains backend-owned and approval-required.",
    state: "backend-owned",
  },
] as const;

const PROVIDER_APPROVAL_GATE_MODEL: ProviderApprovalGateModel = {
  providerApprovalGateId: "provider-approval-gate-1546-1561-preview",
  providerApprovalGateKind: "provider-approval-gate-preview",
  modelRouterRef: MODEL_ROUTER_REF,
  goalRef: GOAL_REF,
  projectContextRef: PROJECT_CONTEXT_REF,
  workProposalRef: WORK_PROPOSAL_REF,
  providerRequestPacket: PROVIDER_REQUEST_PACKET,
  providerIdentityPreview: PROVIDER_IDENTITY_PREVIEW,
  promptPayloadApprovalPreview: PROMPT_PAYLOAD_APPROVAL_PREVIEW,
  dataBoundaryApprovalPreview: DATA_BOUNDARY_APPROVAL_PREVIEW,
  privacyClassApprovalPreview: PRIVACY_CLASS_APPROVAL_PREVIEW,
  costClassApprovalPreview: COST_CLASS_APPROVAL_PREVIEW,
  capabilityJustificationApprovalPreview: CAPABILITY_JUSTIFICATION_APPROVAL_PREVIEW,
  expiryReplayProtectionPreview: EXPIRY_REPLAY_PROTECTION_PREVIEW,
  providerFallbackApprovalPreview: PROVIDER_FALLBACK_APPROVAL_PREVIEW,
  providerDenialRoutePreview: PROVIDER_DENIAL_ROUTE_PREVIEW,
  providerEvidenceCapturePreview: PROVIDER_EVIDENCE_CAPTURE_PREVIEW,
  providerResultCapturePreview: PROVIDER_RESULT_CAPTURE_PREVIEW,
  deniedProviderBoundaries: DENIED_PROVIDER_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const RECORD_LOOKUP: Record<string, ProviderApprovalGateRecord> = {
  modelRouterRef: MODEL_ROUTER_REF,
  goalRef: GOAL_REF,
  projectContextRef: PROJECT_CONTEXT_REF,
  workProposalRef: WORK_PROPOSAL_REF,
  providerRequestPacket: PROVIDER_REQUEST_PACKET,
  providerIdentityPreview: PROVIDER_IDENTITY_PREVIEW,
  promptPayloadApprovalPreview: PROMPT_PAYLOAD_APPROVAL_PREVIEW,
  dataBoundaryApprovalPreview: DATA_BOUNDARY_APPROVAL_PREVIEW,
  privacyClassApprovalPreview: PRIVACY_CLASS_APPROVAL_PREVIEW,
  costClassApprovalPreview: COST_CLASS_APPROVAL_PREVIEW,
  capabilityJustificationApprovalPreview: CAPABILITY_JUSTIFICATION_APPROVAL_PREVIEW,
  expiryReplayProtectionPreview: EXPIRY_REPLAY_PROTECTION_PREVIEW,
  providerFallbackApprovalPreview: PROVIDER_FALLBACK_APPROVAL_PREVIEW,
  providerDenialRoutePreview: PROVIDER_DENIAL_ROUTE_PREVIEW,
  providerEvidenceCapturePreview: PROVIDER_EVIDENCE_CAPTURE_PREVIEW,
  providerResultCapturePreview: PROVIDER_RESULT_CAPTURE_PREVIEW,
  deniedProviderBoundaries: DENIED_PROVIDER_BOUNDARIES,
};

const ALL_RECORD_IDS = [
  "modelRouterRef",
  "goalRef",
  "projectContextRef",
  "workProposalRef",
  "providerRequestPacket",
  "providerIdentityPreview",
  "promptPayloadApprovalPreview",
  "dataBoundaryApprovalPreview",
  "privacyClassApprovalPreview",
  "costClassApprovalPreview",
  "capabilityJustificationApprovalPreview",
  "expiryReplayProtectionPreview",
  "providerFallbackApprovalPreview",
  "providerDenialRoutePreview",
  "providerEvidenceCapturePreview",
  "providerResultCapturePreview",
  "deniedProviderBoundaries",
] as const;

const ROUTES: readonly ProviderApprovalGateRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Provider Approval Gate",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary:
      "Cockpit provider approval summary keeps Provider Approval in the normal user cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: PROVIDER_APPROVAL_GATE_COCKPIT_MARKERS,
    recordIds: ALL_RECORD_IDS,
    devOnly: false,
  },
  {
    slug: "provider-approval-gate-boundary",
    href: "/provider-approval-gate-boundary",
    phase: "Phase 1546",
    title: "Provider Approval Gate Boundary",
    commandLabel: "Go to Provider Approval Gate Boundary",
    summary: "Defines the explicit human approval boundary before any future provider, model, or connector use.",
    markerPhrases: [
      "Provider approval gate boundary",
      "Provider approval gate boundary does not call providers from the UI",
      "Provider approval gate requires explicit operator approval before provider use",
      "Provider approval gate prepares backend-owned provider approval without hidden routing",
      "Denied provider approval gate paths remain blocked",
      "Provider approval gate checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "provider-request-packet",
    href: "/provider-request-packet",
    phase: "Phase 1547",
    title: "Provider Request Packet",
    commandLabel: "Go to Provider Request Packet",
    summary: "Previews the provider request packet without sending prompts.",
    markerPhrases: [
      "Provider request packet",
      "Provider request packet does not send prompts",
      "Provider request packet requires explicit operator approval",
      "Provider request packet previews provider model prompt payload privacy class cost class data boundary capability justification and audit needs",
      "Denied provider request paths remain blocked",
      "Provider request packet checklist",
    ],
    recordIds: ["providerRequestPacket", "providerIdentityPreview", "promptPayloadApprovalPreview", "deniedProviderBoundaries"],
    devOnly: true,
  },
  {
    slug: "provider-identity-preview",
    href: "/provider-identity-preview",
    phase: "Phase 1548",
    title: "Provider Identity Preview",
    commandLabel: "Go to Provider Identity Preview",
    summary: "Previews provider identity without querying providers.",
    markerPhrases: [
      "Provider identity preview",
      "Provider identity preview does not query providers",
      "Provider identity preview requires explicit operator approval",
      "Provider identity preview shows provider name model class local private paid pro specialist connector status and denied identities",
      "Denied provider identity paths remain blocked",
      "Provider identity checklist",
    ],
    recordIds: ["providerIdentityPreview", "providerRequestPacket", "deniedProviderBoundaries"],
    devOnly: true,
  },
  {
    slug: "prompt-payload-approval-preview",
    href: "/prompt-payload-approval-preview",
    phase: "Phase 1549",
    title: "Prompt Payload Approval Preview",
    commandLabel: "Go to Prompt Payload Approval Preview",
    summary: "Previews prompt payload approval without sending prompt payloads.",
    markerPhrases: [
      "Prompt payload approval preview",
      "Prompt payload approval preview does not send prompt payloads",
      "Prompt payload approval preview requires explicit operator approval",
      "Prompt payload approval preview shows goal context files commands evidence redaction privacy and denied payload sections before provider use",
      "Denied prompt payload approval paths remain blocked",
      "Prompt payload approval checklist",
    ],
    recordIds: ["promptPayloadApprovalPreview", "goalRef", "projectContextRef", "workProposalRef", "deniedProviderBoundaries"],
    devOnly: true,
  },
  {
    slug: "data-boundary-approval-preview",
    href: "/data-boundary-approval-preview",
    phase: "Phase 1550",
    title: "Data Boundary Approval Preview",
    commandLabel: "Go to Data Boundary Approval Preview",
    summary: "Previews data boundary approval without transmitting data.",
    markerPhrases: [
      "Data boundary approval preview",
      "Data boundary approval preview does not transmit data",
      "Data boundary approval preview requires explicit operator approval",
      "Data boundary approval preview shows local-only project-sensitive provider-allowed connector-blocked secret-blocked and manually-redacted data boundaries",
      "Denied data boundary paths remain blocked",
      "Data boundary approval checklist",
    ],
    recordIds: ["dataBoundaryApprovalPreview", "projectContextRef", "promptPayloadApprovalPreview", "deniedProviderBoundaries"],
    devOnly: true,
  },
  {
    slug: "privacy-class-approval-preview",
    href: "/privacy-class-approval-preview",
    phase: "Phase 1551",
    title: "Privacy Class Approval Preview",
    commandLabel: "Go to Privacy Class Approval Preview",
    summary: "Previews privacy class approval without sending private content to providers.",
    markerPhrases: [
      "Privacy class approval preview",
      "Privacy class approval preview does not send private content to providers",
      "Privacy class approval preview requires explicit operator approval",
      "Privacy class approval preview shows local-only private project-sensitive provider-allowed public-safe and blocked privacy classes",
      "Denied privacy class approval paths remain blocked",
      "Privacy class approval checklist",
    ],
    recordIds: ["privacyClassApprovalPreview", "dataBoundaryApprovalPreview", "promptPayloadApprovalPreview", "deniedProviderBoundaries"],
    devOnly: true,
  },
  {
    slug: "cost-class-approval-preview",
    href: "/cost-class-approval-preview",
    phase: "Phase 1552",
    title: "Cost Class Approval Preview",
    commandLabel: "Go to Cost Class Approval Preview",
    summary: "Previews cost class approval without spending tokens or calling providers.",
    markerPhrases: [
      "Cost class approval preview",
      "Cost class approval preview does not spend tokens or call providers",
      "Cost class approval preview requires explicit operator approval",
      "Cost class approval preview shows free local low-cost paid pro specialist unknown and blocked cost classes",
      "Denied cost class approval paths remain blocked",
      "Cost class approval checklist",
    ],
    recordIds: ["costClassApprovalPreview", "providerRequestPacket", "capabilityJustificationApprovalPreview", "deniedProviderBoundaries"],
    devOnly: true,
  },
  {
    slug: "capability-justification-approval-preview",
    href: "/capability-justification-approval-preview",
    phase: "Phase 1553",
    title: "Capability Justification Approval Preview",
    commandLabel: "Go to Capability Justification Approval Preview",
    summary: "Previews capability justification approval without calling models.",
    markerPhrases: [
      "Capability justification approval preview",
      "Capability justification approval preview does not call models",
      "Capability justification approval preview requires explicit operator approval",
      "Capability justification approval preview explains capability gap domain fit cheaper alternatives local alternatives privacy tradeoff cost class and expected benefit",
      "Denied capability justification paths remain blocked",
      "Capability justification approval checklist",
    ],
    recordIds: ["capabilityJustificationApprovalPreview", "providerIdentityPreview", "privacyClassApprovalPreview", "costClassApprovalPreview"],
    devOnly: true,
  },
  {
    slug: "expiry-replay-protection-preview",
    href: "/expiry-replay-protection-preview",
    phase: "Phase 1554",
    title: "Expiry Replay Protection Preview",
    commandLabel: "Go to Expiry Replay Protection Preview",
    summary: "Previews expiry and replay protection without persisting approvals from the UI.",
    markerPhrases: [
      "Expiry replay protection preview",
      "Expiry replay protection preview does not persist approvals from the UI",
      "Expiry replay protection preview requires explicit human approval",
      "Expiry replay protection preview shows approval scope expiry stale approval replay prevention prompt hash provider hash and operator confirmation",
      "Denied expiry replay protection paths remain blocked",
      "Expiry replay protection checklist",
    ],
    recordIds: ["expiryReplayProtectionPreview", "providerRequestPacket", "promptPayloadApprovalPreview", "deniedProviderBoundaries"],
    devOnly: true,
  },
  {
    slug: "provider-fallback-approval-preview",
    href: "/provider-fallback-approval-preview",
    phase: "Phase 1555",
    title: "Provider Fallback Approval Preview",
    commandLabel: "Go to Provider Fallback Approval Preview",
    summary: "Previews provider fallback approval without calling fallback providers.",
    markerPhrases: [
      "Provider fallback approval preview",
      "Provider fallback approval preview does not call fallback providers",
      "Provider fallback approval preview requires explicit operator approval",
      "Provider fallback approval preview shows local fallback cheaper fallback safer fallback manual review fallback provider denied fallback and blocked fallback states",
      "Denied provider fallback paths remain blocked",
      "Provider fallback approval checklist",
    ],
    recordIds: ["providerFallbackApprovalPreview", "providerDenialRoutePreview", "providerIdentityPreview", "deniedProviderBoundaries"],
    devOnly: true,
  },
  {
    slug: "provider-denial-route-preview",
    href: "/provider-denial-route-preview",
    phase: "Phase 1556",
    title: "Provider Denial Route Preview",
    commandLabel: "Go to Provider Denial Route Preview",
    summary: "Previews provider denial route without mutating workflow state.",
    markerPhrases: [
      "Provider denial route preview",
      "Provider denial route preview does not mutate workflow state",
      "Provider denial route preview requires explicit operator approval",
      "Provider denial route preview blocks secret payloads private context disallowed providers high-cost unapproved specialist connector leakage stale approval and unsupported capability routes",
      "Denied provider route paths remain blocked",
      "Provider denial route checklist",
    ],
    recordIds: ["providerDenialRoutePreview", "deniedProviderBoundaries", "dataBoundaryApprovalPreview", "privacyClassApprovalPreview"],
    devOnly: true,
  },
  {
    slug: "provider-evidence-capture-preview",
    href: "/provider-evidence-capture-preview",
    phase: "Phase 1557",
    title: "Provider Evidence Capture Preview",
    commandLabel: "Go to Provider Evidence Capture Preview",
    summary: "Previews provider evidence capture without persisting evidence from the UI.",
    markerPhrases: [
      "Provider evidence capture preview",
      "Provider evidence capture preview does not persist evidence from the UI",
      "Provider evidence capture preview requires backend-owned evidence capture",
      "Provider evidence capture preview shows provider request prompt payload redaction approval provider class model class response reference and audit linkage",
      "Denied provider evidence paths remain blocked",
      "Provider evidence capture checklist",
    ],
    recordIds: ["providerEvidenceCapturePreview", "providerRequestPacket", "promptPayloadApprovalPreview", "providerResultCapturePreview"],
    devOnly: true,
  },
  {
    slug: "provider-result-capture-preview",
    href: "/provider-result-capture-preview",
    phase: "Phase 1558",
    title: "Provider Result Capture Preview",
    commandLabel: "Go to Provider Result Capture Preview",
    summary: "Previews provider result capture without persisting results from the UI.",
    markerPhrases: [
      "Provider result capture preview",
      "Provider result capture preview does not persist results from the UI",
      "Provider result capture preview requires backend-owned result capture",
      "Provider result capture preview shows success blocked denied failed timeout canceled fallback manual-review redacted and operator-accepted provider outcomes",
      "Denied provider result paths remain blocked",
      "Provider result capture checklist",
    ],
    recordIds: ["providerResultCapturePreview", "providerEvidenceCapturePreview", "providerFallbackApprovalPreview", "deniedProviderBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-provider-approval-summary",
    href: "/cockpit-provider-approval-summary",
    phase: "Phase 1559",
    title: "Cockpit Provider Approval Summary",
    commandLabel: "Go to Cockpit Provider Approval Summary",
    summary: "Keeps Provider Approval in the cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: [
      "Cockpit provider approval summary",
      "Cockpit provider approval summary keeps the cockpit as the normal user surface",
      "Cockpit provider approval summary does not call providers models or connectors from the cockpit",
      "Cockpit provider approval summary shows provider model prompt data boundary privacy cost capability expiry replay fallback denied evidence result and audit",
      "Phase pages remain dev test diagnostics only",
      "Cockpit provider approval checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "first-provider-approval-gate-candidate",
    href: "/first-provider-approval-gate-candidate",
    phase: "Phase 1560",
    title: "First Provider Approval Gate Candidate",
    commandLabel: "Go to First Provider Approval Gate Candidate",
    summary: "Combines the first provider approval gate candidate across request, approval, denial, evidence, result, and audit previews.",
    markerPhrases: [
      "First provider approval gate candidate",
      "First provider approval gate candidate does not call providers from the UI",
      "First provider approval gate candidate requires explicit operator approval",
      "Candidate combines provider request identity prompt data boundary privacy cost capability expiry replay fallback denial evidence result and audit",
      "Denied first provider approval gate paths remain blocked",
      "First provider approval gate checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-provider-approval-gate-release-candidate",
    href: "/controlled-provider-approval-gate-release-candidate",
    phase: "Phase 1561",
    title: "Controlled Provider Approval Gate Release Candidate",
    commandLabel: "Go to Controlled Provider Approval Gate Release Candidate",
    summary:
      "Controlled provider approval gate release candidate prepares backend-owned provider approval without frontend provider calls.",
    markerPhrases: [
      "Controlled provider approval gate release candidate",
      "Controlled provider approval gate release candidate does not call models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials or write browser storage from the frontend",
      "Controlled provider approval gate release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned provider approval without frontend provider calls",
      "Denied controlled provider approval gate paths remain blocked",
      "Controlled provider approval gate release checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
];

export function listProviderApprovalGateRouteDefinitions(): readonly ProviderApprovalGateRouteDefinition[] {
  return ROUTES;
}

export function getProviderApprovalGateRouteDefinition(
  slug: ProviderApprovalGateRouteSlug
): ProviderApprovalGateRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildProviderApprovalGateRouteModel(
  slug: ProviderApprovalGateRouteSlug = "codexforge-cockpit"
): ProviderApprovalGateRouteModel {
  const route = getProviderApprovalGateRouteDefinition(slug);
  const records = route.recordIds.map((recordId) => RECORD_LOOKUP[recordId]).filter(Boolean);

  return {
    route,
    providerApprovalGate: PROVIDER_APPROVAL_GATE_MODEL,
    records,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: PROVIDER_APPROVAL_GATE_COCKPIT_MARKERS,
    summary: summarizeProviderApprovalGateRoute(route, records),
  };
}

export function buildProviderApprovalGateModel(): ProviderApprovalGateRouteModel {
  return buildProviderApprovalGateRouteModel("codexforge-cockpit");
}

export function summarizeProviderApprovalGateRoute(
  route: ProviderApprovalGateRouteDefinition,
  records: readonly ProviderApprovalGateRecord[]
): string {
  return `${route.title} keeps ${records.length} provider approval records static, deterministic, preview-only, review-only, approval-required, and blocked from frontend model/provider/connector calls.`;
}

export function buildProviderApprovalGateStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
