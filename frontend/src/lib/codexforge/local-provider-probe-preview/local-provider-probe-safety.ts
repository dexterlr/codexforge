import type { LocalProviderProbeSafety } from "./local-provider-probe-types";

export function buildLocalProviderProbeSafety(): LocalProviderProbeSafety {
  return {
    id: "local-provider-probe-safety",
    rules: [
      "Only local hosts are eligible for future live health checks.",
      "Health checks must send no prompts and no secrets.",
      "Results should say reachable, not reachable, not checked, or blocked.",
    ],
    blocked: ["cloud provider API calls", "prompt payloads", "API key headers", "automatic model inference", "non-local hosts"],
  };
}
