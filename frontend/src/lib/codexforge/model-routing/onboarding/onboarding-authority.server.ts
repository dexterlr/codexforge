import "server-only";

import { CODEXFORGE_PRODUCTION_FREE_OR_LOCAL_PROVIDER_REGISTRY } from "../model-routing-provider-registry";
import { CODEXFORGE_ONBOARDING_VALIDATION_POLICY_VERSION } from "./onboarding-constants";
import type {
  CodexForgeOnboardingAdapterAuthority,
  CodexForgeOnboardingEvidenceReference,
  CodexForgeOnboardingValidationAuthority,
} from "./onboarding-types";

function compareCodeUnits(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function freezeAuthority<TValue>(value: TValue): TValue {
  const pending: object[] = [];
  if (typeof value === "object" && value !== null) {
    pending.push(value);
  }

  while (pending.length > 0) {
    const current = pending.pop();
    if (!current || Object.isFrozen(current)) {
      continue;
    }

    for (const key of Object.keys(current)) {
      const child = (current as Record<string, unknown>)[key];
      if (typeof child === "object" && child !== null) {
        pending.push(child);
      }
    }

    Object.freeze(current);
  }

  return value;
}

function cloneEvidence(
  evidence: CodexForgeOnboardingEvidenceReference
): CodexForgeOnboardingEvidenceReference {
  return {
    evidenceId: evidence.evidenceId,
    evidenceVersion: evidence.evidenceVersion,
    kind: evidence.kind,
    scope:
      evidence.scope.level === "provider"
        ? {
            level: "provider",
            providerKey: evidence.scope.providerKey,
          }
        : {
            level: "model",
            providerKey: evidence.scope.providerKey,
            modelKey: evidence.scope.modelKey,
          },
    provenance: evidence.provenance,
    artifactSha256: evidence.artifactSha256,
    checkpointCommit: evidence.checkpointCommit,
    observedOn: evidence.observedOn,
    validThrough: evidence.validThrough,
  };
}

function cloneAdapterBinding(
  binding: CodexForgeOnboardingAdapterAuthority
): CodexForgeOnboardingAdapterAuthority {
  return {
    adapterId: binding.adapterId,
    providerKey: binding.providerKey,
    protocol: binding.protocol,
    locality: binding.locality,
    dataBoundary: binding.dataBoundary,
    credentialMode: binding.credentialMode,
  };
}

export type CodexForgeOnboardingAuthorityInput = Readonly<{
  asOfDate: string;
  adapterBindings?: readonly CodexForgeOnboardingAdapterAuthority[];
  evidenceCatalog?: readonly CodexForgeOnboardingEvidenceReference[];
  additionalReservedProviderKeys?: readonly string[];
  additionalReservedModelKeys?: readonly string[];
}>;

export function createCodexForgeOnboardingValidationAuthority(
  input: CodexForgeOnboardingAuthorityInput
): CodexForgeOnboardingValidationAuthority {
  const productionProviderKeys =
    CODEXFORGE_PRODUCTION_FREE_OR_LOCAL_PROVIDER_REGISTRY.map(
      (registration) => registration.provider.providerId
    );
  const productionModelKeys =
    CODEXFORGE_PRODUCTION_FREE_OR_LOCAL_PROVIDER_REGISTRY.flatMap(
      (registration) => registration.models.map((model) => model.modelKey)
    );

  return freezeAuthority({
    policyVersion: CODEXFORGE_ONBOARDING_VALIDATION_POLICY_VERSION,
    asOfDate: input.asOfDate,
    reservedProviderKeys: [
      ...new Set([
        ...productionProviderKeys,
        ...(input.additionalReservedProviderKeys ?? []),
      ]),
    ].sort(compareCodeUnits),
    reservedModelKeys: [
      ...new Set([
        ...productionModelKeys,
        ...(input.additionalReservedModelKeys ?? []),
      ]),
    ].sort(compareCodeUnits),
    adapterBindings: (input.adapterBindings ?? [])
      .map(cloneAdapterBinding)
      .sort((left, right) =>
        compareCodeUnits(
          `${left.providerKey}::${left.adapterId}`,
          `${right.providerKey}::${right.adapterId}`
        )
      ),
    evidenceCatalog: (input.evidenceCatalog ?? [])
      .map(cloneEvidence)
      .sort((left, right) =>
        compareCodeUnits(left.evidenceId, right.evidenceId)
      ),
  });
}
