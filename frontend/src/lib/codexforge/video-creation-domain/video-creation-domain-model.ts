export type VideoCreationDomainRouteSlug =
  | "video-creation-domain-boundary"
  | "video-workspace-intake-preview"
  | "video-project-brief-preview"
  | "video-audience-and-goal-preview"
  | "video-format-boundary-preview"
  | "video-safety-and-rights-boundary-preview"
  | "video-asset-planning-boundary-preview"
  | "video-script-planning-boundary-preview"
  | "video-storyboard-planning-boundary-preview"
  | "video-voiceover-planning-boundary-preview"
  | "video-caption-planning-boundary-preview"
  | "video-render-job-blocked-boundary-preview"
  | "video-export-blocked-boundary-preview"
  | "cockpit-video-creation-domain-summary"
  | "first-video-creation-domain-boundary-candidate"
  | "controlled-video-creation-domain-boundary-release-candidate";

export type VideoCreationDomainKind = "video-creation-domain-v1" | VideoCreationDomainRouteSlug;

export type VideoCreationDomainState =
  | "review-only"
  | "synthetic-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type VideoCreationDomainItem = {
  id: string;
  label: string;
  detail: string;
  state: VideoCreationDomainState;
};

export type VideoCreationDomainSectionId =
  | "videoCreationDomainBoundary"
  | "videoWorkspaceIntake"
  | "videoProjectBrief"
  | "videoAudienceAndGoal"
  | "videoFormatBoundary"
  | "videoSafetyAndRightsBoundary"
  | "videoAssetPlanningBoundary"
  | "videoScriptPlanningBoundary"
  | "videoStoryboardPlanningBoundary"
  | "videoVoiceoverPlanningBoundary"
  | "videoCaptionPlanningBoundary"
  | "videoRenderJobBlockedBoundary"
  | "videoExportBlockedBoundary"
  | "deniedVideoCreationDomainBoundaries";

export type VideoCreationDomainSection = {
  sectionId: VideoCreationDomainSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly VideoCreationDomainItem[];
  state: VideoCreationDomainState;
};

export type VideoCreationDomainModel = {
  videoCreationDomainId: string;
  videoCreationDomainKind: VideoCreationDomainKind;
  videoWorkspaceIntake: VideoCreationDomainSection;
  videoProjectBrief: VideoCreationDomainSection;
  videoAudienceAndGoal: VideoCreationDomainSection;
  videoFormatBoundary: VideoCreationDomainSection;
  videoSafetyAndRightsBoundary: VideoCreationDomainSection;
  videoAssetPlanningBoundary: VideoCreationDomainSection;
  videoScriptPlanningBoundary: VideoCreationDomainSection;
  videoStoryboardPlanningBoundary: VideoCreationDomainSection;
  videoVoiceoverPlanningBoundary: VideoCreationDomainSection;
  videoCaptionPlanningBoundary: VideoCreationDomainSection;
  videoRenderJobBlockedBoundary: VideoCreationDomainSection;
  videoExportBlockedBoundary: VideoCreationDomainSection;
  deniedVideoCreationDomainBoundaries: VideoCreationDomainSection;
  cockpitSummary: readonly VideoCreationDomainItem[];
  explicitSafetyLimits: readonly string[];
};

export type VideoCreationDomainRouteDefinition = {
  slug: VideoCreationDomainRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly VideoCreationDomainSectionId[];
  devOnly: boolean;
};

