import type { ProviderAdapterContract } from "./provider-adapter-types";

export function buildProviderAdapterContract(input: ProviderAdapterContract): ProviderAdapterContract {
  return { ...input };
}

export function buildCloudApiContract(input: {
  requestShape: string;
  connectionShape: string;
  noviceExplanation: string;
}): ProviderAdapterContract {
  return buildProviderAdapterContract({
    requestShape: input.requestShape,
    connectionShape: input.connectionShape,
    safeSetupShape: "Definition-only setup record with env var names, privacy posture, and readiness notes.",
    controlPlaneOnly: true,
    noviceExplanation: input.noviceExplanation,
  });
}

export function buildLocalServerContract(input: {
  requestShape: string;
  connectionShape: string;
  noviceExplanation: string;
}): ProviderAdapterContract {
  return buildProviderAdapterContract({
    requestShape: input.requestShape,
    connectionShape: input.connectionShape,
    safeSetupShape: "Local server placeholder only. No live local server call yet.",
    controlPlaneOnly: true,
    noviceExplanation: input.noviceExplanation,
  });
}
