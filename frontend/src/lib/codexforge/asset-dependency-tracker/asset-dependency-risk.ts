import type { AssetDependency, AssetDependencyRisk } from "./asset-dependency-types";

export function buildAssetDependencyRisk(dependencies: AssetDependency[]): AssetDependencyRisk {
  const issues = dependencies
    .filter((dependency) => dependency.status === "missing" || dependency.status === "blocked")
    .map((dependency) => `${dependency.title} is ${dependency.status}`);
  const level = issues.some((issue) => issue.includes("blocked")) ? "high" : issues.length > 0 ? "medium" : "low";

  return {
    id: "asset-dependency-risk",
    level,
    issues,
    plainEnglish:
      issues.length > 0
        ? `Asset risk is ${level} because ${issues.join(", ")}.`
        : "Asset risk is low because required assets are ready or supplied.",
  };
}
