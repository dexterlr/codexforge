import "server-only";

import {
  getCodexForgeProductionModelCatalog,
  type CodexForgeModelCatalogSnapshot,
  type CodexForgeModelRuntimeSnapshot,
  type CodexForgeRoutingDecision,
} from "../model-routing";
import { routeCodexForgeModel } from "../model-routing/model-routing-policy.server";
import {
  CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION,
  type CodexForgeGroqAutomaticRoutingAdmissionRecord,
} from "../groq-provider/groq-provider-automatic-routing-admission";
import {
  CODEXFORGE_GROQ_PROVIDER_QUALIFICATION,
} from "../groq-provider/groq-provider-qualification";
import type { CodexForgeGroqQualificationRecord } from "../groq-provider/groq-provider-types";
import {
  inspectPrivateAlphaProviderRuntime,
  type PrivateAlphaProviderRuntimeInspection,
} from "./private-alpha-provider-runtime.server";
import {
  readPrivateAlphaKillSwitchState,
  type PrivateAlphaKillSwitchState,
} from "./private-alpha-kill-switch.server";
import {
  PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
} from "./private-alpha-types";
import { PRIVATE_ALPHA_DATA_ROOT_LABEL } from "./private-alpha-validation";
import {
  clonePrivateAlphaFreeFirstRoutingResult,
  type PrivateAlphaFreeFirstRoutingInput,
  PRIVATE_ALPHA_FREE_FIRST_ROUTING_POLICY_VERSION,
  PRIVATE_ALPHA_FREE_FIRST_ROUTING_SELECTED_MODEL_KEYS,
  type PrivateAlphaFreeFirstRoutingResult,
  type PrivateAlphaFreeFirstRoutingSelectedModelKey,
  validatePrivateAlphaFreeFirstRoutingInput,
} from "./private-alpha-free-first-routing-types";

const PRIVATE_ALPHA_FREE_FIRST_GROQ_MAXIMUM_OUTPUT_TOKENS = 512;

type PrivateAlphaFreeFirstRoutingServerOptions = Readonly<{
  dataRootLabel?: string;
  readKillSwitchState?: (
    dataRootLabel: string
  ) => Promise<PrivateAlphaKillSwitchState>;
  inspectRuntime?: (
    modelKey:
      | typeof PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY
      | typeof PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
  ) => Promise<PrivateAlphaProviderRuntimeInspection>;
  catalogSnapshot?: CodexForgeModelCatalogSnapshot;
  groqQualificationRecord?: CodexForgeGroqQualificationRecord;
  groqAutomaticRoutingAdmissionRecord?: CodexForgeGroqAutomaticRoutingAdmissionRecord;
}>;

export class PrivateAlphaFreeFirstRoutingError extends Error {
  readonly status: 400;

  constructor(message: string) {
    super(message);
    this.name = "PrivateAlphaFreeFirstRoutingError";
    this.status = 400;
  }
}

function freezeRuntimeSnapshots(
  runtimeSnapshots: readonly CodexForgeModelRuntimeSnapshot[]
): readonly CodexForgeModelRuntimeSnapshot[] {
  return Object.freeze(
    runtimeSnapshots.map((snapshot) =>
      Object.freeze({
        modelKey: snapshot.modelKey,
        availability: snapshot.availability,
        quotaState: snapshot.quotaState,
        observedLatencyMs: snapshot.observedLatencyMs,
        observedAt: snapshot.observedAt,
      })
    )
  );
}

