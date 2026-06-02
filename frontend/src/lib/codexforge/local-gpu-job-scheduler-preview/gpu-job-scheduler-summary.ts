import type { GpuJobSchedulerSummary } from "./local-gpu-scheduler-types";
import { buildDefaultGpuJobProfiles } from "./gpu-job-profile";
import { buildGpuJobPriority } from "./gpu-job-priority";
import { buildGpuJobResourcePlan } from "./gpu-job-resource-plan";
import { buildGpuJobSchedulePreview } from "./gpu-job-schedule-preview";
import { buildGpuJobSchedulerHandoff } from "./gpu-job-scheduler-handoff";
import { buildGpuJobSchedulerSafety } from "./gpu-job-scheduler-safety";

export function buildGpuJobSchedulerSummary(): GpuJobSchedulerSummary {
  const profiles = buildDefaultGpuJobProfiles();
  const priorities = profiles.map((profile) => buildGpuJobPriority(profile));
  const summary: GpuJobSchedulerSummary = {
    profiles,
    priorities,
    resourcePlans: profiles.map((profile) => buildGpuJobResourcePlan(profile)),
    schedule: buildGpuJobSchedulePreview(profiles, priorities),
    safety: buildGpuJobSchedulerSafety(),
    handoff: buildGpuJobSchedulerHandoff(),
    summary: "",
  };
  return { ...summary, summary: summarizeGpuSchedulerPreview(summary) };
}

export function summarizeGpuSchedulerPreview(summary: GpuJobSchedulerSummary): string {
  const heavyCount = summary.profiles.filter((profile) => profile.resourcePosture === "heavy" || profile.resourcePosture === "very-heavy").length;
  return `${summary.profiles.length} GPU job profiles, ${heavyCount} heavy or very-heavy jobs, preview-only schedule, no job queue execution.`;
}
