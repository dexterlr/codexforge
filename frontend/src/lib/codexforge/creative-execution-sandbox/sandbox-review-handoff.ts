import type {
  SandboxArtifactReviewPacket,
  SandboxArtifactSimulation,
  SandboxExecutionRequest,
  SandboxLogSimulation,
  SandboxReviewHandoff,
  SandboxRunModel,
  SandboxVerificationReport,
} from "./creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxStableId } from "./creative-execution-sandbox-types";
import { buildSandboxArtifactSimulation } from "./sandbox-artifact-simulation";
import { buildSandboxExecutionRequest } from "./sandbox-execution-request";
import { buildSandboxLogSimulation } from "./sandbox-log-simulation";
import { buildSandboxRunModel } from "./sandbox-run-model";
import { buildSandboxVerificationReport } from "./sandbox-verification";

export function buildSandboxArtifactReviewPacket(input: {
  runModel?: SandboxRunModel;
  artifactSimulation?: SandboxArtifactSimulation;
} = {}): SandboxArtifactReviewPacket {
  const runModel = input.runModel ?? buildSandboxRunModel();
  const artifactSimulation = input.artifactSimulation ?? buildSandboxArtifactSimulation();
  return {
    packetId: buildCreativeExecutionSandboxStableId("sandbox-artifact-review-packet", [runModel.runId]),
    runId: runModel.runId,
    route: "/artifacts/review",
    artifacts: artifactSimulation.items,
    safetyNote:
      "Artifact review is for placeholders/supplied evidence only: sandbox only, no real files written, no render executed, and no local process launched.",
    placeholderOnly: true,
  };
}

export function buildSandboxExecutorReviewPrompt(input: {
  request?: SandboxExecutionRequest;
  runModel?: SandboxRunModel;
  artifactSimulation?: SandboxArtifactSimulation;
  logSimulation?: SandboxLogSimulation;
  verificationReport?: SandboxVerificationReport;
} = {}): string {
  const request = input.request ?? buildSandboxExecutionRequest();
  const runModel = input.runModel ?? buildSandboxRunModel(request);
  const artifactSimulation = input.artifactSimulation ?? buildSandboxArtifactSimulation(request);
  const logSimulation = input.logSimulation ?? buildSandboxLogSimulation(request);
  const verificationReport =
    input.verificationReport ??
    buildSandboxVerificationReport({ request, artifactSimulation });

  return [
    "Review Creative Execution Sandbox handoff.",
    "Sandbox only.",
    "No real files written.",
    "No render executed.",
    "No local process launched.",
    "Artifact review is for placeholders/supplied evidence only.",
    "Preserve latest-message authority.",
    `Run: ${runModel.runId}.`,
    `Source packet: ${request.sourceExecutionPacketId}.`,
    `Fake artifacts: ${artifactSimulation.items.map((item) => `${item.label} (${item.type})`).join(", ")}.`,
    `Fake log lines: ${String(logSimulation.lines.length)} capped simulated lines.`,
    `Verification posture: ${verificationReport.posture}.`,
    "Future executor route remains /creative-executor and must stay blocked until a separate guarded phase exists.",
  ].join("\n");
}

export function buildSandboxReviewHandoff(input: {
  request?: SandboxExecutionRequest;
  runModel?: SandboxRunModel;
  artifactSimulation?: SandboxArtifactSimulation;
  logSimulation?: SandboxLogSimulation;
  verificationReport?: SandboxVerificationReport;
} = {}): SandboxReviewHandoff {
  const request = input.request ?? buildSandboxExecutionRequest();
  const runModel = input.runModel ?? buildSandboxRunModel(request);
  const artifactSimulation = input.artifactSimulation ?? buildSandboxArtifactSimulation(request);
  const logSimulation = input.logSimulation ?? buildSandboxLogSimulation(request);
  const verificationReport =
    input.verificationReport ??
    buildSandboxVerificationReport({ request, artifactSimulation });
  const artifactReviewPacket = buildSandboxArtifactReviewPacket({ runModel, artifactSimulation });
  const executorReviewPrompt = buildSandboxExecutorReviewPrompt({
    request,
    runModel,
    artifactSimulation,
    logSimulation,
    verificationReport,
  });
  const handoff: SandboxReviewHandoff = {
    handoffId: buildCreativeExecutionSandboxStableId("sandbox-review-handoff", [runModel.runId]),
    runId: runModel.runId,
    sandboxRunSummary: runModel.summary,
    fakeArtifactList: artifactSimulation.items.map((item) => `${item.label}: ${item.type}; ${item.noFileWrittenGuarantee}`),
    fakeLogSummary: logSimulation.summary,
    verificationSummary: verificationReport.summary,
    reviewBoardRoute: "/artifacts/review",
    futureExecutorRoute: "/creative-executor",
    safetyNotes: [
      "sandbox only",
      "no real files written",
      "no render executed",
      "no local process launched",
      "artifact review is for placeholders/supplied evidence only",
      "preserve latest-message authority",
    ],
    nextOperatorAction:
      "Open Creative Artifact Review for placeholder review, then review Local Bridge Health before any future executor phase.",
    artifactReviewPacket,
    executorReviewPrompt,
    summary: [],
  };

  return { ...handoff, summary: summarizeSandboxReviewHandoff(handoff) };
}

export function summarizeSandboxReviewHandoff(handoff: Pick<SandboxReviewHandoff, "fakeArtifactList" | "fakeLogSummary" | "verificationSummary" | "reviewBoardRoute" | "futureExecutorRoute" | "safetyNotes" | "nextOperatorAction">): string[] {
  return [
    `Review board route: ${handoff.reviewBoardRoute}.`,
    `Future executor route: ${handoff.futureExecutorRoute}.`,
    `${handoff.fakeArtifactList.length} fake artifact placeholder(s) ready for review.`,
    `${handoff.fakeLogSummary.length} fake log summary line(s) attached.`,
    `${handoff.verificationSummary.length} verification summary line(s) attached.`,
    handoff.safetyNotes.join("; "),
    handoff.nextOperatorAction,
  ];
}
