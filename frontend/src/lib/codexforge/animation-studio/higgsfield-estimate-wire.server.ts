import "server-only";
import { request as httpsRequest, type RequestOptions } from "node:https";
import { debuglog } from "node:util";
import { validateHeaderName, validateHeaderValue, type ClientRequest, type IncomingMessage } from "node:http";
import { HIGGSFIELD_CONTRACT, readHiggsfieldConfiguration } from "./higgsfield-contract.server";
import { ESTIMATE_ENDPOINT, safeEstimateCorrelation } from "./higgsfield-estimate-intent";
import { HiggsfieldTransportError } from "./higgsfield-transport.server";

export type EstimateWire = (url: string, init: RequestInit, onTransportEntered?: () => void) => Promise<Response>;
// The installed Node runtime supports this net option; the repository's older
// HTTPS declaration omits it. Keep the required false value explicit and narrow.
export type EstimateRequestFactory = (url: URL, options: RequestOptions & { autoSelectFamily: false }, response: (message: IncomingMessage) => void) => ClientRequest;
export type EstimateWireEvent = "invocation" | "request-created" | "request-ended" | "socket-assigned";
const MAX_BYTES = 16_384;
const DEADLINE_MS = 30_000;
// Identifies the core wire's observation callback, not an execution capability.
const coreWires = new WeakSet<EstimateWire>();
export const isHiggsfieldEstimateWire = (wire: EstimateWire): boolean => coreWires.has(wire);
const reject = (): never => { throw new HiggsfieldTransportError(null, false); };

/** Constructor-only server seam for owned loopback tests. The production instance uses core
 * HTTPS directly, with no agent reuse, Fetch, redirects, SDK, proxy or retry machinery.
 * The observer receives names only: never headers, credentials, bodies, URLs or errors.
 */
export function createHiggsfieldEstimateWire(
  requestFactory: EstimateRequestFactory = httpsRequest,
  observer?: (event: EstimateWireEvent) => void,
): EstimateWire {
  const wire: EstimateWire = async (url, init, onTransportEntered) => {
    const observe = (event: EstimateWireEvent) => { try { observer?.(event); } catch { /* Diagnostics cannot change dispatch or create retries. */ } };
    observe("invocation");
    let target: URL, headers: Record<string, string>, body: string, signal: AbortSignal;
    try {
      // Standard Node network debug output can print request headers. Never send
      // credentials under such diagnostics; inspect only enabled flags, not env values.
      if (["http", "https", "net", "tls", "stream"].some(name => debuglog(name).enabled)) return reject();
      if (url !== HIGGSFIELD_CONTRACT.apiOrigin + ESTIMATE_ENDPOINT) return reject();
      target = new URL(url);
      if (target.protocol !== "https:" || target.username || target.password || target.search || target.hash) return reject();
      if (Object.keys(init).sort().join() !== "body,cache,credentials,headers,method,redirect,signal" ||
          init.method !== "POST" || init.redirect !== "error" || init.credentials !== "omit" || init.cache !== "no-store") return reject();
      if (!init.headers || Object.getPrototypeOf(init.headers) !== Object.prototype ||
          Object.keys(init.headers).sort().join() !== "Accept,Authorization,Content-Type") return reject();
      headers = init.headers as Record<string, string>;
      if (headers.Accept !== "application/json" || headers["Content-Type"] !== "application/json" ||
          typeof headers.Authorization !== "string" || !headers.Authorization.startsWith("Key ") ||
          readHiggsfieldConfiguration(() => headers.Authorization.slice(4)).configuration !== "LOCALLY_CONFIGURED") return reject();
      // Core rejects some parser-valid non-Latin-1 values synchronously. Validate before
      // the irreversible boundary, without leaking the header/error text to the caller.
      for (const [name, value] of Object.entries(headers)) { validateHeaderName(name); validateHeaderValue(name, value); }
      if (typeof init.body !== "string" || Buffer.byteLength(init.body, "utf8") < 2 || Buffer.byteLength(init.body, "utf8") > 32_768) return reject();
      // The real transport has already validated and serialized the canonical request.
      // Reject ambiguous/non-object serialization if this server-only seam is misused.
      const parsed: unknown = JSON.parse(init.body);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed) || JSON.stringify(parsed) !== init.body) return reject();
      if (!(init.signal instanceof AbortSignal) || init.signal.aborted) return reject();
      body = init.body; signal = init.signal;
    } catch { return reject(); }

    return new Promise<Response>((resolve, fail) => {
      let request: ClientRequest | undefined, incoming: IncomingMessage | undefined;
      let settled = false, entered = false;
      let timer: ReturnType<typeof setTimeout> | undefined;
      const cleanup = () => { if (timer) clearTimeout(timer); signal.removeEventListener("abort", abort); };
      const finish = (response?: Response) => {
        if (settled) return;
        settled = true; cleanup();
        // Close this one request/socket only. There is no replacement request path.
        incoming?.destroy(); request?.destroy();
        if (response) resolve(response); else fail(new HiggsfieldTransportError(null, entered));
      };
      const abort = () => finish();
      const receive = (message: IncomingMessage) => {
        incoming = message;
        if (settled) { message.destroy(); return; }
        message.on("error", abort); message.on("aborted", abort);
        const status = message.statusCode;
        if (!status || status < 200 || status > 599) { finish(); return; }
        const safeHeaders: Record<string, string> = {};
        try {
          const value = message.headers["x-correlation-id"];
          if (typeof value === "string" && !headers.Authorization.slice(4).split(":").some(part => value.includes(part))) {
            safeHeaders["X-Correlation-ID"] = safeEstimateCorrelation(value)!;
          }
        } catch { /* Raw provider headers never escape. */ }
        if (status !== 200) { finish(new Response(null, { status, headers: safeHeaders })); return; }
        const chunks: Buffer[] = []; let size = 0;
        message.on("data", (chunk: Buffer) => {
          if (settled) return;
          size += chunk.byteLength;
          if (size > MAX_BYTES) { finish(); return; }
          chunks.push(chunk);
        });
        message.on("end", () => {
          if (settled) return;
          if (!message.complete) { finish(); return; }
          try { finish(new Response(new Uint8Array(Buffer.concat(chunks, size)), { status, headers: safeHeaders })); }
          catch { finish(); }
        });
      };
      try {
        if (signal.aborted) { finish(); return; }
        signal.addEventListener("abort", abort, { once: true });
        timer = setTimeout(abort, DEADLINE_MS);
        // This is the irreversible boundary. All construction data was checked above.
        // A failure after here is ambiguous even if no peer has observed request bytes.
        entered = true; onTransportEntered?.();
        request = requestFactory(target, {
          method: "POST",
          headers: { ...headers, "Content-Length": Buffer.byteLength(body, "utf8"), Connection: "close" },
          agent: false, autoSelectFamily: false, maxHeaderSize: MAX_BYTES,
          rejectUnauthorized: true,
        }, receive);
        observe("request-created");
        request.on("error", abort);
        request.once("socket", () => observe("socket-assigned"));
        if (settled) { request.destroy(); return; }
        request.end(body);
        observe("request-ended");
      } catch { finish(); }
    });
  };
  coreWires.add(wire);
  return wire;
}

export const sendHiggsfieldEstimateOnce: EstimateWire = createHiggsfieldEstimateWire();
