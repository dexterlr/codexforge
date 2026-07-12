import type {
  AiModelCapabilityKey,
  AiModelCapabilityMatrixPreview,
  AiModelCapabilityMatrixRow,
  AiModelProviderBlockedExecutionSummary,
  AiModelProviderCapabilityGroup,
  AiModelProviderCapabilityId,
  AiModelProviderConnectionState,
  AiModelProviderKey,
  AiModelProviderReadinessSummary,
  AiModelProviderRegistryRecord,
  AiModelProviderRoutingReadinessPreviewRecord,
  AiModelProviderSlotId,
  AiModelProviderSlotRecord,
  AiModelProviderWorkspaceCapabilityGroup,
  AiModelProviderWorkspaceTarget,
} from "./ai-provider-registry-types";

const PROVIDER_SLOT_IDS = [
  "openai-provider-slot",
  "anthropic-provider-slot",
  "google-gemini-provider-slot",
  "xai-provider-slot",
  "mistral-provider-slot",
  "local-open-weight-provider-slot",
  "image-provider-slot",
  "video-provider-slot",
  "audio-voice-provider-slot",
  "transcription-provider-slot",
  "safety-moderation-provider-slot",
] as const satisfies readonly AiModelProviderSlotId[];

const CAPABILITY_IDS = [
  "text-chat",
  "code-assistance",
  "planning-reasoning",
  "image-generation",
  "image-editing",
  "video-generation",
  "audio-generation",
  "voice-narration",
  "transcription",
  "embeddings-search",
  "safety-moderation",
  "local-inference",
  "metadata-summarization",
] as const satisfies readonly AiModelProviderCapabilityId[];

const WORKSPACE_TARGETS = [
  "Athena Command Center",
  "Jarvis Video Studio",
  "Jarvis Websites",
  "Jarvis Avatar",
  "Providers",
  "Assets",
  "Projects",
  "Audit / Runs",
  "Safety / Settings",
  "Workflows",
  "Developer / Checkpoints",
] as const satisfies readonly AiModelProviderWorkspaceTarget[];

export function buildStableModelProviderKey(
  slotId: AiModelProviderSlotId
): AiModelProviderKey {
  return `athena-model-provider:${slotId}`;
}

export function buildStableCapabilityKey(
  capabilityId: AiModelProviderCapabilityId
): AiModelCapabilityKey {
  return `athena-model-capability:${capabilityId}`;
}

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneProviderSlot(
  slot: AiModelProviderSlotRecord
): AiModelProviderSlotRecord {
  return {
    ...slot,
    capabilityFamilies: cloneList(slot.capabilityFamilies),
    workspaceTargets: cloneList(slot.workspaceTargets),
    blockedBy: cloneList(slot.blockedBy),
  };
}

function cloneCapabilityRow(
  row: AiModelCapabilityMatrixRow
): AiModelCapabilityMatrixRow {
  return {
    ...row,
    providerSlotIds: cloneList(row.providerSlotIds),
    workspaceTargets: cloneList(row.workspaceTargets),
  };
}

function cloneSelectionPreview(
  preview: AiModelProviderRoutingReadinessPreviewRecord
): AiModelProviderRoutingReadinessPreviewRecord {
  return {
    ...preview,
    workspaceTargets: cloneList(preview.workspaceTargets),
    blockedBy: cloneList(preview.blockedBy),
  };
}

function buildProviderSlot(
  input: Omit<AiModelProviderSlotRecord, "key">
): AiModelProviderSlotRecord {
  return {
    ...input,
    key: buildStableModelProviderKey(input.id),
    capabilityFamilies: cloneList(input.capabilityFamilies),
    workspaceTargets: cloneList(input.workspaceTargets),
    blockedBy: cloneList(input.blockedBy),
  };
}

function buildCapabilityMatrixRow(
  input: Omit<AiModelCapabilityMatrixRow, "key">
): AiModelCapabilityMatrixRow {
  return {
    ...input,
    key: buildStableCapabilityKey(input.capabilityId),
    providerSlotIds: cloneList(input.providerSlotIds),
    workspaceTargets: cloneList(input.workspaceTargets),
  };
}

function buildRoutingPreview(
  input: AiModelProviderRoutingReadinessPreviewRecord
): AiModelProviderRoutingReadinessPreviewRecord {
  return {
    ...input,
    workspaceTargets: cloneList(input.workspaceTargets),
    blockedBy: cloneList(input.blockedBy),
  };
}

