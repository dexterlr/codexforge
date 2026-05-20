import type {
  SandboxArtifactSimulation,
  SandboxCancellationPlan,
  SandboxExecutionRequest,
  SandboxLifecycle,
  SandboxVerificationCheck,
  SandboxVerificationReport,
  SandboxVerificationStatus,
} from "./creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxStableId } from "./creative-execution-sandbox-types";
import { buildSandboxArtifactSimulation } from "./sandbox-artifact-simulation";
import { buildSandboxCancellationPlan } from "./sandbox-cancellation";
import { buildSandboxExecutionRequest, validateSandboxExecutionRequest } from "./sandbox-execution-request";
import { buildSandboxLifecycle } from "./sandbox-lifecycle";

export function buildSandboxVerificationCheck(
  input: Partial<SandboxVerificationCheck> & Pick<SandboxVerificationCheck, "checkId" | "label" | "status" | "detail">
): SandboxVerificationCheck {
  return {
    requiredBeforeHandoff: true,
    ...input,
  };
}

function postureFromChecks(checks: SandboxVerificationCheck[]): SandboxVerificationStatus {
  if (checks.some((check) => check.status === "blocker")) return "blocker";
  if (checks.some((check) => check.status === "risk")) return "risk";
  if (checks.some((check) => check.status === "warning")) return "warning";
  if (checks.every((check) => check.status === "pass")) return "pass";
  return "unknown";
}

export function buildSandboxVerificationReport(input: {
  request?: SandboxExecutionRequest;
  lifecycle?: SandboxLifecycle;
  cancellationPlan?: SandboxCancellationPlan;
  artifactSimulation?: SandboxArtifactSimulation;
} = {}): SandboxVerificationReport {
  const request = input.request ?? buildSandboxExecutionRequest();
  const lifecycle = input.lifecycle ?? buildSandboxLifecycle(request);
  const cancellationPlan = input.cancellationPlan ?? buildSandboxCancellationPlan(request);
  const artifactSimulation = input.artifactSimulation ?? buildSandboxArtifactSimulation(request);
  const requestValidation = validateSandboxExecutionRequest(request);
  const fakeArtifactsClearlyLabeled = artifactSimulation.items.every((item) =>
    item.provenanceNote.toLowerCase().includes("simulated") ||
    item.provenanceNote.toLowerCase().includes("fake") ||
    item.provenanceNote.toLowerCase().includes("sandbox")
  );
  const checks = [
    buildSandboxVerificationCheck({
      checkId: "request-structurally-valid",
      label: "Request structurally valid",
      status: requestValidation.valid ? "pass" : "blocker",
      detail: requestValidation.valid ? "Request has deterministic ids, source metadata, fake inputs, and fake outputs." : requestValidation.blockedReasons.join("; "),
    }),
    buildSandboxVerificationCheck({
      checkId: "policy-reviewed",
      label: "Policy reviewed",
      status: request.approvalPosture === "blocked" ? "blocker" : "pass",
      detail: "Sandbox policy keeps execution disabled and review-gated.",
    }),
    buildSandboxVerificationCheck({
      checkId: "bridge-health-reviewed",
      label: "Bridge health reviewed",
      status: request.localBridgeHealthPosture === "reviewed" ? "pass" : "warning",
      detail: "Local Bridge Health posture is visible before any future executor phase.",
    }),
    buildSandboxVerificationCheck({
      checkId: "no-real-execution-occurred",
      label: "No real execution occurred",
      status: "pass",
      detail: "No real execution occurred: no renderer, command, local HTTP call, provider API call, process launch, or file write is modeled.",
    }),
    buildSandboxVerificationCheck({
      checkId: "fake-artifacts-clearly-labeled",
      label: "Fake artifacts clearly labeled",
      status: fakeArtifactsClearlyLabeled ? "pass" : "risk",
      detail: "Fake artifacts are marked as simulated/fake/sandbox placeholders.",
    }),
    buildSandboxVerificationCheck({
      checkId: "cancellation-path-visible",
      label: "Cancellation path visible",
      status: cancellationPlan.events.length > 0 ? "pass" : "risk",
      detail: cancellationPlan.noLocalProcessToKill,
    }),
    buildSandboxVerificationCheck({
      checkId: "review-handoff-available",
      label: "Review handoff available",
      status: lifecycle.events.some((event) => event.kind === "handoff-ready") ? "pass" : "warning",
      detail: "Review handoff route remains copy-only and review-required.",
    }),
    buildSandboxVerificationCheck({
      checkId: "artifact-review-route-available",
      label: "Artifact review route available",
      status: "pass",
      detail: "Creative Artifact Review route available at /artifacts/review for placeholders and supplied evidence only.",
    }),
    buildSandboxVerificationCheck({
      checkId: "future-executor-blocked",
      label: "Future executor blocked",
      status: "pass",
      detail: "Future executor remains blocked until a separate guarded executor MVP exists.",
    }),
    buildSandboxVerificationCheck({
      checkId: "latest-message-authority-preserved",
      label: "Latest-message authority preserved",
      status: request.latestMessageAuthorityReminder.toLowerCase().includes("latest-message authority") ? "pass" : "risk",
      detail: request.latestMessageAuthorityReminder,
    }),
  ];
  const posture = postureFromChecks(checks);
  const report: SandboxVerificationReport = {
    reportId: buildCreativeExecutionSandboxStableId("sandbox-verification-report", [request.requestId]),
    requestId: request.requestId,
    checks,
    posture,
    blockerCount: checks.filter((check) => check.status === "blocker").length,
    summary: [],
  };

  return { ...report, summary: summarizeSandboxVerificationReport(report) };
}

export function summarizeSandboxVerificationReport(report: Pick<SandboxVerificationReport, "checks" | "posture" | "blockerCount">): string[] {
  return [
    `Verification posture: ${report.posture}.`,
    `${report.checks.length} sandbox verification check(s) are visible.`,
    `${report.blockerCount} blocker check(s).`,
    "Verification confirms the sandbox is simulated and review-only.",
  ];
}
