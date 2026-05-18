import type { GlobalActivityEvent, GlobalActivityNextAction, GlobalActivityNextActionKind, GlobalActivityNextActionPlan } from "./global-activity-types";
import { buildGlobalActivityStableKey } from "./global-activity-types";
import { rankGlobalActivityEvents } from "./activity-feed-priority";

function action(kind: GlobalActivityNextActionKind, detail: string, route: GlobalActivityNextAction["route"], priority: number, reviewRequired = true): GlobalActivityNextAction {
  return {
    id: buildGlobalActivityStableKey("next-action", kind, route),
    kind,
    label: kind,
    detail,
    route,
    priority,
    reviewRequired,
  };
}

export function selectGlobalActivityNextAction(events: readonly GlobalActivityEvent[]): GlobalActivityNextAction {
  const ranked = rankGlobalActivityEvents(events);
  if (ranked.some((event) => event.severity === "blocker" || event.type === "safety.blocked")) {
    return action("review blocker", "Review blocker before any new feature or mutation gate.", "/activity", 10);
  }
  if (ranked.some((event) => event.type === "verification.failed")) {
    return action("inspect failed verification", "Inspect failed verification before regression or patch work.", "/activity", 20);
  }
  if (ranked.some((event) => event.type === "regression.triaged" || event.type === "regression.detected")) {
    return action("review regression triage", "Review regression triage evidence and impacted files.", "/stabilization", 30);
  }
  if (ranked.some((event) => event.type === "regression.fixQueued")) {
    return action("review regression fix queue", "Review queued fix candidates before Safe Patch Preview.", "/stabilization", 40);
  }
  if (ranked.some((event) => event.type === "patch.previewQueued")) {
    return action("prepare Safe Patch Preview", "Prepare a copy-only Safe Patch Preview handoff.", "/ai", 50);
  }
  if (ranked.some((event) => event.type === "patch.previewComposed")) {
    return action("compose preview diff", "Compose preview diff while keeping mutation gates closed.", "/ai", 60);
  }
  if (ranked.some((event) => event.type.startsWith("apply."))) {
    return action("review apply gate", "Review apply gate evidence without direct apply-diff execution.", "/stabilization", 70);
  }
  if (ranked.some((event) => event.source === "verification")) {
    return action("paste verification output", "Paste verification output for read-only review.", "/activity", 80);
  }
  if (ranked.some((event) => event.type === "memory.candidateCreated" || event.type === "brain.mergePreviewed")) {
    return action("review memory candidate", "Review memory candidate without auto-promote or graph merge.", "/memory", 90);
  }
  if (ranked.some((event) => event.type === "brain.governanceReviewed" || event.source === "brain-governance")) {
    return action("review brain mutation governance", "Review mutation boundaries and direct mutation signals without persistence.", "/brain-governance", 95);
  }
  if (ranked.some((event) => event.source === "stabilization")) {
    return action("review stabilization", "Review stabilization posture and latest-message authority.", "/stabilization", 100);
  }
  if (ranked.length === 0 || ranked.every((event) => event.severity === "success" || event.severity === "info")) {
    return action("commit clean checkpoint", "All visible activity is clean; recommend commit/tag/push only after explicit operator approval.", "/activity", 110);
  }
  return action("continue next phase", "Continue next phase after preserving read-only evidence and latest-message authority.", "/activity", 120, false);
}

export function buildGlobalActivityNextActionPlan(events: readonly GlobalActivityEvent[]): GlobalActivityNextActionPlan {
  const candidates = [
    selectGlobalActivityNextAction(events),
    action("continue next phase", "Continue next phase if validation remains clean.", "/activity", 200, false),
  ].sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));

  return {
    id: "global-activity-next-action-plan",
    selected: candidates[0],
    candidates,
    summary: summarizeGlobalActivityNextAction(candidates[0]),
  };
}

export function summarizeGlobalActivityNextAction(action: GlobalActivityNextAction): string[] {
  return [`Next safe action: ${action.label}.`, action.detail];
}
