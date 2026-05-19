export type ProjectTreeNodeType = "file" | "directory";

export type ProjectFileCategory =
  | "route"
  | "component"
  | "domain"
  | "tool"
  | "api"
  | "smoke"
  | "test"
  | "config"
  | "docs"
  | "style"
  | "asset"
  | "unknown";

export type ProjectFileRiskLevel = "low" | "medium" | "high" | "critical" | "blocked";

export type ProjectPreviewEligibility = "eligible" | "size-blocked" | "binary-blocked";

export type ProjectReaderEntry = {
  path: string;
  name?: string;
  type: ProjectTreeNodeType;
  extension?: string;
  depth?: number;
  parentPath?: string;
  childCount?: number;
  sizeBytes?: number;
  sizeLabel?: string;
  lineCount?: number;
  importCount?: number;
  exportCount?: number;
  binary?: boolean;
  generated?: boolean;
};

export type ProjectTreeNode = {
  id: string;
  path: string;
  name: string;
  type: ProjectTreeNodeType;
  extension: string;
  depth: number;
  parentPath: string;
  childCount: number;
  sizeLabel: string;
  routeCategoryHint: ProjectFileCategory;
  riskHint: ProjectFileRiskLevel;
  selectable: boolean;
  children: ProjectTreeNode[];
};

export type ProjectTreeModel = {
  id: "local-project-tree";
  root: ProjectTreeNode;
  nodes: ProjectTreeNode[];
  flattened: ProjectTreeNode[];
  summary: ProjectTreeSummary;
};

export type ProjectTreeSummary = {
  fileCount: number;
  directoryCount: number;
  selectableCount: number;
  highRiskCount: number;
  blockedCount: number;
  maxDepth: number;
  text: string;
};

export type ProjectFileMarkers = {
  route: boolean;
  component: boolean;
  tool: boolean;
  smoke: boolean;
  test: boolean;
  doc: boolean;
  api: boolean;
  style: boolean;
  config: boolean;
  asset: boolean;
};

export type ProjectFileMetadata = {
  path: string;
  name: string;
  extension: string;
  category: ProjectFileCategory;
  probableRole: string;
  language: string;
  sizeLabel: string;
  lineCount: number | null;
  importCount: number | null;
  exportCount: number | null;
  markers: ProjectFileMarkers;
  readOnlyPosture: string;
  safePreviewEligibility: ProjectPreviewEligibility;
};

export type ProjectFilePreview = {
  path: string;
  contentExcerpt: string;
  lineCount: number;
  truncated: boolean;
  binaryBlocked: boolean;
  sizeBlocked: boolean;
  safetyNote: string;
  detectedMarkers: string[];
  suggestedNextAction: string;
  maxPreviewChars: number;
};

export type ProjectFilePurpose = {
  path: string;
  kind: string;
  summary: string;
  evidence: string[];
  suggestedInspection: string;
};

export type ProjectFileRiskFactor = {
  id: string;
  label: string;
  points: number;
  level: ProjectFileRiskLevel;
};

export type ProjectFileRiskReport = {
  path: string;
  score: number;
  level: ProjectFileRiskLevel;
  factors: ProjectFileRiskFactor[];
  summary: string;
  safeHandling: string;
};

export type ProjectSearchQuery = {
  raw: string;
  tokens: string[];
  pathTokens: string[];
  nameTokens: string[];
  extensionTokens: string[];
  categoryTokens: string[];
  purposeTokens: string[];
  riskTokens: string[];
  keywordTokens: string[];
};

export type ProjectSearchableFile = {
  path: string;
  name?: string;
  extension?: string;
  category?: ProjectFileCategory;
  purpose?: string;
  risk?: ProjectFileRiskLevel;
  keywords?: string[];
  summary?: string;
};

export type ProjectFileSearchResult = {
  file: ProjectSearchableFile;
  score: number;
  matchedFields: string[];
};

export type ProjectFileSearchSummary = {
  query: string;
  resultCount: number;
  topPath: string;
  text: string;
};

export type ProjectReaderHandoffAction =
  | "inspect this file"
  | "prepare safe patch preview"
  | "explain file purpose"
  | "find related files"
  | "copy read-only context";

export type ProjectReaderHandoff = {
  id: string;
  path: string;
  action: ProjectReaderHandoffAction;
  patchPreviewPrompt: string;
  chatContext: string;
  copyContext: string;
  summary: string;
};

export type LocalProjectReaderSummary = {
  fileCount: number;
  directoryCount: number;
  selectedFile: string;
  searchResultCount: number;
  highRiskFileCount: number;
  blockedFileCount: number;
  previewReadiness: "ready" | "unavailable" | "blocked";
  nextSafeAction: string;
  summary: string;
};

export type ProjectReaderSnapshot = {
  ok: true;
  root: string;
  entries: ProjectReaderEntry[];
  fileCount: number;
  directoryCount: number;
  capped: boolean;
  maxResults: number;
  safety: string;
};

export type ProjectReaderReadResponse = {
  ok: true;
  path: string;
  sizeBytes: number;
  sizeLabel: string;
  lineCount: number;
  content: string;
  truncated: boolean;
  binaryBlocked: boolean;
  sizeBlocked: boolean;
  safety: string;
};

export type ProjectReaderApiError = {
  ok: false;
  error: string;
};

export function buildLocalProjectReaderStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._/-]+/g, "-")
        .replace(/\/+/g, "/")
    )
    .filter(Boolean)
    .join(":");
}

