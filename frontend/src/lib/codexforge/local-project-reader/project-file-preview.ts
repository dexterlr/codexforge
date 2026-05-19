import type { ProjectFilePreview } from "./local-project-reader-types";
import {
  detectProjectFileMarkers,
  getProjectFileName,
  normalizeProjectReaderPath,
} from "./project-file-metadata";

export const PROJECT_FILE_PREVIEW_MAX_CHARS = 6000;

export function truncateProjectFilePreview(
  content: string,
  maxChars = PROJECT_FILE_PREVIEW_MAX_CHARS
): { contentExcerpt: string; truncated: boolean } {
  const safeMax = Math.max(200, Math.min(Math.floor(maxChars), PROJECT_FILE_PREVIEW_MAX_CHARS));
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  if (normalized.length <= safeMax) {
    return { contentExcerpt: normalized, truncated: false };
  }

  return {
    contentExcerpt: `${normalized.slice(0, safeMax - 3)}...`,
    truncated: true,
  };
}

function markerLabels(path: string): string[] {
  const markers = detectProjectFileMarkers(path);
  const labels: string[] = [];
  if (markers.route) labels.push("route");
  if (markers.api) labels.push("api");
  if (markers.component) labels.push("component");
  if (markers.tool) labels.push("tool");
  if (markers.smoke) labels.push("smoke");
  if (markers.test) labels.push("test");
  if (markers.doc) labels.push("docs");
  if (markers.config) labels.push("config");
  if (markers.style) labels.push("style");
  if (markers.asset) labels.push("asset");
  return labels;
}

export function buildProjectFilePreview(input: {
  path: string;
  content?: string;
  lineCount?: number;
  maxPreviewChars?: number;
  binaryBlocked?: boolean;
  sizeBlocked?: boolean;
}): ProjectFilePreview {
  const path = normalizeProjectReaderPath(input.path);
  const binaryBlocked = input.binaryBlocked === true;
  const sizeBlocked = input.sizeBlocked === true;
  const maxPreviewChars = input.maxPreviewChars ?? PROJECT_FILE_PREVIEW_MAX_CHARS;
  const rawContent = binaryBlocked || sizeBlocked ? "" : input.content ?? "";
  const truncated = truncateProjectFilePreview(rawContent, maxPreviewChars);
  const lineCount =
    typeof input.lineCount === "number"
      ? input.lineCount
      : truncated.contentExcerpt.length > 0
        ? truncated.contentExcerpt.split("\n").length
        : 0;

  return {
    path,
    contentExcerpt: truncated.contentExcerpt,
    lineCount,
    truncated: truncated.truncated,
    binaryBlocked,
    sizeBlocked,
    safetyNote: binaryBlocked
      ? "Binary preview blocked; read-only metadata only."
      : sizeBlocked
        ? "Preview blocked by file size cap; read-only metadata only."
        : "Read-only excerpt; no file writes and no command execution.",
    detectedMarkers: markerLabels(path),
    suggestedNextAction:
      binaryBlocked || sizeBlocked
        ? `Inspect ${getProjectFileName(path)} metadata before any handoff.`
        : "Inspect the excerpt, then use Safe Patch Preview for any edit plan.",
    maxPreviewChars,
  };
}

export function summarizeProjectFilePreview(preview: ProjectFilePreview): string {
  if (preview.binaryBlocked) return `${preview.path} preview is blocked because the file appears binary.`;
  if (preview.sizeBlocked) return `${preview.path} preview is blocked by the size cap.`;
  return `${preview.path} preview has ${preview.lineCount} lines${preview.truncated ? " and is truncated" : ""}.`;
}

