export type ScriptAndStoryboardWorkspaceRouteSlug =
  | "script-and-storyboard-workspace-boundary"
  | "script-brief-intake-preview"
  | "hook-and-opening-beat-preview"
  | "scene-beat-outline-preview"
  | "storyboard-card-grid-preview"
  | "shot-intent-note-preview"
  | "visual-reference-planning-preview"
  | "b-roll-and-asset-note-preview"
  | "caption-and-supers-note-preview"
  | "review-comments-lane-preview"
  | "brand-and-rights-note-preview"
  | "model-generation-blocked-boundary-preview"
  | "storyboard-export-blocked-boundary-preview"
  | "cockpit-script-and-storyboard-summary"
  | "first-script-and-storyboard-workspace-candidate"
  | "controlled-script-and-storyboard-workspace-release-candidate";

export type ScriptAndStoryboardWorkspaceKind =
  | "script-and-storyboard-workspace-v1"
  | ScriptAndStoryboardWorkspaceRouteSlug;

export type ScriptAndStoryboardWorkspaceState =
  | "review-only"
  | "synthetic-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type ScriptAndStoryboardWorkspaceItem = {
  id: string;
  label: string;
  detail: string;
  state: ScriptAndStoryboardWorkspaceState;
};

export type ScriptAndStoryboardWorkspaceSectionId =
  | "scriptAndStoryboardWorkspaceBoundary"
  | "scriptBriefIntake"
  | "hookAndOpeningBeat"
  | "sceneBeatOutline"
  | "storyboardCardGrid"
  | "shotIntentNote"
  | "visualReferencePlanning"
  | "bRollAndAssetNote"
  | "captionAndSupersNote"
  | "reviewCommentsLane"
  | "brandAndRightsNote"
  | "modelGenerationBlockedBoundary"
  | "storyboardExportBlockedBoundary"
  | "deniedScriptAndStoryboardWorkspaceBoundaries";

export type ScriptAndStoryboardWorkspaceSection = {
  sectionId: ScriptAndStoryboardWorkspaceSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly ScriptAndStoryboardWorkspaceItem[];
  state: ScriptAndStoryboardWorkspaceState;
};

export type ScriptAndStoryboardWorkspaceModel = {
  scriptAndStoryboardWorkspaceId: string;
  scriptAndStoryboardWorkspaceKind: ScriptAndStoryboardWorkspaceKind;
  scriptBriefIntake: ScriptAndStoryboardWorkspaceSection;
  hookAndOpeningBeat: ScriptAndStoryboardWorkspaceSection;
  sceneBeatOutline: ScriptAndStoryboardWorkspaceSection;
  storyboardCardGrid: ScriptAndStoryboardWorkspaceSection;
  shotIntentNote: ScriptAndStoryboardWorkspaceSection;
  visualReferencePlanning: ScriptAndStoryboardWorkspaceSection;
  bRollAndAssetNote: ScriptAndStoryboardWorkspaceSection;
  captionAndSupersNote: ScriptAndStoryboardWorkspaceSection;
  reviewCommentsLane: ScriptAndStoryboardWorkspaceSection;
  brandAndRightsNote: ScriptAndStoryboardWorkspaceSection;
  modelGenerationBlockedBoundary: ScriptAndStoryboardWorkspaceSection;
  storyboardExportBlockedBoundary: ScriptAndStoryboardWorkspaceSection;
  deniedScriptAndStoryboardWorkspaceBoundaries: ScriptAndStoryboardWorkspaceSection;
  cockpitSummary: readonly ScriptAndStoryboardWorkspaceItem[];
  explicitSafetyLimits: readonly string[];
};

export type ScriptAndStoryboardWorkspaceRouteDefinition = {
  slug: ScriptAndStoryboardWorkspaceRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly ScriptAndStoryboardWorkspaceSectionId[];
  devOnly: boolean;
};

