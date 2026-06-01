import type { EnvKeyRedactionPolicy } from "./safe-env-key-types";

export function buildEnvKeyRedactionPolicy(): EnvKeyRedactionPolicy {
  return {
    id: "env-key-redaction-policy",
    rules: [
      "Show present, missing, not checked, or manual profile only.",
      "Return booleans only from any future server-side check.",
      "Use .env.local placeholders, never real key text.",
    ],
    blocked: ["raw secret display", "browser localStorage secrets", "password fields", "process.env values in UI or logs"],
  };
}
