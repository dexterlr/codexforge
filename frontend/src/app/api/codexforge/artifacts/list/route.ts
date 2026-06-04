import "server-only";
import { readdir, stat } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import {
  appendCodexForgePathSegment,
  resolveCodexForgeProjectPath,
} from "@/lib/codexforge/server-safe-paths";
import {
  CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
  isArtifactPathTraversal,
  isArtifactSourceMutationPath,
  validateArtifactWorkspacePath,
} from "@/lib/codexforge/artifact-workspace";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ArtifactFileMetadata = {
  relativePath: string;
  sizeBytes: number;
  modifiedLabel: string;
  extensionAllowed: boolean;
};

export async function GET() {
  const workspaceRoot = resolveCodexForgeProjectPath(CODEXFORGE_ARTIFACT_WORKSPACE_ROOT, {
    allowBasePath: false,
  }).absolutePath;

  try {
    const rootStats = await stat(workspaceRoot);
    if (!rootStats.isDirectory()) {
      return NextResponse.json({
        ok: true,
        workspaceRoot: CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
        items: [],
        summary: "Artifact workspace path exists but is not a directory.",
      });
    }
  } catch (error) {
    if (isMissingFile(error)) {
      return NextResponse.json({
        ok: true,
        workspaceRoot: CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
        items: [],
        summary: "Artifact workspace has not been created yet.",
      });
    }

    return NextResponse.json(
      {
        ok: false,
        workspaceRoot: CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
        error: "Unable to inspect artifact workspace.",
      },
      { status: 500 }
    );
  }

  const items = await listArtifactFiles(workspaceRoot, workspaceRoot);

  return NextResponse.json({
    ok: true,
    mode: "artifact-workspace-metadata-only",
    workspaceRoot: CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
    items,
    summary: `${items.length} artifact workspace file(s). Contents are not read by this endpoint.`,
  });
}

async function listArtifactFiles(root: string, current: string): Promise<ArtifactFileMetadata[]> {
  const entries = await readdir(current, { withFileTypes: true });
  const groups = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = appendCodexForgePathSegment(current, entry.name);
      const relativePath = path.relative(root, fullPath).replace(/\\/g, "/");
      const validation = validateArtifactWorkspacePath(relativePath);

      if (entry.isDirectory()) {
        if (
          path.isAbsolute(relativePath) ||
          isArtifactPathTraversal(relativePath) ||
          isArtifactSourceMutationPath(relativePath)
        ) {
          return [];
        }

        return listArtifactFiles(root, fullPath);
      }

      if (!entry.isFile()) return [];
      if (!validation.allowed) return [];

      const fileStats = await stat(fullPath);
      return [
        {
          relativePath,
          sizeBytes: fileStats.size,
          modifiedLabel: fileStats.mtime.toISOString(),
          extensionAllowed: validation.extensionAllowed,
        },
      ];
    })
  );

  return groups.flat().sort((left, right) => left.relativePath.localeCompare(right.relativePath));
}

function isMissingFile(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "ENOENT"
  );
}
