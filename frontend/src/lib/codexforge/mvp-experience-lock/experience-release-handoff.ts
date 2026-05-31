import { buildMvpExperienceLockItem, type MvpExperienceLockItem } from "./mvp-experience-lock-types";
export function buildExperienceReleaseHandoff(): MvpExperienceLockItem {
  return buildMvpExperienceLockItem("handoff", "Release handoff", "Copy the release demo handoff and keep manual items explicit.");
}
