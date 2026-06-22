import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const COCKPIT_WORK_PROPOSAL_SUMMARY_LANGUAGE =
  "Cockpit work proposal summary | Cockpit work proposal summary keeps the cockpit as the normal user surface | Cockpit work proposal summary does not broaden execution | Cockpit work proposal summary shows plan files diff commands risks approval hold evidence result recovery timeline and model tool handoff | Phase pages remain dev test diagnostics only | Cockpit work proposal checklist | Go to Cockpit Work Proposal Summary";

export function buildCockpitWorkProposalSummaryModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("cockpit-work-proposal-summary");
}

export function summarizeCockpitWorkProposalSummary(model = buildCockpitWorkProposalSummaryModel()): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
