import type { ProductionPack } from "./production-pack-types";

export function summarizeProductionPack(pack: ProductionPack): string[] {
  return [
    `${pack.title}: ${pack.items.length} reviewable item(s) in ${pack.mode}.`,
    `Source: ${pack.sourceSurface} / ${pack.sourceRunId}.`,
    `Validation: ${pack.validation.state}.`,
    `Export readiness: ${pack.exportReadiness}.`,
    `Next action: ${pack.nextAction}.`,
  ];
}

export function selectProductionPackNextAction(pack: Pick<ProductionPack, "validation" | "exportRequests">): string {
  if (pack.validation.state === "blocked") return "Resolve blocked validation issues before export review.";
  if (pack.exportRequests.some((request) => request.approved !== true)) {
    return "Review pack and grant explicit export approval before guarded artifact export.";
  }
  return "Submit approved requests to the safe artifact workspace export API.";
}
