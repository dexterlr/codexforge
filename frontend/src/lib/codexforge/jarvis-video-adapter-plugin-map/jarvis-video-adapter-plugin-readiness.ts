import {
  JARVIS_VIDEO_ADAPTER_PLUGIN_MILESTONE_REFERENCES,
  JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS,
  JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS,
} from "./jarvis-video-adapter-plugin-contract";

export const JARVIS_VIDEO_ADAPTER_PLUGIN_REVIEW_GROUPS = [
  "Integration",
  "Milestones",
  "Reviews",
  "Guardrails",
] as const;

export type JarvisVideoAdapterPluginReviewGroup =
  (typeof JARVIS_VIDEO_ADAPTER_PLUGIN_REVIEW_GROUPS)[number];

export type JarvisVideoAdapterPluginReviewCard = Readonly<{
  id: string;
  group: JarvisVideoAdapterPluginReviewGroup;
  label: string;
  marker: string;
  posture: string;
  summary: string;
  detail: string;
  href?: string;
}>;

const milestoneByMarker = Object.fromEntries(
  JARVIS_VIDEO_ADAPTER_PLUGIN_MILESTONE_REFERENCES.map((reference) => [
    reference.marker,
    reference,
  ])
) as Readonly<
  Record<
    (typeof JARVIS_VIDEO_ADAPTER_PLUGIN_MILESTONE_REFERENCES)[number]["marker"],
    (typeof JARVIS_VIDEO_ADAPTER_PLUGIN_MILESTONE_REFERENCES)[number]
  >
>;

