import { buildMvpExperienceLockItem, type MvpExperienceLockItem } from "./mvp-experience-lock-types";
export function buildExperienceNavigationLock(): MvpExperienceLockItem {
  return buildMvpExperienceLockItem("navigation", "Navigation lock", "No duplicate nav, no cramped labels, no route clutter, command palette includes the new route.");
}
