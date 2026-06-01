import type { KeyframePlan } from "./keyframe-plan-types";
export function buildKeyframePlan(input: Partial<KeyframePlan> = {}): KeyframePlan { return { id: input.id ?? "keyframe-plan-local-draft", title: input.title ?? "Local draft keyframe plan", sourceStoryboard: input.sourceStoryboard ?? "opening, main action, detail, and closing shots", nextStep: input.nextStep ?? "Review still-frame prompts before any image generation." }; }
export function buildDefaultKeyframePlan(): KeyframePlan { return buildKeyframePlan(); }
