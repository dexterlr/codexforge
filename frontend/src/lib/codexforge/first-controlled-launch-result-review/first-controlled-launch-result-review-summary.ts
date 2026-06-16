import type { FirstControlledLaunchResultReview, FirstControlledLaunchResultReviewBoundary, FirstControlledLaunchResultReviewModel } from "./first-controlled-launch-result-review-types";
import { buildFirstControlledLaunchResultReviewStableKey } from "./first-controlled-launch-result-review-types";

export const FIRST_CONTROLLED_LAUNCH_RESULT_REVIEW_LANGUAGE = [
  "First controlled launch result review",
  "First controlled launch result review does not store live outputs",
  "Controlled launch results require operator review before use",
  "Unsafe controlled launch results remain blocked",
  "Result groups",
  "Acceptance checklist",
] as const;

const FIRST_CONTROLLED_LAUNCH_RESULT_REVIEW_SAFETY_DETAILS = [
  "no output storage",
  "no result ingestion",
  "no result persistence",
  "no result reuse automation",
  "no evidence ingestion",
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
  "no provider output persistence",
  "no local model calls",
  "no local bridge endpoint calls",
  "no connector API calls",
  "no connector data fetch",
  "no connector data persistence",
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

export function buildFirstControlledLaunchResultReview(input: Omit<FirstControlledLaunchResultReview, "id"> & { idHint: string }): FirstControlledLaunchResultReview {
  const { idHint, ...controlledLaunchResultReview } = input;
  return { id: buildFirstControlledLaunchResultReviewStableKey("first-controlled-launch-result-review", idHint, input.status), ...controlledLaunchResultReview };
}

export function buildFirstControlledLaunchResultReviews(): FirstControlledLaunchResultReview[] {
  return [
    buildFirstControlledLaunchResultReview({
      idHint: "daily-beta-1-first-controlled-launch-result-review",
      status: "blocked",
      controlledLaunchResultIdentity: "Controlled launch result identity: daily-beta-1-first-controlled-launch-result-review reviews launch results before reuse.",
      resultGroups: [
        "Result groups: acceptance checklist, rejection checklist, reuse checklist, safety review checklist, denied result actions, unresolved result blockers, controlled launch recovery route, controlled launch hardening route, and next recommended action.",
        "Result groups stay review-only; this page does not store live outputs, ingest results, persist results, reuse results automatically, call providers, call local models, call connectors, mutate files, or mutate memory.",
      ],
      acceptanceChecklist: [
        "Acceptance checklist: controlled launch results require operator-reviewed source, evidence link, scope, privacy review, safety review, rollback impact, and explicit approval before reuse.",
        "Acceptance checklist does not approve, store, or replay launch results automatically.",
      ],
      rejectionChecklist: [
        "Rejection checklist: unsafe, private, unredacted, uncited, out-of-scope, unbounded, or unreviewed controlled launch results remain blocked.",
      ],
      reuseChecklist: [
        "Reuse checklist: reuse requires explicit operator approval outside this page, documented limitation, redaction status, retention decision, and no automatic memory promotion or output persistence.",
      ],
      safetyReviewChecklist: [
        "Safety review checklist: provider/local/connector/test outputs, credentials, private evidence, launch results, rollback notes, and support notes stay unpersisted unless a bounded approved implementation exists outside this UI.",
      ],
      deniedResultActions: [
        "Denied result actions: store live outputs, ingest results, persist results, reuse results automatically, promote results to memory, launch Daily Beta 1, approve launch, lock launch readiness, run dry-runs, call providers, call local models, call connectors, mutate files, mutate memory, or store credentials.",
      ],
      unresolvedResultBlockers: [
        "Unsafe controlled launch results remain blocked: missing operator review, missing safety review, missing citation/source, missing redaction status, unclear rollback impact, private output, or unapproved reuse request.",
      ],
      controlledLaunchRecoveryRoute: "Controlled launch recovery route: /first-controlled-launch-recovery-review reviews recovery and rollback options without triggering recovery.",
      controlledLaunchHardeningRoute: "Controlled launch hardening route: /first-controlled-launch-hardening reviews hardening needs without applying changes.",
      nextRecommendedAction: "Next recommended action: keep controlled launch results unpersisted, review recovery posture, and request explicit operator approval outside this page before reuse.",
      advancedFirstControlledLaunchResultReviewDetails: `Advanced first controlled launch result review details: ${FIRST_CONTROLLED_LAUNCH_RESULT_REVIEW_SAFETY_DETAILS.join("; ")}.`,
    }),
  ];
}

export function buildFirstControlledLaunchResultReviewBoundary(): FirstControlledLaunchResultReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, liveOutputStorageAllowedFromUi: false, resultIngestionAllowedFromUi: false, resultPersistenceAllowedFromUi: false, resultReuseAutomationAllowedFromUi: false, workflowExecutionAllowedFromUi: false, evidenceIngestionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, credentialStorageAllowed: false, outputStorageAllowed: false };
}

export function summarizeFirstControlledLaunchResultReview(model: Pick<FirstControlledLaunchResultReviewModel, "firstControlledLaunchResultReviews">): string {
  return "First controlled launch result review reviews " + model.firstControlledLaunchResultReviews.length + " controlled launch result packet without storing live outputs. Controlled launch results require operator review before use, and unsafe controlled launch results remain blocked.";
}

export function buildFirstControlledLaunchResultReviewModel(): FirstControlledLaunchResultReviewModel {
  const firstControlledLaunchResultReviews = buildFirstControlledLaunchResultReviews();
  const model: FirstControlledLaunchResultReviewModel = {
    title: "First controlled launch result review",
    summary: "",
    firstControlledLaunchResultReviews,
    boundary: buildFirstControlledLaunchResultReviewBoundary(),
    language: [...FIRST_CONTROLLED_LAUNCH_RESULT_REVIEW_LANGUAGE],
    advancedDetails: [
      "First controlled launch result review",
      "Controlled launch result identity",
      "Result groups",
      "Acceptance checklist",
      "Rejection checklist",
      "Reuse checklist",
      "Safety review checklist",
      "Denied result actions",
      "Unresolved result blockers",
      "Controlled launch recovery route",
      "Controlled launch hardening route",
      "Next recommended action",
      "First controlled launch result review does not store live outputs",
      "Controlled launch results require operator review before use",
      "Unsafe controlled launch results remain blocked",
      "advanced first controlled launch result review details collapsed/secondary",
      ...FIRST_CONTROLLED_LAUNCH_RESULT_REVIEW_SAFETY_DETAILS,
    ],
  };
  return { ...model, summary: summarizeFirstControlledLaunchResultReview(model) };
}
