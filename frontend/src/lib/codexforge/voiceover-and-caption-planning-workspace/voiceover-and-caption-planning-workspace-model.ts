export type VoiceoverAndCaptionPlanningWorkspaceRouteSlug =
  | "voiceover-and-caption-planning-workspace-boundary"
  | "narration-brief-preview"
  | "voice-tone-and-pace-preview"
  | "voice-consent-and-rights-preview"
  | "audio-cue-planning-preview"
  | "caption-style-guide-preview"
  | "subtitle-timing-plan-preview"
  | "lower-third-and-supers-plan-preview"
  | "accessibility-caption-note-preview"
  | "transcript-review-lane-preview"
  | "audio-caption-blocker-map-preview"
  | "voice-generation-blocked-boundary-preview"
  | "caption-export-blocked-boundary-preview"
  | "cockpit-voiceover-and-caption-planning-summary"
  | "first-voiceover-and-caption-planning-workspace-candidate"
  | "controlled-voiceover-and-caption-planning-workspace-release-candidate";

export type VoiceoverAndCaptionPlanningWorkspaceKind =
  | "voiceover-and-caption-planning-workspace-v1"
  | VoiceoverAndCaptionPlanningWorkspaceRouteSlug;

export type VoiceoverAndCaptionPlanningWorkspaceState =
  | "review-only"
  | "synthetic-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type VoiceoverAndCaptionPlanningWorkspaceItem = {
  id: string;
  label: string;
  detail: string;
  state: VoiceoverAndCaptionPlanningWorkspaceState;
};

export type VoiceoverAndCaptionPlanningWorkspaceSectionId =
  | "voiceoverAndCaptionPlanningWorkspaceBoundary"
  | "narrationBrief"
  | "voiceToneAndPace"
  | "voiceConsentAndRights"
  | "audioCuePlanning"
  | "captionStyleGuide"
  | "subtitleTimingPlan"
  | "lowerThirdAndSupersPlan"
  | "accessibilityCaptionNote"
  | "transcriptReviewLane"
  | "audioCaptionBlockerMap"
  | "voiceGenerationBlockedBoundary"
  | "captionExportBlockedBoundary"
  | "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries";

export type VoiceoverAndCaptionPlanningWorkspaceSection = {
  sectionId: VoiceoverAndCaptionPlanningWorkspaceSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly VoiceoverAndCaptionPlanningWorkspaceItem[];
  state: VoiceoverAndCaptionPlanningWorkspaceState;
};

export type VoiceoverAndCaptionPlanningWorkspaceModel = {
  voiceoverAndCaptionPlanningWorkspaceId: string;
  voiceoverAndCaptionPlanningWorkspaceKind: VoiceoverAndCaptionPlanningWorkspaceKind;
  narrationBrief: VoiceoverAndCaptionPlanningWorkspaceSection;
  voiceToneAndPace: VoiceoverAndCaptionPlanningWorkspaceSection;
  voiceConsentAndRights: VoiceoverAndCaptionPlanningWorkspaceSection;
  audioCuePlanning: VoiceoverAndCaptionPlanningWorkspaceSection;
  captionStyleGuide: VoiceoverAndCaptionPlanningWorkspaceSection;
  subtitleTimingPlan: VoiceoverAndCaptionPlanningWorkspaceSection;
  lowerThirdAndSupersPlan: VoiceoverAndCaptionPlanningWorkspaceSection;
  accessibilityCaptionNote: VoiceoverAndCaptionPlanningWorkspaceSection;
  transcriptReviewLane: VoiceoverAndCaptionPlanningWorkspaceSection;
  audioCaptionBlockerMap: VoiceoverAndCaptionPlanningWorkspaceSection;
  voiceGenerationBlockedBoundary: VoiceoverAndCaptionPlanningWorkspaceSection;
  captionExportBlockedBoundary: VoiceoverAndCaptionPlanningWorkspaceSection;
  deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries: VoiceoverAndCaptionPlanningWorkspaceSection;
  cockpitSummary: readonly VoiceoverAndCaptionPlanningWorkspaceItem[];
  explicitSafetyLimits: readonly string[];
};

export type VoiceoverAndCaptionPlanningWorkspaceRouteDefinition = {
  slug: VoiceoverAndCaptionPlanningWorkspaceRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly VoiceoverAndCaptionPlanningWorkspaceSectionId[];
  devOnly: boolean;
};

