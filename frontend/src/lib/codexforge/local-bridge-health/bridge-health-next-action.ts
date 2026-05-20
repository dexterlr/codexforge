import type { BridgeHealthNextAction, BridgeHealthNextActionPlan, BridgeHealthProfile, BridgeHealthResult, BridgeHealthSetupGuide } from "./local-bridge-health-types";
import { buildDefaultBridgeHealthProfiles, isBridgeHealthProfileConfigured } from "./bridge-health-profile";
import { buildBridgeHealthResult } from "./bridge-health-result";
import { buildBridgeHealthSetupGuide } from "./bridge-health-setup-guide";

const ACTIONS: readonly BridgeHealthNextAction[] = [
  { id: "create-missing-profile", label: "Create missing profile metadata", reason: "Missing profile before probing.", route: "/local-bridge-health", priority: 10, copyPrompt: "Add local bridge profile metadata only. Do not store secrets, do not run probes, and preserve latest-message authority." },
  { id: "fill-missing-config", label: "Fill missing configuration", reason: "Missing config before executor.", route: "/local-bridge-health", priority: 20, copyPrompt: "Supply path hint, endpoint hint, or artifact boundary metadata. Do not execute local apps or call endpoints." },
  { id: "resolve-unsafe-probe", label: "Keep unsafe probe blocked", reason: "Unsafe probe blocked before all.", route: "/local-bridge-health", priority: 30, copyPrompt: "Keep executable launch, local HTTP calls, version commands, directory writes, command execution, and render execution blocked." },
  { id: "configure-artifact-boundary", label: "Configure artifact boundary", reason: "Artifact boundary before render jobs.", route: "/local-bridge-health", priority: 40, copyPrompt: "Configure artifact output boundary metadata. No UI writes." },
  { id: "review-bridge-health", label: "Review bridge health before creative executor", reason: "Bridge health before creative executor.", route: "/local-bridge-health", priority: 50, copyPrompt: "Review Local Bridge Health Check v1 before Guarded Creative Executor. Preview-only/manual-only/future-guarded." },
  { id: "future-guarded-health-probe", label: "Plan future guarded health probe", reason: "Everything is configured/supplied; recommend future guarded health probe phase.", route: "/local-bridge-health", priority: 60, copyPrompt: "Plan Future Guarded Health Probe. Require approval, explicit allowlist, safe metadata probe only, and no execution by default." },
  { id: "follow-setup-guide", label: "Follow setup guide", reason: "Setup guide is the next safe action.", route: "/local-bridge-health", priority: 70, copyPrompt: "Follow Local Bridge Health setup guide. No probing, no execution, no file writes." },
];

export function selectBridgeHealthNextAction(input: {
  profiles?: BridgeHealthProfile[];
  result?: BridgeHealthResult;
  setupGuide?: BridgeHealthSetupGuide;
} = {}): BridgeHealthNextAction {
  const profiles = input.profiles ?? buildDefaultBridgeHealthProfiles();
  const result = input.result ?? buildBridgeHealthResult();
  const guide = input.setupGuide ?? buildBridgeHealthSetupGuide();
  if (profiles.length === 0) return ACTIONS[0];
  if (profiles.some((profile) => !isBridgeHealthProfileConfigured(profile))) return ACTIONS[1];
  if (result.items.some((item) => item.blockerReasons.length > 0)) return ACTIONS[2];
  if (profiles.some((profile) => profile.targetId === "artifact-output-root" && !isBridgeHealthProfileConfigured(profile))) return ACTIONS[3];
  if (guide.steps.length > 0 && result.items.some((item) => item.status !== "ready" && item.status !== "configured")) return ACTIONS[6];
  return ACTIONS[5];
}

export function buildBridgeHealthNextActionPlan(input: Parameters<typeof selectBridgeHealthNextAction>[0] = {}): BridgeHealthNextActionPlan {
  const selected = selectBridgeHealthNextAction(input);
  const candidates = [...ACTIONS].sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
  return { id: "local-bridge-health-next-action-plan", selected, candidates, summary: summarizeBridgeHealthNextAction({ id: "local-bridge-health-next-action-plan", selected, candidates, summary: [] }) };
}

export function summarizeBridgeHealthNextAction(planOrAction: BridgeHealthNextActionPlan | BridgeHealthNextAction): string[] {
  const selected = "selected" in planOrAction ? planOrAction.selected : planOrAction;
  const count = "candidates" in planOrAction ? planOrAction.candidates.length : 1;
  return [
    `Selected next action: ${selected.label}.`,
    selected.reason,
    `${count} next action candidates keep Local Bridge Health preview-only/manual-only/future-guarded.`,
  ];
}
