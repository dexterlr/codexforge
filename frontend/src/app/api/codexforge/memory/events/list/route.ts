import { readdir, stat } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import {
  CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
  validateMemoryEventWorkspacePath,
} from "@/lib/codexforge/memory-persistence";

export const dynamic = "force-dynamic";

const MAX_EVENT_FILE_BYTES = 256 * 1024;

export async function GET() {
  const workspaceRoot = path.resolve(process.cwd(), CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT);

  let entries: string[];
  try {
    entries = await readdir(workspaceRoot, { recursive: true, encoding: "utf8" });
  } catch (error) {
    if (isMissingDirectory(error)) {
      return NextResponse.json({
        ok: true,
        workspaceRoot: CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
        events: [],
        summary: [
          "Memory event workspace is missing; list handled safely.",
          "No approved memory events have been persisted yet.",
        ],
      });
    }

    return NextResponse.json(
      {
        ok: false,
        workspaceRoot: CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
        error: "Unable to list memory event workspace.",
      },
      { status: 500 }
    );
  }

  const events = [];
  for (const entry of entries) {
    const relativePath = String(entry).replace(/\\/g, "/");
    const validation = validateMemoryEventWorkspacePath(relativePath);
    if (!validation.safe || !validation.normalizedPath) continue;

    const targetPath = path.resolve(workspaceRoot, validation.normalizedPath);
    const relativeFromRoot = path.relative(workspaceRoot, targetPath);
    if (!relativeFromRoot || relativeFromRoot.startsWith("..") || path.isAbsolute(relativeFromRoot)) continue;

    try {
      const info = await stat(targetPath);
      if (!info.isFile() || info.size > MAX_EVENT_FILE_BYTES) continue;
      events.push({
        targetRelativePath: validation.normalizedPath,
        sizeBytes: info.size,
        workspaceRoot: CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
      });
    } catch {
      continue;
    }
  }

  return NextResponse.json({
    ok: true,
    workspaceRoot: CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
    events,
    summary: [
      `${events.length} safe memory event file(s) listed.`,
      "Metadata only; unsafe absolute source paths are not exposed.",
      "Giant files are skipped before content reads.",
    ],
  });
}

function isMissingDirectory(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "ENOENT"
  );
}
