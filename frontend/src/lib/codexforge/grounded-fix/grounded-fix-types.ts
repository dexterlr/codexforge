export type GroundedFixSignalType =
  | "chat-evidence"
  | "memory-candidate"
  | "read-only-execution"
  | "file-intelligence"
  | "patch-preview-plan"
  | "task-readiness"
  | "manual-goal";

export type GroundedFixSourceType =
  | "evidence-grounded-chat"
  | "evidence-memory"
  | "read-only-step-execution"
  | "files"
  | "patch-preview"
  | "execution-readiness"
  | "task"
  | "manual";

export type GroundedFixRiskLevel = "low" | "medium" | "high" | "critical";
export type GroundedFixImportance = "low" | "medium" | "high" | "critical";
export type GroundedFixReviewState = "recommended" | "needs-review" | "investigation-needed" | "blocked";

export type GroundedFixCandidateKind =
  | "bug-fix"
  | "safety-fix"
  | "UI-fix"
  | "typing-fix"
  | "routing-fix"
  | "state-fix"
  | "smoke-fix"
  | "docs-fix"
  | "refactor-recommendation"
  | "investigation-needed";

export type GroundedFixSourceRef = {
  type: string;
  id: string;
  label: string;
};

export type GroundedFixRawSignal = {
  id?: string | null;
  type?: GroundedFixSignalType | string | null;
  title?: string | null;
  summary?: string | null;
  sourceType?: GroundedFixSourceType | string | null;
  sourceId?: string | null;
  filePath?: string | null;
  lineNumber?: number | null;
  match?: string | null;
  confidence?: number | "high" | "medium" | "low" | null;
  importance?: GroundedFixImportance | number | null;
  riskHints?: readonly string[] | null;
  warnings?: readonly string[] | null;
  stale?: boolean | null;
  weak?: boolean | null;
  sourceRefs?: readonly GroundedFixSourceRef[] | null;
};

export type GroundedFixSignal = {
  id: string;
  type: GroundedFixSignalType;
  title: string;
  summary: string;
  sourceType: GroundedFixSourceType;
  sourceId: string;
  filePath: string | null;
  lineNumber: number | null;
  match: string | null;
  confidence: number;
  importance: GroundedFixImportance;
  importanceScore: number;
  riskHints: string[];
  staleWarnings: string[];
  weakWarnings: string[];
  contradictionWarnings: string[];
  sourceRefs: GroundedFixSourceRef[];
};

export type GroundedFixSignalSummary = {
  id: "grounded-fix-signal-summary";
  signalCount: number;
  fileCount: number;
  weakCount: number;
  staleCount: number;
  summary: string[];
};

export type GroundedFixCandidateInput = {
  signals?: readonly GroundedFixSignal[];
  manualGoal?: string | null;
  relatedTasks?: readonly string[] | null;
  relatedMemories?: readonly string[] | null;
  missingTestPlan?: boolean | null;
};

export type GroundedFixCandidate = {
  id: string;
  kind: GroundedFixCandidateKind;
  title: string;
  goal: string;
  targetFiles: string[];
  suspectedRootCause: string;
  recommendedApproach: string;
  evidenceIds: string[];
  sourceSignalIds: string[];
  relatedMemories: string[];
  relatedTasks: string[];
  relatedRisks: string[];
  patchPreviewReadiness: "ready" | "needs-current-file-verification" | "blocked";
  confidence: number;
  confidenceReasons: string[];
  riskLevel: GroundedFixRiskLevel;
  riskScore: number;
  reviewState: GroundedFixReviewState;
  nextSafeAction: string;
};

export type GroundedFixRiskFactor = {
  id: string;
  label: string;
  level: GroundedFixRiskLevel;
  score: number;
  detail: string;
};

export type GroundedFixRiskBoard = {
  id: "grounded-fix-risk-board";
  candidateId: string;
  level: GroundedFixRiskLevel;
  score: number;
  factors: GroundedFixRiskFactor[];
  summary: string[];
};

export type GroundedFixFileImpactItem = {
  filePath: string;
  role: "primary-target" | "related-context" | "verification" | "unknown";
  impactLevel: GroundedFixRiskLevel;
  reason: string;
  riskHints: string[];
  requiredVerification: string[];
  suggestedSmokeScripts: string[];
  safePatchPreviewRequired: boolean;
};

export type GroundedFixFileImpact = {
  id: "grounded-fix-file-impact";
  candidateId: string;
  items: GroundedFixFileImpactItem[];
  summary: string[];
};

export type GroundedFixPreviewHandoff = {
  id: "grounded-fix-preview-handoff";
  candidateId: string;
  targetFiles: string[];
  prompt: string;
  patchPreviewInput: GroundedFixPatchPreviewInput;
  safetyInstructions: string[];
  summary: string[];
};

export type GroundedFixPatchPreviewInput = {
  goal: string;
  targetFiles: string[];
  evidence: string[];
  risks: string[];
  suggestedTests: string[];
  rollbackReminders: string[];
  previewOnly: true;
  safePatchPreviewRequired: true;
};

export type GroundedFixRecommendationPolicy = {
  id: "grounded-fix-recommendation-policy";
  allowed: boolean;
  recommendationAllowed: boolean;
  mutationBlocked: true;
  applyBlocked: true;
  commandExecutionBlocked: true;
  fileEditsRequireSafePatchPreview: true;
  memoryIsContextNotAuthority: true;
  currentFilesMustBeVerified: true;
  hiddenContextInjectionAllowed: false;
  lowConfidenceMarkedInvestigationNeeded: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type GroundedFixRecommendationSummary = {
  id: "grounded-fix-recommendation-summary";
  signalCount: number;
  candidateCount: number;
  topCandidate: GroundedFixCandidate | null;
  confidenceDistribution: { high: number; medium: number; low: number };
  riskDistribution: Record<GroundedFixRiskLevel, number>;
  blockedReasons: string[];
  nextSafeAction: string;
  summary: string[];
};

export function buildGroundedFixStableKey(
  ...parts: Array<string | number | boolean | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function uniqueGroundedFixStrings(values: Array<string | null | undefined>): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function clampGroundedFixScore(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.min(1, Math.max(0, numeric));
}

export function importanceFromGroundedFixScore(score: number): GroundedFixImportance {
  if (score >= 0.88) return "critical";
  if (score >= 0.68) return "high";
  if (score >= 0.38) return "medium";
  return "low";
}
