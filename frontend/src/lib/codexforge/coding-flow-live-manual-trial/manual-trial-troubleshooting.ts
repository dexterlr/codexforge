import type { ManualTrialTroubleshooting } from "./live-manual-trial-types";

export function buildManualTrialTroubleshooting(): ManualTrialTroubleshooting {
  return { blockers: ["unsafe file selected", "approval unclear", "validation output missing", "route handoff confusing"], nextFixPrompts: ["Make next step clearer.", "Shorten safety copy.", "Route failed validation to /closed-loop.", "Move advanced detail below primary action."], failureRoutes: ["/code-flow/friction-fixes", "/validation-results", "/closed-loop"] };
}
