export type LocalModelBridgeRouteSlug =
  | "codexforge-cockpit"
  | "local-model-bridge-boundary"
  | "local-runtime-identity-preview"
  | "local-model-registry-preview"
  | "local-endpoint-boundary-preview"
  | "local-prompt-handoff-preview"
  | "local-context-redaction-preview"
  | "local-capability-fit-preview"
  | "local-timeout-cancellation-preview"
  | "local-response-capture-preview"
  | "local-fallback-route-preview"
  | "local-denial-route-preview"
  | "local-evidence-capture-preview"
  | "local-result-audit-preview"
  | "cockpit-local-model-bridge-summary"
  | "first-local-model-bridge-candidate"
  | "controlled-local-model-bridge-release-candidate";

export type LocalModelBridgeKind =
  | "local-model-bridge-preview"
  | "local-model-bridge-boundary"
  | "local-runtime-identity-preview"
  | "local-model-registry-preview"
  | "local-endpoint-boundary-preview"
  | "local-prompt-handoff-preview"
  | "local-context-redaction-preview"
  | "local-capability-fit-preview"
  | "local-timeout-cancellation-preview"
  | "local-response-capture-preview"
  | "local-fallback-route-preview"
  | "local-denial-route-preview"
  | "local-evidence-capture-preview"
  | "local-result-audit-preview"
  | "first-local-model-bridge-candidate"
  | "controlled-local-model-bridge-release-candidate";

export type LocalModelBridgeState =
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

export type LocalModelBridgeItem = {
  id: string;
  label: string;
  detail: string;
  state: LocalModelBridgeState;
};

export type LocalModelBridgeRecord = {
  id: string;
  label: string;
  title: string;
  summary: string;
  state: LocalModelBridgeState;
  items: readonly LocalModelBridgeItem[];
};

export type LocalModelBridgeModel = {
  localModelBridgeId: string;
  localModelBridgeKind: LocalModelBridgeKind;
  modelRouterRef: LocalModelBridgeRecord;
  providerApprovalRef: LocalModelBridgeRecord;
  goalRef: LocalModelBridgeRecord;
  projectContextRef: LocalModelBridgeRecord;
  localRuntimeIdentityPreview: LocalModelBridgeRecord;
  localModelRegistryPreview: LocalModelBridgeRecord;
  localEndpointBoundaryPreview: LocalModelBridgeRecord;
  localPromptHandoffPreview: LocalModelBridgeRecord;
  localContextRedactionPreview: LocalModelBridgeRecord;
  localCapabilityFitPreview: LocalModelBridgeRecord;
  localTimeoutCancellationPreview: LocalModelBridgeRecord;
  localResponseCapturePreview: LocalModelBridgeRecord;
  localFallbackRoutePreview: LocalModelBridgeRecord;
  localDenialRoutePreview: LocalModelBridgeRecord;
  localEvidenceCapturePreview: LocalModelBridgeRecord;
  localResultAuditPreview: LocalModelBridgeRecord;
  deniedLocalModelBoundaries: LocalModelBridgeRecord;
  cockpitSummary: readonly LocalModelBridgeItem[];
  explicitSafetyLimits: readonly string[];
};

export type LocalModelBridgeRouteDefinition = {
  slug: LocalModelBridgeRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  recordIds: readonly string[];
  devOnly: boolean;
};