const PROVIDER_SLOTS = [
  buildProviderSlot({
    id: "openai-provider-slot",
    label: "OpenAI provider slot",
    description:
      "Static catalog slot for future text, code, reasoning, image, audio, and embeddings families behind server-only adapters.",
    providerStatus: "registry-only",
    currentState: "not connected",
    capabilityFamilies: [
      "text-chat",
      "code-assistance",
      "planning-reasoning",
      "image-generation",
      "image-editing",
      "audio-generation",
      "voice-narration",
      "transcription",
      "embeddings-search",
      "metadata-summarization",
      "safety-moderation",
    ],
    workspaceTargets: [
      "Athena Command Center",
      "Jarvis Websites",
      "Jarvis Video Studio",
      "Jarvis Avatar",
      "Providers",
      "Safety / Settings",
    ],
    blockedBy: [
      "Server-only adapters required",
      "Credential isolation required",
      "Operator approval required",
      "No model calls yet",
    ],
    nextAdapterRequirement:
      "Define server-only text, code, image, audio, and moderation adapter contracts with opaque credential references.",
  }),
  buildProviderSlot({
    id: "anthropic-provider-slot",
    label: "Anthropic provider slot",
    description:
      "Static catalog slot for future text, code, planning, and summarization families with no frontend provider connection.",
    providerStatus: "registry-only",
    currentState: "not connected",
    capabilityFamilies: [
      "text-chat",
      "code-assistance",
      "planning-reasoning",
      "metadata-summarization",
      "safety-moderation",
    ],
    workspaceTargets: [
      "Athena Command Center",
      "Jarvis Websites",
      "Projects",
      "Providers",
      "Developer / Checkpoints",
    ],
    blockedBy: [
      "Server-only adapters required",
      "No prompt sending",
      "No provider SDKs imported",
      "Audit required",
    ],
    nextAdapterRequirement:
      "Define server-only text-planning and code-review adapter contracts plus approval, kill-switch, and audit hooks.",
  }),
  buildProviderSlot({
    id: "google-gemini-provider-slot",
    label: "Google Gemini provider slot",
    description:
      "Static catalog slot for future multimodal text, code, image, audio, and embeddings families under backend-only execution.",
    providerStatus: "registry-only",
    currentState: "not connected",
    capabilityFamilies: [
      "text-chat",
      "code-assistance",
      "planning-reasoning",
      "image-editing",
      "transcription",
      "embeddings-search",
      "metadata-summarization",
    ],
    workspaceTargets: [
      "Athena Command Center",
      "Jarvis Websites",
      "Jarvis Video Studio",
      "Assets",
      "Providers",
    ],
    blockedBy: [
      "Backend-only execution required",
      "Credential isolation required",
      "Operator approval required",
      "No frontend provider call",
    ],
    nextAdapterRequirement:
      "Define server-only multimodal request and response contracts for planning, search, and media-adjacent review tasks.",
  }),
  buildProviderSlot({
    id: "xai-provider-slot",
    label: "xAI provider slot",
    description:
      "Static catalog slot for future text, reasoning, and summarization families with registry-only posture.",
    providerStatus: "registry-only",
    currentState: "not connected",
    capabilityFamilies: [
      "text-chat",
      "planning-reasoning",
      "metadata-summarization",
    ],
    workspaceTargets: [
      "Athena Command Center",
      "Projects",
      "Providers",
      "Developer / Checkpoints",
    ],
    blockedBy: [
      "No model calls yet",
      "Server-only adapters required",
      "Audit required",
    ],
    nextAdapterRequirement:
      "Define server-only text and reasoning adapter contracts with approval, audit, and kill-switch enforcement.",
  }),
  buildProviderSlot({
    id: "mistral-provider-slot",
    label: "Mistral provider slot",
    description:
      "Static catalog slot for future text, code, embeddings, and summarization families with no live availability claim.",
    providerStatus: "registry-only",
    currentState: "not connected",
    capabilityFamilies: [
      "text-chat",
      "code-assistance",
      "embeddings-search",
      "metadata-summarization",
    ],
    workspaceTargets: [
      "Athena Command Center",
      "Jarvis Websites",
      "Providers",
      "Projects",
    ],
    blockedBy: [
      "No provider SDKs imported",
      "Backend-only execution required",
      "Result capture required in future",
    ],
    nextAdapterRequirement:
      "Define server-only text, code, and embeddings adapter contracts with result-capture placeholders and audit joins.",
  }),
  buildProviderSlot({
    id: "local-open-weight-provider-slot",
    label: "Local open-weight provider slot",
    description:
      "Static catalog slot for future private text, code, summarization, and local inference families inside a local backend boundary.",
    providerStatus: "registry-only",
    currentState: "not connected",
    capabilityFamilies: [
      "text-chat",
      "code-assistance",
      "planning-reasoning",
      "local-inference",
      "metadata-summarization",
      "embeddings-search",
    ],
    workspaceTargets: [
      "Athena Command Center",
      "Providers",
      "Projects",
      "Safety / Settings",
      "Developer / Checkpoints",
    ],
    blockedBy: [
      "Local backend adapter contract required",
      "Operator approval required",
      "Kill switch required",
      "No frontend process or shell execution",
    ],
    nextAdapterRequirement:
      "Define server-only local-runtime adapter contracts and readiness checks for private inference without frontend execution.",
  }),
  buildProviderSlot({
    id: "image-provider-slot",
    label: "Image provider slot",
    description:
      "Static catalog slot for future image generation and image editing families that serve storyboard and asset workflows.",
    providerStatus: "registry-only",
    currentState: "not connected",
    capabilityFamilies: [
      "image-generation",
      "image-editing",
      "metadata-summarization",
    ],
    workspaceTargets: [
      "Jarvis Video Studio",
      "Jarvis Websites",
      "Assets",
      "Providers",
    ],
    blockedBy: [
      "No live image generation",
      "Server-only adapters required",
      "Approval packet required",
      "Audit required",
    ],
    nextAdapterRequirement:
      "Define server-only storyboard image adapter contracts with prompt redaction, artifact handoff, and audit packet hooks.",
  }),
  buildProviderSlot({
    id: "video-provider-slot",
    label: "Video provider slot",
    description:
      "Static catalog slot for future video generation families that stay blocked until backend-only runners exist.",
    providerStatus: "registry-only",
    currentState: "not connected",
    capabilityFamilies: ["video-generation", "metadata-summarization"],
    workspaceTargets: [
      "Jarvis Video Studio",
      "Providers",
      "Audit / Runs",
      "Safety / Settings",
    ],
    blockedBy: [
      "No live video generation",
      "Server-only adapters required",
      "Backend runner contract required",
      "Kill switch required",
    ],
    nextAdapterRequirement:
      "Define server-only video adapter contracts and backend-runner handoff envelopes before any execution path exists.",
  }),
  buildProviderSlot({
    id: "audio-voice-provider-slot",
    label: "Audio / voice provider slot",
    description:
      "Static catalog slot for future audio generation and voice narration families under backend-only execution.",
    providerStatus: "registry-only",
    currentState: "not connected",
    capabilityFamilies: [
      "audio-generation",
      "voice-narration",
      "metadata-summarization",
    ],
    workspaceTargets: [
      "Jarvis Video Studio",
      "Jarvis Avatar",
      "Assets",
      "Providers",
    ],
    blockedBy: [
      "No audio generation",
      "Server-only adapters required",
      "Credential isolation required",
      "Audit required",
    ],
    nextAdapterRequirement:
      "Define server-only audio and narration adapter contracts with voice policy review, approval, and audit hooks.",
  }),
  buildProviderSlot({
    id: "transcription-provider-slot",
    label: "Transcription provider slot",
    description:
      "Static catalog slot for future captioning and transcript extraction families with no frontend media or network execution.",
    providerStatus: "registry-only",
    currentState: "not connected",
    capabilityFamilies: [
      "transcription",
      "metadata-summarization",
      "embeddings-search",
    ],
    workspaceTargets: [
      "Jarvis Video Studio",
      "Assets",
      "Audit / Runs",
      "Providers",
    ],
    blockedBy: [
      "No transcription execution",
      "Server-only adapters required",
      "Audit required",
      "Result capture required in future",
    ],
    nextAdapterRequirement:
      "Define server-only transcription adapter contracts with caption handoff, result capture, and audit requirements.",
  }),
  buildProviderSlot({
    id: "safety-moderation-provider-slot",
    label: "Safety / moderation provider slot",
    description:
      "Static catalog slot for future moderation, policy review, and content-safety families that protect every workspace.",
    providerStatus: "registry-only",
    currentState: "not connected",
    capabilityFamilies: ["safety-moderation", "metadata-summarization"],
    workspaceTargets: WORKSPACE_TARGETS,
    blockedBy: [
      "Server-only adapters required",
      "Operator approval required",
      "Audit required",
      "No provider execution",
    ],
    nextAdapterRequirement:
      "Define server-only moderation adapter contracts that can gate prompts, outputs, and handoff packets before execution exists.",
  }),
] as const satisfies readonly AiModelProviderSlotRecord[];

