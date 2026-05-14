import { mkdir, stat, writeFile as persistUtf8MemoryEvent } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import {
  CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
  buildMemoryEventLedgerItem,
  buildMemoryEventPersistenceRequest,
  buildSafeMemoryEventPath,
  validateMemoryEventContent,
  validateMemoryEventPersistenceRequest,
} from "@/lib/codexforge/memory-persistence";

export const dynamic = "force-dynamic";

type FailureStatus = 400 | 403 | 409 | 500;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return failure("Invalid JSON payload.", 400);
  }

  const persistenceRequest = buildMemoryEventPersistenceRequest(
    body && typeof body === "object" ? body : {}
  );
  const validation = validateMemoryEventContent(persistenceRequest);
  const requestIssues = validateMemoryEventPersistenceRequest(persistenceRequest);

  if (persistenceRequest.approved !== true) {
    return failure("Memory event append requires approved true.", 403, validation.summary);
  }

  if (validation.pathValidation.traversal) {
    return failure("Memory event append blocks traversal.", 403, validation.summary);
  }

  if (validation.pathValidation.absolutePath) {
    return failure("Memory event append blocks absolute paths.", 403, validation.summary);
  }

  if (validation.pathValidation.sourceMutationAttempt) {
    return failure("Memory event append blocks source mutation attempts.", 403, validation.summary);
  }

  if (requestIssues.length > 0 || validation.state !== "valid") {
    return failure("Memory event append blocked by validation.", 403, [
      ...validation.summary,
      ...requestIssues,
    ]);
  }

  const safeEventPath = buildSafeMemoryEventPath(persistenceRequest.targetRelativePath);
  if (!safeEventPath || !validation.pathValidation.normalizedPath) {
    return failure("Memory event target is outside .codexforge/memory-events.", 403, validation.summary);
  }

  const workspaceRoot = path.resolve(process.cwd(), CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT);
  const targetPath = path.resolve(workspaceRoot, validation.pathValidation.normalizedPath);
  const relativeFromRoot = path.relative(workspaceRoot, targetPath);
  const insideWorkspace =
    !!relativeFromRoot &&
    !relativeFromRoot.startsWith("..") &&
    !path.isAbsolute(relativeFromRoot);

  if (!insideWorkspace) {
    return failure("Resolved memory event target escaped .codexforge/memory-events.", 403, validation.summary);
  }

  try {
    await stat(targetPath);
    if (!persistenceRequest.overwrite) {
      return failure("Memory event file already exists. Set overwrite true to replace it.", 409, validation.summary);
    }
  } catch (error) {
    if (!isMissingFile(error)) {
      return failure("Unable to inspect memory event target.", 500, validation.summary);
    }
  }

  const eventDocument = {
    id: persistenceRequest.eventId,
    type: "memory.promoted",
    actor: "memory-review",
    approved: persistenceRequest.approved,
    reviewId: persistenceRequest.reviewId,
    candidateId: persistenceRequest.candidateId,
    approvalNote: persistenceRequest.approvalNote,
    safetyNote: persistenceRequest.safetyNote,
    payload: {
      memoryId: `memory:${persistenceRequest.candidateId}`,
      content: persistenceRequest.content,
      memoryType: "note",
      importance: persistenceRequest.importance,
      confidence: persistenceRequest.confidence,
      contradictionRisk: persistenceRequest.contradictionRisk,
      reviewState: persistenceRequest.reviewState,
      sourceRefs: persistenceRequest.sourceRefs,
    },
    metadata: {
      graphMutation: "preview-only",
      noAutoPromotion: true,
      workspaceRoot: CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
    },
  };
  const content = JSON.stringify(eventDocument, null, 2);

  await mkdir(path.dirname(targetPath), { recursive: true });
  await persistUtf8MemoryEvent(targetPath, content, { encoding: "utf8" });

  const ledgerItem = buildMemoryEventLedgerItem({
    request: persistenceRequest,
    state: "persisted",
    note: "Approved memory event persisted under .codexforge/memory-events only.",
  });

  return NextResponse.json({
    ok: true,
    mode: "memory-event-append-only",
    workspaceRoot: CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
    targetRelativePath: validation.pathValidation.normalizedPath,
    targetPath: safeEventPath,
    metadata: {
      eventId: persistenceRequest.eventId,
      candidateId: persistenceRequest.candidateId,
      reviewId: persistenceRequest.reviewId,
      targetRelativePath: validation.pathValidation.normalizedPath,
      workspaceRoot: CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
      contentBytes: Buffer.byteLength(content, "utf8"),
      overwrite: persistenceRequest.overwrite,
      safetyNote:
        "Approved memory runtime event persistence only; writes only under .codexforge/memory-events; no commands and no direct graph mutation.",
    },
    validation,
    ledgerItem,
  });
}

function failure(message: string, status: FailureStatus, details: string[] = []) {
  return NextResponse.json(
    {
      ok: false,
      error: message,
      workspaceRoot: CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT,
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
