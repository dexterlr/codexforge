import type { CodexForgeFileWorkflow } from "./file-workflow";

export type CodexForgeFilesCommandId =
  | "search-files"
  | "focus-selected-file"
  | "show-risk"
  | "show-related-context"
  | "prepare-safe-plan"
  | "copy-file-path"
  | "open-brain-view-hint"
  | "open-chat-prompt-hint";

export type CodexForgeFilesCommandPaletteItem = {
  id: CodexForgeFilesCommandId;
  label: string;
  detail: string;
  shortcutHint?: string;
  readOnly: true;
};

export function buildFilesCommandPalette(
  workflow?: CodexForgeFileWorkflow
): CodexForgeFilesCommandPaletteItem[] {
  const filePath = workflow?.selectedFile.path ?? "selected file";

  return [
    {
      id: "search-files",
      label: "Search files",
      detail: "Focus the existing files search input.",
      shortcutHint: "Ctrl/Cmd+K",
      readOnly: true,
    },
    {
      id: "focus-selected-file",
      label: "Focus selected file",
      detail: `Keep cockpit panels centered on ${filePath}.`,
      readOnly: true,
    },
    {
      id: "show-risk",
      label: "Show risk",
      detail: workflow
        ? `${workflow.riskLevel} risk at ${workflow.riskScore}/100.`
        : "Show deterministic risk scoring.",
      readOnly: true,
    },
    {
      id: "show-related-context",
      label: "Show related context",
      detail: "Review runtime signals, memory hints, topology hints, and related brain nodes.",
      readOnly: true,
    },
    {
      id: "prepare-safe-plan",
      label: "Prepare safe plan",
      detail: "Open the preview-only safe plan. No mutation is available.",
      readOnly: true,
    },
    {
      id: "copy-file-path",
      label: "Copy file path",
      detail: filePath,
      readOnly: true,
    },
    {
      id: "open-brain-view-hint",
      label: "Open brain view hint",
      detail: `Use /brain as the cognitive view for ${filePath}.`,
      readOnly: true,
    },
    {
      id: "open-chat-prompt-hint",
      label: "Open chat prompt hint",
      detail: `Ask chat to inspect ${filePath} with preview-only planning.`,
      readOnly: true,
    },
  ];
}

export function summarizeFilesCommandPalette(
  commands: CodexForgeFilesCommandPaletteItem[]
): string {
  return `${commands.length} read-only file commands available.`;
}