const CAPABILITY_MATRIX = [
  buildCapabilityMatrixRow({
    capabilityId: "text-chat",
    label: "text/chat",
    description:
      "Preview-only mapping for natural-language chat, copy review, and operator guidance families.",
    providerSlotIds: [
      "openai-provider-slot",
      "anthropic-provider-slot",
      "google-gemini-provider-slot",
      "xai-provider-slot",
      "mistral-provider-slot",
      "local-open-weight-provider-slot",
    ],
    workspaceTargets: [
      "Athena Command Center",
      "Jarvis Websites",
      "Projects",
      "Providers",
    ],
    approvalRequirement: "Operator approval required",
    safetyRequirement: "Safety review required",
    auditRequirement: "Audit required",
    credentialIsolationRequirement: "Credential isolation required",
    backendOnlyAdapterRequirement: "Server-only adapter required",
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    nextAdapterRequirement:
      "Define server-only text chat request, moderation, and result-capture contracts.",
  }),
  buildCapabilityMatrixRow({
    capabilityId: "code-assistance",
    label: "code",
    description:
      "Preview-only mapping for code assistance, code review, and coding-route planning families.",
    providerSlotIds: [
      "openai-provider-slot",
      "anthropic-provider-slot",
      "google-gemini-provider-slot",
      "mistral-provider-slot",
      "local-open-weight-provider-slot",
    ],
    workspaceTargets: [
      "Athena Command Center",
      "Jarvis Websites",
      "Projects",
      "Developer / Checkpoints",
    ],
    approvalRequirement: "Operator approval required",
    safetyRequirement: "Safety review required",
    auditRequirement: "Audit required",
    credentialIsolationRequirement: "Credential isolation required",
    backendOnlyAdapterRequirement: "Server-only adapter required",
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    nextAdapterRequirement:
      "Define server-only code-assistance contracts with approval and audit envelope requirements.",
  }),
  buildCapabilityMatrixRow({
    capabilityId: "planning-reasoning",
    label: "planning / reasoning",
    description:
      "Preview-only mapping for operator planning, routing, and reasoning families with backend-only execution kept out of the frontend.",
    providerSlotIds: [
      "openai-provider-slot",
      "anthropic-provider-slot",
      "google-gemini-provider-slot",
      "xai-provider-slot",
      "local-open-weight-provider-slot",
    ],
    workspaceTargets: [
      "Athena Command Center",
      "Workflows",
      "Projects",
      "Providers",
    ],
    approvalRequirement: "Operator approval required",
    safetyRequirement: "Safety review required",
    auditRequirement: "Audit required",
    credentialIsolationRequirement: "Credential isolation required",
    backendOnlyAdapterRequirement: "Server-only adapter required",
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    nextAdapterRequirement:
      "Define server-only planning and reasoning contracts plus operator-approval and kill-switch enforcement.",
  }),
  buildCapabilityMatrixRow({
    capabilityId: "image-generation",
    label: "image",
    description:
      "Preview-only mapping for storyboard, concept, and still-image generation families.",
    providerSlotIds: ["openai-provider-slot", "image-provider-slot"],
    workspaceTargets: [
      "Jarvis Video Studio",
      "Jarvis Websites",
      "Assets",
      "Providers",
    ],
    approvalRequirement: "Operator approval required",
    safetyRequirement: "Safety review required",
    auditRequirement: "Audit required",
    credentialIsolationRequirement: "Credential isolation required",
    backendOnlyAdapterRequirement: "Server-only adapter required",
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    nextAdapterRequirement:
      "Define server-only image-generation contracts with prompt redaction, audit packets, and artifact handoff placeholders.",
  }),
  buildCapabilityMatrixRow({
    capabilityId: "image-editing",
    label: "image editing",
    description:
      "Preview-only mapping for asset retouching, variation, and edit-review families.",
    providerSlotIds: [
      "openai-provider-slot",
      "google-gemini-provider-slot",
      "image-provider-slot",
    ],
    workspaceTargets: ["Jarvis Websites", "Assets", "Providers"],
    approvalRequirement: "Operator approval required",
    safetyRequirement: "Safety review required",
    auditRequirement: "Audit required",
    credentialIsolationRequirement: "Credential isolation required",
    backendOnlyAdapterRequirement: "Server-only adapter required",
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    nextAdapterRequirement:
      "Define server-only image-editing contracts with asset lineage, audit, and approval hooks.",
  }),
  buildCapabilityMatrixRow({
    capabilityId: "video-generation",
    label: "video",
    description:
      "Preview-only mapping for product-video generation and render planning families.",
    providerSlotIds: ["video-provider-slot"],
    workspaceTargets: [
      "Jarvis Video Studio",
      "Audit / Runs",
      "Providers",
      "Safety / Settings",
    ],
    approvalRequirement: "Operator approval required",
    safetyRequirement: "Safety review required",
    auditRequirement: "Audit required",
    credentialIsolationRequirement: "Credential isolation required",
    backendOnlyAdapterRequirement: "Server-only adapter required",
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    nextAdapterRequirement:
      "Define server-only video-generation contracts and backend-runner handoff envelopes before execution.",
  }),
  buildCapabilityMatrixRow({
    capabilityId: "audio-generation",
    label: "audio/voice",
    description:
      "Preview-only mapping for generated audio beds, music-like placeholder review, and voice lane planning families.",
    providerSlotIds: ["openai-provider-slot", "audio-voice-provider-slot"],
    workspaceTargets: [
      "Jarvis Video Studio",
      "Jarvis Avatar",
      "Assets",
      "Providers",
    ],
    approvalRequirement: "Operator approval required",
    safetyRequirement: "Safety review required",
    auditRequirement: "Audit required",
    credentialIsolationRequirement: "Credential isolation required",
    backendOnlyAdapterRequirement: "Server-only adapter required",
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    nextAdapterRequirement:
      "Define server-only audio-generation contracts with policy review, audit, and result-capture requirements.",
  }),
  buildCapabilityMatrixRow({
    capabilityId: "voice-narration",
    label: "voice / narration",
    description:
      "Preview-only mapping for narration and spoken-guidance families with backend-only execution.",
    providerSlotIds: ["openai-provider-slot", "audio-voice-provider-slot"],
    workspaceTargets: [
      "Jarvis Video Studio",
      "Jarvis Avatar",
      "Providers",
      "Safety / Settings",
    ],
    approvalRequirement: "Operator approval required",
    safetyRequirement: "Safety review required",
    auditRequirement: "Audit required",
    credentialIsolationRequirement: "Credential isolation required",
    backendOnlyAdapterRequirement: "Server-only adapter required",
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    nextAdapterRequirement:
      "Define server-only narration contracts with consent, review, and backend-only credential references.",
  }),
  buildCapabilityMatrixRow({
    capabilityId: "transcription",
    label: "transcription",
    description:
      "Preview-only mapping for transcript and caption extraction families.",
    providerSlotIds: ["openai-provider-slot", "transcription-provider-slot"],
    workspaceTargets: [
      "Jarvis Video Studio",
      "Assets",
      "Audit / Runs",
      "Providers",
    ],
    approvalRequirement: "Operator approval required",
    safetyRequirement: "Safety review required",
    auditRequirement: "Audit required",
    credentialIsolationRequirement: "Credential isolation required",
    backendOnlyAdapterRequirement: "Server-only adapter required",
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    nextAdapterRequirement:
      "Define server-only transcription and caption contracts with audit trails and result placeholders.",
  }),
  buildCapabilityMatrixRow({
    capabilityId: "embeddings-search",
    label: "embeddings/search",
    description:
      "Preview-only mapping for search, retrieval, and index-planning families with no persistence implemented yet.",
    providerSlotIds: [
      "openai-provider-slot",
      "google-gemini-provider-slot",
      "mistral-provider-slot",
      "local-open-weight-provider-slot",
      "transcription-provider-slot",
    ],
    workspaceTargets: [
      "Athena Command Center",
      "Projects",
      "Assets",
      "Providers",
      "Developer / Checkpoints",
    ],
    approvalRequirement: "Operator approval required",
    safetyRequirement: "Safety review required",
    auditRequirement: "Audit required",
    credentialIsolationRequirement: "Credential isolation required",
    backendOnlyAdapterRequirement: "Server-only adapter required",
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    nextAdapterRequirement:
      "Define server-only embeddings/search contracts and keep persistence explicitly unimplemented in this phase.",
  }),
  buildCapabilityMatrixRow({
    capabilityId: "safety-moderation",
    label: "safety/moderation",
    description:
      "Preview-only mapping for moderation, policy review, and safety checkpoints across CodexForge.",
    providerSlotIds: [
      "openai-provider-slot",
      "anthropic-provider-slot",
      "safety-moderation-provider-slot",
    ],
    workspaceTargets: [
      "Athena Command Center",
      "Jarvis Video Studio",
      "Jarvis Websites",
      "Jarvis Avatar",
      "Safety / Settings",
      "Audit / Runs",
      "Providers",
    ],
    approvalRequirement: "Operator approval required",
    safetyRequirement: "Safety review required",
    auditRequirement: "Audit required",
    credentialIsolationRequirement: "Credential isolation required",
    backendOnlyAdapterRequirement: "Server-only adapter required",
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    nextAdapterRequirement:
      "Define server-only moderation contracts that can gate prompts, outputs, and handoff packets.",
  }),
  buildCapabilityMatrixRow({
    capabilityId: "local-inference",
    label: "local inference",
    description:
      "Preview-only mapping for private and local-only inference families with backend-owned local runtimes only.",
    providerSlotIds: ["local-open-weight-provider-slot"],
    workspaceTargets: [
      "Athena Command Center",
      "Projects",
      "Providers",
      "Safety / Settings",
      "Developer / Checkpoints",
    ],
    approvalRequirement: "Operator approval required",
    safetyRequirement: "Safety review required",
    auditRequirement: "Audit required",
    credentialIsolationRequirement: "Credential isolation required",
    backendOnlyAdapterRequirement: "Server-only adapter required",
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    nextAdapterRequirement:
      "Define server-only local-inference contracts and local-runtime readiness checks without frontend execution.",
  }),
  buildCapabilityMatrixRow({
    capabilityId: "metadata-summarization",
    label: "metadata / summarization",
    description:
      "Preview-only mapping for metadata extraction, summaries, and operator-facing synthesis families.",
    providerSlotIds: [
      "openai-provider-slot",
      "anthropic-provider-slot",
      "google-gemini-provider-slot",
      "xai-provider-slot",
      "mistral-provider-slot",
      "local-open-weight-provider-slot",
      "image-provider-slot",
      "video-provider-slot",
      "audio-voice-provider-slot",
      "transcription-provider-slot",
      "safety-moderation-provider-slot",
    ],
    workspaceTargets: WORKSPACE_TARGETS,
    approvalRequirement: "Operator approval required",
    safetyRequirement: "Safety review required",
    auditRequirement: "Audit required",
    credentialIsolationRequirement: "Credential isolation required",
    backendOnlyAdapterRequirement: "Server-only adapter required",
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    nextAdapterRequirement:
      "Define server-only metadata and summarization contracts that can summarize provider outputs without frontend calls.",
  }),
] as const satisfies readonly AiModelCapabilityMatrixRow[];

