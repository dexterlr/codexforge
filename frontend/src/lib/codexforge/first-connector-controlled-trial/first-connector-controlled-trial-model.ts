import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFirstConnectorControlledTrialStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildFirstConnectorControlledTrialStableKey };

export const FIRST_CONNECTOR_CONTROLLED_TRIAL_LANGUAGE = [
  "First connector controlled trial",
  "First connector controlled trial does not connect accounts or fetch connector data",
  "Connector access requires explicit operator approval",
  "Account permission",
  "Data scope",
  "Fetch/mutation review",
  "Redaction/audit",
  "Result review",
] as const;

const FIRST_CONNECTOR_CONTROLLED_TRIAL_ADVANCED_DETAILS = [
  "First connector controlled trial identity",
  "Account permission",
  "Data scope",
  "Fetch/mutation review",
  "Redaction/audit",
  "Result review",
  "Next recommended action",
  "advanced first connector controlled trial details collapsed/secondary",
] as const;

export function buildFirstConnectorControlledTrial(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("first-connector-controlled-trial", input);
}

export function buildFirstConnectorControlledTrials(): UniversalExecutionReviewPacket[] {
  return [
    buildFirstConnectorControlledTrial({
      idHint: "first-connector-controlled-trial",
      status: "blocked",
      identity: "First connector controlled trial identity: First connector controlled trial does not connect accounts or fetch connector data. It previews account permission, data scope, and result review without connector calls.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Account permission", items: ["Account permission: account identity, least privilege, consent text, token handling, disconnect path, and permission expiration require operator review."] },
        { label: "Data scope", items: ["Data scope: allowed object types, fields, time window, redaction, retention, no broad account sync, and no connector data storage."] },
        { label: "Fetch/mutation review", items: ["Fetch/mutation review: read-only fetches, writes, deletes, sends, comments, reminders, and account mutations must be separated and approved independently."] },
        { label: "Redaction/audit", items: ["Redaction/audit: remove private content, account identifiers, endpoint values, secrets, connector payloads, and audit records before reuse."] },
        { label: "Result review", items: ["Result review: connector evidence and results require operator review before reuse, provider prompting, file write, automation, or package handoff."] },
      ),
      routes: ["/first-automation-controlled-trial", "/universal-builder-evidence-review", "/universal-builder-result-review"],
      nextRecommendedAction: "Next recommended action: keep connector access blocked until account permission, data scope, fetch/mutation review, redaction/audit, result review, and explicit operator approval are complete.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("first connector controlled trial", FIRST_CONNECTOR_CONTROLLED_TRIAL_LANGUAGE, FIRST_CONNECTOR_CONTROLLED_TRIAL_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFirstConnectorControlledTrialBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeFirstConnectorControlledTrial(model: { firstConnectorControlledTrials: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("First connector controlled trial", model.firstConnectorControlledTrials, "Connector access requires explicit operator approval.");
}

export function buildFirstConnectorControlledTrialModel() {
  const firstConnectorControlledTrials = buildFirstConnectorControlledTrials();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 659",
    title: "First connector controlled trial",
    summarySubject: "First connector controlled trial",
    approvalCopy: "Connector access requires explicit operator approval.",
    subtitle: "Preview connector access controls without connecting accounts or fetching data.",
    primaryLabel: "Review connector trial",
    anchor: "first-connector-controlled-trial",
    plainEnglishTitle: "Plain-English first connector controlled trial",
    plainEnglishCopy: "This page shows what a connector trial would need before approval: account permission, data scope, fetch/mutation review, redaction/audit, and result review. It cannot connect accounts or fetch connector data.",
    language: FIRST_CONNECTOR_CONTROLLED_TRIAL_LANGUAGE,
    advancedDetails: [...FIRST_CONNECTOR_CONTROLLED_TRIAL_ADVANCED_DETAILS],
    links: [
      { href: "/first-automation-controlled-trial", label: "Automation trial" },
      { href: "/universal-builder-evidence-review", label: "Builder evidence review" },
      { href: "/universal-builder-result-review", label: "Builder result review" },
    ],
    packets: firstConnectorControlledTrials,
    advancedCopy: "advanced first connector controlled trial details collapsed/secondary. This route does not connect accounts, fetch connector data, mutate connector data, call connector APIs, store connector data, create watches, send notifications, or persist credentials.",
    dataScope: "first-connector-controlled-trial buildFirstConnectorControlledTrialStableKey FirstConnectorControlledTrialPanel",
  });
  return { ...model, firstConnectorControlledTrials };
}
