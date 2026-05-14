import {
  CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
  type ArtifactExportLedger,
  type ArtifactExportLedgerItem,
  type ArtifactExportRequest,
  type ArtifactExportValidationReport,
} from "./artifact-workspace-types";
import { buildSafeArtifactPath } from "./artifact-path-guard";

export function buildArtifactExportLedgerItem(args: {
  request: ArtifactExportRequest;
  validation: ArtifactExportValidationReport;
  exported?: boolean;
}): ArtifactExportLedgerItem {
  const safePath = buildSafeArtifactPath(args.request.targetRelativePath);

  return {
    artifactId: args.request.artifactId,
    targetPath: safePath ?? args.request.targetRelativePath,
    status: args.exported
      ? "exported"
      : args.request.approved
        ? "blocked"
        : "pending-approval",
    approvalNote: args.request.approvalNote,
    validationState: args.validation.state,
    sourceSurface: String(args.request.sourceSurface),
    sourceRunId: args.request.sourceRunId,
    createdLabel: "created by guarded artifact export approval",
    safetyNote:
      "artifact export only; source mutation blocked; commands and external apps are not executed",
  };
}

export function buildArtifactExportLedger(
  items: ArtifactExportLedgerItem[] = []
): ArtifactExportLedger {
  const ledger: ArtifactExportLedger = {
    id: "artifact-export-ledger-phase-11",
    workspaceRoot: CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
    items,
    summary: [],
  };

  return {
    ...ledger,
    summary: summarizeArtifactExportLedger(ledger),
  };
}

export function summarizeArtifactExportLedger(ledger: ArtifactExportLedger): string[] {
  return [
    `${ledger.items.length} export ledger item(s) scoped to ${ledger.workspaceRoot}.`,
    `${ledger.items.filter((item) => item.status === "exported").length} exported artifact file(s).`,
    "Ledger records replay metadata only and never mutates source files.",
  ];
}