const PROVIDER_SELECTION_PREVIEW = [
  buildRoutingPreview({
    id: "natural-command-planning",
    requestLabel: "natural command planning",
    providerFamilyLabel: "text/planning provider family",
    capabilityId: "planning-reasoning",
    capabilityLabel: "planning / reasoning",
    workspaceTargets: ["Athena Command Center", "Providers"],
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    blockedBy: [
      "Registry-only selection preview",
      "No prompt sending",
      "Server-only adapter required",
    ],
    nextAdapterRequirement:
      "Define server-only planning adapter contracts for Athena command normalization.",
  }),
  buildRoutingPreview({
    id: "website-copy-code-planning",
    requestLabel: "website copy/code planning",
    providerFamilyLabel: "text/code provider family",
    capabilityId: "code-assistance",
    capabilityLabel: "code",
    workspaceTargets: ["Jarvis Websites", "Athena Command Center"],
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    blockedBy: [
      "Registry-only selection preview",
      "No frontend provider call",
      "Operator approval required",
    ],
    nextAdapterRequirement:
      "Define server-only text/code adapter contracts for website-planning flows.",
  }),
  buildRoutingPreview({
    id: "video-prompt-planning",
    requestLabel: "video prompt planning",
    providerFamilyLabel: "text/video planning provider family",
    capabilityId: "planning-reasoning",
    capabilityLabel: "planning / reasoning",
    workspaceTargets: ["Jarvis Video Studio", "Athena Command Center"],
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    blockedBy: [
      "Registry-only selection preview",
      "No live video generation",
      "Backend runner contract required",
    ],
    nextAdapterRequirement:
      "Define server-only planning-to-video adapter contracts with backend handoff envelopes.",
  }),
  buildRoutingPreview({
    id: "storyboard-images",
    requestLabel: "storyboard images",
    providerFamilyLabel: "image provider family",
    capabilityId: "image-generation",
    capabilityLabel: "image",
    workspaceTargets: ["Jarvis Video Studio", "Assets"],
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    blockedBy: [
      "Registry-only selection preview",
      "No live image generation",
      "Approval packet required",
    ],
    nextAdapterRequirement:
      "Define server-only storyboard image adapter contracts with artifact handoff placeholders.",
  }),
  buildRoutingPreview({
    id: "product-video-generation",
    requestLabel: "product video generation",
    providerFamilyLabel: "video provider family",
    capabilityId: "video-generation",
    capabilityLabel: "video",
    workspaceTargets: ["Jarvis Video Studio", "Audit / Runs"],
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    blockedBy: [
      "Registry-only selection preview",
      "No live video generation",
      "Server-only adapter required",
    ],
    nextAdapterRequirement:
      "Define server-only video adapter contracts and backend-runner execution boundaries.",
  }),
  buildRoutingPreview({
    id: "narration",
    requestLabel: "narration",
    providerFamilyLabel: "audio/voice provider family",
    capabilityId: "voice-narration",
    capabilityLabel: "voice / narration",
    workspaceTargets: ["Jarvis Video Studio", "Jarvis Avatar"],
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    blockedBy: [
      "Registry-only selection preview",
      "No audio generation",
      "Credential isolation required",
    ],
    nextAdapterRequirement:
      "Define server-only narration adapter contracts with consent, policy review, and audit requirements.",
  }),
  buildRoutingPreview({
    id: "transcript-captioning",
    requestLabel: "transcript/captioning",
    providerFamilyLabel: "transcription provider family",
    capabilityId: "transcription",
    capabilityLabel: "transcription",
    workspaceTargets: ["Jarvis Video Studio", "Assets", "Audit / Runs"],
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    blockedBy: [
      "Registry-only selection preview",
      "No transcription execution",
      "Result capture required in future",
    ],
    nextAdapterRequirement:
      "Define server-only transcription adapter contracts with caption output envelopes.",
  }),
  buildRoutingPreview({
    id: "safety-review",
    requestLabel: "safety review",
    providerFamilyLabel: "safety/moderation provider family",
    capabilityId: "safety-moderation",
    capabilityLabel: "safety/moderation",
    workspaceTargets: ["Safety / Settings", "Athena Command Center", "Audit / Runs"],
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    blockedBy: [
      "Registry-only selection preview",
      "No provider execution",
      "Audit required",
    ],
    nextAdapterRequirement:
      "Define server-only moderation adapter contracts that can gate prompts and outputs.",
  }),
  buildRoutingPreview({
    id: "local-private-work",
    requestLabel: "local/private work",
    providerFamilyLabel: "local open-weight provider family",
    capabilityId: "local-inference",
    capabilityLabel: "local inference",
    workspaceTargets: ["Athena Command Center", "Projects", "Providers"],
    executionPosture: "blocked / registry-only",
    currentState: "not connected",
    blockedBy: [
      "Registry-only selection preview",
      "No frontend process or shell execution",
      "Local backend adapter contract required",
    ],
    nextAdapterRequirement:
      "Define server-only local-runtime contracts and readiness checks for private inference lanes.",
  }),
] as const satisfies readonly AiModelProviderRoutingReadinessPreviewRecord[];

