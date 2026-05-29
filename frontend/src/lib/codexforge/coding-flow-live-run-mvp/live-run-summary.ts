import type { LiveRunInput, LiveRunStepState, LiveRunSummary } from "./coding-flow-live-run-types";
export function buildLiveRunSummary(input: LiveRunInput, state: LiveRunStepState): LiveRunSummary { return { title: "Run the coding flow", currentStep: input.currentStep, selectedFile: input.selectedFile ?? "No file selected", nextAction: state.primaryAction, status: input.validationStatus }; }
