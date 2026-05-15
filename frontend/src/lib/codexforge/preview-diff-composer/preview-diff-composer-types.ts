import type { GroundedFixRiskLevel } from "../grounded-fix";

export type PreviewDiffIntentCategory =
  | "add"
  | "update"
  | "remove"
  | "rename"
  | "refactor"
  | "guard"
  | "test"
  | "docs"
  | "investigation";

export type PreviewDiffChangeKind = PreviewDiffIntentCategory;

export type PreviewDiffApprovalPosture = "review-required" | "blocked" | "ready-for-safe-preview";

export type DiffCompositionInputSource = {
  queueItemId: string;
  sourceGroundedFixId: string;
  goal: string;
  targetFiles: readonly string[];
  primaryFile: string;
  suspectedRootCause: string;
  recommendedApproach: string;
  evidenceIds: readonly string[];
  riskLevel: GroundedFixRiskLevel;
  confidence: number;
  suggestedTests?: readonly string[];
  rollbackNotes?: readonly string[];
  approvalPosture?: PreviewDiffApprovalPosture;
};

export type DiffCompositionInput = {
  id: string;
  queueItemId: string;
  sourceGroundedFixId: string;
  goal: string;
  targetFiles: string[];
  primaryFile: string;
  suspectedRootCause: string;
  recommendedApproach: string;
  evidenceIds: string[];
  riskLevel: GroundedFixRiskLevel;
  confidence: number;
  suggestedTests: string[];
  rollbackNotes: string[];
  approvalPosture: PreviewDiffApprovalPosture;
  previewOnlyGuarantee: string;
};

export type DiffCompositionValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type DiffIntentChange = {
  id: string;
  category: PreviewDiffIntentCategory;
  targetFile: string;
  whatShouldChange: string;
  whyItShouldChange: string;
  expectedAffectedSymbols: string[];
  expectedRisk: GroundedFixRiskLevel;
  acceptanceCriteria: string[];
  evidenceReferences: string[];
  verificationChecks: string[];
};

export type DiffIntentModel = {
  id: string;
  compositionInputId: string;
  goal: string;
  changes: DiffIntentChange[];
  summary: string[];
};

export type PseudoDiffHunk = {
  id: string;
  title: string;
  beforeHint: string;
  afterHint: string;
  intentLines: string[];
  suppliedExactEdits: string[];
  previewOnly: true;
};

export type PseudoDiffFile = {
  id: string;
  filePath: string;
  changeKind: PreviewDiffChangeKind;
  intentSummary: string;
  pseudoHunks: PseudoDiffHunk[];
  beforeHint: string;
  afterHint: string;
  riskWarning: string;
  verificationNote: string;
  previewOnly: true;
  notApplyablePatch: true;
};

export type PseudoDiffPreview = {
  id: string;
  compositionInputId: string;
  previewOnly: true;
  notApplyablePatch: true;
  generatedFromRecommendationMetadata: true;
  requiresCurrentFileInspection: true;
  files: PseudoDiffFile[];
  summary: string[];
};

export type DiffChangePlanStep = {
  id: string;
  label: string;
  detail: string;
  reviewGate: boolean;
};

export type DiffChangePlan = {
  id: string;
  compositionInputId: string;
  steps: DiffChangePlanStep[];
  summary: string[];
};

export type DiffVerificationPlan = {
  id: string;
  compositionInputId: string;
  checks: string[];
  smokeScripts: string[];
  summary: string[];
};

export type DiffRollbackPlan = {
  id: string;
  compositionInputId: string;
  notes: string[];
  summary: string[];
};

export type DiffApprovalBoundary = {
  id: "preview-diff-approval-boundary";
  previewCompositionAllowed: true;
  applyBlocked: true;
  writeBlocked: true;
  commandExecutionBlocked: true;
  safePatchPreviewReviewRequired: true;
  futureApplyApprovalRequired: true;
  futureCommandApprovalRequired: true;
  evidenceIsContextNotProof: true;
  currentFileContentIsAuthority: true;
  blockedActions: string[];
  summary: string[];
};

export type PreviewDiffComposerSummary = {
  id: "preview-diff-composer-summary";
  targetFileCount: number;
  pseudoHunkCount: number;
  confidence: number;
  risk: GroundedFixRiskLevel;
  verificationCount: number;
  blockedActions: string[];
  nextSafeAction: string;
  summary: string[];
};

export type PreviewDiffComposerSession = {
  input: DiffCompositionInput;
  validation: DiffCompositionValidation;
  intent: DiffIntentModel;
  pseudoDiff: PseudoDiffPreview;
  changePlan: DiffChangePlan;
  verificationPlan: DiffVerificationPlan;
  rollbackPlan: DiffRollbackPlan;
  approvalBoundary: DiffApprovalBoundary;
  summary: PreviewDiffComposerSummary;
  implementationPrompt: string;
};

export function buildPreviewDiffComposerStableKey(
  ...parts: Array<string | number | boolean | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._/-]+/g, "-")
        .replace(/[/-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function uniquePreviewDiffComposerStrings(values: readonly (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function clampPreviewDiffComposerScore(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.min(1, Math.max(0, numeric));
}
