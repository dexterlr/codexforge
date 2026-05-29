import type { MvpPathNavigationLock } from "./mvp-working-path-types";

export function buildMvpPathNavigationLock(): MvpPathNavigationLock {
  return { commandPaletteLabel: "Open Coding MVP Path", primaryRoute: "/code-flow/mvp-path", wizardAgrees: true };
}
