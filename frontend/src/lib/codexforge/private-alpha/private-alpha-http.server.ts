import "server-only";

import { isIP, Server as NetServer } from "node:net";
import { NextResponse } from "next/server";
import { assertCreatorJsonHasUniqueObjectKeys } from "../creator/creator-contract.server";

export const PRIVATE_ALPHA_MAX_HTTP_BODY_BYTES = 32_768;

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);
const INVALID_HEADER_CHARACTERS = /[\u0000-\u0020\u007f,]/;
const INVALID_AUTHORITY_CHARACTERS = /[\/\\?#@]/;
const DNS_HOSTNAME = /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)(?:\.(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?))*$/;
const ORIGIN_SCHEME = /^[A-Za-z][A-Za-z0-9+.-]*$/;

export class PrivateAlphaHttpError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "PrivateAlphaHttpError";
  }
}

function isLoopbackHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  return normalized === "localhost" || normalized === "127.0.0.1" || normalized === "::1";
}

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
  if (isIP(hostname) !== 4 && !DNS_HOSTNAME.test(hostname)) return null;
  return hostname;
}

function parseAuthority(authority: string, protocol: string): URL | null {
  if (
    authority === "" ||
    authority === "null" ||
    INVALID_HEADER_CHARACTERS.test(authority) ||
    INVALID_AUTHORITY_CHARACTERS.test(authority)
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

function parseOrigin(origin: string): URL | null {
  if (INVALID_HEADER_CHARACTERS.test(origin)) return null;
  const separator = origin.indexOf("://");
  if (separator <= 0 || origin.indexOf("://", separator + 3) !== -1) return null;
  const scheme = origin.slice(0, separator);
  if (!ORIGIN_SCHEME.test(scheme)) return null;
  const protocol = `${scheme.toLowerCase()}:`;
  if (!ALLOWED_PROTOCOLS.has(protocol)) return null;
  return parseAuthority(origin.slice(separator + 3), protocol);
}

function readTrustedRequestUrl(request: Request): URL {
  try {
    const url = new URL(request.url);
    if (
      ALLOWED_PROTOCOLS.has(url.protocol) &&
      url.username === "" &&
      url.password === "" &&
      url.hash === ""
    ) {
      return url;
    }
  } catch {
    // Fall through to the bounded fail-closed result.
  }
  throw new PrivateAlphaHttpError(404, "Private Alpha request authority is invalid.");
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
    throw new PrivateAlphaHttpError(
      503,
      "Private Alpha is unavailable unless the CodexForge server is bound only to loopback."
    );
  }
}

export function assertPrivateAlphaLoopbackRequest(
  request: Request,
  mutation = false,
  listenerAddressesForTesting?: readonly string[]
): URL {
  assertLoopbackTransport(listenerAddressesForTesting ?? readActiveNetworkListenerAddresses());
  const url = readTrustedRequestUrl(request);
  if (!isLoopbackHostname(url.hostname)) {
    throw new PrivateAlphaHttpError(404, "Private Alpha API is available only on loopback.");
  }

  const host = request.headers.get("Host");
  const externalAuthority = host ? parseAuthority(host, url.protocol) : null;
  if (
    !externalAuthority ||
    !isLoopbackHostname(externalAuthority.hostname)
  ) {
    throw new PrivateAlphaHttpError(404, "Private Alpha request authority is not approved.");
  }
  if (!mutation) return externalAuthority;

  const origin = request.headers.get("Origin");
  if (!origin || origin === "null") {
    throw new PrivateAlphaHttpError(403, "Private Alpha mutation requires an exact same-origin request.");
  }
  const parsedOrigin = parseOrigin(origin);
  if (
    !parsedOrigin ||
    !isLoopbackHostname(parsedOrigin.hostname) ||
    parsedOrigin.protocol !== url.protocol ||
    parsedOrigin.host !== externalAuthority.host
  ) {
    throw new PrivateAlphaHttpError(403, "Private Alpha mutation origin is not approved.");
  }
  const fetchSite = request.headers.get("Sec-Fetch-Site");
  if (fetchSite && fetchSite !== "same-origin") {
    throw new PrivateAlphaHttpError(403, "Cross-site Private Alpha mutation is forbidden.");
  }
  return externalAuthority;
}

export async function readPrivateAlphaJsonBody(request: Request): Promise<unknown> {
  const contentType = request.headers.get("Content-Type")?.trim().toLowerCase() ?? "";
  if (contentType !== "application/json" && contentType !== "application/json; charset=utf-8") {
    throw new PrivateAlphaHttpError(415, "Private Alpha mutations require application/json.");
  }
  const contentLength = request.headers.get("Content-Length");
  if (
    contentLength !== null &&
    (!/^\d+$/.test(contentLength) || Number(contentLength) > PRIVATE_ALPHA_MAX_HTTP_BODY_BYTES)
  ) {
    throw new PrivateAlphaHttpError(
      413,
      `Private Alpha mutation body exceeds ${PRIVATE_ALPHA_MAX_HTTP_BODY_BYTES} bytes.`
    );
  }
  if (!request.body) {
    throw new PrivateAlphaHttpError(400, "Private Alpha mutation body is required.");
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const result = await reader.read();
      if (result.done) break;
      length += result.value.byteLength;
      if (length > PRIVATE_ALPHA_MAX_HTTP_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        throw new PrivateAlphaHttpError(
          413,
          `Private Alpha mutation body exceeds ${PRIVATE_ALPHA_MAX_HTTP_BODY_BYTES} bytes.`
        );
      }
      chunks.push(result.value);
    }
  } catch (error) {
    if (error instanceof PrivateAlphaHttpError) throw error;
    throw new PrivateAlphaHttpError(400, "Private Alpha mutation body could not be read safely.");
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
    throw new PrivateAlphaHttpError(400, "Private Alpha mutation body must be valid UTF-8.");
  }
  try {
    assertCreatorJsonHasUniqueObjectKeys(source);
    return JSON.parse(source) as unknown;
  } catch {
    throw new PrivateAlphaHttpError(400, "Private Alpha mutation body is not valid unambiguous JSON.");
  }
}

const PRIVATE_ALPHA_JSON_RESPONSE_HEADERS = {
  "Cache-Control": "no-store",
  "Content-Security-Policy": "default-src 'none'; sandbox",
  "X-Content-Type-Options": "nosniff",
} as const;

export function privateAlphaJsonResponse(
  body: unknown,
  options: { status?: number } = {}
): NextResponse {
  return NextResponse.json(body, {
    status: options.status ?? 200,
    headers: PRIVATE_ALPHA_JSON_RESPONSE_HEADERS,
  });
}

export function privateAlphaFailureResponse(
  status: number,
  error: string,
  details: Readonly<{ errorCode?: string | null; replayed?: boolean }> = {}
): NextResponse {
  const errorCode =
    typeof details.errorCode === "string" && /^[a-z][a-z0-9_]{0,63}$/.test(details.errorCode)
      ? details.errorCode
      : undefined;
  return privateAlphaJsonResponse(
    {
      ok: false,
      error: error.replace(/[\p{Cc}\p{Cf}\p{Cs}]/gu, " ").slice(0, 240),
      ...(errorCode ? { errorCode } : {}),
      ...(typeof details.replayed === "boolean" ? { replayed: details.replayed } : {}),
    },
    { status }
  );
}

export function privateAlphaHttpErrorResponse(error: unknown): NextResponse | null {
  return error instanceof PrivateAlphaHttpError
    ? privateAlphaFailureResponse(error.status, error.message)
    : null;
}