export type LocalModelBridgeRouteModel = {
  route: LocalModelBridgeRouteDefinition;
  localModelBridge: LocalModelBridgeModel;
  records: readonly LocalModelBridgeRecord[];
  diagnosticRoutes: readonly LocalModelBridgeRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const LOCAL_MODEL_BRIDGE_COCKPIT_MARKERS = [
  "Local Model Bridge v1",
  "Local Model Bridge",
  "Runtime",
  "Model Registry",
  "Endpoint",
  "Prompt Handoff",
  "Redaction",
  "Capability",
  "Timeout",
  "Cancel",
  "Response",
  "Fallback",
  "Denied",
  "Evidence",
  "Result",
  "Audit",
  "No local model calls from the cockpit",
  "No runtime starts from the cockpit",
  "No localhost probing from the cockpit",
  "No port binding from the cockpit",
  "No prompt sending from the cockpit",
  "No credential storage from the cockpit",
  "Backend-owned local model bridge remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Local Model Bridge v1 is preview-only from the frontend.",
  "It does not call local models from the UI.",
  "It does not start local runtimes from the UI.",
  "It does not probe localhost from the UI.",
  "It does not bind ports from the UI.",
  "It does not send prompts from the UI.",
  "It does not read secrets or API keys.",
  "It does not store credentials in browser storage.",
  "It does not persist model responses from the UI.",
  "It does not persist local model evidence/results/audit from the UI.",
  "It does not persist provider approvals from the UI.",
  "It does not release execution from the frontend.",
  "It does not hide local model selection.",
  "It does not hide prompt payload.",
  "It prepares a future backend-owned local model bridge path.",
  "Explicit operator approval remains required.",
] as const;

function createRecord(
  id: string,
  label: string,
  title: string,
  summary: string,
  state: LocalModelBridgeState,
  items: readonly LocalModelBridgeItem[]
): LocalModelBridgeRecord {
  return { id, label, title, summary, state, items };
}

const MODEL_ROUTER_REF = createRecord(
  "modelRouterRef",
  "Model Router",
  "modelRouterRef",
  "Model Router v2 remains the upstream decision reference, but Local Model Bridge v1 keeps local/private model routing preview-only and backend-owned.",
  "backend-owned",
  [
    {
      id: "router-reference",
      label: "Router reference",
      detail: "Future backend routing can reference model capability, privacy, cost, and fallback decisions before any local model use.",
      state: "backend-owned",
    },
    {
      id: "router-visible-local-choice",
      label: "Visible local choice",
      detail: "Local runtime class, local model class, prompt payload, and denied local model paths stay operator-visible.",
      state: "review-only",
    },
    {
      id: "router-no-ui-release",
      label: "No UI release",
      detail: "The frontend does not release local model execution or hidden model routing.",
      state: "blocked",
    },
  ]
);

const PROVIDER_APPROVAL_REF = createRecord(
  "providerApprovalRef",
  "Provider Approval",
  "providerApprovalRef",
  "Provider Approval Gate remains the approval reference so local/private model routing does not bypass explicit operator review.",
  "needs-approval",
  [
    {
      id: "approval-reference",
      label: "Approval reference",
      detail: "Future backend local bridge work must bind to an operator-visible approval reference before use.",
      state: "needs-approval",
    },
    {
      id: "approval-no-hidden",
      label: "No hidden approval",
      detail: "Local runtime, endpoint boundary, prompt payload, redaction, evidence, result, and audit cannot be auto-approved.",
      state: "blocked",
    },
    {
      id: "approval-no-persist",
      label: "No UI persistence",
      detail: "The UI does not persist provider approval, local evidence, local result, or local audit state.",
      state: "denied",
    },
  ]
);

const GOAL_REF = createRecord(
  "goalRef",
  "Goal",
  "goalRef",
  "Goal reference previews why a local/private model might be considered while keeping goal handoff static and review-only.",
  "review-only",
  [
    {
      id: "goal-visible",
      label: "Visible goal",
      detail: "The operator can review the goal before any future backend-owned local prompt handoff.",
      state: "review-only",
    },
    {
      id: "goal-no-send",
      label: "No prompt sending",
      detail: "The cockpit does not send the goal or derived prompt payload to any local model runtime.",
      state: "blocked",
    },
    {
      id: "goal-approval",
      label: "Approval required",
      detail: "Explicit operator approval remains required before local model use.",
      state: "needs-approval",
    },
  ]
);

const PROJECT_CONTEXT_REF = createRecord(
  "projectContextRef",
  "Project Context",
  "projectContextRef",
  "Project context reference previews local/private data handling without reading secrets, reading API keys, probing local endpoints, or sending project content.",
  "review-only",
  [
    {
      id: "context-review",
      label: "Context review",
      detail: "Project context must be reviewed, scoped, and redacted before any future backend local model bridge can use it.",
      state: "review-only",
    },
    {
      id: "context-secret-block",
      label: "Secret blocked",
      detail: "Secrets, tokens, credentials, API keys, environment values, private files, and denied paths stay blocked.",
      state: "denied",
    },
    {
      id: "context-no-local-read",
      label: "No local probing",
      detail: "The frontend does not crawl files, read secrets, probe localhost, bind ports, or start runtimes.",
      state: "blocked",
    },
  ]
);

const LOCAL_RUNTIME_IDENTITY_PREVIEW = createRecord(
  "localRuntimeIdentityPreview",
  "Runtime",
  "localRuntimeIdentityPreview",
  "Local runtime identity preview shows Ollama LM Studio llama.cpp vLLM OpenAI-compatible localhost and manual runtime classes as review-only options.",
  "review-only",
  [
    {
      id: "runtime-classes",
      label: "Runtime class",
      detail: "Ollama, LM Studio, llama.cpp, vLLM, OpenAI-compatible localhost, and manual runtime classes are labels only.",
      state: "review-only",
    },
    {
      id: "runtime-no-start",
      label: "No runtime start",
      detail: "The UI does not start, stop, cancel, spawn, or manage local runtime processes.",
      state: "blocked",
    },
    {
      id: "runtime-approval",
      label: "Approval required",
      detail: "Future runtime use requires explicit operator approval and backend-owned process control.",
      state: "needs-approval",
    },
  ]
);

const LOCAL_MODEL_REGISTRY_PREVIEW = createRecord(
  "localModelRegistryPreview",
  "Model Registry",
  "localModelRegistryPreview",
  "Local model registry preview shows model name, capability class, privacy class, context window, tool support status, and denied registry states without querying runtimes.",
  "review-only",
  [
    {
      id: "registry-shape",
      label: "Registry shape",
      detail: "Model name, capability class, privacy class, context window, tool support status, and review status are visible.",
      state: "review-only",
    },
    {
      id: "registry-no-query",
      label: "No runtime query",
      detail: "The frontend does not query local runtimes for installed models or capabilities.",
      state: "blocked",
    },
    {
      id: "registry-denied",
      label: "Denied registry",
      detail: "Unknown, stale, unsupported, unapproved, hidden, or secret-derived registry states remain denied.",
      state: "denied",
    },
  ]
);

const LOCAL_ENDPOINT_BOUNDARY_PREVIEW = createRecord(
  "localEndpointBoundaryPreview",
  "Endpoint",
  "localEndpointBoundaryPreview",
  "Local endpoint boundary preview shows localhost-only backend-owned endpoint allowlist, port policy, timeout boundary, and denied endpoint states.",
  "backend-owned",
  [
    {
      id: "endpoint-allowlist",
      label: "Endpoint allowlist",
      detail: "Only a future backend-owned allowlist may define local endpoint class, port policy, timeout, and denial behavior.",
      state: "backend-owned",
    },
    {
      id: "endpoint-no-probe",
      label: "No probe or port",
      detail: "The UI does not probe localhost, bind ports, open sockets, or test endpoints.",
      state: "blocked",
    },
    {
      id: "endpoint-denied",
      label: "Denied endpoint",
      detail: "Disallowed ports, stale endpoints, remote endpoints, hidden endpoints, and unapproved endpoints remain blocked.",
      state: "denied",
    },
  ]
);

const LOCAL_PROMPT_HANDOFF_PREVIEW = createRecord(
  "localPromptHandoffPreview",
  "Prompt Handoff",
  "localPromptHandoffPreview",
  "Local prompt handoff preview shows goal, context, files, commands, evidence, redaction, privacy class, and approval references before local model use.",
  "needs-approval",
  [
    {
      id: "prompt-payload-visible",
      label: "Prompt payload",
      detail: "Goal, context, files, commands, evidence, redaction, privacy class, and approval references are review-only.",
      state: "review-only",
    },
    {
      id: "prompt-no-send",
      label: "No send",
      detail: "The frontend does not send prompt payloads to local models, providers, connectors, or localhost endpoints.",
      state: "blocked",
    },
    {
      id: "prompt-denied",
      label: "Denied prompt",
      detail: "Secret payloads, unredacted private context, denied paths, stale approvals, and unsupported payloads remain blocked.",
      state: "denied",
    },
  ]
);

const LOCAL_CONTEXT_REDACTION_PREVIEW = createRecord(
  "localContextRedactionPreview",
  "Redaction",
  "localContextRedactionPreview",
  "Local context redaction preview blocks secrets, tokens, credentials, keys, environment values, private files, denied paths, and unapproved project context.",
  "redacted",
  [
    {
      id: "redaction-blocks",
      label: "Blocked content",
      detail: "Secrets, tokens, credentials, keys, environment values, private files, denied paths, and unapproved context are blocked.",
      state: "denied",
    },
    {
      id: "redaction-no-secret-read",
      label: "No secret read",
      detail: "The frontend does not read secrets, API keys, or environment values to produce this preview.",
      state: "blocked",
    },
    {
      id: "redaction-review",
      label: "Manual review",
      detail: "Future backend redaction must be reviewable before any local model bridge payload is accepted.",
      state: "manual-review",
    },
  ]
);

const LOCAL_CAPABILITY_FIT_PREVIEW = createRecord(
  "localCapabilityFitPreview",
  "Capability",
  "localCapabilityFitPreview",
  "Local capability fit preview checks coding, reasoning, research, creative, game, server, data, docs, and domain-fit capability before local model use.",
  "review-only",
  [
    {
      id: "capability-classes",
      label: "Capability classes",
      detail: "Coding, reasoning, research, creative, game, server, data, docs, and domain fit are visible review classes.",
      state: "review-only",
    },
    {
      id: "capability-no-call",
      label: "No model call",
      detail: "The UI does not call models to prove or test capability fit.",
      state: "blocked",
    },
    {
      id: "capability-denied",
      label: "Unsupported denied",
      detail: "Unsupported capability, stale registry, hidden model routing, or unapproved domain fit remains denied.",
      state: "denied",
    },
  ]
);

const LOCAL_TIMEOUT_CANCELLATION_PREVIEW = createRecord(
  "localTimeoutCancellationPreview",
  "Timeout and Cancel",
  "localTimeoutCancellationPreview",
  "Local timeout cancellation preview shows timeout limits, cancellation boundaries, manual stop, backend-owned process control, and evidence requirements.",
  "backend-owned",
  [
    {
      id: "timeout-limits",
      label: "Timeout limits",
      detail: "Timeout limit, manual stop, cancel boundary, and evidence requirement are review-only constraints.",
      state: "review-only",
    },
    {
      id: "cancel-no-process",
      label: "No process control",
      detail: "The UI does not start, cancel, kill, or stop local model processes.",
      state: "blocked",
    },
    {
      id: "cancel-backend-owned",
      label: "Backend-owned",
      detail: "Future cancellation requires backend-owned process control, evidence capture, and operator-visible result state.",
      state: "backend-owned",
    },
  ]
);

const LOCAL_RESPONSE_CAPTURE_PREVIEW = createRecord(
  "localResponseCapturePreview",
  "Response",
  "localResponseCapturePreview",
  "Local response capture preview shows response text, redaction, token metadata, status, fallback references, evidence linkage, and audit linkage.",
  "backend-owned",
  [
    {
      id: "response-shape",
      label: "Response shape",
      detail: "Response text, redaction, token metadata, status, fallback references, evidence linkage, and audit linkage are preview fields.",
      state: "review-only",
    },
    {
      id: "response-no-live-capture",
      label: "No live capture",
      detail: "The UI does not capture live model output or persist model responses.",
      state: "blocked",
    },
    {
      id: "response-backend-owned",
      label: "Backend-owned capture",
      detail: "Future response capture must be owned by the backend and linked to evidence, result, and audit.",
      state: "backend-owned",
    },
  ]
);

const LOCAL_FALLBACK_ROUTE_PREVIEW = createRecord(
  "localFallbackRoutePreview",
  "Fallback",
  "localFallbackRoutePreview",
  "Local fallback route preview shows smaller local fallback, safer local fallback, manual review, provider approval handoff, and blocked fallback states.",
  "needs-approval",
  [
    {
      id: "fallback-visible",
      label: "Visible fallback",
      detail: "Smaller local fallback, safer local fallback, manual review, and provider approval handoff are explicit.",
      state: "review-only",
    },
    {
      id: "fallback-no-call",
      label: "No fallback call",
      detail: "The frontend does not call fallback local models, providers, connectors, or endpoints.",
      state: "blocked",
    },
    {
      id: "fallback-denied",
      label: "Blocked fallback",
      detail: "Hidden, higher-risk, stale, unsupported, unapproved, or secret-bearing fallback states remain denied.",
      state: "denied",
    },
  ]
);

const LOCAL_DENIAL_ROUTE_PREVIEW = createRecord(
  "localDenialRoutePreview",
  "Denied",
  "localDenialRoutePreview",
  "Local denial route preview blocks unavailable runtime, unsupported capability, secret payload, stale approval, localhost, disallowed port, denied timeout risk, and prompt denied states.",
  "blocked",
  [
    {
      id: "denial-runtime-capability",
      label: "Runtime or capability",
      detail: "Unavailable runtime, unsupported capability, stale registry, and hidden local model choice remain denied.",
      state: "denied",
    },
    {
      id: "denial-secret-endpoint",
      label: "Secret or endpoint",
      detail: "Secret payload, localhost disallowed by backend policy, disallowed port, and prompt denied states are blocked.",
      state: "denied",
    },
    {
      id: "denial-timeout-approval",
      label: "Timeout or approval",
      detail: "Denied timeout risk, canceled state, stale approval, and unapproved project context stay blocked.",
      state: "blocked",
    },
  ]
);

const LOCAL_EVIDENCE_CAPTURE_PREVIEW = createRecord(
  "localEvidenceCapturePreview",
  "Evidence",
  "localEvidenceCapturePreview",
  "Local evidence capture preview shows local request, prompt payload, redaction, approval, runtime class, model class, response reference, fallback, and audit linkage.",
  "backend-owned",
  [
    {
      id: "evidence-shape",
      label: "Evidence shape",
      detail: "Local request, prompt payload, redaction, approval, runtime class, model class, response reference, fallback, and audit linkage are fields only.",
      state: "review-only",
    },
    {
      id: "evidence-no-persist",
      label: "No UI persistence",
      detail: "The frontend does not persist evidence, results, audits, approvals, responses, queues, or transactions.",
      state: "blocked",
    },
    {
      id: "evidence-backend-owned",
      label: "Backend-owned evidence",
      detail: "Future evidence capture must be backend-owned and operator-reviewable.",
      state: "backend-owned",
    },
  ]
);

const LOCAL_RESULT_AUDIT_PREVIEW = createRecord(
  "localResultAuditPreview",
  "Result and Audit",
  "localResultAuditPreview",
  "Local result audit preview shows success, blocked, denied, failed, timeout, canceled, fallback, manual-review, redacted, operator-accepted, and audit-continuity outcomes.",
  "backend-owned",
  [
    {
      id: "result-outcomes",
      label: "Result outcomes",
      detail: "Success, blocked, denied, failed, timeout, canceled, fallback, manual-review, redacted, and operator-accepted outcomes are static.",
      state: "review-only",
    },
    {
      id: "audit-continuity",
      label: "Audit continuity",
      detail: "Audit continuity must link request, approval, prompt, redaction, runtime, model, response, evidence, result, and denial state.",
      state: "backend-owned",
    },
    {
      id: "result-no-persist",
      label: "No UI persistence",
      detail: "The frontend does not persist local model results or audit records.",
      state: "blocked",
    },
  ]
);

const DENIED_LOCAL_MODEL_BOUNDARIES = createRecord(
  "deniedLocalModelBoundaries",
  "Denied Local Model Boundaries",
  "deniedLocalModelBoundaries",
  "Denied local model bridge paths remain blocked for frontend calls, runtime starts, localhost probes, port binding, prompt sending, secret reads, credential storage, response persistence, evidence persistence, result persistence, audit persistence, hidden approvals, hidden routing, and execution release.",
  "denied",
  [
    {
      id: "denied-local-calls",
      label: "Local calls blocked",
      detail: "Local model calls, live model calls, provider calls, connector calls, prompt sends, and fallback calls remain blocked.",
      state: "denied",
    },
    {
      id: "denied-runtime-ports",
      label: "Runtime and ports blocked",
      detail: "Runtime starts, process spawning, localhost probing, port binding, endpoint tests, installs, deploys, and background processes remain blocked.",
      state: "denied",
    },
    {
      id: "denied-persistence",
      label: "Persistence blocked",
      detail: "Credentials, approvals, evidence, results, audit, model responses, queues, transactions, snapshots, and browser storage writes remain blocked.",
      state: "denied",
    },
  ]
);

const COCKPIT_SUMMARY: readonly LocalModelBridgeItem[] = [
  {
    id: "runtime",
    label: "Runtime",
    detail: "Runtime shows the later backend-owned local runtime class, such as Ollama, LM Studio, llama.cpp, vLLM, OpenAI-compatible localhost, or manual.",
    state: "review-only",
  },
  {
    id: "model-registry",
    label: "Model Registry",
    detail: "Model Registry shows the reviewed model registry shape: name, capability class, privacy class, context window, tool support, status, and denied states.",
    state: "review-only",
  },
  {
    id: "endpoint",
    label: "Endpoint",
    detail: "Endpoint means a backend-owned localhost-only allowlist, port policy, timeout boundary, and denied endpoint states.",
    state: "backend-owned",
  },
  {
    id: "prompt-handoff",
    label: "Prompt Handoff",
    detail: "Prompt Handoff shows goal, context, files, commands, evidence, redaction, privacy class, and approval references without sending prompts.",
    state: "needs-approval",
  },
  {
    id: "redaction",
    label: "Redaction",
    detail: "Redaction protects private data by blocking secrets, tokens, credentials, keys, environment values, private files, denied paths, and unapproved context.",
    state: "redacted",
  },
  {
    id: "capability",
    label: "Capability",
    detail: "Capability fit checks coding, reasoning, research, creative, game, server, data, docs, and domain fit before future local model use.",
    state: "review-only",
  },
  {
    id: "timeout",
    label: "Timeout",
    detail: "Timeout shows time limits, backend-owned timeout boundaries, denied timeout risk, and evidence requirements.",
    state: "backend-owned",
  },
  {
    id: "cancel",
    label: "Cancel",
    detail: "Cancel shows cancellation boundaries, manual stop, and backend-owned process control without UI process control.",
    state: "backend-owned",
  },
  {
    id: "response",
    label: "Response",
    detail: "Response capture shows response text, redaction, token metadata, status, fallback references, evidence linkage, and audit linkage.",
    state: "backend-owned",
  },
  {
    id: "fallback",
    label: "Fallback",
    detail: "Fallback shows smaller local fallback, safer local fallback, manual review, provider approval handoff, and blocked fallback states.",
    state: "needs-approval",
  },
  {
    id: "denied",
    label: "Denied",
    detail: "Denied states keep unavailable runtime, unsupported capability, secret payload, stale approval, endpoint, port, timeout, and prompt-denied paths blocked.",
    state: "blocked",
  },
  {
    id: "evidence",
    label: "Evidence",
    detail: "Evidence links local request, prompt payload, redaction, approval, runtime class, model class, response reference, fallback, and audit linkage.",
    state: "backend-owned",
  },
  {
    id: "result",
    label: "Result",
    detail: "Result shows success, blocked, denied, failed, timeout, canceled, fallback, manual-review, redacted, and operator-accepted outcomes.",
    state: "backend-owned",
  },
  {
    id: "audit",
    label: "Audit",
    detail: "Audit shows continuity from request through approval, redaction, response, evidence, result, fallback, and denial state.",
    state: "backend-owned",
  },
];

export const LOCAL_MODEL_BRIDGE_MODEL: LocalModelBridgeModel = {
  localModelBridgeId: "codexforge-local-model-bridge-v1",
  localModelBridgeKind: "local-model-bridge-preview",
  modelRouterRef: MODEL_ROUTER_REF,
  providerApprovalRef: PROVIDER_APPROVAL_REF,
  goalRef: GOAL_REF,
  projectContextRef: PROJECT_CONTEXT_REF,
  localRuntimeIdentityPreview: LOCAL_RUNTIME_IDENTITY_PREVIEW,
  localModelRegistryPreview: LOCAL_MODEL_REGISTRY_PREVIEW,
  localEndpointBoundaryPreview: LOCAL_ENDPOINT_BOUNDARY_PREVIEW,
  localPromptHandoffPreview: LOCAL_PROMPT_HANDOFF_PREVIEW,
  localContextRedactionPreview: LOCAL_CONTEXT_REDACTION_PREVIEW,
  localCapabilityFitPreview: LOCAL_CAPABILITY_FIT_PREVIEW,
  localTimeoutCancellationPreview: LOCAL_TIMEOUT_CANCELLATION_PREVIEW,
  localResponseCapturePreview: LOCAL_RESPONSE_CAPTURE_PREVIEW,
  localFallbackRoutePreview: LOCAL_FALLBACK_ROUTE_PREVIEW,
  localDenialRoutePreview: LOCAL_DENIAL_ROUTE_PREVIEW,
  localEvidenceCapturePreview: LOCAL_EVIDENCE_CAPTURE_PREVIEW,
  localResultAuditPreview: LOCAL_RESULT_AUDIT_PREVIEW,
  deniedLocalModelBoundaries: DENIED_LOCAL_MODEL_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const RECORD_LOOKUP: Record<string, LocalModelBridgeRecord> = {
  modelRouterRef: MODEL_ROUTER_REF,
  providerApprovalRef: PROVIDER_APPROVAL_REF,
  goalRef: GOAL_REF,
  projectContextRef: PROJECT_CONTEXT_REF,
  localRuntimeIdentityPreview: LOCAL_RUNTIME_IDENTITY_PREVIEW,
  localModelRegistryPreview: LOCAL_MODEL_REGISTRY_PREVIEW,
  localEndpointBoundaryPreview: LOCAL_ENDPOINT_BOUNDARY_PREVIEW,
  localPromptHandoffPreview: LOCAL_PROMPT_HANDOFF_PREVIEW,
  localContextRedactionPreview: LOCAL_CONTEXT_REDACTION_PREVIEW,
  localCapabilityFitPreview: LOCAL_CAPABILITY_FIT_PREVIEW,
  localTimeoutCancellationPreview: LOCAL_TIMEOUT_CANCELLATION_PREVIEW,
  localResponseCapturePreview: LOCAL_RESPONSE_CAPTURE_PREVIEW,
  localFallbackRoutePreview: LOCAL_FALLBACK_ROUTE_PREVIEW,
  localDenialRoutePreview: LOCAL_DENIAL_ROUTE_PREVIEW,
  localEvidenceCapturePreview: LOCAL_EVIDENCE_CAPTURE_PREVIEW,
  localResultAuditPreview: LOCAL_RESULT_AUDIT_PREVIEW,
  deniedLocalModelBoundaries: DENIED_LOCAL_MODEL_BOUNDARIES,
};

const ALL_RECORD_IDS = [
  "modelRouterRef",
  "providerApprovalRef",
  "goalRef",
  "projectContextRef",
  "localRuntimeIdentityPreview",
  "localModelRegistryPreview",
  "localEndpointBoundaryPreview",
  "localPromptHandoffPreview",
  "localContextRedactionPreview",
  "localCapabilityFitPreview",
  "localTimeoutCancellationPreview",
  "localResponseCapturePreview",
  "localFallbackRoutePreview",
  "localDenialRoutePreview",
  "localEvidenceCapturePreview",
  "localResultAuditPreview",
  "deniedLocalModelBoundaries",
] as const;

const ROUTES: readonly LocalModelBridgeRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Local Model Bridge v1",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary:
      "Cockpit local model bridge summary keeps Local Model Bridge in the normal user cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: LOCAL_MODEL_BRIDGE_COCKPIT_MARKERS,
    recordIds: ALL_RECORD_IDS,
    devOnly: false,
  },
  {
    slug: "local-model-bridge-boundary",
    href: "/local-model-bridge-boundary",
    phase: "Phase 1562",
    title: "Local Model Bridge Boundary",
    commandLabel: "Go to Local Model Bridge Boundary",
    summary: "Defines the preview-only boundary for future backend-owned local/private model routing.",
    markerPhrases: [
      "Local model bridge boundary",
      "Local model bridge boundary does not call local models from the UI",
      "Local model bridge requires explicit operator approval before local model use",
      "Local model bridge prepares backend-owned private model routing without frontend model calls",
      "Denied local model bridge paths remain blocked",
      "Local model bridge checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "local-runtime-identity-preview",
    href: "/local-runtime-identity-preview",
    phase: "Phase 1563",
    title: "Local Runtime Identity Preview",
    commandLabel: "Go to Local Runtime Identity Preview",
    summary: "Previews local runtime identity without starting runtimes.",
    markerPhrases: [
      "Local runtime identity preview",
      "Local runtime identity preview does not start runtimes",
      "Local runtime identity preview requires explicit operator approval",
      "Local runtime identity preview shows Ollama LM Studio llama.cpp vLLM OpenAI-compatible localhost and manual runtime classes as review-only options",
      "Denied local runtime identity paths remain blocked",
      "Local runtime identity checklist",
    ],
    recordIds: ["localRuntimeIdentityPreview", "localEndpointBoundaryPreview", "deniedLocalModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "local-model-registry-preview",
    href: "/local-model-registry-preview",
    phase: "Phase 1564",
    title: "Local Model Registry Preview",
    commandLabel: "Go to Local Model Registry Preview",
    summary: "Previews local model registry shape without querying local runtimes.",
    markerPhrases: [
      "Local model registry preview",
      "Local model registry preview does not query local runtimes",
      "Local model registry preview requires explicit operator approval",
      "Local model registry preview shows model name capability class privacy class context window tool support status and denied registry states",
      "Denied local model registry paths remain blocked",
      "Local model registry checklist",
    ],
    recordIds: ["localModelRegistryPreview", "localRuntimeIdentityPreview", "localCapabilityFitPreview", "deniedLocalModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "local-endpoint-boundary-preview",
    href: "/local-endpoint-boundary-preview",
    phase: "Phase 1565",
    title: "Local Endpoint Boundary Preview",
    commandLabel: "Go to Local Endpoint Boundary Preview",
    summary: "Previews endpoint boundaries without probing localhost or binding ports.",
    markerPhrases: [
      "Local endpoint boundary preview",
      "Local endpoint boundary preview does not probe localhost or bind ports",
      "Local endpoint boundary preview requires explicit operator approval",
      "Local endpoint boundary preview shows localhost-only backend-owned endpoint allowlist port policy timeout boundary and denied endpoint states",
      "Denied local endpoint paths remain blocked",
      "Local endpoint boundary checklist",
    ],
    recordIds: ["localEndpointBoundaryPreview", "localRuntimeIdentityPreview", "localTimeoutCancellationPreview", "deniedLocalModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "local-prompt-handoff-preview",
    href: "/local-prompt-handoff-preview",
    phase: "Phase 1566",
    title: "Local Prompt Handoff Preview",
    commandLabel: "Go to Local Prompt Handoff Preview",
    summary: "Previews local prompt handoff without sending prompts.",
    markerPhrases: [
      "Local prompt handoff preview",
      "Local prompt handoff preview does not send prompts",
      "Local prompt handoff preview requires explicit operator approval",
      "Local prompt handoff preview shows goal context files commands evidence redaction privacy class and approval references before local model use",
      "Denied local prompt handoff paths remain blocked",
      "Local prompt handoff checklist",
    ],
    recordIds: ["localPromptHandoffPreview", "goalRef", "projectContextRef", "localContextRedactionPreview", "deniedLocalModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "local-context-redaction-preview",
    href: "/local-context-redaction-preview",
    phase: "Phase 1567",
    title: "Local Context Redaction Preview",
    commandLabel: "Go to Local Context Redaction Preview",
    summary: "Previews context redaction without reading secrets.",
    markerPhrases: [
      "Local context redaction preview",
      "Local context redaction preview does not read secrets",
      "Local context redaction preview requires explicit operator approval",
      "Local context redaction preview blocks secrets tokens credentials keys environment values private files denied paths and unapproved project context",
      "Denied local context redaction paths remain blocked",
      "Local context redaction checklist",
    ],
    recordIds: ["localContextRedactionPreview", "projectContextRef", "localPromptHandoffPreview", "deniedLocalModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "local-capability-fit-preview",
    href: "/local-capability-fit-preview",
    phase: "Phase 1568",
    title: "Local Capability Fit Preview",
    commandLabel: "Go to Local Capability Fit Preview",
    summary: "Previews local capability fit without calling models.",
    markerPhrases: [
      "Local capability fit preview",
      "Local capability fit preview does not call models",
      "Local capability fit preview requires explicit operator approval",
      "Local capability fit preview checks coding reasoning research creative game server data docs and domain-fit capability before local model use",
      "Denied local capability fit paths remain blocked",
      "Local capability fit checklist",
    ],
    recordIds: ["localCapabilityFitPreview", "localModelRegistryPreview", "localPromptHandoffPreview", "deniedLocalModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "local-timeout-cancellation-preview",
    href: "/local-timeout-cancellation-preview",
    phase: "Phase 1569",
    title: "Local Timeout Cancellation Preview",
    commandLabel: "Go to Local Timeout Cancellation Preview",
    summary: "Previews timeout and cancellation without controlling local processes from the UI.",
    markerPhrases: [
      "Local timeout cancellation preview",
      "Local timeout cancellation preview does not start or cancel local model processes from the UI",
      "Local timeout cancellation preview requires explicit operator approval",
      "Local timeout cancellation preview shows timeout limits cancellation boundaries manual stop backend-owned process control and evidence requirements",
      "Denied local timeout cancellation paths remain blocked",
      "Local timeout cancellation checklist",
    ],
    recordIds: ["localTimeoutCancellationPreview", "localEndpointBoundaryPreview", "localEvidenceCapturePreview", "deniedLocalModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "local-response-capture-preview",
    href: "/local-response-capture-preview",
    phase: "Phase 1570",
    title: "Local Response Capture Preview",
    commandLabel: "Go to Local Response Capture Preview",
    summary: "Previews response capture without capturing live model output from the UI.",
    markerPhrases: [
      "Local response capture preview",
      "Local response capture preview does not capture live model output from the UI",
      "Local response capture preview requires backend-owned model response capture",
      "Local response capture preview shows response text redaction token metadata status fallback references evidence linkage and audit linkage",
      "Denied local response capture paths remain blocked",
      "Local response capture checklist",
    ],
    recordIds: ["localResponseCapturePreview", "localEvidenceCapturePreview", "localResultAuditPreview", "deniedLocalModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "local-fallback-route-preview",
    href: "/local-fallback-route-preview",
    phase: "Phase 1571",
    title: "Local Fallback Route Preview",
    commandLabel: "Go to Local Fallback Route Preview",
    summary: "Previews fallback routing without calling fallback models.",
    markerPhrases: [
      "Local fallback route preview",
      "Local fallback route preview does not call fallback models",
      "Local fallback route preview requires explicit operator approval",
      "Local fallback route preview shows smaller local fallback safer local fallback manual review provider approval handoff and blocked fallback states",
      "Denied local fallback route paths remain blocked",
      "Local fallback route checklist",
    ],
    recordIds: ["localFallbackRoutePreview", "localDenialRoutePreview", "providerApprovalRef", "deniedLocalModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "local-denial-route-preview",
    href: "/local-denial-route-preview",
    phase: "Phase 1572",
    title: "Local Denial Route Preview",
    commandLabel: "Go to Local Denial Route Preview",
    summary: "Previews denial routing without mutating workflow state.",
    markerPhrases: [
      "Local denial route preview",
      "Local denial route preview does not mutate workflow state",
      "Local denial route preview requires explicit operator approval",
      "Local denial route preview blocks unavailable runtime unsupported capability secret payload stale approval localhost disallowed port denied timeout risk and prompt denied states",
      "Denied local denial route paths remain blocked",
      "Local denial route checklist",
    ],
    recordIds: ["localDenialRoutePreview", "localRuntimeIdentityPreview", "localEndpointBoundaryPreview", "deniedLocalModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "local-evidence-capture-preview",
    href: "/local-evidence-capture-preview",
    phase: "Phase 1573",
    title: "Local Evidence Capture Preview",
    commandLabel: "Go to Local Evidence Capture Preview",
    summary: "Previews evidence capture without persisting evidence from the UI.",
    markerPhrases: [
      "Local evidence capture preview",
      "Local evidence capture preview does not persist evidence from the UI",
      "Local evidence capture preview requires backend-owned evidence capture",
      "Local evidence capture preview shows local request prompt payload redaction approval runtime class model class response reference fallback and audit linkage",
      "Denied local evidence paths remain blocked",
      "Local evidence capture checklist",
    ],
    recordIds: ["localEvidenceCapturePreview", "localPromptHandoffPreview", "localResponseCapturePreview", "localResultAuditPreview"],
    devOnly: true,
  },
  {
    slug: "local-result-audit-preview",
    href: "/local-result-audit-preview",
    phase: "Phase 1574",
    title: "Local Result Audit Preview",
    commandLabel: "Go to Local Result Audit Preview",
    summary: "Previews result and audit capture without persisting results or audit from the UI.",
    markerPhrases: [
      "Local result audit preview",
      "Local result audit preview does not persist results or audit from the UI",
      "Local result audit preview requires backend-owned result and audit capture",
      "Local result audit preview shows success blocked denied failed timeout canceled fallback manual-review redacted operator-accepted and audit-continuity outcomes",
      "Denied local result audit paths remain blocked",
      "Local result audit checklist",
    ],
    recordIds: ["localResultAuditPreview", "localEvidenceCapturePreview", "localResponseCapturePreview", "deniedLocalModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-local-model-bridge-summary",
    href: "/cockpit-local-model-bridge-summary",
    phase: "Phase 1575",
    title: "Cockpit Local Model Bridge Summary",
    commandLabel: "Go to Cockpit Local Model Bridge Summary",
    summary: "Keeps Local Model Bridge in the cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: [
      "Cockpit local model bridge summary",
      "Cockpit local model bridge summary keeps the cockpit as the normal user surface",
      "Cockpit local model bridge summary does not call local models from the cockpit",
      "Cockpit local model bridge summary shows runtime model registry endpoint prompt handoff redaction capability timeout cancel response fallback denied evidence result and audit",
      "Phase pages remain dev test diagnostics only",
      "Cockpit local model bridge checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "first-local-model-bridge-candidate",
    href: "/first-local-model-bridge-candidate",
    phase: "Phase 1576",
    title: "First Local Model Bridge Candidate",
    commandLabel: "Go to First Local Model Bridge Candidate",
    summary: "Combines the first local model bridge candidate across runtime, registry, endpoint, handoff, redaction, capability, timeout, response, fallback, denial, evidence, result, and audit.",
    markerPhrases: [
      "First local model bridge candidate",
      "First local model bridge candidate does not call local models from the UI",
      "First local model bridge candidate requires explicit operator approval",
      "Candidate combines runtime identity model registry endpoint boundary prompt handoff redaction capability fit timeout cancellation response capture fallback denial evidence result and audit",
      "Denied first local model bridge paths remain blocked",
      "First local model bridge checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-local-model-bridge-release-candidate",
    href: "/controlled-local-model-bridge-release-candidate",
    phase: "Phase 1577",
    title: "Controlled Local Model Bridge Release Candidate",
    commandLabel: "Go to Controlled Local Model Bridge Release Candidate",
    summary:
      "Controlled local model bridge release candidate prepares CodexForge for backend-owned local model bridge without frontend model calls.",
    markerPhrases: [
      "Controlled local model bridge release candidate",
      "Controlled local model bridge release candidate does not call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled local model bridge release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned local model bridge without frontend model calls",
      "Denied controlled local model bridge paths remain blocked",
      "Controlled local model bridge release checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
];

export function listLocalModelBridgeRouteDefinitions(): readonly LocalModelBridgeRouteDefinition[] {
  return ROUTES;
}

export function getLocalModelBridgeRouteDefinition(slug: LocalModelBridgeRouteSlug): LocalModelBridgeRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildLocalModelBridgeRouteModel(
  slug: LocalModelBridgeRouteSlug = "codexforge-cockpit"
): LocalModelBridgeRouteModel {
  const route = getLocalModelBridgeRouteDefinition(slug);
  const records = route.recordIds.map((recordId) => RECORD_LOOKUP[recordId]).filter(Boolean);

  return {
    route,
    localModelBridge: LOCAL_MODEL_BRIDGE_MODEL,
    records,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: LOCAL_MODEL_BRIDGE_COCKPIT_MARKERS,
    summary: summarizeLocalModelBridgeRoute(route, records),
  };
}

export function buildLocalModelBridgeModel(): LocalModelBridgeRouteModel {
  return buildLocalModelBridgeRouteModel("codexforge-cockpit");
}

export function summarizeLocalModelBridgeRoute(
  route: LocalModelBridgeRouteDefinition,
  records: readonly LocalModelBridgeRecord[]
): string {
  return `${route.title} keeps ${records.length} local model bridge records static, deterministic, preview-only, review-only, approval-required, and blocked from frontend local model calls, runtime starts, localhost probes, port binding, prompt sending, credential storage, and response persistence.`;
}

export function buildLocalModelBridgeStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
