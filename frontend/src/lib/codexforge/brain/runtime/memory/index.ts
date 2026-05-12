export {
  calculateMemoryAgeScore,
  calculateMemoryDecay,
  calculateMemoryRecency,
} from "./memory-aging";

export {
  buildCognitiveMemoryScoreBreakdown,
  calculateMemoryConfidence,
  calculateMemoryImportance,
  rankCognitiveMemory,
} from "./confidence-engine";

export {
  dedupeCognitiveMemory,
  normalizeMemoryFingerprint,
} from "./semantic-dedupe";

export {
  findPromotableConcepts,
  promoteConceptCandidate,
} from "./concept-promoter";

export {
  detectMemoryContradictions,
  scoreContradictionRisk,
} from "./contradiction-detector";

export {
  clusterMemorySignals,
  summarizeMemoryCluster,
} from "./memory-clusters";

export {
  buildCognitiveMemoryFixtureEvents,
  buildCognitiveMemoryFixtureNodes,
} from "./memory-fixtures";

export type {
  CodexForgeCognitiveMemoryAgeInput,
  CodexForgeCognitiveMemoryAgeScore,
  CodexForgeCognitiveMemoryDecayInput,
} from "./memory-aging";

export type {
  CodexForgeCognitiveMemoryConfidenceInput,
  CodexForgeCognitiveMemoryScore,
  CodexForgeCognitiveMemoryScoreBreakdown,
  CodexForgeRankCognitiveMemoryInput,
} from "./confidence-engine";

export type {
  CodexForgeCognitiveMemoryDedupeCandidate,
  CodexForgeCognitiveMemoryDedupeGroup,
} from "./semantic-dedupe";

export type {
  CodexForgeConceptPromotionResult,
  CodexForgeFindPromotableConceptsInput,
  CodexForgePromotableConcept,
} from "./concept-promoter";

export type {
  CodexForgeContradictionRiskScore,
  CodexForgeContradictionSignal,
  CodexForgeDetectMemoryContradictionsInput,
  CodexForgeMemoryContradiction,
} from "./contradiction-detector";

export type {
  CodexForgeClusterMemorySignalsInput,
  CodexForgeMemoryCluster,
  CodexForgeMemoryClusterSummary,
} from "./memory-clusters";
