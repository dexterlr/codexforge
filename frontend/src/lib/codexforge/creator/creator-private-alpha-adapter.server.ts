import "server-only";

import {
  PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
  PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
  PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION,
  normalizePrivateAlphaRequestText,
  type PrivateAlphaCreatorRunOwnership,
  type PrivateAlphaExecuteRunResult,
  type PrivateAlphaRunRecord,
} from "@/lib/codexforge/private-alpha";
import {
  createPrivateAlphaStore,
  createPrivateAlphaStoreForTesting,
  buildPrivateAlphaCreatorIdempotencyKeyHash,
  buildPrivateAlphaTestingDataRootLabel,
  type PrivateAlphaStore,
} from "@/lib/codexforge/private-alpha/private-alpha-store.server";
import {
  readPrivateAlphaKillSwitchState,
  type PrivateAlphaKillSwitchState,
} from "@/lib/codexforge/private-alpha/private-alpha-kill-switch.server";
import type { PrivateAlphaProviderAdapter } from "@/lib/codexforge/private-alpha/private-alpha-provider.server";
import { hashCreatorSha256, makeCreatorHexId } from "./creator-crypto";
import type { CreatorRunPurpose } from "./creator-types";

export type CreatorLifecycleRunResult = Readonly<{
  run: PrivateAlphaRunRecord;
  outputText: string | null;
  replayed: boolean;
  responseStatus: PrivateAlphaExecuteRunResult["responseStatus"];
  errorCode: string | null;
  safeErrorMessage: string | null;
}>;

export type CreatorGenerationLifecycleAdapter = Readonly<{
  bindRun: (input: {
    projectId: string;
    purpose: CreatorRunPurpose;
    instruction: string;
  }) => Promise<PrivateAlphaRunRecord>;
  recoverBoundRun: (input: {
    projectId: string;
    purpose: CreatorRunPurpose;
    instruction: string;
  }) => Promise<PrivateAlphaRunRecord | null>;
  getRun: (input: {
    projectId: string;
    purpose: CreatorRunPurpose;
    runId: string;
    ownershipBindingId: string;
  }) => Promise<PrivateAlphaRunRecord>;
  approveRun: (input: {
    projectId: string;
    purpose: CreatorRunPurpose;
    runId: string;
    ownershipBindingId: string;
    expectedRunRevision: number;
    expectedApprovalScopeHash: string;
    expectedRequestEnvelopeDigest: string;
  }) => Promise<PrivateAlphaRunRecord>;
  executeRun: (input: {
    projectId: string;
    purpose: CreatorRunPurpose;
    runId: string;
    ownershipBindingId: string;
    expectedRunRevision: number;
    expectedApprovalScopeHash: string;
    expectedRequestEnvelopeDigest: string;
    executionIntentIdempotencyKeyHash: string;
  }) => Promise<CreatorLifecycleRunResult>;
  cancelRun: (input: {
    projectId: string;
    purpose: CreatorRunPurpose;
    runId: string;
    ownershipBindingId: string;
    reason: string;
  }) => Promise<PrivateAlphaRunRecord>;
  readKillSwitch: () => Promise<PrivateAlphaKillSwitchState>;
}>;

function buildCreatorOwnership(input: {
  projectId: string;
  purpose: CreatorRunPurpose;
  bindingId: string;
}): PrivateAlphaCreatorRunOwnership {
  return {
    kind: "creator",
    protocolVersion: PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION,
    projectId: input.projectId,
    purpose: input.purpose,
    bindingId: input.bindingId,
  };
}

function buildCreatorRunIdempotencyKey(
  projectId: string,
  purpose: CreatorRunPurpose
): string {
  return `creator-${projectId}-${purpose}-v1`;
}

export function buildCreatorRunIdempotencyKeyHash(
  projectId: string,
  purpose: CreatorRunPurpose
): string {
  return buildPrivateAlphaCreatorIdempotencyKeyHash(
    buildCreatorRunIdempotencyKey(projectId, purpose),
    projectId,
    purpose
  );
}

export function buildLegacyCreatorRunIdempotencyKeyHash(
  projectId: string,
  purpose: CreatorRunPurpose
): string {
  return hashCreatorSha256(buildCreatorRunIdempotencyKey(projectId, purpose));
}

function buildHistoricalCreatorExecutionIdempotencyKey(
  projectId: string,
  purpose: CreatorRunPurpose
): string {
  return `creator-${projectId}-${purpose}-execute-v1`;
}

