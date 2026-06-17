import type { ResultReviewBoundary, ResultReviewBoundaryBoundary, ResultReviewBoundaryModel } from "./result-review-boundary-types";
import { buildResultReviewBoundaryStableKey } from "./result-review-boundary-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const RESULT_REVIEW_BOUNDARY_LANGUAGE = [
  "Result review boundary",
  "Result review boundary does not store or reuse outputs automatically",
  "Result reuse persistence requires explicit operator approval",
  "Unsafe results stay blocked",
  "Result groups",
  "Persistence checklist",
] as const;

export function buildResultReviewBoundary(input: Omit<ResultReviewBoundary, "id"> & { idHint: string }): ResultReviewBoundary {
  const { idHint, ...boundary } = input;
  return { id: buildResultReviewBoundaryStableKey("result-review-boundary", idHint, input.status), ...boundary };
}

export function buildResultReviewBoundaries(): ResultReviewBoundary[] {
  return [
    buildResultReviewBoundary({
      idHint: "result-review-boundary",
      status: "blocked",
      identity: "Result review boundary identity: result-review-boundary reviews outputs before reuse, persistence, memory, export, packaging, or handoff without storing or reusing outputs automatically.",
      sections: [
        { label: "Result groups", items: ["Result groups: command output, provider/model output, connector output, creative assets, research drafts, chatbot drafts, meeting summaries, game/server plans, and automation findings stay review-only."] },
        { label: "Acceptance/rejection checklist", items: ["Acceptance/rejection checklist: acceptance criteria, rejection reason, reviewer, risk, evidence source, and unsafe result blocker must be visible before reuse."] },
        { label: "Reuse checklist", items: ["Reuse checklist: downstream workflow, citation, transformation, privacy class, model/provider source, and operator approval status must be reviewed."] },
        { label: "Persistence checklist", items: ["Persistence checklist: persistence target, retention, redaction, memory/RAG policy, connector data policy, and no automatic output storage are required before persistence."] },
        { label: "Safety/privacy checklist", items: ["Safety/privacy checklist: private data, secrets, credentials, copyrighted content, connector data, local paths, and unsafe instructions stay blocked unless explicitly reviewed."] },
        { label: "Denied result actions", items: ["Denied result actions: store outputs, persist memory, auto-reuse results, auto-ingest feedback, export packages, trigger recovery, or promote memory from UI."] },
        { label: "Unresolved result blockers", items: ["Unresolved result blockers: missing reviewer, missing evidence, missing redaction, missing acceptance criteria, missing recovery route, and missing packaging/export route keep unsafe results blocked."] },
      ],
      routes: ["/recovery-retry-boundary", "/packaging-export-boundary", "/workflow-profile-registry"],
      nextRecommendedAction: "Next recommended action: keep outputs unpersisted, review acceptance and privacy posture, then route rejected work to recovery or approved work to packaging/export only after explicit approval.",
      advancedDetails: `Advanced result review boundary details: Result review boundary does not store or reuse outputs automatically. Result reuse persistence requires explicit operator approval. Unsafe results stay blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildResultReviewBoundaryBoundary(): ResultReviewBoundaryBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeResultReviewBoundary(model: Pick<ResultReviewBoundaryModel, "resultReviewBoundaries">): string {
  return "Result review boundary reviews " + model.resultReviewBoundaries.length + " result boundary packet without storing or reusing outputs automatically. Result reuse persistence requires explicit operator approval, and unsafe results stay blocked.";
}

export function buildResultReviewBoundaryModel(): ResultReviewBoundaryModel {
  const resultReviewBoundaries = buildResultReviewBoundaries();
  const model: ResultReviewBoundaryModel = {
    title: "Result review boundary",
    summary: "",
    reviewPackets: resultReviewBoundaries,
    resultReviewBoundaries,
    boundary: buildResultReviewBoundaryBoundary(),
    language: [...RESULT_REVIEW_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Result review boundary identity",
      "Result groups",
      "Acceptance/rejection checklist",
      "Reuse checklist",
      "Persistence checklist",
      "Safety/privacy checklist",
      "Denied result actions",
      "Unresolved result blockers",
      "Recovery boundary route",
      "Packaging/export boundary route",
      "Next recommended action",
      "advanced result review boundary details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeResultReviewBoundary(model) };
}
