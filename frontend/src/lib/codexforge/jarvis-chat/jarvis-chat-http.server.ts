import "server-only";

import { NextResponse } from "next/server";
import { assertCreatorJsonHasUniqueObjectKeys } from "@/lib/codexforge/creator/creator-contract.server";
import {
  PrivateAlphaHttpError,
  assertPrivateAlphaLoopbackRequest,
} from "@/lib/codexforge/private-alpha/private-alpha-http.server";
import { PrivateAlphaStoreError } from "@/lib/codexforge/private-alpha/private-alpha-store.server";
import {
  JARVIS_CHAT_MAX_CONVERSATIONS,
  JARVIS_CHAT_MAX_HTTP_BODY_BYTES,
  JarvisChatPolicyError,
} from "./jarvis-chat-policy";

const RESPONSE_HEADERS = {
  "Cache-Control": "no-store",
  "Content-Security-Policy": "default-src 'none'; sandbox",
  "X-Content-Type-Options": "nosniff",
} as const;

export function assertJarvisChatRequest(request: Request, mutation = false): URL {
  return assertPrivateAlphaLoopbackRequest(request, mutation);
}

export async function readJarvisChatJsonBody(request: Request): Promise<unknown> {
  const contentType = request.headers.get("Content-Type")?.trim().toLowerCase() ?? "";
  if (contentType !== "application/json" && contentType !== "application/json; charset=utf-8") {
    throw new JarvisChatPolicyError(415, "content_type_required", "Jarvis chat mutations require application/json.");
  }
  const declared = request.headers.get("Content-Length");
  if (declared !== null && (!/^\d+$/u.test(declared) || Number(declared) > JARVIS_CHAT_MAX_HTTP_BODY_BYTES)) {
    throw new JarvisChatPolicyError(413, "body_too_large", `Jarvis chat mutation body exceeds ${JARVIS_CHAT_MAX_HTTP_BODY_BYTES} bytes.`);
  }
  if (!request.body) {
    throw new JarvisChatPolicyError(400, "invalid_request", "Jarvis chat mutation body is required.");
  }
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const result = await reader.read();
      if (result.done) break;
      total += result.value.byteLength;
      if (total > JARVIS_CHAT_MAX_HTTP_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        throw new JarvisChatPolicyError(413, "body_too_large", `Jarvis chat mutation body exceeds ${JARVIS_CHAT_MAX_HTTP_BODY_BYTES} bytes.`);
      }
      chunks.push(result.value);
    }
  } catch (error) {
    if (error instanceof JarvisChatPolicyError) throw error;
    throw new JarvisChatPolicyError(400, "invalid_request", "Jarvis chat mutation body could not be read safely.");
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  let source: string;
  try {
    source = new TextDecoder("utf-8", { fatal: true }).decode(merged);
    assertCreatorJsonHasUniqueObjectKeys(source);
    return JSON.parse(source) as unknown;
  } catch {
    throw new JarvisChatPolicyError(400, "invalid_request", "Jarvis chat mutation body must be unambiguous valid UTF-8 JSON.");
  }
}

export function assertJarvisChatRevisionPrecondition(request: Request, body: unknown): void {
  const expected = typeof body === "object" && body !== null && "expectedRevision" in body
    ? (body as { expectedRevision?: unknown }).expectedRevision
    : null;
  if (!Number.isSafeInteger(expected) || request.headers.get("If-Match")?.trim() !== `"${expected}"`) {
    throw new JarvisChatPolicyError(409, "revision_conflict", "Jarvis chat mutation requires If-Match for the exact expected revision.");
  }
}

export function readJarvisChatListLimit(url: URL): number {
  const keys = [...url.searchParams.keys()];
  if (keys.some((key) => key !== "limit") || url.searchParams.getAll("limit").length > 1) {
    throw new JarvisChatPolicyError(400, "invalid_request", "Jarvis chat list query is invalid.");
  }
  const source = url.searchParams.get("limit");
  if (source === null) return JARVIS_CHAT_MAX_CONVERSATIONS;
  if (!/^\d{1,2}$/u.test(source)) {
    throw new JarvisChatPolicyError(400, "invalid_request", "Jarvis chat list limit is invalid.");
  }
  const limit = Number(source);
  if (limit < 1 || limit > JARVIS_CHAT_MAX_CONVERSATIONS) {
    throw new JarvisChatPolicyError(400, "invalid_request", `Jarvis chat list limit must be 1-${JARVIS_CHAT_MAX_CONVERSATIONS}.`);
  }
  return limit;
}

export function jarvisChatJsonResponse(body: unknown, status = 200): NextResponse {
  return NextResponse.json(body, { status, headers: RESPONSE_HEADERS });
}

function failure(status: number, code: string, message: string): NextResponse {
  const safeCode = /^[a-z][a-z0-9_]{0,63}$/u.test(code) ? code : "internal_failure";
  const safeMessage = message.replace(/[\p{Cc}\p{Cf}\p{Cs}]/gu, " ").slice(0, 240);
  return jarvisChatJsonResponse({ ok: false, error: { code: safeCode, message: safeMessage } }, status);
}

export function jarvisChatErrorResponse(error: unknown): NextResponse {
  if (error instanceof JarvisChatPolicyError) {
    return failure(error.status, error.code, error.message);
  }
  if (error instanceof PrivateAlphaHttpError) {
    return failure(error.status, error.status === 403 ? "origin_forbidden" : "request_forbidden", "Jarvis chat request boundary rejected this request.");
  }
  if (error instanceof PrivateAlphaStoreError) {
    const status = error.status === 409 ? 409 : error.status >= 500 ? 503 : 400;
    return failure(status, status === 409 ? "lifecycle_conflict" : "local_runtime_unavailable", "Jarvis chat local lifecycle failed safely.");
  }
  return failure(500, "internal_failure", "Jarvis chat operation failed safely.");
}
