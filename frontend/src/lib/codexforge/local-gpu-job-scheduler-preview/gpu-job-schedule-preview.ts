import type { GpuJobPriority, GpuJobProfile, GpuJobSchedulePreview } from "./local-gpu-scheduler-types";

const PRIORITY_ORDER = ["now", "soon", "later", "background", "blocked"] as const;

export function buildGpuJobSchedulePreview(
  profiles: GpuJobProfile[],
  priorities: GpuJobPriority[],
  input: Partial<GpuJobSchedulePreview> = {}
): GpuJobSchedulePreview {
  const priorityByJob = new Map(priorities.map((priority) => [priority.jobId, priority.level]));
  const orderedJobIds = [...profiles]
    .sort((a, b) => {
      const aPriority = PRIORITY_ORDER.indexOf(priorityByJob.get(a.id) ?? "later");
      const bPriority = PRIORITY_ORDER.indexOf(priorityByJob.get(b.id) ?? "later");
      return aPriority - bPriority || a.id.localeCompare(b.id);
    })
    .map((profile) => profile.id);

  return {
    id: input.id ?? "gpu-job-schedule-preview",
    orderedJobIds: input.orderedJobIds ?? orderedJobIds,
    lanes: input.lanes ?? ["review first", "light jobs first when useful", "heavy jobs queued", "blocked jobs stay manual"],
    plainEnglish:
      input.plainEnglish ??
      "The schedule preview orders local creative jobs so the workstation is used safely. It does not schedule real jobs.",
    executionAllowed: false,
  };
}
