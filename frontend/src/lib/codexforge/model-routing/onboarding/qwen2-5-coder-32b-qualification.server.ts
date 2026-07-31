import "server-only";

import {
  CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_CONTENT_SHA256,
  CODEXFORGE_QWEN25_CODER_32B_EVIDENCE_ARTIFACT_SHA256,
  CODEXFORGE_QWEN25_CODER_32B_FULL_DIGEST,
  CODEXFORGE_QWEN25_CODER_32B_INSTALLED_CANDIDATE,
  CODEXFORGE_QWEN25_CODER_32B_MODEL_ID,
  CODEXFORGE_QWEN25_CODER_32B_MODEL_KEY,
  CODEXFORGE_QWEN25_CODER_32B_PROVIDER_KEY,
  validateCodexForgeQwen25Coder32BInstalledCandidate,
} from "./qwen2-5-coder-32b-installed-candidate.server";
import {
  calculateCodexForgeQwen25Coder32BContentDigest,
  calculateCodexForgeQwen25Coder32BSliceRDigest,
  freezeCodexForgeQwen25Coder32BSliceRValue,
  sha256CodexForgeQwen25Coder32BUtf8,
} from "./qwen2-5-coder-32b-qualification-live-acceptance-canonicalization.server";
import {
  CODEXFORGE_QWEN25_CODER_32B_QUALIFICATION_REJECTION_CODES,
  type CodexForgeQwen25Coder32BExactIdentity,
  type CodexForgeQwen25Coder32BQualificationEvidence,
  type CodexForgeQwen25Coder32BQualificationRejectionCode,
  type CodexForgeQwen25Coder32BQualificationResult,
} from "./qwen2-5-coder-32b-qualification-live-acceptance-types";

export const CODEXFORGE_QWEN25_CODER_32B_OLLAMA_ORIGIN =
  "http://127.0.0.1:11434" as const;
export const CODEXFORGE_QWEN25_CODER_32B_TAGS_PATH = "/api/tags" as const;
export const CODEXFORGE_QWEN25_CODER_32B_SHOW_PATH = "/api/show" as const;
export const CODEXFORGE_QWEN25_CODER_32B_SHOW_BODY = Object.freeze({
  model: CODEXFORGE_QWEN25_CODER_32B_MODEL_ID,
  verbose: false,
} as const);
export const CODEXFORGE_QWEN25_CODER_32B_METADATA_RESPONSE_MAXIMUM_BYTES =
  262_144 as const;
export const CODEXFORGE_QWEN25_CODER_32B_METADATA_REQUEST_TIMEOUT_MS =
  5_000 as const;
export const CODEXFORGE_QWEN25_CODER_32B_QUALIFICATION_TOTAL_TIMEOUT_MS =
  10_000 as const;
export const CODEXFORGE_QWEN25_CODER_32B_QUALIFICATION_VALIDITY_MS =
  15 * 60 * 1_000;

export const CODEXFORGE_QWEN25_CODER_32B_EXACT_IDENTITY = Object.freeze({
  providerId: CODEXFORGE_QWEN25_CODER_32B_PROVIDER_KEY,
  modelId: CODEXFORGE_QWEN25_CODER_32B_MODEL_ID,
  modelKey: CODEXFORGE_QWEN25_CODER_32B_MODEL_KEY,
  installedDigestSha256: CODEXFORGE_QWEN25_CODER_32B_FULL_DIGEST,
  declarationEvidenceSha256:
    CODEXFORGE_QWEN25_CODER_32B_EVIDENCE_ARTIFACT_SHA256,
  candidateContentSha256: CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_CONTENT_SHA256,
  dataBoundary: "local-machine",
  maximumCandidateOutputTokens: 4096,
  automaticDownloadAllowed: false,
  paidExecutionAllowed: false,
} satisfies CodexForgeQwen25Coder32BExactIdentity);

const EXPECTED_TAG_METADATA = Object.freeze({
  name: CODEXFORGE_QWEN25_CODER_32B_MODEL_ID,
  model: CODEXFORGE_QWEN25_CODER_32B_MODEL_ID,
  digest: CODEXFORGE_QWEN25_CODER_32B_FULL_DIGEST,
  size: 19_851_349_898,
  modified_at: "2026-03-04T19:06:19.4791617Z",
  details: {
    format: "gguf",
    family: "qwen2",
    families: ["qwen2"],
    parameter_size: "32.8B",
    quantization_level: "Q4_K_M",
  },
} as const);

