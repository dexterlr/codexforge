import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildConnectorControlledTrialPlanStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildConnectorControlledTrialPlanStableKey };

export const CONNECTOR_CONTROLLED_TRIAL_PLAN_LANGUAGE = [
  "Connector controlled trial plan",
  "Connector controlled trial plan does not connect accounts or fetch connector data",
  "Connector access requires explicit operator approval",
  "Account permission",
  "Data scope",
  "Fetch/mutation",
  "Redaction/audit checklist",
] as const;

const CONNECTOR_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS = [
  "Connector controlled trial plan identity",
  "Account permission",
  "Data scope",
  "Fetch/mutation",
  "Redaction/audit checklist",
  "Next recommended action",
  "advanced connector controlled trial plan details collapsed/secondary",
] as const;

export function buildConnectorControlledTrialPlan(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("connector-controlled-trial-plan", input);
}

export function buildConnectorControlledTrialPlans(): UniversalExecutionReviewPacket[] {
  return [
    buildConnectorControlledTrialPlan({
      idHint: "connector-controlled-trial-plan",
      status: "blocked",
      identity: "Connector controlled trial plan identity: connector-controlled-trial-plan plans future connector access without connecting accounts, fetching connector data, mutating connector data, storing connector data, or calling connector APIs.",
      sections: buildControlledBuilderReviewSections(
        { label: "Account permission", items: ["Account permission: account identity, permission scope, least privilege, consent text, token handling, and disconnect path require operator review."] },
        { label: "Data scope", items: ["Data scope: allowed object types, time window, fields, redaction rules, retention, and no broad account sync must be defined."] },
        { label: "Fetch/mutation", items: ["Fetch/mutation: read-only fetches, writes, deletes, sends, comments, reminders, and account mutations must be separated and approved independently."] },
        { label: "Redaction/audit checklist", items: ["Redaction/audit checklist: remove secrets, account identifiers, private content, endpoint values, and connector payloads before reuse; audit requires an approved boundary."] },
      ),
      routes: ["/connector-access-approval-boundary", "/evidence-capture-boundary", "/universal-builder-controlled-trial-candidate"],
      nextRecommendedAction: "Next recommended action: keep connector access blocked until account permission, data scope, fetch/mutation split, redaction, audit, and explicit operator approval are complete.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("connector controlled trial plan", CONNECTOR_CONTROLLED_TRIAL_PLAN_LANGUAGE, CONNECTOR_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS),
    }),
  ];
}

export function buildConnectorControlledTrialPlanBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeConnectorControlledTrialPlan(model: { connectorControlledTrialPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("Connector controlled trial plan", model.connectorControlledTrialPlans, "Connector access requires explicit operator approval.");
}

export function buildConnectorControlledTrialPlanModel() {
  const connectorControlledTrialPlans = buildConnectorControlledTrialPlans();
  const summary = summarizeConnectorControlledTrialPlan({ connectorControlledTrialPlans });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 646",
    title: "Connector controlled trial plan",
    summary,
    subtitle: "Plan future connector access without connecting accounts or fetching data.",
    primaryLabel: "Review connector plan",
    anchor: "connector-controlled-trial-plan",
    plainEnglishTitle: "Plain-English connector controlled trial plan",
    plainEnglishCopy: "This page explains what a future connector trial must ask for and how data would be scoped. It cannot connect accounts or fetch connector data.",
    language: CONNECTOR_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    markers: CONNECTOR_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    links: [
      { href: "/connector-access-approval-boundary", label: "Connector boundary" },
      { href: "/evidence-capture-boundary", label: "Evidence boundary" },
      { href: "/universal-builder-controlled-trial-candidate", label: "Builder candidate" },
    ],
    packets: connectorControlledTrialPlans,
    advancedSummary: "Advanced connector controlled trial plan details",
    advancedDetails: [...CONNECTOR_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS],
    advancedCopy: "advanced connector controlled trial plan details collapsed/secondary. This route does not connect accounts, fetch connector data, mutate connector data, call connector APIs, store connector data, or create connector watches.",
    dataScope: "connector-controlled-trial-plan buildConnectorControlledTrialPlanStableKey ConnectorControlledTrialPlanPanel",
  });
  return { ...model, connectorControlledTrialPlans };
}