function buildDecision(
  input: PrivateAlphaFreeFirstRoutingInput,
  runtimeSnapshots: readonly CodexForgeModelRuntimeSnapshot[],
  catalogSnapshot: CodexForgeModelCatalogSnapshot
): CodexForgeRoutingDecision {
  const cloudAllowed = input.cloudRouting.state === "allowed-free-tier-only";
  const operatorConfirmedFreeTier = cloudAllowed;
  const decision = routeCodexForgeModel(
    {
      taskProfile: "general-text",
      requiredCapabilities: ["text-generation"],
      estimatedInputTokens: 0,
      maximumOutputTokens: input.maximumOutputTokens,
      candidateModelKeys: [...PRIVATE_ALPHA_FREE_FIRST_ROUTING_SELECTED_MODEL_KEYS],
      policy: {
        mode: "free-first",
        privacyRequirement: cloudAllowed ? "cloud-allowed" : "local-required",
        maximumEstimatedCostUsd: null,
        paidApprovalState: "not-granted",
        paidExecutionAdmission: "disabled",
        freeTierConfirmationState: operatorConfirmedFreeTier
          ? "confirmed-for-request"
          : "not-confirmed",
        manualModelKey: null,
      },
      runtimeSnapshots: freezeRuntimeSnapshots(runtimeSnapshots),
    },
    catalogSnapshot
  );

  if (decision.recommendedPaidModelKey !== null) {
    throw new Error("Slice M decision must not recommend a paid model.");
  }

  if (decision.requiresPaidApproval !== false) {
    throw new Error("Slice M decision must not require paid approval.");
  }

  if (
    decision.selectedModelKey !== null &&
    !PRIVATE_ALPHA_FREE_FIRST_ROUTING_SELECTED_MODEL_KEYS.includes(
      decision.selectedModelKey as PrivateAlphaFreeFirstRoutingSelectedModelKey
    )
  ) {
    throw new Error("Slice M decision selected an unexpected model key.");
  }

  return decision;
}

function buildResult(input: {
  status: PrivateAlphaFreeFirstRoutingResult["status"];
  selectedModelKey: PrivateAlphaFreeFirstRoutingSelectedModelKey | null;
  decision: CodexForgeRoutingDecision;
  runtimeSnapshots: readonly CodexForgeModelRuntimeSnapshot[];
  cloudProviderInspected: boolean;
}): PrivateAlphaFreeFirstRoutingResult {
  return clonePrivateAlphaFreeFirstRoutingResult({
    policyVersion: PRIVATE_ALPHA_FREE_FIRST_ROUTING_POLICY_VERSION,
    status: input.status,
    selectedModelKey: input.selectedModelKey,
    decision: input.decision,
    runtimeSnapshots: freezeRuntimeSnapshots(input.runtimeSnapshots),
    cloudProviderInspected: input.cloudProviderInspected,
    promptTransferredToCloud: false,
    providerGenerationPerformed: false,
  });
}

function isExactLocalIdentity(inspection: PrivateAlphaProviderRuntimeInspection): boolean {
  return (
    inspection.identity.providerId === "ollama-local" &&
    inspection.identity.modelId === "gpt-oss:20b" &&
    inspection.identity.modelKey === PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY &&
    inspection.identity.dataBoundary === "local-machine" &&
    inspection.identity.locality === "local"
  );
}

function isExactGroq20Identity(inspection: PrivateAlphaProviderRuntimeInspection): boolean {
  return (
    inspection.identity.providerId === "groq-cloud" &&
    inspection.identity.modelId === "openai/gpt-oss-20b" &&
    inspection.identity.modelKey === PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY &&
    inspection.identity.dataBoundary === "cloud-provider" &&
    inspection.identity.locality === "cloud" &&
    inspection.identity.approvedMaximumOutputTokens ===
      PRIVATE_ALPHA_FREE_FIRST_GROQ_MAXIMUM_OUTPUT_TOKENS
  );
}

function isLocalEligible(inspection: PrivateAlphaProviderRuntimeInspection): boolean {
  return (
    isExactLocalIdentity(inspection) &&
    inspection.availability.providerAvailable === true &&
    inspection.availability.modelAvailable === true &&
    inspection.snapshot.availability === "available" &&
    inspection.snapshot.quotaState === "not-applicable"
  );
}

