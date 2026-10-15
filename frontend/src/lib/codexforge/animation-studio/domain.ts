/** Canonical Phase 0 contracts. Provider-specific values live only in adapterMetadata. */
export const STUDIO_SCHEMA_VERSION = 1 as const;
export type EntityKind = "project" | "sequence" | "shot" | "asset" | "character" | "environment" | "rig" | "generation" | "render" | "qc" | "approval" | "prompt" | "model" | "cost" | "job" | "event";
export type StudioId<K extends EntityKind = EntityKind> = `${K}_${string}`;
export type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
export type JsonObject = { [key: string]: JsonValue };
export type Timestamp = string;
export type ContentHash = string;
export type Money = Readonly<{ currency: string; minorUnits: number }>;
export type AssetRef = Readonly<{ assetId: StudioId<"asset">; version: number }>;
export type ApprovalState = "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
export const PRODUCTION_METHODS = ["GENERATIVE", "RIGGED", "3D", "2_5D", "LIVE_ACTION", "HYBRID"] as const;
export type ProductionMethod = typeof PRODUCTION_METHODS[number];
export const ENGINE_IDS = ["HIGGSFIELD", "COMFYUI", "BLENDER", "AFTER_EFFECTS", "CHARACTER_ANIMATOR", "MOHO", "TOON_BOOM", "PHOTOSHOP", "ILLUSTRATOR", "PREMIERE", "AUDITION", "MEDIA_ENCODER", "FFMPEG"] as const;
export type EngineId = typeof ENGINE_IDS[number];
export const APPROVAL_GATES = ["GATE_01", "GATE_02", "GATE_03", "GATE_04", "GATE_05", "GATE_06", "GATE_07", "GATE_08"] as const;
export type ApprovalGate = typeof APPROVAL_GATES[number];
export const GATE_LABELS: Readonly<Record<ApprovalGate, string>> = {
  GATE_01: "BRIEF_LOCK", GATE_02: "STORYBOARD_LOCK", GATE_03: "CHARACTER_LOCK", GATE_04: "SHOT_MOTION_LOCK",
  GATE_05: "ROUGH_CUT_LOCK", GATE_06: "PICTURE_LOCK", GATE_07: "SOUND_LOCK", GATE_08: "MASTER_LOCK",
};
export interface AdapterMetadata { adapterId: string; provider: string | null; model: string | null; providerJobId: string | null; externalGenerationId: string | null; settings: JsonObject }
export interface Provenance {
  adapterMetadata: AdapterMetadata | null; promptId: StudioId<"prompt"> | null; negativePrompt: string | null;
  referenceAssets: AssetRef[]; timestamp: Timestamp; cost: Money; contentHash: ContentHash;
  parentAssets: AssetRef[]; jobId: StudioId<"job"> | null; approvalState: ApprovalState; rejectionReason: string | null;
}
export interface StudioProject { schemaVersion: 1; projectId: StudioId<"project">; revision: number; title: string; description: string; createdAt: Timestamp; currency: string }
export interface Sequence { schemaVersion: 1; sequenceId: StudioId<"sequence">; projectId: StudioId<"project">; title: string; shotIds: StudioId<"shot">[] }
export interface ShotManifest {
  schemaVersion: 1; shotId: StudioId<"shot">; sequenceId: StudioId<"sequence">; projectId: StudioId<"project">; revision: number;
  description: string; storyPurpose: string; duration: number; fps: number; resolution: { width: number; height: number }; aspectRatio: { width: number; height: number };
  characters: StudioId<"character">[]; environment: StudioId<"environment"> | null; props: AssetRef[];
  camera: { framing: string; movement: string; lensMm: number | null }; lighting: string; action: string;
  dialogue: { speaker: StudioId<"character"> | null; text: string; startSeconds: number; endSeconds: number }[];
  audio: AssetRef[]; identityStrictness: "FLEXIBLE" | "CONSISTENT" | "EXACT"; continuityRequirements: string[];
  generationMethod: ProductionMethod; preferredEngine: EngineId | null; fallbackEngine: EngineId | null;
  sourceReferences: AssetRef[]; inputAssets: AssetRef[]; outputAssets: AssetRef[]; dependencies: StudioId<"shot">[];
  status: "DRAFT" | "READY" | "IN_PROGRESS" | "BLOCKED" | "COMPLETE"; approvalState: ApprovalState;
  costEstimate: Money; actualCost: Money; generationAttempts: StudioId<"generation">[]; selectedVersion: AssetRef | null; qcResults: StudioId<"qc">[]; notes: string[];
}
export type Shot = ShotManifest;
export const ASSET_TYPES = ["CHARACTER", "ENVIRONMENT", "PROP", "BRAND", "UI", "AUDIO", "IMAGE", "VIDEO", "RIG", "DOCUMENT", "MASTER"] as const;
export type AssetType = typeof ASSET_TYPES[number];
export interface Asset {
  schemaVersion: 1; assetId: StudioId<"asset">; projectId: StudioId<"project">; version: number; sourcePath: string; contentHash: ContentHash;
  assetType: AssetType; approvalState: ApprovalState; provenance: Provenance; dependencies: AssetRef[];
  rights: { status: "UNKNOWN" | "OWNED" | "LICENSED" | "PUBLIC_DOMAIN" | "RESTRICTED"; license: string | null; evidence: string | null };
  createdAt: Timestamp; supersededBy: AssetRef | null; lineage: AssetRef[];
}
export type AssetManifest = Asset;
export interface Character { schemaVersion: 1; characterId: StudioId<"character">; projectId: StudioId<"project">; name: string; identityAssets: AssetRef[]; rigId: StudioId<"rig"> | null }
export interface Environment { schemaVersion: 1; environmentId: StudioId<"environment">; projectId: StudioId<"project">; name: string; assets: AssetRef[] }
export interface Rig { schemaVersion: 1; rigId: StudioId<"rig">; projectId: StudioId<"project">; assets: AssetRef[]; compatibleMethods: ProductionMethod[] }
export interface Generation { schemaVersion: 1; generationId: StudioId<"generation">; shotId: StudioId<"shot">; jobId: StudioId<"job">; promptId: StudioId<"prompt">; modelId: StudioId<"model">; outputs: AssetRef[]; adapterMetadata: AdapterMetadata | null }
export interface Render { schemaVersion: 1; renderId: StudioId<"render">; shotId: StudioId<"shot">; jobId: StudioId<"job">; inputs: AssetRef[]; outputs: AssetRef[]; settings: JsonObject; adapterMetadata: AdapterMetadata | null }
export interface QCResult { schemaVersion: 1; qcId: StudioId<"qc">; projectId: StudioId<"project">; subject: AssetRef; rule: string; result: "PASS" | "FAIL" | "REVIEW"; details: string; createdAt: Timestamp }
export interface Approval { schemaVersion: 1; approvalId: StudioId<"approval">; projectId: StudioId<"project">; gate: ApprovalGate; subjectHash: ContentHash; state: "PENDING" | "APPROVED" | "REJECTED"; actor: string; reason: string; createdAt: Timestamp; decidedAt: Timestamp | null }
export interface Prompt { schemaVersion: 1; promptId: StudioId<"prompt">; version: number; text: string; negativePrompt: string | null; references: AssetRef[] }
export interface Model { schemaVersion: 1; modelId: StudioId<"model">; name: string; methods: ProductionMethod[]; adapterMetadata: AdapterMetadata | null }
export interface CostRecord { schemaVersion: 1; costId: StudioId<"cost">; projectId: StudioId<"project">; shotId: StudioId<"shot"> | null; jobId: StudioId<"job">; kind: "RESERVED" | "ACTUAL" | "RELEASED"; amount: Money; createdAt: Timestamp }
export const JOB_STATES = ["QUEUED", "RUNNING", "WAITING_EXTERNAL", "WAITING_APPROVAL", "SUCCEEDED", "FAILED", "CANCELLED"] as const;
export type JobState = typeof JOB_STATES[number];
export type ExternalAction = "EXTERNAL_GENERATION" | "PAID_GENERATION" | "ADOBE_AUTOMATION" | "BLENDER_RENDER";
export interface Job {
  schemaVersion: 1; jobId: StudioId<"job">; type: "ESTIMATE" | "GENERATION" | "ANIMATION" | "RENDER" | "COMPOSITE" | "EDIT" | "AUDIO" | "DELIVERY" | "QC";
  projectId: StudioId<"project">; shotId: StudioId<"shot"> | null; dependencies: StudioId<"job">[]; state: JobState; attempt: number; maxAttempts: number;
  createdAt: Timestamp; startedAt: Timestamp | null; finishedAt: Timestamp | null; adapterMetadata: AdapterMetadata | null;
  inputs: AssetRef[]; outputs: AssetRef[]; error: { code: string; message: string; retryable: boolean } | null; checkpoint: JsonObject;
  costEstimate: Money; actualCost: Money; externalActions: ExternalAction[]; requiredGates: ApprovalGate[]; approvalSubjectHash: ContentHash;
  dispatch: { token: string; state: "INTENT_RECORDED" | "ACKNOWLEDGED" | "COMPLETED"; recordedAt: Timestamp } | null;
}
export const EVENT_TYPES = ["PROJECT_CREATED", "PROJECT_REVISED", "SEQUENCE_CREATED", "DEFINITION_REGISTERED", "SHOT_CREATED", "SHOT_REVISED", "ASSET_REGISTERED", "ASSET_VERSION_CREATED", "ROUTE_SELECTED", "JOB_CREATED", "JOB_STARTED", "JOB_BLOCKED", "JOB_COMPLETED", "JOB_FAILED", "JOB_CANCELLED", "JOB_CHECKPOINTED", "APPROVAL_REQUESTED", "APPROVAL_GRANTED", "APPROVAL_REJECTED", "QC_RECORDED"] as const;
export type ProductionEventType = typeof EVENT_TYPES[number];
export interface ProductionEvent { schemaVersion: 1; eventId: StudioId<"event">; projectId: StudioId<"project">; sequence: number; type: ProductionEventType; timestamp: Timestamp; actor: string; subjectId: StudioId; details: JsonObject; previousHash: ContentHash | null; eventHash: ContentHash }
export interface ExternalExecutionPolicy { externalGenerationEnabled: boolean; paidGenerationEnabled: boolean; adobeAutomationEnabled: boolean; blenderRenderEnabled: boolean }
export interface CostPolicy { MAX_SHOT_GENERATION_COST: Money; MAX_PROJECT_GENERATION_COST: Money; MAX_ATTEMPTS_PER_SHOT: number }
export interface Decision { status: "ALLOWED" | "REQUIRES_APPROVAL" | "BLOCKED"; reasons: string[] }
export interface CapabilityObservation { engine: EngineId; availability: "AVAILABLE" | "UNAVAILABLE" | "UNKNOWN"; evidence: string; checkedAt: Timestamp; methods: ProductionMethod[] }
export interface RoutingResult { selectedMethod: ProductionMethod; selectedEngines: EngineId[]; fallbacks: EngineId[]; reasoningCodes: string[]; requirements: string[]; blockedCapabilities: EngineId[]; status: "READY" | "BLOCKED" | "PLANNING_ELIGIBLE"; priority: number }
export interface AdapterRequest { job: Readonly<Job>; idempotencyToken: string; policy: Readonly<ExternalExecutionPolicy> }
export interface AdapterResult { status: "WAITING_EXTERNAL" | "SUCCEEDED" | "FAILED" | "BLOCKED"; outputs: AssetRef[]; adapterMetadata: AdapterMetadata | null; reasons: string[] }
export interface StudioAdapter { readonly adapterId: string; discover(): Promise<CapabilityObservation[]>; execute(request: AdapterRequest): Promise<AdapterResult> }
export interface GenerationProvider extends StudioAdapter { readonly kind: "GENERATION" }
export interface AnimationProvider extends StudioAdapter { readonly kind: "ANIMATION" }
export interface DccProvider extends StudioAdapter { readonly kind: "DCC" }
export interface CompositorProvider extends StudioAdapter { readonly kind: "COMPOSITOR" }
export interface EditorialProvider extends StudioAdapter { readonly kind: "EDITORIAL" }
export interface AudioProvider extends StudioAdapter { readonly kind: "AUDIO" }
export interface DeliveryProvider extends StudioAdapter { readonly kind: "DELIVERY" }
