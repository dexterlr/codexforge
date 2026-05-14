import { buildProductionPackExportRequests, summarizeProductionPackExportRequests } from "./production-pack-export";
import { buildProductionPackItems, summarizeProductionPackItems } from "./production-pack-items";
import { buildProductionPackLedger } from "./production-pack-ledger";
import { buildProductionPackManifest } from "./production-pack-manifest";
import { buildProductionPackReplay } from "./production-pack-replay";
import { selectProductionPackNextAction, summarizeProductionPack } from "./production-pack-summary";
import type { ProductionPack, ProductionPackInput } from "./production-pack-types";
import { validateProductionPack } from "./production-pack-validation";

export function buildProductionPack(input: ProductionPackInput = {}): ProductionPack {
  const id = stablePackId(input.id ?? "production-pack-phase-12");
  const title = input.title?.trim() || "CodexForge Production Pack";
  const sourceSurface = input.sourceSurface ?? "mixed";
  const sourceRunId = input.sourceRunId?.trim() || "phase-12-preview-pack";
  const items = buildProductionPackItems({ ...input, id, title, sourceSurface, sourceRunId });
  const manifest = buildProductionPackManifest({ packId: id, title, items });
  const exportRequests = buildProductionPackExportRequests({ packId: id, sourceRunId, items });
  const safetyBoundary =
    "preview-pack only; explicit export approval required; safe artifact workspace; source mutation blocked; no command, render, Blender, Unreal, ComfyUI, desktop, camera, or broker execution";

  let pack: ProductionPack = {
    id,
    title,
    sourceSurface,
    sourceRunId,
    mode: "preview-pack",
    items,
    manifest,
    exportRequests,
    exportReadiness: summarizeProductionPackExportRequests(exportRequests).join(" "),
    validation: {
      id: `${id}:validation:pending`,
      state: "needs-review",
      issues: [],
      summary: ["Validation pending."],
    },
    ledger: {
      id: `${id}:ledger:pending`,
      state: "planned",
      items: [],
      summary: ["Ledger pending."],
    },
    replay: {
      id: `${id}:replay:pending`,
      sourceBrief: input.sourceBrief ?? title,
      selectedPackItems: [],
      safetyPosture: safetyBoundary,
      exportChecklist: [],
      validationCommands: [],
      followUpPrompt: "",
      summary: ["Replay pending."],
    },
    safetyBoundary,
    nextAction: "Review pack.",
    summary: [],
  };

  pack = {
    ...pack,
    validation: validateProductionPack(pack),
  };
  pack = {
    ...pack,
    ledger: buildProductionPackLedger(pack),
  };
  pack = {
    ...pack,
    replay: buildProductionPackReplay(pack),
  };
  pack = {
    ...pack,
    nextAction: selectProductionPackNextAction(pack),
  };

  return { ...pack, summary: [...summarizeProductionPack(pack), ...summarizeProductionPackItems(items)] };
}

function stablePackId(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "production-pack";
}
