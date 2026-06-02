import type { ShotLibrarySafety } from "./shot-library-types";

export function buildShotLibrarySafety(): ShotLibrarySafety {
  return {
    id: "shot-library-safety-001",
    rules: [
      "Shot templates are reusable plan templates.",
      "No generation button exists here.",
      "No provider calls happen here.",
      "No ComfyUI queue submit or render queue mutation starts here.",
    ],
    noGeneration: true,
    noProviderCalls: true,
  };
}
