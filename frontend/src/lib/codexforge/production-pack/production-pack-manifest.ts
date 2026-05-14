import {
  CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
  buildSafeArtifactPath,
} from "@/lib/codexforge/artifact-workspace";
import type {
  ProductionPackItem,
  ProductionPackManifest,
  ProductionPackSourceSurface,
} from "./production-pack-types";

export function buildProductionPackManifest(args: {
  packId: string;
  title: string;
  items: ProductionPackItem[];
}): ProductionPackManifest {
  const sourceSurfaces = Array.from(new Set(args.items.map((item) => item.sourceSurface)));
  const manifest: ProductionPackManifest = {
    id: `${args.packId}:manifest`,
    packId: args.packId,
    title: args.title,
    itemCount: args.items.length,
    items: args.items.map((item) => ({
      id: item.id,
      type: item.type,
      targetRelativePath: item.targetRelativePath,
    })),
    sourceSurfaces,
    safetyPosture:
      "preview-pack only; no command execution, no external app execution, no render execution, no source mutation",
    approvalBoundary:
      "Export requires explicit operator approval and may write only under .codexforge/artifacts.",
    suggestedExportTargetPaths: args.items
      .map((item) => buildSafeArtifactPath(item.targetRelativePath))
      .filter((path): path is string => Boolean(path)),
    validationChecklist: [
      "Every item has non-empty preview-only content.",
      "Every target path is relative to the safe artifact workspace.",
      "No target path mutates src, app, scripts, docs, package, or config files.",
      "Every export request defaults approved false until operator approval.",
    ],
    summary: [],
  };

  return { ...manifest, summary: summarizeProductionPackManifest(manifest) };
}

export function summarizeProductionPackManifest(manifest: ProductionPackManifest): string[] {
  return [
    `${manifest.title}: ${manifest.itemCount} item(s) from ${formatSurfaces(manifest.sourceSurfaces)}.`,
    `Suggested exports resolve under ${CODEXFORGE_ARTIFACT_WORKSPACE_ROOT}.`,
    manifest.approvalBoundary,
  ];
}

function formatSurfaces(surfaces: ProductionPackSourceSurface[]): string {
  return surfaces.length > 0 ? surfaces.join(", ") : "no surfaces";
}
