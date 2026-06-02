import type { LocalVsCloudDecision, LocalVsCloudHandoff, LocalVsCloudNextAction } from "./local-vs-cloud-types";

export function buildLocalVsCloudHandoff(
  decision: LocalVsCloudDecision,
  nextAction: LocalVsCloudNextAction,
  input: Partial<LocalVsCloudHandoff> = {}
): LocalVsCloudHandoff {
  return {
    id: input.id ?? `${decision.id}-handoff`,
    copyLabel: input.copyLabel ?? "Copy decision handoff allowed",
    packet:
      input.packet ??
      [
        `Decision: ${decision.decision}`,
        `Next safe action: ${nextAction.label}`,
        "Use local for drafts, private material, and cheap iteration",
        "Use cloud only for reviewed final quality or fallback reasons",
        "Nothing is uploaded yet",
        "Nothing is generated yet",
      ],
    safetyNote:
      input.safetyNote ??
      "This handoff explains reasoning only; it does not call providers, upload files, or mutate queues.",
  };
}
