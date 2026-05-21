import { buildCodingFlowRouteHandoff } from "./coding-flow-route-handoff";
import type { CodingFlowFileStep, CodingFlowInput } from "./real-coding-flow-types";

export function buildCodingFlowFileStep(input: CodingFlowInput): CodingFlowFileStep {
  return {
    selectedFilePath: input.selectedFilePath,
    filePurpose: input.selectedFileSummary ?? "Use Files when you need to read project context.",
    fileRisk: input.selectedFilePath?.includes("/api/") || input.selectedFilePath?.includes("server") ? "high" : input.selectedFilePath ? "medium" : "blocked",
    fileCategory: input.selectedFilePath?.split(".").pop() || "unknown",
    contentAvailability: input.selectedFilePath ? "unknown" : "not-selected",
    recommendedNextAction: input.selectedFilePath ? "Inspect it before preparing a patch." : "Pick the file you want to change.",
    routeHandoff: buildCodingFlowRouteHandoff("Open Files"),
    userInstruction: "Pick the file you want to change. Inspect it before preparing a patch. Use Files when you need to read project context.",
  };
}

export function summarizeCodingFlowFileStep(step: CodingFlowFileStep): string {
  return `${step.selectedFilePath ?? "No file selected"}: ${step.recommendedNextAction}`;
}