function isAffirmativelyLocalUnavailable(
  inspection: PrivateAlphaProviderRuntimeInspection
): boolean {
  return (
    isExactLocalIdentity(inspection) &&
    inspection.availability.providerAvailable === false &&
    inspection.availability.modelAvailable === false &&
    inspection.availability.errorCode !== null &&
    inspection.availability.errorCode !== "ollama_model_missing" &&
    inspection.snapshot.availability === "unavailable" &&
    inspection.snapshot.quotaState === "not-applicable"
  );
}

function isGroqEligible(inspection: PrivateAlphaProviderRuntimeInspection): boolean {
  return (
    isExactGroq20Identity(inspection) &&
    inspection.availability.providerAvailable === true &&
    inspection.availability.modelAvailable === true &&
    inspection.availability.quotaState === "available" &&
    inspection.snapshot.availability === "available" &&
    inspection.snapshot.quotaState === "available"
  );
}

function isGroqAutomaticAdmissionCurrent(
  record: CodexForgeGroqAutomaticRoutingAdmissionRecord
): boolean {
  return (
    record.admissionVersion === "codexforge-groq-automatic-routing-admission-v1" &&
    record.admissionState === "admitted" &&
    record.routingMode === "free-first" &&
    record.providerId === "groq-cloud" &&
    record.automaticModelKey === PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY &&
    record.manualOnlyModelKey === "groq-cloud::openai/gpt-oss-120b" &&
    record.envelope === "text-only" &&
    record.maximumOutputTokens ===
      PRIVATE_ALPHA_FREE_FIRST_GROQ_MAXIMUM_OUTPUT_TOKENS &&
    record.requiredCostClass === "free-tier" &&
    record.paidExecutionAllowed === false &&
    record.retryAllowed === false &&
    record.fallbackAllowed === false &&
    record.modelSubstitutionAllowed === false
  );
}

function isGroqQualificationCurrent(
  record: CodexForgeGroqQualificationRecord
): boolean {
  const automaticModel = record.models.find(
    (model) => model.modelKey === PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
  );
  const manualOnlyModel = record.models.find(
    (model) => model.modelKey === "groq-cloud::openai/gpt-oss-120b"
  );

  return (
    record.qualificationVersion === "codexforge-groq-qualification-v3" &&
    record.providerId === "groq-cloud" &&
    record.providerTransportQualificationState === "live-verified" &&
    record.manualPrivateAlphaExecutionAdmissionState === "admitted" &&
    record.paidExecutionEnabled === false &&
    record.accountTierRevalidationRequired === true &&
    record.freeTierConfirmationRequirement ===
      "request-scoped-operator-confirmation" &&
    record.retryAllowed === false &&
    record.fallbackAllowed === false &&
    record.modelSubstitutionAllowed === false &&
    record.automaticRoutingAdmissionId ===
      "codexforge-groq-automatic-routing-admission-v1" &&
    record.automaticRoutingModes.length === 1 &&
    record.automaticRoutingModes[0] === "free-first" &&
    automaticModel !== undefined &&
    automaticModel.transportQualificationState === "live-verified" &&
    automaticModel.routingState === "automatic" &&
    automaticModel.automaticRoutingState === "admitted-for-free-first" &&
    automaticModel.automaticRoutingAdmissionId ===
      "codexforge-groq-automatic-routing-admission-v1" &&
    automaticModel.automaticRoutingModes.length === 1 &&
    automaticModel.automaticRoutingModes[0] === "free-first" &&
    automaticModel.admittedMaximumOutputTokens ===
      PRIVATE_ALPHA_FREE_FIRST_GROQ_MAXIMUM_OUTPUT_TOKENS &&
    automaticModel.paidExecutionEnabled === false &&
    automaticModel.retryAllowed === false &&
    automaticModel.fallbackAllowed === false &&
    automaticModel.modelSubstitutionAllowed === false &&
    automaticModel.freeTierConfirmationRequirement ===
      "request-scoped-operator-confirmation" &&
    manualOnlyModel !== undefined &&
    manualOnlyModel.transportQualificationState === "live-verified" &&
    manualOnlyModel.routingState === "manual-only" &&
    manualOnlyModel.automaticRoutingState === "disabled" &&
    manualOnlyModel.automaticRoutingAdmissionId === null &&
    manualOnlyModel.automaticRoutingModes.length === 0 &&
    manualOnlyModel.admittedMaximumOutputTokens ===
      PRIVATE_ALPHA_FREE_FIRST_GROQ_MAXIMUM_OUTPUT_TOKENS &&
    manualOnlyModel.paidExecutionEnabled === false &&
    manualOnlyModel.retryAllowed === false &&
    manualOnlyModel.fallbackAllowed === false &&
    manualOnlyModel.modelSubstitutionAllowed === false &&
    manualOnlyModel.freeTierConfirmationRequirement ===
      "request-scoped-operator-confirmation"
  );
}

