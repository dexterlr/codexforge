import type { ProductionPack, ProductionPackReplay } from "./production-pack-types";

export function buildProductionPackReplay(pack: Pick<ProductionPack, "id" | "title" | "items" | "manifest" | "safetyBoundary">): ProductionPackReplay {
  const replay: ProductionPackReplay = {
    id: `${pack.id}:replay`,
    sourceBrief: `${pack.title} prepared as a preview-pack for reviewable artifact export.`,
    selectedPackItems: pack.items.map((item) => item.type),
    safetyPosture: pack.safetyBoundary,
    exportChecklist: [
      "Review manifest and item list.",
      "Prepare export requests.",
      "Set explicit approval in UI before guarded export.",
      "Keep targets under .codexforge/artifacts.",
    ],
    validationCommands: [
      "npm run build",
      "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-production-pack.ps1",
      "git diff --check",
    ],
    followUpPrompt: "",
    summary: [],
  };

  return {
    ...replay,
    followUpPrompt: buildProductionPackReplayPrompt(replay),
    summary: summarizeProductionPackReplay(replay),
  };
}

export function buildProductionPackReplayPrompt(replay: ProductionPackReplay): string {
  return [
    "Continue this CodexForge production pack safely.",
    `Source brief: ${replay.sourceBrief}`,
    `Selected items: ${replay.selectedPackItems.join(", ")}`,
    `Safety posture: ${replay.safetyPosture}`,
    `Export checklist: ${replay.exportChecklist.join(" | ")}`,
    "Remain preview-only unless explicit artifact workspace export approval is granted.",
  ].join("\n");
}

export function summarizeProductionPackReplay(replay: ProductionPackReplay): string[] {
  return [
    `Replay captures ${replay.selectedPackItems.length} selected pack item(s).`,
    `${replay.validationCommands.length} validation command label(s) included for reviewer use.`,
    "Follow-up prompt preserves preview-only and approval boundaries.",
  ];
}
