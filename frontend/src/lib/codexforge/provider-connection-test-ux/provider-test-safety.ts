import type { ProviderTestSafety } from "./provider-connection-test-types";

export function buildProviderTestSafety(): ProviderTestSafety {
  return {
    id: "provider-test-safety",
    rules: [
      "No provider call buttons in this phase.",
      "No secret fields and no localStorage API key storage.",
      "Safe now means profile checks, env presence design, local probe preview, or manual browser checks.",
      "Future live tests need approval and must avoid prompt payloads.",
    ],
    blocked: ["cloud live test", "prompt payload", "raw API key display", "password storage", "automatic model call"],
  };
}