function catalogAdmitsExactAutomaticGroq20b(
  catalogSnapshot: CodexForgeModelCatalogSnapshot
): boolean {
  const automaticModel = catalogSnapshot.models.find(
    (model) => model.modelKey === PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
  );
  const manualOnlyModel = catalogSnapshot.models.find(
    (model) => model.modelKey === "groq-cloud::openai/gpt-oss-120b"
  );

  return (
    catalogSnapshot.catalogVersion === "codexforge-model-routing-v4" &&
    automaticModel !== undefined &&
    automaticModel.routingState === "automatic" &&
    automaticModel.automaticRoutingAdmission !== null &&
    automaticModel.automaticRoutingAdmission.admissionId ===
      "codexforge-groq-automatic-routing-admission-v1" &&
    automaticModel.automaticRoutingAdmission.modes.length === 1 &&
    automaticModel.automaticRoutingAdmission.modes[0] === "free-first" &&
    automaticModel.approvedMaximumOutputTokens ===
      PRIVATE_ALPHA_FREE_FIRST_GROQ_MAXIMUM_OUTPUT_TOKENS &&
    manualOnlyModel !== undefined &&
    manualOnlyModel.routingState === "manual-only" &&
    manualOnlyModel.automaticRoutingAdmission === null
  );
}

