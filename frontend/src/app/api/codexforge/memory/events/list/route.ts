import { readdir, stat } from "fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
  validateMemoryEventWorkspacePath,
} from "@/lib/codexforge/memory-persistence";
import {
  resolveBoundedWorkspacePath,
  summarizeBoundedPathCheck,
} from "@/lib/codexforge/server-safe-paths";

export const dynamic = "force-dynamic";

const MAX_EVENT_FILE_BYTES = 256 * 1024;
const WORKSPACE_ROOT_CHECK = resolveBoundedWorkspacePath({
  workspaceRoot: CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
  relativePath: ".keep",
});

export async function GET() {
  const workspaceRoot = WORKSPACE_ROOT_CHECK.absolutePath
    ? path.dirname(WORKSPACE_ROOT_CHECK.absolutePath)
    : null;

  if (!workspaceRoot) {
    return NextResponse.json(
      {
        ok: false,
        workspaceRoot: CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
        error: "Unable to list memory event workspace.",
        summary: summarizeBoundedPathCheck(WORKSPACE_ROOT_CHECK),
      },
      { status: 500 }
    );
  }

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

    const boundedTarget = resolveBoundedWorkspacePath({
      workspaceRoot: CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
      relativePath: validation.normalizedPath,
    });
    if (!boundedTarget.safe || !boundedTarget.absolutePath) continue;

    try {
      const info = await stat(boundedTarget.absolutePath);
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
