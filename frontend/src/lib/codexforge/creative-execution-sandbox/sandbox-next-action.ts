import type {
  SandboxArtifactSimulation,
  SandboxExecutionRequest,
  SandboxNextAction,
  SandboxNextActionPlan,
  SandboxVerificationReport,
} from "./creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxStableId } from "./creative-execution-sandbox-types";
import { buildSandboxArtifactSimulation } from "./sandbox-artifact-simulation";
import { buildSandboxExecutionRequest } from "./sandbox-execution-request";
import { buildSandboxVerificationReport } from "./sandbox-verification";

const ACTIONS: readonly SandboxNextAction[] = [
  {
    actionId: "stop-and-stabilize",
    label: "Stop and stabilize",
    route: "/readiness",
    reason: "Blockers first before review handoff or future executor work.",
    priority: 10,
  },
  {
    actionId: "review-local-bridge-health",
    label: "Review Local Bridge Health",
    route: "/local-bridge-health",
    reason: "Bridge health before future executor.",
    priority: 20,
  },
  {
    actionId: "review-sandbox-verification",
    label: "Review sandbox verification",
    route: "/creative-sandbox",
    reason: "Verification before review handoff.",
    priority: 30,
  },
  {
    actionId: "inspect-fake-artifacts",
    label: "Inspect fake artifacts",
    route: "/creative-sandbox",
    reason: "Artifact labeling before artifact review.",
    priority: 40,
  },
  {
    actionId: "open-creative-artifact-review",
    label: "Open Creative Artifact Review",
    route: "/artifacts/review",
    reason: "Clean sandbox can proceed to Creative Execution Sandbox Review or Future Guarded Health Probe planning.",
    priority: 50,
  },
  {
    actionId: "review-guarded-creative-executor",
    label: "Review Guarded Creative Executor",
    route: "/creative-executor",
    reason: "Future executor remains blocked until guarded policy is reviewed.",
    priority: 60,
  },
  {
    actionId: "revise-adapter-packet",
    label: "Revise adapter packet",
    route: "/blender",
    reason: "Adapter packet needs clearer fake inputs or expected outputs.",
    priority: 70,
  },
  {
    actionId: "revise-render-job-preview",
    label: "Revise render job preview",
    route: "/video-render",
    reason: "Render job preview should be revised if output labels are incomplete.",
    priority: 80,
  },
  {
    actionId: "prepare-future-guarded-executor-phase",
    label: "Prepare future guarded executor phase",
    route: "/creative-executor",
    reason: "Only after sandbox verification, artifact labeling, review handoff, and bridge health are clean.",
    priority: 90,
  },
] as const;

export function selectSandboxNextAction(input: {
  request?: SandboxExecutionRequest;
  verificationReport?: SandboxVerificationReport;
  artifactSimulation?: SandboxArtifactSimulation;
} = {}): SandboxNextAction {
  const request = input.request ?? buildSandboxExecutionRequest();
  const artifactSimulation = input.artifactSimulation ?? buildSandboxArtifactSimulation(request);
  const verificationReport =
    input.verificationReport ??
    buildSandboxVerificationReport({ request, artifactSimulation });
  const candidates = [...ACTIONS].sort((a, b) => a.priority - b.priority || a.actionId.localeCompare(b.actionId));

  if (verificationReport.blockerCount > 0 || verificationReport.posture === "blocker") return candidates[0];
  if (request.localBridgeHealthPosture !== "reviewed") return candidates[1];
  if (verificationReport.posture !== "pass" && verificationReport.posture !== "warning") return candidates[2];
  if (artifactSimulation.items.some((item) => item.reviewStatus === "needs-labeling")) return candidates[3];
  return candidates[4];
}

export function buildSandboxNextActionPlan(input: Parameters<typeof selectSandboxNextAction>[0] = {}): SandboxNextActionPlan {
  const selected = selectSandboxNextAction(input);
  const candidates = [...ACTIONS].sort((a, b) => a.priority - b.priority || a.actionId.localeCompare(b.actionId));
  const plan: SandboxNextActionPlan = {
    planId: buildCreativeExecutionSandboxStableId("sandbox-next-action-plan", [selected.actionId]),
    selected,
    candidates,
    summary: [],
  };

  return { ...plan, summary: summarizeSandboxNextAction(plan) };
}

export function summarizeSandboxNextAction(planOrAction: SandboxNextActionPlan | SandboxNextAction): string[] {
  const selected = "selected" in planOrAction ? planOrAction.selected : planOrAction;
  const count = "candidates" in planOrAction ? planOrAction.candidates.length : 1;
  return [
    `Selected next action: ${selected.label}.`,
    selected.reason,
    `${count} next action candidate(s) are ordered by blockers first, bridge health before future executor, verification before handoff, and artifact labeling before artifact review.`,
  ];
}
