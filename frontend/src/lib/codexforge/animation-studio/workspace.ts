import type { AssetRef, AssetType, StudioId } from "./domain";

export const PROJECT_DIRECTORIES = ["brief", "bible", "storyboards", "assets/characters", "assets/environments", "assets/props", "assets/brand", "assets/ui", "assets/audio", "rigs", "generation", "blender", "after-effects/shots", "after-effects/master", "premiere", "audio", "review", "renders", "masters", "manifests", "qc", "logs"] as const;
export type WorkspaceArea = typeof PROJECT_DIRECTORIES[number];
export function assertStudioId(value: unknown, kind: string): asserts value is StudioId {
  if (!["project", "sequence", "shot", "asset", "character", "environment", "rig", "generation", "render", "qc", "approval", "prompt", "model", "cost", "job", "event"].includes(kind) || typeof value !== "string" || value.length > 128 || !new RegExp(`^${kind}_[a-z0-9]+(?:_[a-z0-9]+)*$`, "u").test(value)) throw new Error(`Invalid ${kind} ID.`);
}
/** Portable relative paths only. Native retained handles own physical resolution. */
export function resolveStudioPath(projectId: StudioId<"project">, area?: WorkspaceArea, filename?: string): string {
  assertStudioId(projectId, "project");
  if (area !== undefined && !PROJECT_DIRECTORIES.includes(area)) throw new Error("Unknown studio workspace area.");
  if (filename !== undefined && (!area || !/^[a-z0-9][a-z0-9._-]{0,127}$/u.test(filename) || /[. ]$/u.test(filename) || /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/iu.test(filename))) throw new Error("Unsafe studio filename.");
  return ["studio", "projects", projectId, ...(area ? area.split("/") : []), ...(filename ? [filename] : [])].join("/");
}
const ASSET_AREAS: Readonly<Record<AssetType, WorkspaceArea>> = { CHARACTER: "assets/characters", ENVIRONMENT: "assets/environments", PROP: "assets/props", BRAND: "assets/brand", UI: "assets/ui", AUDIO: "assets/audio", IMAGE: "generation", VIDEO: "renders", RIG: "rigs", DOCUMENT: "brief", MASTER: "masters" };
export function resolveAssetPath(projectId: StudioId<"project">, ref: AssetRef, type: AssetType, hash: string): string {
  assertStudioId(ref.assetId, "asset");
  if (!Number.isSafeInteger(ref.version) || ref.version < 1 || !/^[a-f0-9]{64}$/u.test(hash) || !Object.hasOwn(ASSET_AREAS, type)) throw new Error("Invalid asset path binding.");
  return `${resolveStudioPath(projectId, ASSET_AREAS[type])}/${ref.assetId}/v${ref.version}/${hash}.bin`;
}