export function buildCreatorExecutionIdempotencyKeyHash(
  projectId: string,
  purpose: CreatorRunPurpose,
  executionIntentIdempotencyKeyHash: string
): string {
  const idempotencyKey = buildCreatorExecutionIdempotencyKey(
    projectId,
    purpose,
    executionIntentIdempotencyKeyHash
  );
  return buildPrivateAlphaCreatorIdempotencyKeyHash(
    idempotencyKey,
    projectId,
    purpose
  );
}

export function buildHistoricalCreatorExecutionIdempotencyKeyHash(
  projectId: string,
  purpose: CreatorRunPurpose
): string {
  return buildPrivateAlphaCreatorIdempotencyKeyHash(
    buildHistoricalCreatorExecutionIdempotencyKey(projectId, purpose),
    projectId,
    purpose
  );
}

export function buildLegacyCreatorExecutionIdempotencyKeyHash(
  projectId: string,
  purpose: CreatorRunPurpose
): string {
  return hashCreatorSha256(
    buildHistoricalCreatorExecutionIdempotencyKey(projectId, purpose)
  );
}

function buildCreatorExecutionIdempotencyKey(
  projectId: string,
  purpose: CreatorRunPurpose,
  executionIntentIdempotencyKeyHash: string
): string {
  if (!/^[a-f0-9]{64}$/u.test(executionIntentIdempotencyKeyHash)) {
    throw new Error("Creator execution intent identity is invalid.");
  }
  return `creator-${projectId}-${purpose}-execute-v2-${executionIntentIdempotencyKeyHash}`;
}

function assertExactCreatorRun(
  run: PrivateAlphaRunRecord,
  expected: { projectId: string; purpose: CreatorRunPurpose; bindingId?: string }
): PrivateAlphaRunRecord {
  const request = run.request;
  const scope = run.approvalScope;
  if (
    run.ownership?.kind !== "creator" ||
    run.ownership.protocolVersion !== PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION ||
    run.ownership.projectId !== expected.projectId ||
    run.ownership.purpose !== expected.purpose ||
    !/^[a-f0-9]{32}$/.test(run.ownership.bindingId) ||
    (expected.bindingId !== undefined && run.ownership.bindingId !== expected.bindingId) ||
    request.capability !== "code" ||
    request.providerPreference !== "ollama-local" ||
    request.modelPreferenceLabel !== "gpt-oss:20b" ||
    request.maximumOutputTokens !== 4096 ||
    request.retentionMode !== "local-private-alpha" ||
    request.executionMode !== "manual-approved-local-provider" ||
    !("bindingVersion" in request) ||
    request.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
    !("modelKey" in request) ||
    request.modelKey !== PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY ||
    !("dataBoundary" in request) ||
    request.dataBoundary !== "local-machine" ||
    !("cloudDataTransferRequirement" in request) ||
    request.cloudDataTransferRequirement !== "not-required" ||
    scope.runId !== run.runId ||
    scope.capability !== "code" ||
    scope.providerPreference !== "ollama-local" ||
    scope.modelPreferenceLabel !== "gpt-oss:20b" ||
    scope.maximumOutputTokens !== 4096 ||
    scope.retentionMode !== "local-private-alpha" ||
    scope.executionMode !== "manual-approved-local-provider" ||
    !("bindingVersion" in scope) ||
    scope.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
    !("modelKey" in scope) ||
    scope.modelKey !== PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY ||
    !("dataBoundary" in scope) ||
    scope.dataBoundary !== "local-machine" ||
    !("cloudDataTransferRequirement" in scope) ||
    scope.cloudDataTransferRequirement !== "not-required" ||
    scope.normalizedRequestHash !== hashCreatorSha256(request.normalizedRequestText)
  ) {
    throw new Error("Private Alpha returned a provider or model binding outside the creator envelope.");
  }
  return run;
}

