import "server-only";

import { open } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { readPrivateAlphaKillSwitchState } from "../../private-alpha/private-alpha-kill-switch.server";
import {
  calculateCodexForgeQwen25Coder32BContentDigest,
  canonicalizeCodexForgeQwen25Coder32BSliceRValue,
  freezeCodexForgeQwen25Coder32BSliceRValue,
  sha256CodexForgeQwen25Coder32BUtf8,
} from "./qwen2-5-coder-32b-qualification-live-acceptance-canonicalization.server";
import {
  CODEXFORGE_QWEN25_CODER_32B_EXACT_IDENTITY,
  CODEXFORGE_QWEN25_CODER_32B_OLLAMA_ORIGIN,
  qualifyCodexForgeQwen25Coder32BInstalledCandidate,
} from "./qwen2-5-coder-32b-qualification.server";
import {
  CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_REJECTION_CODES,
  CODEXFORGE_QWEN25_CODER_32B_EVIDENCE_ADMISSION_REJECTION_CODES,
  type CodexForgeQwen25Coder32BAcceptanceApproval,
  type CodexForgeQwen25Coder32BAcceptanceContract,
  type CodexForgeQwen25Coder32BAcceptanceRejectionCode,
  type CodexForgeQwen25Coder32BAcceptanceResult,
  type CodexForgeQwen25Coder32BEvidenceAdmission,
  type CodexForgeQwen25Coder32BEvidenceAdmissionRejectionCode,
  type CodexForgeQwen25Coder32BEvidenceAdmissionResult,
  type CodexForgeQwen25Coder32BLiveAcceptanceEvidence,
  type CodexForgeQwen25Coder32BQualificationEvidence,
} from "./qwen2-5-coder-32b-qualification-live-acceptance-types";

export const CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_PROMPT =
  "Return exactly this single line of ASCII TypeScript and nothing else: export const codexForgeSliceR = 32;" as const;
export const CODEXFORGE_QWEN25_CODER_32B_EXPECTED_OUTPUT =
  "export const codexForgeSliceR = 32;" as const;
export const CODEXFORGE_QWEN25_CODER_32B_CHAT_PATH = "/api/chat" as const;
export const CODEXFORGE_QWEN25_CODER_32B_APPROVAL_MAXIMUM_VALIDITY_MS =
  10 * 60 * 1_000;

export const CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_CONTRACT =
  freezeCodexForgeQwen25Coder32BSliceRValue({
    promptId: "codexforge-qwen2-5-coder-32b-typescript-marker-v1",
    prompt: CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_PROMPT,
    promptUtf8Bytes: 105,
    promptSha256:
      "25c5194982f30559a885a007c3bff63c3a8d2f32aec19dbec9c410882443cd30",
    expectedOutput: CODEXFORGE_QWEN25_CODER_32B_EXPECTED_OUTPUT,
    expectedOutputUtf8Bytes: 35,
    expectedOutputSha256:
      "e8bbd494ebcb4bb38f634493cc98b09a379f31a2a7b970592495a09e483c95e1",
    maximumPromptUtf8Bytes: 128,
    maximumOutputTokens: 64,
    maximumOutputUtf8Bytes: 256,
    maximumResponseBytes: 65_536,
    timeoutMs: 300_000,
  } satisfies CodexForgeQwen25Coder32BAcceptanceContract);

type FetchLike = typeof fetch;
type SafeRecord = Record<string, unknown>;

export type CodexForgeQwen25Coder32BKillSwitchReader = () => Promise<
  Readonly<{ killSwitchEngaged: boolean }>
>;

export type CodexForgeQwen25Coder32BApprovalConsumptionStore = Readonly<{
  consume: (
    approvalDigestSha256: string
  ) => Promise<"consumed" | "already-consumed" | "attempt-budget-exhausted">;
}>;

