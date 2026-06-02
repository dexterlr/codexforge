import type { AssetDependency, AssetDependencyReadiness } from "./asset-dependency-types";

export function buildAssetDependencyReadiness(dependencies: AssetDependency[]): AssetDependencyReadiness {
  const readyCount = dependencies.filter((dependency) => dependency.status === "ready" || dependency.status === "supplied").length;
  const blockedCount = dependencies.filter((dependency) => dependency.status === "blocked").length;
  const missingCount = dependencies.filter((dependency) => dependency.status === "missing").length;
  const status = blockedCount > 0 ? "blocked" : missingCount > 0 ? "missing" : "ready";

  return {
    id: "asset-dependency-readiness",
    status,
    readyCount,
    blockedCount,
    missingCount,
    plainEnglish: `${readyCount} asset(s) are ready or supplied; ${missingCount} missing and ${blockedCount} blocked item(s) need manual review.`,
  };
}
