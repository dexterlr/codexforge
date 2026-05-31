import { buildMvpExperienceLockItem, type MvpExperienceLockItem } from "./mvp-experience-lock-types";
export function buildExperienceDemoLock(): MvpExperienceLockItem {
  return buildMvpExperienceLockItem("demo", "Demo lock", "Demo explains what is real and manual, and links product trial and runbook.");
}
