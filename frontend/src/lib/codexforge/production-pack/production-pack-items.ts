import type {
  ProductionPackInput,
  ProductionPackItem,
  ProductionPackItemType,
  ProductionPackSourceSurface,
} from "./production-pack-types";

const ITEM_TYPES: ProductionPackItemType[] = [
  "production-plan.md",
  "storyboard.md",
  "render-queue.preview.json",
  "blender-script.preview.py",
  "comfyui-workflow.preview.json",
  "unreal-command.preview.txt",
  "patch-plan.md",
  "run-replay.md",
  "validation-checklist.md",
  "artifact-ledger.json",
];

export function buildProductionPackItem(args: {
  packId: string;
  type: ProductionPackItemType;
  sourceSurface: ProductionPackSourceSurface;
  content: string;
}): ProductionPackItem {
  return {
    id: `${args.packId}:${args.type}`,
    type: args.type,
    title: args.type,
    content: withPreviewBoundary(args.content),
    targetRelativePath: `production/${args.packId}/${args.type}`,
    previewOnly: true,
    sourceSurface: args.sourceSurface,
    safetyNote:
      "preview-only production pack item; source mutation blocked; explicit export approval required",
  };
}

export function buildCreativePackItems(input: ProductionPackInput = {}): ProductionPackItem[] {
  const packId = stablePackId(input);
  return [
    buildProductionPackItem({
      packId,
      type: "production-plan.md",
      sourceSurface: "creative",
      content: [
        "# Production Plan",
        "",
        "Mode: preview-pack.",
        "Plan: bundle storyboard, render queue, creative adapter previews, validation, and ledger for review.",
        "Approval boundary: no render, no external app launch, and no source mutation.",
      ].join("\n"),
    }),
    buildProductionPackItem({
      packId,
      type: "storyboard.md",
      sourceSurface: "creative",
      content: [
        "# Storyboard",
        "",
        "Shot 01: Establish the operator studio and review lanes.",
        "Shot 02: Inspect storyboard, Blender, ComfyUI, Unreal, and render queue previews.",
        "Shot 03: Hold export approval before guarded artifact workspace writes.",
      ].join("\n"),
    }),
    buildProductionPackItem({
      packId,
      type: "render-queue.preview.json",
      sourceSurface: "creative",
      content: JSON.stringify(
        {
          mode: "preview-pack",
          previewOnly: true,
          items: ["storyboard-preview", "blender-preview", "comfyui-preview", "unreal-preview"],
          safety: "no render execution",
        },
        null,
        2
      ),
    }),
    buildProductionPackItem({
      packId,
      type: "blender-script.preview.py",
      sourceSurface: "creative",
      content: [
        "# preview-only Blender script package",
        "# This file is inert review content and does not launch Blender.",
        "SCENE_PLAN = {'mode': 'preview-pack', 'approved_for_execution': False}",
      ].join("\n"),
    }),
    buildProductionPackItem({
      packId,
      type: "comfyui-workflow.preview.json",
      sourceSurface: "creative",
      content: JSON.stringify(
        {
          mode: "preview-pack",
          previewOnly: true,
          approvedForExecution: false,
          nodes: ["prompt-placeholder", "sampler-placeholder", "output-placeholder"],
        },
        null,
        2
      ),
    }),
    buildProductionPackItem({
      packId,
      type: "unreal-command.preview.txt",
      sourceSurface: "creative",
      content:
        "preview-pack Unreal command preview only; this text is a review placeholder and does not launch Unreal.",
    }),
  ];
}

export function buildPatchPackItems(input: ProductionPackInput = {}): ProductionPackItem[] {
  const packId = stablePackId(input);
  return [
    buildProductionPackItem({
      packId,
      type: "patch-plan.md",
      sourceSurface: "patch-preview",
      content: [
        "# Patch Plan",
        "",
        "Mode: preview-pack.",
        "Scope: review expected touched files, test plan, rollback notes, and approval boundary.",
        "No apply-diff, write-file, shell execution, or source mutation is performed by this pack.",
      ].join("\n"),
    }),
  ];
}

export function buildRunPackItems(input: ProductionPackInput = {}): ProductionPackItem[] {
  const packId = stablePackId(input);
  return [
    buildProductionPackItem({
      packId,
      type: "run-replay.md",
      sourceSurface: "operator-run",
      content: [
        "# Run Replay",
        "",
        `Source run: ${input.sourceRunId ?? "production-pack-preview-run"}.`,
        "Replay posture: preview-only, approval-gated, no desktop control, no camera, no broker action.",
      ].join("\n"),
    }),
    buildProductionPackItem({
      packId,
      type: "validation-checklist.md",
      sourceSurface: "operator-run",
      content: [
        "# Validation Checklist",
        "",
        "- npm run build",
        "- powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-production-pack.ps1",
        "- git diff --check",
        "",
        "These are reviewer commands, not actions executed by the production pack.",
      ].join("\n"),
    }),
    buildProductionPackItem({
      packId,
      type: "artifact-ledger.json",
      sourceSurface: "operator-run",
      content: JSON.stringify(
        {
          mode: "preview-pack",
          previewOnly: true,
          states: ["planned", "ready-for-review", "awaiting-export-approval"],
          persistence: "none in domain logic",
        },
        null,
        2
      ),
    }),
  ];
}

export function buildProductionPackItems(input: ProductionPackInput = {}): ProductionPackItem[] {
  const surface = input.sourceSurface ?? "mixed";
  if (surface === "creative") return buildCreativePackItems(input);
  if (surface === "patch-preview") return buildPatchPackItems(input);
  if (surface === "operator-run") return buildRunPackItems(input);
  return [...buildCreativePackItems(input), ...buildPatchPackItems(input), ...buildRunPackItems(input)].sort(
    (left, right) => ITEM_TYPES.indexOf(left.type) - ITEM_TYPES.indexOf(right.type)
  );
}

export function summarizeProductionPackItems(items: ProductionPackItem[]): string[] {
  return [
    `${items.length} preview pack item(s) prepared.`,
    `${items.filter((item) => item.previewOnly).length} item(s) marked preview-only.`,
    "No filesystem writes are performed by item builders.",
  ];
}

function withPreviewBoundary(content: string): string {
  const boundary =
    "Preview-only: this production pack is inert review content; source mutation blocked; explicit export approval required.";
  return content.toLowerCase().includes("preview-only") ? `${content}\n\n${boundary}` : `${boundary}\n\n${content}`;
}

function stablePackId(input: ProductionPackInput): string {
  return (input.id ?? "production-pack-phase-12").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
}
