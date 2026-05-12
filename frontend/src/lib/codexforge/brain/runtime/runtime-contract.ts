import {
  CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES as RUNTIME_EVENT_TYPES,
  type CodexForgeBrainRuntimeEventType,
} from "./runtime-types";

export const CODEXFORGE_BRAIN_RUNTIME_VERSION =
  "codexforge-brain-runtime-phase-1b" as const;

export const CODEXFORGE_BRAIN_RUNTIME_CANONICAL_SCHEMA_PATH =
  "src/lib/codexforge/brain/graph/types.ts" as const;

export const CODEXFORGE_BRAIN_RUNTIME_REQUIRED_APIS = [
  "appendEvent",
  "reduceGraph",
  "assembleContext",
  "rankMemory",
  "createEpisode",
  "synthesizeConcepts",
] as const;

export const CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES = RUNTIME_EVENT_TYPES;

export const CODEXFORGE_BRAIN_RUNTIME_FORBIDDEN_IMPORTS = [
  "brain-graph",
  "brain/graph/brain-graph",
  "@/lib/codexforge/brain/graph/brain-graph",
] as const;

export const CODEXFORGE_BRAIN_RUNTIME_NEXT_SAFE_STEPS = [
  "Phase 2 memory should append typed runtime events and let reduceGraph update the canonical graph.",
  "Agent and tool integration should publish runtime events before reading assembled context.",
  "Files surfaces should consume readonly timeline, health, diagnostics, and graph context data.",
  "Future UI integration should send commands through runtime adapters that call appendEvent.",
  "Schema changes should extend src/lib/codexforge/brain/graph/types.ts before runtime reducers consume them.",
] as const;

export type CodexForgeBrainRuntimeRequiredApi =
  (typeof CODEXFORGE_BRAIN_RUNTIME_REQUIRED_APIS)[number];

export type CodexForgeBrainRuntimeForbiddenImport =
  (typeof CODEXFORGE_BRAIN_RUNTIME_FORBIDDEN_IMPORTS)[number];

export type CodexForgeBrainRuntimeContract = {
  version: typeof CODEXFORGE_BRAIN_RUNTIME_VERSION;
  canonicalSchemaPath: typeof CODEXFORGE_BRAIN_RUNTIME_CANONICAL_SCHEMA_PATH;
  requiredApis: readonly CodexForgeBrainRuntimeRequiredApi[];
  eventTypes: readonly CodexForgeBrainRuntimeEventType[];
  forbiddenImports: readonly CodexForgeBrainRuntimeForbiddenImport[];
  nextSafeSteps: readonly string[];
};

export function getCodexForgeBrainRuntimeContract(): CodexForgeBrainRuntimeContract {
  return {
    version: CODEXFORGE_BRAIN_RUNTIME_VERSION,
    canonicalSchemaPath: CODEXFORGE_BRAIN_RUNTIME_CANONICAL_SCHEMA_PATH,
    requiredApis: CODEXFORGE_BRAIN_RUNTIME_REQUIRED_APIS,
    eventTypes: CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES,
    forbiddenImports: CODEXFORGE_BRAIN_RUNTIME_FORBIDDEN_IMPORTS,
    nextSafeSteps: CODEXFORGE_BRAIN_RUNTIME_NEXT_SAFE_STEPS,
  };
}
