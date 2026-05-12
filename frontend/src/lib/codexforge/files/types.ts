export type CodexForgeFileKind =
  | "route"
  | "component"
  | "runtime"
  | "memory"
  | "tool"
  | "smoke"
  | "library"
  | "style"
  | "config"
  | "docs";

export type CodexForgeFileRiskLevel =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type CodexForgeFileRiskSignal = {
  id: string;
  label: string;
  level: CodexForgeFileRiskLevel;
  score: number;
  reason: string;
};

export type CodexForgeFileAction =
  | "summarize"
  | "explain"
  | "refactor"
  | "generate tests"
  | "trace dependencies"
  | "prepare patch"
  | "analyze risk"
  | "locate callers"
  | "explain architecture role";

export type CodexForgeFileTimelineItem = {
  id: string;
  timestamp: string;
  label: string;
  detail: string;
  kind: "created" | "changed" | "validated" | "reviewed" | "planned";
};

export type CodexForgeFileDependency = {
  id: string;
  fromPath: string;
  toPath: string;
  kind: "imports" | "renders" | "validates" | "calls" | "documents";
  strength: "weak" | "medium" | "strong";
  summary: string;
};

export type CodexForgeFileExecutionHistoryItem = {
  id: string;
  timestamp: string;
  command: string;
  status: "passed" | "failed" | "skipped";
  summary: string;
};

export type CodexForgeFileInsight = {
  id: string;
  label: string;
  value: string;
  detail: string;
};

export type CodexForgeSafeEditPreview = {
  id: string;
  filePath: string;
  title: string;
  previewOnly: true;
  summary: string;
  proposedSteps: string[];
  riskHints: string[];
  rollbackHints: string[];
  testHints: string[];
};

export type CodexForgeFileNode = {
  id: string;
  path: string;
  name: string;
  kind: CodexForgeFileKind;
  area: string;
  ownerArea: string;
  architectureRole: string;
  summary: string;
  extension: string;
  tags: string[];
  concepts: string[];
  relatedMemory: string[];
  lastTouchedAt: string;
  lineCount: number;
  dependencyIds: string[];
  timeline: CodexForgeFileTimelineItem[];
  executionHistory: CodexForgeFileExecutionHistoryItem[];
  insights: CodexForgeFileInsight[];
  safeEditPreview: CodexForgeSafeEditPreview;
};

export type CodexForgeFileCommandCenterState = {
  query: string;
  selectedPath: string;
  kind: CodexForgeFileKind | "all";
  risk: CodexForgeFileRiskLevel | "all";
  tag: string | "all";
  dependency: string | "all";
  recent: boolean;
};

export type CodexForgeFileSearchFilters = Partial<
  Pick<
    CodexForgeFileCommandCenterState,
    "query" | "kind" | "risk" | "tag" | "dependency" | "recent"
  >
>;

export type CodexForgeFileRiskSummary = {
  level: CodexForgeFileRiskLevel;
  score: number;
  signals: CodexForgeFileRiskSignal[];
  summary: string;
};

export type CodexForgeFilePreview = {
  path: string;
  language: string;
  preview: string;
  lineCount: number;
  byteLength: number;
  truncated: boolean;
  maxPreviewLength: number;
};

export type CodexForgeFileDependencyTrace = {
  filePath: string;
  imports: string[];
  exports: string[];
  internalTargets: string[];
  dependencies: CodexForgeFileDependency[];
  summary: string;
};

export type CodexForgeFileRuntimeContextSignal = {
  id: string;
  filePath: string;
  label: string;
  source: "runtime" | "memory" | "tool" | "smoke" | "fixture" | "predictive-context";
  strength: "weak" | "medium" | "strong";
  detail: string;
  score?: number;
  confidence?: number;
  reasons?: string[];
};

export type CodexForgeFilesApiResponse = {
  files: CodexForgeFileNode[];
  selectedFile: CodexForgeFileNode | null;
  summary: {
    source: "live";
    root: string;
    totalFiles: number;
    returnedFiles: number;
    scannedFiles: number;
    truncated: boolean;
    maxFileCount: number;
    maxPreviewLength: number;
  };
  risks: Record<string, CodexForgeFileRiskSummary>;
  dependencies: CodexForgeFileDependency[];
  relatedFiles: CodexForgeFileNode[];
  timeline: CodexForgeFileTimelineItem[];
  executionHistory: CodexForgeFileExecutionHistoryItem[];
  runtimeContextSignals: CodexForgeFileRuntimeContextSignal[];
  previews: Record<string, CodexForgeFilePreview>;
  dependencyTrace: CodexForgeFileDependencyTrace;
  predictiveContext?: {
    sourceLabel?: string;
    predictedIntent: string;
    contextConfidence: number;
    architectureRole?: string;
    relatedFiles?: string[];
    relatedMemories?: string[];
    relatedTasks?: string[];
    taskFocus?: string;
    contextReasons?: string[];
    signals: Array<{
      id: string;
      kind: string;
      label: string;
      score: number;
      confidence: number;
      reasons: string[];
    }>;
    risks: Array<{
      id: string;
      label: string;
      severity: CodexForgeFileRiskLevel;
      score: number;
      confidence: number;
      reasons: string[];
      nextSafeAction: string;
    }>;
    riskHints?: string[];
    nextSafeActions: string[];
  };
  generatedAt: string;
};
