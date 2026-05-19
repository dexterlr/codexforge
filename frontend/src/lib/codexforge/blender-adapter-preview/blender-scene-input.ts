import type {
  BlenderSceneInput,
  BlenderSceneInputValidation,
  BlenderSceneKind,
} from "./blender-adapter-types";
import { buildBlenderAdapterStableId } from "./blender-adapter-types";

type BlenderSceneInputArgs = Partial<Omit<BlenderSceneInput, "sceneInputId">> & {
  sceneInputId?: string;
};

const DEFAULT_GOAL = "Cinematic product-shot preview with a hero object, simple studio floor, camera framing, and reviewable Blender Python script preview.";
const SCENE_KIND_KEYWORDS: Array<[BlenderSceneKind, string[]]> = [
  ["product-shot", ["product", "hero object", "studio"]],
  ["cinematic", ["cinematic", "film", "shot"]],
  ["architecture", ["architecture", "building", "interior"]],
  ["technical-diagram", ["technical", "diagram", "exploded"]],
  ["character-blockout", ["character", "blockout", "pose"]],
  ["motion-graphics", ["motion", "graphics", "title"]],
  ["environment", ["environment", "world", "landscape"]],
  ["abstract", ["abstract", "shape", "procedural"]],
];

function inferSceneKind(goal: string, fallback?: BlenderSceneKind): BlenderSceneKind {
  const normalized = goal.toLowerCase();
  return (
    SCENE_KIND_KEYWORDS.find(([, keywords]) =>
      keywords.some((keyword) => normalized.includes(keyword))
    )?.[0] ?? fallback ?? "unknown"
  );
}

function listOrDefault(value: string[] | undefined, fallback: string[]): string[] {
  return value && value.length > 0 ? value : fallback;
}

export function buildBlenderSceneInput(input: BlenderSceneInputArgs = {}): BlenderSceneInput {
  const sourceCreativePlanId = input.sourceCreativePlanId ?? "creative-plan-blender-preview";
  const sceneGoal = input.sceneGoal ?? DEFAULT_GOAL;
  const sceneKind = input.sceneKind ?? inferSceneKind(sceneGoal, "product-shot");

  return {
    sceneInputId:
      input.sceneInputId ??
      buildBlenderAdapterStableId("blender-scene-input", [sourceCreativePlanId, sceneGoal]),
    sourceCreativePlanId,
    sceneGoal,
    sceneKind,
    visualStyle: input.visualStyle ?? "premium dark studio preview with clean material contrast",
    scale: input.scale ?? "tabletop subject scale with meter-based Blender units",
    environment: input.environment ?? "simple studio floor and neutral world background",
    objectHints: listOrDefault(input.objectHints, [
      "hero product cube",
      "supporting pedestal cylinder",
      "background plane",
      "imported-asset-placeholder silhouette",
    ]),
    materialHints: listOrDefault(input.materialHints, [
      "matte graphite",
      "brushed metal accent",
      "soft emissive guide line",
    ]),
    cameraHints: listOrDefault(input.cameraHints, ["three-quarter hero shot", "camera target at subject center"]),
    lightingHints: listOrDefault(input.lightingHints, ["studio-three-point", "soft rim highlight"]),
    animationHints: listOrDefault(input.animationHints, ["optional slow turntable placeholder"]),
    renderIntent: input.renderIntent ?? "preview script only; no render execution",
    operatorConstraints: listOrDefault(input.operatorConstraints, [
      "preview-only",
      "no Blender execution",
      "no render execution",
      "no file writes",
      "future executor boundary",
      "preserve latest-message authority",
    ]),
    noExecutionGuarantee:
      input.noExecutionGuarantee ??
      "Phase 62 generates a deterministic Blender adapter preview only; it does not launch Blender, execute Python, write files, or render.",
  };
}

export function validateBlenderSceneInput(input: BlenderSceneInput): BlenderSceneInputValidation {
  const blockedReasons = [
    input.noExecutionGuarantee.toLowerCase().includes("does not launch blender")
      ? null
      : "No-execution guarantee must explicitly block Blender launch.",
    input.operatorConstraints.some((constraint) => constraint.toLowerCase().includes("no file writes"))
      ? null
      : "Operator constraints must block file writes.",
  ].filter((item): item is string => !!item);

  const warnings = [
    input.sceneKind === "unknown" ? "Scene kind is unknown; adapter uses generic primitives." : null,
    input.animationHints.length > 0
      ? "Animation hints are placeholders only; no render or timeline execution is performed."
      : null,
  ].filter((item): item is string => !!item);

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
  };
}

export function summarizeBlenderSceneInput(input: BlenderSceneInput): string[] {
  return [
    `Scene input ${input.sceneInputId} maps creative plan ${input.sourceCreativePlanId}.`,
    `Scene kind ${input.sceneKind}; goal: ${input.sceneGoal}`,
    `Constraints: ${input.operatorConstraints.join(", ")}.`,
  ];
}
