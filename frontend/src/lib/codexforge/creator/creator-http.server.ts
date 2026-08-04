import "server-only";

import { isIP, Server as NetServer } from "node:net";
import { NextResponse } from "next/server";
import { CREATOR_MAX_MUTATION_BODY_BYTES } from "./creator-policy";
import { assertCreatorJsonHasUniqueObjectKeys } from "./creator-contract.server";
import { CreatorServiceError } from "./creator-service.server";
import type { CreatorFailureCode } from "./creator-types";

function isLoopbackHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  return normalized === "localhost" || normalized === "127.0.0.1" || normalized === "::1";
}

const CREATOR_ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);
const CREATOR_INVALID_HEADER_CHARACTERS = /[\u0000-\u0020\u007f,]/;
const CREATOR_INVALID_AUTHORITY_CHARACTERS = /[\/\\?#@]/;
const CREATOR_DNS_HOSTNAME = /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)(?:\.(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?))*$/;
const CREATOR_ORIGIN_SCHEME = /^[A-Za-z][A-Za-z0-9+.-]*$/;

function readAuthorityHostnameSource(authority: string): string | null {
  if (authority.startsWith("[")) {
    const closingBracket = authority.indexOf("]");
    if (closingBracket <= 1) return null;
    const suffix = authority.slice(closingBracket + 1);
    if (suffix !== "" && !/^:[1-9]\d{0,4}$/.test(suffix)) return null;
    if (suffix !== "" && Number(suffix.slice(1)) > 65_535) return null;
    if (isIP(authority.slice(1, closingBracket)) !== 6) return null;
    return authority.slice(0, closingBracket + 1);
  }

  if (authority.includes("[") || authority.includes("]")) return null;
  const firstColon = authority.indexOf(":");
  if (firstColon !== -1) {
    if (firstColon !== authority.lastIndexOf(":")) return null;
    const port = authority.slice(firstColon + 1);
    if (!/^[1-9]\d{0,4}$/.test(port) || Number(port) > 65_535) return null;
  }
  const hostname = firstColon === -1 ? authority : authority.slice(0, firstColon);
  if (isIP(hostname) !== 4 && !CREATOR_DNS_HOSTNAME.test(hostname)) return null;
  return hostname;
}

