import {
  JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD,
  type JarvisVideoApprovalPacketWorkspaceReviewCard,
} from "./jarvis-video-approval-packet-workspace-packet";

export const JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_GUARD_CARDS = [
  {
    id: "cost-guard",
    group: "Guards",
    label: "Cost guard",
    marker: "cost guard review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.costGuardPosture,
    summary:
      "Cost posture stays review-only and does not authorize live provider execution or token spend from the frontend.",
    detail: "Cost limit posture required.",
  },
  {
    id: "rate-guard",
    group: "Guards",
    label: "Rate guard",
    marker: "rate guard review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.rateGuardPosture,
    summary:
      "Rate posture stays review-only and blocks live request dispatch, retries, and autonomous tool execution.",
    detail: "Rate limit posture required.",
  },
  {
    id: "timeout-guard",
    group: "Guards",
    label: "Timeout guard",
    marker: "timeout guard review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.timeoutGuardPosture,
    summary:
      "Timeout posture stays review-only and does not create jobs, workers, runtimes, or network execution paths.",
    detail: "Timeout posture required.",
  },
  {
    id: "duration-guard",
    group: "Guards",
    label: "Duration guard",
    marker: "duration guard review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.durationGuardPosture,
    summary:
      "Video duration remains static approval metadata only with no render execution and no live video generation.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.durationGuardPreview,
  },
  {
    id: "resolution-guard",
    group: "Guards",
    label: "Resolution guard",
    marker: "resolution guard review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.resolutionGuardPosture,
    summary:
      "Resolution stays a review-only cap with no provider execution, render execution, or export execution.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.resolutionGuardPreview,
  },
  {
    id: "size-guard",
    group: "Guards",
    label: "Size guard",
    marker: "size guard review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.sizeGuardPosture,
    summary:
      "Size stays a review-only cap with no file export, download generation, archive creation, or media upload.",
    detail:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.sizeGuardPreview,
  },
  {
    id: "privacy-guard",
    group: "Guards",
    label: "Privacy guard",
    marker: "privacy guard review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.privacyGuardPosture,
    summary:
      "Privacy posture remains review-only with no platform upload, no media upload, no browser storage for secrets, and no fetch/network calls.",
    detail: "Data sensitivity posture required.",
  },
  {
    id: "safety-guard",
    group: "Guards",
    label: "Safety guard",
    marker: "safety guard review only",
    posture:
      JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_SHARED_RECORD.safetyGuardPosture,
    summary:
      "Safety posture remains review-only with no provider SDK imports in frontend, no plaintext secrets, and no direct frontend execution.",
    detail: "Secret boundary posture required.",
  },
] satisfies readonly JarvisVideoApprovalPacketWorkspaceReviewCard[];