const EXPECTED_SHOW_METADATA = Object.freeze({
  details: {
    format: "gguf",
    family: "qwen2",
    families: ["qwen2"],
    parameter_size: "32.8B",
    quantization_level: "Q4_K_M",
  },
  capabilities: ["completion", "tools", "insert"],
  parameterCount: 32_763_876_352,
  contextLengthTokens: 32_768,
  embeddingLength: 5_120,
  content: {
    template: {
      sha256: "1e65450c30670713aa47fe23e8b9662bdf4065e81cc8e3cbfaa98924fcc0d320",
      utf8Bytes: 1_615,
    },
    parameters: null,
    license: {
      sha256: "832dd9e00a68dd83b3c3fb9f5588dad7dcf337a0db50f7d9483f310cd292e92e",
      utf8Bytes: 11_343,
    },
    system: {
      sha256: "66b9ea09bd5b7099cbb4fc820f31b575c0366fa439b08245566692c6784e281e",
      utf8Bytes: 68,
    },
    modelfile: {
      sha256: "a6965de38f838ed1483c856796f955ccfbe040939c4ea8802601987f979a65e7",
      utf8Bytes: 13_303,
    },
  },
} as const);

type SafeRecord = Record<string, unknown>;
type FetchLike = typeof fetch;

class QualificationTransportError extends Error {
  readonly code: CodexForgeQwen25Coder32BQualificationRejectionCode;
  constructor(code: CodexForgeQwen25Coder32BQualificationRejectionCode) {
    super(code);
    this.name = "QualificationTransportError";
    this.code = code;
  }
}

function isRecord(value: unknown): value is SafeRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function orderedCodes(
  codes: readonly CodexForgeQwen25Coder32BQualificationRejectionCode[]
): readonly CodexForgeQwen25Coder32BQualificationRejectionCode[] {
  const order = new Map(
    CODEXFORGE_QWEN25_CODER_32B_QUALIFICATION_REJECTION_CODES.map(
      (code, index) => [code, index]
    )
  );
  return Object.freeze(
    [...new Set(codes)].sort(
      (left, right) =>
        (order.get(left) ?? Number.MAX_SAFE_INTEGER) -
        (order.get(right) ?? Number.MAX_SAFE_INTEGER)
    )
  );
}

function rejectQualification(
  codes: readonly CodexForgeQwen25Coder32BQualificationRejectionCode[],
  canceled = false
): CodexForgeQwen25Coder32BQualificationResult {
  return freezeCodexForgeQwen25Coder32BSliceRValue({
    ok: false,
    rejection: {
      schemaVersion:
        "codexforge-qwen2-5-coder-32b-qualification-rejection-v1",
      qualificationState: canceled ? "canceled" : "rejected",
      codes: orderedCodes(codes),
    },
  } as const);
}

function isAbortError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as { name?: unknown }).name === "AbortError"
  );
}

async function readResponseWithLimit(
  response: Response,
  maximumBytes: number
): Promise<{ json: unknown; utf8Bytes: number }> {
  if (!response.body) {
    throw new QualificationTransportError("metadata-malformed-response");
  }
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const chunk = await reader.read();
    if (chunk.done) break;
    total += chunk.value.byteLength;
    if (total > maximumBytes) {
      await reader.cancel();
      throw new QualificationTransportError("metadata-response-too-large");
    }
    chunks.push(chunk.value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return { json: JSON.parse(new TextDecoder().decode(bytes)), utf8Bytes: total };
  } catch {
    throw new QualificationTransportError("metadata-malformed-response");
  }
}

async function requestMetadata(
  fetchFn: FetchLike,
  pathname: typeof CODEXFORGE_QWEN25_CODER_32B_TAGS_PATH | typeof CODEXFORGE_QWEN25_CODER_32B_SHOW_PATH,
  init: RequestInit,
  callerSignal: AbortSignal | undefined
): Promise<unknown> {
  if (callerSignal?.aborted) {
    throw new QualificationTransportError("qualification-canceled");
  }
  const controller = new AbortController();
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, CODEXFORGE_QWEN25_CODER_32B_METADATA_REQUEST_TIMEOUT_MS);
  const cancel = () => controller.abort();
  callerSignal?.addEventListener("abort", cancel, { once: true });
  try {
    const response = await fetchFn(
      new URL(pathname, CODEXFORGE_QWEN25_CODER_32B_OLLAMA_ORIGIN),
      { ...init, redirect: "error", signal: controller.signal }
    );
    if (!response.ok) {
      throw new QualificationTransportError("ollama-http-failure");
    }
    return (
      await readResponseWithLimit(
        response,
        CODEXFORGE_QWEN25_CODER_32B_METADATA_RESPONSE_MAXIMUM_BYTES
      )
    ).json;
  } catch (error) {
    if (error instanceof QualificationTransportError) throw error;
    if (isAbortError(error)) {
      throw new QualificationTransportError(
        timedOut ? "ollama-timeout" : "qualification-canceled"
      );
    }
    throw new QualificationTransportError("ollama-unavailable");
  } finally {
    clearTimeout(timeout);
    callerSignal?.removeEventListener("abort", cancel);
  }
}