export async function routePrivateAlphaFreeFirst(
  rawInput: unknown,
  options: PrivateAlphaFreeFirstRoutingServerOptions = {}
): Promise<PrivateAlphaFreeFirstRoutingResult> {
  const validation = validatePrivateAlphaFreeFirstRoutingInput(rawInput);
  if (!validation.ok) {
    throw new PrivateAlphaFreeFirstRoutingError(validation.error);
  }

  const input: PrivateAlphaFreeFirstRoutingInput = validation.value;
  const dataRootLabel = options.dataRootLabel ?? PRIVATE_ALPHA_DATA_ROOT_LABEL;
  const readKillSwitch =
    options.readKillSwitchState ??
    ((nextDataRootLabel: string) =>
      readPrivateAlphaKillSwitchState({ dataRootLabel: nextDataRootLabel }));
  const inspectRuntime =
    options.inspectRuntime ??
    ((
      modelKey:
        | typeof PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY
        | typeof PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
    ) => inspectPrivateAlphaProviderRuntime(modelKey));
  const catalogSnapshot =
    options.catalogSnapshot ?? getCodexForgeProductionModelCatalog();
  const groqQualificationRecord =
    options.groqQualificationRecord ?? CODEXFORGE_GROQ_PROVIDER_QUALIFICATION;
  const groqAutomaticRoutingAdmissionRecord =
    options.groqAutomaticRoutingAdmissionRecord ??
    CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION;
  const runtimeSnapshots: CodexForgeModelRuntimeSnapshot[] = [];

  const initialKillSwitchState = await readKillSwitch(dataRootLabel);
  if (initialKillSwitchState.killSwitchEngaged) {
    return buildResult({
      status: "blocked",
      selectedModelKey: null,
      decision: buildDecision(input, runtimeSnapshots, catalogSnapshot),
      runtimeSnapshots,
      cloudProviderInspected: false,
    });
  }

  let localInspection: PrivateAlphaProviderRuntimeInspection;
  try {
    localInspection = await inspectRuntime(PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY);
  } catch {
    return buildResult({
      status: "blocked",
      selectedModelKey: null,
      decision: buildDecision(input, runtimeSnapshots, catalogSnapshot),
      runtimeSnapshots,
      cloudProviderInspected: false,
    });
  }
  runtimeSnapshots.push(localInspection.snapshot);

  if (isLocalEligible(localInspection)) {
    const decision = buildDecision(input, runtimeSnapshots, catalogSnapshot);
    if (decision.status !== "selected" || decision.selectedModelKey !== PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY) {
      throw new Error("Slice M local-first routing did not deterministically select local Ollama.");
    }

    return buildResult({
      status: "selected-for-approval",
      selectedModelKey: PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
      decision,
      runtimeSnapshots,
      cloudProviderInspected: false,
    });
  }

  if (!isAffirmativelyLocalUnavailable(localInspection)) {
    return buildResult({
      status: "blocked",
      selectedModelKey: null,
      decision: buildDecision(input, runtimeSnapshots, catalogSnapshot),
      runtimeSnapshots,
      cloudProviderInspected: false,
    });
  }

  if (input.cloudRouting.state === "disallowed") {
    return buildResult({
      status: "no-eligible-model",
      selectedModelKey: null,
      decision: buildDecision(input, runtimeSnapshots, catalogSnapshot),
      runtimeSnapshots,
      cloudProviderInspected: false,
    });
  }

  if (
    input.maximumOutputTokens >
    PRIVATE_ALPHA_FREE_FIRST_GROQ_MAXIMUM_OUTPUT_TOKENS
  ) {
    return buildResult({
      status: "no-eligible-model",
      selectedModelKey: null,
      decision: buildDecision(input, runtimeSnapshots, catalogSnapshot),
      runtimeSnapshots,
      cloudProviderInspected: false,
    });
  }

  if (
    !isGroqAutomaticAdmissionCurrent(groqAutomaticRoutingAdmissionRecord) ||
    !isGroqQualificationCurrent(groqQualificationRecord) ||
    !catalogAdmitsExactAutomaticGroq20b(catalogSnapshot)
  ) {
    return buildResult({
      status: "blocked",
      selectedModelKey: null,
      decision: buildDecision(input, runtimeSnapshots, catalogSnapshot),
      runtimeSnapshots,
      cloudProviderInspected: false,
    });
  }

  const secondKillSwitchState = await readKillSwitch(dataRootLabel);
  if (secondKillSwitchState.killSwitchEngaged) {
    return buildResult({
      status: "blocked",
      selectedModelKey: null,
      decision: buildDecision(input, runtimeSnapshots, catalogSnapshot),
      runtimeSnapshots,
      cloudProviderInspected: false,
    });
  }

  const groqInspection = await inspectRuntime(PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY);
  runtimeSnapshots.push(groqInspection.snapshot);

  const decision = buildDecision(input, runtimeSnapshots, catalogSnapshot);

  if (isGroqEligible(groqInspection)) {
    if (
      decision.status !== "selected" ||
      decision.selectedModelKey !== PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
    ) {
      throw new Error("Slice M routing did not deterministically select Groq 20B.");
    }

    return buildResult({
      status: "selected-for-approval",
      selectedModelKey: PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      decision,
      runtimeSnapshots,
      cloudProviderInspected: true,
    });
  }

  return buildResult({
    status: "no-eligible-model",
    selectedModelKey: null,
    decision,
    runtimeSnapshots,
    cloudProviderInspected: true,
  });
}
