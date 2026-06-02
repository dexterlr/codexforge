import type { CloudVideoProvider, CloudVideoProviderHandoff } from "./cloud-video-provider-types";

export function buildCloudVideoProviderHandoff(
  provider: Pick<CloudVideoProvider, "name"> | undefined,
  input: Partial<CloudVideoProviderHandoff> = {}
): CloudVideoProviderHandoff {
  const providerName = provider?.name ?? "manual cloud provider";
  return {
    id: input.id ?? `${providerName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-handoff`,
    copyLabel: input.copyLabel ?? "Copy provider handoff allowed",
    packet:
      input.packet ??
      [
        `Provider option: ${providerName}`,
        "Local-first work remains the default",
        "Nothing is uploaded yet",
        "No provider is called",
        "No credits are spent",
        "Final render needs approval before any real execution path",
      ],
    safetyNote:
      input.safetyNote ??
      "Copying this handoff does not send prompts, files, assets, passwords, or API keys anywhere.",
  };
}
