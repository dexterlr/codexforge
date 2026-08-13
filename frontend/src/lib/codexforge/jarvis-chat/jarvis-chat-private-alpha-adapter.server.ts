import "server-only";

import {
  PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
  PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
  PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION,
  normalizePrivateAlphaRequestText,
  type PrivateAlphaChatRunOwnership,
  type PrivateAlphaExecuteRunResult,
  type PrivateAlphaRunRecord,
} from "@/lib/codexforge/private-alpha";
import {
  createPrivateAlphaStore,
  createPrivateAlphaStoreForTesting,
  buildPrivateAlphaTestingDataRootLabel,
  PrivateAlphaStoreError,
  type PrivateAlphaStore,
} from "@/lib/codexforge/private-alpha/private-alpha-store.server";
import {
  readPrivateAlphaKillSwitchState,
  type PrivateAlphaKillSwitchState,
} from "@/lib/codexforge/private-alpha/private-alpha-kill-switch.server";
import type { PrivateAlphaProviderAdapter } from "@/lib/codexforge/private-alpha/private-alpha-provider.server";
import { hashJarvisChatSha256 } from "./jarvis-chat-crypto";

export type JarvisChatLifecycleExecutionResult = Readonly<{
  run: PrivateAlphaRunRecord;
  outputText: string | null;
  replayed: boolean;
  responseStatus: PrivateAlphaExecuteRunResult["responseStatus"];
  errorCode: string | null;
  safeErrorMessage: string | null;
}>;

export type JarvisChatLifecycleAdapter = Readonly<{
  bindRun: (input: {
    conversationId: string;
    turnId: string;
    ownershipBindingId: string;
    instruction: string;
  }) => Promise<PrivateAlphaRunRecord>;
  recoverBoundRun: (input: {
    conversationId: string;
    turnId: string;
    ownershipBindingId: string;
    instruction: string;
  }) => Promise<PrivateAlphaRunRecord | null>;
  getRun: (input: {
    conversationId: string;
    turnId: string;
    ownershipBindingId: string;
    runId: string;
  }) => Promise<PrivateAlphaRunRecord>;
  approveRun: (input: {
    conversationId: string;
    turnId: string;
    ownershipBindingId: string;
    runId: string;
    expectedRunRevision: number;
    approvalScopeHash: string;
    requestEnvelopeDigest: string;
  }) => Promise<PrivateAlphaRunRecord>;
  executeRun: (input: {
    conversationId: string;
    turnId: string;
    ownershipBindingId: string;
    runId: string;
    expectedRunRevision: number;
    approvalScopeHash: string;
    requestEnvelopeDigest: string;
    admitProviderStart: () => Promise<boolean>;
  }) => Promise<JarvisChatLifecycleExecutionResult>;
  cancelRun: (input: {
    conversationId: string;
    turnId: string;
    ownershipBindingId: string;
    runId: string;
    reason: string;
  }) => Promise<PrivateAlphaRunRecord>;
  reconcileRun: (input: {
    conversationId: string;
    turnId: string;
    ownershipBindingId: string;
    runId: string;
  }) => Promise<PrivateAlphaRunRecord>;
  readKillSwitch: () => Promise<PrivateAlphaKillSwitchState>;
}>;

function ownership(input: {
  conversationId: string;
  turnId: string;
  ownershipBindingId: string;
}): PrivateAlphaChatRunOwnership {
  return {
    kind: "chat",
    protocolVersion: PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION,
    conversationId: input.conversationId,
    turnId: input.turnId,
    bindingId: input.ownershipBindingId,
  };
}

function bindingKey(conversationId: string, turnId: string): string {
  return `jarvis-chat-${conversationId}-${turnId}-bind-v1`;
}

function executionKey(conversationId: string, turnId: string): string {
  return `jarvis-chat-${conversationId}-${turnId}-execute-v1`;
}

function assertExactRun(
  run: PrivateAlphaRunRecord,
  expected: {
    conversationId: string;
    turnId: string;
    ownershipBindingId: string;
    requestEnvelopeDigest?: string;
    approvalScopeHash?: string;
  }
): PrivateAlphaRunRecord {
  const request = run.request;
  const scope = run.approvalScope;
  if (
    run.ownership?.kind !== "chat" ||
    run.ownership.protocolVersion !== PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION ||
    run.ownership.conversationId !== expected.conversationId ||
    run.ownership.turnId !== expected.turnId ||
    run.ownership.bindingId !== expected.ownershipBindingId ||
    request.capability !== "text" ||
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
    scope.capability !== "text" ||
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
    scope.normalizedRequestHash !== hashJarvisChatSha256(request.normalizedRequestText) ||
    (expected.requestEnvelopeDigest !== undefined &&
      hashJarvisChatSha256(request.normalizedRequestText) !== expected.requestEnvelopeDigest) ||
    (expected.approvalScopeHash !== undefined &&
      run.approvalScopeHash !== expected.approvalScopeHash)
  ) {
    throw new Error("Private Alpha returned a run outside the exact local Jarvis chat envelope.");
  }
  return run;
}