export const AI_MODEL_PROVIDER_REGISTRY = {
  registryVersion: "athena-jarvis-model-gateway-registry-v1",
  source: "Athena / Jarvis Model Gateway",
  registryMode: "preview-only",
  providerStatus: "registry-only / not connected",
  noModelCallsStatement: "No model calls yet",
  noPromptSendingStatement: "No prompt sending",
  noSdkImportStatement: "No provider SDKs imported",
  noFrontendProviderCallStatement: "No frontend provider call",
  serverOnlyAdapterRequiredStatement: "Server-only adapters required",
  credentialIsolationRequiredStatement: "Credential isolation required",
  opaqueCredentialReferenceOnlyStatement: "Opaque credential reference only",
  operatorApprovalRequiredStatement: "Operator approval required",
  killSwitchRequiredStatement: "Kill switch required",
  auditRequiredStatement: "Audit required",
  backendOnlyExecutionRequiredStatement: "Backend-only execution required",
  resultCaptureRequiredInFutureStatement: "Result capture required in future",
  resultPersistenceState: "Result persistence not implemented",
  auditPersistenceState: "Audit persistence not implemented",
  approvalPersistenceState: "Approval persistence not implemented",
  providerSlots: PROVIDER_SLOTS,
  capabilityMatrix: CAPABILITY_MATRIX,
  providerSelectionPreview: PROVIDER_SELECTION_PREVIEW,
} as const satisfies AiModelProviderRegistryRecord;