export type VideoCreationDomainRouteModel = {
  route: VideoCreationDomainRouteDefinition;
  videoCreationDomain: VideoCreationDomainModel;
  sections: readonly VideoCreationDomainSection[];
  diagnosticRoutes: readonly VideoCreationDomainRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const VIDEO_CREATION_DOMAIN_COCKPIT_MARKERS = [
  "Video Creation Domain",
  "Video Creation Domain Boundary",
  "Video Workspace Intake",
  "Video Project Brief",
  "Video Audience And Goal",
  "Video Format Boundary",
  "Video Safety And Rights Boundary",
  "Video Asset Planning Boundary",
  "Video Script Planning Boundary",
  "Video Storyboard Planning Boundary",
  "Video Voiceover Planning Boundary",
  "Video Caption Planning Boundary",
  "Video Render Job Blocked Boundary",
  "Video Export Blocked Boundary",
  "Review-only video creation domain",
  "Synthetic data only",
  "No video rendering from the cockpit",
  "No video export from the cockpit",
  "No asset upload from the cockpit",
  "No asset download from the cockpit",
  "No file generation from the cockpit",
  "No frontend file mutation",
  "No frontend asset persistence",
  "No frontend approval persistence",
  "No frontend prompt persistence",
  "No frontend job persistence",
  "No provider calls from the cockpit",
  "No model calls from the cockpit",
  "No connector calls from the cockpit",
  "No image generation calls from the cockpit",
  "No video generation calls from the cockpit",
  "No voice generation calls from the cockpit",
  "No publishing from the cockpit",
  "No social posting from the cockpit",
  "No scheduling from the cockpit",
  "No copyright clearance from the cockpit",
  "No automated brand approval from the cockpit",
  "No performance guarantees",
  "Backend-owned asset storage remains required",
  "Backend-owned render service remains required",
  "Backend-owned export service remains required",
  "Backend-owned provider gateway remains required",
  "Backend-owned rights review remains required",
  "Backend-owned approval capture remains required",
  "Operator review remains required",
  "Explicit operator approval remains required",
] as const;

export const VIDEO_CREATION_DOMAIN_MODEL_FIELDS = [
  "videoCreationDomainId",
  "videoCreationDomainKind",
  "videoWorkspaceIntake",
  "videoProjectBrief",
  "videoAudienceAndGoal",
  "videoFormatBoundary",
  "videoSafetyAndRightsBoundary",
  "videoAssetPlanningBoundary",
  "videoScriptPlanningBoundary",
  "videoStoryboardPlanningBoundary",
  "videoVoiceoverPlanningBoundary",
  "videoCaptionPlanningBoundary",
  "videoRenderJobBlockedBoundary",
  "videoExportBlockedBoundary",
  "deniedVideoCreationDomainBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Video Creation Domain v1 is deterministic static review content only.",
  "Video creation remains planning-only.",
  "This is not video rendering.",
  "This is not video export.",
  "This is not asset upload.",
  "This is not asset download.",
  "This is not frontend file generation.",
  "This is not frontend asset persistence.",
  "This is not frontend prompt persistence.",
  "This is not frontend job persistence.",
  "This is not frontend approval persistence.",
  "This is not a provider call.",
  "This is not a model call.",
  "This is not a connector call.",
  "This is not image generation.",
  "This is not video generation.",
  "This is not voice generation.",
  "This is not publishing.",
  "This is not social posting.",
  "This is not scheduling.",
  "This is not copyright clearance.",
  "This is not automated brand approval.",
  "This does not guarantee performance.",
  "Backend-owned asset storage remains required.",
  "Backend-owned render service remains required.",
  "Backend-owned export service remains required.",
  "Backend-owned provider gateway remains required.",
  "Backend-owned rights review remains required.",
  "Backend-owned approval capture remains required.",
  "Operator review remains required.",
  "Explicit operator approval remains required.",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic synthetic video creation planning fixtures only.",
  "The video creation domain boundary exposes review-only planning surfaces without frontend rendering, export, upload, download, provider calls, model calls, connector calls, prompt sending, asset persistence, job persistence, approval persistence, publishing, scheduling, or file mutation.",
  "Future asset storage, render service, export service, provider gateway, rights review, and approval capture behavior remains backend-owned and explicitly approved.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No video rendering, video export, asset upload, asset download, file generation, frontend file mutation, frontend asset persistence, frontend approval persistence, frontend prompt persistence, frontend job persistence, provider calls, model calls, connector calls, image generation calls, video generation calls, voice generation calls, publishing, social posting, scheduling, copyright clearance, automated brand approval, render queue dispatch, worker dispatch, artifact persistence, command execution, process spawning, port binding, package install, runtime start, credential storage, localhost probing, browser storage write, or performance guarantee from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned asset storage remains required.",
  "Backend-owned render service remains required.",
  "Backend-owned export service remains required.",
  "Backend-owned provider gateway remains required.",
  "Backend-owned rights review remains required.",
  "Backend-owned approval capture remains required.",
  "Operator review remains required.",
  "Explicit operator approval remains required.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly VideoCreationDomainItem[] {
  return [
    {
      id: prefix + "-summary",
      label: "Review summary",
      detail: summary,
      state: "review-only",
    },
    {
      id: prefix + "-blocked",
      label: "Denied path",
      detail: blocked,
      state: "blocked",
    },
    {
      id: prefix + "-approval",
      label: "Approval requirement",
      detail: approval,
      state: "needs-approval",
    },
  ];
}

function createSection({
  sectionId,
  label,
  title,
  humanReadableSummary,
  plannedInputs,
  plannedOutputs,
  checklistPrefix,
  checklistSummary,
  blocked,
  approval,
  state = "synthetic-only",
}: {
  sectionId: VideoCreationDomainSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  checklistPrefix: string;
  checklistSummary: string;
  blocked: string;
  approval: string;
  state?: VideoCreationDomainState;
}): VideoCreationDomainSection {
  return {
    sectionId,
    label,
    title,
    humanReadableSummary,
    plannedInputs,
    plannedOutputs,
    reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
    deniedActions: COMMON_DENIED_ACTIONS,
    safetyNotes: COMMON_SAFETY_NOTES,
    checklist: checklist(checklistPrefix, checklistSummary, blocked, approval),
    state,
  };
}

const VIDEO_CREATION_DOMAIN_BOUNDARY = createSection({
  sectionId: "videoCreationDomainBoundary",
  label: "Video Creation Domain Boundary",
  title: "Deterministic Video Creation Domain Boundary",
  humanReadableSummary:
    "Video creation domain boundary prepares deterministic synthetic video creation planning workflows without frontend rendering, export, provider calls, asset persistence, or publishing.",
  plannedInputs: ["Synthetic domain identity", "Synthetic safety limits", "Synthetic approval requirement", "Synthetic denied video paths"],
  plannedOutputs: ["Video Creation Domain Boundary", "Review-only video creation domain", "Denied video creation domain paths", "Explicit operator approval required"],
  checklistPrefix: "video-creation-domain-boundary",
  checklistSummary:
    "Video creation domain boundary prepares deterministic synthetic video creation planning workflows without frontend rendering export provider calls asset persistence or publishing.",
  blocked:
    "Video creation domain boundary does not render videos export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals or write files from the UI.",
  approval: "Video creation domain boundary requires explicit operator approval.",
  state: "needs-approval",
});

const VIDEO_WORKSPACE_INTAKE = createSection({
  sectionId: "videoWorkspaceIntake",
  label: "Video Workspace Intake",
  title: "Synthetic Video Workspace Intake Preview",
  humanReadableSummary:
    "Video workspace intake preview shows simulated project name, simulated channel, simulated objective, simulated audience, simulated workflow state, and denied frontend persistence.",
  plannedInputs: ["Simulated project name", "Simulated channel", "Simulated objective", "Simulated audience"],
  plannedOutputs: ["Video Workspace Intake", "Simulated workflow state", "Denied frontend persistence", "Synthetic intake rows"],
  checklistPrefix: "video-workspace-intake",
  checklistSummary:
    "Video workspace intake preview shows simulated project name simulated channel simulated objective simulated audience simulated workflow state and denied frontend persistence.",
  blocked: "Video workspace intake preview does not persist briefs upload assets call models generate scripts or create files from the UI.",
  approval: "Video workspace intake preview requires deterministic synthetic intake rows only.",
});

const VIDEO_PROJECT_BRIEF = createSection({
  sectionId: "videoProjectBrief",
  label: "Video Project Brief",
  title: "Synthetic Video Project Brief Preview",
  humanReadableSummary:
    "Video project brief preview shows simulated goal, simulated topic, simulated tone, simulated key message, simulated approval need, and denied frontend persistence.",
  plannedInputs: ["Simulated goal", "Simulated topic", "Simulated tone", "Simulated key message"],
  plannedOutputs: ["Video Project Brief", "Simulated approval need", "Denied frontend persistence", "Synthetic brief content"],
  checklistPrefix: "video-project-brief",
  checklistSummary:
    "Video project brief preview shows simulated goal simulated topic simulated tone simulated key message simulated approval need and denied frontend persistence.",
  blocked: "Video project brief preview does not generate final scripts call providers persist prompts or write documents from the UI.",
  approval: "Video project brief preview requires deterministic synthetic brief content only.",
});

const VIDEO_AUDIENCE_AND_GOAL = createSection({
  sectionId: "videoAudienceAndGoal",
  label: "Video Audience And Goal",
  title: "Synthetic Video Audience And Goal Preview",
  humanReadableSummary:
    "Video audience and goal preview shows simulated audience segment, simulated viewer goal, simulated platform fit, simulated success signal, and simulated no performance guarantee.",
  plannedInputs: ["Simulated audience segment", "Simulated viewer goal", "Simulated platform fit", "Simulated success signal"],
  plannedOutputs: ["Video Audience And Goal", "No performance guarantee", "Synthetic audience planning", "Denied analytics and publishing paths"],
  checklistPrefix: "video-audience-and-goal",
  checklistSummary:
    "Video audience and goal preview shows simulated audience segment simulated viewer goal simulated platform fit simulated success signal simulated no performance guarantee.",
  blocked: "Video audience and goal preview does not personalise ads publish content call analytics or guarantee performance from the UI.",
  approval: "Video audience and goal preview requires deterministic synthetic audience planning only.",
});

const VIDEO_FORMAT_BOUNDARY = createSection({
  sectionId: "videoFormatBoundary",
  label: "Video Format Boundary",
  title: "Backend-Owned Video Format Boundary Preview",
  humanReadableSummary:
    "Video format boundary preview shows simulated short form format, simulated long form format, simulated aspect ratio note, simulated duration target, and simulated export blocked state.",
  plannedInputs: ["Simulated short form format", "Simulated long form format", "Simulated aspect ratio note", "Simulated duration target"],
  plannedOutputs: ["Video Format Boundary", "Simulated export blocked state", "Backend-owned render service required", "Backend-owned export service required"],
  checklistPrefix: "video-format-boundary",
  checklistSummary:
    "Video format boundary preview shows simulated short form format simulated long form format simulated aspect ratio note simulated duration target simulated export blocked state.",
  blocked: "Video format boundary preview does not render files resize assets transcode video export timelines or upload media from the UI.",
  approval: "Video format boundary preview requires backend-owned render and export services.",
  state: "backend-owned",
});

const VIDEO_SAFETY_AND_RIGHTS_BOUNDARY = createSection({
  sectionId: "videoSafetyAndRightsBoundary",
  label: "Video Safety And Rights Boundary",
  title: "Backend-Owned Video Safety And Rights Boundary Preview",
  humanReadableSummary:
    "Video safety and rights boundary preview shows simulated rights checklist, simulated brand safety note, simulated music rights note, simulated source attribution note, and simulated approval requirement.",
  plannedInputs: ["Simulated rights checklist", "Simulated brand safety note", "Simulated music rights note", "Simulated source attribution note"],
  plannedOutputs: ["Video Safety And Rights Boundary", "Simulated approval requirement", "Backend-owned rights review", "Operator approval required"],
  checklistPrefix: "video-safety-and-rights",
  checklistSummary:
    "Video safety and rights boundary preview shows simulated rights checklist simulated brand safety note simulated music rights note simulated source attribution note simulated approval requirement.",
  blocked: "Video safety and rights boundary preview does not clear copyright license music approve brand use or publish content from the UI.",
  approval: "Video safety and rights boundary preview requires backend-owned rights review and operator approval.",
  state: "backend-owned",
});

const VIDEO_ASSET_PLANNING_BOUNDARY = createSection({
  sectionId: "videoAssetPlanningBoundary",
  label: "Video Asset Planning Boundary",
  title: "Backend-Owned Video Asset Planning Boundary Preview",
  humanReadableSummary:
    "Video asset planning boundary preview shows simulated shot asset, simulated logo asset, simulated b-roll asset, simulated music asset, simulated storage prerequisite, and denied frontend persistence.",
  plannedInputs: ["Simulated shot asset", "Simulated logo asset", "Simulated b-roll asset", "Simulated music asset"],
  plannedOutputs: ["Video Asset Planning Boundary", "Simulated storage prerequisite", "Denied frontend persistence", "Backend-owned asset storage required"],
  checklistPrefix: "video-asset-planning",
  checklistSummary:
    "Video asset planning boundary preview shows simulated shot asset simulated logo asset simulated b-roll asset simulated music asset simulated storage prerequisite and denied frontend persistence.",
  blocked: "Video asset planning boundary preview does not upload assets download assets store media mutate files or call asset providers from the UI.",
  approval: "Video asset planning boundary preview requires backend-owned asset storage.",
  state: "backend-owned",
});

const VIDEO_SCRIPT_PLANNING_BOUNDARY = createSection({
  sectionId: "videoScriptPlanningBoundary",
  label: "Video Script Planning Boundary",
  title: "Backend-Owned Video Script Planning Boundary Preview",
  humanReadableSummary:
    "Video script planning boundary preview shows simulated hook, simulated body beats, simulated CTA, simulated review note, and simulated no provider call state.",
  plannedInputs: ["Simulated hook", "Simulated body beats", "Simulated CTA", "Simulated review note"],
  plannedOutputs: ["Video Script Planning Boundary", "Simulated no provider call state", "Backend-owned model gateway required", "Review-only script planning"],
  checklistPrefix: "video-script-planning",
  checklistSummary:
    "Video script planning boundary preview shows simulated hook simulated body beats simulated CTA simulated review note simulated no provider call state.",
  blocked: "Video script planning boundary preview does not call models send prompts persist prompts write files or generate final copy from the UI.",
  approval: "Video script planning boundary preview requires backend-owned model gateway before generation.",
  state: "backend-owned",
});

const VIDEO_STORYBOARD_PLANNING_BOUNDARY = createSection({
  sectionId: "videoStoryboardPlanningBoundary",
  label: "Video Storyboard Planning Boundary",
  title: "Backend-Owned Video Storyboard Planning Boundary Preview",
  humanReadableSummary:
    "Video storyboard planning boundary preview shows simulated scene card, simulated visual note, simulated shot type, simulated transition note, and simulated image generation blocked state.",
  plannedInputs: ["Simulated scene card", "Simulated visual note", "Simulated shot type", "Simulated transition note"],
  plannedOutputs: ["Video Storyboard Planning Boundary", "Simulated image generation blocked state", "Backend-owned storyboard workflow", "Backend-owned asset workflow"],
  checklistPrefix: "video-storyboard-planning",
  checklistSummary:
    "Video storyboard planning boundary preview shows simulated scene card simulated visual note simulated shot type simulated transition note simulated image generation blocked state.",
  blocked: "Video storyboard planning boundary preview does not generate images call image providers write storyboards or persist assets from the UI.",
  approval: "Video storyboard planning boundary preview requires backend-owned storyboard and asset workflow.",
  state: "backend-owned",
});

const VIDEO_VOICEOVER_PLANNING_BOUNDARY = createSection({
  sectionId: "videoVoiceoverPlanningBoundary",
  label: "Video Voiceover Planning Boundary",
  title: "Backend-Owned Video Voiceover Planning Boundary Preview",
  humanReadableSummary:
    "Video voiceover planning boundary preview shows simulated voice tone, simulated read pace, simulated narration note, simulated consent note, and simulated voice generation blocked state.",
  plannedInputs: ["Simulated voice tone", "Simulated read pace", "Simulated narration note", "Simulated consent note"],
  plannedOutputs: ["Video Voiceover Planning Boundary", "Simulated voice generation blocked state", "Backend-owned voice workflow", "Operator approval required"],
  checklistPrefix: "video-voiceover-planning",
  checklistSummary:
    "Video voiceover planning boundary preview shows simulated voice tone simulated read pace simulated narration note simulated consent note simulated voice generation blocked state.",
  blocked: "Video voiceover planning boundary preview does not synthesize voice call voice providers store audio or export voice files from the UI.",
  approval: "Video voiceover planning boundary preview requires backend-owned voice workflow and approval.",
  state: "backend-owned",
});

const VIDEO_CAPTION_PLANNING_BOUNDARY = createSection({
  sectionId: "videoCaptionPlanningBoundary",
  label: "Video Caption Planning Boundary",
  title: "Backend-Owned Video Caption Planning Boundary Preview",
  humanReadableSummary:
    "Video caption planning boundary preview shows simulated caption style, simulated accessibility note, simulated subtitle target, simulated review note, and simulated export blocked state.",
  plannedInputs: ["Simulated caption style", "Simulated accessibility note", "Simulated subtitle target", "Simulated review note"],
  plannedOutputs: ["Video Caption Planning Boundary", "Simulated export blocked state", "Backend-owned caption workflow", "Review-only caption planning"],
  checklistPrefix: "video-caption-planning",
  checklistSummary:
    "Video caption planning boundary preview shows simulated caption style simulated accessibility note simulated subtitle target simulated review note simulated export blocked state.",
  blocked: "Video caption planning boundary preview does not transcribe audio burn captions export subtitles or write caption files from the UI.",
  approval: "Video caption planning boundary preview requires backend-owned caption workflow.",
  state: "backend-owned",
});

const VIDEO_RENDER_JOB_BLOCKED_BOUNDARY = createSection({
  sectionId: "videoRenderJobBlockedBoundary",
  label: "Video Render Job Blocked Boundary",
  title: "Blocked Video Render Job Boundary Preview",
  humanReadableSummary:
    "Video render job blocked boundary preview shows denied render job, denied worker dispatch, denied provider call, denied file write, denied artifact persistence, and backend prerequisite.",
  plannedInputs: ["Denied render job", "Denied worker dispatch", "Denied provider call", "Denied file write"],
  plannedOutputs: ["Video Render Job Blocked Boundary", "Denied artifact persistence", "Backend prerequisite", "Explicit operator approval required"],
  checklistPrefix: "video-render-job-blocked-boundary",
  checklistSummary:
    "Video render job blocked boundary preview shows denied render job denied worker dispatch denied provider call denied file write denied artifact persistence and backend prerequisite.",
  blocked:
    "Video render job blocked boundary preview blocks frontend render queues frontend worker dispatch frontend provider calls frontend file writes frontend export jobs and frontend artifact persistence.",
  approval:
    "Video render job blocked boundary preview requires backend-owned render service explicit operator approval and artifact storage.",
  state: "blocked",
});

const VIDEO_EXPORT_BLOCKED_BOUNDARY = createSection({
  sectionId: "videoExportBlockedBoundary",
  label: "Video Export Blocked Boundary",
  title: "Blocked Video Export Boundary Preview",
  humanReadableSummary:
    "Video export blocked boundary preview shows denied export, denied download, denied upload, denied publish, denied schedule, and approval requirement.",
  plannedInputs: ["Denied export", "Denied download", "Denied upload", "Denied publish"],
  plannedOutputs: ["Video Export Blocked Boundary", "Denied schedule", "Approval requirement", "Backend-owned export service required"],
  checklistPrefix: "video-export-blocked-boundary",
  checklistSummary:
    "Video export blocked boundary preview shows denied export denied download denied upload denied publish denied schedule and approval requirement.",
  blocked:
    "Video export blocked boundary preview blocks frontend download frontend export frontend upload frontend social posting frontend scheduling and frontend publishing.",
  approval:
    "Video export blocked boundary preview requires backend-owned export service rights review approval capture and operator approval.",
  state: "blocked",
});

const DENIED_VIDEO_CREATION_DOMAIN_BOUNDARIES = createSection({
  sectionId: "deniedVideoCreationDomainBoundaries",
  label: "Denied Video Creation Domain Boundaries",
  title: "Denied Video Creation Domain Paths",
  humanReadableSummary:
    "Denied video creation domain paths remain blocked for frontend rendering, export, upload, download, file generation, provider calls, model calls, connector calls, prompt sending, generation calls, publishing, scheduling, persistence, queues, workers, artifacts, commands, and performance guarantees.",
  plannedInputs: ["Denied rendering path", "Denied export path", "Denied provider path", "Denied persistence path"],
  plannedOutputs: ["Denied video creation domain paths", "No hidden execution affordances", "Backend-owned services required", "Explicit operator approval required"],
  checklistPrefix: "denied-video-creation-domain",
  checklistSummary: "Denied video creation domain paths remain blocked.",
  blocked:
    "Denied video creation domain paths remain blocked and do not allow frontend rendering export upload download file generation provider calls model calls connector calls prompt sending generation calls publishing scheduling persistence queues workers artifacts commands or performance guarantees.",
  approval:
    "Denied video creation domain paths require explicit operator approval and backend-owned services before any future capability can exist.",
  state: "blocked",
});

const COCKPIT_SUMMARY = [
  {
    id: "video-domain-status",
    label: "Video creation domain status",
    detail:
      "Video Creation Domain remains review-only, planning-only, synthetic-only, and blocked from frontend rendering, export, upload, download, file generation, provider calls, model calls, connector calls, prompt persistence, job persistence, approval persistence, publishing, and scheduling.",
    state: "review-only",
  },
  {
    id: "planning-surfaces",
    label: "Planning surfaces only",
    detail:
      "Workspace intake, project brief, audience and goal, format boundary, safety and rights, asset planning, script planning, storyboard planning, voiceover planning, caption planning, render job blocked, and export blocked surfaces are deterministic synthetic previews.",
    state: "synthetic-only",
  },
  {
    id: "backend-prerequisites",
    label: "Backend prerequisites remain required",
    detail:
      "Asset storage, render service, export service, provider gateway, rights review, and approval capture remain backend-owned requirements before any future generation-capable workflow can exist.",
    state: "backend-owned",
  },
  {
    id: "blocked-render-export",
    label: "Render and export blocked",
    detail:
      "No render buttons, export buttons, upload controls, download controls, provider controls, model controls, connector controls, publishing controls, scheduling controls, worker dispatch controls, or artifact persistence controls are exposed.",
    state: "blocked",
  },
  {
    id: "explicit-operator-approval",
    label: "Explicit operator approval",
    detail:
      "Operator review and explicit operator approval remain required before any future backend-owned asset, render, export, provider, rights, or approval workflow can exist.",
    state: "needs-approval",
  },
] as const satisfies readonly VideoCreationDomainItem[];

export const VIDEO_CREATION_DOMAIN_MODEL: VideoCreationDomainModel = {
  videoCreationDomainId: "video-creation-domain-v1",
  videoCreationDomainKind: "video-creation-domain-v1",
  videoWorkspaceIntake: VIDEO_WORKSPACE_INTAKE,
  videoProjectBrief: VIDEO_PROJECT_BRIEF,
  videoAudienceAndGoal: VIDEO_AUDIENCE_AND_GOAL,
  videoFormatBoundary: VIDEO_FORMAT_BOUNDARY,
  videoSafetyAndRightsBoundary: VIDEO_SAFETY_AND_RIGHTS_BOUNDARY,
  videoAssetPlanningBoundary: VIDEO_ASSET_PLANNING_BOUNDARY,
  videoScriptPlanningBoundary: VIDEO_SCRIPT_PLANNING_BOUNDARY,
  videoStoryboardPlanningBoundary: VIDEO_STORYBOARD_PLANNING_BOUNDARY,
  videoVoiceoverPlanningBoundary: VIDEO_VOICEOVER_PLANNING_BOUNDARY,
  videoCaptionPlanningBoundary: VIDEO_CAPTION_PLANNING_BOUNDARY,
  videoRenderJobBlockedBoundary: VIDEO_RENDER_JOB_BLOCKED_BOUNDARY,
  videoExportBlockedBoundary: VIDEO_EXPORT_BLOCKED_BOUNDARY,
  deniedVideoCreationDomainBoundaries: DENIED_VIDEO_CREATION_DOMAIN_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const SECTION_LOOKUP: Record<VideoCreationDomainSectionId, VideoCreationDomainSection> = {
  videoCreationDomainBoundary: VIDEO_CREATION_DOMAIN_BOUNDARY,
  videoWorkspaceIntake: VIDEO_WORKSPACE_INTAKE,
  videoProjectBrief: VIDEO_PROJECT_BRIEF,
  videoAudienceAndGoal: VIDEO_AUDIENCE_AND_GOAL,
  videoFormatBoundary: VIDEO_FORMAT_BOUNDARY,
  videoSafetyAndRightsBoundary: VIDEO_SAFETY_AND_RIGHTS_BOUNDARY,
  videoAssetPlanningBoundary: VIDEO_ASSET_PLANNING_BOUNDARY,
  videoScriptPlanningBoundary: VIDEO_SCRIPT_PLANNING_BOUNDARY,
  videoStoryboardPlanningBoundary: VIDEO_STORYBOARD_PLANNING_BOUNDARY,
  videoVoiceoverPlanningBoundary: VIDEO_VOICEOVER_PLANNING_BOUNDARY,
  videoCaptionPlanningBoundary: VIDEO_CAPTION_PLANNING_BOUNDARY,
  videoRenderJobBlockedBoundary: VIDEO_RENDER_JOB_BLOCKED_BOUNDARY,
  videoExportBlockedBoundary: VIDEO_EXPORT_BLOCKED_BOUNDARY,
  deniedVideoCreationDomainBoundaries: DENIED_VIDEO_CREATION_DOMAIN_BOUNDARIES,
};

const ALL_SECTION_IDS: readonly VideoCreationDomainSectionId[] = [
  "videoCreationDomainBoundary",
  "videoWorkspaceIntake",
  "videoProjectBrief",
  "videoAudienceAndGoal",
  "videoFormatBoundary",
  "videoSafetyAndRightsBoundary",
  "videoAssetPlanningBoundary",
  "videoScriptPlanningBoundary",
  "videoStoryboardPlanningBoundary",
  "videoVoiceoverPlanningBoundary",
  "videoCaptionPlanningBoundary",
  "videoRenderJobBlockedBoundary",
  "videoExportBlockedBoundary",
  "deniedVideoCreationDomainBoundaries",
] as const;

const ROUTES: readonly VideoCreationDomainRouteDefinition[] = [
  {
    slug: "video-creation-domain-boundary",
    href: "/video-creation-domain-boundary",
    phase: "Phase 1914",
    title: "Video Creation Domain Boundary",
    commandLabel: "Go to Video Creation Domain Boundary",
    summary:
      "Previews a review-only video creation domain boundary without frontend rendering, export, upload, download, provider calls, model calls, connector calls, prompt persistence, job persistence, approval persistence, publishing, scheduling, or file mutation.",
    markerPhrases: [
      "Video creation domain boundary",
      "Video creation domain boundary does not render videos export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals or write files from the UI",
      "Video creation domain boundary requires explicit operator approval",
      "Video creation domain boundary prepares deterministic synthetic video creation planning workflows without frontend rendering export provider calls asset persistence or publishing",
      "Denied video creation domain paths remain blocked",
      "Video creation domain boundary checklist",
    ],
    sectionIds: ["videoCreationDomainBoundary", "deniedVideoCreationDomainBoundaries"],
    devOnly: true,
  },
  {
    slug: "video-workspace-intake-preview",
    href: "/video-workspace-intake-preview",
    phase: "Phase 1915",
    title: "Video Workspace Intake Preview",
    commandLabel: "Go to Video Workspace Intake Preview",
    summary:
      "Previews deterministic synthetic video workspace intake rows without brief persistence, asset upload, model calls, script generation, or file creation.",
    markerPhrases: [
      "Video workspace intake preview",
      "Video workspace intake preview does not persist briefs upload assets call models generate scripts or create files from the UI",
      "Video workspace intake preview requires deterministic synthetic intake rows only",
      "Video workspace intake preview shows simulated project name simulated channel simulated objective simulated audience simulated workflow state and denied frontend persistence",
      "Denied video workspace intake paths remain blocked",
      "Video workspace intake checklist",
    ],
    sectionIds: ["videoWorkspaceIntake", "deniedVideoCreationDomainBoundaries"],
    devOnly: true,
  },
  {
    slug: "video-project-brief-preview",
    href: "/video-project-brief-preview",
    phase: "Phase 1916",
    title: "Video Project Brief Preview",
    commandLabel: "Go to Video Project Brief Preview",
    summary:
      "Previews deterministic synthetic video project brief content without final script generation, provider calls, prompt persistence, or document writes.",
    markerPhrases: [
      "Video project brief preview",
      "Video project brief preview does not generate final scripts call providers persist prompts or write documents from the UI",
      "Video project brief preview requires deterministic synthetic brief content only",
      "Video project brief preview shows simulated goal simulated topic simulated tone simulated key message simulated approval need and denied frontend persistence",
      "Denied video project brief paths remain blocked",
      "Video project brief checklist",
    ],
    sectionIds: ["videoProjectBrief", "videoWorkspaceIntake", "deniedVideoCreationDomainBoundaries"],
    devOnly: true,
  },
  {
    slug: "video-audience-and-goal-preview",
    href: "/video-audience-and-goal-preview",
    phase: "Phase 1917",
    title: "Video Audience And Goal Preview",
    commandLabel: "Go to Video Audience And Goal Preview",
    summary:
      "Previews deterministic synthetic audience and goal planning without ad personalisation, publishing, analytics calls, or performance guarantees.",
    markerPhrases: [
      "Video audience and goal preview",
      "Video audience and goal preview does not personalise ads publish content call analytics or guarantee performance from the UI",
      "Video audience and goal preview requires deterministic synthetic audience planning only",
      "Video audience and goal preview shows simulated audience segment simulated viewer goal simulated platform fit simulated success signal simulated no performance guarantee",
      "Denied video audience and goal paths remain blocked",
      "Video audience and goal checklist",
    ],
    sectionIds: ["videoAudienceAndGoal", "videoProjectBrief", "deniedVideoCreationDomainBoundaries"],
    devOnly: true,
  },
  {
    slug: "video-format-boundary-preview",
    href: "/video-format-boundary-preview",
    phase: "Phase 1918",
    title: "Video Format Boundary Preview",
    commandLabel: "Go to Video Format Boundary Preview",
    summary:
      "Previews backend-owned video format boundaries without file rendering, asset resizing, transcoding, timeline export, or media upload.",
    markerPhrases: [
      "Video format boundary preview",
      "Video format boundary preview does not render files resize assets transcode video export timelines or upload media from the UI",
      "Video format boundary preview requires backend-owned render and export services",
      "Video format boundary preview shows simulated short form format simulated long form format simulated aspect ratio note simulated duration target simulated export blocked state",
      "Denied video format boundary paths remain blocked",
      "Video format boundary checklist",
    ],
    sectionIds: ["videoFormatBoundary", "videoAudienceAndGoal", "deniedVideoCreationDomainBoundaries"],
    devOnly: true,
  },
  {
    slug: "video-safety-and-rights-boundary-preview",
    href: "/video-safety-and-rights-boundary-preview",
    phase: "Phase 1919",
    title: "Video Safety And Rights Boundary Preview",
    commandLabel: "Go to Video Safety And Rights Boundary Preview",
    summary:
      "Previews backend-owned video safety and rights review without copyright clearance, music licensing, brand approval, or publishing.",
    markerPhrases: [
      "Video safety and rights boundary preview",
      "Video safety and rights boundary preview does not clear copyright license music approve brand use or publish content from the UI",
      "Video safety and rights boundary preview requires backend-owned rights review and operator approval",
      "Video safety and rights boundary preview shows simulated rights checklist simulated brand safety note simulated music rights note simulated source attribution note simulated approval requirement",
      "Denied video safety and rights paths remain blocked",
      "Video safety and rights checklist",
    ],
    sectionIds: ["videoSafetyAndRightsBoundary", "videoFormatBoundary", "deniedVideoCreationDomainBoundaries"],
    devOnly: true,
  },
  {
    slug: "video-asset-planning-boundary-preview",
    href: "/video-asset-planning-boundary-preview",
    phase: "Phase 1920",
    title: "Video Asset Planning Boundary Preview",
    commandLabel: "Go to Video Asset Planning Boundary Preview",
    summary:
      "Previews backend-owned video asset planning without asset upload, asset download, media storage, file mutation, or asset provider calls.",
    markerPhrases: [
      "Video asset planning boundary preview",
      "Video asset planning boundary preview does not upload assets download assets store media mutate files or call asset providers from the UI",
      "Video asset planning boundary preview requires backend-owned asset storage",
      "Video asset planning boundary preview shows simulated shot asset simulated logo asset simulated b-roll asset simulated music asset simulated storage prerequisite and denied frontend persistence",
      "Denied video asset planning paths remain blocked",
      "Video asset planning checklist",
    ],
    sectionIds: ["videoAssetPlanningBoundary", "videoSafetyAndRightsBoundary", "deniedVideoCreationDomainBoundaries"],
    devOnly: true,
  },
  {
    slug: "video-script-planning-boundary-preview",
    href: "/video-script-planning-boundary-preview",
    phase: "Phase 1921",
    title: "Video Script Planning Boundary Preview",
    commandLabel: "Go to Video Script Planning Boundary Preview",
    summary:
      "Previews backend-owned video script planning without model calls, prompt sending, prompt persistence, file writes, or final copy generation.",
    markerPhrases: [
      "Video script planning boundary preview",
      "Video script planning boundary preview does not call models send prompts persist prompts write files or generate final copy from the UI",
      "Video script planning boundary preview requires backend-owned model gateway before generation",
      "Video script planning boundary preview shows simulated hook simulated body beats simulated CTA simulated review note simulated no provider call state",
      "Denied video script planning paths remain blocked",
      "Video script planning checklist",
    ],
    sectionIds: ["videoScriptPlanningBoundary", "videoAssetPlanningBoundary", "deniedVideoCreationDomainBoundaries"],
    devOnly: true,
  },
  {
    slug: "video-storyboard-planning-boundary-preview",
    href: "/video-storyboard-planning-boundary-preview",
    phase: "Phase 1922",
    title: "Video Storyboard Planning Boundary Preview",
    commandLabel: "Go to Video Storyboard Planning Boundary Preview",
    summary:
      "Previews backend-owned video storyboard planning without image generation, image provider calls, storyboard writes, or asset persistence.",
    markerPhrases: [
      "Video storyboard planning boundary preview",
      "Video storyboard planning boundary preview does not generate images call image providers write storyboards or persist assets from the UI",
      "Video storyboard planning boundary preview requires backend-owned storyboard and asset workflow",
      "Video storyboard planning boundary preview shows simulated scene card simulated visual note simulated shot type simulated transition note simulated image generation blocked state",
      "Denied video storyboard planning paths remain blocked",
      "Video storyboard planning checklist",
    ],
    sectionIds: ["videoStoryboardPlanningBoundary", "videoScriptPlanningBoundary", "deniedVideoCreationDomainBoundaries"],
    devOnly: true,
  },
  {
    slug: "video-voiceover-planning-boundary-preview",
    href: "/video-voiceover-planning-boundary-preview",
    phase: "Phase 1923",
    title: "Video Voiceover Planning Boundary Preview",
    commandLabel: "Go to Video Voiceover Planning Boundary Preview",
    summary:
      "Previews backend-owned video voiceover planning without voice synthesis, voice provider calls, audio storage, or voice file export.",
    markerPhrases: [
      "Video voiceover planning boundary preview",
      "Video voiceover planning boundary preview does not synthesize voice call voice providers store audio or export voice files from the UI",
      "Video voiceover planning boundary preview requires backend-owned voice workflow and approval",
      "Video voiceover planning boundary preview shows simulated voice tone simulated read pace simulated narration note simulated consent note simulated voice generation blocked state",
      "Denied video voiceover planning paths remain blocked",
      "Video voiceover planning checklist",
    ],
    sectionIds: ["videoVoiceoverPlanningBoundary", "videoStoryboardPlanningBoundary", "deniedVideoCreationDomainBoundaries"],
    devOnly: true,
  },
  {
    slug: "video-caption-planning-boundary-preview",
    href: "/video-caption-planning-boundary-preview",
    phase: "Phase 1924",
    title: "Video Caption Planning Boundary Preview",
    commandLabel: "Go to Video Caption Planning Boundary Preview",
    summary:
      "Previews backend-owned video caption planning without transcription, caption burn-in, subtitle export, or caption file writes.",
    markerPhrases: [
      "Video caption planning boundary preview",
      "Video caption planning boundary preview does not transcribe audio burn captions export subtitles or write caption files from the UI",
      "Video caption planning boundary preview requires backend-owned caption workflow",
      "Video caption planning boundary preview shows simulated caption style simulated accessibility note simulated subtitle target simulated review note simulated export blocked state",
      "Denied video caption planning paths remain blocked",
      "Video caption planning checklist",
    ],
    sectionIds: ["videoCaptionPlanningBoundary", "videoVoiceoverPlanningBoundary", "deniedVideoCreationDomainBoundaries"],
    devOnly: true,
  },
  {
    slug: "video-render-job-blocked-boundary-preview",
    href: "/video-render-job-blocked-boundary-preview",
    phase: "Phase 1925",
    title: "Video Render Job Blocked Boundary Preview",
    commandLabel: "Go to Video Render Job Blocked Boundary Preview",
    summary:
      "Previews blocked video render job boundaries without frontend render queues, worker dispatch, provider calls, file writes, export jobs, or artifact persistence.",
    markerPhrases: [
      "Video render job blocked boundary preview",
      "Video render job blocked boundary preview blocks frontend render queues frontend worker dispatch frontend provider calls frontend file writes frontend export jobs and frontend artifact persistence",
      "Video render job blocked boundary preview requires backend-owned render service explicit operator approval and artifact storage",
      "Video render job blocked boundary preview shows denied render job denied worker dispatch denied provider call denied file write denied artifact persistence and backend prerequisite",
      "Denied video render job paths remain blocked",
      "Video render job blocked boundary checklist",
    ],
    sectionIds: ["videoRenderJobBlockedBoundary", "videoCaptionPlanningBoundary", "deniedVideoCreationDomainBoundaries"],
    devOnly: true,
  },
  {
    slug: "video-export-blocked-boundary-preview",
    href: "/video-export-blocked-boundary-preview",
    phase: "Phase 1926",
    title: "Video Export Blocked Boundary Preview",
    commandLabel: "Go to Video Export Blocked Boundary Preview",
    summary:
      "Previews blocked video export boundaries without frontend downloads, exports, uploads, social posting, scheduling, or publishing.",
    markerPhrases: [
      "Video export blocked boundary preview",
      "Video export blocked boundary preview blocks frontend download frontend export frontend upload frontend social posting frontend scheduling and frontend publishing",
      "Video export blocked boundary preview requires backend-owned export service rights review approval capture and operator approval",
      "Video export blocked boundary preview shows denied export denied download denied upload denied publish denied schedule and approval requirement",
      "Denied video export paths remain blocked",
      "Video export blocked boundary checklist",
    ],
    sectionIds: ["videoExportBlockedBoundary", "videoRenderJobBlockedBoundary", "deniedVideoCreationDomainBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-video-creation-domain-summary",
    href: "/cockpit-video-creation-domain-summary",
    phase: "Phase 1927",
    title: "Cockpit Video Creation Domain Summary",
    commandLabel: "Go to Cockpit Video Creation Domain Summary",
    summary:
      "Summarizes the review-only video creation domain as a planning-only Creative Workspace lane in the normal cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: [
      "Cockpit video creation domain summary",
      "Cockpit video creation domain summary keeps the cockpit as the normal user surface",
      "Cockpit video creation domain summary does not render videos export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals or write files from the cockpit",
      "Cockpit video creation domain summary shows workspace intake project brief audience and goal format boundary safety and rights asset planning script planning storyboard planning voiceover planning caption planning render job blocked export blocked and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit video creation domain checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-video-creation-domain-boundary-candidate",
    href: "/first-video-creation-domain-boundary-candidate",
    phase: "Phase 1928",
    title: "First Video Creation Domain Boundary Candidate",
    commandLabel: "Go to First Video Creation Domain Boundary Candidate",
    summary:
      "Combines the first video creation domain boundary candidate without frontend rendering, export, upload, download, provider calls, model calls, connector calls, generation calls, publishing, scheduling, persistence, or file writes.",
    markerPhrases: [
      "First video creation domain boundary candidate",
      "First video creation domain boundary candidate does not enable rendering export upload download provider calls model calls connector calls image generation video generation voice generation publishing scheduling file writes asset persistence prompt persistence job persistence or approval persistence from the UI",
      "First video creation domain boundary candidate requires explicit operator approval",
      "Candidate combines workspace intake project brief audience and goal format boundary safety and rights asset planning script planning storyboard planning voiceover planning caption planning render job blocked export blocked cockpit summary and denied paths",
      "Denied first video creation domain paths remain blocked",
      "First video creation domain boundary checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-video-creation-domain-boundary-release-candidate",
    href: "/controlled-video-creation-domain-boundary-release-candidate",
    phase: "Phase 1929",
    title: "Controlled Video Creation Domain Boundary Release Candidate",
    commandLabel: "Go to Controlled Video Creation Domain Boundary Release Candidate",
    summary:
      "Release candidate starts the Video Creation Domain Pack as a review-only planning workspace without frontend rendering, export, provider calls, model calls, asset persistence, prompt persistence, job persistence, approval persistence, publishing, scheduling, or file mutation.",
    markerPhrases: [
      "Controlled video creation domain boundary release candidate",
      "Controlled video creation domain boundary release candidate does not render videos export files upload assets download assets call providers call models call connectors generate images generate videos generate voice synthesize audio publish posts schedule content write files persist assets persist prompts persist jobs persist approvals dispatch workers create queues create artifacts run commands spawn processes bind ports install packages deploy runtimes start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend",
      "Controlled video creation domain boundary release requires explicit operator approval",
      "Release candidate starts the Video Creation Domain Pack as a review-only planning workspace without frontend rendering export provider calls model calls asset persistence prompt persistence job persistence approval persistence publishing scheduling or file mutation",
      "Denied controlled video creation domain paths remain blocked",
      "Controlled video creation domain boundary checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

const ROUTE_LOOKUP: Record<VideoCreationDomainRouteSlug, VideoCreationDomainRouteDefinition> = ROUTES.reduce(
  (accumulator, route) => {
    accumulator[route.slug] = route;
    return accumulator;
  },
  {} as Record<VideoCreationDomainRouteSlug, VideoCreationDomainRouteDefinition>
);

export function buildVideoCreationDomainStableKey(parts: readonly string[]): string {
  return parts
    .map((part) =>
      part
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .join("--");
}

export function listVideoCreationDomainRoutes(): readonly VideoCreationDomainRouteDefinition[] {
  return ROUTES;
}

export function buildVideoCreationDomainRouteModel(
  slug: VideoCreationDomainRouteSlug = "controlled-video-creation-domain-boundary-release-candidate"
): VideoCreationDomainRouteModel {
  const route = ROUTE_LOOKUP[slug];
  const sections = route.sectionIds.map((sectionId) => SECTION_LOOKUP[sectionId]);

  return {
    route,
    videoCreationDomain: VIDEO_CREATION_DOMAIN_MODEL,
    sections,
    diagnosticRoutes: ROUTES,
    cockpitMarkers: VIDEO_CREATION_DOMAIN_COCKPIT_MARKERS,
    summary: route.summary,
  };
}