class AcceptanceTransportError extends Error {
  readonly code: CodexForgeQwen25Coder32BAcceptanceRejectionCode;
  readonly responseUtf8Bytes: number;
  constructor(
    code: CodexForgeQwen25Coder32BAcceptanceRejectionCode,
    responseUtf8Bytes = 0
  ) {
    super(code);
    this.name = "AcceptanceTransportError";
    this.code = code;
    this.responseUtf8Bytes = responseUtf8Bytes;
  }
}

function isRecord(value: unknown): value is SafeRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sameJson(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function lowerHex64(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function orderedAcceptanceCodes(
  codes: readonly CodexForgeQwen25Coder32BAcceptanceRejectionCode[]
): readonly CodexForgeQwen25Coder32BAcceptanceRejectionCode[] {
  const order = new Map(
    CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_REJECTION_CODES.map(
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

function rejectAcceptance(
  codes: readonly CodexForgeQwen25Coder32BAcceptanceRejectionCode[],
  generationAttemptCount: 0 | 1,
  approvalConsumed: boolean,
  canceled = false
): CodexForgeQwen25Coder32BAcceptanceResult {
  return freezeCodexForgeQwen25Coder32BSliceRValue({
    ok: false,
    rejection: {
      schemaVersion:
        "codexforge-qwen2-5-coder-32b-acceptance-rejection-v1",
      acceptanceState: canceled ? "canceled" : "rejected",
      codes: orderedAcceptanceCodes(codes),
      generationAttemptCount,
      approvalConsumed,
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

function validateContract(
  contract: CodexForgeQwen25Coder32BAcceptanceContract
): CodexForgeQwen25Coder32BAcceptanceRejectionCode | null {
  const expected = CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_CONTRACT;
  if (
    contract.promptId !== expected.promptId ||
    contract.prompt !== expected.prompt ||
    contract.promptUtf8Bytes !== expected.promptUtf8Bytes ||
    contract.promptSha256 !== expected.promptSha256 ||
    contract.expectedOutput !== expected.expectedOutput ||
    contract.expectedOutputUtf8Bytes !== expected.expectedOutputUtf8Bytes ||
    contract.expectedOutputSha256 !== expected.expectedOutputSha256 ||
    Buffer.byteLength(contract.prompt, "utf8") !== expected.promptUtf8Bytes ||
    sha256CodexForgeQwen25Coder32BUtf8(contract.prompt) !== expected.promptSha256
  ) {
    return "acceptance-prompt-mismatch";
  }
  if (
    contract.maximumPromptUtf8Bytes !== 128 ||
    contract.maximumOutputTokens !== 64 ||
    contract.maximumOutputUtf8Bytes !== 256 ||
    contract.maximumResponseBytes !== 65_536 ||
    contract.timeoutMs !== 300_000
  ) {
    return "acceptance-envelope-mismatch";
  }
  return null;
}

function qualificationDigestValid(
  qualification: CodexForgeQwen25Coder32BQualificationEvidence
): boolean {
  try {
    return (
      qualification.qualificationState === "qualified" &&
      sameJson(qualification.identity, CODEXFORGE_QWEN25_CODER_32B_EXACT_IDENTITY) &&
      qualification.contentDigest.sha256 ===
        calculateCodexForgeQwen25Coder32BContentDigest(qualification).sha256
    );
  } catch {
    return false;
  }
}

function validateApproval(
  approval: CodexForgeQwen25Coder32BAcceptanceApproval,
  qualification: CodexForgeQwen25Coder32BQualificationEvidence,
  nowMilliseconds: number
): CodexForgeQwen25Coder32BAcceptanceRejectionCode | null {
  try {
    canonicalizeCodexForgeQwen25Coder32BSliceRValue(approval);
    if (
      approval.schemaVersion !==
        "codexforge-qwen2-5-coder-32b-acceptance-approval-v1" ||
      !approval.approvalId ||
      !/^[a-f0-9]{32,128}$/.test(approval.approvalNonce) ||
      approval.contentDigest.sha256 !==
        calculateCodexForgeQwen25Coder32BContentDigest(approval).sha256
    ) {
      return "acceptance-approval-malformed";
    }
  } catch {
    return "acceptance-approval-malformed";
  }
  const approvedAt = Date.parse(approval.approvedAt);
  const expiresAt = Date.parse(approval.expiresAt);
  if (
    !Number.isFinite(approvedAt) ||
    !Number.isFinite(expiresAt) ||
    expiresAt <= approvedAt ||
    expiresAt - approvedAt > CODEXFORGE_QWEN25_CODER_32B_APPROVAL_MAXIMUM_VALIDITY_MS ||
    nowMilliseconds > expiresAt ||
    approvedAt < Date.parse(qualification.observedAt)
  ) {
    return "acceptance-approval-expired";
  }
  if (
    approval.candidateContentSha256 !==
      CODEXFORGE_QWEN25_CODER_32B_EXACT_IDENTITY.candidateContentSha256 ||
    approval.qualificationEvidenceSha256 !== qualification.contentDigest.sha256 ||
    approval.promptId !== CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_CONTRACT.promptId ||
    approval.maximumOutputTokens !== 64 ||
    approval.timeoutMs !== 300_000 ||
    approval.maximumProviderAttempts !== 1 ||
    approval.localOnlyAcknowledgement !== "approved-local-machine-only" ||
    approval.singleAttemptAcknowledgement !==
      "approved-one-generation-attempt-with-no-retry-or-fallback" ||
    approval.redactedEvidenceAcknowledgement !== "approved-redacted-evidence-only"
  ) {
    return "acceptance-approval-scope-mismatch";
  }
  return null;
}

export function createCodexForgeQwen25Coder32BAcceptanceApproval(input: Readonly<{
  approvalId: string;
  approvalNonce: string;
  approvedAt: string;
  expiresAt: string;
  qualificationEvidenceSha256: string;
}>): CodexForgeQwen25Coder32BAcceptanceApproval {
  const draft = {
    schemaVersion: "codexforge-qwen2-5-coder-32b-acceptance-approval-v1",
    approvalId: input.approvalId,
    approvalNonce: input.approvalNonce,
    approvedAt: input.approvedAt,
    expiresAt: input.expiresAt,
    candidateContentSha256:
      CODEXFORGE_QWEN25_CODER_32B_EXACT_IDENTITY.candidateContentSha256,
    qualificationEvidenceSha256: input.qualificationEvidenceSha256,
    promptId: CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_CONTRACT.promptId,
    maximumOutputTokens: 64,
    timeoutMs: 300_000,
    maximumProviderAttempts: 1,
    localOnlyAcknowledgement: "approved-local-machine-only",
    singleAttemptAcknowledgement:
      "approved-one-generation-attempt-with-no-retry-or-fallback",
    redactedEvidenceAcknowledgement: "approved-redacted-evidence-only",
  } as const;
  return freezeCodexForgeQwen25Coder32BSliceRValue({
    ...draft,
    contentDigest: calculateCodexForgeQwen25Coder32BContentDigest(draft),
  });
}

async function readGenerationResponse(
  response: Response,
  maximumBytes: number
): Promise<{ payload: unknown; utf8Bytes: number }> {
  if (!response.body) {
    throw new AcceptanceTransportError("malformed-generation-response");
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
      throw new AcceptanceTransportError("generation-response-too-large", total);
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
    return { payload: JSON.parse(new TextDecoder().decode(bytes)), utf8Bytes: total };
  } catch {
    throw new AcceptanceTransportError("malformed-generation-response", total);
  }
}

async function generateOnce(
  fetchFn: FetchLike,
  signal: AbortSignal | undefined,
  contract: CodexForgeQwen25Coder32BAcceptanceContract,
  timeoutMs: number
): Promise<{ payload: unknown; requestUtf8Bytes: number; responseUtf8Bytes: number }> {
  if (signal?.aborted) throw new AcceptanceTransportError("acceptance-canceled");
  const body = JSON.stringify({
    model: CODEXFORGE_QWEN25_CODER_32B_EXACT_IDENTITY.modelId,
    messages: [{ role: "user", content: contract.prompt }],
    stream: false,
    options: { temperature: 0, seed: 0, num_predict: 64 },
  });
  const controller = new AbortController();
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const cancel = () => controller.abort();
  signal?.addEventListener("abort", cancel, { once: true });
  try {
    const response = await fetchFn(
      new URL(CODEXFORGE_QWEN25_CODER_32B_CHAT_PATH, CODEXFORGE_QWEN25_CODER_32B_OLLAMA_ORIGIN),
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body,
        redirect: "error",
        signal: controller.signal,
      }
    );
    if (!response.ok) throw new AcceptanceTransportError("ollama-http-failure");
    const parsed = await readGenerationResponse(response, contract.maximumResponseBytes);
    return {
      payload: parsed.payload,
      requestUtf8Bytes: Buffer.byteLength(body, "utf8"),
      responseUtf8Bytes: parsed.utf8Bytes,
    };
  } catch (error) {
    if (error instanceof AcceptanceTransportError) throw error;
    if (isAbortError(error)) {
      throw new AcceptanceTransportError(
        timedOut ? "ollama-timeout" : "acceptance-canceled"
      );
    }
    throw new AcceptanceTransportError("ollama-unavailable");
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", cancel);
  }
}

function parseGenerationPayload(
  payload: unknown,
  contract: CodexForgeQwen25Coder32BAcceptanceContract
):
  | { ok: false; code: CodexForgeQwen25Coder32BAcceptanceRejectionCode }
  | {
      ok: true;
      value: {
        outputSha256: string;
        outputUtf8Bytes: number;
        evalCount: number;
        doneReason: string;
        totalDurationNanoseconds: number | null;
        loadDurationNanoseconds: number | null;
        promptEvalCount: number | null;
      };
    } {
  if (!isRecord(payload)) return { ok: false, code: "malformed-generation-response" };
  if (payload.model !== CODEXFORGE_QWEN25_CODER_32B_EXACT_IDENTITY.modelId) {
    return { ok: false, code: "unexpected-model-substitution" };
  }
  if (payload.done !== true || !isRecord(payload.message) || payload.message.role !== "assistant") {
    return { ok: false, code: "malformed-generation-response" };
  }
  if (Object.prototype.hasOwnProperty.call(payload.message, "tool_calls")) {
    return { ok: false, code: "tool-call-response-rejected" };
  }
  if (Object.prototype.hasOwnProperty.call(payload.message, "images")) {
    return { ok: false, code: "image-response-rejected" };
  }
  if (typeof payload.message.content !== "string") {
    return { ok: false, code: "malformed-generation-response" };
  }
  if (payload.message.content.length === 0) return { ok: false, code: "empty-output" };
  const outputUtf8Bytes = Buffer.byteLength(payload.message.content, "utf8");
  if (outputUtf8Bytes > contract.maximumOutputUtf8Bytes) {
    return { ok: false, code: "oversized-output" };
  }
  if (
    typeof payload.eval_count !== "number" ||
    !Number.isSafeInteger(payload.eval_count) ||
    payload.eval_count < 0 ||
    payload.eval_count > contract.maximumOutputTokens
  ) {
    return { ok: false, code: "output-token-count-invalid" };
  }
  if (payload.message.content !== contract.expectedOutput) {
    return { ok: false, code: "acceptance-output-mismatch" };
  }
  if (typeof payload.done_reason !== "string" || payload.done_reason.length > 64) {
    return { ok: false, code: "malformed-generation-response" };
  }
  const optionalInteger = (value: unknown): number | null =>
    typeof value === "number" && Number.isSafeInteger(value) && value >= 0
      ? value
      : null;
  return {
    ok: true,
    value: {
      outputSha256: sha256CodexForgeQwen25Coder32BUtf8(payload.message.content),
      outputUtf8Bytes,
      evalCount: payload.eval_count,
      doneReason: payload.done_reason,
      totalDurationNanoseconds: optionalInteger(payload.total_duration),
      loadDurationNanoseconds: optionalInteger(payload.load_duration),
      promptEvalCount: optionalInteger(payload.prompt_eval_count),
    },
  };
}

function mapPreflightCode(code: string): CodexForgeQwen25Coder32BAcceptanceRejectionCode {
  if (code === "model-missing") return "preflight-model-missing";
  if (code === "model-name-mismatch" || code === "duplicate-model-entry") {
    return "preflight-model-name-mismatch";
  }
  if (code === "installed-digest-mismatch") {
    return "preflight-installed-digest-mismatch";
  }
  if (code === "ollama-timeout") return "ollama-timeout";
  if (code === "ollama-unavailable") return "ollama-unavailable";
  if (code === "ollama-http-failure") return "ollama-http-failure";
  if (code === "qualification-canceled") return "acceptance-canceled";
  return "preflight-metadata-mismatch";
}

export type CodexForgeQwen25Coder32BControlledAcceptanceInput = Readonly<{
  qualification: CodexForgeQwen25Coder32BQualificationEvidence | null;
  approval: CodexForgeQwen25Coder32BAcceptanceApproval | null;
  implementationCheckpointCommit: string;
  contract?: CodexForgeQwen25Coder32BAcceptanceContract;
}>;

export type CodexForgeQwen25Coder32BControlledAcceptanceOptions = Readonly<{
  fetchFn?: FetchLike;
  signal?: AbortSignal;
  now?: () => string;
  killSwitchReader?: CodexForgeQwen25Coder32BKillSwitchReader;
  approvalConsumptionStore: CodexForgeQwen25Coder32BApprovalConsumptionStore;
  qualificationRunner?: typeof qualifyCodexForgeQwen25Coder32BInstalledCandidate;
  generationTimeoutMsForTesting?: number;
}>;

export async function runCodexForgeQwen25Coder32BControlledLiveAcceptance(
  input: CodexForgeQwen25Coder32BControlledAcceptanceInput,
  options: CodexForgeQwen25Coder32BControlledAcceptanceOptions
): Promise<CodexForgeQwen25Coder32BAcceptanceResult> {
  if (!input.qualification) return rejectAcceptance(["qualification-required"], 0, false);
  if (!qualificationDigestValid(input.qualification)) {
    return rejectAcceptance(["qualification-evidence-mismatch"], 0, false);
  }
  const now = (options.now ?? (() => new Date().toISOString()))();
  const nowMilliseconds = Date.parse(now);
  if (!Number.isFinite(nowMilliseconds)) {
    return rejectAcceptance(["acceptance-evidence-construction-failed"], 0, false);
  }
  if (nowMilliseconds > Date.parse(input.qualification.validUntil)) {
    return rejectAcceptance(["qualification-expired"], 0, false);
  }
  if (!input.approval) {
    return rejectAcceptance(["acceptance-approval-required"], 0, false);
  }
  const contract = input.contract ?? CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_CONTRACT;
  const contractFailure = validateContract(contract);
  if (contractFailure) return rejectAcceptance([contractFailure], 0, false);
  const approvalFailure = validateApproval(
    input.approval,
    input.qualification,
    nowMilliseconds
  );
  if (approvalFailure) return rejectAcceptance([approvalFailure], 0, false);
  if (options.signal?.aborted) {
    return rejectAcceptance(["acceptance-canceled"], 0, false, true);
  }

  const killSwitchReader =
    options.killSwitchReader ?? readPrivateAlphaKillSwitchState;
  if ((await killSwitchReader()).killSwitchEngaged) {
    return rejectAcceptance(
      ["kill-switch-blocked-before-provider-resolution"],
      0,
      false
    );
  }

  const preflight = await (
    options.qualificationRunner ??
    qualifyCodexForgeQwen25Coder32BInstalledCandidate
  )({
    fetchFn: options.fetchFn ?? fetch,
    signal: options.signal,
    now: () => now,
  });
  if (!preflight.ok) {
    const code = mapPreflightCode(preflight.rejection.codes[0] ?? "metadata-mismatch");
    return rejectAcceptance([code], 0, false, code === "acceptance-canceled");
  }
  if (
    preflight.value.observedMetadataDigest.sha256 !==
    input.qualification.observedMetadataDigest.sha256
  ) {
    return rejectAcceptance(["preflight-metadata-mismatch"], 0, false);
  }

  const approvalDigest = input.approval.contentDigest.sha256;
  const consumption = await options.approvalConsumptionStore.consume(approvalDigest);
  if (consumption === "already-consumed") {
    return rejectAcceptance(["acceptance-approval-already-consumed"], 0, false);
  }
  if (consumption === "attempt-budget-exhausted") {
    return rejectAcceptance(["execution-attempt-budget-exhausted"], 0, false);
  }
  if ((await killSwitchReader()).killSwitchEngaged) {
    return rejectAcceptance(
      ["kill-switch-blocked-before-generation"],
      0,
      true
    );
  }

  let generated;
  try {
    generated = await generateOnce(
      options.fetchFn ?? fetch,
      options.signal,
      contract,
      options.generationTimeoutMsForTesting ?? contract.timeoutMs
    );
  } catch (error) {
    if (error instanceof AcceptanceTransportError) {
      return rejectAcceptance(
        [error.code],
        1,
        true,
        error.code === "acceptance-canceled"
      );
    }
    return rejectAcceptance(["ollama-unavailable"], 1, true);
  }
  const parsed = parseGenerationPayload(generated.payload, contract);
  if (!parsed.ok) return rejectAcceptance([parsed.code], 1, true);

  try {
    if (!/^[a-f0-9]{40}$/.test(input.implementationCheckpointCommit)) {
      throw new Error("invalid checkpoint");
    }
    const draft = {
      schemaVersion:
        "codexforge-qwen2-5-coder-32b-live-acceptance-evidence-v1",
      acceptanceState: "accepted",
      identity: CODEXFORGE_QWEN25_CODER_32B_EXACT_IDENTITY,
      implementationCheckpointCommit: input.implementationCheckpointCommit,
      qualificationEvidenceSha256: input.qualification.contentDigest.sha256,
      approvalDigestSha256: approvalDigest,
      normalizedMetadataSha256:
        preflight.value.observedMetadataDigest.sha256,
      promptId: contract.promptId,
      promptSha256: contract.promptSha256,
      promptUtf8Bytes: contract.promptUtf8Bytes,
      expectedOutputSha256: contract.expectedOutputSha256,
      outputSha256: parsed.value.outputSha256,
      requestUtf8Bytes: generated.requestUtf8Bytes,
      responseUtf8Bytes: generated.responseUtf8Bytes,
      outputUtf8Bytes: parsed.value.outputUtf8Bytes,
      evalCount: parsed.value.evalCount,
      doneReason: parsed.value.doneReason,
      totalDurationNanoseconds: parsed.value.totalDurationNanoseconds,
      loadDurationNanoseconds: parsed.value.loadDurationNanoseconds,
      promptEvalCount: parsed.value.promptEvalCount,
      toolCallCount: 0,
      imageCount: 0,
      executionProof: {
        approvalConsumed: true,
        attemptBudget: 1,
        generationAttemptCount: 1,
        retryCount: 0,
        fallbackCount: 0,
        rerouteCount: 0,
        providerSubstitutionCount: 0,
        modelSubstitutionCount: 0,
        automaticDownloadCount: 0,
        cloudRequestCount: 0,
      },
      rawMetadataStored: false,
      rawPromptStored: false,
      rawOutputStored: false,
      rawProviderResponseStored: false,
      operatorIdentityStored: false,
      machinePathStored: false,
      privateAlphaRunDataStored: false,
      evidenceAdmissionState: "pending-manual-review",
      acceptedAt: now,
    } as const;
    return freezeCodexForgeQwen25Coder32BSliceRValue({
      ok: true,
      value: {
        ...draft,
        contentDigest: calculateCodexForgeQwen25Coder32BContentDigest(draft),
      } satisfies CodexForgeQwen25Coder32BLiveAcceptanceEvidence,
    });
  } catch {
    return rejectAcceptance(
      ["acceptance-evidence-construction-failed"],
      1,
      true
    );
  }
}

export function createCodexForgeQwen25Coder32BFileApprovalConsumptionStore(input: Readonly<{
  evidenceDirectory: string;
  repositoryRoot: string;
}>): CodexForgeQwen25Coder32BApprovalConsumptionStore {
  const evidenceDirectory = resolve(input.evidenceDirectory);
  const repositoryRoot = resolve(input.repositoryRoot);
  const relation = relative(repositoryRoot, evidenceDirectory);
  if (!isAbsolute(evidenceDirectory) || relation === "" || (!relation.startsWith(`..${sep}`) && relation !== "..")) {
    throw new Error("Slice R evidence directory must be an existing directory outside the repository.");
  }
  return Object.freeze({
    async consume(approvalDigestSha256: string) {
      if (!lowerHex64(approvalDigestSha256)) return "attempt-budget-exhausted";
      const tombstonePath = resolve(
        evidenceDirectory,
        `approval-${approvalDigestSha256}.consumed.json`
      );
      if (relative(evidenceDirectory, tombstonePath).startsWith("..")) {
        return "attempt-budget-exhausted";
      }
      try {
        const handle = await open(tombstonePath, "wx", 0o600);
        try {
          await handle.writeFile(
            JSON.stringify({
              schemaVersion:
                "codexforge-qwen2-5-coder-32b-approval-consumption-v1",
              approvalDigestSha256,
              state: "consumed-or-uncertain-terminal",
            }),
            "utf8"
          );
        } finally {
          await handle.close();
        }
        return "consumed";
      } catch (error) {
        if (
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          (error as { code?: unknown }).code === "EEXIST"
        ) {
          return "already-consumed";
        }
        throw error;
      }
    },
  });
}

function orderedAdmissionCodes(
  codes: readonly CodexForgeQwen25Coder32BEvidenceAdmissionRejectionCode[]
): readonly CodexForgeQwen25Coder32BEvidenceAdmissionRejectionCode[] {
  const order = new Map(
    CODEXFORGE_QWEN25_CODER_32B_EVIDENCE_ADMISSION_REJECTION_CODES.map(
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

function rejectAdmission(
  codes: readonly CodexForgeQwen25Coder32BEvidenceAdmissionRejectionCode[]
): CodexForgeQwen25Coder32BEvidenceAdmissionResult {
  return freezeCodexForgeQwen25Coder32BSliceRValue({
    ok: false,
    rejection: {
      schemaVersion:
        "codexforge-qwen2-5-coder-32b-evidence-admission-rejection-v1",
      admissionState: "rejected",
      codes: orderedAdmissionCodes(codes),
    },
  } as const);
}

export function admitCodexForgeQwen25Coder32BLiveAcceptanceEvidence(input: Readonly<{
  evidence: unknown;
  expectedQualificationEvidenceSha256: string;
  expectedApprovalDigestSha256: string;
  expectedImplementationCheckpointCommit: string;
  reviewedAt: string;
}>): CodexForgeQwen25Coder32BEvidenceAdmissionResult {
  const evidence = input.evidence;
  if (!isRecord(evidence) || evidence.acceptanceState !== "accepted") {
    return rejectAdmission(["live-acceptance-not-succeeded"]);
  }
  if (
    evidence.schemaVersion !==
    "codexforge-qwen2-5-coder-32b-live-acceptance-evidence-v1"
  ) {
    return rejectAdmission(["evidence-schema-mismatch"]);
  }
  try {
    if (
      !isRecord(evidence.contentDigest) ||
      evidence.contentDigest.sha256 !==
        calculateCodexForgeQwen25Coder32BContentDigest(evidence).sha256
    ) {
      return rejectAdmission(["evidence-digest-mismatch"]);
    }
  } catch {
    return rejectAdmission(["evidence-digest-mismatch"]);
  }
  if (!sameJson(evidence.identity, CODEXFORGE_QWEN25_CODER_32B_EXACT_IDENTITY)) {
    return rejectAdmission(["candidate-binding-mismatch"]);
  }
  if (
    evidence.qualificationEvidenceSha256 !==
      input.expectedQualificationEvidenceSha256 ||
    !lowerHex64(evidence.qualificationEvidenceSha256)
  ) {
    return rejectAdmission(["qualification-binding-mismatch"]);
  }
  if (
    evidence.approvalDigestSha256 !== input.expectedApprovalDigestSha256 ||
    !lowerHex64(evidence.approvalDigestSha256)
  ) {
    return rejectAdmission(["approval-binding-mismatch"]);
  }
  const exactProof = {
    approvalConsumed: true,
    attemptBudget: 1,
    generationAttemptCount: 1,
    retryCount: 0,
    fallbackCount: 0,
    rerouteCount: 0,
    providerSubstitutionCount: 0,
    modelSubstitutionCount: 0,
    automaticDownloadCount: 0,
    cloudRequestCount: 0,
  };
  if (!sameJson(evidence.executionProof, exactProof)) {
    return rejectAdmission(["attempt-proof-mismatch"]);
  }
  if (
    evidence.rawMetadataStored !== false ||
    evidence.rawPromptStored !== false ||
    evidence.rawOutputStored !== false ||
    evidence.rawProviderResponseStored !== false ||
    evidence.operatorIdentityStored !== false ||
    evidence.machinePathStored !== false ||
    evidence.privateAlphaRunDataStored !== false
  ) {
    return rejectAdmission(["redaction-boundary-violation"]);
  }
  if (
    evidence.promptId !== CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_CONTRACT.promptId ||
    evidence.promptSha256 !== CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_CONTRACT.promptSha256 ||
    evidence.outputSha256 !== CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_CONTRACT.expectedOutputSha256 ||
    evidence.outputUtf8Bytes !== 35 ||
    evidence.toolCallCount !== 0 ||
    evidence.imageCount !== 0 ||
    evidence.evidenceAdmissionState !== "pending-manual-review"
  ) {
    return rejectAdmission(["execution-invariant-mismatch"]);
  }
  if (
    evidence.implementationCheckpointCommit !==
      input.expectedImplementationCheckpointCommit ||
    !/^[a-f0-9]{40}$/.test(input.expectedImplementationCheckpointCommit)
  ) {
    return rejectAdmission(["implementation-checkpoint-mismatch"]);
  }
  if (!Number.isFinite(Date.parse(input.reviewedAt))) {
    return rejectAdmission(["evidence-schema-mismatch"]);
  }
  const acceptanceEvidenceSha256 = isRecord(evidence.contentDigest)
    ? evidence.contentDigest.sha256
    : undefined;
  if (!lowerHex64(acceptanceEvidenceSha256)) {
    return rejectAdmission(["evidence-digest-mismatch"]);
  }
  const draft = {
    schemaVersion: "codexforge-qwen2-5-coder-32b-evidence-admission-v1",
    admissionState: "admitted",
    acceptanceEvidenceSha256,
    implementationCheckpointCommit: input.expectedImplementationCheckpointCommit,
    reviewedAt: input.reviewedAt,
    productionRegistryAdmission: "not-granted",
    routingAdmission: "not-granted",
    executionAdmission: "not-granted",
  } as const;
  const value: CodexForgeQwen25Coder32BEvidenceAdmission = {
    ...draft,
    contentDigest: calculateCodexForgeQwen25Coder32BContentDigest(draft),
  };
  return freezeCodexForgeQwen25Coder32BSliceRValue({ ok: true, value });
}
