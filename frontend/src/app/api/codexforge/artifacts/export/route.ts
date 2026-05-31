import { mkdir, stat, writeFile as persistUtf8Artifact } from "fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
  buildArtifactExportLedgerItem,
  buildArtifactExportRequest,
  buildSafeArtifactPath,
  validateArtifactExportContent,
  validateArtifactExportRequest,
} from "@/lib/codexforge/artifact-workspace";
import {
  resolveBoundedWorkspacePath,
  summarizeBoundedPathCheck,
} from "@/lib/codexforge/server-safe-paths";

export const dynamic = "force-dynamic";

type ExportFailureStatus = 400 | 403 | 409 | 500;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return failure("Invalid JSON payload.", 400);
  }

  const exportRequest = buildArtifactExportRequest(body && typeof body === "object" ? body : {});
  const validation = validateArtifactExportContent(exportRequest);
  const requestIssues = validateArtifactExportRequest(exportRequest);

  if (exportRequest.approved !== true) {
    return failure("Artifact export requires approved true.", 403, validation.summary);
  }

  if (validation.pathValidation.traversal) {
    return failure("Artifact export blocks path traversal.", 403, validation.summary);
  }

  if (validation.pathValidation.absolutePath) {
    return failure("Artifact export blocks absolute target paths.", 403, validation.summary);
  }

  if (!validation.pathValidation.extensionAllowed) {
    return failure("Artifact export blocks unsupported extensions.", 403, validation.summary);
  }

  if (validation.pathValidation.sourceMutationAttempt) {
    return failure("Artifact export blocks source mutation paths.", 403, validation.summary);
  }

  if (requestIssues.length > 0 || validation.state === "blocked") {
    return failure("Artifact export blocked by validation.", 403, [
      ...validation.summary,
      ...requestIssues,
    ]);
  }

  const safeArtifactPath = buildSafeArtifactPath(exportRequest.targetRelativePath);
  if (!safeArtifactPath || !validation.pathValidation.normalizedPath) {
    return failure("Artifact target path is outside the safe artifact workspace.", 403, validation.summary);
  }

  const boundedTarget = resolveBoundedWorkspacePath({
    workspaceRoot: CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
    relativePath: validation.pathValidation.normalizedPath,
  });

  if (!boundedTarget.safe || !boundedTarget.absolutePath) {
    return failure("Artifact export blocked by bounded path validation.", 403, [
      ...validation.summary,
      ...summarizeBoundedPathCheck(boundedTarget),
      "Resolved artifact target escaped the safe workspace.",
      "Artifact target path is outside the safe artifact workspace.",
    ]);
  }

  const targetPath = boundedTarget.absolutePath;

  try {
    await stat(targetPath);
    if (!exportRequest.overwrite) {
      return failure("Artifact file already exists. Set overwrite true to replace it.", 409, validation.summary);
    }
  } catch (error) {
    if (!isMissingFile(error)) {
      return failure("Unable to inspect artifact target.", 500, validation.summary);
    }
  }

  await mkdir(path.dirname(targetPath), { recursive: true });
  await persistUtf8Artifact(targetPath, exportRequest.content, { encoding: "utf8" });

  const ledgerItem = buildArtifactExportLedgerItem({
    request: exportRequest,
    validation,
    exported: true,
  });

  return NextResponse.json({
    ok: true,
    mode: "artifact-export-only",
    workspaceRoot: CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
    targetRelativePath: validation.pathValidation.normalizedPath,
    targetPath: safeArtifactPath,
    metadata: {
      artifactId: exportRequest.artifactId,
      title: exportRequest.title,
      type: exportRequest.type,
      sourceSurface: exportRequest.sourceSurface,
      sourceRunId: exportRequest.sourceRunId,
      approvalNote: exportRequest.approvalNote,
      overwrite: exportRequest.overwrite,
      contentBytes: Buffer.byteLength(exportRequest.content, "utf8"),
      safetyNote: "artifact export only; source mutation blocked; commands and external apps are not executed",
    },
    validation,
    ledgerItem,
  });
}

function failure(message: string, status: ExportFailureStatus, details: string[] = []) {
  return NextResponse.json(
    {
      ok: false,
      error: message,
      workspaceRoot: CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
      details,
    },
    { status }
  );
}

function isMissingFile(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "ENOENT"
  );
}
