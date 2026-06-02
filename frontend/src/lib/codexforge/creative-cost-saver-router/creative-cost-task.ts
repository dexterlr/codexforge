import type { CreativeCostTask, CreativeCostTaskType } from "./creative-cost-saver-types";

const TASK_COPY: Record<CreativeCostTaskType, Omit<CreativeCostTask, "id" | "type" | "reviewRequired">> = {
  "video idea planning": {
    label: "Video idea planning",
    plainEnglish: "Shape the idea locally before any paid render is considered.",
    qualityGoal: "Clear intent, style, duration, and constraints.",
    localFirstStep: "Use planning pages and notes first.",
  },
  "storyboard planning": {
    label: "Storyboard planning",
    plainEnglish: "Plan shots locally so expensive attempts are not spent on unclear timing.",
    qualityGoal: "A simple shot list that a beginner can review.",
    localFirstStep: "Build the storyboard before draft generation.",
  },
  "keyframe planning": {
    label: "Keyframe planning",
    plainEnglish: "Plan keyframes before image or video generation so the draft has direction.",
    qualityGoal: "Stable visual anchors for later review.",
    localFirstStep: "Prepare keyframe intent without generating images.",
  },
  "low-res local draft": {
    label: "Low-res local draft",
    plainEnglish: "Make a cheap local draft first when a local workflow is available.",
    qualityGoal: "Fast proof of motion and composition.",
    localFirstStep: "Use a reviewed local draft plan before cloud.",
  },
  "local upscale": {
    label: "Local upscale",
    plainEnglish: "Improve a draft locally when the machine can handle it.",
    qualityGoal: "Higher resolution after the draft is worth keeping.",
    localFirstStep: "Plan local upscale before a cloud final.",
  },
  "local interpolation": {
    label: "Local interpolation",
    plainEnglish: "Smooth motion locally only after the draft is worth keeping.",
    qualityGoal: "Cleaner motion without wasting cloud credits.",
    localFirstStep: "Plan interpolation after review.",
  },
  "local final candidate": {
    label: "Local final candidate",
    plainEnglish: "Try a local final-quality candidate when local time is cheaper than cloud credits.",
    qualityGoal: "A final candidate that can be reviewed before cloud fallback.",
    localFirstStep: "Queue a reviewed future local candidate only after approval exists.",
  },
  "cloud final fallback": {
    label: "Cloud final fallback",
    plainEnglish: "Use cloud later only when local output cannot meet the goal.",
    qualityGoal: "Final quality after local review proves cloud is needed.",
    localFirstStep: "Finish local review and handoff first.",
  },
  "artifact review": {
    label: "Artifact review",
    plainEnglish: "Review artifacts before retrying or spending more.",
    qualityGoal: "Keep, compare, retry, or stop with evidence.",
    localFirstStep: "Inspect supplied results manually.",
  },
  "retry/failure recovery": {
    label: "Retry/failure recovery",
    plainEnglish: "Recover from failures with a smaller safer plan before another paid attempt.",
    qualityGoal: "Avoid repeating the same failed setup.",
    localFirstStep: "Review failure notes and choose a cheaper retry path.",
  },
};

function stableTaskId(type: CreativeCostTaskType): string {
  return type.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function buildCreativeCostTask(type: CreativeCostTaskType, input: Partial<CreativeCostTask> = {}): CreativeCostTask {
  const copy = TASK_COPY[type];
  return {
    id: input.id ?? `creative-cost-${stableTaskId(type)}`,
    type,
    label: input.label ?? copy.label,
    plainEnglish: input.plainEnglish ?? copy.plainEnglish,
    qualityGoal: input.qualityGoal ?? copy.qualityGoal,
    localFirstStep: input.localFirstStep ?? copy.localFirstStep,
    reviewRequired: input.reviewRequired ?? true,
  };
}

export function buildDefaultCreativeCostTasks(): CreativeCostTask[] {
  return (Object.keys(TASK_COPY) as CreativeCostTaskType[]).map((type) => buildCreativeCostTask(type));
}
