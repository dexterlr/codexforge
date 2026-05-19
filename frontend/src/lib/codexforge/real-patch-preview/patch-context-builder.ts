import {
  buildProjectFileMetadata,
  buildProjectFileRiskReport,
  inferProjectFilePurpose,
  normalizeProjectReaderPath,
  type ProjectFileMetadata,
  type ProjectFilePurpose,
  type ProjectFileRiskReport,
} from "../local-project-reader";
import {
  buildRealPatchPreviewStableId,
  type PatchPreviewContext,
  type PatchPreviewContextMarkers,
  type PatchPreviewContextSource,
} from "./real-patch-preview-types";

const DEFAULT_MAX_PREVIEW_LINES = 160;
const HARD_MAX_PREVIEW_LINES = 240;

function normalizeContent(content: string | null | undefined): string {
  return String(content ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function clampPreviewLines(value: number | null | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return DEFAULT_MAX_PREVIEW_LINES;
  return Math.max(20, Math.min(HARD_MAX_PREVIEW_LINES, Math.floor(value)));
}

function collectMarkers(path: string, metadata: ProjectFileMetadata): PatchPreviewContextMarkers {
  const lower = path.toLowerCase();
  return {
    route: metadata.markers.route,
    component: metadata.markers.component,
    api: metadata.markers.api,
    tool: metadata.markers.tool,
    smoke: metadata.markers.smoke,
    test: metadata.markers.test,
    docs: metadata.markers.doc,
    style: metadata.markers.style,
    config: metadata.markers.config,
    patchApply:
      lower.includes("patch") ||
      lower.includes("apply-diff") ||
      lower.includes("apply") ||
      lower.includes("diff"),
    brainRuntime: lower.includes("brain") || lower.includes("runtime") || lower.includes("graph"),
    navigationShell: lower.includes("navigation") || lower.includes("command-palette") || lower.includes("shell"),
  };
}

function collectImportExportMarkers(content: string, prefix: "import" | "export"): string[] {
  return content
    .split("\n")
    .map((line, index) => ({ line: line.trim(), index: index + 1 }))
    .filter((entry) => entry.line.startsWith(prefix))
    .slice(0, 12)
    .map((entry) => `L${entry.index}: ${entry.line.slice(0, 140)}`);
}

function buildWorkflowHints(path: string, markers: PatchPreviewContextMarkers, risk: ProjectFileRiskReport): string[] {
  const hints: string[] = [];
  if (markers.route) hints.push("Route/page change: include managed route smoke or full managed smoke suite.");
  if (markers.component) hints.push("Component change: inspect props, copy, layout, overflow, and stable keys.");
  if (markers.api) hints.push("API route change: inspect request method, guards, and response shape.");
  if (markers.tool) hints.push("Tool boundary change: inspect approval, policy, and server/client separation.");
  if (markers.smoke) hints.push("Smoke script change: run the targeted smoke script after approval.");
  if (markers.patchApply) hints.push("Patch/apply workflow change: use Patch Application Gate before any apply path.");
  if (markers.brainRuntime) hints.push("Brain/runtime change: verify no graph mutation, appendEvent, saveBrainGraph, or auto-persistence.");
  if (markers.navigationShell) hints.push("Navigation or command change: preserve latest-message authority and copy-only commands.");
  if (risk.level === "high" || risk.level === "critical" || risk.level === "blocked") {
    hints.push(`Local Project Reader risk is ${risk.level}; require extra review before approval handoff.`);
  }
  if (hints.length === 0) hints.push(`Inspect ${path} first and keep preview-only boundaries.`);
  return hints;
}

export function buildPatchPreviewContext(input: PatchPreviewContextSource): PatchPreviewContext {
  const filePath = normalizeProjectReaderPath(input.filePath);
  const fileContent = normalizeContent(input.fileContent);
  const maxPreviewLines = clampPreviewLines(input.maxPreviewLines);
  const lines = fileContent.length > 0 ? fileContent.split("\n") : [];
  const contentExcerpt = lines.slice(0, maxPreviewLines).join("\n");
  const truncated = lines.length > maxPreviewLines;
  const metadata = input.metadata ?? buildProjectFileMetadata({
    path: filePath,
    type: "file",
    lineCount: lines.length,
  });
  const purpose = input.purpose ?? inferProjectFilePurpose(metadata);
  const risk = input.risk ?? buildProjectFileRiskReport({ path: filePath });
  const markers = collectMarkers(filePath, metadata);

  return {
    id: buildRealPatchPreviewStableId("real-patch-context", filePath, contentExcerpt),
    filePath,
    fileMetadata: metadata,
    filePurpose: purpose,
    fileRisk: risk,
    contentExcerpt,
    lineCount: lines.length || metadata.lineCount || 0,
    importMarkers: collectImportExportMarkers(fileContent, "import"),
    exportMarkers: collectImportExportMarkers(fileContent, "export"),
    markers,
    relatedWorkflowHints: buildWorkflowHints(filePath, markers, risk),
    maxPreviewLines,
    truncated,
    sourceContentSupplied: true,
    noFilesystemReadGuarantee:
      "Patch preview context uses supplied file data only; it does not read the filesystem.",
  };
}

export function buildPatchPreviewContextFromFile(input: PatchPreviewContextSource): PatchPreviewContext {
  return buildPatchPreviewContext(input);
}

export function summarizePatchPreviewContext(context: PatchPreviewContext): string {
  const markerLabels = Object.entries(context.markers)
    .filter(([, enabled]) => enabled)
    .map(([label]) => label);
  return `${context.filePath} context ready from supplied file data: ${context.lineCount} lines, ${context.truncated ? "truncated" : "within cap"}, markers ${markerLabels.join(", ") || "none"}.`;
}