export function listModelProviderSlots(
  registry: AiModelProviderRegistryRecord = AI_MODEL_PROVIDER_REGISTRY
): readonly AiModelProviderSlotRecord[] {
  return registry.providerSlots.map(cloneProviderSlot);
}

export function listModelCapabilityMatrixRows(
  registry: AiModelProviderRegistryRecord = AI_MODEL_PROVIDER_REGISTRY
): readonly AiModelCapabilityMatrixRow[] {
  return registry.capabilityMatrix.map(cloneCapabilityRow);
}

export function listModelProviderSelectionPreview(
  registry: AiModelProviderRegistryRecord = AI_MODEL_PROVIDER_REGISTRY
): readonly AiModelProviderRoutingReadinessPreviewRecord[] {
  return registry.providerSelectionPreview.map(cloneSelectionPreview);
}

export function groupProvidersByCapability(
  registry: AiModelProviderRegistryRecord = AI_MODEL_PROVIDER_REGISTRY
): readonly AiModelProviderCapabilityGroup[] {
  const slotsById = new Map<AiModelProviderSlotId, AiModelProviderSlotRecord>(
    listModelProviderSlots(registry).map((slot) => [slot.id, slot])
  );

  return listModelCapabilityMatrixRows(registry).map((row) => ({
    capabilityId: row.capabilityId,
    capabilityLabel: row.label,
    providerSlots: row.providerSlotIds
      .map((slotId) => slotsById.get(slotId))
      .filter(
        (slot): slot is AiModelProviderSlotRecord => slot !== undefined
      ),
  }));
}

