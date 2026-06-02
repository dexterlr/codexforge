import type { VideoSafetyCheck, VideoSafetyCheckId } from "./video-generation-safety-types";

const DEFAULT_CHECKS: VideoSafetyCheckId[] = [
  "local health gate exists",
  "metadata probe reviewed",
  "workflow import reviewed",
  "workflow safety inspected",
  "parameters mapped",
  "dry run contract reviewed",
  "submit boundary reviewed",
  "render queue controls reviewed",
  "artifact capture ready",
  "review inbox ready",
  "recovery path ready",
  "export handoff ready",
  "cloud fallback review ready",
  "local-vs-cloud decision ready",
  "no secret exposure",
  "no auto-run default",
  "explicit approval required",
];

function categoryForCheck(check: VideoSafetyCheckId): VideoSafetyCheck["category"] {
  if (check.includes("cloud") || check.includes("local-vs-cloud")) return "cloud";
  if (check.includes("artifact") || check.includes("review inbox") || check.includes("export")) return "artifact";
  if (check.includes("workflow") || check.includes("parameters") || check.includes("dry run")) return "workflow";
  if (check.includes("auto-run") || check.includes("approval") || check.includes("secret")) return "policy";
  if (check.includes("submit") || check.includes("queue")) return "execution";
  return "local";
}

export function buildVideoSafetyCheck(
  check: VideoSafetyCheckId,
  input: Partial<VideoSafetyCheck> = {}
): VideoSafetyCheck {
  return {
    id: input.id ?? `video-safety-check-${check.replace(/[^a-z0-9]+/g, "-")}`,
    check: input.check ?? check,
    category: input.category ?? categoryForCheck(check),
    status: input.status ?? (check.includes("cloud") || check.includes("local-vs-cloud") ? "warn" : "pass"),
    plainEnglish:
      input.plainEnglish ??
      `${check} is reviewed before planning any future real local video generation trial.`,
  };
}

export function buildDefaultVideoSafetyChecks(): VideoSafetyCheck[] {
  return DEFAULT_CHECKS.map((check) => buildVideoSafetyCheck(check));
}