export const JARVIS_VIDEO_ADAPTER_PLUGIN_REVIEW_CARDS = [
  {
    id: "capability-registration",
    group: "Integration",
    label: "Capability registration",
    marker: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.capabilityRegistrationLink.marker,
    posture: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.capabilityRegistrationLink.posture,
    summary: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.capabilityRegistrationLink.summary,
    detail: "Jarvis command center sees video as the first specialist adapter plug-in.",
    href: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.capabilityRegistrationLink.href,
  },
  {
    id: "workspace-link",
    group: "Integration",
    label: "Workspace link",
    marker: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.workspaceLink.marker,
    posture: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.workspaceLink.posture,
    summary: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.workspaceLink.summary,
    detail:
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.workspaceLabel +
      " stays linked at " +
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.workspaceHref +
      ".",
    href: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.workspaceLink.href,
  },
  {
    id: "shared-contract-link",
    group: "Integration",
    label: "Shared backend contract",
    marker:
      JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.sharedBackendAdapterContractLink.marker,
    posture:
      JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.sharedBackendAdapterContractLink.posture,
    summary:
      JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.sharedBackendAdapterContractLink.summary,
    detail:
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.adapterId +
      " keeps request/response/error envelope names review-only.",
    href: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.sharedBackendAdapterContractLink.href,
  },
  {
    id: "permission-policy-link",
    group: "Integration",
    label: "Permission policy link",
    marker: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.permissionPolicyLink.marker,
    posture: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.permissionPolicyLink.posture,
    summary: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.permissionPolicyLink.summary,
    detail:
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.approvalMode +
      " / " +
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.dryRunRequirement +
      " / " +
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.backendOnlyRequirement,
    href: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.permissionPolicyLink.href,
  },
  {
    id: "planner-route-link",
    group: "Integration",
    label: "Planner route link",
    marker: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.taskPlannerRouteLink.marker,
    posture: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.taskPlannerRouteLink.posture,
    summary: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.taskPlannerRouteLink.summary,
    detail:
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.plannedRouteTarget +
      " / " +
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.requestEnvelopeName,
    href: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.taskPlannerRouteLink.href,
  },
  {
    id: "audit-status-link",
    group: "Integration",
    label: "Audit and status link",
    marker: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.auditStatusLink.marker,
    posture: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.auditStatusLink.posture,
    summary: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.auditStatusLink.summary,
    detail:
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.adapterStatus +
      " / " +
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.resultLedgerStatus,
    href: JARVIS_VIDEO_ADAPTER_PLUGIN_SYSTEM_LINKS.auditStatusLink.href,
  },
  {
    id: "runtime-readiness-reference",
    group: "Milestones",
    label: "Runtime readiness reference",
    marker: milestoneByMarker["backend-owned video runtime readiness reference only"].marker,
    posture: "reference only",
    summary:
      milestoneByMarker["backend-owned video runtime readiness reference only"].summary,
    detail:
      milestoneByMarker["backend-owned video runtime readiness reference only"].phaseRange +
      " - " +
      milestoneByMarker["backend-owned video runtime readiness reference only"].title,
    href: milestoneByMarker["backend-owned video runtime readiness reference only"].href,
  },
  {
    id: "dry-run-reference",
    group: "Milestones",
    label: "Dry-run reference",
    marker: milestoneByMarker["video dry-run reference only"].marker,
    posture: "reference only",
    summary: milestoneByMarker["video dry-run reference only"].summary,
    detail:
      milestoneByMarker["video dry-run reference only"].phaseRange +
      " - " +
      milestoneByMarker["video dry-run reference only"].title,
    href: milestoneByMarker["video dry-run reference only"].href,
  },
  {
    id: "approval-packet-reference",
    group: "Milestones",
    label: "Approval packet reference",
    marker: milestoneByMarker["video approval packet reference only"].marker,
    posture: "reference only",
    summary: milestoneByMarker["video approval packet reference only"].summary,
    detail:
      milestoneByMarker["video approval packet reference only"].phaseRange +
      " - " +
      milestoneByMarker["video approval packet reference only"].title,
    href: milestoneByMarker["video approval packet reference only"].href,
  },
  {
    id: "adapter-readiness-reference",
    group: "Milestones",
    label: "Adapter readiness reference",
    marker: milestoneByMarker["video adapter readiness reference only"].marker,
    posture: "reference only",
    summary: milestoneByMarker["video adapter readiness reference only"].summary,
    detail:
      milestoneByMarker["video adapter readiness reference only"].phaseRange +
      " - " +
      milestoneByMarker["video adapter readiness reference only"].title,
    href: milestoneByMarker["video adapter readiness reference only"].href,
  },
  {
    id: "backend-only-posture",
    group: "Reviews",
    label: "Backend-only posture",
    marker: "backend-only execution path required",
    posture: JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.backendOnlyRequirement,
    summary:
      "The adapter remains backend-only, with no direct frontend execution path and no API route execution in this batch.",
    detail: JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.executionPosture,
  },
  {
    id: "provider-reference-review",
    group: "Reviews",
    label: "Provider reference review",
    marker: "provider reference review only",
    posture: "review only",
    summary:
      "Provider references stay inert and descriptive, with no provider SDK imports and no provider execution.",
    detail: "Review-only provider notes; no live provider call.",
  },
  {
    id: "credential-reference-review",
    group: "Reviews",
    label: "Credential reference review",
    marker: "credential reference review only",
    posture: "review only",
    summary:
      "Credential references remain backend-owned and are never read, stored, or exposed by the frontend.",
    detail: JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.permissionPosture,
  },
  {
    id: "token-reference-review",
    group: "Reviews",
    label: "Token reference review",
    marker: "token reference review only",
    posture: "review only",
    summary:
      "Token references remain backend-only review markers with no plaintext secrets and no browser storage for secrets.",
    detail: "No frontend provider key reads; no plaintext secrets.",
  },
  {
    id: "request-envelope-review",
    group: "Reviews",
    label: "Request envelope review",
    marker: "request envelope review only",
    posture: "review only",
    summary:
      "The request envelope stays static and approval-gated, linking planner request shape to the shared backend adapter contract input envelope.",
    detail:
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.requestEnvelopeName +
      " -> " +
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.contractInputEnvelopeName,
  },
  {
    id: "response-envelope-review",
    group: "Reviews",
    label: "Response envelope review",
    marker: "response envelope review only",
    posture: "review only",
    summary:
      "The response envelope stays as a static review surface only, with no provider execution and no real video generation.",
    detail: JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.contractOutputEnvelopeName,
  },
  {
    id: "error-envelope-review",
    group: "Reviews",
    label: "Error envelope review",
    marker: "error envelope review only",
    posture: "review only",
    summary:
      "The error envelope remains a review-only placeholder for backend-owned adapter failures without creating retry or runtime services.",
    detail: JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.contractErrorEnvelopeName,
  },
  {
    id: "prompt-redaction-review",
    group: "Reviews",
    label: "Prompt redaction review",
    marker: "prompt redaction review only",
    posture: "review only",
    summary:
      "Prompt redaction posture is shown as a guard review only and does not send prompts, fetch, or call providers.",
    detail: "No prompt sending; no fetch/network calls.",
  },
  {
    id: "guard-snapshot-review",
    group: "Reviews",
    label: "Guard snapshot review",
    marker: "guard snapshot review only",
    posture: "review only",
    summary:
      "Guard snapshots summarize dry-run, approval, kill switch, lock, idempotency, replay, and operator review posture for video.generate.",
    detail:
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.dryRunStatus +
      " / " +
      JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.approvalStatus,
  },
  {
    id: "cost-rate-timeout-review",
    group: "Reviews",
    label: "Cost, rate, and timeout review",
    marker: "cost rate timeout review only",
    posture: "review only",
    summary:
      "Cost, rate, and timeout handling stay approval-linked review markers only, with no live execution path.",
    detail: "Cost limit posture required / rate limit posture required / timeout posture required.",
  },
  {
    id: "duration-resolution-size-review",
    group: "Reviews",
    label: "Duration, resolution, and size review",
    marker: "duration resolution size review only",
    posture: "review only",
    summary:
      "Video duration, resolution, and size remain static planning metadata only and do not create render execution or export execution.",
    detail: "No real video generation; no live video generation.",
  },
  {
    id: "privacy-safety-review",
    group: "Reviews",
    label: "Privacy and safety review",
    marker: "privacy safety review only",
    posture: "review only",
    summary:
      "Privacy and safety stay explicit review markers while secrets, storage mutation, uploads, and network execution remain blocked.",
    detail: "No platform upload; no media upload; no browser storage for secrets.",
  },
  {
    id: "result-placeholder",
    group: "Guardrails",
    label: "Result placeholder",
    marker: "result placeholder only",
    posture: JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.resultLedgerStatus,
    summary:
      "Result state stays placeholder-only so the workspace can show readiness without creating generated media or live adapter results.",
    detail: JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.artifactPlaceholderStatus,
  },
  {
    id: "artifact-handoff-placeholder",
    group: "Guardrails",
    label: "Artifact handoff placeholder",
    marker: "artifact handoff placeholder only",
    posture: "placeholder only",
    summary:
      "Artifact handoff remains a placeholder surface only with no file export, download generation, archive creation, or signed URL creation.",
    detail: "No file export; no download generation; no archive creation.",
  },
  {
    id: "kill-switch-posture",
    group: "Guardrails",
    label: "Kill switch posture",
    marker: "kill switch remains enforced",
    posture: JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.killSwitchStatus,
    summary:
      "The shared hard kill switch stays enforced before any future backend video execution is even considered.",
    detail: "hard kill switch",
  },
  {
    id: "lock-manager-posture",
    group: "Guardrails",
    label: "Lock manager posture",
    marker: "lock manager required",
    posture: JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.lockIdempotencyStatus,
    summary:
      "Lock manager posture remains required as part of the shared backend adapter path, not as a frontend execution capability.",
    detail: "lock manager required",
  },
  {
    id: "idempotency-posture",
    group: "Guardrails",
    label: "Idempotency posture",
    marker: "idempotency required",
    posture: JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.lockIdempotencyStatus,
    summary:
      "Idempotency stays mandatory for any future backend adapter execution while the current batch remains review-only and dry-run-only.",
    detail: "idempotency required",
  },
  {
    id: "replay-block-posture",
    group: "Guardrails",
    label: "Replay block posture",
    marker: "replay block required",
    posture: JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.replayBlockStatus,
    summary:
      "Replay blocking remains required before any future backend execution, and the frontend only shows that posture as evidence.",
    detail: "replay block required",
  },
  {
    id: "blocked-action-summary",
    group: "Guardrails",
    label: "Blocked action summary",
    marker: "blocked action summary only",
    posture: "review only",
    summary:
      "Blocked actions stay visible to the operator so the video adapter remains review-only, backend-only, and execution-blocked.",
    detail: JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.blockedActionSummary,
  },
  {
    id: "operator-review-posture",
    group: "Guardrails",
    label: "Operator review posture",
    marker: "operator review required before video execution",
    posture: JARVIS_VIDEO_ADAPTER_PLUGIN_SHARED_RECORDS.operatorReviewStatus,
    summary:
      "Operator review is required before any future video execution, and this batch does not weaken that approval gate.",
    detail: "operator review required before video execution",
  },
  {
    id: "no-execution-guard",
    group: "Guardrails",
    label: "No-execution guard",
    marker: "no direct frontend execution",
    posture: "execution blocked",
    summary:
      "The front end can review posture, route intent, and evidence only. It cannot execute providers, tools, APIs, workers, or file writes.",
    detail: "backend-only execution path required / no direct frontend execution",
  },
] satisfies readonly JarvisVideoAdapterPluginReviewCard[];

export const JARVIS_VIDEO_ADAPTER_PLUGIN_REVIEW_SUMMARY =
  JARVIS_VIDEO_ADAPTER_PLUGIN_REVIEW_CARDS.map(
    (card) => card.label + ": " + card.marker
  );
