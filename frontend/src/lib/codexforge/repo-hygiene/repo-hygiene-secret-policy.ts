import type { RepoHygieneSecretPolicy } from "./repo-hygiene-types";

export function buildRepoHygieneSecretPolicy(): RepoHygieneSecretPolicy {
  return {
    trackedEnvStatus: "No tracked env files were found during the audit.",
    localEnvStatus: "Local env files stay ignored and were not read or printed.",
    browserRules: [
      "Do not store provider secrets in browser storage.",
      "Do not render raw server env values.",
      "Do not call provider APIs from hygiene panels.",
    ],
    serverRules: [
      "Server checks should return present or missing only.",
      "Do not return token prefixes, passwords, or raw env output.",
      "Keep local runtime state out of committed source.",
    ],
    status: "review",
  };
}
