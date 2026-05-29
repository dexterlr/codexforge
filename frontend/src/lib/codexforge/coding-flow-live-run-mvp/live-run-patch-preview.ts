import type { LiveRunInput, LiveRunPatchPreview } from "./coding-flow-live-run-types";
export function buildLiveRunPatchPreview(input: LiveRunInput): LiveRunPatchPreview { return { route: "/files", previewRequired: true, summary: input.changeDescription ? "Preview patch handoff is ready." : "Describe change before preview patch." }; }