function buildAdapter(
  store: PrivateAlphaStore,
  readKillSwitch: () => Promise<PrivateAlphaKillSwitchState>
): CreatorGenerationLifecycleAdapter {
  async function recoverBoundRun(input: {
    projectId: string;
    purpose: CreatorRunPurpose;
    instruction: string;
  }): Promise<PrivateAlphaRunRecord | null> {
    const idempotencyKey = buildCreatorRunIdempotencyKey(
      input.projectId,
      input.purpose
    );
    const expectedRequestText = normalizePrivateAlphaRequestText(input.instruction);
    const result = await store.bindCreatorRun(
      {
        requestText: input.instruction,
        capability: "code",
        modelPreferenceLabel: "gpt-oss:20b",
        maximumOutputTokens: 4096,
        modelKey: PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
      },
      idempotencyKey,
      buildCreatorOwnership({
        projectId: input.projectId,
        purpose: input.purpose,
        bindingId: makeCreatorHexId(16),
      }),
      false
    );
    if (!result) return null;
    const run = result.run;
    if (run.request.normalizedRequestText !== expectedRequestText) {
      throw new Error("Private Alpha creator binding idempotency identity conflicts with its exact instruction.");
    }
    return assertExactCreatorRun(run, {
      projectId: input.projectId,
      purpose: input.purpose,
    });
  }

  function assertExpectedBinding(
    run: PrivateAlphaRunRecord,
    expected: {
      projectId: string;
      purpose: CreatorRunPurpose;
      ownershipBindingId: string;
      expectedApprovalScopeHash: string;
      expectedRequestEnvelopeDigest: string;
    }
  ): PrivateAlphaRunRecord {
    const exact = assertExactCreatorRun(run, {
      projectId: expected.projectId,
      purpose: expected.purpose,
      bindingId: expected.ownershipBindingId,
    });
    if (
      exact.approvalScopeHash !== expected.expectedApprovalScopeHash ||
      hashCreatorSha256(exact.request.normalizedRequestText) !==
        expected.expectedRequestEnvelopeDigest
    ) {
      throw new Error("Private Alpha run no longer matches the displayed creator approval packet.");
    }
    return exact;
  }
  return {
    async bindRun({ projectId, purpose, instruction }) {
      const ownership = buildCreatorOwnership({
        projectId,
        purpose,
        bindingId: makeCreatorHexId(16),
      });
      const result = await store.bindCreatorRun(
        {
          requestText: instruction,
          capability: "code",
          modelPreferenceLabel: "gpt-oss:20b",
          maximumOutputTokens: 4096,
          modelKey: PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
        },
        buildCreatorRunIdempotencyKey(projectId, purpose),
        ownership,
        true
      );
      if (!result) {
        throw new Error("Private Alpha creator binding did not return an exact run.");
      }
      return assertExactCreatorRun(result.run, {
        projectId,
        purpose,
      });
    },
    recoverBoundRun,
    async getRun(input) {
      const ownership = buildCreatorOwnership({
        projectId: input.projectId,
        purpose: input.purpose,
        bindingId: input.ownershipBindingId,
      });
      return assertExactCreatorRun(
        await store.getCreatorRun(input.runId, ownership),
        {
          projectId: input.projectId,
          purpose: input.purpose,
          bindingId: input.ownershipBindingId,
        }
      );
    },
    async approveRun(input) {
      const ownership = buildCreatorOwnership({
        projectId: input.projectId,
        purpose: input.purpose,
        bindingId: input.ownershipBindingId,
      });
      const current = assertExpectedBinding(
        await store.getCreatorRun(input.runId, ownership),
        input
      );
      if (
        current.state === "approved" ||
        current.state === "executing" ||
        current.state === "succeeded" ||
        current.state === "failed" ||
        current.state === "blocked"
      ) {
        if (!current.approval) throw new Error("Private Alpha run is missing its approval record.");
        return current;
      }
      if (current.revision !== input.expectedRunRevision || current.state !== "awaiting_approval") {
        throw new Error("Private Alpha approval revision no longer matches the creator packet.");
      }
      const approved = await store.approveCreatorRun(input.runId, {
        approvalScopeHash: input.expectedApprovalScopeHash,
        approved: true,
        acknowledgement: true,
        expectedRevision: input.expectedRunRevision,
      }, ownership);
      return assertExpectedBinding(approved, input);
    },
    async executeRun(input) {
      const { projectId, purpose, runId } = input;
      const ownership = buildCreatorOwnership({
        projectId,
        purpose,
        bindingId: input.ownershipBindingId,
      });
      let current = assertExpectedBinding(
        await store.getCreatorRun(runId, ownership),
        input
      );
      const currentExecutionIdempotencyKey = buildCreatorExecutionIdempotencyKey(
        projectId,
        purpose,
        input.executionIntentIdempotencyKeyHash
      );
      if (current.state === "executing") {
        if (
          !current.execution ||
          current.execution.previousRevision !== input.expectedRunRevision
        ) {
          throw new Error("Private Alpha execution revision no longer matches the approved creator packet.");
        }
        current = assertExpectedBinding(
          await store.reconcileCreatorRunAfterInterruption(runId, ownership),
          input
        );
      }
      if (current.execution && ["succeeded", "failed", "blocked"].includes(current.state)) {
        if (current.execution.previousRevision !== input.expectedRunRevision) {
          throw new Error("Private Alpha execution revision no longer matches the approved creator packet.");
        }
        const expectedCurrentExecutionHash = buildCreatorExecutionIdempotencyKeyHash(
          projectId,
          purpose,
          input.executionIntentIdempotencyKeyHash
        );
        const replayIdempotencyKey =
          current.execution.idempotencyKeyHash === expectedCurrentExecutionHash
            ? currentExecutionIdempotencyKey
            : null;
        if (!replayIdempotencyKey) {
          throw new Error("Private Alpha execution identity does not match the creator intent.");
        }
        const replay = await store.executeCreatorRun(
          runId,
          {
            execute: true,
            acknowledgement: true,
            approvalScopeHash: input.expectedApprovalScopeHash,
            expectedRevision: current.execution.previousRevision,
          },
          replayIdempotencyKey,
          ownership
        );
        return {
          run: replay.run,
          outputText: replay.run.execution?.outputText ?? null,
          replayed: replay.replayed,
          responseStatus: replay.responseStatus,
          errorCode: replay.errorCode,
          safeErrorMessage: replay.safeErrorMessage,
        };
      }
      if (current.state === "canceled") {
        return {
          run: current,
          outputText: null,
          replayed: true,
          responseStatus: 409,
          errorCode: null,
          safeErrorMessage: "Private Alpha run was canceled before execution.",
        };
      }
      if (current.revision !== input.expectedRunRevision || current.state !== "approved") {
        throw new Error("Private Alpha execution revision no longer matches the approved creator packet.");
      }
      const result = await store.executeCreatorRun(
        runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: input.expectedApprovalScopeHash,
          expectedRevision: input.expectedRunRevision,
        },
        currentExecutionIdempotencyKey,
        ownership
      );
      const run = assertExpectedBinding(result.run, input);
      if (
        run.execution &&
        (run.execution.provider !== "ollama-local" || run.execution.model !== "gpt-oss:20b")
      ) {
        throw new Error("Private Alpha execution identity did not match the creator plan.");
      }
      return {
        run,
        outputText: run.execution?.outputText ?? null,
        replayed: result.replayed,
        responseStatus: result.responseStatus,
        errorCode: result.errorCode,
        safeErrorMessage: result.safeErrorMessage,
      };
    },
    async cancelRun(input) {
      const ownership = buildCreatorOwnership({
        projectId: input.projectId,
        purpose: input.purpose,
        bindingId: input.ownershipBindingId,
      });
      const current = assertExactCreatorRun(
        await store.getCreatorRun(input.runId, ownership),
        input
      );
      if (current.state === "canceled") return current;
      return assertExactCreatorRun(
        await store.cancelCreatorRun(input.runId, {
          expectedRevision: current.revision,
          reason: input.reason.slice(0, 240),
        }, ownership),
        input
      );
    },
    readKillSwitch,
  };
}

