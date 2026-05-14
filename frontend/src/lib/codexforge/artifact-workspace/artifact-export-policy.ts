import {
  CODEXFORGE_ARTIFACT_ALLOWED_EXTENSIONS,
  CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
  type ArtifactExportPolicy,
} from "./artifact-workspace-types";
import { listArtifactWorkspaceBlockedSegments } from "./artifact-path-guard";

export function buildArtifactExportPolicy(): ArtifactExportPolicy {
  const policy: ArtifactExportPolicy = {
    id: "artifact-export-policy-phase-11",
    requiresApproval: true,
    safeWorkspaceOnly: true,
    sourceMutationBlocked: true,
    overwriteRequiresExplicitTrue: true,
    auditMetadataRequired: true,
    workspaceRoot: CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
    allowedExtensions: CODEXFORGE_ARTIFACT_ALLOWED_EXTENSIONS,
    blockedSourceSegments: listArtifactWorkspaceBlockedSegments(),
    summary: [],
  };

  return {
    ...policy,
    summary: summarizeArtifactExportPolicy(policy),
  };
}

export function isArtifactExportAllowed(policy = buildArtifactExportPolicy()): boolean {
  return (
    policy.requiresApproval &&
    policy.safeWorkspaceOnly &&
    policy.sourceMutationBlocked &&
    policy.overwriteRequiresExplicitTrue &&
    policy.auditMetadataRequired
  );
}

export function summarizeArtifactExportPolicy(policy: ArtifactExportPolicy): string[] {
  return [
    `explicit approval required before artifact export`,
    `safe workspace: ${policy.workspaceRoot}`,
    `source mutation blocked for ${policy.blockedSourceSegments.join(", ")}`,
    `extension allowlist: ${policy.allowedExtensions.join(", ")}`,
    "overwrite requires explicit overwrite true",
    "audit metadata required for replay",
  ];
}
