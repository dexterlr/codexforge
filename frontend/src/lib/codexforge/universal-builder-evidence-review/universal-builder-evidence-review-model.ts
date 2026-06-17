import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildUniversalBuilderEvidenceReviewStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildUniversalBuilderEvidenceReviewStableKey };

export const UNIVERSAL_BUILDER_EVIDENCE_REVIEW_LANGUAGE = [
  "Universal builder evidence review",
  "Universal builder evidence review does not capture or ingest evidence automatically",
  "Builder evidence requires operator review before use",
  "Scaffold evidence",
  "File write evidence",
  "Command evidence",
  "Runtime evidence",
  "Provider evidence",
  "Connector evidence",
  "Automation evidence",
  "Package/export evidence",
  "Creative evidence",
  "Research evidence",
  "Chatbot evidence",
  "Monitoring evidence",
  "Video-call evidence",
  "Game/server evidence",
] as const;

const UNIVERSAL_BUILDER_EVIDENCE_REVIEW_ADVANCED_DETAILS = [
  "Universal builder evidence review identity",
  "Scaffold evidence",
  "File write evidence",
  "Command evidence",
  "Runtime evidence",
  "Provider evidence",
  "Connector evidence",
  "Automation evidence",
  "Package/export evidence",
  "Creative evidence",
  "Research evidence",
  "Chatbot evidence",
  "Monitoring evidence",
  "Video-call evidence",
  "Game/server evidence",
  "Next recommended action",
  "advanced universal builder evidence review details collapsed/secondary",
] as const;

export function buildUniversalBuilderEvidenceReview(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("universal-builder-evidence-review", input);
}

export function buildUniversalBuilderEvidenceReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildUniversalBuilderEvidenceReview({
      idHint: "universal-builder-evidence-review",
      status: "blocked",
      identity: "Universal builder evidence review identity: Universal builder evidence review does not capture or ingest evidence automatically. It shows the evidence categories a real builder workflow would need before use.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Scaffold evidence", items: ["Scaffold evidence: target type, proposed tree, template provenance, denied action list, copyright/trademark review, and operator notes."] },
        { label: "File write evidence", items: ["File write evidence: path allowlist, denylist, diff preview, rollback plan, validation note, and redaction review."] },
        { label: "Command evidence", items: ["Command evidence: command preview, working directory, env/secrets review, timeout, stdout/stderr redaction, and exit code review."] },
        { label: "Runtime evidence", items: ["Runtime evidence: port, network, process lifecycle, stop plan, logs, health signal, and recovery note."] },
        { label: "Provider evidence", items: ["Provider evidence: prompt preview, redaction, model target, cost/rate-limit, output handling, and result review."] },
        { label: "Connector evidence", items: ["Connector evidence: account permission, data scope, fetch/mutation split, redaction/audit, consent, and result review."] },
        { label: "Automation evidence", items: ["Automation evidence: schedule, condition/watch, notification, pause/stop, audit, and recovery review."] },
        { label: "Package/export evidence", items: ["Package/export evidence: bundle, destination, redaction/license, rollback, handoff checklist, and delivery limits."] },
        { label: "Creative evidence", items: ["Creative evidence: concept, storyboard, asset provenance, provider/local plan, cost/rate-limit, and no video/image/3D generation from UI."] },
        { label: "Research evidence", items: ["Research evidence: source plan, freshness rule, citation plan, redaction, claim review, and no browsing/searching/fetching from UI."] },
        { label: "Chatbot evidence", items: ["Chatbot evidence: knowledge scope, test conversation plan, tool boundary, deployment gate, and no chatbot/agent creation or deployment."] },
        { label: "Monitoring evidence", items: ["Monitoring evidence: watched condition, data source, schedule, notification rule, audit, and no monitoring job creation."] },
        { label: "Video-call evidence", items: ["Video-call evidence: agenda, consent, capture boundary, redaction, summary review, and no video-call joining or monitoring."] },
        { label: "Game/server evidence", items: ["Game/server evidence: original medieval fantasy game/server scope, asset provenance, safety limits, server boundary, and no copied franchise assets."] },
      ),
      routes: ["/universal-builder-result-review", "/universal-builder-recovery-review", "/universal-builder-mvp-candidate"],
      nextRecommendedAction: "Next recommended action: keep builder evidence manually reviewed and un-ingested until each workflow profile has explicit operator approval for use.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("universal builder evidence review", UNIVERSAL_BUILDER_EVIDENCE_REVIEW_LANGUAGE, UNIVERSAL_BUILDER_EVIDENCE_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildUniversalBuilderEvidenceReviewBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeUniversalBuilderEvidenceReview(model: { universalBuilderEvidenceReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("Universal builder evidence review", model.universalBuilderEvidenceReviews, "Builder evidence requires operator review before use.");
}

export function buildUniversalBuilderEvidenceReviewModel() {
  const universalBuilderEvidenceReviews = buildUniversalBuilderEvidenceReviews();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 662",
    title: "Universal builder evidence review",
    summarySubject: "Universal builder evidence review",
    approvalCopy: "Builder evidence requires operator review before use.",
    subtitle: "Review builder evidence categories without automatic capture or ingestion.",
    primaryLabel: "Review builder evidence",
    anchor: "universal-builder-evidence-review",
    plainEnglishTitle: "Plain-English universal builder evidence review",
    plainEnglishCopy: "This page shows the evidence a universal builder would need across scaffold, file write, command, runtime, provider, connector, automation, package/export, creative, research, chatbot, monitoring, video-call, and game/server profiles. It cannot capture or ingest evidence automatically.",
    language: UNIVERSAL_BUILDER_EVIDENCE_REVIEW_LANGUAGE,
    advancedDetails: [...UNIVERSAL_BUILDER_EVIDENCE_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/universal-builder-result-review", label: "Builder result review" },
      { href: "/universal-builder-recovery-review", label: "Builder recovery review" },
      { href: "/universal-builder-mvp-candidate", label: "Builder MVP candidate" },
    ],
    packets: universalBuilderEvidenceReviews,
    advancedCopy: "advanced universal builder evidence review details collapsed/secondary. This route does not capture evidence, ingest evidence, store evidence, browse research, fetch connector data, call providers, promote memory, mutate Brain graph, create monitoring jobs, or persist approval decisions.",
    dataScope: "universal-builder-evidence-review buildUniversalBuilderEvidenceReviewStableKey UniversalBuilderEvidenceReviewPanel",
  });
  return { ...model, universalBuilderEvidenceReviews };
}
