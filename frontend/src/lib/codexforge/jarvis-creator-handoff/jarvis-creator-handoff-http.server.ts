import "server-only";

import { NextResponse } from "next/server";
import { CreatorServiceError } from "@/lib/codexforge/creator/creator-service.server";
import { assertCreatorJsonHasUniqueObjectKeys } from "@/lib/codexforge/creator/creator-contract.server";
import { jarvisChatJsonResponse } from "@/lib/codexforge/jarvis-chat/jarvis-chat-http.server";
import { JarvisChatPolicyError } from "@/lib/codexforge/jarvis-chat/jarvis-chat-policy";
import { PrivateAlphaHttpError } from "@/lib/codexforge/private-alpha/private-alpha-http.server";
import {
  JARVIS_CREATOR_HANDOFF_MAX_HTTP_BODY_BYTES,
  JarvisCreatorHandoffError,
} from "./jarvis-creator-handoff-policy";

const HEADERS = {
  "Cache-Control": "no-store",
  "Content-Security-Policy": "default-src 'none'; sandbox",
  "X-Content-Type-Options": "nosniff",
} as const;

function failure(status: number, code: string, message: string): NextResponse {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: /^[a-z][a-z0-9_]{0,63}$/u.test(code) ? code : "internal_failure",
        message: message.replace(/[\p{Cc}\p{Cf}\p{Cs}]/gu, " ").slice(0, 240),
      },
    },
    { status, headers: HEADERS }
  );
}

export function jarvisCreatorHandoffJsonResponse(body: unknown, status = 200): NextResponse {
  return jarvisChatJsonResponse(body, status);
}

export async function readJarvisCreatorHandoffJsonBody(request: Request): Promise<unknown> {
  const contentType = request.headers.get("Content-Type")?.trim().toLowerCase() ?? "";
  if (contentType !== "application/json" && contentType !== "application/json; charset=utf-8") {
    throw new JarvisCreatorHandoffError(415, "content_type_required", "Creator handoff mutations require application/json.");
  }
  const declared = request.headers.get("Content-Length");
  if (
    declared !== null &&
    (!/^\d+$/u.test(declared) || Number(declared) > JARVIS_CREATOR_HANDOFF_MAX_HTTP_BODY_BYTES)
  ) {
    throw new JarvisCreatorHandoffError(413, "body_too_large", "Creator handoff mutation body exceeds its bounded limit.");
  }
  if (!request.body) throw new JarvisCreatorHandoffError(400, "invalid_request", "Creator handoff mutation body is required.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      total += part.value.byteLength;
      if (total > JARVIS_CREATOR_HANDOFF_MAX_HTTP_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        throw new JarvisCreatorHandoffError(413, "body_too_large", "Creator handoff mutation body exceeds its bounded limit.");
      }
      chunks.push(part.value);
    }
  } catch (error) {
    if (error instanceof JarvisCreatorHandoffError) throw error;
    throw new JarvisCreatorHandoffError(400, "invalid_request", "Creator handoff mutation body could not be read safely.");
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    const source = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    assertCreatorJsonHasUniqueObjectKeys(source);
    return JSON.parse(source) as unknown;
  } catch {
    throw new JarvisCreatorHandoffError(400, "invalid_request", "Creator handoff body must be unambiguous valid UTF-8 JSON.");
  }
}

export function jarvisCreatorHandoffErrorResponse(error: unknown): NextResponse {
  if (error instanceof JarvisCreatorHandoffError) return failure(error.status, error.code, error.message);
  if (error instanceof JarvisChatPolicyError) return failure(error.status, error.code, error.message);
  if (error instanceof PrivateAlphaHttpError) {
    return failure(
      error.status,
      error.status === 403 ? "origin_forbidden" : "request_forbidden",
      "Jarvis creator handoff request boundary rejected this request."
    );
  }
  if (error instanceof CreatorServiceError) {
    return failure(error.status >= 500 ? 503 : error.status, error.code, error.message);
  }
  return failure(500, "internal_failure", "Jarvis creator handoff failed safely.");
}