export function createCreatorGenerationLifecycleAdapter(): CreatorGenerationLifecycleAdapter {
  const store = createPrivateAlphaStore({
    runtimeProfile: PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
  });
  return buildAdapter(store, () => readPrivateAlphaKillSwitchState());
}

export function createCreatorGenerationLifecycleAdapterForTesting(
  testSuffix: string,
  providerAdapter: PrivateAlphaProviderAdapter
): CreatorGenerationLifecycleAdapter {
  if (
    !providerAdapter ||
    typeof providerAdapter.getAvailability !== "function" ||
    typeof providerAdapter.generateApprovedText !== "function" ||
    providerAdapter.identity?.providerId !== "ollama-local" ||
    providerAdapter.identity.modelId !== "gpt-oss:20b" ||
    providerAdapter.identity.modelKey !== "ollama-local::gpt-oss:20b" ||
    providerAdapter.identity.locality !== "local" ||
    providerAdapter.identity.dataBoundary !== "local-machine" ||
    providerAdapter.identity.approvedMaximumOutputTokens !== 4096
  ) {
    throw new Error("Creator deterministic lifecycle requires the exact explicit local transport trap or fixture adapter.");
  }
  const store = createPrivateAlphaStoreForTesting(testSuffix, {
    runtimeProfile: PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
    providerAdapter,
  });
  const dataRootLabel = buildPrivateAlphaTestingDataRootLabel(testSuffix);
  return buildAdapter(store, () => readPrivateAlphaKillSwitchState({ dataRootLabel }));
}

export function buildCreatorInstructionDigest(instruction: string): string {
  return hashCreatorSha256(instruction);
}
