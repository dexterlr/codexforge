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
  value: 82,
  posture: "backend-owned execution required",
  summary:
    "The release candidate is ready for operator review, but execution stays blocked behind backend readiness, approval, and safety gates.",
  detail: [
    "mission brief and storyboard path are coherent",
    "approval packet and dry-run references are visible",
    "controlled trial and backend runner remain locked",
    "result review recovery stays staged and review-only",
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
    summary: "No worker, scheduler, queue, tool, or orchestration path can be triggered from the studio.",
    guard: "hard kill switch",
    tone: "blocked",
  },
] as const satisfies readonly JarvisVideoStudioReleaseCandidateBlockedActionCard[];

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_NEXT_ACTION_CARD = {
  title: "Continue Video Studio",
  summary:
    "Review the mission brief, approval packet, backend readiness, and result recovery plan before backend planning.",
  posture: "Backend handoff follows operator approval and locked safety rails.",
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
    "The release candidate turns /jarvis-video into a coherent premium studio workspace with workflow-first navigation, concise next actions, and diagnostics pushed lower.",
  highlights: [
    "Human hero with a clear operator path and compact safety state",
    "Video production timeline and studio readiness score",
    "Prerequisite cards for script, assets, approval packet, and dry run",
    "Backend readiness, controlled trial, runner contract, and result review rails",
    "Blocked actions stay visible without taking over the main workspace",
  ],
} as const satisfies JarvisVideoStudioReleaseCandidateReleaseSummary;

export const JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_DEVELOPER_DIAGNOSTICS_GROUPING =
  {
    title: "Developer diagnostics",
    summary:
      "Traceability, prior milestones, and wiring routes stay reachable, but they no longer lead the workspace.",
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
