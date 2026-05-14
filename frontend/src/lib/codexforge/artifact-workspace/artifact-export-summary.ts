import type { ArtifactWorkspaceContext } from "./artifact-workspace-types";

export function summarizeArtifactWorkspaceContext(context: ArtifactWorkspaceContext): string[] {
  return [
    `workspace root: ${context.workspaceRoot}`,
    `allowed extensions: ${context.allowedExtensions.join(", ")}`,
    "artifact export only; source mutation blocked",
    "explicit approval required before any artifact file write",
    ...context.policy.summary,
    ...context.validation.summary,
    ...context.ledger.summary,
  ];
}
