import type { AssetDependencySummary } from "./asset-dependency-types";
import { buildAssetDependencyHandoff } from "./asset-dependency-handoff";
import { buildAssetDependencyNextAction } from "./asset-dependency-next-action";
import { buildAssetDependencyReadiness } from "./asset-dependency-readiness";
import { buildAssetDependencyRisk } from "./asset-dependency-risk";
import { buildDefaultAssetDependencies } from "./asset-dependency";
import { buildDefaultAssetDependencyGroups } from "./asset-dependency-group";

export function buildAssetDependencySummary(): AssetDependencySummary {
  const dependencies = buildDefaultAssetDependencies();
  const groups = buildDefaultAssetDependencyGroups(dependencies);
  const risk = buildAssetDependencyRisk(dependencies);
  const readiness = buildAssetDependencyReadiness(dependencies);
  const nextAction = buildAssetDependencyNextAction(readiness, risk);
  const handoff = buildAssetDependencyHandoff(dependencies);

  return {
    dependencies,
    groups,
    risk,
    readiness,
    nextAction,
    handoff,
    summary: summarizeAssetDependencies({ dependencies, groups, risk, readiness, nextAction, handoff, summary: "" }),
  };
}

export function summarizeAssetDependencies(summary: AssetDependencySummary): string {
  return `${summary.dependencies.length} video asset dependencies are grouped; readiness is ${summary.readiness.status} with ${summary.readiness.missingCount} missing and ${summary.readiness.blockedCount} blocked.`;
}
