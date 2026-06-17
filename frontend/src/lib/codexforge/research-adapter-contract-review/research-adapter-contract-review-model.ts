import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildResearchAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildResearchAdapterContractReviewStableKey };

export const RESEARCH_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "Research adapter contract review",
  "Research adapter contract review does not browse, search, or fetch sources",
  "Research adapters require explicit operator approval",
  "Adapter not executable from UI",
  "Source scope",
  "Live research",
  "Connector/web/search",
  "Citation",
  "Contradiction review",
  "Evidence/result",
  "Denied research adapter actions",
] as const;

const RESEARCH_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "Research adapter contract review identity",
  "Source scope",
  "Live research",
  "Connector/web/search",
  "Citation",
  "Contradiction review",
  "Evidence/result",
  "Denied research adapter actions",
  "Unresolved research adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced research adapter contract review details collapsed/secondary",
] as const;

export function buildResearchAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("research-adapter-contract-review", input);
}

export function buildResearchAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildResearchAdapterContractReview({
      idHint: "research-adapter-contract-review",
      status: "blocked",
      identity: "Research adapter contract review identity: Research adapter contract review does not browse, search, or fetch sources. Research adapters require explicit operator approval before any future source collection, live research, or evidence/result handoff.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Source scope", items: ["Source scope: domains, connectors, source types, recency rule, excluded sources, privacy class, and no automatic source fetching must be visible."] },
        { label: "Live research", items: ["Live research: freshness needs, monitoring limit, manual review cadence, change detection rule, and no background watch creation are required."] },
        { label: "Connector/web/search", items: ["Connector/web/search: search provider, connector scope, query preview, account permission, rate limit, and denied mutations need review."] },
        { label: "Citation", items: ["Citation: source title, link policy, quote/excerpt limits, retrieval date supplied by approved backend, and citation completeness must be reviewed."] },
        { label: "Contradiction review", items: ["Contradiction review: conflicting claims, confidence, source quality, missing evidence, and follow-up questions require operator review before result reuse."] },
        { label: "Evidence/result", items: ["Evidence/result: research evidence and summaries need redaction, acceptance/rejection, retention, and no automatic storage or reuse."] },
        { label: "Denied research adapter actions", items: ["Denied research adapter actions: browse, search, fetch sources, call web APIs, call connectors, create watches, monitor changes, ingest evidence, store results, or send notifications from UI."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/evidence-store-adapter-contract-review", "/result-store-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep research blocked while source scope, live research, connector/web/search, citation, contradiction, and evidence/result contracts are reviewed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("research adapter contract review", RESEARCH_ADAPTER_CONTRACT_REVIEW_LANGUAGE, RESEARCH_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildResearchAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeResearchAdapterContractReview(model: { researchAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("Research adapter contract review", model.researchAdapterContractReviews, "Research adapters require explicit operator approval.");
}

export function buildResearchAdapterContractReviewModel() {
  const researchAdapterContractReviews = buildResearchAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 678",
    title: "Research adapter contract review",
    summarySubject: "Research adapter contract review",
    approvalCopy: "Research adapters require explicit operator approval.",
    subtitle: "Review the research adapter contract without browsing, searching, or fetching sources.",
    primaryLabel: "Review research adapter",
    anchor: "research-adapter-contract-review",
    plainEnglishTitle: "Plain-English research adapter contract review",
    plainEnglishCopy: "This page defines what a real research adapter must show before it can ever collect sources: source scope, live research rules, connector/web/search boundaries, citations, contradiction review, evidence/result handling, and denied actions. It is not implemented yet.",
    language: RESEARCH_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...RESEARCH_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/evidence-store-adapter-contract-review", label: "Evidence store adapter" },
      { href: "/result-store-adapter-contract-review", label: "Result store adapter" },
    ],
    packets: researchAdapterContractReviews,
    advancedCopy: "advanced research adapter contract review details collapsed/secondary. This route does not browse, search, fetch sources, call web APIs, call connectors, create watches, monitor changes, ingest evidence, store results, or send notifications.",
    dataScope: "research-adapter-contract-review buildResearchAdapterContractReviewStableKey ResearchAdapterContractReviewPanel",
  });
  return { ...model, researchAdapterContractReviews };
}
