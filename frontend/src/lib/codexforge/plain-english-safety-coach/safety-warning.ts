import type { SafetyWarning } from "./safety-coach-types";

export function buildSafetyWarning(): SafetyWarning {
  return { title: "Stop and review when", warnings: ["The file is package, config, lock, runtime, tool-policy, or Brain related", "The change affects more than one file", "The preview is hard to understand", "Validation output is missing or unclear"] };
}
