import type { AssetDependencyNextAction, AssetDependencyReadiness, AssetDependencyRisk } from "./asset-dependency-types";

export function buildAssetDependencyNextAction(
  readiness: AssetDependencyReadiness,
  risk: AssetDependencyRisk
): AssetDependencyNextAction {
  if (readiness.blockedCount > 0) {
    return {
      id: "resolve-blocked-video-asset",
      label: "Resolve blocked asset note",
      plainEnglish: risk.issues[0] ?? "Resolve the blocked asset before draft, finishing, or export.",
      route: "/video-recovery",
      manualOnly: true,
    };
  }

  if (readiness.missingCount > 0) {
    return {
      id: "supply-missing-video-asset",
      label: "Supply missing asset",
      plainEnglish: "Add or review missing keyframe, draft, or review metadata before continuing.",
      route: "/video-assets",
      manualOnly: true,
    };
  }

  return {
    id: "review-video-export-assets",
    label: "Review export target",
    plainEnglish: "Assets look ready for export handoff review, but export is still manual.",
    route: "/video-export",
    manualOnly: true,
  };
}
