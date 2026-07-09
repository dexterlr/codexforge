import type { Route } from "next";

export type JarvisVideoStudioReleaseCandidateTone =
  | "ready"
  | "approval-required"
  | "blocked"
  | "secondary";

export type JarvisVideoStudioReleaseCandidateHeroMetric = Readonly<{
  label: string;
  value: string;
  detail: string;
}>;

export type JarvisVideoStudioReleaseCandidateHeroState = Readonly<{
  eyebrow: string;
  stageLabel: string;
  title: string;
  summary: string;
  detail: string;
  metrics: readonly JarvisVideoStudioReleaseCandidateHeroMetric[];
}>;

export type JarvisVideoStudioReleaseCandidateMissionBrief = Readonly<{
  title: string;
  audience: string;
  objective: string;
  operatorPosture: string;
  handoffState: string;
}>;

export type JarvisVideoStudioReleaseCandidateTimelineStep = Readonly<{
  id: string;
  phase: string;
  title: string;
  summary: string;
  posture: string;
  routeHref: Route;
}>;

export type JarvisVideoStudioReleaseCandidateLaneRecord = Readonly<{
  id: string;
  title: string;
  summary: string;
  posture: string;
  detail: string;
  routeHref: Route;
  tone: JarvisVideoStudioReleaseCandidateTone;
}>;

export type JarvisVideoStudioReleaseCandidateLinkRecord = Readonly<{
  label: string;
  href: Route;
  summary: string;
}>;

