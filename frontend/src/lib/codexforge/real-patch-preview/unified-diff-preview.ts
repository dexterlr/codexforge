import {
  buildRealPatchPreviewStableId,
  type PatchChangeRequest,
  type PatchPreviewContext,
  type UnifiedDiffHunkPreview,
  type UnifiedDiffPreview,
  type UnifiedDiffPreviewMode,
} from "./real-patch-preview-types";

type ExactReplacement = {
  before: string;
  after: string;
};

function normalizeContent(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function findMarker(text: string, marker: string): number {
  return text.toLowerCase().indexOf(marker.toLowerCase());
}

function extractExactReplacement(requestText: string): ExactReplacement | null {
  const markers = [
    { before: "before:", after: "after:" },
    { before: "exact before:", after: "exact after:" },
    { before: "[before]", after: "[after]" },
  ];

  for (const marker of markers) {
    const beforeIndex = findMarker(requestText, marker.before);
    const afterIndex = findMarker(requestText, marker.after);
    if (beforeIndex < 0 || afterIndex < 0 || afterIndex <= beforeIndex) continue;
    const beforeStart = beforeIndex + marker.before.length;
    const before = requestText.slice(beforeStart, afterIndex).trim();
    const after = requestText.slice(afterIndex + marker.after.length).trim();
    if (before && after) return { before: normalizeContent(before), after: normalizeContent(after) };
  }

  return null;
}

function lineNumberForSnippet(content: string, snippet: string): number | null {
  const index = content.indexOf(snippet);
  if (index < 0) return null;
  return content.slice(0, index).split("\n").length;
}

function diffLinesForReplacement(before: string, after: string): string[] {
  const removed = before.split("\n").map((line) => `-${line}`);
  const added = after.split("\n").map((line) => `+${line}`);
  return [...removed, ...added];
}

function countLinesWithPrefix(lines: readonly string[], prefix: "+" | "-"): number {
  return lines.filter((line) => line.startsWith(prefix)).length;
}

function buildDiffText(filePath: string, hunks: readonly UnifiedDiffHunkPreview[]): string {
  const lines = [
    "# Real Patch Preview v1 - preview-only unified diff",
    "# This artifact is not applied, not written, and not approved for execution.",
    `--- a/${filePath}`,
    `+++ b/${filePath}`,
  ];

  for (const hunk of hunks) {
    if (hunk.oldStartLine !== null && hunk.newStartLine !== null) {
      const oldCount = Math.max(1, countLinesWithPrefix(hunk.lines, "-"));
      const newCount = Math.max(1, countLinesWithPrefix(hunk.lines, "+"));
      lines.push(`@@ -${hunk.oldStartLine},${oldCount} +${hunk.newStartLine},${newCount} @@`);
    } else {
      lines.push("@@ preview-only pseudo hunk @@");
    }
    lines.push(...hunk.lines);
  }

  return lines.join("\n");
}

export function buildUnifiedDiffHunkPreview(input: {
  filePath: string;
  title: string;
  beforeHint: string;
  afterHint: string;
  lines: readonly string[];
  oldStartLine?: number | null;
  newStartLine?: number | null;
  structuredPseudoDiff?: boolean;
}): UnifiedDiffHunkPreview {
  return {
    id: buildRealPatchPreviewStableId("real-patch-hunk", input.filePath, input.title, input.lines.join("\n")),
    title: input.title,
    oldStartLine: input.oldStartLine ?? null,
    newStartLine: input.newStartLine ?? null,
    beforeHint: input.beforeHint,
    afterHint: input.afterHint,
    lines: [...input.lines],
    previewOnly: true,
    structuredPseudoDiff: input.structuredPseudoDiff ?? true,
  };
}

function inferPreviewMode(request: PatchChangeRequest, context: PatchPreviewContext): UnifiedDiffPreviewMode {
  const text = request.requestedChangeText.toLowerCase();
  const exact = extractExactReplacement(request.requestedChangeText);
  if (exact && normalizeContent(context.contentExcerpt).includes(exact.before)) return "exact-replacement-preview";
  if (context.markers.docs && (text.includes("append") || text.includes("add section") || text.includes("document"))) {
    return "append-section-placeholder";
  }
  if (context.markers.component && /(copy|style|label|text|class|layout|css)/i.test(text)) {
    return "component-copy-style-preview";
  }
  if (context.markers.smoke && /(assert|smoke|validation|check)/i.test(text)) {
    return "smoke-assertion-preview";
  }
  return "structured-pseudo-diff";
}

function buildModeHunk(mode: UnifiedDiffPreviewMode, request: PatchChangeRequest, context: PatchPreviewContext): UnifiedDiffHunkPreview {
  const filePath = context.filePath;
  if (mode === "append-section-placeholder") {
    const line = Math.max(1, context.lineCount + 1);
    return buildUnifiedDiffHunkPreview({
      filePath,
      title: "Append documentation/configuration section placeholder",
      oldStartLine: line,
      newStartLine: line,
      beforeHint: "Before: end of supplied file excerpt.",
      afterHint: "After: append a reviewed section only if the operator approves the real patch.",
      lines: [
        " ",
        "+<!-- Real Patch Preview v1 placeholder: add the requested section here after review. -->",
        `+<!-- Requested change: ${request.requestedChangeText.slice(0, 160)} -->`,
      ],
      structuredPseudoDiff: false,
    });
  }
  if (mode === "component-copy-style-preview") {
    return buildUnifiedDiffHunkPreview({
      filePath,
      title: "Component copy/style preview",
      beforeHint: "Before: inspect the current component JSX, props, labels, class names, and overflow behavior.",
      afterHint: "After: adjust only the reviewed copy/style target; keep layout stable and preserve existing props.",
      lines: [
        " context: selected component render block",
        "- current copy/style remains as inspected",
        `+ preview-only change intent: ${request.requestedChangeText.slice(0, 180)}`,
        "+ verify responsive text wrapping and stable dimensions before approval",
      ],
    });
  }
  if (mode === "smoke-assertion-preview") {
    return buildUnifiedDiffHunkPreview({
      filePath,
      title: "Smoke assertion addition preview",
      beforeHint: "Before: locate the related assertion block in the smoke script.",
      afterHint: "After: add one targeted assertion only after reviewing the source marker.",
      lines: [
        " context: targeted smoke assertion block",
        "+# Real Patch Preview v1 placeholder: add a targeted Assert-Contains check for the reviewed marker.",
        `+# Requested validation intent: ${request.requestedChangeText.slice(0, 180)}`,
      ],
    });
  }
  return buildUnifiedDiffHunkPreview({
    filePath,
    title: "Structured pseudo-diff preview",
    beforeHint: "Before: current supplied file content is authority.",
    afterHint: "After: this pseudo-diff states the intended shape without inventing source lines.",
    lines: [
      " context: selected file context",
      `- current behavior: ${context.filePurpose.summary.slice(0, 180)}`,
      `+ proposed behavior: ${request.requestedChangeText.slice(0, 220)}`,
      "+ approval note: inspect exact current lines before any future real patch.",
    ],
  });
}

export function buildUnifiedDiffPreview(input: {
  request: PatchChangeRequest;
  context: PatchPreviewContext;
}): UnifiedDiffPreview {
  const { request, context } = input;
  const content = normalizeContent(context.contentExcerpt);
  const exact = extractExactReplacement(request.requestedChangeText);
  const mode = inferPreviewMode(request, context);
  let hunks: UnifiedDiffHunkPreview[];
  let exactReplacementFound = false;

  if (mode === "exact-replacement-preview" && exact) {
    const oldStartLine = lineNumberForSnippet(content, exact.before);
    exactReplacementFound = oldStartLine !== null;
    hunks = [
      buildUnifiedDiffHunkPreview({
        filePath: context.filePath,
        title: "Exact replacement preview",
        oldStartLine,
        newStartLine: oldStartLine,
        beforeHint: "Before: exact requested text was found in the supplied file excerpt.",
        afterHint: "After: exact requested replacement preview only; not applied.",
        lines: diffLinesForReplacement(exact.before, exact.after),
        structuredPseudoDiff: false,
      }),
    ];
  } else {
    hunks = [buildModeHunk(mode, request, context)];
  }

  const diffText = buildDiffText(context.filePath, hunks);
  const additions = hunks.reduce((total, hunk) => total + countLinesWithPrefix(hunk.lines, "+"), 0);
  const removals = hunks.reduce((total, hunk) => total + countLinesWithPrefix(hunk.lines, "-"), 0);
  const preview: UnifiedDiffPreview = {
    id: buildRealPatchPreviewStableId("real-patch-diff", request.id, context.id, diffText),
    filePath: context.filePath,
    mode,
    previewOnlyLabel: "PREVIEW ONLY - not applied, no file writes, no command execution.",
    oldFileHeader: `--- a/${context.filePath}`,
    newFileHeader: `+++ b/${context.filePath}`,
    hunks,
    diffText,
    additions,
    removals,
    exactReplacementFound,
    truncated: context.truncated,
    notAppliedGuarantee: "Unified diff preview is an artifact only; it never applies a patch or writes files.",
    summary: "",
  };

  return {
    ...preview,
    summary: summarizeUnifiedDiffPreview(preview),
  };
}

export function summarizeUnifiedDiffPreview(preview: UnifiedDiffPreview): string {
  return `${preview.previewOnlyLabel} ${preview.filePath}: ${preview.mode}, ${preview.hunks.length} hunk preview(s), +${preview.additions}/-${preview.removals}.`;
}
