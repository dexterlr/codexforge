import "server-only";
import { isHiggsfieldEstimateWire, sendHiggsfieldEstimateOnce, type EstimateWire } from "./higgsfield-estimate-wire.server";
import { assertCreatorJsonHasUniqueObjectKeys } from "../creator/creator-contract.server";
import { HIGGSFIELD_CONTRACT, readHiggsfieldConfiguration, validateHiggsfieldRequest, normalizeHiggsfieldEstimate, type HiggsfieldPreparedRequest } from "./higgsfield-contract.server";
import { ESTIMATE_ENDPOINT, estimateResponseCorrelation } from "./higgsfield-estimate-intent";
import { consumeLiveEstimateDispatch } from "./higgsfield-estimate-authority.server";
import { DisabledHiggsfieldTransport, HiggsfieldTransportError, type HiggsfieldTransport, type HiggsfieldTransportResponse } from "./higgsfield-transport.server";

export class EstimateTransportBlock extends HiggsfieldTransportError {
  constructor(readonly code: "ESTIMATE_EXECUTION_NOT_AUTHORIZED" | "LOCAL_CREDENTIAL_CONFIGURATION_MISSING" | "LOCAL_CREDENTIAL_CONFIGURATION_INVALID") { super(null, false); }
}
const MAX_RESPONSE_BYTES = 16_384;
async function boundedBody(response: Response): Promise<unknown> {
  if (!response.body) throw new Error("ESTIMATE_RESPONSE_REJECTED");
  const reader = response.body.getReader(), chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const item = await reader.read(); if (item.done) break;
      size += item.value.byteLength;
      if (size > MAX_RESPONSE_BYTES) throw new Error("ESTIMATE_RESPONSE_REJECTED");
      chunks.push(item.value);
    }
    const bytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    assertCreatorJsonHasUniqueObjectKeys(text);
    return JSON.parse(text);
  } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
}
/** Official REST contract retained in Phase 2A.1. No constructor/import-time I/O.
 * The model-specific estimate mapping is CANDIDATE / NOT REMOTELY VERIFIED.
 * Wire and lookup injection are server-owned; never selected by HTTP input.
 */
export class RealHiggsfieldEstimateTransport implements HiggsfieldTransport {
  readonly kind = "LIVE_ESTIMATE" as const;
  private readonly disabled = new DisabledHiggsfieldTransport();
  constructor(
    private readonly lookup: (name: "HF_CREDENTIALS") => unknown = name => process.env[name],
    private readonly wire?: EstimateWire,
  ) {}
  async estimate(request: HiggsfieldPreparedRequest, options?: { signal: AbortSignal; authority?: object; onTransportEntered?: () => void }): Promise<HiggsfieldTransportResponse> {
    // No configuration lookup, serialization of authentication, or wire access before authority.
    let clean: HiggsfieldPreparedRequest;
    try { clean = validateHiggsfieldRequest(request); consumeLiveEstimateDispatch(options?.authority, clean); }
    catch { throw new EstimateTransportBlock("ESTIMATE_EXECUTION_NOT_AUTHORIZED"); }
    let credential: unknown;
    const configuration = readHiggsfieldConfiguration(name => { credential = this.lookup(name); return credential; });
    if (configuration.configuration !== "LOCALLY_CONFIGURED") throw new EstimateTransportBlock(configuration.configuration === "NOT_CONFIGURED" ? "LOCAL_CREDENTIAL_CONFIGURATION_MISSING" : "LOCAL_CREDENTIAL_CONFIGURATION_INVALID");
    if (!options?.signal || options.signal.aborted) throw new HiggsfieldTransportError(null, false);
    // No redirects, fallback route, retries, remote auth probe, or non-estimate primitive.
    let entered = false;
    try {
      const init: RequestInit = {
        method: "POST", headers: { Authorization: `Key ${credential as string}`, "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(clean.input), redirect: "error", credentials: "omit", cache: "no-store", signal: options.signal,
      };
      // Irreversible observation is adjacent to the wire, after all request construction.
      const transportEntered = () => { entered = true; options.onTransportEntered?.(); };
      // Existing constructor-only synthetic seams retain their observation boundary.
      // Production uses the core wire's post-validation/pre-request boundary.
      if (this.wire && !isHiggsfieldEstimateWire(this.wire)) transportEntered();
      const response = await (this.wire ?? sendHiggsfieldEstimateOnce)(HIGGSFIELD_CONTRACT.apiOrigin + ESTIMATE_ENDPOINT, init, transportEntered);
      let correlationId: string | null = null;
      try { correlationId = estimateResponseCorrelation({ "X-Correlation-ID": response.headers.get("X-Correlation-ID") }); } catch { /* No untrusted header payload escapes. */ }
      if (correlationId && (credential as string).split(":").some(part => correlationId!.includes(part))) correlationId = null;
      const headers: Record<string, string> = correlationId === null ? {} : { "X-Correlation-ID": correlationId };
      if (response.status !== 200) {
        await response.body?.cancel().catch(() => {});
        return { status: response.status, headers, body: null };
      }
      const quote = normalizeHiggsfieldEstimate(await boundedBody(response), clean.requestDigest);
      if ((credential as string).split(":").some(part => quote.credits.includes(part) || quote.usd.includes(part))) throw new Error("ESTIMATE_RESPONSE_REJECTED");
      return { status: response.status, headers, body: { credits: quote.credits, usd: quote.usd } };
    } catch {
      // Once wire is entered, uncertainty is never relabeled as a safe-to-retry pre-send failure.
      throw new HiggsfieldTransportError(null, entered);
    } finally { credential = undefined; }
  }
  submit() { return this.disabled.submit(); }
  status() { return this.disabled.status(); }
  cancel() { return this.disabled.cancel(); }
  createUpload() { return this.disabled.createUpload(); }
  upload() { return this.disabled.upload(); }
  download() { return this.disabled.download(); }
}