function buildAdapter(
  store: PrivateAlphaStore,
  readKillSwitch: () => Promise<PrivateAlphaKillSwitchState>
): JarvisChatLifecycleAdapter {
  const body = (instruction: string) => ({
    requestText: instruction,
    capability: "text" as const,
    modelPreferenceLabel: "gpt-oss:20b",
    maximumOutputTokens: 4096,
    modelKey: PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
  });
  return {
    async bindRun(input) {
      const result = await store.bindChatRun(
        body(input.instruction),
        bindingKey(input.conversationId, input.turnId),
        ownership(input),
        true
      );
      if (!result) throw new Error("Private Alpha chat binding did not return its exact run.");
      const run = assertExactRun(result.run, input);
      if (run.request.normalizedRequestText !== normalizePrivateAlphaRequestText(input.instruction)) {
        throw new Error("Private Alpha chat binding conflicts with its exact provider request.");
      }
      return run;
    },
    async recoverBoundRun(input) {
      const result = await store.bindChatRun(
        body(input.instruction),
        bindingKey(input.conversationId, input.turnId),
        ownership(input),
        false
      );
      if (!result) return null;
      const run = assertExactRun(result.run, input);
      if (run.request.normalizedRequestText !== normalizePrivateAlphaRequestText(input.instruction)) {
        throw new Error("Private Alpha recovered chat binding conflicts with its exact provider request.");
      }
      return run;
    },
    async getRun(input) {
      return assertExactRun(
        await store.getChatRun(input.runId, ownership(input)),
        input
      );
    },
    async approveRun(input) {
      const exactOwnership = ownership(input);
      const current = assertExactRun(
        await store.getChatRun(input.runId, exactOwnership),
        input
      );
      if (["approved", "executing", "succeeded", "failed", "blocked"].includes(current.state)) {
        if (!current.approval) throw new Error("Private Alpha chat run is missing its approval evidence.");
        return current;
      }
      if (current.state !== "awaiting_approval" || current.revision !== input.expectedRunRevision) {
        throw new Error("Private Alpha chat approval revision is stale.");
      }
      try {
        return assertExactRun(
          await store.approveChatRun(
            input.runId,
            {
              approvalScopeHash: input.approvalScopeHash,
              approved: true,
              acknowledgement: true,
              expectedRevision: input.expectedRunRevision,
            },
            exactOwnership
          ),
          input
        );
      } catch (error) {
        if (!(error instanceof PrivateAlphaStoreError) || error.status !== 409) throw error;
        const reconciled = assertExactRun(
          await store.getChatRun(input.runId, exactOwnership),
          input
        );
        if (
          !reconciled.approval ||
          !["approved", "executing", "succeeded", "failed", "blocked"].includes(reconciled.state) ||
          reconciled.approval.approvalScopeHash !== input.approvalScopeHash
        ) throw error;
        return reconciled;
      }
    },
    async executeRun(input) {
      const exactOwnership = ownership(input);
      let current = assertExactRun(
        await store.getChatRun(input.runId, exactOwnership),
        input
      );
      if (current.state === "executing") {
        current = assertExactRun(
          await store.reconcileChatRunAfterInterruption(input.runId, exactOwnership),
          input
        );
      }
      const key = executionKey(input.conversationId, input.turnId);
      const expectedRevision = current.execution?.previousRevision ?? input.expectedRunRevision;
      const result = await store.executeChatRun(
        input.runId,
        {
          execute: true,
          acknowledgement: true,
          approvalScopeHash: input.approvalScopeHash,
          expectedRevision,
        },
        key,
        exactOwnership,
        input.admitProviderStart
      );
      const run = assertExactRun(result.run, input);
      if (
        run.execution &&
        (run.execution.provider !== "ollama-local" || run.execution.model !== "gpt-oss:20b")
      ) {
        throw new Error("Private Alpha chat execution identity changed after approval.");
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
      const exactOwnership = ownership(input);
      const current = assertExactRun(
        await store.getChatRun(input.runId, exactOwnership),
        input
      );
      if (current.state === "canceled") return current;
      const exactReason = input.reason.slice(0, 240);
      try {
        return assertExactRun(
          await store.cancelChatRun(
            input.runId,
            { expectedRevision: current.revision, reason: exactReason },
            exactOwnership
          ),
          input
        );
      } catch (error) {
        if (!(error instanceof PrivateAlphaStoreError) || error.status !== 409) throw error;
        const reconciled = assertExactRun(
          await store.getChatRun(input.runId, exactOwnership),
          input
        );
        if (reconciled.state !== "canceled" || reconciled.cancellation?.reason !== exactReason) throw error;
        return reconciled;
      }
    },
    async reconcileRun(input) {
      const exactOwnership = ownership(input);
      const current = assertExactRun(
        await store.getChatRun(input.runId, exactOwnership),
        input
      );
      return current.state === "executing"
        ? assertExactRun(
            await store.reconcileChatRunAfterInterruption(input.runId, exactOwnership),
            input
          )
        : current;
    },
    readKillSwitch,
  };
}

export function createJarvisChatLifecycleAdapter(): JarvisChatLifecycleAdapter {
  return buildAdapter(
    createPrivateAlphaStore({ runtimeProfile: PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE }),
    () => readPrivateAlphaKillSwitchState()
  );
}

export function createJarvisChatLifecycleAdapterForTesting(
  testSuffix: string,
  providerAdapter: PrivateAlphaProviderAdapter
): JarvisChatLifecycleAdapter {
  if (
    providerAdapter.identity?.providerId !== "ollama-local" ||
    providerAdapter.identity.modelId !== "gpt-oss:20b" ||
    providerAdapter.identity.modelKey !== "ollama-local::gpt-oss:20b" ||
    providerAdapter.identity.locality !== "local" ||
    providerAdapter.identity.dataBoundary !== "local-machine" ||
    providerAdapter.identity.approvedMaximumOutputTokens !== 4096
  ) {
    throw new Error("Jarvis chat deterministic lifecycle requires the exact local fixture or transport trap.");
  }
  const store = createPrivateAlphaStoreForTesting(testSuffix, {
    runtimeProfile: PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
    providerAdapter,
  });
  const dataRootLabel = buildPrivateAlphaTestingDataRootLabel(testSuffix);
  return buildAdapter(store, () => readPrivateAlphaKillSwitchState({ dataRootLabel }));
}
