import type {
  ExecutorReadinessScorecard,
  RealCreativeReadinessNextAction,
  RealCreativeReadinessNextActionPlan,
} from "./real-creative-readiness-types";
import { buildRealCreativeReadinessStableId } from "./real-creative-readiness-types";
import { buildExecutorReadinessScorecard } from "./executor-readiness-scorecard";

const ACTIONS: readonly RealCreativeReadinessNextAction[] = [
  {
    actionId: "complete-local-bridge-setup",
    label: "complete local bridge setup",
    route: "/local-bridge-health",
    reason: "Bridge health must be configured before any real executor, health probe, or artifact write path.",
    priority: 10,
    copyPrompt: "Complete Local Bridge Health setup metadata. No probing, no command execution, no local endpoint calls, no render execution, and no file writes.",
  },
  {
    actionId: "review-adapter-allowlist",
    label: "review adapter allowlist",
    route: "/creative-executor",
    reason: "Adapter allowlist must be narrow before future guarded executor work.",
    priority: 20,
    copyPrompt: "Review adapter allowlist: no wildcard adapters, no arbitrary command adapter, dry-run/future-guarded only.",
  },
  {
    actionId: "define-artifact-output-root",
    label: "define artifact output root",
    route: "/local-bridge-health",
    reason: "Path boundary before artifact writes.",
    priority: 30,
    copyPrompt: "Define artifact output root boundary and path validation before any future artifact write.",
  },
  {
    actionId: "run-sandbox-simulation",
    label: "run sandbox simulation",
    route: "/creative-sandbox",
    reason: "Dry-run evidence before health probe.",
    priority: 40,
    copyPrompt: "Review Creative Execution Sandbox simulation and dry-run evidence before future guarded health probe.",
  },
  {
    actionId: "review-artifact-board",
    label: "review artifact board",
    route: "/artifacts/review",
    reason: "Artifact capture and review must be ready before future executor output handling.",
    priority: 50,
    copyPrompt: "Review Creative Artifact Review Board for provenance, placeholder labels, and generated-vs-placeholder distinction.",
  },
  {
    actionId: "complete-approval-packet",
    label: "complete approval packet",
    route: "/creative-executor",
    reason: "Approval before any execution.",
    priority: 60,
    copyPrompt: "Complete approval packet acknowledgements. Approval remains review-only and cannot unlock Phase 70 execution.",
  },
  {
    actionId: "define-kill-switch-plan",
    label: "define kill-switch plan",
    route: "/creative-executor",
    reason: "Kill-switch before real execution.",
    priority: 70,
    copyPrompt: "Define queued cancellation, future-only running cancellation, partial artifact handling, log preservation, and operator stop action.",
  },
  {
    actionId: "prepare-future-guarded-health-probe",
    label: "prepare future guarded health probe",
    route: "/local-bridge-health",
    reason: "If all critical checks pass, recommend Phase 71 Future Guarded Health Probe, not real execution yet.",
    priority: 80,
    copyPrompt: "Prepare Phase 71 Future Guarded Health Probe packet. Require approval, metadata-only probe policy, allowlist, sandbox evidence, no real execution, no render execution, no command execution, no file writes, and preserve latest-message authority.",
  },
  {
    actionId: "prepare-real-executor-mvp-candidate",
    label: "prepare real executor MVP candidate",
    route: "/creative-readiness",
    reason: "Only after Future Guarded Health Probe evidence and all critical readiness checks pass.",
    priority: 90,
    copyPrompt: "Prepare a future real executor MVP candidate design only after Phase 71 health probe review. Do not execute.",
  },
  {
    actionId: "stop-and-stabilize",
    label: "stop and stabilize",
    route: "/stabilization",
    reason: "Unsafe or contradictory posture found; stop before adding execution features.",
    priority: 100,
    copyPrompt: "Stop and stabilize. Resolve blockers, preserve latest-message authority, and keep execution allowed false.",
  },
];

function includesBlockedReason(scorecard: ExecutorReadinessScorecard, pattern: string): boolean {
  const normalized = pattern.toLowerCase();
  return scorecard.blockedReasons.some((reason) => reason.toLowerCase().includes(normalized));
}

export function selectRealCreativeReadinessNextAction(
  scorecard: ExecutorReadinessScorecard = buildExecutorReadinessScorecard()
): RealCreativeReadinessNextAction {
  if (includesBlockedReason(scorecard, "bridge profile") || includesBlockedReason(scorecard, "bridge")) return ACTIONS[0];
  if (includesBlockedReason(scorecard, "allowlist") || includesBlockedReason(scorecard, "adapter")) return ACTIONS[1];
  if (includesBlockedReason(scorecard, "path") || includesBlockedReason(scorecard, "output root") || includesBlockedReason(scorecard, "artifact output root")) return ACTIONS[2];
  if (includesBlockedReason(scorecard, "dry-run") || includesBlockedReason(scorecard, "sandbox")) return ACTIONS[3];
  if (includesBlockedReason(scorecard, "artifact") || includesBlockedReason(scorecard, "generated-vs-placeholder")) return ACTIONS[4];
  if (includesBlockedReason(scorecard, "approval") || includesBlockedReason(scorecard, "acknowledge")) return ACTIONS[5];
  if (includesBlockedReason(scorecard, "kill-switch") || includesBlockedReason(scorecard, "cancellation") || includesBlockedReason(scorecard, "stop action")) return ACTIONS[6];
  if (scorecard.futureMvpCandidate) return ACTIONS[7];
  if (scorecard.blockedReasons.length > 0) return ACTIONS[9];
  return ACTIONS[7];
}

export function buildRealCreativeReadinessNextActionPlan(
  scorecard: ExecutorReadinessScorecard = buildExecutorReadinessScorecard()
): RealCreativeReadinessNextActionPlan {
  const selected = selectRealCreativeReadinessNextAction(scorecard);
  const candidates = [...ACTIONS].sort((a, b) => a.priority - b.priority || a.actionId.localeCompare(b.actionId));
  const plan = {
    planId: buildRealCreativeReadinessStableId("real-creative-readiness-next-action", [
      scorecard.scorecardId,
      selected.actionId,
    ]),
    selected,
    candidates,
    summary: [] as string[],
  };

  return { ...plan, summary: summarizeRealCreativeReadinessNextAction(plan) };
}

export function summarizeRealCreativeReadinessNextAction(
  planOrAction: RealCreativeReadinessNextActionPlan | RealCreativeReadinessNextAction
): string[] {
  const selected = "selected" in planOrAction ? planOrAction.selected : planOrAction;
  const count = "candidates" in planOrAction ? planOrAction.candidates.length : 1;
  return [
    `Selected next action: ${selected.label}.`,
    selected.reason,
    `${count} candidate actions enforce blockers first, path boundary before artifact writes, bridge health before real executor, dry-run evidence before health probe, kill-switch before real execution, and approval before any execution.`,
    "If all pass, recommend Phase 71 Future Guarded Health Probe, not real execution yet.",
  ];
}
