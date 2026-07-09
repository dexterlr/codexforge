import type { Route } from "next";
import type {
  JarvisVideoStudioReleaseCandidateLinkRecord,
  JarvisVideoStudioReleaseCandidateTone,
} from "./jarvis-video-studio-release-candidate-sections";

export type JarvisVideoStudioReleaseCandidateReadinessScore = Readonly<{
  label: string;
  value: number;
  posture: string;
  summary: string;
  detail: readonly string[];
}>;

export type JarvisVideoStudioReleaseCandidateBlockedActionCard = Readonly<{
  id: string;
  title: string;
  summary: string;
  guard: string;
  tone: JarvisVideoStudioReleaseCandidateTone;
}>;

export type JarvisVideoStudioReleaseCandidateNextActionCard = Readonly<{
  title: string;
  summary: string;
  posture: string;
  routeHref: Route;
}>;

export type JarvisVideoStudioReleaseCandidateWorkspaceNavigationCard =
  Readonly<{
    title: string;
    summary: string;
    links: readonly JarvisVideoStudioReleaseCandidateLinkRecord[];
  }>;

export type JarvisVideoStudioReleaseCandidateReleaseSummary = Readonly<{
  title: string;
  summary: string;
  highlights: readonly string[];
}>;

export type JarvisVideoStudioReleaseCandidateDiagnosticsGrouping = Readonly<{
  title: string;
  summary: string;
  links: readonly JarvisVideoStudioReleaseCandidateLinkRecord[];
}>;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_READINESS_SCORE = {
  label: "video readiness score",
  value: 92,
  posture: "result capture envelope only",
  summary:
    "Jarvis Video Studio now carries the backend dry-run admission foundation, the server-only runner skeleton, and the typed result capture, audit envelope, and approval join layer, but execution still stays blocked behind approval, credential isolation, and the future gated provider trial preparation batch.",
  detail: [
    "mission brief and storyboard path are coherent",
    "approval packet and dry-run references are visible",
    "backend runner contract hardening, dry-run admission, server-only synthetic preview, and result capture/audit/join envelopes are visible without live execution",
    "controlled trial remains locked and first gated provider execution trial preparation stays future-only",
  ],
} as const satisfies JarvisVideoStudioReleaseCandidateReadinessScore;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_BLOCKED_ACTION_DECK = [
  {
    id: "generate-video",
    title: "Generate video",
    summary: "The studio does not enable real video generation from the frontend.",
    guard: "no generation guard",
    tone: "blocked",
  },
  {
    id: "provider-call",
    title: "Call provider",
    summary: "Provider execution remains backend-owned and fully blocked in the frontend.",
    guard: "no provider network guard",
    tone: "blocked",
  },
  {
    id: "runner-start",
    title: "Start backend runner",
    summary: "The backend runner contract is visible for review only and cannot be executed here.",
    guard: "no execution guard",
    tone: "blocked",
  },
  {
    id: "persist-result",
    title: "Persist result",
    summary: "No review artifact, audit note, or result evidence can be persisted from this page.",
    guard: "no persistence guard",
    tone: "blocked",
  },
  {
    id: "export-artifact",
    title: "Export or publish",
    summary: "Export, publish, upload, and signed URL flows remain deliberately absent.",
    guard: "release summary review only",
    tone: "blocked",
  },
  {
    id: "automation",
    title: "Automate follow-up",
    summary: "No queue, worker, scheduler, tool, or orchestration path exists yet from the studio.",
    guard: "hard kill switch",
    tone: "blocked",
  },
] as const satisfies readonly JarvisVideoStudioReleaseCandidateBlockedActionCard[];

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_NEXT_ACTION_CARD = {
  title: "Prepare result capture, audit envelope, and approval join",
  summary:
    "Review the defined result capture envelope, audit envelope, and approval join records before the first gated provider execution trial preparation batch is proposed.",
  posture:
    "This batch adds result capture envelope only, audit envelope only, and approval join envelope only; no queue, worker, job, provider, or persistence path exists yet.",
  routeHref:
    "/jarvis-video-studio-release-candidate-next-action-wiring" as Route,
} as const satisfies JarvisVideoStudioReleaseCandidateNextActionCard;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_WORKSPACE_NAVIGATION_CARD = {
  title: "Workspace launcher",
  summary:
    "Keep the normal product journey visible before diagnostics: Video Studio, Jarvis, Cockpit, Audit and Runs, and Safety and Settings.",
  links: [
    {
      label: "Jarvis Video Studio",
      href: "/jarvis-video" as Route,
      summary: "Mission brief, readiness, approvals, and backend handoff.",
    },
    {
      label: "Jarvis Command Center",
      href: "/jarvis" as Route,
      summary: "Capability launcher, audit preview, and safety state.",
    },
    {
      label: "CodexForge Cockpit",
      href: "/codexforge-cockpit" as Route,
      summary: "Premium cockpit for approvals, readiness, and operator context.",
    },
    {
      label: "Audit and Runs",
      href: "/jarvis-audit" as Route,
      summary: "Evidence, approvals, blocked actions, and result review.",
    },
    {
      label: "Safety and Settings",
      href: "/jarvis-safety" as Route,
      summary: "Kill switch, approval mode, credential boundary, and storage boundary.",
    },
  ],
} as const satisfies JarvisVideoStudioReleaseCandidateWorkspaceNavigationCard;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_RELEASE_SUMMARY = {
  title: "Studio at a glance",
  summary:
    "Jarvis Video Studio stays coherent and product-first while backend runner contract hardening, the dry-run admission foundation, the server-only synthetic dry run, and the new result capture and audit join layer land below the console instead of taking over the hero.",
  highlights: [
    "Human hero with a clear operator path and compact safety state",
    "Video production timeline, readiness score, backend runner contract hardening, backend dry-run admission, a server-only synthetic dry run, and result capture plus audit join",
    "Prerequisite cards for script, assets, approval packet, and dry run",
    "Backend readiness, controlled trial, runner contract, result review, and the next first-gated-provider-trial-preparation batch",
    "Blocked actions and diagnostics stay visible without taking over the main workspace",
  ],
} as const satisfies JarvisVideoStudioReleaseCandidateReleaseSummary;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_DEVELOPER_DIAGNOSTICS_GROUPING =
  {
    title: "Developer diagnostics",
    summary:
      "Traceability, prior milestones, runner-contract-hardening markers, and dry-run-admission markers stay reachable, but they no longer lead the workspace.",
    links: [
      {
        label: "Boundary markers",
        href:
          "/jarvis-video-studio-release-candidate-boundary-wiring" as Route,
        summary: "Release-candidate boundary reference.",
      },
      {
        label: "Diagnostics route",
        href:
          "/jarvis-video-studio-release-candidate-developer-diagnostics-wiring" as Route,
        summary: "Detailed traceability and embedded references.",
      },
      {
        label: "UX polish notes",
        href:
          "/jarvis-video-studio-release-candidate-ux-polish-wiring" as Route,
        summary: "Studio polish reference for developers.",
      },
    ],
  } as const satisfies JarvisVideoStudioReleaseCandidateDiagnosticsGrouping;