function parseCreatorAuthority(authority: string, protocol: string): URL | null {
  if (
    authority === "" ||
    authority === "null" ||
    CREATOR_INVALID_HEADER_CHARACTERS.test(authority) ||
    CREATOR_INVALID_AUTHORITY_CHARACTERS.test(authority)
  ) {
    return null;
  }
  const hostnameSource = readAuthorityHostnameSource(authority);
  if (!hostnameSource) return null;

  try {
    const parsed = new URL(`${protocol}//${authority}/`);
    if (
      parsed.host === "" ||
      parsed.username !== "" ||
      parsed.password !== "" ||
      parsed.pathname !== "/" ||
      parsed.search !== "" ||
      parsed.hash !== ""
    ) {
      return null;
    }
    if (
      !hostnameSource.startsWith("[") &&
      parsed.hostname.toLowerCase() !== hostnameSource.toLowerCase()
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function parseCreatorOrigin(origin: string): URL | null {
  if (CREATOR_INVALID_HEADER_CHARACTERS.test(origin)) return null;
  const separator = origin.indexOf("://");
  if (separator <= 0 || origin.indexOf("://", separator + 3) !== -1) return null;
  const scheme = origin.slice(0, separator);
  if (!CREATOR_ORIGIN_SCHEME.test(scheme)) return null;
  const protocol = `${scheme.toLowerCase()}:`;
  if (!CREATOR_ALLOWED_PROTOCOLS.has(protocol)) return null;
  return parseCreatorAuthority(origin.slice(separator + 3), protocol);
}

function readTrustedRequestUrl(request: Request): URL {
  try {
    const url = new URL(request.url);
    if (CREATOR_ALLOWED_PROTOCOLS.has(url.protocol)) return url;
  } catch {
    // Fall through to the bounded fail-closed response below.
  }
  throw new CreatorServiceError(404, "origin_forbidden", "Creator API request authority is invalid.");
}

function readExternalCreatorAuthority(request: Request, protocol: string): URL {
  const host = request.headers.get("Host");
  const parsed = host ? parseCreatorAuthority(host, protocol) : null;
  if (!parsed || !isLoopbackHostname(parsed.hostname)) {
    throw new CreatorServiceError(404, "origin_forbidden", "Creator API is available only on loopback.");
  }
  return parsed;
}

type ProcessWithActiveHandles = NodeJS.Process & Readonly<{
  _getActiveHandles?: () => readonly unknown[];
}>;

function readActiveNetworkListenerAddresses(): readonly string[] | null {
  const getActiveHandles = (process as ProcessWithActiveHandles)._getActiveHandles;
  if (typeof getActiveHandles !== "function") return null;
  try {
    const addresses: string[] = [];
    for (const handle of getActiveHandles.call(process)) {
      if (!(handle instanceof NetServer)) continue;
      const address = handle.address();
      if (address && typeof address === "object" && typeof address.address === "string") {
        addresses.push(address.address);
      }
    }
    return addresses;
  } catch {
    return null;
  }
}

function assertLoopbackTransport(listenerAddresses: readonly string[] | null): void {
  if (
    !listenerAddresses ||
    listenerAddresses.length === 0 ||
    listenerAddresses.some((address) => !isLoopbackHostname(address))
  ) {
    throw new CreatorServiceError(
      503,
      "origin_forbidden",
      "Creator is unavailable unless the CodexForge server is bound only to loopback."
    );
  }
}

export function assertCreatorLoopbackRequest(
  request: Request,
  mutation = false,
  listenerAddressesForTesting?: readonly string[]
): URL {
  assertLoopbackTransport(listenerAddressesForTesting ?? readActiveNetworkListenerAddresses());
  const url = readTrustedRequestUrl(request);
  if (!isLoopbackHostname(url.hostname)) {
    throw new CreatorServiceError(404, "origin_forbidden", "Creator API is available only on loopback.");
  }
  const externalAuthority = readExternalCreatorAuthority(request, url.protocol);
  if (!mutation) return externalAuthority;
  const origin = request.headers.get("Origin");
  if (!origin || origin === "null") {
    throw new CreatorServiceError(403, "origin_forbidden", "Creator mutation requires an exact same-origin request.");
  }
  const parsedOrigin = parseCreatorOrigin(origin);
  if (!parsedOrigin) {
    throw new CreatorServiceError(403, "origin_forbidden", "Creator mutation origin is invalid.");
  }
  if (
    parsedOrigin.protocol !== url.protocol ||
    parsedOrigin.host !== externalAuthority.host ||
    !isLoopbackHostname(parsedOrigin.hostname)
  ) {
    throw new CreatorServiceError(403, "origin_forbidden", "Creator mutation origin is not approved.");
  }
  const fetchSite = request.headers.get("Sec-Fetch-Site");
  if (fetchSite && fetchSite !== "same-origin") {
    throw new CreatorServiceError(403, "origin_forbidden", "Cross-site creator mutation is forbidden.");
  }
  return externalAuthority;
}

export async function readCreatorJsonBody(request: Request): Promise<unknown> {
  const contentType = request.headers.get("Content-Type")?.trim().toLowerCase() ?? "";
  if (contentType !== "application/json" && contentType !== "application/json; charset=utf-8") {
    throw new CreatorServiceError(415, "content_type_required", "Creator mutations require application/json.");
  }
  const contentLength = request.headers.get("Content-Length");
  if (contentLength !== null) {
    if (!/^\d+$/.test(contentLength) || Number(contentLength) > CREATOR_MAX_MUTATION_BODY_BYTES) {
      throw new CreatorServiceError(413, "body_too_large", "Creator mutation body exceeds 16384 bytes.");
    }
  }
  if (!request.body) {
    throw new CreatorServiceError(400, "invalid_request", "Creator mutation body is required.");
  }
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const result = await reader.read();
    if (result.done) break;
    length += result.value.byteLength;
    if (length > CREATOR_MAX_MUTATION_BODY_BYTES) {
      await reader.cancel().catch(() => undefined);
      throw new CreatorServiceError(413, "body_too_large", "Creator mutation body exceeds 16384 bytes.");
    }
    chunks.push(result.value);
  }
  const merged = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  let source: string;
  try {
    source = new TextDecoder("utf-8", { fatal: true }).decode(merged);
  } catch {
    throw new CreatorServiceError(400, "invalid_request", "Creator mutation body must be valid UTF-8.");
  }
  try {
    assertCreatorJsonHasUniqueObjectKeys(source);
    return JSON.parse(source) as unknown;
  } catch {
    throw new CreatorServiceError(400, "invalid_request", "Creator mutation body is not valid JSON.");
  }
}

export function readCreatorRevisionPrecondition(
  request: Request,
  body: unknown
): void {
  const expectedRevision =
    typeof body === "object" && body !== null && "expectedRevision" in body
      ? (body as { expectedRevision?: unknown }).expectedRevision
      : null;
  const ifMatch = request.headers.get("If-Match")?.trim() ?? "";
  if (
    typeof expectedRevision !== "number" ||
    ifMatch !== `"${expectedRevision}"`
  ) {
    throw new CreatorServiceError(
      409,
      "revision_conflict",
      "Creator mutation requires an If-Match header for the exact expected revision."
    );
  }
}

export function creatorFailureResponse(
  status: number,
  code: CreatorFailureCode,
  message: string
): NextResponse {
  return NextResponse.json(
    { ok: false, error: { code, message: message.slice(0, 240) } },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "Content-Security-Policy": "default-src 'none'; sandbox",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}

export function creatorErrorResponse(error: unknown): NextResponse {
  if (error instanceof CreatorServiceError) {
    return creatorFailureResponse(error.status, error.code, error.message);
  }
  return creatorFailureResponse(500, "internal_failure", "Creator operation failed safely.");
}

export function creatorJsonResponse(
  body: unknown,
  options: { status?: number } = {}
): NextResponse {
  return NextResponse.json(body, {
    status: options.status ?? 200,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}
