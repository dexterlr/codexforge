import type { FirstControlledLaunchEvidenceReview, FirstControlledLaunchEvidenceReviewBoundary, FirstControlledLaunchEvidenceReviewModel } from "./first-controlled-launch-evidence-review-types";
import { buildFirstControlledLaunchEvidenceReviewStableKey } from "./first-controlled-launch-evidence-review-types";

export const FIRST_CONTROLLED_LAUNCH_EVIDENCE_REVIEW_LANGUAGE = [
  "First controlled launch evidence review",
  "First controlled launch evidence review does not ingest evidence automatically",
  "Controlled launch evidence requires operator review before use",
  "Private launch evidence stays redacted",
  "Evidence groups",
  "Launch monitoring evidence checklist",
] as const;

const FIRST_CONTROLLED_LAUNCH_EVIDENCE_REVIEW_SAFETY_DETAILS = [
  "no evidence ingestion",
  "no auto-ingest launch evidence",
  "no provider output persistence",
  "no local model output persistence",
  "no connector data persistence",
  "no test output storage",
  "no result persistence",
  "no controlled launch execution",
  "no workflow execution",
  "no Daily Beta 1 launch execution",
  "no launch approval automation",
  "no launch readiness lock automation",
  "no go-live behavior",
  "no recovery trigger",
  "no hardening apply behavior",
  "no handoff send behavior",
  "no provider API calls",
  "no provider traffic routing",
  "no prompt sending to providers",
  "no local model calls",
  "no local bridge endpoint calls",
  "no connector API calls",
  "no connector data fetch",
  "no automation execution",
  "no automation creation",
  "no reminder creation",
  "no task scheduling",
  "no schedule creation",
  "no conditional watch creation",
  "no polling loop creation",
  "no background job creation",
  "no notification sending",
  "no approval automation",
  "no approval decision persistence",
  "no policy auto-apply",
  "no settings persistence",
  "no preference persistence",
  "no patch apply behavior",
  "no file mutation",
  "no file write",
  "no file deletion",
  "no export/write behavior",
  "no command execution",
  "no shell/git/test/build/smoke execution from UI",
  "no creative asset generation",
  "no research execution",
  "no coding workflow execution",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no Minecraft/project/server build execution yet",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "actual project/server building still requires approved file, command, local runtime, package, and deployment execution boundaries",
  "actual server/build/project execution still requires approved execution boundaries",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no token storage",
  "no endpoint storage",
  "no credential storage",
  "no output storage",
  "no connector data storage",
  "no automation data storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no example real key/token/endpoint values",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "checkpoint documentation smoke still exists and remains registered",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake",
  "no obvious duplicate React key patterns",
] as const;

export function buildFirstControlledLaunchEvidenceReview(input: Omit<FirstControlledLaunchEvidenceReview, "id"> & { idHint: string }): FirstControlledLaunchEvidenceReview {
  const { idHint, ...controlledLaunchEvidenceReview } = input;
  return { id: buildFirstControlledLaunchEvidenceReviewStableKey("first-controlled-launch-evidence-review", idHint, input.status), ...controlledLaunchEvidenceReview };
}

