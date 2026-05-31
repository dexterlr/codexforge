import { buildMvpExperienceLockItem, type MvpExperienceLockItem } from "./mvp-experience-lock-types";
export function buildExperienceCopyLock(): MvpExperienceLockItem {
  return buildMvpExperienceLockItem("copy", "Copy lock", "Plain English copy, no safety essay spam, no fake success, one obvious next step.");
}
