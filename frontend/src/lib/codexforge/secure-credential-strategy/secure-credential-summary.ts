import type { SecureCredentialStrategyItem, SecureCredentialStrategySummary } from "./secure-credential-strategy-types";

export function buildSecureCredentialStrategySummary(
  items: SecureCredentialStrategyItem[]
): SecureCredentialStrategySummary {
  return {
    id: "secure-credential-strategy",
    items: items.map((item) => ({ ...item, allowedData: [...item.allowedData], blockedData: [...item.blockedData] })),
    blockedStorageRules: [
      "No raw password storage.",
      "No localStorage secrets.",
      "No process environment values printed in UI.",
      "No real credentials in demo data.",
    ],
    summary: [
      "Credential handling is profile-first and secret-value-free.",
      "Manual subscriptions use handoff copy instead of automation.",
      "API profiles remain planned until a reviewed secure reference flow exists.",
    ],
  };
}

