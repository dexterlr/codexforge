import type { SecureCredentialStrategyItem } from "./secure-credential-strategy-types";

export function buildSecureCredentialStrategyItem(
  input: SecureCredentialStrategyItem
): SecureCredentialStrategyItem {
  return {
    ...input,
    allowedData: [...input.allowedData],
    blockedData: [...input.blockedData],
  };
}

export function buildDefaultSecureCredentialStrategyItems(): SecureCredentialStrategyItem[] {
  return [
    buildSecureCredentialStrategyItem({
      id: "manual-subscription-profile",
      label: "Manual subscription profile",
      kind: "manual-handoff",
      status: "allowed-now",
      operatorCopy: "Use ChatGPT or Claude in the browser yourself, then paste reviewed output back into CodexForge.",
      allowedData: ["Provider name", "subscription tier label", "manual handoff notes"],
      blockedData: ["Passwords", "session cookies", "recovery codes"],
      storageRule: "Store profile metadata only.",
    }),
    buildSecureCredentialStrategyItem({
      id: "external-secret-reference",
      label: "External secret reference",
      kind: "external-secret-reference",
      status: "planned-only",
      operatorCopy: "Future API profiles may point to a reviewed external secret manager name, never the value.",
      allowedData: ["Reference name", "owner", "rotation reminder"],
      blockedData: ["Raw tokens", "printed environment values", "full authorization headers"],
      storageRule: "Store references, not secrets.",
    }),
    buildSecureCredentialStrategyItem({
      id: "browser-storage-block",
      label: "Browser secret storage",
      kind: "external-secret-reference",
      status: "blocked",
      operatorCopy: "CodexForge must not place provider secrets in browser storage.",
      allowedData: ["None for secret values"],
      blockedData: ["localStorage secrets", "raw credential strings", "provider login details"],
      storageRule: "Blocked until a reviewed secure store exists.",
    }),
    buildSecureCredentialStrategyItem({
      id: "local-runtime-profile",
      label: "Local runtime profile",
      kind: "local-runtime-profile",
      status: "allowed-now",
      operatorCopy: "Local providers can be represented by runtime name and capability, without account credentials.",
      allowedData: ["Runtime label", "capability notes", "operator-owned install path label"],
      blockedData: ["Machine passwords", "private config contents"],
      storageRule: "Keep local runtime metadata descriptive.",
    }),
  ];
}

