import {
  buildArtifactExportRequest,
  type ArtifactExportRequest,
} from "@/lib/codexforge/artifact-workspace";
import type { ProductionPack, ProductionPackItem } from "./production-pack-types";

export function buildProductionPackExportRequest(args: {
  packId: string;
  sourceRunId: string;
  item: ProductionPackItem;
  approved?: boolean;
  overwrite?: boolean;
}): ArtifactExportRequest {
  return buildArtifactExportRequest({
    artifactId: args.item.id,
    type: args.item.type,
    title: args.item.title,
    content: args.item.content,
    targetRelativePath: args.item.targetRelativePath,
    approved: args.approved === true,
    overwrite: args.overwrite === true,
    sourceSurface: `Production Pack Builder / ${args.item.sourceSurface}`,
    sourceRunId: args.sourceRunId,
    approvalNote:
      "Production pack export requires explicit export approval required; source mutation blocked; safe artifact workspace only.",
  });
}

export function buildProductionPackExportRequests(args: {
  packId: string;
  sourceRunId: string;
  items: ProductionPackItem[];
  approved?: boolean;
  overwrite?: boolean;
}): ArtifactExportRequest[] {
  return args.items.map((item) =>
    buildProductionPackExportRequest({
      packId: args.packId,
      sourceRunId: args.sourceRunId,
      item,
      approved: args.approved,
      overwrite: args.overwrite,
    })
  );
}

export function summarizeProductionPackExportRequests(
  requestsOrPack: ArtifactExportRequest[] | ProductionPack
): string[] {
  const requests = Array.isArray(requestsOrPack) ? requestsOrPack : requestsOrPack.exportRequests;
  const approved = requests.filter((request) => request.approved).length;
  return [
    `${requests.length} guarded artifact export request(s) prepared.`,
    `${approved} request(s) approved; ${requests.length - approved} awaiting explicit export approval.`,
    "Export targets remain relative artifact workspace paths under .codexforge/artifacts.",
  ];
}
