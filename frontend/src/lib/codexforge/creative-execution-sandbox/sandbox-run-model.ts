import type {
  SandboxExecutionRequest,
  SandboxRunModel,
  SandboxRunStep,
  SandboxRunStepId,
  SandboxStepStatus,
} from "./creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxStableId } from "./creative-execution-sandbox-types";
import { buildSandboxExecutionRequest } from "./sandbox-execution-request";

type StepDefinition = {
  stepId: SandboxRunStepId;
  label: string;
  status: SandboxStepStatus;
  detail: string;
  sideEffectSummary: string;
};

const STEP_DEFINITIONS: readonly StepDefinition[] = [
  {
    stepId: "request-accepted",
    label: "Request accepted",
    status: "completed",
    detail: "Sandbox request is accepted as deterministic metadata only.",
    sideEffectSummary: "No external system is touched.",
  },
  {
    stepId: "policy-reviewed",
    label: "Policy reviewed",
    status: "completed",
    detail: "Policy posture is reviewed as text; execution remains disabled.",
    sideEffectSummary: "No policy persistence or Brain mutation.",
  },
  {
    stepId: "bridge-health-reviewed",
    label: "Bridge health reviewed",
    status: "simulated",
    detail: "Local Bridge Health posture is read as supplied metadata.",
    sideEffectSummary: "No health probe and no local HTTP call.",
  },
  {
    stepId: "inputs-validated",
    label: "Inputs validated",
    status: "completed",
    detail: "Supplied fake inputs are checked for labels and expected outputs.",
    sideEffectSummary: "No file read or file write.",
  },
  {
    stepId: "queue-position-simulated",
    label: "Queue position simulated",
    status: "simulated",
    detail: "A queue slot is represented as fake lifecycle state.",
    sideEffectSummary: "No queue worker is created.",
  },
  {
    stepId: "execution-start-simulated",
    label: "Execution start simulated",
    status: "simulated",
    detail: "Start event is fake and does not launch Blender, ComfyUI, Unreal, ffmpeg, or any renderer.",
    sideEffectSummary: "No command execution and no local process launch.",
  },
  {
    stepId: "progress-simulated",
    label: "Progress simulated",
    status: "simulated",
    detail: "Progress labels are deterministic and capped.",
    sideEffectSummary: "No worker, timer, or renderer progress is polled.",
  },
  {
    stepId: "artifact-capture-simulated",
    label: "Artifact capture simulated",
    status: "simulated",
    detail: "Fake artifact placeholders are created as in-memory labels only.",
    sideEffectSummary: "No artifact files, blobs, or directories are written.",
  },
  {
    stepId: "verification-simulated",
    label: "Verification simulated",
    status: "simulated",
    detail: "Verification checks confirm that the run is fake and reviewable.",
    sideEffectSummary: "No test command, provider call, or endpoint call.",
  },
  {
    stepId: "review-handoff-ready",
    label: "Review handoff ready",
    status: "ready",
    detail: "Copy-only review handoff can be sent to Creative Artifact Review.",
    sideEffectSummary: "No automatic route navigation or persistence.",
  },
  {
    stepId: "completed-simulated",
    label: "Completed simulated",
    status: "completed",
    detail: "The sandbox can end in a simulated completion state.",
    sideEffectSummary: "No success is claimed for real execution.",
  },
  {
    stepId: "cancelled-simulated",
    label: "Cancelled simulated",
    status: "cancelled",
    detail: "Cancellation branch marks fake progress incomplete and keeps review required.",
    sideEffectSummary: "No local process exists to kill.",
  },
  {
    stepId: "blocked",
    label: "Blocked",
    status: "blocked",
    detail: "Real execution remains blocked until a future guarded executor phase exists.",
    sideEffectSummary: "No renderer, command, endpoint, or file write can start.",
  },
] as const;

export function buildSandboxRunStep(
  input: Partial<SandboxRunStep> & Pick<SandboxRunStep, "stepId" | "order">
): SandboxRunStep {
  const definition = STEP_DEFINITIONS.find((step) => step.stepId === input.stepId);
  return {
    label: definition?.label ?? input.stepId,
    status: definition?.status ?? "pending",
    detail: definition?.detail ?? "Sandbox step is simulated.",
    sideEffectSummary: definition?.sideEffectSummary ?? "No real execution.",
    ...input,
    noRealExecution: true,
  };
}

export function buildSandboxRunModel(
  request: SandboxExecutionRequest = buildSandboxExecutionRequest()
): SandboxRunModel {
  const steps = STEP_DEFINITIONS.map((step, index) =>
    buildSandboxRunStep({
      stepId: step.stepId,
      order: index + 1,
    })
  );
  const model: SandboxRunModel = {
    runId: buildCreativeExecutionSandboxStableId("creative-execution-sandbox-run", [
      request.requestId,
      request.sandboxMode,
    ]),
    requestId: request.requestId,
    executorKind: request.executorKind,
    adapterId: request.adapterId,
    lifecycleSteps: steps,
    simulatedDurationLabel: "fake duration label: sandbox-preview-00m-42s",
    expectedFakeArtifacts: request.expectedFakeOutputs.map((output) => `simulated ${output}`),
    simulatedLogs: [
      "simulated request accepted",
      "simulated progress 50 percent",
      "simulated verification complete",
    ],
    simulatedVerificationChecks: [
      "request structurally valid",
      "no real execution occurred",
      "fake artifacts clearly labeled",
    ],
    riskPosture: request.localBridgeHealthPosture === "reviewed" ? "warning" : "risk",
    reviewRequired: true,
    noExecutionGuarantee:
      "Sandbox run model is simulation-only: no real execution, no command execution, no render execution, no local HTTP calls, and no file writes.",
    summary: [],
  };

  return { ...model, summary: summarizeSandboxRunModel(model) };
}

export function summarizeSandboxRunModel(model: Pick<SandboxRunModel, "lifecycleSteps" | "riskPosture" | "reviewRequired" | "noExecutionGuarantee">): string[] {
  return [
    `${model.lifecycleSteps.length} sandbox run steps are modeled.`,
    `Risk posture: ${model.riskPosture}.`,
    `Review required: ${String(model.reviewRequired)}.`,
    model.noExecutionGuarantee,
  ];
}
