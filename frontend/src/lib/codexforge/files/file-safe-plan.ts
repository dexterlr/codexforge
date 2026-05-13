import { calculateFileRisk } from "./file-risk";
import type { CodexForgeFileNode } from "./types";

export type CodexForgeSafeFilePlan = {
  goal: string;
  targetFilePath: string;
  riskLevel: string;
  expectedTouchedFiles: string[];
  suggestedTests: string[];
  approvalGates: string[];
  previewRequirement: string;
  rollbackGuidance: string[];
  executionPolicy: string;
  noWriteExecution: true;
};

export function buildSafeFilePlan(args: {
  file: CodexForgeFileNode;
  goal?: string;
  relatedFilePaths?: string[];
  suggestedTests?: string[];
}): CodexForgeSafeFilePlan {
  const risk = calculateFileRisk(args.file);
  const related = (args.relatedFilePaths ?? []).filter((path) => path !== args.file.path);
  const suggestedTests = args.suggestedTests?.length
    ? args.suggestedTests
    : [
        "npm run build",
        "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-files-command-center.ps1",
        "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-file-workflow.ps1",
      ];

  return {
    goal: args.goal?.trim() || `Prepare a preview-only change plan for ${args.file.name}.`,
    targetFilePath: args.file.path,
    riskLevel: risk.level,
    expectedTouchedFiles: [args.file.path, ...related.slice(0, 4)],
    suggestedTests,
    approvalGates: [
      "Preview required before any write",
      "No file mutation happens from this panel",
      "Apply must go through guarded tool approval",
      risk.level === "high" || risk.level === "critical"
        ? "High-risk owner review required"
        : "Peer review before guarded apply",
    ],
    previewRequirement: "Preview required before any write",
    rollbackGuidance: [
      "Keep the diff scoped to the expected touched files.",
      "Preserve existing contracts and route boundaries.",
      "Use version control diff review before any guarded apply.",
    ],
    executionPolicy:
      "No write execution. This plan is deterministic, read-only, and preview-only.",
    noWriteExecution: true,
  };
}

export function buildSafeFilePlanChecklist(plan: CodexForgeSafeFilePlan): string[] {
  return [
    `Goal captured: ${plan.goal}`,
    `Target locked: ${plan.targetFilePath}`,
    `Risk reviewed: ${plan.riskLevel}`,
    plan.previewRequirement,
    ...plan.approvalGates,
    ...plan.suggestedTests.map((test) => `Validation: ${test}`),
  ];
}

export function summarizeSafeFilePlan(plan: CodexForgeSafeFilePlan): string {
  return `${plan.riskLevel} risk preview plan for ${plan.targetFilePath}; ${plan.previewRequirement.toLowerCase()} and no mutation is available here.`;
}
