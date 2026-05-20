import type { RealCreativeMvpUserFlow, RealCreativeMvpUserFlowStep } from "./real-creative-mvp-types";

export function buildRealCreativeMvpUserFlowStep(input: RealCreativeMvpUserFlowStep): RealCreativeMvpUserFlowStep {
  return input;
}

export function buildRealCreativeMvpUserFlow(): RealCreativeMvpUserFlow {
  const steps = [
    buildRealCreativeMvpUserFlowStep({ stepId: "pick-one-path", label: "Pick one creative tool path", plainEnglish: "Choose the one safe MVP candidate to review.", primaryAction: "Review MVP candidate", advancedDetail: "Recommended candidate is artifact-capture-only." }),
    buildRealCreativeMvpUserFlowStep({ stepId: "check-setup", label: "Check setup", plainEnglish: "Confirm the setup evidence is enough for this path.", primaryAction: "Check setup evidence", advancedDetail: "Local tool probes are not required for artifact capture only." }),
    buildRealCreativeMvpUserFlowStep({ stepId: "review-safety", label: "Review safety", plainEnglish: "Make sure the path cannot run tools, commands, endpoints, or file writes.", primaryAction: "Review safety", advancedDetail: "No arbitrary command, no arbitrary endpoint, no external network." }),
    buildRealCreativeMvpUserFlowStep({ stepId: "run-sandbox", label: "Run sandbox", plainEnglish: "Use the simulation evidence before planning future execution.", primaryAction: "Review sandbox", advancedDetail: "Sandbox remains simulation-only." }),
    buildRealCreativeMvpUserFlowStep({ stepId: "approve-packet", label: "Approve future execution packet", plainEnglish: "Approve only the future packet shape, not execution.", primaryAction: "Review approval packet", advancedDetail: "No approval means no future execution." }),
    buildRealCreativeMvpUserFlowStep({ stepId: "capture-output", label: "Capture output", plainEnglish: "Capture metadata for a placeholder or manually supplied artifact.", primaryAction: "Capture metadata", advancedDetail: "No file writes in Phase 72." }),
    buildRealCreativeMvpUserFlowStep({ stepId: "review-artifact", label: "Review artifact", plainEnglish: "Approve, reject, or send it back for revision.", primaryAction: "Review artifact", advancedDetail: "No automatic promotion." }),
    buildRealCreativeMvpUserFlowStep({ stepId: "decide-next-action", label: "Decide next action", plainEnglish: "Choose simplification or the next implementation plan.", primaryAction: "Choose next action", advancedDetail: "Recommended next step depends on UX readiness." }),
  ];
  const flow: Omit<RealCreativeMvpUserFlow, "summary"> = {
    flowId: "real-creative-mvp-user-friendly-flow",
    steps,
    ready: true,
  };

  return { ...flow, summary: summarizeRealCreativeMvpUserFlow(flow) };
}

export function summarizeRealCreativeMvpUserFlow(flow: Omit<RealCreativeMvpUserFlow, "summary"> | RealCreativeMvpUserFlow): string[] {
  return [
    `User-friendly flow ready: ${String(flow.ready)}.`,
    `${flow.steps.length} plain English steps.`,
    "One primary action per step.",
  ];
}
