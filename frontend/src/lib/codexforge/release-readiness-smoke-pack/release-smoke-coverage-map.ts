import type { ReleaseSmokeCoverageMap } from "./release-smoke-pack-types";

export function buildReleaseSmokeCoverageMap(): ReleaseSmokeCoverageMap {
  return { coveredPhases: ["Coding Flow Live Manual Trial", "MVP Working Path Lock", "Release Readiness Smoke Pack", "Guarded Apply MVP", "Validation Result Capture MVP"], routeCoverage: ["/code-flow/manual-trial", "/code-flow/mvp-path", "/release-smoke", "/guarded-apply-mvp", "/validation-results"] };
}
