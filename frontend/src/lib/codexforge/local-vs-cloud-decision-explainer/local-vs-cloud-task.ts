import type { LocalVsCloudTask } from "./local-vs-cloud-types";

export function buildLocalVsCloudTask(input: Partial<LocalVsCloudTask> = {}): LocalVsCloudTask {
  return {
    id: input.id ?? "local-vs-cloud-video-task",
    label: input.label ?? "Video final quality decision",
    plainEnglish:
      input.plainEnglish ??
      "Decide whether this video job should stay local or move to a reviewed cloud fallback later.",
    privacySensitive: input.privacySensitive ?? true,
    finalQualityNeeded: input.finalQualityNeeded ?? true,
    localDraftAvailable: input.localDraftAvailable ?? true,
  };
}

export function buildDefaultLocalVsCloudTasks(): LocalVsCloudTask[] {
  return [
    buildLocalVsCloudTask({
      id: "local-private-draft-task",
      label: "Private or early draft",
      plainEnglish: "Use local for drafts, private references, and cheap iteration.",
      privacySensitive: true,
      finalQualityNeeded: false,
      localDraftAvailable: false,
    }),
    buildLocalVsCloudTask({
      id: "local-final-candidate-task",
      label: "Local final candidate",
      plainEnglish: "Try local finishing first when the local draft is close enough.",
      privacySensitive: false,
      finalQualityNeeded: true,
      localDraftAvailable: true,
    }),
    buildLocalVsCloudTask({
      id: "cloud-review-task",
      label: "Cloud final review",
      plainEnglish: "Review cloud only when local quality cannot meet the final target.",
      privacySensitive: false,
      finalQualityNeeded: true,
      localDraftAvailable: true,
    }),
  ];
}
