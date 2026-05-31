import { buildExperienceRouteLock } from "./experience-route-lock";
import { buildExperienceCopyLock } from "./experience-copy-lock";
import { buildExperienceNavigationLock } from "./experience-navigation-lock";
import { buildExperienceDemoLock } from "./experience-demo-lock";
import { buildExperienceSafetyLock } from "./experience-safety-lock";
import { buildExperienceReadinessDecision } from "./experience-readiness-decision";
import { buildExperienceReleaseHandoff } from "./experience-release-handoff";
import type { MvpExperienceLockSummary } from "./mvp-experience-lock-types";
export function buildMvpExperienceLockSummary(): MvpExperienceLockSummary {
  return { title: "MVP experience lock", status: "demo-ready-with-notes", primaryAction: "Copy release demo handoff", nextRoute: "/demo", items: [buildExperienceRouteLock(), buildExperienceCopyLock(), buildExperienceNavigationLock(), buildExperienceDemoLock(), buildExperienceSafetyLock(), buildExperienceReadinessDecision(), buildExperienceReleaseHandoff()] };
}
