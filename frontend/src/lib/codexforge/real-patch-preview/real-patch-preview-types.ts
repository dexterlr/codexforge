import type {
  ProjectFileCategory,
  ProjectFileMetadata,
  ProjectFilePurpose,
  ProjectFileRiskLevel,
  ProjectFileRiskReport,
} from "../local-project-reader";

export type RealPatchPreviewRiskLevel = "low" | "medium" | "high" | "critical" | "blocked";

export type PatchChangeRequestValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type PatchChangeRequestSource = {
  selectedFilePath?: string | null;
  selectedFileCategory?: ProjectFileCategory | "unknown" | null;
  requestedChangeText?: string | null;
  operatorIntent?: string | null;
  constraints?: readonly string[] | null;
};

export type PatchChangeRequest = {
  id: string;
  selectedFilePath: string;
  selectedFileCategory: ProjectFileCategory | "unknown";
  requestedChangeText: string;
  operatorIntent: string;
  constraints: string[];
  noWriteGuarantee: string;
  noCommandGuarantee: string;
  latestMessageAuthorityReminder: string;
  validation: PatchChangeRequestValidation;
};

export type PatchPreviewContextMarkers = {
  route: boolean;
  component: boolean;
  api: boolean;
  tool: boolean;
  smoke: boolean;
  test: boolean;
  docs: boolean;
  style: boolean;
  config: boolean;
  patchApply: boolean;
  brainRuntime: boolean;
  navigationShell: boolean;
};

export type PatchPreviewContextSource = {
  filePath: string;
  fileContent?: string | null;
  metadata?: ProjectFileMetadata | null;
  purpose?: ProjectFilePurpose | null;
  risk?: ProjectFileRiskReport | null;
  maxPreviewLines?: number | null;
};

export type PatchPreviewContext = {
  id: string;
  filePath: string;
  fileMetadata: ProjectFileMetadata;
  filePurpose: ProjectFilePurpose;
  fileRisk: ProjectFileRiskReport;
  contentExcerpt: string;
  lineCount: number;
  importMarkers: string[];
  exportMarkers: string[];
  markers: PatchPreviewContextMarkers;
  relatedWorkflowHints: string[];
  maxPreviewLines: number;
  truncated: boolean;
  sourceContentSupplied: true;
  noFilesystemReadGuarantee: string;
};

export type RealPatchPreviewStepStatus = "ready" | "review" | "blocked";

export type RealPatchPreviewStep = {
  id: string;
  label: string;
  status: RealPatchPreviewStepStatus;
  detail: string;
  groundedIn: string[];
};

export type RealPatchPreviewPlan = {
  id: string;
  goal: string;
  selectedFile: string;
  expectedTouchedFiles: string[];
  currentBehaviorSummary: string;
  proposedBehaviorSummary: string;
  steps: RealPatchPreviewStep[];
  affectedImports: string[];
  affectedExports: string[];
  safetyBoundaries: string[];
  riskPosture: RealPatchPreviewRiskLevel;
  tests: string[];
  rollbackNotes: string[];
  approvalBoundary: string;
  noMutationGuarantee: string;
  summary: string;
};

export type UnifiedDiffPreviewMode =
  | "exact-replacement-preview"
  | "append-section-placeholder"
  | "component-copy-style-preview"
  | "smoke-assertion-preview"
  | "structured-pseudo-diff";

export type UnifiedDiffHunkPreview = {
  id: string;
  title: string;
  oldStartLine: number | null;
  newStartLine: number | null;
  beforeHint: string;
  afterHint: string;
  lines: string[];
  previewOnly: true;
  structuredPseudoDiff: boolean;
};

export type UnifiedDiffPreview = {
  id: string;
  filePath: string;
  mode: UnifiedDiffPreviewMode;
  previewOnlyLabel: string;
  oldFileHeader: string;
  newFileHeader: string;
  hunks: UnifiedDiffHunkPreview[];
  diffText: string;
  additions: number;
  removals: number;
  exactReplacementFound: boolean;
  truncated: boolean;
  notAppliedGuarantee: string;
  summary: string;
};

export type RealPatchPreviewRiskFactor = {
  id: string;
  label: string;
  points: number;
  level: RealPatchPreviewRiskLevel;
  detail: string;
};

export type RealPatchPreviewRiskReport = {
  id: string;
  filePath: string;
  score: number;
  level: RealPatchPreviewRiskLevel;
  factors: RealPatchPreviewRiskFactor[];
  blockedReasons: string[];
  summary: string;
  safeHandling: string;
};

export type RealPatchPreviewTestPlan = {
  id: string;
  filePath: string;
  commands: string[];
  smokeTests: string[];
  targetedChecks: string[];
  copyOnlyNotice: string;
  summary: string;
};

export type RealPatchPreviewRollbackOption = {
  id: string;
  label: string;
  command: string | null;
  detail: string;
  previewOnly: boolean;
};

export type RealPatchPreviewRollbackPlan = {
  id: string;
  filePath: string;
  options: RealPatchPreviewRollbackOption[];
  notes: string[];
  summary: string;
};

export type RealPatchPreviewHandoff = {
  id: string;
  selectedFilePath: string;
  reviewPrompt: string;
  applyGatePromptPreview: string;
  summary: string;
  copyOnly: true;
  previewOnly: true;
};

export type RealPatchPreviewSummary = {
  id: string;
  requestReady: boolean;
  contextReady: boolean;
  planReady: boolean;
  diffPreviewReady: boolean;
  riskLevel: RealPatchPreviewRiskLevel;
  testCount: number;
  rollbackReady: boolean;
  nextSafeAction: string;
  summary: string;
};

export function buildRealPatchPreviewStableKey(
  ...parts: Array<string | number | boolean | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/\\/g, "/")
        .replace(/[^a-z0-9._/-]+/g, "-")
        .replace(/\/+/g, "/")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function buildRealPatchPreviewStableHash(value: string): string {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function buildRealPatchPreviewStableId(prefix: string, ...parts: string[]): string {
  const normalizedPrefix = buildRealPatchPreviewStableKey(prefix) || "real-patch-preview";
  const key = buildRealPatchPreviewStableKey(...parts);
  return `${normalizedPrefix}-${buildRealPatchPreviewStableHash(key || normalizedPrefix)}`;
}

export function uniqueRealPatchPreviewStrings(
  values: readonly (string | null | undefined)[]
): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function clampRealPatchPreviewScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(120, Math.round(score)));
}

export function projectRiskToRealPatchRisk(level: ProjectFileRiskLevel): RealPatchPreviewRiskLevel {
  if (level === "blocked") return "blocked";
  if (level === "critical") return "critical";
  if (level === "high") return "high";
  if (level === "medium") return "medium";
  return "low";
}