function sameJson(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function digestContent(value: unknown): { sha256: string; utf8Bytes: number } | null {
  if (typeof value !== "string") return null;
  return {
    sha256: sha256CodexForgeQwen25Coder32BUtf8(value),
    utf8Bytes: Buffer.byteLength(value, "utf8"),
  };
}

function extractQualificationMetadata(
  tagsPayload: unknown,
  showPayload: unknown
):
  | { ok: true; value: unknown }
  | { ok: false; code: CodexForgeQwen25Coder32BQualificationRejectionCode } {
  if (!isRecord(tagsPayload) || !Array.isArray(tagsPayload.models)) {
    return { ok: false, code: "metadata-malformed-response" };
  }
  const entries = tagsPayload.models.filter(isRecord);
  if (entries.length !== tagsPayload.models.length) {
    return { ok: false, code: "metadata-malformed-response" };
  }
  const matching = entries.filter(
    (entry) =>
      entry.name === CODEXFORGE_QWEN25_CODER_32B_MODEL_ID ||
      entry.model === CODEXFORGE_QWEN25_CODER_32B_MODEL_ID
  );
  if (matching.length === 0) {
    const digestUnderDifferentName = entries.some(
      (entry) => entry.digest === CODEXFORGE_QWEN25_CODER_32B_FULL_DIGEST
    );
    return {
      ok: false,
      code: digestUnderDifferentName ? "model-name-mismatch" : "model-missing",
    };
  }
  if (matching.length !== 1) {
    return { ok: false, code: "duplicate-model-entry" };
  }
  const tag = matching[0];
  if (
    tag.name !== CODEXFORGE_QWEN25_CODER_32B_MODEL_ID ||
    tag.model !== CODEXFORGE_QWEN25_CODER_32B_MODEL_ID
  ) {
    return { ok: false, code: "model-name-mismatch" };
  }
  if (tag.digest !== CODEXFORGE_QWEN25_CODER_32B_FULL_DIGEST) {
    return { ok: false, code: "installed-digest-mismatch" };
  }
  const tagProjection = {
    name: tag.name,
    model: tag.model,
    digest: tag.digest,
    size: tag.size,
    modified_at: tag.modified_at,
    details: tag.details,
  };
  if (!sameJson(tagProjection, EXPECTED_TAG_METADATA)) {
    return { ok: false, code: "metadata-mismatch" };
  }
  if (!isRecord(showPayload) || !isRecord(showPayload.model_info)) {
    return { ok: false, code: "metadata-malformed-response" };
  }
  if (!sameJson(showPayload.capabilities, EXPECTED_SHOW_METADATA.capabilities)) {
    return { ok: false, code: "unsupported-capability-metadata" };
  }
  const parameters =
    showPayload.parameters === null ||
    showPayload.parameters === undefined ||
    showPayload.parameters === ""
      ? null
      : digestContent(showPayload.parameters);
  const showProjection = {
    details: showPayload.details,
    capabilities: showPayload.capabilities,
    parameterCount: showPayload.model_info["general.parameter_count"],
    contextLengthTokens: showPayload.model_info["qwen2.context_length"],
    embeddingLength: showPayload.model_info["qwen2.embedding_length"],
    content: {
      template: digestContent(showPayload.template),
      parameters,
      license: digestContent(showPayload.license),
      system: digestContent(showPayload.system),
      modelfile: digestContent(showPayload.modelfile),
    },
  };
  if (!sameJson(showProjection, EXPECTED_SHOW_METADATA)) {
    return { ok: false, code: "metadata-mismatch" };
  }
  return { ok: true, value: { tag: tagProjection, show: showProjection } };
}

function validateCandidateBinding(
  candidate: unknown
): CodexForgeQwen25Coder32BQualificationRejectionCode | null {
  const validation = validateCodexForgeQwen25Coder32BInstalledCandidate(candidate);
  if (validation.ok) return null;
  if (validation.rejection.codes.includes("artifact-digest-mismatch")) {
    return "candidate-evidence-digest-mismatch";
  }
  if (validation.rejection.codes.includes("content-digest-mismatch")) {
    return "candidate-content-digest-mismatch";
  }
  return "candidate-declaration-invalid";
}

export type CodexForgeQwen25Coder32BQualificationOptions = Readonly<{
  fetchFn?: FetchLike;
  signal?: AbortSignal;
  now?: () => string;
  candidate?: unknown;
}>;

function buildQualificationEvidence(
  normalizedMetadata: unknown,
  observedAt: string
): CodexForgeQwen25Coder32BQualificationResult {
  try {
    const observedMilliseconds = Date.parse(observedAt);
    if (!Number.isFinite(observedMilliseconds)) throw new Error("invalid time");
    const draft = {
      schemaVersion:
        "codexforge-qwen2-5-coder-32b-qualification-evidence-v1",
      qualificationState: "qualified",
      identity: CODEXFORGE_QWEN25_CODER_32B_EXACT_IDENTITY,
      qualifiedCapabilities: ["text-generation"],
      metadataRequestCount: 2,
      generationAttemptCount: 0,
      observedMetadataDigest:
        calculateCodexForgeQwen25Coder32BSliceRDigest(normalizedMetadata),
      observedAt,
      validUntil: new Date(
        observedMilliseconds + CODEXFORGE_QWEN25_CODER_32B_QUALIFICATION_VALIDITY_MS
      ).toISOString(),
      rawMetadataStored: false,
    } as const;
    return freezeCodexForgeQwen25Coder32BSliceRValue({
      ok: true,
      value: {
        ...draft,
        contentDigest: calculateCodexForgeQwen25Coder32BContentDigest(draft),
      } satisfies CodexForgeQwen25Coder32BQualificationEvidence,
    });
  } catch {
    return rejectQualification(["qualification-evidence-construction-failed"]);
  }
}

export async function qualifyCodexForgeQwen25Coder32BInstalledCandidate(
  options: CodexForgeQwen25Coder32BQualificationOptions = {}
): Promise<CodexForgeQwen25Coder32BQualificationResult> {
  const candidate = options.candidate ?? CODEXFORGE_QWEN25_CODER_32B_INSTALLED_CANDIDATE;
  const candidateFailure = validateCandidateBinding(candidate);
  if (candidateFailure) return rejectQualification([candidateFailure]);
  if (options.signal?.aborted) {
    return rejectQualification(["qualification-canceled"], true);
  }

  const startedAt = Date.now();
  try {
    const tagsPayload = await requestMetadata(
      options.fetchFn ?? fetch,
      CODEXFORGE_QWEN25_CODER_32B_TAGS_PATH,
      { method: "GET", headers: { Accept: "application/json" } },
      options.signal
    );
    if (Date.now() - startedAt >= CODEXFORGE_QWEN25_CODER_32B_QUALIFICATION_TOTAL_TIMEOUT_MS) {
      return rejectQualification(["ollama-timeout"]);
    }
    const showPayload = await requestMetadata(
      options.fetchFn ?? fetch,
      CODEXFORGE_QWEN25_CODER_32B_SHOW_PATH,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(CODEXFORGE_QWEN25_CODER_32B_SHOW_BODY),
      },
      options.signal
    );
    const extracted = extractQualificationMetadata(tagsPayload, showPayload);
    if (!extracted.ok) return rejectQualification([extracted.code]);

    return buildQualificationEvidence(
      extracted.value,
      (options.now ?? (() => new Date().toISOString()))()
    );
  } catch (error) {
    if (error instanceof QualificationTransportError) {
      return rejectQualification(
        [error.code],
        error.code === "qualification-canceled"
      );
    }
    return rejectQualification(["ollama-unavailable"]);
  }
}

export function qualifyCodexForgeQwen25Coder32BNormalizedMetadataForTesting(input: Readonly<{
  normalizedMetadata: unknown;
  now: string;
  candidate?: unknown;
}>): CodexForgeQwen25Coder32BQualificationResult {
  const candidateFailure = validateCandidateBinding(
    input.candidate ?? CODEXFORGE_QWEN25_CODER_32B_INSTALLED_CANDIDATE
  );
  if (candidateFailure) return rejectQualification([candidateFailure]);
  const expected = { tag: EXPECTED_TAG_METADATA, show: EXPECTED_SHOW_METADATA };
  if (!sameJson(input.normalizedMetadata, expected)) {
    return rejectQualification(["metadata-mismatch"]);
  }
  return buildQualificationEvidence(input.normalizedMetadata, input.now);
}

export function getCodexForgeQwen25Coder32BExpectedQualificationMetadata(): Readonly<{
  tag: unknown;
  show: unknown;
}> {
  return freezeCodexForgeQwen25Coder32BSliceRValue({
    tag: EXPECTED_TAG_METADATA,
    show: EXPECTED_SHOW_METADATA,
  });
}
