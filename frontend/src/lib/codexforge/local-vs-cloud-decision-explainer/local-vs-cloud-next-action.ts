import type { LocalVsCloudDecision, LocalVsCloudNextAction } from "./local-vs-cloud-types";

export function buildLocalVsCloudNextAction(
  decision: LocalVsCloudDecision,
  input: Partial<LocalVsCloudNextAction> = {}
): LocalVsCloudNextAction {
  const cloudRoute = decision.decision === "cloud-final-review" || decision.decision === "manual-cloud-handoff";
  return {
    id: input.id ?? `${decision.id}-next-action`,
    label: input.label ?? (cloudRoute ? "Review cloud final render" : "Continue local-first"),
    route: input.route ?? (cloudRoute ? "/cloud-final-render" : "/local-video-draft"),
    manualOnly: true,
    plainEnglish:
      input.plainEnglish ??
      (cloudRoute
        ? "Open the cloud final render review before spending credits or sending anything."
        : "Stay local for the next draft or review step."),
  };
}
