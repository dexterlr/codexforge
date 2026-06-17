import type { ResearchWorkflowProfile, ResearchWorkflowProfileBoundary, ResearchWorkflowProfileModel } from "./research-workflow-profile-types";
import { buildResearchWorkflowProfileStableKey } from "./research-workflow-profile-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const RESEARCH_WORKFLOW_PROFILE_LANGUAGE = [
  "Research workflow profile",
  "Research workflow profile does not browse, search, or fetch sources",
  "Research execution requires explicit operator approval",
  "Unsafe research workflows stay blocked",
  "Research groups",
  "Live research lane",
] as const;

export function buildResearchWorkflowProfile(input: Omit<ResearchWorkflowProfile, "id"> & { idHint: string }): ResearchWorkflowProfile {
  const { idHint, ...profile } = input;
  return { id: buildResearchWorkflowProfileStableKey("research-workflow-profile", idHint, input.status), ...profile };
}

export function buildResearchWorkflowProfiles(): ResearchWorkflowProfile[] {
  return [
    buildResearchWorkflowProfile({
      idHint: "research-workflow-profile",
      status: "blocked",
      identity: "Research workflow profile identity: research-workflow-profile reviews static research, live research, source/citation, connector/web/search, evidence, result, recovery, and export readiness without browsing, searching, or fetching sources.",
      sections: [
        { label: "Research groups", items: ["Research groups: static research, live research, source collection, citation review, claim building, freshness checks, monitoring handoff, report export, and result review stay blocked until approved."] },
        { label: "Static research lane", items: ["Static research lane: operator-provided sources, claim mapping, citation review, redaction, result review, and export remain review-only."] },
        { label: "Live research lane", items: ["Live research lane: web/search, connector source fetch, freshness monitoring, scheduled checks, evidence capture, and notification plans require approved boundaries."] },
        { label: "Source/citation boundary checklist", items: ["Source/citation boundary checklist: source scope, citation format, quote limits, freshness date, provenance, and privacy review must be defined before source use."] },
        { label: "Connector/web/search boundary checklist", items: ["Connector/web/search boundary checklist: web/search permission, connector scope, fetch limit, redaction, retention, and no browsing/searching/fetching from UI."] },
        { label: "Evidence/result/recovery/export checklist", items: ["Evidence/result/recovery/export checklist: evidence route, result review, conflict handling, recovery route, packaging/export route, and retention policy stay review-only."] },
        { label: "Denied research actions", items: ["Denied research actions: browse, search, fetch sources, call connectors, ingest sources, create scheduled research checks, store outputs, or export reports from UI."] },
        { label: "Unresolved research blockers", items: ["Unresolved research blockers: missing source approval, missing web/search boundary, missing connector boundary, missing evidence capture, missing result review, and missing export route keep unsafe research workflows blocked."] },
      ],
      routes: ["/workflow-profile-registry", "/evidence-capture-boundary", "/connector-access-approval-boundary"],
      nextRecommendedAction: "Next recommended action: keep research execution blocked, review source/citation and connector/web/search requirements, then return to evidence capture before approval.",
      advancedDetails: `Advanced research workflow profile details: Research workflow profile does not browse, search, or fetch sources. Research execution requires explicit operator approval. Unsafe research workflows stay blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildResearchWorkflowProfileBoundary(): ResearchWorkflowProfileBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeResearchWorkflowProfile(model: Pick<ResearchWorkflowProfileModel, "researchWorkflowProfiles">): string {
  return "Research workflow profile reviews " + model.researchWorkflowProfiles.length + " research profile packet without browsing, searching, or fetching sources. Research execution requires explicit operator approval, and unsafe research workflows stay blocked.";
}

export function buildResearchWorkflowProfileModel(): ResearchWorkflowProfileModel {
  const researchWorkflowProfiles = buildResearchWorkflowProfiles();
  const model: ResearchWorkflowProfileModel = {
    title: "Research workflow profile",
    summary: "",
    reviewPackets: researchWorkflowProfiles,
    researchWorkflowProfiles,
    boundary: buildResearchWorkflowProfileBoundary(),
    language: [...RESEARCH_WORKFLOW_PROFILE_LANGUAGE],
    advancedDetails: [
      "Research workflow profile identity",
      "Research groups",
      "Static research lane",
      "Live research lane",
      "Source/citation boundary checklist",
      "Connector/web/search boundary checklist",
      "Evidence/result/recovery/export checklist",
      "Denied research actions",
      "Unresolved research blockers",
      "Workflow profile registry route",
      "Evidence boundary route",
      "Next recommended action",
      "advanced research workflow profile details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeResearchWorkflowProfile(model) };
}
