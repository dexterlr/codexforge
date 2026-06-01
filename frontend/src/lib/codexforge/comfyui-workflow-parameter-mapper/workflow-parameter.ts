import type { WorkflowParameter, WorkflowParameterGroupKind } from "./workflow-parameter-types";

export function buildWorkflowParameter(input: Partial<WorkflowParameter> = {}): WorkflowParameter {
  return {
    id: input.id ?? "workflow-parameter-prompt",
    group: input.group ?? "prompt",
    label: input.label ?? "Prompt text",
    plainEnglish: input.plainEnglish ?? "The words that describe the future video. Safe to edit as text before packaging.",
    safetyLevel: input.safetyLevel ?? "safe editable",
  };
}

export function buildDefaultWorkflowParameters(): WorkflowParameter[] {
  const groups: WorkflowParameterGroupKind[] = [
    "prompt",
    "negative prompt",
    "seed",
    "resolution",
    "frames",
    "duration",
    "sampler/steps",
    "model/checkpoint",
    "LoRA/style",
    "input image/keyframe",
    "output path",
    "batch count",
  ];

  return groups.map((group, index) =>
    buildWorkflowParameter({
      id: `workflow-parameter-${index + 1}`,
      group,
      label: group,
      plainEnglish: `${group} is mapped from a technical workflow value into a reviewable choice.`,
      safetyLevel:
        group === "prompt" || group === "negative prompt" || group === "seed"
          ? "safe editable"
          : group === "batch count" || group === "output path"
            ? "blocked for first run"
            : "review before edit",
    })
  );
}
