import { buildFileCognitiveContext, type CodexForgeFileCognitiveContext } from "./file-cognitive-context";
import { buildFileReadinessBoard, type CodexForgeFileReadinessBoard } from "./file-readiness";
import { calculateFileRisk } from "./file-risk";
import { buildSafeFilePlan, type CodexForgeSafeFilePlan } from "./file-safe-plan";
import type {
  CodexForgeFileDependency,
  CodexForgeFileNode,
  CodexForgeFileRuntimeContextSignal,
} from "./types";

export type CodexForgeFileWorkflowStepId =
  | "inspect"
  | "understand"
  | "plan"
  | "preview"
  | "approve"
  | "apply via guarded tool later";

export type CodexForgeFileWorkflowStep = {
  id: CodexForgeFileWorkflowStepId;
  label: string;
  status: "ready" | "current" | "blocked" | "future";
  detail: string;
};

export type CodexForgeFileWorkflow = {
  selectedFile: CodexForgeFileNode;
  inferredFileRole: string;
  riskScore: number;
  riskLevel: string;
  readinessStatus: string;
  relatedRuntimeSignals: string[];
  safeNextActions: string[];
  suggestedSmokeTests: string[];
  suggestedReviewGates: string[];
  safeEditPlan: CodexForgeSafeFilePlan;
  cognitiveContext: CodexForgeFileCognitiveContext;
  readinessBoard: CodexForgeFileReadinessBoard;
  steps: CodexForgeFileWorkflowStep[];
};

export function buildFileWorkflowStep(
  id: CodexForgeFileWorkflowStepId,
  status: CodexForgeFileWorkflowStep["status"] = "ready"
): CodexForgeFileWorkflowStep {
  const details: Record<CodexForgeFileWorkflowStepId, string> = {
    inspect: "Read the selected file, dependency trace, and risk drivers.",
    understand: "Attach cognitive context, memory hints, and runtime signals.",
    plan: "Prepare a safe edit plan with tests, review gates, and rollback guidance.",
    preview: "Preview required before any write.",
    approve: "Operator approval is required outside this panel.",
    "apply via guarded tool later": "Apply is not implemented in Phase 4.",
  };

  return {
    id,
    label: id,
    status,
    detail: details[id],
  };
}

function buildSuggestedSmokeTests(file: CodexForgeFileNode): string[] {
  const tests = [
    "npm run build",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-files-command-center.ps1",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-file-workflow.ps1",
  ];

  if (file.path.includes("/brain/")) {
    tests.push("powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-brain-runtime.ps1");
  }

  if (file.path.includes("/files/")) {
    tests.push("powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-files-runtime.ps1");
  }

  return Array.from(new Set(tests));
}

export function buildFileWorkflow(args: {
  selectedFile: CodexForgeFileNode;
  files?: CodexForgeFileNode[];
  dependencies?: CodexForgeFileDependency[];
  runtimeSignals?: CodexForgeFileRuntimeContextSignal[];
}): CodexForgeFileWorkflow {
  const risk = calculateFileRisk(args.selectedFile);
  const relatedPaths = (args.dependencies ?? [])
    .filter(
      (dependency) =>
        dependency.fromPath === args.selectedFile.path ||
        dependency.toPath === args.selectedFile.path
    )
    .map((dependency) =>
      dependency.fromPath === args.selectedFile.path ? dependency.toPath : dependency.fromPath
    )
    .sort();
  const suggestedSmokeTests = buildSuggestedSmokeTests(args.selectedFile);
  const safeEditPlan = buildSafeFilePlan({
    file: args.selectedFile,
    relatedFilePaths: relatedPaths,
    suggestedTests: suggestedSmokeTests,
  });
  const cognitiveContext = buildFileCognitiveContext({
    file: args.selectedFile,
    runtimeSignals: args.runtimeSignals,
  });
  const readinessBoard = buildFileReadinessBoard({
    file: args.selectedFile,
    cognitiveContext,
    safePlan: safeEditPlan,
  });
  const steps: CodexForgeFileWorkflowStep[] = [
    buildFileWorkflowStep("inspect", "current"),
    buildFileWorkflowStep("understand", cognitiveContext.signals.length ? "ready" : "blocked"),
    buildFileWorkflowStep("plan", "ready"),
    buildFileWorkflowStep("preview", "ready"),
    buildFileWorkflowStep("approve", risk.level === "high" || risk.level === "critical" ? "blocked" : "ready"),
    buildFileWorkflowStep("apply via guarded tool later", "future"),
  ];

  return {
    selectedFile: args.selectedFile,
    inferredFileRole: args.selectedFile.architectureRole,
    riskScore: risk.score,
    riskLevel: risk.level,
    readinessStatus: readinessBoard.status,
    relatedRuntimeSignals: cognitiveContext.signals
      .filter((signal) => signal.kind === "runtime-health")
      .map((signal) => signal.label),
    safeNextActions: [
      "Inspect current file and related context.",
      "Prepare preview-only plan.",
      "Run suggested smoke tests before approval.",
      "Route any apply through guarded tool approval later.",
    ],
    suggestedSmokeTests,
    suggestedReviewGates: safeEditPlan.approvalGates,
    safeEditPlan,
    cognitiveContext,
    readinessBoard,
    steps,
  };
}

export function selectNextFileWorkflowAction(
  workflow: CodexForgeFileWorkflow
): CodexForgeFileWorkflowStep {
  return (
    workflow.steps.find((step) => step.status === "current") ??
    workflow.steps.find((step) => step.status === "ready") ??
    workflow.steps[workflow.steps.length - 1]
  );
}

export function summarizeFileWorkflow(workflow: CodexForgeFileWorkflow): string {
  const next = selectNextFileWorkflowAction(workflow);
  return `${workflow.selectedFile.path} is ${workflow.readinessStatus} with ${workflow.riskLevel} risk (${workflow.riskScore}/100). Next: ${next.label}.`;
}