export type JarvisVideoStudioReleaseCandidateMilestoneReference = Readonly<{
  phaseRange: string;
  label: string;
  href: Route;
  summary: string;
}>;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_HERO_STATE = {
  eyebrow: "Jarvis Video Studio",
  stageLabel: "Result capture and audit join",
  title: "Jarvis Video Studio",
  summary:
    "Premium review workspace for mission planning, approvals, backend runner contract hardening, the backend dry-run admission foundation, the server-only synthetic dry run preview, and the new result capture and audit join layer.",
  detail:
    "Jarvis Video Studio now carries typed server-only result capture, audit envelope, and approval join records while generation stays locked. Backend-only runner required. Operator approval required. Credential isolation required. Queue, worker, and job execution remain disabled.",
  metrics: [
    {
      label: "Workspace",
      value: "Contract-first handoff",
      detail: "Mission brief, approvals, hardening, and the server-only synthetic preview stay on one surface.",
    },
    {
      label: "Workflow",
      value: "Studio plus server-only preview",
      detail: "Mission brief to static synthetic result envelope stays visible in one surface.",
    },
    {
      label: "Readiness",
      value: "Envelope join defined",
      detail: "The next backend-only step is first gated provider execution trial preparation, not live provider execution.",
    },
    {
      label: "Safety",
      value: "Execution locked",
      detail: "Kill switch engaged, no direct frontend execution, and no provider call from frontend.",
    },
  ],
} as const satisfies JarvisVideoStudioReleaseCandidateHeroState;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_MISSION_BRIEF = {
  title: "Mission brief",
  audience:
    "Operator-led review of the studio, its hardened backend-only runner contract, the dry-run admission foundation, the server-only synthetic preview, and the typed result capture, audit, and approval join envelopes.",
  objective:
    "Consolidate planning, prerequisites, approval, dry run, backend readiness, controlled trial, backend runner contract hardening, backend dry-run admission foundation, the server-only synthetic preview, the result capture and audit join layer, result review recovery, the backend implementation readiness follow-up, and the earlier backend execution implementation plan into one coherent premium studio surface.",
  operatorPosture:
    "Operator approval required before any backend-owned execution path can move forward.",
  handoffState:
    "Plan, review, approve, then hand off to backend. This batch adds result capture envelope only, audit envelope only, and approval join envelope only. No provider call from frontend.",
} as const satisfies JarvisVideoStudioReleaseCandidateMissionBrief;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_PRODUCTION_TIMELINE = [
  {
    id: "mission-brief",
    phase: "Step 1",
    title: "Mission brief",
    summary: "Frame the operator brief, audience, objective, and release posture.",
    posture: "review-only brief locked",
    routeHref:
      "/jarvis-video-studio-release-candidate-mission-brief-wiring" as Route,
  },
  {
    id: "script-storyboard",
    phase: "Step 2",
    title: "Script and storyboard plan",
    summary: "Keep scene order, pacing, and intent visible before any generation lane.",
    posture: "script storyboard lane",
    routeHref:
      "/jarvis-video-studio-release-candidate-script-storyboard-wiring" as Route,
  },
  {
    id: "prerequisites",
    phase: "Step 3",
    title: "Asset, audio, and caption prerequisites",
    summary:
      "Review the prerequisites that have to exist before backend-owned execution can be considered.",
    posture: "asset audio caption lane",
    routeHref:
      "/jarvis-video-studio-release-candidate-asset-audio-caption-wiring" as Route,
  },
  {
    id: "approval-packet",
    phase: "Step 4",
    title: "Approval packet",
    summary: "Keep the approval packet lane as the operator gate for the studio.",
    posture: "approval packet lane",
    routeHref:
      "/jarvis-video-studio-release-candidate-approval-packet-wiring" as Route,
  },
  {
    id: "dry-run",
    phase: "Step 5",
    title: "Dry run",
    summary: "Verify dry-run workspace evidence before any backend handoff discussion.",
    posture: "dry-run lane",
    routeHref:
      "/jarvis-video-studio-release-candidate-dry-run-wiring" as Route,
  },
  {
    id: "backend-readiness",
    phase: "Step 6",
    title: "Backend readiness",
    summary: "Surface backend readiness gates as prerequisites, not execution affordances.",
    posture: "backend readiness lane",
    routeHref:
      "/jarvis-video-studio-release-candidate-backend-readiness-wiring" as Route,
  },
  {
    id: "controlled-trial",
    phase: "Step 7",
    title: "Controlled trial",
    summary:
      "Keep the controlled trial lane visible as a locked backend-owned review checkpoint.",
    posture: "controlled trial lane",
    routeHref:
      "/jarvis-video-studio-release-candidate-controlled-trial-wiring" as Route,
  },
  {
    id: "backend-runner",
    phase: "Step 8",
    title: "Backend dry-run admission",
    summary:
      "Define the backend dry-run admission foundation as precise typed backend architecture without enabling execution.",
    posture: "backend runner lane",
    routeHref:
      "/jarvis-video-studio-release-candidate-backend-runner-wiring" as Route,
  },
  {
    id: "result-review",
    phase: "Step 9",
    title: "Result review and recovery",
    summary:
      "Keep result review recovery visible without processing or persisting real output.",
    posture: "result review recovery lane",
    routeHref:
      "/jarvis-video-studio-release-candidate-result-review-wiring" as Route,
  },
  {
    id: "next-action",
    phase: "Step 10",
    title: "Next action",
    summary:
      "End the studio with a single clear operator decision and a future dry-run admission foundation instead of a diagnostic sprawl.",
    posture: "next action card",
    routeHref:
      "/jarvis-video-studio-release-candidate-next-action-wiring" as Route,
  },
] as const satisfies readonly JarvisVideoStudioReleaseCandidateTimelineStep[];

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_SCRIPT_STORYBOARD_LANE = {
  id: "script-storyboard-lane",
  title: "Script and storyboard",
  summary:
    "Script, scene intent, and storyboard posture stay visible as premium planning data only.",
  posture: "review-ready creative plan",
  detail: "No real video generation. No video provider execution.",
  routeHref:
    "/jarvis-video-studio-release-candidate-script-storyboard-wiring" as Route,
  tone: "ready",
} as const satisfies JarvisVideoStudioReleaseCandidateLaneRecord;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_ASSET_AUDIO_CAPTION_LANE = {
  id: "asset-audio-caption-lane",
  title: "Assets, audio, and captions",
  summary:
    "Asset references, audio prerequisites, and caption readiness stay visible without upload, download, or generation.",
  posture: "prerequisites incomplete until backend handoff",
  detail: "No media upload. No audio provider execution. No file export.",
  routeHref:
    "/jarvis-video-studio-release-candidate-asset-audio-caption-wiring" as Route,
  tone: "approval-required",
} as const satisfies JarvisVideoStudioReleaseCandidateLaneRecord;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_APPROVAL_PACKET_LANE = {
  id: "approval-packet-lane",
  title: "Approval packet",
  summary:
    "Approval evidence, prompt envelope posture, and operator sign-off remain the gateway into any backend-owned path.",
  posture: "operator approval required",
  detail: "No approval persistence. No audit persistence. review-only packet.",
  routeHref:
    "/jarvis-video-studio-release-candidate-approval-packet-wiring" as Route,
  tone: "approval-required",
} as const satisfies JarvisVideoStudioReleaseCandidateLaneRecord;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_DRY_RUN_LANE = {
  id: "dry-run-lane",
  title: "Dry run",
  summary:
    "Dry-run evidence remains a visible prerequisite before any controlled trial discussion.",
  posture: "dry-run workspace remains review-only",
  detail: "No provider execution. No network execution. No render execution.",
  routeHref:
    "/jarvis-video-studio-release-candidate-dry-run-wiring" as Route,
  tone: "ready",
} as const satisfies JarvisVideoStudioReleaseCandidateLaneRecord;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_BACKEND_READINESS_LANE = {
  id: "backend-readiness-lane",
  title: "Backend readiness",
  summary:
    "Backend runtime readiness, credential isolation, redaction, audit ownership, and server-only execution planning remain prerequisites only.",
  posture: "backend-only execution required",
  detail: "No frontend execution of backend adapters. No queue, worker, or provider execution.",
  routeHref:
    "/jarvis-video-studio-release-candidate-backend-readiness-wiring" as Route,
  tone: "approval-required",
} as const satisfies JarvisVideoStudioReleaseCandidateLaneRecord;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_CONTROLLED_TRIAL_LANE = {
  id: "controlled-trial-lane",
  title: "Controlled trial",
  summary:
    "The controlled trial stays visible as a locked backend-owned rail with no launch affordance.",
  posture: "generation remains locked",
  detail: "No live provider call. No controlled execution from frontend.",
  routeHref:
    "/jarvis-video-studio-release-candidate-controlled-trial-wiring" as Route,
  tone: "blocked",
} as const satisfies JarvisVideoStudioReleaseCandidateLaneRecord;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_BACKEND_RUNNER_LANE = {
  id: "backend-runner-lane",
  title: "Backend dry-run admission",
  summary:
    "The backend dry-run admission foundation is now defined as typed backend architecture and review markers only.",
  posture: "backend-only runner required",
  detail: "No queue dispatch. No worker dispatch. No job execution.",
  routeHref:
    "/jarvis-video-studio-release-candidate-backend-runner-wiring" as Route,
  tone: "blocked",
} as const satisfies JarvisVideoStudioReleaseCandidateLaneRecord;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_RESULT_REVIEW_LANE = {
  id: "result-review-lane",
  title: "Result review and recovery",
  summary:
    "Result review and recovery stay visible as staged backend evidence with no real result processing.",
  posture: "release summary review only",
  detail: "No result persistence. No artifact persistence. No retry execution.",
  routeHref:
    "/jarvis-video-studio-release-candidate-result-review-wiring" as Route,
  tone: "secondary",
} as const satisfies JarvisVideoStudioReleaseCandidateLaneRecord;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_PRODUCT_IA_LINK = {
  label: "Jarvis product map",
  href: "/jarvis-unified-product-ia-video-workspace-polish-wiring" as Route,
  summary: "See how Video Studio fits into the wider Jarvis product.",
} as const satisfies JarvisVideoStudioReleaseCandidateLinkRecord;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_JARVIS_HOME_LINK = {
  label: "Jarvis Command Center",
  href: "/jarvis" as Route,
  summary: "Open Jarvis OS for capability launchers, audit preview, and safety state.",
} as const satisfies JarvisVideoStudioReleaseCandidateLinkRecord;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_COCKPIT_LINK = {
  label: "CodexForge Cockpit",
  href: "/codexforge-cockpit" as Route,
  summary: "Open the premium cockpit for approvals, readiness, and next actions.",
} as const satisfies JarvisVideoStudioReleaseCandidateLinkRecord;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_MILESTONE_REFERENCES = [
  {
    phaseRange: "3434-3465",
    label: "Backend-Owned Video Provider Execution Runtime Readiness",
    href: "/video-provider-runtime-boundary-wiring" as Route,
    summary: "runtime readiness review only",
  },
  {
    phaseRange: "3466-3497",
    label: "First Backend-Owned Video Provider Execution Dry Run",
    href: "/video-provider-dry-run-boundary-wiring" as Route,
    summary: "dry-run evidence review only",
  },
  {
    phaseRange: "3498-3529",
    label: "First Backend-Owned Video Provider Execution Approval Packet",
    href: "/video-provider-approval-packet-boundary-wiring" as Route,
    summary: "approval packet review only",
  },
  {
    phaseRange: "3530-3561",
    label: "First Backend-Owned Video Provider Execution Adapter Readiness",
    href: "/video-provider-adapter-readiness-boundary-wiring" as Route,
    summary: "adapter readiness review only",
  },
  {
    phaseRange: "3754-3785",
    label: "First Jarvis-Controlled Video Adapter Plug-in",
    href: "/jarvis-video-adapter-plugin-boundary-wiring" as Route,
    summary: "adapter plug-in review only",
  },
  {
    phaseRange: "3786-3817",
    label: "First Jarvis-Controlled Video Dry Run Workspace",
    href: "/jarvis-video-dry-run-workspace-boundary-wiring" as Route,
    summary: "dry-run workspace review only",
  },
  {
    phaseRange: "3818-3849",
    label: "First Jarvis-Controlled Video Approval Packet Workspace",
    href: "/jarvis-video-approval-packet-workspace-boundary-wiring" as Route,
    summary: "approval packet workspace review only",
  },
  {
    phaseRange: "3850-3881",
    label: "Jarvis Product Experience God-Tier UX Upgrade",
    href: "/jarvis-product-experience-hero-shell-wiring" as Route,
    summary: "product experience review only",
  },
  {
    phaseRange: "3882-3913",
    label: "First Jarvis-Controlled Video Backend Execution Readiness",
    href: "/jarvis-video-backend-execution-readiness-boundary-wiring" as Route,
    summary: "backend execution readiness review only",
  },
  {
    phaseRange: "3914-3945",
    label: "Jarvis Unified Product IA and God-Tier UX Polish",
    href: "/jarvis-unified-product-ia-video-workspace-polish-wiring" as Route,
    summary: "product IA link review only",
  },
  {
    phaseRange: "3946-3977",
    label: "First Jarvis-Controlled Video Controlled Execution Trial",
    href: "/jarvis-video-controlled-execution-trial-boundary-wiring" as Route,
    summary: "controlled trial link review only",
  },
  {
    phaseRange: "3978-4009",
    label: "First Jarvis-Controlled Video Backend Trial Runner Contract",
    href: "/jarvis-video-backend-trial-runner-contract-boundary-wiring" as Route,
    summary: "backend runner link review only",
  },
  {
    phaseRange: "4010-4041",
    label: "First Jarvis-Controlled Video Trial Result Review and Recovery",
    href: "/jarvis-video-trial-result-review-recovery-boundary-wiring" as Route,
    summary: "result review recovery link review only",
  },
  {
    phaseRange: "4042-4073",
    label: "Jarvis Video Studio Release Candidate",
    href:
      "/jarvis-video-studio-release-candidate-boundary-wiring" as Route,
    summary: "release candidate review-only evidence",
  },
  {
    phaseRange: "4074-4105",
    label: "Jarvis Video Backend Execution Implementation Plan",
    href: "/jarvis-video" as Route,
    summary: "implementation-plan review-only evidence",
  },
  {
    phaseRange: "4106-4137",
    label: "Jarvis Video Backend Implementation Readiness Follow-Up",
    href: "/jarvis-video" as Route,
    summary: "implementation-readiness review-only evidence",
  },
  {
    phaseRange: "4138-4169",
    label: "Jarvis Video Backend Runner Contract Hardening",
    href: "/jarvis-video" as Route,
    summary: "runner-contract-hardening review-only evidence",
  },
  {
    phaseRange: "4170-4201",
    label: "Jarvis Video Backend Runner Foundation Dry-Run Admission",
    href: "/jarvis-video" as Route,
    summary: "dry-run-admission review-only evidence",
  },
] as const satisfies readonly JarvisVideoStudioReleaseCandidateMilestoneReference[];
