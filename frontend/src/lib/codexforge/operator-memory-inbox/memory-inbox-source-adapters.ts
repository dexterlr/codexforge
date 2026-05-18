import { buildOperatorMemoryInboxCards } from "./memory-inbox-card-builder";
import type { MemoryInboxSource, MemoryInboxSourceInput, MemoryInboxSourceSummary, OperatorMemoryInboxCard } from "./operator-memory-inbox-types";

function adapt(source: MemoryInboxSource, inputs?: readonly MemoryInboxSourceInput[]) {
  const supplied = inputs && inputs.length > 0 ? inputs : [{ title: defaultTitle(source), detail: defaultDetail(source) }];
  return buildOperatorMemoryInboxCards(supplied.map((input) => ({
    ...input,
    source,
    sourceIds: input.sourceIds ?? [input.id ?? defaultTitle(source)],
    relatedRoutes: input.relatedRoutes ?? ["/memory-inbox"],
    evidenceSnippets: input.evidenceSnippets ?? [input.detail ?? defaultDetail(source)],
  })));
}

function defaultTitle(source: MemoryInboxSource): string {
  if (source === "activity") return "Activity signal memory candidate";
  if (source === "verification") return "Verification result memory candidate";
  if (source === "regression") return "Regression lesson memory candidate";
  if (source === "patch-workflow") return "Patch workflow safety memory candidate";
  if (source === "stabilization") return "Stabilization next action memory candidate";
  if (source === "creative") return "Creative production note memory candidate";
  return "Manual operator note memory candidate";
}

function defaultDetail(source: MemoryInboxSource): string {
  if (source === "verification") return "PASS build and smoke output should become a reviewed verification-result candidate only.";
  if (source === "regression") return "Duplicate key, layout, or browser warning should become a reviewed regression-lesson candidate.";
  if (source === "patch-workflow") return "Apply gate, dry-run, apply-diff, write-file, and run-command boundaries remain safety-boundary context only.";
  if (source === "stabilization") return "Stabilization risks and next actions can suggest memory, but promotion remains review gated.";
  if (source === "creative") return "Storyboard, render, ComfyUI, Unreal, or Blender planning can become creative-production-note context.";
  if (source === "manual") return "Manual operator notes are visible candidates and do not auto-persist.";
  return "Activity events can seed reviewed memory candidates without graph mutation.";
}

export function buildMemoryInboxCardsFromActivity(inputs?: readonly MemoryInboxSourceInput[]) { return adapt("activity", inputs); }
export function buildMemoryInboxCardsFromVerification(inputs?: readonly MemoryInboxSourceInput[]) { return adapt("verification", inputs); }
export function buildMemoryInboxCardsFromRegression(inputs?: readonly MemoryInboxSourceInput[]) { return adapt("regression", inputs); }
export function buildMemoryInboxCardsFromPatchWorkflow(inputs?: readonly MemoryInboxSourceInput[]) { return adapt("patch-workflow", inputs); }
export function buildMemoryInboxCardsFromStabilization(inputs?: readonly MemoryInboxSourceInput[]) { return adapt("stabilization", inputs); }
export function buildMemoryInboxCardsFromCreative(inputs?: readonly MemoryInboxSourceInput[]) { return adapt("creative", inputs); }

export function summarizeMemoryInboxSources(cards: readonly OperatorMemoryInboxCard[]): MemoryInboxSourceSummary[] {
  const sources = Array.from(new Set(cards.map((card) => card.source))).sort() as MemoryInboxSource[];
  return sources.map((source) => {
    const sourceCards = cards.filter((card) => card.source === source);
    const surfaces = sourceCards.map((card) => card.sourceSurface).sort();
    return {
      source,
      count: sourceCards.length,
      reviewRequiredCount: sourceCards.filter((card) => card.reviewState !== "promotion-ready").length,
      topSurface: surfaces[0] ?? "Unknown",
      summary: [`${sourceCards.length} ${source} card(s), review-first and no auto-promotion.`],
    };
  });
}
