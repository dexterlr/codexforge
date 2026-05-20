import type {
  CreativeExecutionSandboxModel,
  CreativeExecutionSandboxSummary,
  SandboxArtifactSimulation,
  SandboxCancellationPlan,
  SandboxExecutionRequest,
  SandboxLifecycle,
  SandboxLogSimulation,
  SandboxNextActionPlan,
  SandboxReviewHandoff,
  SandboxRunModel,
  SandboxValidation,
  SandboxVerificationReport,
} from "./creative-execution-sandbox-types";
import { buildSandboxArtifactSimulation } from "./sandbox-artifact-simulation";
import { buildSandboxCancellationPlan } from "./sandbox-cancellation";
import { buildSandboxExecutionRequest, validateSandboxExecutionRequest } from "./sandbox-execution-request";
import { buildSandboxLifecycle } from "./sandbox-lifecycle";
import { buildSandboxLogSimulation } from "./sandbox-log-simulation";
import { buildSandboxNextActionPlan } from "./sandbox-next-action";
import { buildSandboxReviewHandoff } from "./sandbox-review-handoff";
import { buildSandboxRunModel } from "./sandbox-run-model";
import { buildSandboxVerificationReport } from "./sandbox-verification";

export function buildCreativeExecutionSandboxSummary(input: {
  request: SandboxExecutionRequest;
  requestValidation: SandboxValidation;
  runModel: SandboxRunModel;
  lifecycle: SandboxLifecycle;
  cancellationPlan: SandboxCancellationPlan;
  artifactSimulation: SandboxArtifactSimulation;
  logSimulation: SandboxLogSimulation;
  verificationReport: SandboxVerificationReport;
  reviewHandoff: SandboxReviewHandoff;
  nextActionPlan: SandboxNextActionPlan;
}): CreativeExecutionSandboxSummary {
  return {
    requestReady: input.requestValidation.valid,
    runModelReady: input.runModel.lifecycleSteps.length > 0,
    lifecycleEventCount: input.lifecycle.events.length,
    fakeArtifactCount: input.artifactSimulation.items.length,
    fakeLogCount: input.logSimulation.lines.length,
    verificationPosture: input.verificationReport.posture,
    cancellationReadiness: input.cancellationPlan.status,
    reviewHandoffReadiness: input.reviewHandoff.artifactReviewPacket.placeholderOnly ? "ready-for-placeholder-review" : "blocked",
    nextSafeAction: input.nextActionPlan.selected.label,
  };
}

export function buildCreativeExecutionSandboxModel(): CreativeExecutionSandboxModel {
  const request = buildSandboxExecutionRequest();
  const requestValidation = validateSandboxExecutionRequest(request);
  const runModel = buildSandboxRunModel(request);
  const lifecycle = buildSandboxLifecycle(request);
  const cancellationPlan = buildSandboxCancellationPlan(request);
  const artifactSimulation = buildSandboxArtifactSimulation(request);
  const logSimulation = buildSandboxLogSimulation(request);
  const verificationReport = buildSandboxVerificationReport({
    request,
    lifecycle,
    cancellationPlan,
    artifactSimulation,
  });
  const reviewHandoff = buildSandboxReviewHandoff({
    request,
    runModel,
    artifactSimulation,
    logSimulation,
    verificationReport,
  });
  const nextActionPlan = buildSandboxNextActionPlan({
    request,
    verificationReport,
    artifactSimulation,
  });
  const summary = buildCreativeExecutionSandboxSummary({
    request,
    requestValidation,
    runModel,
    lifecycle,
    cancellationPlan,
    artifactSimulation,
    logSimulation,
    verificationReport,
    reviewHandoff,
    nextActionPlan,
  });

  return {
    request,
    requestValidation,
    runModel,
    lifecycle,
    cancellationPlan,
    artifactSimulation,
    logSimulation,
    verificationReport,
    reviewHandoff,
    nextActionPlan,
    summary,
  };
}

export function summarizeCreativeExecutionSandboxSession(summary: CreativeExecutionSandboxSummary): string[] {
  return [
    `Request ready: ${String(summary.requestReady)}.`,
    `Run model ready: ${String(summary.runModelReady)}.`,
    `Lifecycle events: ${String(summary.lifecycleEventCount)}.`,
    `Fake artifacts: ${String(summary.fakeArtifactCount)}.`,
    `Fake logs: ${String(summary.fakeLogCount)}.`,
    `Verification posture: ${summary.verificationPosture}.`,
    `Cancellation readiness: ${summary.cancellationReadiness}.`,
    `Review handoff readiness: ${summary.reviewHandoffReadiness}.`,
    `Next safe action: ${summary.nextSafeAction}.`,
  ];
}
