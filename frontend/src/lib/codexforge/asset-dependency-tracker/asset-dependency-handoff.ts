import type { AssetDependency, AssetDependencyHandoff } from "./asset-dependency-types";

export function buildAssetDependencyHandoff(dependencies: AssetDependency[]): AssetDependencyHandoff {
  return {
    id: "asset-dependency-handoff",
    copyLabel: "Copy asset checklist allowed",
    checklist: dependencies.map((dependency) => `${dependency.kind}: ${dependency.title} is ${dependency.status}`),
    safetyNote:
      "Checklist is copy-only. No file browser, no arbitrary path access, no deletion, no generation, no upload, and no queue mutation happens here.",
  };
}
