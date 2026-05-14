import { CODEXFORGE_ARTIFACT_WORKSPACE_ROOT } from "@/lib/codexforge/artifact-workspace";
import type {
  ExportApiResult,
  ExportResultLedger,
  ExportResultLedgerItem,
} from "./export-flow-types";

export function buildExportResultLedger(args: {
  sourcePackId: string;
  items?: ExportResultLedgerItem[];
}): ExportResultLedger {
  const ledger: ExportResultLedger = {
    id: `artifact-export-ledger-${args.sourcePackId}`,
    sourcePackId: args.sourcePackId,
    workspaceRoot: CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
    items: args.items ?? [],
    summary: [],
  };

  return { ...ledger, summary: summarizeExportResultLedger(ledger) };
}

export function buildExportResultLedgerItem(args: {
  result: ExportApiResult;
  sourcePackId: string;
  sourceSurface: string;
}): ExportResultLedgerItem {
  return {
    id: `export-result-${args.sourcePackId}-${args.result.artifactId}`,
    artifactId: args.result.artifactId,
    targetPath: args.result.targetRelativePath,
    status: args.result.ok ? "exported" : "failed",
    exportedPath: args.result.exportedPath,
    error: args.result.error,
    sourcePackId: args.sourcePackId,
    sourceSurface: args.sourceSurface,
    safetyNote: args.result.safetyNote,
  };
}

export function summarizeExportResultLedger(ledger: ExportResultLedger): string[] {
  const exported = ledger.items.filter((item) => item.status === "exported").length;
  const failed = ledger.items.filter((item) => item.status === "failed" || item.status === "blocked").length;
  return [
    `${ledger.items.length} export result(s) recorded for ${ledger.sourcePackId}.`,
    `${exported} exported; ${failed} blocked or failed.`,
    `Ledger is scoped to ${ledger.workspaceRoot}.`,
  ];
}
