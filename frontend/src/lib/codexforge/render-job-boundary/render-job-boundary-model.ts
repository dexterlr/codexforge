export type RenderJobBoundaryRouteSlug =
  | "render-job-boundary"
  | "render-prerequisite-checklist-preview"
  | "timeline-readiness-packet-preview"
  | "asset-readiness-gate-preview"
  | "caption-readiness-gate-preview"
  | "audio-readiness-gate-preview"
  | "rights-approval-gate-preview"
  | "render-settings-planning-preview"
  | "render-queue-blocked-preview"
  | "worker-dispatch-blocked-preview"
  | "artifact-persistence-blocked-preview"
  | "render-failure-review-preview"
  | "export-handoff-blocked-preview"
  | "cockpit-render-job-boundary-summary"
  | "first-render-job-boundary-candidate"
  | "controlled-render-job-boundary-release-candidate";

export type RenderJobBoundaryKind = "render-job-boundary-v1" | RenderJobBoundaryRouteSlug;

export type RenderJobBoundaryState =
  | "review-only"
  | "synthetic-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type RenderJobBoundaryItem = {
  id: string;
  label: string;
  detail: string;
  state: RenderJobBoundaryState;
};

export type RenderJobBoundarySectionId =
  | "renderJobBoundary"
  | "renderPrerequisiteChecklist"
  | "timelineReadinessPacket"
  | "assetReadinessGate"
  | "captionReadinessGate"
  | "audioReadinessGate"
  | "rightsApprovalGate"
  | "renderSettingsPlanning"
  | "renderQueueBlocked"
  | "workerDispatchBlocked"
  | "artifactPersistenceBlocked"
  | "renderFailureReview"
  | "exportHandoffBlocked"
  | "deniedRenderJobBoundaries";

export type RenderJobBoundarySection = {
  sectionId: RenderJobBoundarySectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly RenderJobBoundaryItem[];
  state: RenderJobBoundaryState;
};

export type RenderJobBoundaryModel = {
  renderJobBoundaryId: string;
  renderJobBoundaryKind: RenderJobBoundaryKind;
  renderPrerequisiteChecklist: RenderJobBoundarySection;
  timelineReadinessPacket: RenderJobBoundarySection;
  assetReadinessGate: RenderJobBoundarySection;
  captionReadinessGate: RenderJobBoundarySection;
  audioReadinessGate: RenderJobBoundarySection;
  rightsApprovalGate: RenderJobBoundarySection;
  renderSettingsPlanning: RenderJobBoundarySection;
  renderQueueBlocked: RenderJobBoundarySection;
  workerDispatchBlocked: RenderJobBoundarySection;
  artifactPersistenceBlocked: RenderJobBoundarySection;
  renderFailureReview: RenderJobBoundarySection;
  exportHandoffBlocked: RenderJobBoundarySection;
  deniedRenderJobBoundaries: RenderJobBoundarySection;
  cockpitSummary: readonly RenderJobBoundaryItem[];
  explicitSafetyLimits: readonly string[];
};

export type RenderJobBoundaryRouteDefinition = {
  slug: RenderJobBoundaryRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly RenderJobBoundarySectionId[];
  devOnly: boolean;
};