export function groupCapabilitiesByWorkspaceTarget(
  registry: AiModelProviderRegistryRecord = AI_MODEL_PROVIDER_REGISTRY
): readonly AiModelProviderWorkspaceCapabilityGroup[] {
  const matrixRows = listModelCapabilityMatrixRows(registry);

  return WORKSPACE_TARGETS.map((workspaceTarget) => ({
    workspaceTarget,
    capabilityRows: matrixRows.filter((row) =>
      row.workspaceTargets.includes(workspaceTarget)
    ),
  })).filter((group) => group.capabilityRows.length > 0);
}

export function buildProviderReadinessSummary(
  registry: AiModelProviderRegistryRecord = AI_MODEL_PROVIDER_REGISTRY
): AiModelProviderReadinessSummary {
  const capabilityMatrix = listModelCapabilityMatrixRows(registry);
  const workspaceGroups = groupCapabilitiesByWorkspaceTarget(registry);

  return {
    providerSlotCount: registry.providerSlots.length,
    capabilityCount: capabilityMatrix.length,
    workspaceTargetCount: workspaceGroups.length,
    providerStatus: registry.providerStatus,
    summaryLines: [
      `${registry.providerSlots.length} provider slots are visible to Athena.`,
      `${capabilityMatrix.length} capability families are mapped as preview-only registry rows.`,
      `${workspaceGroups.length} plugin and workspace targets are covered by the static matrix.`,
      registry.noModelCallsStatement,
      registry.noPromptSendingStatement,
      registry.serverOnlyAdapterRequiredStatement,
      registry.credentialIsolationRequiredStatement,
    ],
  };
}

