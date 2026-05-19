import type { ContinuityHandoffInput, ContinuityHandoffBrainItem, ContinuityHandoffBrainPosture } from "./continuity-handoff-types";
import { buildContinuityHandoffStableKey } from "./continuity-handoff-types";

export function buildContinuityHandoffBrainItem(input: {
  label: string;
  posture: ContinuityHandoffBrainItem["posture"];
  detail: string;
}): ContinuityHandoffBrainItem {
  return {
    id: buildContinuityHandoffStableKey("handoff-brain-item", input.label),
    label: input.label,
    posture: input.posture,
    detail: input.detail,
  };
}

export function buildContinuityHandoffBrainPosture(input: ContinuityHandoffInput = {}): ContinuityHandoffBrainPosture {
  const items = [
    buildContinuityHandoffBrainItem({ label: "Canonical graph schema", posture: "review", detail: "canonical graph schema is preserved and imported graph mutation helpers are not used by continuity handoff." }),
    buildContinuityHandoffBrainItem({ label: "Brain continuity status", posture: input.continuityStatus ?? "review", detail: "Brain Continuity Dashboard remains a source surface and links to the packet." }),
    buildContinuityHandoffBrainItem({ label: "Snapshot status", posture: input.snapshotPosture ?? "review", detail: "Snapshot Manager is read-only; comparison and replay-source review only." }),
    buildContinuityHandoffBrainItem({ label: "Replay status", posture: input.runtimeEventPosture ?? "review", detail: "Runtime replay is preview-only and does not appendEvent." }),
    buildContinuityHandoffBrainItem({ label: "Restore gate status", posture: input.restorePosture ?? "blocked", detail: "Snapshot restore gate preview remains blocked by default." }),
    buildContinuityHandoffBrainItem({ label: "Governance status", posture: input.brainPosture ?? "review", detail: "Brain Mutation Governance reviews direct UI mutation blocked posture." }),
    buildContinuityHandoffBrainItem({ label: "Mutation boundary status", posture: "blocked", detail: "Direct UI mutation blocked, saveBrainGraph from UI blocked, and appendEvent from UI blocked." }),
  ];
  return {
    id: "continuity-handoff-brain-posture",
    canonicalGraphSchema: "canonical graph schema",
    brainContinuityStatus: input.continuityStatus ?? "review",
    snapshotStatus: input.snapshotPosture ?? "review",
    replayStatus: input.runtimeEventPosture ?? "review",
    restoreGateStatus: input.restorePosture ?? "blocked",
    governanceStatus: input.brainPosture ?? "review",
    mutationBoundaryStatus: "blocked",
    directUiMutationBlocked: true,
    saveBrainGraphFromUiBlocked: true,
    appendEventFromUiBlocked: true,
    latestMessageAuthorityPreserved: input.latestMessageAuthorityPreserved ?? true,
    items,
    summary: summarizeContinuityHandoffBrainPosture({ items } as ContinuityHandoffBrainPosture),
  };
}

export function summarizeContinuityHandoffBrainPosture(posture: ContinuityHandoffBrainPosture): string[] {
  return [
    "Brain posture preserves canonical graph schema and latest-message authority.",
    "Direct UI mutation blocked, saveBrainGraph from UI blocked, and appendEvent from UI blocked.",
    `${posture.items.length} Brain continuity posture checks are visible and review-first.`,
  ];
}