export type ScriptAndStoryboardWorkspaceRouteModel = {
  route: ScriptAndStoryboardWorkspaceRouteDefinition;
  scriptAndStoryboardWorkspace: ScriptAndStoryboardWorkspaceModel;
  sections: readonly ScriptAndStoryboardWorkspaceSection[];
  diagnosticRoutes: readonly ScriptAndStoryboardWorkspaceRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const SCRIPT_AND_STORYBOARD_WORKSPACE_COCKPIT_MARKERS = [
  "Script And Storyboard Workspace",
  "Script And Storyboard Workspace Boundary",
  "Script Brief Intake",
  "Hook And Opening Beat",
  "Scene Beat Outline",
  "Storyboard Card Grid",
  "Shot Intent Note",
  "Visual Reference Planning",
  "B-Roll And Asset Note",
  "Caption And Supers Note",
  "Review Comments Lane",
  "Brand And Rights Note",
  "Model Generation Blocked Boundary",
  "Storyboard Export Blocked Boundary",
  "Review-only script and storyboard workspace",
  "Synthetic data only",
  "No final script generation from the cockpit",
  "No storyboard image generation from the cockpit",
  "No video rendering from the cockpit",
  "No video export from the cockpit",
  "No asset upload from the cockpit",
  "No asset download from the cockpit",
  "No file generation from the cockpit",
  "No frontend file mutation",
  "No frontend script persistence",
  "No frontend storyboard persistence",
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
  "Backend-owned script persistence remains required",
  "Backend-owned storyboard persistence remains required",
  "Operator review remains required",
  "Explicit operator approval remains required",
] as const;

export const SCRIPT_AND_STORYBOARD_WORKSPACE_MODEL_FIELDS = [
  "scriptAndStoryboardWorkspaceId",
  "scriptAndStoryboardWorkspaceKind",
  "scriptBriefIntake",
  "hookAndOpeningBeat",
  "sceneBeatOutline",
  "storyboardCardGrid",
  "shotIntentNote",
  "visualReferencePlanning",
  "bRollAndAssetNote",
  "captionAndSupersNote",
  "reviewCommentsLane",
  "brandAndRightsNote",
  "modelGenerationBlockedBoundary",
  "storyboardExportBlockedBoundary",
  "deniedScriptAndStoryboardWorkspaceBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Script And Storyboard Workspace v1 is deterministic static review content only.",
  "This is not final script generation.",
  "This is not image generation.",
  "This is not storyboard image generation.",
  "This is not video rendering.",
  "This is not video export.",
  "This is not asset upload.",
  "This is not asset download.",
  "This is not frontend file generation.",
  "This is not frontend script persistence.",
  "This is not frontend storyboard persistence.",
  "This is not frontend asset persistence.",
  "This is not frontend prompt persistence.",
  "This is not frontend job persistence.",
  "This is not frontend approval persistence.",
  "This is not a provider call.",
  "This is not a model call.",
  "This is not a connector call.",
  "This is not prompt sending to external models.",
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
  "Backend-owned script persistence remains required.",
  "Backend-owned storyboard persistence remains required.",
  "Operator review remains required.",
  "Explicit operator approval remains required.",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic synthetic script and storyboard planning fixtures only.",
  "The script and storyboard workspace exposes review-only planning surfaces without frontend final script generation, storyboard image generation, video rendering, export, upload, download, provider calls, model calls, connector calls, prompt sending, persistence, publishing, scheduling, or file mutation.",
  "Future asset storage, render service, export service, provider gateway, rights review, approval capture, script persistence, and storyboard persistence remain backend-owned and explicitly approved.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No final script generation, storyboard image generation, video rendering, video export, asset upload, asset download, file generation, frontend file mutation, frontend script persistence, frontend storyboard persistence, frontend asset persistence, frontend approval persistence, frontend prompt persistence, frontend job persistence, provider calls, model calls, connector calls, image generation calls, video generation calls, voice generation calls, publishing, social posting, scheduling, copyright clearance, automated brand approval, render queue dispatch, worker dispatch, artifact persistence, command execution, process spawning, port binding, package install, runtime start, credential storage, localhost probing, browser storage write, or performance guarantee from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned asset storage remains required.",
  "Backend-owned render service remains required.",
  "Backend-owned export service remains required.",
  "Backend-owned provider gateway remains required.",
  "Backend-owned rights review remains required.",
  "Backend-owned approval capture remains required.",
  "Backend-owned script persistence remains required.",
  "Backend-owned storyboard persistence remains required.",
  "Operator review remains required.",
  "Explicit operator approval remains required.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly ScriptAndStoryboardWorkspaceItem[] {
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
  sectionId: ScriptAndStoryboardWorkspaceSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  checklistPrefix: string;
  checklistSummary: string;
  blocked: string;
  approval: string;
  state?: ScriptAndStoryboardWorkspaceState;
}): ScriptAndStoryboardWorkspaceSection {
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

const SCRIPT_AND_STORYBOARD_WORKSPACE_BOUNDARY = createSection({
  sectionId: "scriptAndStoryboardWorkspaceBoundary",
  label: "Script And Storyboard Workspace Boundary",
  title: "Deterministic Script And Storyboard Workspace Boundary",
  humanReadableSummary:
    "Script and storyboard workspace boundary prepares deterministic synthetic script and storyboard planning workflows without frontend generation, rendering, export, provider calls, asset persistence, or publishing.",
  plannedInputs: ["Synthetic workspace identity", "Synthetic safety limits", "Synthetic approval requirement", "Synthetic denied script and storyboard paths"],
  plannedOutputs: ["Script And Storyboard Workspace Boundary", "Review-only script and storyboard workspace", "Denied script and storyboard workspace paths", "Explicit operator approval required"],
  checklistPrefix: "script-and-storyboard-workspace-boundary",
  checklistSummary:
    "Script and storyboard workspace boundary prepares deterministic synthetic script and storyboard planning workflows without frontend generation rendering export provider calls asset persistence or publishing.",
  blocked:
    "Script and storyboard workspace boundary does not generate final scripts render videos export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist scripts persist storyboards or write files from the UI.",
  approval: "Script and storyboard workspace boundary requires explicit operator approval.",
  state: "needs-approval",
});

const SCRIPT_BRIEF_INTAKE = createSection({
  sectionId: "scriptBriefIntake",
  label: "Script Brief Intake",
  title: "Synthetic Script Brief Intake Preview",
  humanReadableSummary:
    "Script brief intake preview shows simulated video title, simulated objective, simulated target audience, simulated tone, simulated review status, and denied frontend persistence.",
  plannedInputs: ["Simulated video title", "Simulated objective", "Simulated target audience", "Simulated tone"],
  plannedOutputs: ["Script Brief Intake", "Simulated review status", "Denied frontend persistence", "Deterministic synthetic brief rows"],
  checklistPrefix: "script-brief-intake",
  checklistSummary:
    "Script brief intake preview shows simulated video title simulated objective simulated target audience simulated tone simulated review status and denied frontend persistence.",
  blocked: "Script brief intake preview does not persist briefs send prompts call models generate scripts or create files from the UI.",
  approval: "Script brief intake preview requires deterministic synthetic brief rows only.",
});

const HOOK_AND_OPENING_BEAT = createSection({
  sectionId: "hookAndOpeningBeat",
  label: "Hook And Opening Beat",
  title: "Synthetic Hook And Opening Beat Preview",
  humanReadableSummary:
    "Hook and opening beat preview shows simulated hook option, simulated opening question, simulated visual beat, simulated voice note, and simulated no model call state.",
  plannedInputs: ["Simulated hook option", "Simulated opening question", "Simulated visual beat", "Simulated voice note"],
  plannedOutputs: ["Hook And Opening Beat", "Simulated no model call state", "Deterministic opening beat planning", "Denied prompt and provider paths"],
  checklistPrefix: "hook-and-opening-beat",
  checklistSummary:
    "Hook and opening beat preview shows simulated hook option simulated opening question simulated visual beat simulated voice note simulated no model call state.",
  blocked: "Hook and opening beat preview does not generate final copy call providers persist prompts or publish content from the UI.",
  approval: "Hook and opening beat preview requires deterministic synthetic opening beat planning only.",
});

const SCENE_BEAT_OUTLINE = createSection({
  sectionId: "sceneBeatOutline",
  label: "Scene Beat Outline",
  title: "Synthetic Scene Beat Outline Preview",
  humanReadableSummary:
    "Scene beat outline preview shows simulated intro beat, simulated proof beat, simulated demo beat, simulated CTA beat, simulated review note, and denied frontend persistence.",
  plannedInputs: ["Simulated intro beat", "Simulated proof beat", "Simulated demo beat", "Simulated CTA beat"],
  plannedOutputs: ["Scene Beat Outline", "Simulated review note", "Denied frontend persistence", "Deterministic beat outline rows"],
  checklistPrefix: "scene-beat-outline",
  checklistSummary:
    "Scene beat outline preview shows simulated intro beat simulated proof beat simulated demo beat simulated CTA beat simulated review note and denied frontend persistence.",
  blocked: "Scene beat outline preview does not write scripts generate timelines persist outlines or create files from the UI.",
  approval: "Scene beat outline preview requires deterministic synthetic beat outlines only.",
});

const STORYBOARD_CARD_GRID = createSection({
  sectionId: "storyboardCardGrid",
  label: "Storyboard Card Grid",
  title: "Backend-Owned Storyboard Card Grid Preview",
  humanReadableSummary:
    "Storyboard card grid preview shows simulated scene card, simulated shot description, simulated overlay note, simulated transition note, and simulated image generation blocked state.",
  plannedInputs: ["Simulated scene card", "Simulated shot description", "Simulated overlay note", "Simulated transition note"],
  plannedOutputs: ["Storyboard Card Grid", "Simulated image generation blocked state", "Backend-owned storyboard workflow required", "Denied board export path"],
  checklistPrefix: "storyboard-card-grid",
  checklistSummary:
    "Storyboard card grid preview shows simulated scene card simulated shot description simulated overlay note simulated transition note simulated image generation blocked state.",
  blocked: "Storyboard card grid preview does not generate images call image providers persist storyboards or export boards from the UI.",
  approval: "Storyboard card grid preview requires backend-owned storyboard workflow before persistence.",
  state: "backend-owned",
});

const SHOT_INTENT_NOTE = createSection({
  sectionId: "shotIntentNote",
  label: "Shot Intent Note",
  title: "Synthetic Shot Intent Note Preview",
  humanReadableSummary:
    "Shot intent note preview shows simulated shot purpose, simulated framing note, simulated motion note, simulated duration target, and simulated backend storage prerequisite.",
  plannedInputs: ["Simulated shot purpose", "Simulated framing note", "Simulated motion note", "Simulated duration target"],
  plannedOutputs: ["Shot Intent Note", "Backend-owned storage prerequisite", "Deterministic shot planning", "Denied capture and upload paths"],
  checklistPrefix: "shot-intent-note",
  checklistSummary:
    "Shot intent note preview shows simulated shot purpose simulated framing note simulated motion note simulated duration target simulated backend storage prerequisite.",
  blocked: "Shot intent note preview does not capture camera footage upload assets transcode media or persist shot lists from the UI.",
  approval: "Shot intent note preview requires deterministic synthetic shot planning only.",
});

const VISUAL_REFERENCE_PLANNING = createSection({
  sectionId: "visualReferencePlanning",
  label: "Visual Reference Planning",
  title: "Backend-Owned Visual Reference Planning Preview",
  humanReadableSummary:
    "Visual reference planning preview shows simulated reference purpose, simulated source note, simulated rights note, simulated brand safety note, and simulated asset persistence blocked state.",
  plannedInputs: ["Simulated reference purpose", "Simulated source note", "Simulated rights note", "Simulated brand safety note"],
  plannedOutputs: ["Visual Reference Planning", "Asset persistence blocked state", "Backend-owned asset storage required", "Backend-owned rights review required"],
  checklistPrefix: "visual-reference-planning",
  checklistSummary:
    "Visual reference planning preview shows simulated reference purpose simulated source note simulated rights note simulated brand safety note simulated asset persistence blocked state.",
  blocked: "Visual reference planning preview does not download images upload references call providers generate images or store assets from the UI.",
  approval: "Visual reference planning preview requires backend-owned asset storage and rights review.",
  state: "backend-owned",
});

const B_ROLL_AND_ASSET_NOTE = createSection({
  sectionId: "bRollAndAssetNote",
  label: "B-Roll And Asset Note",
  title: "Backend-Owned B-Roll And Asset Note Preview",
  humanReadableSummary:
    "B-roll and asset note preview shows simulated b-roll need, simulated logo need, simulated product shot need, simulated music note, simulated storage prerequisite, and denied frontend persistence.",
  plannedInputs: ["Simulated b-roll need", "Simulated logo need", "Simulated product shot need", "Simulated music note"],
  plannedOutputs: ["B-Roll And Asset Note", "Simulated storage prerequisite", "Denied frontend persistence", "Backend-owned asset storage required"],
  checklistPrefix: "b-roll-and-asset-note",
  checklistSummary:
    "B-roll and asset note preview shows simulated b-roll need simulated logo need simulated product shot need simulated music note simulated storage prerequisite and denied frontend persistence.",
  blocked: "B-roll and asset note preview does not upload assets download assets store media mutate files or call asset providers from the UI.",
  approval: "B-roll and asset note preview requires backend-owned asset storage.",
  state: "backend-owned",
});

const CAPTION_AND_SUPERS_NOTE = createSection({
  sectionId: "captionAndSupersNote",
  label: "Caption And Supers Note",
  title: "Backend-Owned Caption And Supers Note Preview",
  humanReadableSummary:
    "Caption and supers note preview shows simulated caption style, simulated lower third note, simulated accessibility note, simulated subtitle target, and simulated export blocked state.",
  plannedInputs: ["Simulated caption style", "Simulated lower third note", "Simulated accessibility note", "Simulated subtitle target"],
  plannedOutputs: ["Caption And Supers Note", "Simulated export blocked state", "Backend-owned caption workflow required", "Denied subtitle file path"],
  checklistPrefix: "caption-and-supers-note",
  checklistSummary:
    "Caption and supers note preview shows simulated caption style simulated lower third note simulated accessibility note simulated subtitle target simulated export blocked state.",
  blocked: "Caption and supers note preview does not transcribe audio burn captions export subtitles or write caption files from the UI.",
  approval: "Caption and supers note preview requires backend-owned caption workflow.",
  state: "backend-owned",
});

const REVIEW_COMMENTS_LANE = createSection({
  sectionId: "reviewCommentsLane",
  label: "Review Comments Lane",
  title: "Backend-Owned Review Comments Lane Preview",
  humanReadableSummary:
    "Review comments lane preview shows simulated operator note, simulated brand note, simulated rights note, simulated script note, and simulated explicit approval requirement.",
  plannedInputs: ["Simulated operator note", "Simulated brand note", "Simulated rights note", "Simulated script note"],
  plannedOutputs: ["Review Comments Lane", "Explicit approval requirement", "Backend-owned review capture required", "Denied approval persistence"],
  checklistPrefix: "review-comments-lane",
  checklistSummary:
    "Review comments lane preview shows simulated operator note simulated brand note simulated rights note simulated script note simulated explicit approval requirement.",
  blocked: "Review comments lane preview does not persist comments approve scripts store approvals or dispatch workers from the UI.",
  approval: "Review comments lane preview requires backend-owned review and approval capture.",
  state: "backend-owned",
});

const BRAND_AND_RIGHTS_NOTE = createSection({
  sectionId: "brandAndRightsNote",
  label: "Brand And Rights Note",
  title: "Backend-Owned Brand And Rights Note Preview",
  humanReadableSummary:
    "Brand and rights note preview shows simulated brand check, simulated rights check, simulated music note, simulated attribution note, and simulated approval requirement.",
  plannedInputs: ["Simulated brand check", "Simulated rights check", "Simulated music note", "Simulated attribution note"],
  plannedOutputs: ["Brand And Rights Note", "Simulated approval requirement", "Backend-owned rights review required", "Operator approval required"],
  checklistPrefix: "brand-and-rights-note",
  checklistSummary:
    "Brand and rights note preview shows simulated brand check simulated rights check simulated music note simulated attribution note simulated approval requirement.",
  blocked: "Brand and rights note preview does not clear copyright license music approve brand use or publish content from the UI.",
  approval: "Brand and rights note preview requires backend-owned rights review and operator approval.",
  state: "backend-owned",
});

const MODEL_GENERATION_BLOCKED_BOUNDARY = createSection({
  sectionId: "modelGenerationBlockedBoundary",
  label: "Model Generation Blocked Boundary",
  title: "Frontend Model Generation Blocked Boundary Preview",
  humanReadableSummary:
    "Model generation blocked boundary preview shows denied prompt send, denied model call, denied provider call, denied connector call, denied generated script, and backend prerequisite.",
  plannedInputs: ["Denied prompt send", "Denied model call", "Denied provider call", "Denied connector call"],
  plannedOutputs: ["Model Generation Blocked Boundary", "Denied generated script", "Backend provider gateway prerequisite", "Explicit operator approval required"],
  checklistPrefix: "model-generation-blocked-boundary",
  checklistSummary:
    "Model generation blocked boundary preview shows denied prompt send denied model call denied provider call denied connector call denied generated script and backend prerequisite.",
  blocked:
    "Model generation blocked boundary preview blocks frontend prompt sending frontend model calls frontend provider calls frontend connector calls frontend script generation and frontend storyboard image generation.",
  approval:
    "Model generation blocked boundary preview requires backend-owned provider gateway prompt review approval capture and explicit operator approval.",
  state: "blocked",
});

const STORYBOARD_EXPORT_BLOCKED_BOUNDARY = createSection({
  sectionId: "storyboardExportBlockedBoundary",
  label: "Storyboard Export Blocked Boundary",
  title: "Frontend Storyboard Export Blocked Boundary Preview",
  humanReadableSummary:
    "Storyboard export blocked boundary preview shows denied storyboard export, denied download, denied upload, denied artifact creation, denied publish, and approval requirement.",
  plannedInputs: ["Denied storyboard export", "Denied download", "Denied upload", "Denied artifact creation"],
  plannedOutputs: ["Storyboard Export Blocked Boundary", "Denied publish", "Approval requirement", "Backend export service prerequisite"],
  checklistPrefix: "storyboard-export-blocked-boundary",
  checklistSummary:
    "Storyboard export blocked boundary preview shows denied storyboard export denied download denied upload denied artifact creation denied publish and approval requirement.",
  blocked:
    "Storyboard export blocked boundary preview blocks frontend export frontend download frontend file write frontend upload frontend artifact creation and frontend publishing.",
  approval:
    "Storyboard export blocked boundary preview requires backend-owned export service rights review approval capture and operator approval.",
  state: "blocked",
});

const DENIED_SCRIPT_AND_STORYBOARD_WORKSPACE_BOUNDARIES = createSection({
  sectionId: "deniedScriptAndStoryboardWorkspaceBoundaries",
  label: "Denied Script And Storyboard Workspace Boundaries",
  title: "Denied Script And Storyboard Workspace Paths",
  humanReadableSummary:
    "Denied script and storyboard workspace paths remain blocked for frontend generation, rendering, export, upload, download, persistence, provider calls, model calls, connector calls, publishing, scheduling, and file mutation.",
  plannedInputs: ["Denied frontend generation path", "Denied render path", "Denied export path", "Denied persistence path"],
  plannedOutputs: ["Denied script and storyboard workspace paths", "Backend-owned prerequisites", "Operator review requirement", "Explicit approval requirement"],
  checklistPrefix: "denied-script-and-storyboard-workspace",
  checklistSummary: "Denied script and storyboard workspace paths remain blocked.",
  blocked:
    "Denied script and storyboard workspace paths do not allow frontend scripts, storyboards, assets, prompts, jobs, approvals, exports, renders, uploads, downloads, publishing, scheduling, provider calls, model calls, connector calls, image generation calls, video generation calls, voice generation calls, command execution, or file writes.",
  approval: "Denied script and storyboard workspace paths require backend-owned services and explicit operator approval.",
  state: "blocked",
});

const COCKPIT_SUMMARY: readonly ScriptAndStoryboardWorkspaceItem[] = [
  {
    id: "script-brief-intake",
    label: "Script brief",
    detail: "Show script brief intake preview with deterministic synthetic title, objective, audience, tone, and review status only.",
    state: "review-only",
  },
  {
    id: "hook-and-opening-beat",
    label: "Hook and opening beat",
    detail: "Show hook and opening beat preview with simulated hook, opening question, visual beat, voice note, and no model call state.",
    state: "synthetic-only",
  },
  {
    id: "scene-beat-outline",
    label: "Scene beat outline",
    detail: "Show scene beat outline preview with intro, proof, demo, CTA, and review notes without writing scripts or timelines.",
    state: "synthetic-only",
  },
  {
    id: "storyboard-card-grid",
    label: "Storyboard card grid",
    detail: "Show storyboard cards with scene, shot, overlay, transition, and image generation blocked state.",
    state: "backend-owned",
  },
  {
    id: "shot-intent-visual-reference",
    label: "Shot and reference planning",
    detail: "Show shot intent notes and visual reference planning while backend-owned asset storage and rights review remain required.",
    state: "backend-owned",
  },
  {
    id: "asset-caption-review-rights",
    label: "Assets, captions, review, and rights",
    detail: "Show b-roll notes, caption notes, review comments, and brand rights notes without persistence or approval capture.",
    state: "backend-owned",
  },
  {
    id: "model-generation-blocked",
    label: "Model generation blocked",
    detail: "Frontend prompt sending, model calls, provider calls, connector calls, script generation, and storyboard image generation remain blocked.",
    state: "blocked",
  },
  {
    id: "storyboard-export-blocked",
    label: "Storyboard export blocked",
    detail: "Frontend export, download, upload, artifact creation, publishing, and file writes remain blocked.",
    state: "blocked",
  },
] as const;

const SECTION_LOOKUP: Record<ScriptAndStoryboardWorkspaceSectionId, ScriptAndStoryboardWorkspaceSection> = {
  scriptAndStoryboardWorkspaceBoundary: SCRIPT_AND_STORYBOARD_WORKSPACE_BOUNDARY,
  scriptBriefIntake: SCRIPT_BRIEF_INTAKE,
  hookAndOpeningBeat: HOOK_AND_OPENING_BEAT,
  sceneBeatOutline: SCENE_BEAT_OUTLINE,
  storyboardCardGrid: STORYBOARD_CARD_GRID,
  shotIntentNote: SHOT_INTENT_NOTE,
  visualReferencePlanning: VISUAL_REFERENCE_PLANNING,
  bRollAndAssetNote: B_ROLL_AND_ASSET_NOTE,
  captionAndSupersNote: CAPTION_AND_SUPERS_NOTE,
  reviewCommentsLane: REVIEW_COMMENTS_LANE,
  brandAndRightsNote: BRAND_AND_RIGHTS_NOTE,
  modelGenerationBlockedBoundary: MODEL_GENERATION_BLOCKED_BOUNDARY,
  storyboardExportBlockedBoundary: STORYBOARD_EXPORT_BLOCKED_BOUNDARY,
  deniedScriptAndStoryboardWorkspaceBoundaries: DENIED_SCRIPT_AND_STORYBOARD_WORKSPACE_BOUNDARIES,
};

const ALL_SECTION_IDS: readonly ScriptAndStoryboardWorkspaceSectionId[] = [
  "scriptAndStoryboardWorkspaceBoundary",
  "scriptBriefIntake",
  "hookAndOpeningBeat",
  "sceneBeatOutline",
  "storyboardCardGrid",
  "shotIntentNote",
  "visualReferencePlanning",
  "bRollAndAssetNote",
  "captionAndSupersNote",
  "reviewCommentsLane",
  "brandAndRightsNote",
  "modelGenerationBlockedBoundary",
  "storyboardExportBlockedBoundary",
  "deniedScriptAndStoryboardWorkspaceBoundaries",
] as const;

export const SCRIPT_AND_STORYBOARD_WORKSPACE_MODEL: ScriptAndStoryboardWorkspaceModel = {
  scriptAndStoryboardWorkspaceId: "script-and-storyboard-workspace-v1",
  scriptAndStoryboardWorkspaceKind: "script-and-storyboard-workspace-v1",
  scriptBriefIntake: SCRIPT_BRIEF_INTAKE,
  hookAndOpeningBeat: HOOK_AND_OPENING_BEAT,
  sceneBeatOutline: SCENE_BEAT_OUTLINE,
  storyboardCardGrid: STORYBOARD_CARD_GRID,
  shotIntentNote: SHOT_INTENT_NOTE,
  visualReferencePlanning: VISUAL_REFERENCE_PLANNING,
  bRollAndAssetNote: B_ROLL_AND_ASSET_NOTE,
  captionAndSupersNote: CAPTION_AND_SUPERS_NOTE,
  reviewCommentsLane: REVIEW_COMMENTS_LANE,
  brandAndRightsNote: BRAND_AND_RIGHTS_NOTE,
  modelGenerationBlockedBoundary: MODEL_GENERATION_BLOCKED_BOUNDARY,
  storyboardExportBlockedBoundary: STORYBOARD_EXPORT_BLOCKED_BOUNDARY,
  deniedScriptAndStoryboardWorkspaceBoundaries: DENIED_SCRIPT_AND_STORYBOARD_WORKSPACE_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ROUTES: readonly ScriptAndStoryboardWorkspaceRouteDefinition[] = [
  {
    slug: "script-and-storyboard-workspace-boundary",
    href: "/script-and-storyboard-workspace-boundary",
    phase: "Phase 1930",
    title: "Script And Storyboard Workspace Boundary",
    commandLabel: "Go to Script And Storyboard Workspace Boundary",
    summary:
      "Previews the script and storyboard workspace boundary without final script generation, rendering, export, provider calls, model calls, connector calls, asset persistence, or publishing.",
    markerPhrases: [
      "Script and storyboard workspace boundary",
      "Script and storyboard workspace boundary does not generate final scripts render videos export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist scripts persist storyboards or write files from the UI",
      "Script and storyboard workspace boundary requires explicit operator approval",
      "Script and storyboard workspace boundary prepares deterministic synthetic script and storyboard planning workflows without frontend generation rendering export provider calls asset persistence or publishing",
      "Denied script and storyboard workspace paths remain blocked",
      "Script and storyboard workspace boundary checklist",
    ],
    sectionIds: ["scriptAndStoryboardWorkspaceBoundary", "deniedScriptAndStoryboardWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "script-brief-intake-preview",
    href: "/script-brief-intake-preview",
    phase: "Phase 1931",
    title: "Script Brief Intake Preview",
    commandLabel: "Go to Script Brief Intake Preview",
    summary:
      "Previews deterministic synthetic script brief intake rows without brief persistence, prompt sending, model calls, script generation, or file creation.",
    markerPhrases: [
      "Script brief intake preview",
      "Script brief intake preview does not persist briefs send prompts call models generate scripts or create files from the UI",
      "Script brief intake preview requires deterministic synthetic brief rows only",
      "Script brief intake preview shows simulated video title simulated objective simulated target audience simulated tone simulated review status and denied frontend persistence",
      "Denied script brief intake paths remain blocked",
      "Script brief intake checklist",
    ],
    sectionIds: ["scriptBriefIntake", "scriptAndStoryboardWorkspaceBoundary", "deniedScriptAndStoryboardWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "hook-and-opening-beat-preview",
    href: "/hook-and-opening-beat-preview",
    phase: "Phase 1932",
    title: "Hook And Opening Beat Preview",
    commandLabel: "Go to Hook And Opening Beat Preview",
    summary:
      "Previews deterministic synthetic opening beat planning without final copy generation, provider calls, prompt persistence, or publishing.",
    markerPhrases: [
      "Hook and opening beat preview",
      "Hook and opening beat preview does not generate final copy call providers persist prompts or publish content from the UI",
      "Hook and opening beat preview requires deterministic synthetic opening beat planning only",
      "Hook and opening beat preview shows simulated hook option simulated opening question simulated visual beat simulated voice note simulated no model call state",
      "Denied hook and opening beat paths remain blocked",
      "Hook and opening beat checklist",
    ],
    sectionIds: ["hookAndOpeningBeat", "scriptBriefIntake", "deniedScriptAndStoryboardWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "scene-beat-outline-preview",
    href: "/scene-beat-outline-preview",
    phase: "Phase 1933",
    title: "Scene Beat Outline Preview",
    commandLabel: "Go to Scene Beat Outline Preview",
    summary:
      "Previews deterministic synthetic scene beat outlines without script writes, timeline generation, outline persistence, or file creation.",
    markerPhrases: [
      "Scene beat outline preview",
      "Scene beat outline preview does not write scripts generate timelines persist outlines or create files from the UI",
      "Scene beat outline preview requires deterministic synthetic beat outlines only",
      "Scene beat outline preview shows simulated intro beat simulated proof beat simulated demo beat simulated CTA beat simulated review note and denied frontend persistence",
      "Denied scene beat outline paths remain blocked",
      "Scene beat outline checklist",
    ],
    sectionIds: ["sceneBeatOutline", "hookAndOpeningBeat", "deniedScriptAndStoryboardWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "storyboard-card-grid-preview",
    href: "/storyboard-card-grid-preview",
    phase: "Phase 1934",
    title: "Storyboard Card Grid Preview",
    commandLabel: "Go to Storyboard Card Grid Preview",
    summary:
      "Previews backend-owned storyboard card grid planning without image generation, image provider calls, storyboard persistence, or board export.",
    markerPhrases: [
      "Storyboard card grid preview",
      "Storyboard card grid preview does not generate images call image providers persist storyboards or export boards from the UI",
      "Storyboard card grid preview requires backend-owned storyboard workflow before persistence",
      "Storyboard card grid preview shows simulated scene card simulated shot description simulated overlay note simulated transition note simulated image generation blocked state",
      "Denied storyboard card grid paths remain blocked",
      "Storyboard card grid checklist",
    ],
    sectionIds: ["storyboardCardGrid", "sceneBeatOutline", "deniedScriptAndStoryboardWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "shot-intent-note-preview",
    href: "/shot-intent-note-preview",
    phase: "Phase 1935",
    title: "Shot Intent Note Preview",
    commandLabel: "Go to Shot Intent Note Preview",
    summary:
      "Previews deterministic synthetic shot intent notes without camera capture, asset upload, media transcode, or shot list persistence.",
    markerPhrases: [
      "Shot intent note preview",
      "Shot intent note preview does not capture camera footage upload assets transcode media or persist shot lists from the UI",
      "Shot intent note preview requires deterministic synthetic shot planning only",
      "Shot intent note preview shows simulated shot purpose simulated framing note simulated motion note simulated duration target simulated backend storage prerequisite",
      "Denied shot intent note paths remain blocked",
      "Shot intent note checklist",
    ],
    sectionIds: ["shotIntentNote", "storyboardCardGrid", "deniedScriptAndStoryboardWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "visual-reference-planning-preview",
    href: "/visual-reference-planning-preview",
    phase: "Phase 1936",
    title: "Visual Reference Planning Preview",
    commandLabel: "Go to Visual Reference Planning Preview",
    summary:
      "Previews backend-owned visual reference planning without image download, reference upload, provider calls, image generation, or asset storage from the UI.",
    markerPhrases: [
      "Visual reference planning preview",
      "Visual reference planning preview does not download images upload references call providers generate images or store assets from the UI",
      "Visual reference planning preview requires backend-owned asset storage and rights review",
      "Visual reference planning preview shows simulated reference purpose simulated source note simulated rights note simulated brand safety note simulated asset persistence blocked state",
      "Denied visual reference planning paths remain blocked",
      "Visual reference planning checklist",
    ],
    sectionIds: ["visualReferencePlanning", "shotIntentNote", "deniedScriptAndStoryboardWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "b-roll-and-asset-note-preview",
    href: "/b-roll-and-asset-note-preview",
    phase: "Phase 1937",
    title: "B-Roll And Asset Note Preview",
    commandLabel: "Go to B-Roll And Asset Note Preview",
    summary:
      "Previews backend-owned b-roll and asset notes without asset upload, download, media storage, file mutation, or asset provider calls.",
    markerPhrases: [
      "B-roll and asset note preview",
      "B-roll and asset note preview does not upload assets download assets store media mutate files or call asset providers from the UI",
      "B-roll and asset note preview requires backend-owned asset storage",
      "B-roll and asset note preview shows simulated b-roll need simulated logo need simulated product shot need simulated music note simulated storage prerequisite and denied frontend persistence",
      "Denied b-roll and asset note paths remain blocked",
      "B-roll and asset note checklist",
    ],
    sectionIds: ["bRollAndAssetNote", "visualReferencePlanning", "deniedScriptAndStoryboardWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "caption-and-supers-note-preview",
    href: "/caption-and-supers-note-preview",
    phase: "Phase 1938",
    title: "Caption And Supers Note Preview",
    commandLabel: "Go to Caption And Supers Note Preview",
    summary:
      "Previews backend-owned caption and supers notes without transcription, caption burn-in, subtitle export, or caption file writes.",
    markerPhrases: [
      "Caption and supers note preview",
      "Caption and supers note preview does not transcribe audio burn captions export subtitles or write caption files from the UI",
      "Caption and supers note preview requires backend-owned caption workflow",
      "Caption and supers note preview shows simulated caption style simulated lower third note simulated accessibility note simulated subtitle target simulated export blocked state",
      "Denied caption and supers note paths remain blocked",
      "Caption and supers note checklist",
    ],
    sectionIds: ["captionAndSupersNote", "bRollAndAssetNote", "deniedScriptAndStoryboardWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "review-comments-lane-preview",
    href: "/review-comments-lane-preview",
    phase: "Phase 1939",
    title: "Review Comments Lane Preview",
    commandLabel: "Go to Review Comments Lane Preview",
    summary:
      "Previews backend-owned review comments lanes without comment persistence, script approval, approval storage, or worker dispatch.",
    markerPhrases: [
      "Review comments lane preview",
      "Review comments lane preview does not persist comments approve scripts store approvals or dispatch workers from the UI",
      "Review comments lane preview requires backend-owned review and approval capture",
      "Review comments lane preview shows simulated operator note simulated brand note simulated rights note simulated script note simulated explicit approval requirement",
      "Denied review comments lane paths remain blocked",
      "Review comments lane checklist",
    ],
    sectionIds: ["reviewCommentsLane", "captionAndSupersNote", "deniedScriptAndStoryboardWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "brand-and-rights-note-preview",
    href: "/brand-and-rights-note-preview",
    phase: "Phase 1940",
    title: "Brand And Rights Note Preview",
    commandLabel: "Go to Brand And Rights Note Preview",
    summary:
      "Previews backend-owned brand and rights notes without copyright clearance, music licensing, brand approval, or publishing.",
    markerPhrases: [
      "Brand and rights note preview",
      "Brand and rights note preview does not clear copyright license music approve brand use or publish content from the UI",
      "Brand and rights note preview requires backend-owned rights review and operator approval",
      "Brand and rights note preview shows simulated brand check simulated rights check simulated music note simulated attribution note simulated approval requirement",
      "Denied brand and rights note paths remain blocked",
      "Brand and rights note checklist",
    ],
    sectionIds: ["brandAndRightsNote", "reviewCommentsLane", "deniedScriptAndStoryboardWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "model-generation-blocked-boundary-preview",
    href: "/model-generation-blocked-boundary-preview",
    phase: "Phase 1941",
    title: "Model Generation Blocked Boundary Preview",
    commandLabel: "Go to Model Generation Blocked Boundary Preview",
    summary:
      "Previews blocked frontend model generation boundaries without prompt sending, model calls, provider calls, connector calls, script generation, or storyboard image generation.",
    markerPhrases: [
      "Model generation blocked boundary preview",
      "Model generation blocked boundary preview blocks frontend prompt sending frontend model calls frontend provider calls frontend connector calls frontend script generation and frontend storyboard image generation",
      "Model generation blocked boundary preview requires backend-owned provider gateway prompt review approval capture and explicit operator approval",
      "Model generation blocked boundary preview shows denied prompt send denied model call denied provider call denied connector call denied generated script and backend prerequisite",
      "Denied model generation paths remain blocked",
      "Model generation blocked boundary checklist",
    ],
    sectionIds: ["modelGenerationBlockedBoundary", "brandAndRightsNote", "deniedScriptAndStoryboardWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "storyboard-export-blocked-boundary-preview",
    href: "/storyboard-export-blocked-boundary-preview",
    phase: "Phase 1942",
    title: "Storyboard Export Blocked Boundary Preview",
    commandLabel: "Go to Storyboard Export Blocked Boundary Preview",
    summary:
      "Previews blocked storyboard export boundaries without frontend export, download, file write, upload, artifact creation, or publishing.",
    markerPhrases: [
      "Storyboard export blocked boundary preview",
      "Storyboard export blocked boundary preview blocks frontend export frontend download frontend file write frontend upload frontend artifact creation and frontend publishing",
      "Storyboard export blocked boundary preview requires backend-owned export service rights review approval capture and operator approval",
      "Storyboard export blocked boundary preview shows denied storyboard export denied download denied upload denied artifact creation denied publish and approval requirement",
      "Denied storyboard export paths remain blocked",
      "Storyboard export blocked boundary checklist",
    ],
    sectionIds: ["storyboardExportBlockedBoundary", "modelGenerationBlockedBoundary", "deniedScriptAndStoryboardWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-script-and-storyboard-summary",
    href: "/cockpit-script-and-storyboard-summary",
    phase: "Phase 1943",
    title: "Cockpit Script And Storyboard Summary",
    commandLabel: "Go to Cockpit Script And Storyboard Summary",
    summary:
      "Summarizes the review-only script and storyboard workspace as the first useful video planning surface in the normal cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: [
      "Cockpit script and storyboard summary",
      "Cockpit script and storyboard summary keeps the cockpit as the normal user surface",
      "Cockpit script and storyboard summary does not generate final scripts render videos export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist scripts persist storyboards or write files from the cockpit",
      "Cockpit script and storyboard summary shows script brief hook and opening beat scene outline storyboard card grid shot intent visual references b-roll and asset notes captions and supers review comments brand and rights notes model generation blocked storyboard export blocked and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit script and storyboard checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-script-and-storyboard-workspace-candidate",
    href: "/first-script-and-storyboard-workspace-candidate",
    phase: "Phase 1944",
    title: "First Script And Storyboard Workspace Candidate",
    commandLabel: "Go to First Script And Storyboard Workspace Candidate",
    summary:
      "Combines the first script and storyboard workspace candidate without frontend generation, rendering, export, upload, download, provider calls, model calls, connector calls, persistence, publishing, scheduling, or file writes.",
    markerPhrases: [
      "First script and storyboard workspace candidate",
      "First script and storyboard workspace candidate does not enable final script generation rendering export upload download provider calls model calls connector calls image generation video generation voice generation publishing scheduling file writes script persistence storyboard persistence asset persistence prompt persistence job persistence or approval persistence from the UI",
      "First script and storyboard workspace candidate requires explicit operator approval",
      "Candidate combines script brief intake hook and opening beat scene outline storyboard card grid shot intent visual references b-roll and asset notes captions review comments brand and rights model generation blocked storyboard export blocked cockpit summary and denied paths",
      "Denied first script and storyboard workspace paths remain blocked",
      "First script and storyboard workspace checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-script-and-storyboard-workspace-release-candidate",
    href: "/controlled-script-and-storyboard-workspace-release-candidate",
    phase: "Phase 1945",
    title: "Controlled Script And Storyboard Workspace Release Candidate",
    commandLabel: "Go to Controlled Script And Storyboard Workspace Release Candidate",
    summary:
      "Release candidate adds the Script And Storyboard Workspace as a review-only planning workspace without frontend generation, rendering, export, provider calls, model calls, asset persistence, prompt persistence, job persistence, approval persistence, publishing, scheduling, or file mutation.",
    markerPhrases: [
      "Controlled script and storyboard workspace release candidate",
      "Controlled script and storyboard workspace release candidate does not render videos export files upload assets download assets call providers call models call connectors generate final scripts generate images generate videos generate voice synthesize audio publish posts schedule content write files persist scripts persist storyboards persist assets persist prompts persist jobs persist approvals dispatch workers create queues create artifacts run commands spawn processes bind ports install packages deploy runtimes start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend",
      "Controlled script and storyboard workspace release requires explicit operator approval",
      "Release candidate adds the Script And Storyboard Workspace as a review-only planning workspace without frontend generation rendering export provider calls model calls asset persistence prompt persistence job persistence approval persistence publishing scheduling or file mutation",
      "Denied controlled script and storyboard workspace paths remain blocked",
      "Controlled script and storyboard workspace checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

const ROUTE_LOOKUP: Record<ScriptAndStoryboardWorkspaceRouteSlug, ScriptAndStoryboardWorkspaceRouteDefinition> =
  ROUTES.reduce(
    (accumulator, route) => {
      accumulator[route.slug] = route;
      return accumulator;
    },
    {} as Record<ScriptAndStoryboardWorkspaceRouteSlug, ScriptAndStoryboardWorkspaceRouteDefinition>
  );

export function buildScriptAndStoryboardWorkspaceStableKey(parts: readonly string[]): string {
  return parts
    .map((part) =>
      part
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .join("--");
}

export function listScriptAndStoryboardWorkspaceRoutes(): readonly ScriptAndStoryboardWorkspaceRouteDefinition[] {
  return ROUTES;
}

export function buildScriptAndStoryboardWorkspaceRouteModel(
  slug: ScriptAndStoryboardWorkspaceRouteSlug = "controlled-script-and-storyboard-workspace-release-candidate"
): ScriptAndStoryboardWorkspaceRouteModel {
  const route = ROUTE_LOOKUP[slug];
  const sections = route.sectionIds.map((sectionId) => SECTION_LOOKUP[sectionId]);

  return {
    route,
    scriptAndStoryboardWorkspace: SCRIPT_AND_STORYBOARD_WORKSPACE_MODEL,
    sections,
    diagnosticRoutes: ROUTES,
    cockpitMarkers: SCRIPT_AND_STORYBOARD_WORKSPACE_COCKPIT_MARKERS,
    summary: route.summary,
  };
}