export function buildCapabilityMatrixPreview(
  registry: AiModelProviderRegistryRecord = AI_MODEL_PROVIDER_REGISTRY
): AiModelCapabilityMatrixPreview {
  const matrixRows = listModelCapabilityMatrixRows(registry);

  return {
    capabilityCount: matrixRows.length,
    blockedCapabilityCount: matrixRows.filter(
      (row) => row.executionPosture === "blocked / registry-only"
    ).length,
    workspaceTargetCount: groupCapabilitiesByWorkspaceTarget(registry).length,
    matrixRows,
  };
}

export function buildBlockedProviderExecutionSummary(
  registry: AiModelProviderRegistryRecord = AI_MODEL_PROVIDER_REGISTRY
): AiModelProviderBlockedExecutionSummary {
  return {
    summary:
      "Provider execution remains blocked and registry-only until dry-run result review and recovery, approval hooks, kill-switch controls, audit joins, and backend-only execution paths exist.",
    blockedLines: [
      registry.noModelCallsStatement,
      registry.noPromptSendingStatement,
      registry.noSdkImportStatement,
      registry.noFrontendProviderCallStatement,
      registry.serverOnlyAdapterRequiredStatement,
      registry.credentialIsolationRequiredStatement,
      registry.operatorApprovalRequiredStatement,
      registry.killSwitchRequiredStatement,
      registry.auditRequiredStatement,
      registry.resultPersistenceState,
      registry.auditPersistenceState,
      registry.approvalPersistenceState,
    ],
  };
}

export function buildNextServerOnlyAdapterChecklist(
  registry: AiModelProviderRegistryRecord = AI_MODEL_PROVIDER_REGISTRY
): readonly string[] {
  const items = [
    "4714-4745 - Server-Only Model Adapter Contracts",
    "Define request and response envelopes for each provider family.",
    "Keep credentials as opaque backend-only references.",
    "Bind approval, kill switch, audit, and result-capture hooks to every adapter contract.",
    ...registry.capabilityMatrix.map((row) => row.nextAdapterRequirement),
  ];

  return Array.from(new Set(items));
}

export function buildAthenaProviderSelectionPreviewFromExactStaticExamples(
  registry: AiModelProviderRegistryRecord = AI_MODEL_PROVIDER_REGISTRY
): readonly AiModelProviderRoutingReadinessPreviewRecord[] {
  return listModelProviderSelectionPreview(registry);
}
