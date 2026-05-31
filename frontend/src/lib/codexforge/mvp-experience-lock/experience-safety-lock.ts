import { buildMvpExperienceLockItem, type MvpExperienceLockItem } from "./mvp-experience-lock-types";
export function buildExperienceSafetyLock(): MvpExperienceLockItem {
  return buildMvpExperienceLockItem("safety", "Safety lock", "No unsafe buttons, no auto-apply, no auto-run, approval required, latest-message authority preserved.");
}