export type VoiceoverAndCaptionPlanningWorkspaceRouteModel = {
  route: VoiceoverAndCaptionPlanningWorkspaceRouteDefinition;
  voiceoverAndCaptionPlanningWorkspace: VoiceoverAndCaptionPlanningWorkspaceModel;
  sections: readonly VoiceoverAndCaptionPlanningWorkspaceSection[];
  diagnosticRoutes: readonly VoiceoverAndCaptionPlanningWorkspaceRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const VOICEOVER_AND_CAPTION_PLANNING_WORKSPACE_COCKPIT_MARKERS = [
  "Voiceover And Caption Planning Workspace",
  "Voiceover And Caption Planning Workspace Boundary",
  "Narration Brief",
  "Voice Tone And Pace",
  "Voice Consent And Rights",
  "Audio Cue Planning",
  "Caption Style Guide",
  "Subtitle Timing Plan",
  "Lower Third And Supers Plan",
  "Accessibility Caption Note",
  "Transcript Review Lane",
  "Audio Caption Blocker Map",
  "Voice Generation Blocked Boundary",
  "Caption Export Blocked Boundary",
  "Review-only voiceover and caption planning workspace",
  "Synthetic data only",
  "No voice generation from the cockpit",
  "No voice cloning from the cockpit",
  "No audio synthesis from the cockpit",
  "No transcription from the cockpit",
  "No caption export from the cockpit",
  "No subtitle file generation from the cockpit",
  "No audio upload from the cockpit",
  "No audio download from the cockpit",
  "No video rendering from the cockpit",
  "No video export from the cockpit",
  "No file generation from the cockpit",
  "No frontend file mutation",
  "No frontend voice persistence",
  "No frontend caption persistence",
  "No frontend transcript persistence",
  "No frontend audio persistence",
  "No frontend asset persistence",
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
  "Operator review remains required",
  "Explicit operator approval remains required",
] as const;

export const VOICEOVER_AND_CAPTION_PLANNING_WORKSPACE_MODEL_FIELDS = [
  "voiceoverAndCaptionPlanningWorkspaceId",
  "voiceoverAndCaptionPlanningWorkspaceKind",
  "narrationBrief",
  "voiceToneAndPace",
  "voiceConsentAndRights",
  "audioCuePlanning",
  "captionStyleGuide",
  "subtitleTimingPlan",
  "lowerThirdAndSupersPlan",
  "accessibilityCaptionNote",
  "transcriptReviewLane",
  "audioCaptionBlockerMap",
  "voiceGenerationBlockedBoundary",
  "captionExportBlockedBoundary",
  "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Voiceover And Caption Planning Workspace v1 is deterministic static review content only.",
  "This is not voice generation.",
  "This is not voice cloning.",
  "This is not audio synthesis.",
  "This is not transcription.",
  "This is not caption export.",
  "This is not subtitle file generation.",
  "This is not video rendering.",
  "This is not video export.",
  "This is not asset upload.",
  "This is not asset download.",
  "This is not provider execution.",
  "This is not model execution.",
  "This is not connector execution.",
  "This is not prompt sending to external models.",
  "This is not publishing.",
  "This is not scheduling.",
  "This is not copyright or consent clearance.",
  "This is not automated brand approval.",
  "This does not guarantee performance.",
  "Backend-owned audio storage remains required.",
  "Backend-owned caption persistence remains required.",
  "Backend-owned provider gateway remains required.",
  "Backend-owned rights review remains required.",
  "Backend-owned consent review remains required.",
  "Backend-owned approval capture remains required.",
  "Operator review remains required.",
  "Explicit operator approval remains required.",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic synthetic voiceover and caption planning fixtures only.",
  "The voiceover and caption planning workspace exposes review-only planning surfaces without frontend voice generation, voice cloning, audio synthesis, transcription, caption export, subtitle file generation, audio upload, audio download, rendering, export, provider calls, model calls, connector calls, prompt sending, persistence, publishing, scheduling, or file mutation.",
  "Future audio storage, caption workflow, provider gateway, rights review, consent review, approval capture, script persistence, storyboard persistence, render service, and export service remain backend-owned and explicitly approved.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No voice generation, voice cloning, audio synthesis, transcription, caption export, subtitle file generation, audio upload, audio download, video rendering, video export, file generation, frontend file mutation, frontend voice persistence, frontend caption persistence, frontend transcript persistence, frontend audio persistence, frontend asset persistence, frontend rights persistence, frontend approval persistence, frontend prompt persistence, frontend job persistence, provider calls, model calls, connector calls, image generation calls, video generation calls, voice generation calls, publishing, social posting, scheduling, copyright clearance, consent clearance, automated brand approval, render queue dispatch, worker dispatch, artifact persistence, command execution, process spawning, port binding, package install, runtime start, credential storage, localhost probing, browser storage write, or performance guarantee from the UI.",
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
  "Operator review remains required.",
  "Explicit operator approval remains required.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly VoiceoverAndCaptionPlanningWorkspaceItem[] {
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
  sectionId: VoiceoverAndCaptionPlanningWorkspaceSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  checklistPrefix: string;
  checklistSummary: string;
  blocked: string;
  approval: string;
  state?: VoiceoverAndCaptionPlanningWorkspaceState;
}): VoiceoverAndCaptionPlanningWorkspaceSection {
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

const VOICEOVER_AND_CAPTION_PLANNING_WORKSPACE_BOUNDARY = createSection({
  sectionId: "voiceoverAndCaptionPlanningWorkspaceBoundary",
  label: "Voiceover And Caption Planning Workspace Boundary",
  title: "Deterministic Voiceover And Caption Planning Workspace Boundary",
  humanReadableSummary:
    "Voiceover and caption planning workspace boundary prepares deterministic synthetic voiceover and caption planning workflows without frontend audio generation, transcription, rendering, export, provider calls, caption persistence, audio persistence, rights persistence, or publishing.",
  plannedInputs: ["Synthetic workspace identity", "Synthetic safety limits", "Synthetic approval requirement", "Synthetic denied audio and caption paths"],
  plannedOutputs: ["Voiceover And Caption Planning Workspace Boundary", "Review-only voiceover and caption planning workspace", "Denied voiceover and caption planning workspace paths", "Explicit operator approval required"],
  checklistPrefix: "voiceover-and-caption-planning-workspace-boundary",
  checklistSummary:
    "Voiceover and caption planning workspace boundary prepares deterministic synthetic voiceover and caption planning workflows without frontend audio generation transcription rendering export provider calls caption persistence audio persistence rights persistence or publishing.",
  blocked:
    "Voiceover and caption planning workspace boundary does not synthesize voice clone voice transcribe audio burn captions export subtitles upload audio download audio render videos export files call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist voice scripts persist captions persist transcripts persist audio persist rights or write files from the UI.",
  approval: "Voiceover and caption planning workspace boundary requires explicit operator approval.",
  state: "needs-approval",
});

const NARRATION_BRIEF = createSection({
  sectionId: "narrationBrief",
  label: "Narration Brief",
  title: "Synthetic Narration Brief Preview",
  humanReadableSummary:
    "Narration brief preview shows simulated narrator role, simulated message goal, simulated tone note, simulated duration target, simulated no voice generation state, and denied frontend persistence.",
  plannedInputs: ["Simulated narrator role", "Simulated message goal", "Simulated tone note", "Simulated duration target"],
  plannedOutputs: ["Narration Brief", "No voice generation state", "Denied frontend persistence", "Deterministic narration planning rows"],
  checklistPrefix: "narration-brief",
  checklistSummary:
    "Narration brief preview shows simulated narrator role simulated message goal simulated tone note simulated duration target simulated no voice generation state and denied frontend persistence.",
  blocked:
    "Narration brief preview does not synthesize voice send prompts call models persist voice scripts or create audio files from the UI.",
  approval: "Narration brief preview requires deterministic synthetic narration planning rows only.",
});

const VOICE_TONE_AND_PACE = createSection({
  sectionId: "voiceToneAndPace",
  label: "Voice Tone And Pace",
  title: "Synthetic Voice Tone And Pace Preview",
  humanReadableSummary:
    "Voice tone and pace preview shows simulated voice tone, simulated read pace, simulated emphasis note, simulated pause note, and simulated backend voice workflow prerequisite.",
  plannedInputs: ["Simulated voice tone", "Simulated read pace", "Simulated emphasis note", "Simulated pause note"],
  plannedOutputs: ["Voice Tone And Pace", "Backend voice workflow prerequisite", "Synthetic pace planning", "Denied voice profile storage path"],
  checklistPrefix: "voice-tone-and-pace",
  checklistSummary:
    "Voice tone and pace preview shows simulated voice tone simulated read pace simulated emphasis note simulated pause note simulated backend voice workflow prerequisite.",
  blocked:
    "Voice tone and pace preview does not clone voices synthesize audio call voice providers store voice profiles or export audio from the UI.",
  approval: "Voice tone and pace preview requires deterministic synthetic voice planning only.",
  state: "backend-owned",
});

const VOICE_CONSENT_AND_RIGHTS = createSection({
  sectionId: "voiceConsentAndRights",
  label: "Voice Consent And Rights",
  title: "Backend-Owned Voice Consent And Rights Preview",
  humanReadableSummary:
    "Voice consent and rights preview shows simulated consent status, simulated speaker approval note, simulated rights note, simulated likeness note, and simulated denied frontend rights persistence.",
  plannedInputs: ["Simulated consent status", "Simulated speaker approval note", "Simulated rights note", "Simulated likeness note"],
  plannedOutputs: ["Voice Consent And Rights", "Backend-owned consent review", "Backend-owned rights review", "Denied frontend rights persistence"],
  checklistPrefix: "voice-consent-and-rights",
  checklistSummary:
    "Voice consent and rights preview shows simulated consent status simulated speaker approval note simulated rights note simulated likeness note simulated denied frontend rights persistence.",
  blocked:
    "Voice consent and rights preview does not clear consent license voices approve likeness use persist rights or synthesize audio from the UI.",
  approval: "Voice consent and rights preview requires backend-owned consent review rights review and approval capture.",
  state: "backend-owned",
});

const AUDIO_CUE_PLANNING = createSection({
  sectionId: "audioCuePlanning",
  label: "Audio Cue Planning",
  title: "Backend-Owned Audio Cue Planning Preview",
  humanReadableSummary:
    "Audio cue planning preview shows simulated intro cue, simulated transition cue, simulated music mood, simulated rights note, and simulated audio persistence blocked state.",
  plannedInputs: ["Simulated intro cue", "Simulated transition cue", "Simulated music mood", "Simulated rights note"],
  plannedOutputs: ["Audio Cue Planning", "Audio persistence blocked state", "Backend-owned audio storage required", "Rights review required"],
  checklistPrefix: "audio-cue-planning",
  checklistSummary:
    "Audio cue planning preview shows simulated intro cue simulated transition cue simulated music mood simulated rights note simulated audio persistence blocked state.",
  blocked:
    "Audio cue planning preview does not upload audio download music synthesize sounds store media or clear music rights from the UI.",
  approval: "Audio cue planning preview requires backend-owned audio storage rights review and approval.",
  state: "backend-owned",
});

const CAPTION_STYLE_GUIDE = createSection({
  sectionId: "captionStyleGuide",
  label: "Caption Style Guide",
  title: "Backend-Owned Caption Style Guide Preview",
  humanReadableSummary:
    "Caption style guide preview shows simulated caption casing, simulated caption placement, simulated line length note, simulated readability note, and simulated export blocked state.",
  plannedInputs: ["Simulated caption casing", "Simulated caption placement", "Simulated line length note", "Simulated readability note"],
  plannedOutputs: ["Caption Style Guide", "Export blocked state", "Backend-owned caption workflow", "Denied frontend caption persistence"],
  checklistPrefix: "caption-style-guide",
  checklistSummary:
    "Caption style guide preview shows simulated caption casing simulated caption placement simulated line length note simulated readability note simulated export blocked state.",
  blocked:
    "Caption style guide preview does not burn captions export subtitle files persist captions or write files from the UI.",
  approval: "Caption style guide preview requires backend-owned caption workflow before persistence.",
  state: "backend-owned",
});

const SUBTITLE_TIMING_PLAN = createSection({
  sectionId: "subtitleTimingPlan",
  label: "Subtitle Timing Plan",
  title: "Backend-Owned Subtitle Timing Plan Preview",
  humanReadableSummary:
    "Subtitle timing plan preview shows simulated subtitle segment, simulated timestamp note, simulated reading speed note, simulated sync risk, and simulated denied frontend export.",
  plannedInputs: ["Simulated subtitle segment", "Simulated timestamp note", "Simulated reading speed note", "Simulated sync risk"],
  plannedOutputs: ["Subtitle Timing Plan", "Denied frontend export", "Backend-owned caption timing workflow", "Synthetic timing plan rows"],
  checklistPrefix: "subtitle-timing-plan",
  checklistSummary:
    "Subtitle timing plan preview shows simulated subtitle segment simulated timestamp note simulated reading speed note simulated sync risk simulated denied frontend export.",
  blocked:
    "Subtitle timing plan preview does not transcribe audio align subtitles write srt files export vtt files or persist timing from the UI.",
  approval: "Subtitle timing plan preview requires backend-owned caption timing workflow.",
  state: "backend-owned",
});

const LOWER_THIRD_AND_SUPERS_PLAN = createSection({
  sectionId: "lowerThirdAndSupersPlan",
  label: "Lower Third And Supers Plan",
  title: "Backend-Owned Lower Third And Supers Plan Preview",
  humanReadableSummary:
    "Lower third and supers plan preview shows simulated lower third, simulated callout text, simulated overlay timing, simulated brand note, and simulated render blocked state.",
  plannedInputs: ["Simulated lower third", "Simulated callout text", "Simulated overlay timing", "Simulated brand note"],
  plannedOutputs: ["Lower Third And Supers Plan", "Render blocked state", "Backend-owned render and timeline workflow", "Denied timeline persistence"],
  checklistPrefix: "lower-third-and-supers-plan",
  checklistSummary:
    "Lower third and supers plan preview shows simulated lower third simulated callout text simulated overlay timing simulated brand note simulated render blocked state.",
  blocked:
    "Lower third and supers plan preview does not render graphics burn overlays export videos or persist timeline elements from the UI.",
  approval: "Lower third and supers plan preview requires backend-owned render and timeline workflow.",
  state: "backend-owned",
});

const ACCESSIBILITY_CAPTION_NOTE = createSection({
  sectionId: "accessibilityCaptionNote",
  label: "Accessibility Caption Note",
  title: "Backend-Owned Accessibility Caption Note Preview",
  humanReadableSummary:
    "Accessibility caption note preview shows simulated speaker label need, simulated sound effect label, simulated contrast note, simulated reading speed note, and simulated approval requirement.",
  plannedInputs: ["Simulated speaker label need", "Simulated sound effect label", "Simulated contrast note", "Simulated reading speed note"],
  plannedOutputs: ["Accessibility Caption Note", "Approval requirement", "Backend-owned accessibility review", "Backend-owned caption workflow"],
  checklistPrefix: "accessibility-caption-note",
  checklistSummary:
    "Accessibility caption note preview shows simulated speaker label need simulated sound effect label simulated contrast note simulated reading speed note simulated approval requirement.",
  blocked:
    "Accessibility caption note preview does not transcribe audio generate captions persist accessibility files or export subtitles from the UI.",
  approval: "Accessibility caption note preview requires backend-owned accessibility review and caption workflow.",
  state: "backend-owned",
});

const TRANSCRIPT_REVIEW_LANE = createSection({
  sectionId: "transcriptReviewLane",
  label: "Transcript Review Lane",
  title: "Backend-Owned Transcript Review Lane Preview",
  humanReadableSummary:
    "Transcript review lane preview shows simulated transcript note, simulated correction note, simulated review owner, simulated approval state, and simulated denied frontend transcript persistence.",
  plannedInputs: ["Simulated transcript note", "Simulated correction note", "Simulated review owner", "Simulated approval state"],
  plannedOutputs: ["Transcript Review Lane", "Denied frontend transcript persistence", "Backend-owned transcript workflow", "Approval capture required"],
  checklistPrefix: "transcript-review-lane",
  checklistSummary:
    "Transcript review lane preview shows simulated transcript note simulated correction note simulated review owner simulated approval state simulated denied frontend transcript persistence.",
  blocked:
    "Transcript review lane preview does not transcribe audio call models persist transcripts write files or approve captions from the UI.",
  approval: "Transcript review lane preview requires backend-owned transcript workflow and approval capture.",
  state: "backend-owned",
});

const AUDIO_CAPTION_BLOCKER_MAP = createSection({
  sectionId: "audioCaptionBlockerMap",
  label: "Audio Caption Blocker Map",
  title: "Synthetic Audio Caption Blocker Map Preview",
  humanReadableSummary:
    "Audio caption blocker map preview shows simulated missing consent, simulated missing music rights, simulated missing transcript, simulated missing caption review, simulated missing approval, and backend prerequisite.",
  plannedInputs: ["Simulated missing consent", "Simulated missing music rights", "Simulated missing transcript", "Simulated missing caption review"],
  plannedOutputs: ["Audio Caption Blocker Map", "Backend prerequisite", "Synthetic blocker rows", "Denied review bypass paths"],
  checklistPrefix: "audio-caption-blocker-map",
  checklistSummary:
    "Audio caption blocker map preview shows simulated missing consent simulated missing music rights simulated missing transcript simulated missing caption review simulated missing approval and backend prerequisite.",
  blocked:
    "Audio caption blocker map preview does not create jobs dispatch workers persist queues bypass consent review or bypass rights review from the UI.",
  approval: "Audio caption blocker map preview requires deterministic synthetic blocker rows only.",
});

const VOICE_GENERATION_BLOCKED_BOUNDARY = createSection({
  sectionId: "voiceGenerationBlockedBoundary",
  label: "Voice Generation Blocked Boundary",
  title: "Frontend Voice Generation Blocked Boundary Preview",
  humanReadableSummary:
    "Voice generation blocked boundary preview shows denied voice clone, denied audio synthesis, denied provider call, denied prompt send, denied audio persistence, denied consent persistence, and backend prerequisite.",
  plannedInputs: ["Denied voice clone", "Denied audio synthesis", "Denied provider call", "Denied prompt send"],
  plannedOutputs: ["Voice Generation Blocked Boundary", "Backend provider gateway prerequisite", "Consent review required", "Explicit operator approval required"],
  checklistPrefix: "voice-generation-blocked-boundary",
  checklistSummary:
    "Voice generation blocked boundary preview shows denied voice clone denied audio synthesis denied provider call denied prompt send denied audio persistence denied consent persistence and backend prerequisite.",
  blocked:
    "Voice generation blocked boundary preview blocks frontend voice cloning frontend audio synthesis frontend provider calls frontend model calls frontend prompt sending frontend audio persistence and frontend consent persistence.",
  approval:
    "Voice generation blocked boundary preview requires backend-owned provider gateway consent review rights review approval capture and explicit operator approval.",
  state: "blocked",
});

const CAPTION_EXPORT_BLOCKED_BOUNDARY = createSection({
  sectionId: "captionExportBlockedBoundary",
  label: "Caption Export Blocked Boundary",
  title: "Frontend Caption Export Blocked Boundary Preview",
  humanReadableSummary:
    "Caption export blocked boundary preview shows denied caption export, denied subtitle file write, denied transcription, denied download, denied artifact creation, denied publish, and approval requirement.",
  plannedInputs: ["Denied caption export", "Denied subtitle file write", "Denied transcription", "Denied download"],
  plannedOutputs: ["Caption Export Blocked Boundary", "Backend export service prerequisite", "Approval requirement", "Denied artifact creation"],
  checklistPrefix: "caption-export-blocked-boundary",
  checklistSummary:
    "Caption export blocked boundary preview shows denied caption export denied subtitle file write denied transcription denied download denied artifact creation denied publish and approval requirement.",
  blocked:
    "Caption export blocked boundary preview blocks frontend subtitle export frontend caption file write frontend transcription frontend download frontend upload frontend artifact creation and frontend publishing.",
  approval:
    "Caption export blocked boundary preview requires backend-owned caption workflow export service rights review approval capture and operator approval.",
  state: "blocked",
});

const DENIED_VOICEOVER_AND_CAPTION_PLANNING_WORKSPACE_BOUNDARIES = createSection({
  sectionId: "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries",
  label: "Denied Voiceover And Caption Planning Workspace Boundaries",
  title: "Denied Audio And Caption Planning Paths",
  humanReadableSummary:
    "Denied voiceover and caption planning workspace paths remain blocked across voice generation, voice cloning, audio synthesis, transcription, caption export, subtitle files, audio upload, audio download, rendering, export, provider calls, model calls, connector calls, persistence, publishing, scheduling, and file mutation.",
  plannedInputs: ["Denied voice path", "Denied caption path", "Denied provider path", "Denied persistence path"],
  plannedOutputs: ["Denied voiceover and caption planning workspace paths remain blocked", "Explicit operator approval required", "Backend-owned services required", "Review-only cockpit boundary"],
  checklistPrefix: "denied-voiceover-and-caption-planning-workspace",
  checklistSummary:
    "Denied voiceover and caption planning workspace paths remain blocked across frontend audio generation transcription rendering export provider calls persistence publishing scheduling and file mutation.",
  blocked:
    "Denied voiceover and caption planning workspace paths do not create audio, captions, transcripts, subtitle files, render artifacts, export files, jobs, approvals, rights records, prompt records, provider calls, model calls, connector calls, posts, schedules, or frontend storage.",
  approval: "Denied voiceover and caption planning workspace paths require backend ownership and explicit operator approval.",
  state: "blocked",
});

const SECTION_LOOKUP: Record<
  VoiceoverAndCaptionPlanningWorkspaceSectionId,
  VoiceoverAndCaptionPlanningWorkspaceSection
> = {
  voiceoverAndCaptionPlanningWorkspaceBoundary: VOICEOVER_AND_CAPTION_PLANNING_WORKSPACE_BOUNDARY,
  narrationBrief: NARRATION_BRIEF,
  voiceToneAndPace: VOICE_TONE_AND_PACE,
  voiceConsentAndRights: VOICE_CONSENT_AND_RIGHTS,
  audioCuePlanning: AUDIO_CUE_PLANNING,
  captionStyleGuide: CAPTION_STYLE_GUIDE,
  subtitleTimingPlan: SUBTITLE_TIMING_PLAN,
  lowerThirdAndSupersPlan: LOWER_THIRD_AND_SUPERS_PLAN,
  accessibilityCaptionNote: ACCESSIBILITY_CAPTION_NOTE,
  transcriptReviewLane: TRANSCRIPT_REVIEW_LANE,
  audioCaptionBlockerMap: AUDIO_CAPTION_BLOCKER_MAP,
  voiceGenerationBlockedBoundary: VOICE_GENERATION_BLOCKED_BOUNDARY,
  captionExportBlockedBoundary: CAPTION_EXPORT_BLOCKED_BOUNDARY,
  deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries:
    DENIED_VOICEOVER_AND_CAPTION_PLANNING_WORKSPACE_BOUNDARIES,
};

const ALL_SECTION_IDS: readonly VoiceoverAndCaptionPlanningWorkspaceSectionId[] = [
  "voiceoverAndCaptionPlanningWorkspaceBoundary",
  "narrationBrief",
  "voiceToneAndPace",
  "voiceConsentAndRights",
  "audioCuePlanning",
  "captionStyleGuide",
  "subtitleTimingPlan",
  "lowerThirdAndSupersPlan",
  "accessibilityCaptionNote",
  "transcriptReviewLane",
  "audioCaptionBlockerMap",
  "voiceGenerationBlockedBoundary",
  "captionExportBlockedBoundary",
  "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries",
] as const;

const COCKPIT_SUMMARY: readonly VoiceoverAndCaptionPlanningWorkspaceItem[] = [
  {
    id: "narration-brief",
    label: "Narration brief",
    detail: "Shows simulated narrator role, message goal, tone note, duration target, and no voice generation state.",
    state: "review-only",
  },
  {
    id: "voice-tone-and-pace",
    label: "Voice tone and pace",
    detail: "Shows simulated tone, read pace, emphasis, pause notes, and backend workflow prerequisite.",
    state: "synthetic-only",
  },
  {
    id: "consent-and-rights",
    label: "Consent and rights",
    detail: "Requires backend-owned consent review, rights review, approval capture, and operator review.",
    state: "backend-owned",
  },
  {
    id: "audio-cues",
    label: "Audio cues",
    detail: "Plans synthetic intro cues, transition cues, mood notes, and rights notes without audio storage.",
    state: "backend-owned",
  },
  {
    id: "caption-style",
    label: "Caption style guide",
    detail: "Captures casing, placement, line length, readability, and export blocked state.",
    state: "backend-owned",
  },
  {
    id: "subtitle-timing",
    label: "Subtitle timing plan",
    detail: "Shows synthetic segment timing and reading speed notes without transcription or subtitle export.",
    state: "backend-owned",
  },
  {
    id: "lower-thirds",
    label: "Lower thirds and supers",
    detail: "Plans synthetic overlays while rendering, timeline persistence, and export stay blocked.",
    state: "blocked",
  },
  {
    id: "accessibility-notes",
    label: "Accessibility caption notes",
    detail: "Surfaces speaker labels, sound effect labels, contrast, reading speed, and approval need.",
    state: "review-only",
  },
  {
    id: "transcript-review",
    label: "Transcript review lane",
    detail: "Keeps transcript notes and corrections backend-owned without frontend transcript persistence.",
    state: "backend-owned",
  },
  {
    id: "audio-caption-blockers",
    label: "Audio caption blockers",
    detail: "Maps missing consent, music rights, transcript, caption review, and approval as synthetic blockers.",
    state: "blocked",
  },
  {
    id: "voice-generation-blocked",
    label: "Voice generation blocked",
    detail: "Frontend voice cloning, audio synthesis, provider calls, prompt sending, and consent persistence stay blocked.",
    state: "blocked",
  },
  {
    id: "caption-export-blocked",
    label: "Caption export blocked",
    detail: "Frontend subtitle export, caption file writes, transcription, downloads, artifacts, and publishing stay blocked.",
    state: "blocked",
  },
] as const;

const VOICEOVER_AND_CAPTION_PLANNING_WORKSPACE_MODEL: VoiceoverAndCaptionPlanningWorkspaceModel = {
  voiceoverAndCaptionPlanningWorkspaceId: "voiceover-and-caption-planning-workspace-v1",
  voiceoverAndCaptionPlanningWorkspaceKind: "voiceover-and-caption-planning-workspace-v1",
  narrationBrief: NARRATION_BRIEF,
  voiceToneAndPace: VOICE_TONE_AND_PACE,
  voiceConsentAndRights: VOICE_CONSENT_AND_RIGHTS,
  audioCuePlanning: AUDIO_CUE_PLANNING,
  captionStyleGuide: CAPTION_STYLE_GUIDE,
  subtitleTimingPlan: SUBTITLE_TIMING_PLAN,
  lowerThirdAndSupersPlan: LOWER_THIRD_AND_SUPERS_PLAN,
  accessibilityCaptionNote: ACCESSIBILITY_CAPTION_NOTE,
  transcriptReviewLane: TRANSCRIPT_REVIEW_LANE,
  audioCaptionBlockerMap: AUDIO_CAPTION_BLOCKER_MAP,
  voiceGenerationBlockedBoundary: VOICE_GENERATION_BLOCKED_BOUNDARY,
  captionExportBlockedBoundary: CAPTION_EXPORT_BLOCKED_BOUNDARY,
  deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries:
    DENIED_VOICEOVER_AND_CAPTION_PLANNING_WORKSPACE_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ROUTES: readonly VoiceoverAndCaptionPlanningWorkspaceRouteDefinition[] = [
  {
    slug: "voiceover-and-caption-planning-workspace-boundary",
    href: "/voiceover-and-caption-planning-workspace-boundary",
    phase: "Phase 1962",
    title: "Voiceover And Caption Planning Workspace Boundary",
    commandLabel: "Go to Voiceover And Caption Planning Workspace Boundary",
    summary:
      "Previews the voiceover and caption planning workspace boundary without frontend voice synthesis, cloning, transcription, caption export, rendering, provider calls, persistence, publishing, scheduling, or file mutation.",
    markerPhrases: [
      "Voiceover and caption planning workspace boundary",
      "Voiceover and caption planning workspace boundary does not synthesize voice clone voice transcribe audio burn captions export subtitles upload audio download audio render videos export files call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist voice scripts persist captions persist transcripts persist audio persist rights or write files from the UI",
      "Voiceover and caption planning workspace boundary requires explicit operator approval",
      "Voiceover and caption planning workspace boundary prepares deterministic synthetic voiceover and caption planning workflows without frontend audio generation transcription rendering export provider calls caption persistence audio persistence rights persistence or publishing",
      "Denied voiceover and caption planning workspace paths remain blocked",
      "Voiceover and caption planning workspace boundary checklist",
    ],
    sectionIds: [
      "voiceoverAndCaptionPlanningWorkspaceBoundary",
      "voiceGenerationBlockedBoundary",
      "captionExportBlockedBoundary",
      "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries",
    ],
    devOnly: true,
  },
  {
    slug: "narration-brief-preview",
    href: "/narration-brief-preview",
    phase: "Phase 1963",
    title: "Narration Brief Preview",
    commandLabel: "Go to Narration Brief Preview",
    summary:
      "Previews deterministic synthetic narration brief rows without voice synthesis, prompt sending, model calls, voice script persistence, or audio file creation.",
    markerPhrases: [
      "Narration brief preview",
      "Narration brief preview does not synthesize voice send prompts call models persist voice scripts or create audio files from the UI",
      "Narration brief preview requires deterministic synthetic narration planning rows only",
      "Narration brief preview shows simulated narrator role simulated message goal simulated tone note simulated duration target simulated no voice generation state and denied frontend persistence",
      "Denied narration brief paths remain blocked",
      "Narration brief checklist",
    ],
    sectionIds: ["narrationBrief", "voiceoverAndCaptionPlanningWorkspaceBoundary", "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "voice-tone-and-pace-preview",
    href: "/voice-tone-and-pace-preview",
    phase: "Phase 1964",
    title: "Voice Tone And Pace Preview",
    commandLabel: "Go to Voice Tone And Pace Preview",
    summary:
      "Previews synthetic voice tone and read pace planning without voice cloning, audio synthesis, voice provider calls, voice profile storage, or audio export.",
    markerPhrases: [
      "Voice tone and pace preview",
      "Voice tone and pace preview does not clone voices synthesize audio call voice providers store voice profiles or export audio from the UI",
      "Voice tone and pace preview requires deterministic synthetic voice planning only",
      "Voice tone and pace preview shows simulated voice tone simulated read pace simulated emphasis note simulated pause note simulated backend voice workflow prerequisite",
      "Denied voice tone and pace paths remain blocked",
      "Voice tone and pace checklist",
    ],
    sectionIds: ["voiceToneAndPace", "narrationBrief", "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "voice-consent-and-rights-preview",
    href: "/voice-consent-and-rights-preview",
    phase: "Phase 1965",
    title: "Voice Consent And Rights Preview",
    commandLabel: "Go to Voice Consent And Rights Preview",
    summary:
      "Previews backend-owned voice consent and rights review without consent clearance, voice licensing, likeness approval, rights persistence, or audio synthesis from the UI.",
    markerPhrases: [
      "Voice consent and rights preview",
      "Voice consent and rights preview does not clear consent license voices approve likeness use persist rights or synthesize audio from the UI",
      "Voice consent and rights preview requires backend-owned consent review rights review and approval capture",
      "Voice consent and rights preview shows simulated consent status simulated speaker approval note simulated rights note simulated likeness note simulated denied frontend rights persistence",
      "Denied voice consent and rights paths remain blocked",
      "Voice consent and rights checklist",
    ],
    sectionIds: ["voiceConsentAndRights", "voiceToneAndPace", "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "audio-cue-planning-preview",
    href: "/audio-cue-planning-preview",
    phase: "Phase 1966",
    title: "Audio Cue Planning Preview",
    commandLabel: "Go to Audio Cue Planning Preview",
    summary:
      "Previews backend-owned audio cue planning without audio upload, music download, sound synthesis, media storage, or music rights clearance from the UI.",
    markerPhrases: [
      "Audio cue planning preview",
      "Audio cue planning preview does not upload audio download music synthesize sounds store media or clear music rights from the UI",
      "Audio cue planning preview requires backend-owned audio storage rights review and approval",
      "Audio cue planning preview shows simulated intro cue simulated transition cue simulated music mood simulated rights note simulated audio persistence blocked state",
      "Denied audio cue planning paths remain blocked",
      "Audio cue planning checklist",
    ],
    sectionIds: ["audioCuePlanning", "voiceConsentAndRights", "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "caption-style-guide-preview",
    href: "/caption-style-guide-preview",
    phase: "Phase 1967",
    title: "Caption Style Guide Preview",
    commandLabel: "Go to Caption Style Guide Preview",
    summary:
      "Previews backend-owned caption style guide planning without caption burn-in, subtitle file export, caption persistence, or file writes from the UI.",
    markerPhrases: [
      "Caption style guide preview",
      "Caption style guide preview does not burn captions export subtitle files persist captions or write files from the UI",
      "Caption style guide preview requires backend-owned caption workflow before persistence",
      "Caption style guide preview shows simulated caption casing simulated caption placement simulated line length note simulated readability note simulated export blocked state",
      "Denied caption style guide paths remain blocked",
      "Caption style guide checklist",
    ],
    sectionIds: ["captionStyleGuide", "audioCuePlanning", "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "subtitle-timing-plan-preview",
    href: "/subtitle-timing-plan-preview",
    phase: "Phase 1968",
    title: "Subtitle Timing Plan Preview",
    commandLabel: "Go to Subtitle Timing Plan Preview",
    summary:
      "Previews backend-owned subtitle timing planning without audio transcription, subtitle alignment, srt writes, vtt export, or timing persistence.",
    markerPhrases: [
      "Subtitle timing plan preview",
      "Subtitle timing plan preview does not transcribe audio align subtitles write srt files export vtt files or persist timing from the UI",
      "Subtitle timing plan preview requires backend-owned caption timing workflow",
      "Subtitle timing plan preview shows simulated subtitle segment simulated timestamp note simulated reading speed note simulated sync risk simulated denied frontend export",
      "Denied subtitle timing plan paths remain blocked",
      "Subtitle timing plan checklist",
    ],
    sectionIds: ["subtitleTimingPlan", "captionStyleGuide", "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "lower-third-and-supers-plan-preview",
    href: "/lower-third-and-supers-plan-preview",
    phase: "Phase 1969",
    title: "Lower Third And Supers Plan Preview",
    commandLabel: "Go to Lower Third And Supers Plan Preview",
    summary:
      "Previews backend-owned lower third and supers planning without graphic rendering, overlay burn-in, video export, or timeline persistence.",
    markerPhrases: [
      "Lower third and supers plan preview",
      "Lower third and supers plan preview does not render graphics burn overlays export videos or persist timeline elements from the UI",
      "Lower third and supers plan preview requires backend-owned render and timeline workflow",
      "Lower third and supers plan preview shows simulated lower third simulated callout text simulated overlay timing simulated brand note simulated render blocked state",
      "Denied lower third and supers plan paths remain blocked",
      "Lower third and supers plan checklist",
    ],
    sectionIds: ["lowerThirdAndSupersPlan", "subtitleTimingPlan", "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "accessibility-caption-note-preview",
    href: "/accessibility-caption-note-preview",
    phase: "Phase 1970",
    title: "Accessibility Caption Note Preview",
    commandLabel: "Go to Accessibility Caption Note Preview",
    summary:
      "Previews backend-owned accessibility caption notes without audio transcription, caption generation, accessibility file persistence, or subtitle export.",
    markerPhrases: [
      "Accessibility caption note preview",
      "Accessibility caption note preview does not transcribe audio generate captions persist accessibility files or export subtitles from the UI",
      "Accessibility caption note preview requires backend-owned accessibility review and caption workflow",
      "Accessibility caption note preview shows simulated speaker label need simulated sound effect label simulated contrast note simulated reading speed note simulated approval requirement",
      "Denied accessibility caption note paths remain blocked",
      "Accessibility caption note checklist",
    ],
    sectionIds: ["accessibilityCaptionNote", "lowerThirdAndSupersPlan", "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "transcript-review-lane-preview",
    href: "/transcript-review-lane-preview",
    phase: "Phase 1971",
    title: "Transcript Review Lane Preview",
    commandLabel: "Go to Transcript Review Lane Preview",
    summary:
      "Previews backend-owned transcript review lanes without transcription, model calls, transcript persistence, file writes, or caption approval from the UI.",
    markerPhrases: [
      "Transcript review lane preview",
      "Transcript review lane preview does not transcribe audio call models persist transcripts write files or approve captions from the UI",
      "Transcript review lane preview requires backend-owned transcript workflow and approval capture",
      "Transcript review lane preview shows simulated transcript note simulated correction note simulated review owner simulated approval state simulated denied frontend transcript persistence",
      "Denied transcript review lane paths remain blocked",
      "Transcript review lane checklist",
    ],
    sectionIds: ["transcriptReviewLane", "accessibilityCaptionNote", "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "audio-caption-blocker-map-preview",
    href: "/audio-caption-blocker-map-preview",
    phase: "Phase 1972",
    title: "Audio Caption Blocker Map Preview",
    commandLabel: "Go to Audio Caption Blocker Map Preview",
    summary:
      "Previews deterministic synthetic audio and caption blocker rows without job creation, worker dispatch, queue persistence, consent review bypass, or rights review bypass.",
    markerPhrases: [
      "Audio caption blocker map preview",
      "Audio caption blocker map preview does not create jobs dispatch workers persist queues bypass consent review or bypass rights review from the UI",
      "Audio caption blocker map preview requires deterministic synthetic blocker rows only",
      "Audio caption blocker map preview shows simulated missing consent simulated missing music rights simulated missing transcript simulated missing caption review simulated missing approval and backend prerequisite",
      "Denied audio caption blocker map paths remain blocked",
      "Audio caption blocker map checklist",
    ],
    sectionIds: ["audioCaptionBlockerMap", "transcriptReviewLane", "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "voice-generation-blocked-boundary-preview",
    href: "/voice-generation-blocked-boundary-preview",
    phase: "Phase 1973",
    title: "Voice Generation Blocked Boundary Preview",
    commandLabel: "Go to Voice Generation Blocked Boundary Preview",
    summary:
      "Previews blocked frontend voice generation boundaries without voice cloning, audio synthesis, provider calls, model calls, prompt sending, audio persistence, or consent persistence.",
    markerPhrases: [
      "Voice generation blocked boundary preview",
      "Voice generation blocked boundary preview blocks frontend voice cloning frontend audio synthesis frontend provider calls frontend model calls frontend prompt sending frontend audio persistence and frontend consent persistence",
      "Voice generation blocked boundary preview requires backend-owned provider gateway consent review rights review approval capture and explicit operator approval",
      "Voice generation blocked boundary preview shows denied voice clone denied audio synthesis denied provider call denied prompt send denied audio persistence denied consent persistence and backend prerequisite",
      "Denied voice generation paths remain blocked",
      "Voice generation blocked boundary checklist",
    ],
    sectionIds: ["voiceGenerationBlockedBoundary", "audioCaptionBlockerMap", "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "caption-export-blocked-boundary-preview",
    href: "/caption-export-blocked-boundary-preview",
    phase: "Phase 1974",
    title: "Caption Export Blocked Boundary Preview",
    commandLabel: "Go to Caption Export Blocked Boundary Preview",
    summary:
      "Previews blocked frontend caption export boundaries without subtitle export, caption file writes, transcription, download, upload, artifact creation, or publishing.",
    markerPhrases: [
      "Caption export blocked boundary preview",
      "Caption export blocked boundary preview blocks frontend subtitle export frontend caption file write frontend transcription frontend download frontend upload frontend artifact creation and frontend publishing",
      "Caption export blocked boundary preview requires backend-owned caption workflow export service rights review approval capture and operator approval",
      "Caption export blocked boundary preview shows denied caption export denied subtitle file write denied transcription denied download denied artifact creation denied publish and approval requirement",
      "Denied caption export paths remain blocked",
      "Caption export blocked boundary checklist",
    ],
    sectionIds: ["captionExportBlockedBoundary", "voiceGenerationBlockedBoundary", "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-voiceover-and-caption-planning-summary",
    href: "/cockpit-voiceover-and-caption-planning-summary",
    phase: "Phase 1975",
    title: "Cockpit Voiceover And Caption Planning Summary",
    commandLabel: "Go to Cockpit Voiceover And Caption Planning Summary",
    summary:
      "Summarizes the review-only voiceover and caption planning workspace in the normal cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: [
      "Cockpit voiceover and caption planning summary",
      "Cockpit voiceover and caption planning summary keeps the cockpit as the normal user surface",
      "Cockpit voiceover and caption planning summary does not synthesize voice clone voice transcribe audio burn captions export subtitles upload audio download audio render videos export files call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist voice scripts persist captions persist transcripts persist audio persist rights or write files from the cockpit",
      "Cockpit voiceover and caption planning summary shows narration brief voice tone and pace consent and rights audio cues caption style subtitle timing lower thirds accessibility notes transcript review audio caption blockers voice generation blocked caption export blocked and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit voiceover and caption planning checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-voiceover-and-caption-planning-workspace-candidate",
    href: "/first-voiceover-and-caption-planning-workspace-candidate",
    phase: "Phase 1976",
    title: "First Voiceover And Caption Planning Workspace Candidate",
    commandLabel: "Go to First Voiceover And Caption Planning Workspace Candidate",
    summary:
      "Combines the first voiceover and caption planning workspace candidate without frontend voice generation, voice cloning, audio synthesis, transcription, caption export, subtitle generation, upload, download, rendering, export, provider calls, model calls, connector calls, persistence, publishing, scheduling, or file writes.",
    markerPhrases: [
      "First voiceover and caption planning workspace candidate",
      "First voiceover and caption planning workspace candidate does not enable voice generation voice cloning audio synthesis transcription caption export subtitle generation upload download rendering export provider calls model calls connector calls image generation video generation publishing scheduling file writes voice persistence caption persistence transcript persistence audio persistence rights persistence prompt persistence job persistence or approval persistence from the UI",
      "First voiceover and caption planning workspace candidate requires explicit operator approval",
      "Candidate combines narration brief voice tone and pace consent and rights audio cue planning caption style subtitle timing lower thirds accessibility notes transcript review blockers voice generation blocked caption export blocked cockpit summary and denied paths",
      "Denied first voiceover and caption planning workspace paths remain blocked",
      "First voiceover and caption planning workspace checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-voiceover-and-caption-planning-workspace-release-candidate",
    href: "/controlled-voiceover-and-caption-planning-workspace-release-candidate",
    phase: "Phase 1977",
    title: "Controlled Voiceover And Caption Planning Workspace Release Candidate",
    commandLabel: "Go to Controlled Voiceover And Caption Planning Workspace Release Candidate",
    summary:
      "Release candidate adds the Voiceover And Caption Planning Workspace as a review-only planning workspace without frontend voice generation, caption export, transcription, rendering, export, provider calls, model calls, audio persistence, caption persistence, rights persistence, prompt persistence, job persistence, approval persistence, publishing, scheduling, or file mutation.",
    markerPhrases: [
      "Controlled voiceover and caption planning workspace release candidate",
      "Controlled voiceover and caption planning workspace release candidate does not render videos export files upload assets download assets upload audio download audio store media synthesize voice clone voice transcribe audio burn captions export subtitles call providers call models call connectors generate images generate videos generate voice synthesize audio publish posts schedule content write files persist voice scripts persist captions persist transcripts persist audio persist assets persist rights persist prompts persist jobs persist approvals dispatch workers create queues create artifacts run commands spawn processes bind ports install packages deploy runtimes start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend",
      "Controlled voiceover and caption planning workspace release requires explicit operator approval",
      "Release candidate adds the Voiceover And Caption Planning Workspace as a review-only planning workspace without frontend voice generation caption export transcription rendering export provider calls model calls audio persistence caption persistence rights persistence prompt persistence job persistence approval persistence publishing scheduling or file mutation",
      "Denied controlled voiceover and caption planning workspace paths remain blocked",
      "Controlled voiceover and caption planning workspace checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

const ROUTE_LOOKUP: Record<
  VoiceoverAndCaptionPlanningWorkspaceRouteSlug,
  VoiceoverAndCaptionPlanningWorkspaceRouteDefinition
> = ROUTES.reduce(
  (accumulator, route) => {
    accumulator[route.slug] = route;
    return accumulator;
  },
  {} as Record<VoiceoverAndCaptionPlanningWorkspaceRouteSlug, VoiceoverAndCaptionPlanningWorkspaceRouteDefinition>
);

export function buildVoiceoverAndCaptionPlanningWorkspaceStableKey(parts: readonly string[]): string {
  return parts
    .map((part) =>
      part
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .join("--");
}

export function listVoiceoverAndCaptionPlanningWorkspaceRoutes(): readonly VoiceoverAndCaptionPlanningWorkspaceRouteDefinition[] {
  return ROUTES;
}

export function buildVoiceoverAndCaptionPlanningWorkspaceRouteModel(
  slug: VoiceoverAndCaptionPlanningWorkspaceRouteSlug = "controlled-voiceover-and-caption-planning-workspace-release-candidate"
): VoiceoverAndCaptionPlanningWorkspaceRouteModel {
  const route = ROUTE_LOOKUP[slug];
  const sections = route.sectionIds.map((sectionId) => SECTION_LOOKUP[sectionId]);

  return {
    route,
    voiceoverAndCaptionPlanningWorkspace: VOICEOVER_AND_CAPTION_PLANNING_WORKSPACE_MODEL,
    sections,
    diagnosticRoutes: ROUTES,
    cockpitMarkers: VOICEOVER_AND_CAPTION_PLANNING_WORKSPACE_COCKPIT_MARKERS,
    summary: route.summary,
  };
}

