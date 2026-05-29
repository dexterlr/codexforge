import type { LiveRunFileSelection, LiveRunInput } from "./coding-flow-live-run-types";
export function buildLiveRunFileSelection(input: LiveRunInput): LiveRunFileSelection { return { selectedFile: input.selectedFile, route: "/files", nextAction: input.selectedFile ? "Describe change" : "Pick file" }; }