export type RenderJobBoundaryRouteModel = {
  route: RenderJobBoundaryRouteDefinition;
  renderJobBoundary: RenderJobBoundaryModel;
  sections: readonly RenderJobBoundarySection[];
  diagnosticRoutes: readonly RenderJobBoundaryRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const RENDER_JOB_BOUNDARY_COCKPIT_MARKERS = [
  "Render Job Boundary",
  "Render Prerequisite Checklist",
  "Timeline Readiness Packet",
  "Asset Readiness Gate",
  "Caption Readiness Gate",
  "Audio Readiness Gate",
  "Rights Approval Gate",
  "Render Settings Planning",
  "Render Queue Blocked",
  "Worker Dispatch Blocked",
  "Artifact Persistence Blocked",
  "Render Failure Review",
  "Export Handoff Blocked",
  "Review-only render job boundary",
  "Synthetic data only",
  "No video rendering from the cockpit",
  "No render queue creation from the cockpit",
  "No worker dispatch from the cockpit",
  "No artifact creation from the cockpit",
  "No artifact persistence from the cockpit",
  "No timeline rendering from the cockpit",
  "No video export from the cockpit",
  "No file generation from the cockpit",
  "No frontend file mutation",
  "No frontend render job persistence",
  "No frontend queue persistence",
  "No frontend worker dispatch",
  "No frontend artifact persistence",
  "No frontend asset persistence",
  "No frontend audio persistence",
  "No frontend caption persistence",
  "No frontend transcript persistence",
  "No frontend rights persistence",
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
  "No consent clearance from the cockpit",
  "No automated brand approval from the cockpit",
  "No performance guarantees",
  "Backend-owned asset storage remains required",
  "Backend-owned audio storage remains required",
  "Backend-owned render service remains required",
  "Backend-owned export service remains required",
  "Backend-owned provider gateway remains required",
  "Backend-owned rights review remains required",
  "Backend-owned consent review remains required",
  "Backend-owned approval capture remains required",
  "Backend-owned script persistence remains required",
  "Backend-owned storyboard persistence remains required",
  "Backend-owned caption persistence remains required",
  "Backend-owned render queue remains required",
  "Backend-owned worker orchestration remains required",
  "Backend-owned artifact storage remains required",
  "Operator review remains required",
  "Explicit operator approval remains required",
] as const;

export const RENDER_JOB_BOUNDARY_MODEL_FIELDS = [
  "renderJobBoundaryId",
  "renderJobBoundaryKind",
  "renderPrerequisiteChecklist",
  "timelineReadinessPacket",
  "assetReadinessGate",
  "captionReadinessGate",
  "audioReadinessGate",
  "rightsApprovalGate",
  "renderSettingsPlanning",
  "renderQueueBlocked",
  "workerDispatchBlocked",
  "artifactPersistenceBlocked",
  "renderFailureReview",
  "exportHandoffBlocked",
  "deniedRenderJobBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Render Job Boundary v1 is deterministic static review content only.",
  "This is not video rendering.",
  "This is not render queue creation.",
  "This is not worker dispatch.",
  "This is not artifact creation.",
  "This is not timeline rendering.",
  "This is not provider, model, or connector execution.",
  "This is not prompt sending to external models.",
  "This is not video export.",
  "This is not file generation from the frontend.",
  "This is not publishing.",
  "This is not scheduling.",
  "This is not copyright or consent clearance.",
  "This is not automated brand approval.",
  "This does not guarantee performance.",
  "Backend-owned asset storage remains required.",
  "Backend-owned audio storage remains required.",
  "Backend-owned render service remains required.",
  "Backend-owned export service remains required.",
  "Backend-owned provider gateway remains required.",
  "Backend-owned rights review remains required.",
  "Backend-owned consent review remains required.",
  "Backend-owned approval capture remains required.",
  "Backend-owned script persistence remains required.",
  "Backend-owned storyboard persistence remains required.",
  "Backend-owned caption persistence remains required.",
  "Backend-owned render queue remains required.",
  "Backend-owned worker orchestration remains required.",
  "Backend-owned artifact storage remains required.",
  "Operator review remains required.",
  "Explicit operator approval remains required.",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic synthetic render job boundary fixtures only.",
  "The render job boundary exposes review-only planning surfaces without frontend rendering, queue creation, worker dispatch, artifact creation, artifact persistence, export, provider calls, model calls, connector calls, prompt sending, persistence, publishing, scheduling, upload, download, or file mutation.",
  "Future asset storage, audio storage, render service, export service, provider gateway, rights review, consent review, approval capture, script persistence, storyboard persistence, caption persistence, render queue, worker orchestration, and artifact storage remain backend-owned and explicitly approved.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No video rendering, render queue creation, worker dispatch, artifact creation, artifact persistence, timeline rendering, video export, file generation, frontend file mutation, frontend render job persistence, frontend queue persistence, frontend worker dispatch, frontend artifact persistence, frontend asset persistence, frontend audio persistence, frontend caption persistence, frontend transcript persistence, frontend rights persistence, frontend approval persistence, frontend prompt persistence, frontend job persistence, provider calls, model calls, connector calls, image generation calls, video generation calls, voice generation calls, publishing, social posting, scheduling, copyright clearance, consent clearance, automated brand approval, media storage, command execution, process spawning, port binding, package install, runtime start, credential storage, localhost probing, browser storage write, or performance guarantee from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned asset storage remains required.",
  "Backend-owned audio storage remains required.",
  "Backend-owned render service remains required.",
  "Backend-owned export service remains required.",
  "Backend-owned provider gateway remains required.",
  "Backend-owned rights review remains required.",
  "Backend-owned consent review remains required.",
  "Backend-owned approval capture remains required.",
  "Backend-owned script persistence remains required.",
  "Backend-owned storyboard persistence remains required.",
  "Backend-owned caption persistence remains required.",
  "Backend-owned render queue remains required.",
  "Backend-owned worker orchestration remains required.",
  "Backend-owned artifact storage remains required.",
  "Operator review remains required.",
  "Explicit operator approval remains required.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly RenderJobBoundaryItem[] {
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
  sectionId: RenderJobBoundarySectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  checklistPrefix: string;
  checklistSummary: string;
  blocked: string;
  approval: string;
  state?: RenderJobBoundaryState;
}): RenderJobBoundarySection {
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

const RENDER_JOB_BOUNDARY = createSection({
  sectionId: "renderJobBoundary",
  label: "Render Job Boundary",
  title: "Deterministic Render Job Boundary",
  humanReadableSummary:
    "Render job boundary prepares deterministic synthetic render readiness workflows without frontend rendering, queue creation, worker dispatch, artifact persistence, provider calls, export, or publishing.",
  plannedInputs: ["Synthetic workspace identity", "Synthetic safety limits", "Synthetic approval requirement", "Synthetic denied render job paths"],
  plannedOutputs: ["Render Job Boundary", "Review-only render job boundary", "Denied render job paths", "Explicit operator approval required"],
  checklistPrefix: "render-job-boundary",
  checklistSummary:
    "Render job boundary prepares deterministic synthetic render readiness workflows without frontend rendering queue creation worker dispatch artifact persistence provider calls export or publishing.",
  blocked:
    "Render job boundary does not render videos create render queues dispatch workers create artifacts export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist render jobs persist queues persist artifacts persist captions persist transcripts persist audio persist rights or write files from the UI.",
  approval: "Render job boundary requires explicit operator approval.",
  state: "needs-approval",
});

const RENDER_PREREQUISITE_CHECKLIST = createSection({
  sectionId: "renderPrerequisiteChecklist",
  label: "Render Prerequisite Checklist",
  title: "Synthetic Render Prerequisite Checklist Preview",
  humanReadableSummary:
    "Render prerequisite checklist preview shows simulated script ready, simulated storyboard ready, simulated asset ready, simulated caption ready, simulated rights ready, and simulated backend render service required.",
  plannedInputs: ["Simulated script ready", "Simulated storyboard ready", "Simulated asset ready", "Simulated caption ready"],
  plannedOutputs: ["Render Prerequisite Checklist", "Synthetic prerequisite rows", "Backend render service requirement", "Denied job creation path"],
  checklistPrefix: "render-prerequisite-checklist",
  checklistSummary:
    "Render prerequisite checklist preview shows simulated script ready simulated storyboard ready simulated asset ready simulated caption ready simulated rights ready simulated backend render service required.",
  blocked:
    "Render prerequisite checklist preview does not create render jobs dispatch workers persist approvals or export files from the UI.",
  approval: "Render prerequisite checklist preview requires deterministic synthetic prerequisite rows only.",
});

const TIMELINE_READINESS_PACKET = createSection({
  sectionId: "timelineReadinessPacket",
  label: "Timeline Readiness Packet",
  title: "Backend-Owned Timeline Readiness Packet Preview",
  humanReadableSummary:
    "Timeline readiness packet preview shows simulated scene order, simulated duration target, simulated overlay note, simulated audio sync note, and simulated render blocked state.",
  plannedInputs: ["Simulated scene order", "Simulated duration target", "Simulated overlay note", "Simulated audio sync note"],
  plannedOutputs: ["Timeline Readiness Packet", "Render blocked state", "Backend-owned timeline workflow", "Backend-owned render workflow"],
  checklistPrefix: "timeline-readiness-packet",
  checklistSummary:
    "Timeline readiness packet preview shows simulated scene order simulated duration target simulated overlay note simulated audio sync note simulated render blocked state.",
  blocked:
    "Timeline readiness packet preview does not render timelines write files persist timelines or create artifacts from the UI.",
  approval: "Timeline readiness packet preview requires backend-owned timeline and render workflow.",
  state: "backend-owned",
});

const ASSET_READINESS_GATE = createSection({
  sectionId: "assetReadinessGate",
  label: "Asset Readiness Gate",
  title: "Backend-Owned Asset Readiness Gate Preview",
  humanReadableSummary:
    "Asset readiness gate preview shows simulated visual asset ready, simulated b-roll ready, simulated brand asset ready, simulated music asset ready, simulated missing asset blocker, and denied frontend persistence.",
  plannedInputs: ["Simulated visual asset ready", "Simulated b-roll ready", "Simulated brand asset ready", "Simulated music asset ready"],
  plannedOutputs: ["Asset Readiness Gate", "Missing asset blocker", "Backend-owned asset storage required", "Backend-owned rights review required"],
  checklistPrefix: "asset-readiness-gate",
  checklistSummary:
    "Asset readiness gate preview shows simulated visual asset ready simulated b-roll ready simulated brand asset ready simulated music asset ready simulated missing asset blocker and denied frontend persistence.",
  blocked:
    "Asset readiness gate preview does not upload assets download assets store media persist rights or render assets from the UI.",
  approval: "Asset readiness gate preview requires backend-owned asset storage and rights review.",
  state: "backend-owned",
});

const CAPTION_READINESS_GATE = createSection({
  sectionId: "captionReadinessGate",
  label: "Caption Readiness Gate",
  title: "Backend-Owned Caption Readiness Gate Preview",
  humanReadableSummary:
    "Caption readiness gate preview shows simulated caption style ready, simulated subtitle timing ready, simulated accessibility note ready, simulated transcript review ready, and simulated caption export blocked state.",
  plannedInputs: ["Simulated caption style ready", "Simulated subtitle timing ready", "Simulated accessibility note ready", "Simulated transcript review ready"],
  plannedOutputs: ["Caption Readiness Gate", "Caption export blocked state", "Backend-owned caption workflow", "Denied frontend caption persistence"],
  checklistPrefix: "caption-readiness-gate",
  checklistSummary:
    "Caption readiness gate preview shows simulated caption style ready simulated subtitle timing ready simulated accessibility note ready simulated transcript review ready simulated caption export blocked state.",
  blocked:
    "Caption readiness gate preview does not transcribe audio burn captions export subtitle files or persist captions from the UI.",
  approval: "Caption readiness gate preview requires backend-owned caption workflow.",
  state: "backend-owned",
});

const AUDIO_READINESS_GATE = createSection({
  sectionId: "audioReadinessGate",
  label: "Audio Readiness Gate",
  title: "Backend-Owned Audio Readiness Gate Preview",
  humanReadableSummary:
    "Audio readiness gate preview shows simulated narration ready, simulated music cue ready, simulated consent ready, simulated rights ready, and simulated audio persistence blocked state.",
  plannedInputs: ["Simulated narration ready", "Simulated music cue ready", "Simulated consent ready", "Simulated rights ready"],
  plannedOutputs: ["Audio Readiness Gate", "Audio persistence blocked state", "Backend-owned audio storage required", "Consent and rights review required"],
  checklistPrefix: "audio-readiness-gate",
  checklistSummary:
    "Audio readiness gate preview shows simulated narration ready simulated music cue ready simulated consent ready simulated rights ready simulated audio persistence blocked state.",
  blocked:
    "Audio readiness gate preview does not synthesize voice clone voice upload audio download audio store media or clear music rights from the UI.",
  approval: "Audio readiness gate preview requires backend-owned audio storage consent review rights review and approval.",
  state: "backend-owned",
});

const RIGHTS_APPROVAL_GATE = createSection({
  sectionId: "rightsApprovalGate",
  label: "Rights Approval Gate",
  title: "Backend-Owned Rights Approval Gate Preview",
  humanReadableSummary:
    "Rights approval gate preview shows simulated source rights, simulated music rights, simulated likeness consent, simulated brand approval, and simulated denied frontend rights persistence.",
  plannedInputs: ["Simulated source rights", "Simulated music rights", "Simulated likeness consent", "Simulated brand approval"],
  plannedOutputs: ["Rights Approval Gate", "Denied frontend rights persistence", "Backend-owned rights review", "Backend-owned consent review"],
  checklistPrefix: "rights-approval-gate",
  checklistSummary:
    "Rights approval gate preview shows simulated source rights simulated music rights simulated likeness consent simulated brand approval simulated denied frontend rights persistence.",
  blocked:
    "Rights approval gate preview does not clear copyright license music approve usage persist rights or publish content from the UI.",
  approval: "Rights approval gate preview requires backend-owned rights review consent review and approval capture.",
  state: "backend-owned",
});

const RENDER_SETTINGS_PLANNING = createSection({
  sectionId: "renderSettingsPlanning",
  label: "Render Settings Planning",
  title: "Synthetic Render Settings Planning Preview",
  humanReadableSummary:
    "Render settings planning preview shows simulated aspect ratio, simulated resolution target, simulated duration target, simulated caption burn setting, and simulated export blocked state.",
  plannedInputs: ["Simulated aspect ratio", "Simulated resolution target", "Simulated duration target", "Simulated caption burn setting"],
  plannedOutputs: ["Render Settings Planning", "Export blocked state", "Backend-owned render service requirement", "Synthetic settings rows"],
  checklistPrefix: "render-settings-planning",
  checklistSummary:
    "Render settings planning preview shows simulated aspect ratio simulated resolution target simulated duration target simulated caption burn setting simulated export blocked state.",
  blocked:
    "Render settings planning preview does not transcode video render files export media or persist render settings from the UI.",
  approval: "Render settings planning preview requires backend-owned render service.",
  state: "backend-owned",
});

const RENDER_QUEUE_BLOCKED = createSection({
  sectionId: "renderQueueBlocked",
  label: "Render Queue Blocked",
  title: "Frontend Render Queue Blocked Preview",
  humanReadableSummary:
    "Render queue blocked preview shows denied queue creation, denied job persistence, denied worker dispatch, denied retry path, denied runtime start, and backend prerequisite.",
  plannedInputs: ["Denied queue creation", "Denied job persistence", "Denied worker dispatch", "Denied retry path"],
  plannedOutputs: ["Render Queue Blocked", "Backend-owned render queue required", "Backend-owned worker orchestration required", "Denied runtime start"],
  checklistPrefix: "render-queue-blocked",
  checklistSummary:
    "Render queue blocked preview shows denied queue creation denied job persistence denied worker dispatch denied retry path denied runtime start and backend prerequisite.",
  blocked:
    "Render queue blocked preview does not create queues persist jobs dispatch workers retry jobs or start runtimes from the UI.",
  approval: "Render queue blocked preview requires backend-owned render queue and worker orchestration.",
  state: "blocked",
});

const WORKER_DISPATCH_BLOCKED = createSection({
  sectionId: "workerDispatchBlocked",
  label: "Worker Dispatch Blocked",
  title: "Frontend Worker Dispatch Blocked Preview",
  humanReadableSummary:
    "Worker dispatch blocked preview shows denied worker dispatch, denied process spawn, denied command execution, denied runtime start, denied service start, and backend prerequisite.",
  plannedInputs: ["Denied worker dispatch", "Denied process spawn", "Denied command execution", "Denied runtime start"],
  plannedOutputs: ["Worker Dispatch Blocked", "Backend-owned worker orchestration required", "Explicit operator approval required", "Denied service start"],
  checklistPrefix: "worker-dispatch-blocked",
  checklistSummary:
    "Worker dispatch blocked preview shows denied worker dispatch denied process spawn denied command execution denied runtime start denied service start and backend prerequisite.",
  blocked:
    "Worker dispatch blocked preview does not dispatch workers spawn processes bind ports run commands deploy runtimes or start render services from the UI.",
  approval: "Worker dispatch blocked preview requires backend-owned worker orchestration and explicit operator approval.",
  state: "blocked",
});

const ARTIFACT_PERSISTENCE_BLOCKED = createSection({
  sectionId: "artifactPersistenceBlocked",
  label: "Artifact Persistence Blocked",
  title: "Frontend Artifact Persistence Blocked Preview",
  humanReadableSummary:
    "Artifact persistence blocked preview shows denied artifact creation, denied media storage, denied file write, denied browser storage, denied asset persistence, and backend prerequisite.",
  plannedInputs: ["Denied artifact creation", "Denied media storage", "Denied file write", "Denied browser storage"],
  plannedOutputs: ["Artifact Persistence Blocked", "Backend-owned artifact storage required", "Approval capture required", "Denied asset persistence"],
  checklistPrefix: "artifact-persistence-blocked",
  checklistSummary:
    "Artifact persistence blocked preview shows denied artifact creation denied media storage denied file write denied browser storage denied asset persistence and backend prerequisite.",
  blocked:
    "Artifact persistence blocked preview does not create artifacts persist files store media upload assets download assets or write browser storage from the UI.",
  approval: "Artifact persistence blocked preview requires backend-owned artifact storage and approval capture.",
  state: "blocked",
});

const RENDER_FAILURE_REVIEW = createSection({
  sectionId: "renderFailureReview",
  label: "Render Failure Review",
  title: "Synthetic Render Failure Review Preview",
  humanReadableSummary:
    "Render failure review preview shows simulated blocked prerequisite, simulated missing asset, simulated missing caption, simulated rights hold, and simulated backend failure review required.",
  plannedInputs: ["Simulated blocked prerequisite", "Simulated missing asset", "Simulated missing caption", "Simulated rights hold"],
  plannedOutputs: ["Render Failure Review", "Backend failure review required", "Operator review required", "Denied retry path"],
  checklistPrefix: "render-failure-review",
  checklistSummary:
    "Render failure review preview shows simulated blocked prerequisite simulated missing asset simulated missing caption simulated rights hold simulated backend failure review required.",
  blocked:
    "Render failure review preview does not retry render jobs dispatch workers inspect logs from services or persist failure state from the UI.",
  approval: "Render failure review preview requires backend-owned render telemetry and operator review.",
  state: "backend-owned",
});

const EXPORT_HANDOFF_BLOCKED = createSection({
  sectionId: "exportHandoffBlocked",
  label: "Export Handoff Blocked",
  title: "Frontend Export Handoff Blocked Preview",
  humanReadableSummary:
    "Export handoff blocked preview shows denied export, denied download, denied upload, denied publish, denied schedule, denied artifact creation, and approval requirement.",
  plannedInputs: ["Denied export", "Denied download", "Denied upload", "Denied publish"],
  plannedOutputs: ["Export Handoff Blocked", "Backend-owned export service required", "Artifact storage required", "Approval capture required"],
  checklistPrefix: "export-handoff-blocked",
  checklistSummary:
    "Export handoff blocked preview shows denied export denied download denied upload denied publish denied schedule denied artifact creation and approval requirement.",
  blocked:
    "Export handoff blocked preview does not export videos download files upload media publish posts schedule content or create artifacts from the UI.",
  approval: "Export handoff blocked preview requires backend-owned export service artifact storage rights review and approval capture.",
  state: "blocked",
});

const DENIED_RENDER_JOB_BOUNDARIES = createSection({
  sectionId: "deniedRenderJobBoundaries",
  label: "Denied Render Job Boundaries",
  title: "Denied Render Job Paths",
  humanReadableSummary:
    "Denied render job paths remain blocked across frontend rendering, queue creation, worker dispatch, artifact creation, artifact persistence, export, upload, download, provider calls, model calls, connector calls, persistence, publishing, scheduling, and file mutation.",
  plannedInputs: ["Denied render path", "Denied queue path", "Denied worker path", "Denied artifact path"],
  plannedOutputs: ["Denied render job paths remain blocked", "Explicit operator approval required", "Backend-owned services required", "Review-only cockpit boundary"],
  checklistPrefix: "denied-render-job-boundary",
  checklistSummary:
    "Denied render job paths remain blocked across frontend rendering queue creation worker dispatch artifact persistence export provider calls persistence publishing scheduling and file mutation.",
  blocked:
    "Denied render job paths do not create videos, queues, jobs, workers, artifacts, exports, uploads, downloads, approvals, rights records, prompt records, provider calls, model calls, connector calls, posts, schedules, or frontend storage.",
  approval: "Denied render job paths require backend ownership and explicit operator approval.",
  state: "blocked",
});

const SECTION_LOOKUP: Record<RenderJobBoundarySectionId, RenderJobBoundarySection> = {
  renderJobBoundary: RENDER_JOB_BOUNDARY,
  renderPrerequisiteChecklist: RENDER_PREREQUISITE_CHECKLIST,
  timelineReadinessPacket: TIMELINE_READINESS_PACKET,
  assetReadinessGate: ASSET_READINESS_GATE,
  captionReadinessGate: CAPTION_READINESS_GATE,
  audioReadinessGate: AUDIO_READINESS_GATE,
  rightsApprovalGate: RIGHTS_APPROVAL_GATE,
  renderSettingsPlanning: RENDER_SETTINGS_PLANNING,
  renderQueueBlocked: RENDER_QUEUE_BLOCKED,
  workerDispatchBlocked: WORKER_DISPATCH_BLOCKED,
  artifactPersistenceBlocked: ARTIFACT_PERSISTENCE_BLOCKED,
  renderFailureReview: RENDER_FAILURE_REVIEW,
  exportHandoffBlocked: EXPORT_HANDOFF_BLOCKED,
  deniedRenderJobBoundaries: DENIED_RENDER_JOB_BOUNDARIES,
};

const ALL_SECTION_IDS: readonly RenderJobBoundarySectionId[] = [
  "renderJobBoundary",
  "renderPrerequisiteChecklist",
  "timelineReadinessPacket",
  "assetReadinessGate",
  "captionReadinessGate",
  "audioReadinessGate",
  "rightsApprovalGate",
  "renderSettingsPlanning",
  "renderQueueBlocked",
  "workerDispatchBlocked",
  "artifactPersistenceBlocked",
  "renderFailureReview",
  "exportHandoffBlocked",
  "deniedRenderJobBoundaries",
] as const;

const COCKPIT_SUMMARY: readonly RenderJobBoundaryItem[] = [
  {
    id: "render-prerequisites",
    label: "Render prerequisite checklist",
    detail: "Shows simulated script, storyboard, asset, caption, rights, and backend render service readiness.",
    state: "review-only",
  },
  {
    id: "timeline-readiness",
    label: "Timeline readiness packet",
    detail: "Shows simulated scene order, duration target, overlay note, audio sync note, and render blocked state.",
    state: "backend-owned",
  },
  {
    id: "asset-readiness",
    label: "Asset readiness gate",
    detail: "Requires backend-owned asset storage and rights review before any render job boundary can proceed.",
    state: "backend-owned",
  },
  {
    id: "caption-readiness",
    label: "Caption readiness gate",
    detail: "Keeps caption style, timing, accessibility, and transcript review backend-owned without caption export.",
    state: "backend-owned",
  },
  {
    id: "audio-readiness",
    label: "Audio readiness gate",
    detail: "Keeps narration, music cues, consent, rights, and audio persistence backend-owned.",
    state: "backend-owned",
  },
  {
    id: "rights-approval",
    label: "Rights approval gate",
    detail: "Keeps source rights, music rights, likeness consent, brand approval, and approval capture backend-owned.",
    state: "needs-approval",
  },
  {
    id: "render-settings",
    label: "Render settings planning",
    detail: "Shows simulated aspect ratio, resolution target, duration target, caption burn setting, and export blocked state.",
    state: "synthetic-only",
  },
  {
    id: "queue-blocked",
    label: "Render queue blocked",
    detail: "Frontend queue creation, job persistence, worker dispatch, retry paths, and runtime start remain blocked.",
    state: "blocked",
  },
  {
    id: "worker-blocked",
    label: "Worker dispatch blocked",
    detail: "Frontend worker dispatch, process spawn, command execution, runtime start, and service start remain blocked.",
    state: "blocked",
  },
  {
    id: "artifact-blocked",
    label: "Artifact persistence blocked",
    detail: "Frontend artifact creation, media storage, file write, browser storage, and asset persistence remain blocked.",
    state: "blocked",
  },
  {
    id: "failure-review",
    label: "Render failure review",
    detail: "Shows synthetic blocked prerequisites, missing assets, missing captions, rights holds, and backend review need.",
    state: "review-only",
  },
  {
    id: "export-blocked",
    label: "Export handoff blocked",
    detail: "Frontend export, download, upload, publishing, scheduling, and artifact creation remain blocked.",
    state: "blocked",
  },
] as const;

const RENDER_JOB_BOUNDARY_MODEL: RenderJobBoundaryModel = {
  renderJobBoundaryId: "render-job-boundary-v1",
  renderJobBoundaryKind: "render-job-boundary-v1",
  renderPrerequisiteChecklist: RENDER_PREREQUISITE_CHECKLIST,
  timelineReadinessPacket: TIMELINE_READINESS_PACKET,
  assetReadinessGate: ASSET_READINESS_GATE,
  captionReadinessGate: CAPTION_READINESS_GATE,
  audioReadinessGate: AUDIO_READINESS_GATE,
  rightsApprovalGate: RIGHTS_APPROVAL_GATE,
  renderSettingsPlanning: RENDER_SETTINGS_PLANNING,
  renderQueueBlocked: RENDER_QUEUE_BLOCKED,
  workerDispatchBlocked: WORKER_DISPATCH_BLOCKED,
  artifactPersistenceBlocked: ARTIFACT_PERSISTENCE_BLOCKED,
  renderFailureReview: RENDER_FAILURE_REVIEW,
  exportHandoffBlocked: EXPORT_HANDOFF_BLOCKED,
  deniedRenderJobBoundaries: DENIED_RENDER_JOB_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ROUTES: readonly RenderJobBoundaryRouteDefinition[] = [
  {
    slug: "render-job-boundary",
    href: "/render-job-boundary",
    phase: "Phase 1978",
    title: "Render Job Boundary",
    commandLabel: "Go to Render Job Boundary",
    summary:
      "Previews the render job boundary without frontend rendering, queue creation, worker dispatch, artifact creation, export, provider calls, persistence, publishing, scheduling, or file mutation.",
    markerPhrases: [
      "Render job boundary",
      "Render job boundary does not render videos create render queues dispatch workers create artifacts export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist render jobs persist queues persist artifacts persist captions persist transcripts persist audio persist rights or write files from the UI",
      "Render job boundary requires explicit operator approval",
      "Render job boundary prepares deterministic synthetic render readiness workflows without frontend rendering queue creation worker dispatch artifact persistence provider calls export or publishing",
      "Denied render job paths remain blocked",
      "Render job boundary checklist",
    ],
    sectionIds: ["renderJobBoundary", "renderQueueBlocked", "workerDispatchBlocked", "deniedRenderJobBoundaries"],
    devOnly: true,
  },
  {
    slug: "render-prerequisite-checklist-preview",
    href: "/render-prerequisite-checklist-preview",
    phase: "Phase 1979",
    title: "Render Prerequisite Checklist Preview",
    commandLabel: "Go to Render Prerequisite Checklist Preview",
    summary:
      "Previews deterministic synthetic render prerequisite rows without render job creation, worker dispatch, approval persistence, or file export from the UI.",
    markerPhrases: [
      "Render prerequisite checklist preview",
      "Render prerequisite checklist preview does not create render jobs dispatch workers persist approvals or export files from the UI",
      "Render prerequisite checklist preview requires deterministic synthetic prerequisite rows only",
      "Render prerequisite checklist preview shows simulated script ready simulated storyboard ready simulated asset ready simulated caption ready simulated rights ready simulated backend render service required",
      "Denied render prerequisite checklist paths remain blocked",
      "Render prerequisite checklist checklist",
    ],
    sectionIds: ["renderPrerequisiteChecklist", "renderJobBoundary", "deniedRenderJobBoundaries"],
    devOnly: true,
  },
  {
    slug: "timeline-readiness-packet-preview",
    href: "/timeline-readiness-packet-preview",
    phase: "Phase 1980",
    title: "Timeline Readiness Packet Preview",
    commandLabel: "Go to Timeline Readiness Packet Preview",
    summary:
      "Previews backend-owned timeline readiness without timeline rendering, file writes, timeline persistence, or artifact creation from the UI.",
    markerPhrases: [
      "Timeline readiness packet preview",
      "Timeline readiness packet preview does not render timelines write files persist timelines or create artifacts from the UI",
      "Timeline readiness packet preview requires backend-owned timeline and render workflow",
      "Timeline readiness packet preview shows simulated scene order simulated duration target simulated overlay note simulated audio sync note simulated render blocked state",
      "Denied timeline readiness packet paths remain blocked",
      "Timeline readiness packet checklist",
    ],
    sectionIds: ["timelineReadinessPacket", "renderPrerequisiteChecklist", "deniedRenderJobBoundaries"],
    devOnly: true,
  },
  {
    slug: "asset-readiness-gate-preview",
    href: "/asset-readiness-gate-preview",
    phase: "Phase 1981",
    title: "Asset Readiness Gate Preview",
    commandLabel: "Go to Asset Readiness Gate Preview",
    summary:
      "Previews backend-owned asset readiness without asset upload, download, media storage, rights persistence, or asset rendering from the UI.",
    markerPhrases: [
      "Asset readiness gate preview",
      "Asset readiness gate preview does not upload assets download assets store media persist rights or render assets from the UI",
      "Asset readiness gate preview requires backend-owned asset storage and rights review",
      "Asset readiness gate preview shows simulated visual asset ready simulated b-roll ready simulated brand asset ready simulated music asset ready simulated missing asset blocker and denied frontend persistence",
      "Denied asset readiness gate paths remain blocked",
      "Asset readiness gate checklist",
    ],
    sectionIds: ["assetReadinessGate", "timelineReadinessPacket", "deniedRenderJobBoundaries"],
    devOnly: true,
  },
  {
    slug: "caption-readiness-gate-preview",
    href: "/caption-readiness-gate-preview",
    phase: "Phase 1982",
    title: "Caption Readiness Gate Preview",
    commandLabel: "Go to Caption Readiness Gate Preview",
    summary:
      "Previews backend-owned caption readiness without transcription, caption burn-in, subtitle file export, or caption persistence from the UI.",
    markerPhrases: [
      "Caption readiness gate preview",
      "Caption readiness gate preview does not transcribe audio burn captions export subtitle files or persist captions from the UI",
      "Caption readiness gate preview requires backend-owned caption workflow",
      "Caption readiness gate preview shows simulated caption style ready simulated subtitle timing ready simulated accessibility note ready simulated transcript review ready simulated caption export blocked state",
      "Denied caption readiness gate paths remain blocked",
      "Caption readiness gate checklist",
    ],
    sectionIds: ["captionReadinessGate", "assetReadinessGate", "deniedRenderJobBoundaries"],
    devOnly: true,
  },
  {
    slug: "audio-readiness-gate-preview",
    href: "/audio-readiness-gate-preview",
    phase: "Phase 1983",
    title: "Audio Readiness Gate Preview",
    commandLabel: "Go to Audio Readiness Gate Preview",
    summary:
      "Previews backend-owned audio readiness without voice synthesis, voice cloning, audio upload, audio download, media storage, or music rights clearance from the UI.",
    markerPhrases: [
      "Audio readiness gate preview",
      "Audio readiness gate preview does not synthesize voice clone voice upload audio download audio store media or clear music rights from the UI",
      "Audio readiness gate preview requires backend-owned audio storage consent review rights review and approval",
      "Audio readiness gate preview shows simulated narration ready simulated music cue ready simulated consent ready simulated rights ready simulated audio persistence blocked state",
      "Denied audio readiness gate paths remain blocked",
      "Audio readiness gate checklist",
    ],
    sectionIds: ["audioReadinessGate", "captionReadinessGate", "deniedRenderJobBoundaries"],
    devOnly: true,
  },
  {
    slug: "rights-approval-gate-preview",
    href: "/rights-approval-gate-preview",
    phase: "Phase 1984",
    title: "Rights Approval Gate Preview",
    commandLabel: "Go to Rights Approval Gate Preview",
    summary:
      "Previews backend-owned rights approval without copyright clearance, music licensing, usage approval, rights persistence, or publishing from the UI.",
    markerPhrases: [
      "Rights approval gate preview",
      "Rights approval gate preview does not clear copyright license music approve usage persist rights or publish content from the UI",
      "Rights approval gate preview requires backend-owned rights review consent review and approval capture",
      "Rights approval gate preview shows simulated source rights simulated music rights simulated likeness consent simulated brand approval simulated denied frontend rights persistence",
      "Denied rights approval gate paths remain blocked",
      "Rights approval gate checklist",
    ],
    sectionIds: ["rightsApprovalGate", "audioReadinessGate", "deniedRenderJobBoundaries"],
    devOnly: true,
  },
  {
    slug: "render-settings-planning-preview",
    href: "/render-settings-planning-preview",
    phase: "Phase 1985",
    title: "Render Settings Planning Preview",
    commandLabel: "Go to Render Settings Planning Preview",
    summary:
      "Previews deterministic synthetic render settings planning without video transcoding, file rendering, media export, or render setting persistence from the UI.",
    markerPhrases: [
      "Render settings planning preview",
      "Render settings planning preview does not transcode video render files export media or persist render settings from the UI",
      "Render settings planning preview requires backend-owned render service",
      "Render settings planning preview shows simulated aspect ratio simulated resolution target simulated duration target simulated caption burn setting simulated export blocked state",
      "Denied render settings planning paths remain blocked",
      "Render settings planning checklist",
    ],
    sectionIds: ["renderSettingsPlanning", "rightsApprovalGate", "deniedRenderJobBoundaries"],
    devOnly: true,
  },
  {
    slug: "render-queue-blocked-preview",
    href: "/render-queue-blocked-preview",
    phase: "Phase 1986",
    title: "Render Queue Blocked Preview",
    commandLabel: "Go to Render Queue Blocked Preview",
    summary:
      "Previews blocked frontend render queue paths without queue creation, job persistence, worker dispatch, retries, or runtime starts from the UI.",
    markerPhrases: [
      "Render queue blocked preview",
      "Render queue blocked preview does not create queues persist jobs dispatch workers retry jobs or start runtimes from the UI",
      "Render queue blocked preview requires backend-owned render queue and worker orchestration",
      "Render queue blocked preview shows denied queue creation denied job persistence denied worker dispatch denied retry path denied runtime start and backend prerequisite",
      "Denied render queue paths remain blocked",
      "Render queue blocked checklist",
    ],
    sectionIds: ["renderQueueBlocked", "renderSettingsPlanning", "deniedRenderJobBoundaries"],
    devOnly: true,
  },
  {
    slug: "worker-dispatch-blocked-preview",
    href: "/worker-dispatch-blocked-preview",
    phase: "Phase 1987",
    title: "Worker Dispatch Blocked Preview",
    commandLabel: "Go to Worker Dispatch Blocked Preview",
    summary:
      "Previews blocked frontend worker dispatch paths without worker dispatch, process spawn, command execution, runtime start, or render service start from the UI.",
    markerPhrases: [
      "Worker dispatch blocked preview",
      "Worker dispatch blocked preview does not dispatch workers spawn processes bind ports run commands deploy runtimes or start render services from the UI",
      "Worker dispatch blocked preview requires backend-owned worker orchestration and explicit operator approval",
      "Worker dispatch blocked preview shows denied worker dispatch denied process spawn denied command execution denied runtime start denied service start and backend prerequisite",
      "Denied worker dispatch paths remain blocked",
      "Worker dispatch blocked checklist",
    ],
    sectionIds: ["workerDispatchBlocked", "renderQueueBlocked", "deniedRenderJobBoundaries"],
    devOnly: true,
  },
  {
    slug: "artifact-persistence-blocked-preview",
    href: "/artifact-persistence-blocked-preview",
    phase: "Phase 1988",
    title: "Artifact Persistence Blocked Preview",
    commandLabel: "Go to Artifact Persistence Blocked Preview",
    summary:
      "Previews blocked frontend artifact persistence paths without artifact creation, file persistence, media storage, upload, download, or browser storage writes from the UI.",
    markerPhrases: [
      "Artifact persistence blocked preview",
      "Artifact persistence blocked preview does not create artifacts persist files store media upload assets download assets or write browser storage from the UI",
      "Artifact persistence blocked preview requires backend-owned artifact storage and approval capture",
      "Artifact persistence blocked preview shows denied artifact creation denied media storage denied file write denied browser storage denied asset persistence and backend prerequisite",
      "Denied artifact persistence paths remain blocked",
      "Artifact persistence blocked checklist",
    ],
    sectionIds: ["artifactPersistenceBlocked", "workerDispatchBlocked", "deniedRenderJobBoundaries"],
    devOnly: true,
  },
  {
    slug: "render-failure-review-preview",
    href: "/render-failure-review-preview",
    phase: "Phase 1989",
    title: "Render Failure Review Preview",
    commandLabel: "Go to Render Failure Review Preview",
    summary:
      "Previews deterministic synthetic render failure review without render retries, worker dispatch, service log inspection, or failure state persistence from the UI.",
    markerPhrases: [
      "Render failure review preview",
      "Render failure review preview does not retry render jobs dispatch workers inspect logs from services or persist failure state from the UI",
      "Render failure review preview requires backend-owned render telemetry and operator review",
      "Render failure review preview shows simulated blocked prerequisite simulated missing asset simulated missing caption simulated rights hold simulated backend failure review required",
      "Denied render failure review paths remain blocked",
      "Render failure review checklist",
    ],
    sectionIds: ["renderFailureReview", "artifactPersistenceBlocked", "deniedRenderJobBoundaries"],
    devOnly: true,
  },
  {
    slug: "export-handoff-blocked-preview",
    href: "/export-handoff-blocked-preview",
    phase: "Phase 1990",
    title: "Export Handoff Blocked Preview",
    commandLabel: "Go to Export Handoff Blocked Preview",
    summary:
      "Previews blocked frontend export handoff paths without video export, file download, media upload, publishing, scheduling, or artifact creation from the UI.",
    markerPhrases: [
      "Export handoff blocked preview",
      "Export handoff blocked preview does not export videos download files upload media publish posts schedule content or create artifacts from the UI",
      "Export handoff blocked preview requires backend-owned export service artifact storage rights review and approval capture",
      "Export handoff blocked preview shows denied export denied download denied upload denied publish denied schedule denied artifact creation and approval requirement",
      "Denied export handoff paths remain blocked",
      "Export handoff blocked checklist",
    ],
    sectionIds: ["exportHandoffBlocked", "renderFailureReview", "deniedRenderJobBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-render-job-boundary-summary",
    href: "/cockpit-render-job-boundary-summary",
    phase: "Phase 1991",
    title: "Cockpit Render Job Boundary Summary",
    commandLabel: "Go to Cockpit Render Job Boundary Summary",
    summary:
      "Summarizes the review-only render job boundary as grouped Creative Workspace content in the normal cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: [
      "Cockpit render job boundary summary",
      "Cockpit render job boundary summary keeps the cockpit as the normal user surface",
      "Cockpit render job boundary summary does not render videos create render queues dispatch workers create artifacts export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist render jobs persist queues persist artifacts persist captions persist transcripts persist audio persist rights or write files from the cockpit",
      "Cockpit render job boundary summary shows render prerequisites timeline readiness asset readiness caption readiness audio readiness rights approval render settings render queue blocked worker dispatch blocked artifact persistence blocked render failure review export handoff blocked and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit render job boundary checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-render-job-boundary-candidate",
    href: "/first-render-job-boundary-candidate",
    phase: "Phase 1992",
    title: "First Render Job Boundary Candidate",
    commandLabel: "Go to First Render Job Boundary Candidate",
    summary:
      "Combines the first render job boundary candidate without frontend rendering, queue creation, worker dispatch, artifact creation, export, upload, download, provider calls, model calls, connector calls, persistence, publishing, scheduling, or file writes.",
    markerPhrases: [
      "First render job boundary candidate",
      "First render job boundary candidate does not enable rendering queue creation worker dispatch artifact creation export upload download provider calls model calls connector calls image generation video generation voice generation publishing scheduling file writes render job persistence queue persistence artifact persistence asset persistence rights persistence prompt persistence job persistence or approval persistence from the UI",
      "First render job boundary candidate requires explicit operator approval",
      "Candidate combines prerequisite checklist timeline readiness asset gate caption gate audio gate rights gate render settings render queue blocked worker dispatch blocked artifact persistence blocked render failure review export handoff blocked cockpit summary and denied paths",
      "Denied first render job boundary paths remain blocked",
      "First render job boundary checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-render-job-boundary-release-candidate",
    href: "/controlled-render-job-boundary-release-candidate",
    phase: "Phase 1993",
    title: "Controlled Render Job Boundary Release Candidate",
    commandLabel: "Go to Controlled Render Job Boundary Release Candidate",
    summary:
      "Release candidate adds the Render Job Boundary as a review-only planning workspace without frontend rendering, queue creation, worker dispatch, artifact persistence, export, provider calls, model calls, media persistence, rights persistence, prompt persistence, job persistence, approval persistence, publishing, scheduling, or file mutation.",
    markerPhrases: [
      "Controlled render job boundary release candidate",
      "Controlled render job boundary release candidate does not render videos create render queues dispatch workers create artifacts export files upload assets download assets store media call providers call models call connectors generate images generate videos generate voice synthesize audio publish posts schedule content write files persist render jobs persist queues persist artifacts persist captions persist transcripts persist audio persist assets persist rights persist prompts persist jobs persist approvals run commands spawn processes bind ports install packages deploy runtimes start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend",
      "Controlled render job boundary release requires explicit operator approval",
      "Release candidate adds the Render Job Boundary as a review-only planning workspace without frontend rendering queue creation worker dispatch artifact persistence export provider calls model calls media persistence rights persistence prompt persistence job persistence approval persistence publishing scheduling or file mutation",
      "Denied controlled render job boundary paths remain blocked",
      "Controlled render job boundary checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

const ROUTE_LOOKUP: Record<RenderJobBoundaryRouteSlug, RenderJobBoundaryRouteDefinition> = ROUTES.reduce(
  (accumulator, route) => {
    accumulator[route.slug] = route;
    return accumulator;
  },
  {} as Record<RenderJobBoundaryRouteSlug, RenderJobBoundaryRouteDefinition>
);

export function buildRenderJobBoundaryStableKey(parts: readonly string[]): string {
  return parts
    .map((part) =>
      part
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .join("--");
}

export function listRenderJobBoundaryRoutes(): readonly RenderJobBoundaryRouteDefinition[] {
  return ROUTES;
}

export function buildRenderJobBoundaryRouteModel(
  slug: RenderJobBoundaryRouteSlug = "controlled-render-job-boundary-release-candidate"
): RenderJobBoundaryRouteModel {
  const route = ROUTE_LOOKUP[slug];
  const sections = route.sectionIds.map((sectionId) => SECTION_LOOKUP[sectionId]);

  return {
    route,
    renderJobBoundary: RENDER_JOB_BOUNDARY_MODEL,
    sections,
    diagnosticRoutes: ROUTES,
    cockpitMarkers: RENDER_JOB_BOUNDARY_COCKPIT_MARKERS,
    summary: route.summary,
  };
}