export function buildFirstControlledLaunchEvidenceReviews(): FirstControlledLaunchEvidenceReview[] {
  return [
    buildFirstControlledLaunchEvidenceReview({
      idHint: "daily-beta-1-first-controlled-launch-evidence-review",
      status: "blocked",
      controlledLaunchEvidenceIdentity: "Controlled launch evidence identity: daily-beta-1-first-controlled-launch-evidence-review reviews operator-supplied launch evidence before use.",
      evidenceGroups: [
        "Evidence groups: boundary evidence checklist, launch monitoring evidence checklist, citation/source checklist, redaction/privacy checklist, denied evidence actions, unresolved evidence blockers, controlled launch result route, controlled launch recovery route, and next recommended action.",
        "Evidence groups stay review-only; this page does not ingest evidence automatically, store outputs, mutate memory, read local files, call providers, call local models, or call connectors.",
      ],
      boundaryEvidenceChecklist: [
        "Boundary evidence checklist: provider, local model, connector, automation, file/test/project execution, shell, git, build, smoke, credential, output, memory, rollback, monitoring, and support evidence must be operator-reviewed before use.",
        "Boundary evidence checklist treats evidence as context, not proof that live execution works.",
      ],
      launchMonitoringEvidenceChecklist: [
        "Launch monitoring evidence checklist: monitoring owner, stop conditions, support owner, escalation owner, privacy state, redaction state, and rollback evidence are reviewed manually.",
        "Launch monitoring evidence checklist does not create monitoring jobs, polling loops, schedules, watches, reminders, background jobs, or notifications.",
      ],
      citationSourceChecklist: [
        "Citation/source checklist: every controlled launch evidence item must name its source, owner, date, limitation, privacy status, and whether it is redacted before any operator uses it.",
      ],
      redactionPrivacyChecklist: [
        "Redaction/privacy checklist: private launch evidence stays redacted, credentials stay hidden, endpoints stay unpersisted, and provider/local/connector/test outputs stay out of storage.",
      ],
      deniedEvidenceActions: [
        "Denied evidence actions: ingest evidence automatically, auto-promote evidence to memory, store provider outputs, store local model outputs, store connector data, store test outputs, store launch results, read arbitrary files, launch Daily Beta 1, approve launch, run dry-runs, call providers, call local models, call connectors, mutate files, mutate memory, or store credentials.",
      ],
      unresolvedEvidenceBlockers: [
        "Unresolved evidence blockers stay blocked: missing operator review, missing citation/source, missing redaction status, private evidence not redacted, missing launch monitoring evidence, missing boundary evidence, and missing result review owner.",
      ],
      controlledLaunchResultRoute: "Controlled launch result route: /first-controlled-launch-result-review reviews controlled launch results before reuse without storing live outputs.",
      controlledLaunchRecoveryRoute: "Controlled launch recovery route: /first-controlled-launch-recovery-review reviews recovery and rollback options without triggering recovery.",
      nextRecommendedAction: "Next recommended action: keep launch evidence un-ingested, complete source and redaction review, then review controlled launch results and recovery options.",
      advancedFirstControlledLaunchEvidenceReviewDetails: `Advanced first controlled launch evidence review details: ${FIRST_CONTROLLED_LAUNCH_EVIDENCE_REVIEW_SAFETY_DETAILS.join("; ")}.`,
    }),
  ];
}

export function buildFirstControlledLaunchEvidenceReviewBoundary(): FirstControlledLaunchEvidenceReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, evidenceIngestionAllowedFromUi: false, providerOutputStorageAllowedFromUi: false, localModelOutputStorageAllowedFromUi: false, connectorDataStorageAllowedFromUi: false, testOutputStorageAllowedFromUi: false, resultPersistenceAllowedFromUi: false, workflowExecutionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, credentialStorageAllowed: false, outputStorageAllowed: false };
}

export function summarizeFirstControlledLaunchEvidenceReview(model: Pick<FirstControlledLaunchEvidenceReviewModel, "firstControlledLaunchEvidenceReviews">): string {
  return "First controlled launch evidence review reviews " + model.firstControlledLaunchEvidenceReviews.length + " controlled launch evidence packet without ingesting evidence automatically. Controlled launch evidence requires operator review before use, and private launch evidence stays redacted.";
}

export function buildFirstControlledLaunchEvidenceReviewModel(): FirstControlledLaunchEvidenceReviewModel {
  const firstControlledLaunchEvidenceReviews = buildFirstControlledLaunchEvidenceReviews();
  const model: FirstControlledLaunchEvidenceReviewModel = {
    title: "First controlled launch evidence review",
    summary: "",
    firstControlledLaunchEvidenceReviews,
    boundary: buildFirstControlledLaunchEvidenceReviewBoundary(),
    language: [...FIRST_CONTROLLED_LAUNCH_EVIDENCE_REVIEW_LANGUAGE],
    advancedDetails: [
      "First controlled launch evidence review",
      "Controlled launch evidence identity",
      "Evidence groups",
      "Boundary evidence checklist",
      "Launch monitoring evidence checklist",
      "Citation/source checklist",
      "Redaction/privacy checklist",
      "Denied evidence actions",
      "Unresolved evidence blockers",
      "Controlled launch result route",
      "Controlled launch recovery route",
      "Next recommended action",
      "First controlled launch evidence review does not ingest evidence automatically",
      "Controlled launch evidence requires operator review before use",
      "Private launch evidence stays redacted",
      "advanced first controlled launch evidence review details collapsed/secondary",
      ...FIRST_CONTROLLED_LAUNCH_EVIDENCE_REVIEW_SAFETY_DETAILS,
    ],
  };
  return { ...model, summary: summarizeFirstControlledLaunchEvidenceReview(model) };
}
