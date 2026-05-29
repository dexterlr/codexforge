import type { ReleaseSmokeFailureRouting } from "./release-smoke-pack-types";

export function buildReleaseSmokeFailureRouting(): ReleaseSmokeFailureRouting {
  return { failedBuild: "/closed-loop", failedValidation: "/validation-results", failedDiff: "/files" };
}
