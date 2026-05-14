import { buildArtifactExportLedger, buildArtifactExportLedgerItem } from "./artifact-export-ledger";
import { buildArtifactExportPolicy } from "./artifact-export-policy";
import { buildArtifactExportRequest } from "./artifact-export-request";
import { summarizeArtifactWorkspaceContext } from "./artifact-export-summary";
import { validateArtifactExportContent } from "./artifact-export-validation";
import {
  CODEXFORGE_ARTIFACT_ALLOWED_EXTENSIONS,
  CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
  type ArtifactWorkspaceContext,
} from "./artifact-workspace-types";

export function buildArtifactWorkspaceContext(): ArtifactWorkspaceContext {
  const policy = buildArtifactExportPolicy();
  const sampleRequest = buildArtifactExportRequest({
    artifactId: "phase-11-export-review",
    type: "run-summary-markdown",
    title: "Review export request",
    content:
      "preview-only artifact export request\n\nThis file can be exported only after explicit approval into the safe workspace.\n",
    targetRelativePath: "phase-11/review-export-request.preview.txt",
    approved: false,
    overwrite: false,
    sourceSurface: "Operator Run Center",
    sourceRunId: "preview-run-phase-11",
    approvalNote: "Operator must review and approve before export.",
  });
  const validation = validateArtifactExportContent(sampleRequest);
  const ledger = buildArtifactExportLedger([
    buildArtifactExportLedgerItem({ request: sampleRequest, validation }),
  ]);

  const context: ArtifactWorkspaceContext = {
    id: "artifact-workspace-phase-11",
    workspaceRoot: CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
    allowedExtensions: CODEXFORGE_ARTIFACT_ALLOWED_EXTENSIONS,
    policy,
    sampleRequest,
    validation,
    ledger,
    summary: [],
  };

  return {
    ...context,
    summary: summarizeArtifactWorkspaceContext(context),
  };
}
