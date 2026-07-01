export type AssetAndShotPlanningWorkspaceRouteSlug =
  | "asset-and-shot-planning-workspace-boundary"
  | "shot-list-planning-preview"
  | "scene-asset-map-preview"
  | "b-roll-requirement-preview"
  | "product-shot-requirement-preview"
  | "visual-reference-board-preview"
  | "music-and-audio-asset-note-preview"
  | "brand-asset-checklist-preview"
  | "rights-and-source-status-preview"
  | "missing-asset-blocker-preview"
  | "asset-handoff-packet-preview"
  | "asset-upload-blocked-boundary-preview"
  | "asset-download-blocked-boundary-preview"
  | "cockpit-asset-and-shot-planning-summary"
  | "first-asset-and-shot-planning-workspace-candidate"
  | "controlled-asset-and-shot-planning-workspace-release-candidate";

export type AssetAndShotPlanningWorkspaceKind =
  | "asset-and-shot-planning-workspace-v1"
  | AssetAndShotPlanningWorkspaceRouteSlug;

export type AssetAndShotPlanningWorkspaceState =
  | "review-only"
  | "synthetic-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type AssetAndShotPlanningWorkspaceItem = {
  id: string;
  label: string;
  detail: string;
  state: AssetAndShotPlanningWorkspaceState;
};

export type AssetAndShotPlanningWorkspaceSectionId =
  | "assetAndShotPlanningWorkspaceBoundary"
  | "shotListPlanning"
  | "sceneAssetMap"
  | "bRollRequirement"
  | "productShotRequirement"
  | "visualReferenceBoard"
  | "musicAndAudioAssetNote"
  | "brandAssetChecklist"
  | "rightsAndSourceStatus"
  | "missingAssetBlocker"
  | "assetHandoffPacket"
  | "assetUploadBlockedBoundary"
  | "assetDownloadBlockedBoundary"
  | "deniedAssetAndShotPlanningWorkspaceBoundaries";

export type AssetAndShotPlanningWorkspaceSection = {
  sectionId: AssetAndShotPlanningWorkspaceSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly AssetAndShotPlanningWorkspaceItem[];
  state: AssetAndShotPlanningWorkspaceState;
};

export type AssetAndShotPlanningWorkspaceModel = {
  assetAndShotPlanningWorkspaceId: string;
  assetAndShotPlanningWorkspaceKind: AssetAndShotPlanningWorkspaceKind;
  shotListPlanning: AssetAndShotPlanningWorkspaceSection;
  sceneAssetMap: AssetAndShotPlanningWorkspaceSection;
  bRollRequirement: AssetAndShotPlanningWorkspaceSection;
  productShotRequirement: AssetAndShotPlanningWorkspaceSection;
  visualReferenceBoard: AssetAndShotPlanningWorkspaceSection;
  musicAndAudioAssetNote: AssetAndShotPlanningWorkspaceSection;
  brandAssetChecklist: AssetAndShotPlanningWorkspaceSection;
  rightsAndSourceStatus: AssetAndShotPlanningWorkspaceSection;
  missingAssetBlocker: AssetAndShotPlanningWorkspaceSection;
  assetHandoffPacket: AssetAndShotPlanningWorkspaceSection;
  assetUploadBlockedBoundary: AssetAndShotPlanningWorkspaceSection;
  assetDownloadBlockedBoundary: AssetAndShotPlanningWorkspaceSection;
  deniedAssetAndShotPlanningWorkspaceBoundaries: AssetAndShotPlanningWorkspaceSection;
  cockpitSummary: readonly AssetAndShotPlanningWorkspaceItem[];
  explicitSafetyLimits: readonly string[];
};

export type AssetAndShotPlanningWorkspaceRouteDefinition = {
  slug: AssetAndShotPlanningWorkspaceRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly AssetAndShotPlanningWorkspaceSectionId[];
  devOnly: boolean;
};

export type AssetAndShotPlanningWorkspaceRouteModel = {
  route: AssetAndShotPlanningWorkspaceRouteDefinition;
  assetAndShotPlanningWorkspace: AssetAndShotPlanningWorkspaceModel;
  sections: readonly AssetAndShotPlanningWorkspaceSection[];
  diagnosticRoutes: readonly AssetAndShotPlanningWorkspaceRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const ASSET_AND_SHOT_PLANNING_WORKSPACE_COCKPIT_MARKERS = [
  "Asset And Shot Planning Workspace",
  "Asset And Shot Planning Workspace Boundary",
  "Shot List Planning",
  "Scene Asset Map",
  "B-Roll Requirement",
  "Product Shot Requirement",
  "Visual Reference Board",
  "Music And Audio Asset Note",
  "Brand Asset Checklist",
  "Rights And Source Status",
  "Missing Asset Blocker",
  "Asset Handoff Packet",
  "Asset Upload Blocked Boundary",
  "Asset Download Blocked Boundary",
  "Review-only asset and shot planning workspace",
  "Synthetic data only",
  "No asset upload from the cockpit",
  "No asset download from the cockpit",
  "No media storage from the cockpit",
  "No video rendering from the cockpit",
  "No video export from the cockpit",
  "No image generation from the cockpit",
  "No file generation from the cockpit",
  "No frontend file mutation",
  "No frontend script persistence",
  "No frontend storyboard persistence",
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

export const ASSET_AND_SHOT_PLANNING_WORKSPACE_MODEL_FIELDS = [
  "assetAndShotPlanningWorkspaceId",
  "assetAndShotPlanningWorkspaceKind",
  "shotListPlanning",
  "sceneAssetMap",
  "bRollRequirement",
  "productShotRequirement",
  "visualReferenceBoard",
  "musicAndAudioAssetNote",
  "brandAssetChecklist",
  "rightsAndSourceStatus",
  "missingAssetBlocker",
  "assetHandoffPacket",
  "assetUploadBlockedBoundary",
  "assetDownloadBlockedBoundary",
  "deniedAssetAndShotPlanningWorkspaceBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Asset And Shot Planning Workspace v1 is deterministic static review content only.",
  "This is not asset upload.",
  "This is not asset download.",
  "This is not media storage.",
  "This is not image generation.",
  "This is not video rendering.",
  "This is not video export.",
  "This is not file generation.",
  "This is not provider execution.",
  "This is not model execution.",
  "This is not connector execution.",
  "This is not prompt sending to external models.",
  "This is not publishing.",
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
  "Static deterministic synthetic asset and shot planning fixtures only.",
  "The asset and shot planning workspace exposes review-only planning surfaces without frontend upload, download, media storage, video rendering, video export, image generation, provider calls, model calls, connector calls, prompt sending, persistence, publishing, scheduling, or file mutation.",
  "Future asset storage, render service, export service, provider gateway, rights review, approval capture, script persistence, and storyboard persistence remain backend-owned and explicitly approved.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No asset upload, asset download, media storage, video rendering, video export, image generation, file generation, frontend file mutation, frontend script persistence, frontend storyboard persistence, frontend asset persistence, frontend rights persistence, frontend approval persistence, frontend prompt persistence, frontend job persistence, provider calls, model calls, connector calls, image generation calls, video generation calls, voice generation calls, publishing, social posting, scheduling, copyright clearance, automated brand approval, render queue dispatch, worker dispatch, artifact persistence, command execution, process spawning, port binding, package install, runtime start, credential storage, localhost probing, browser storage write, or performance guarantee from the UI.",
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
): readonly AssetAndShotPlanningWorkspaceItem[] {
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
  sectionId: AssetAndShotPlanningWorkspaceSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  checklistPrefix: string;
  checklistSummary: string;
  blocked: string;
  approval: string;
  state?: AssetAndShotPlanningWorkspaceState;
}): AssetAndShotPlanningWorkspaceSection {
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

const ASSET_AND_SHOT_PLANNING_WORKSPACE_BOUNDARY = createSection({
  sectionId: "assetAndShotPlanningWorkspaceBoundary",
  label: "Asset And Shot Planning Workspace Boundary",
  title: "Deterministic Asset And Shot Planning Workspace Boundary",
  humanReadableSummary:
    "Asset and shot planning workspace boundary prepares deterministic synthetic asset and shot planning workflows without frontend upload, download, rendering, export, provider calls, asset persistence, rights persistence, or publishing.",
  plannedInputs: ["Synthetic workspace identity", "Synthetic safety limits", "Synthetic approval requirement", "Synthetic denied asset and shot paths"],
  plannedOutputs: ["Asset And Shot Planning Workspace Boundary", "Review-only asset and shot planning workspace", "Denied asset and shot planning workspace paths", "Explicit operator approval required"],
  checklistPrefix: "asset-and-shot-planning-workspace-boundary",
  checklistSummary:
    "Asset and shot planning workspace boundary prepares deterministic synthetic asset and shot planning workflows without frontend upload download rendering export provider calls asset persistence rights persistence or publishing.",
  blocked:
    "Asset and shot planning workspace boundary does not upload assets download assets store media render videos export files call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist scripts persist storyboards persist assets persist rights or write files from the UI.",
  approval: "Asset and shot planning workspace boundary requires explicit operator approval.",
  state: "needs-approval",
});

const SHOT_LIST_PLANNING = createSection({
  sectionId: "shotListPlanning",
  label: "Shot List Planning",
  title: "Synthetic Shot List Planning Preview",
  humanReadableSummary:
    "Shot list planning preview shows simulated shot name, simulated framing note, simulated motion note, simulated duration target, and simulated backend storage prerequisite.",
  plannedInputs: ["Simulated shot name", "Simulated framing note", "Simulated motion note", "Simulated duration target"],
  plannedOutputs: ["Shot List Planning", "Backend storage prerequisite", "Deterministic shot planning rows", "Denied capture and persistence paths"],
  checklistPrefix: "shot-list-planning",
  checklistSummary:
    "Shot list planning preview shows simulated shot name simulated framing note simulated motion note simulated duration target simulated backend storage prerequisite.",
  blocked:
    "Shot list planning preview does not capture footage upload media transcode files persist shot lists or create files from the UI.",
  approval: "Shot list planning preview requires deterministic synthetic shot planning rows only.",
});

const SCENE_ASSET_MAP = createSection({
  sectionId: "sceneAssetMap",
  label: "Scene Asset Map",
  title: "Backend-Owned Scene Asset Map Preview",
  humanReadableSummary:
    "Scene asset map preview shows simulated scene id, simulated asset need, simulated source note, simulated rights status, and simulated denied frontend persistence.",
  plannedInputs: ["Simulated scene id", "Simulated asset need", "Simulated source note", "Simulated rights status"],
  plannedOutputs: ["Scene Asset Map", "Denied frontend persistence", "Backend-owned asset storage prerequisite", "Synthetic scene asset rows"],
  checklistPrefix: "scene-asset-map",
  checklistSummary:
    "Scene asset map preview shows simulated scene id simulated asset need simulated source note simulated rights status simulated denied frontend persistence.",
  blocked: "Scene asset map preview does not upload assets store media persist maps or call asset providers from the UI.",
  approval: "Scene asset map preview requires backend-owned asset storage before persistence.",
  state: "backend-owned",
});

const B_ROLL_REQUIREMENT = createSection({
  sectionId: "bRollRequirement",
  label: "B-Roll Requirement",
  title: "Backend-Owned B-Roll Requirement Preview",
  humanReadableSummary:
    "B-roll requirement preview shows simulated b-roll need, simulated source option, simulated rights note, simulated shot purpose, and simulated storage prerequisite.",
  plannedInputs: ["Simulated b-roll need", "Simulated source option", "Simulated rights note", "Simulated shot purpose"],
  plannedOutputs: ["B-Roll Requirement", "Storage prerequisite", "Backend-owned rights review required", "Denied footage download path"],
  checklistPrefix: "b-roll-requirement",
  checklistSummary:
    "B-roll requirement preview shows simulated b-roll need simulated source option simulated rights note simulated shot purpose simulated storage prerequisite.",
  blocked:
    "B-roll requirement preview does not download stock footage upload footage store media or clear rights from the UI.",
  approval: "B-roll requirement preview requires backend-owned asset storage and rights review.",
  state: "backend-owned",
});

const PRODUCT_SHOT_REQUIREMENT = createSection({
  sectionId: "productShotRequirement",
  label: "Product Shot Requirement",
  title: "Synthetic Product Shot Requirement Preview",
  humanReadableSummary:
    "Product shot requirement preview shows simulated product shot, simulated angle note, simulated lighting note, simulated usage note, and simulated asset persistence blocked state.",
  plannedInputs: ["Simulated product shot", "Simulated angle note", "Simulated lighting note", "Simulated usage note"],
  plannedOutputs: ["Product Shot Requirement", "Asset persistence blocked state", "Synthetic product shot planning", "Denied visual generation path"],
  checklistPrefix: "product-shot-requirement",
  checklistSummary:
    "Product shot requirement preview shows simulated product shot simulated angle note simulated lighting note simulated usage note simulated asset persistence blocked state.",
  blocked:
    "Product shot requirement preview does not capture images upload product photos store files or generate product visuals from the UI.",
  approval: "Product shot requirement preview requires deterministic synthetic product shot planning only.",
});

const VISUAL_REFERENCE_BOARD = createSection({
  sectionId: "visualReferenceBoard",
  label: "Visual Reference Board",
  title: "Backend-Owned Visual Reference Board Preview",
  humanReadableSummary:
    "Visual reference board preview shows simulated reference card, simulated visual purpose, simulated source note, simulated rights note, and simulated generation blocked state.",
  plannedInputs: ["Simulated reference card", "Simulated visual purpose", "Simulated source note", "Simulated rights note"],
  plannedOutputs: ["Visual Reference Board", "Generation blocked state", "Backend-owned asset storage required", "Backend-owned rights review required"],
  checklistPrefix: "visual-reference-board",
  checklistSummary:
    "Visual reference board preview shows simulated reference card simulated visual purpose simulated source note simulated rights note simulated generation blocked state.",
  blocked:
    "Visual reference board preview does not download images upload references call providers generate images store assets or clear rights from the UI.",
  approval: "Visual reference board preview requires backend-owned asset storage and rights review.",
  state: "backend-owned",
});

const MUSIC_AND_AUDIO_ASSET_NOTE = createSection({
  sectionId: "musicAndAudioAssetNote",
  label: "Music And Audio Asset Note",
  title: "Backend-Owned Music And Audio Asset Note Preview",
  humanReadableSummary:
    "Music and audio asset note preview shows simulated music mood, simulated audio cue, simulated rights note, simulated consent note, and simulated audio persistence blocked state.",
  plannedInputs: ["Simulated music mood", "Simulated audio cue", "Simulated rights note", "Simulated consent note"],
  plannedOutputs: ["Music And Audio Asset Note", "Audio persistence blocked state", "Backend-owned rights review required", "Approval required"],
  checklistPrefix: "music-and-audio-asset-note",
  checklistSummary:
    "Music and audio asset note preview shows simulated music mood simulated audio cue simulated rights note simulated consent note simulated audio persistence blocked state.",
  blocked:
    "Music and audio asset note preview does not download music synthesize voice upload audio store media or clear music rights from the UI.",
  approval: "Music and audio asset note preview requires backend-owned rights review asset storage and approval.",
  state: "backend-owned",
});

const BRAND_ASSET_CHECKLIST = createSection({
  sectionId: "brandAssetChecklist",
  label: "Brand Asset Checklist",
  title: "Backend-Owned Brand Asset Checklist Preview",
  humanReadableSummary:
    "Brand asset checklist preview shows simulated logo requirement, simulated font note, simulated color note, simulated brand safety note, and simulated approval requirement.",
  plannedInputs: ["Simulated logo requirement", "Simulated font note", "Simulated color note", "Simulated brand safety note"],
  plannedOutputs: ["Brand Asset Checklist", "Approval requirement", "Backend-owned brand review required", "Operator approval required"],
  checklistPrefix: "brand-asset-checklist",
  checklistSummary:
    "Brand asset checklist preview shows simulated logo requirement simulated font note simulated color note simulated brand safety note simulated approval requirement.",
  blocked: "Brand asset checklist preview does not upload logos store brand files approve brand use or publish content from the UI.",
  approval: "Brand asset checklist preview requires backend-owned brand review and operator approval.",
  state: "backend-owned",
});

const RIGHTS_AND_SOURCE_STATUS = createSection({
  sectionId: "rightsAndSourceStatus",
  label: "Rights And Source Status",
  title: "Backend-Owned Rights And Source Status Preview",
  humanReadableSummary:
    "Rights and source status preview shows simulated source status, simulated license note, simulated attribution need, simulated approval state, and simulated denied frontend rights persistence.",
  plannedInputs: ["Simulated source status", "Simulated license note", "Simulated attribution need", "Simulated approval state"],
  plannedOutputs: ["Rights And Source Status", "Denied frontend rights persistence", "Backend-owned rights review required", "Approval capture required"],
  checklistPrefix: "rights-and-source-status",
  checklistSummary:
    "Rights and source status preview shows simulated source status simulated license note simulated attribution need simulated approval state simulated denied frontend rights persistence.",
  blocked:
    "Rights and source status preview does not clear copyright license music approve usage persist rights or publish content from the UI.",
  approval: "Rights and source status preview requires backend-owned rights review and approval capture.",
  state: "backend-owned",
});

const MISSING_ASSET_BLOCKER = createSection({
  sectionId: "missingAssetBlocker",
  label: "Missing Asset Blocker",
  title: "Synthetic Missing Asset Blocker Preview",
  humanReadableSummary:
    "Missing asset blocker preview shows simulated missing b-roll, simulated missing product shot, simulated missing music license, simulated missing logo, simulated missing approval, and backend prerequisite.",
  plannedInputs: ["Simulated missing b-roll", "Simulated missing product shot", "Simulated missing music license", "Simulated missing logo"],
  plannedOutputs: ["Missing Asset Blocker", "Backend prerequisite", "Synthetic blocker rows", "Denied queue and bypass paths"],
  checklistPrefix: "missing-asset-blocker",
  checklistSummary:
    "Missing asset blocker preview shows simulated missing b-roll simulated missing product shot simulated missing music license simulated missing logo simulated missing approval and backend prerequisite.",
  blocked:
    "Missing asset blocker preview does not create upload jobs dispatch workers persist queues or bypass rights review from the UI.",
  approval: "Missing asset blocker preview requires deterministic synthetic blocker rows only.",
});

const ASSET_HANDOFF_PACKET = createSection({
  sectionId: "assetHandoffPacket",
  label: "Asset Handoff Packet",
  title: "Backend-Owned Asset Handoff Packet Preview",
  humanReadableSummary:
    "Asset handoff packet preview shows simulated handoff summary, simulated shot list, simulated asset list, simulated rights note, and simulated export blocked state.",
  plannedInputs: ["Simulated handoff summary", "Simulated shot list", "Simulated asset list", "Simulated rights note"],
  plannedOutputs: ["Asset Handoff Packet", "Export blocked state", "Backend-owned export service required", "Approval capture required"],
  checklistPrefix: "asset-handoff-packet",
  checklistSummary:
    "Asset handoff packet preview shows simulated handoff summary simulated shot list simulated asset list simulated rights note simulated export blocked state.",
  blocked:
    "Asset handoff packet preview does not export packets write files upload assets persist handoffs or create artifacts from the UI.",
  approval: "Asset handoff packet preview requires backend-owned asset storage export service and approval capture.",
  state: "backend-owned",
});

const ASSET_UPLOAD_BLOCKED_BOUNDARY = createSection({
  sectionId: "assetUploadBlockedBoundary",
  label: "Asset Upload Blocked Boundary",
  title: "Asset Upload Blocked Boundary Preview",
  humanReadableSummary:
    "Asset upload blocked boundary preview shows denied asset upload, denied media storage, denied asset persistence, denied rights persistence, denied artifact creation, and backend prerequisite.",
  plannedInputs: ["Denied asset upload", "Denied media storage", "Denied asset persistence", "Denied rights persistence"],
  plannedOutputs: ["Asset Upload Blocked Boundary", "Denied artifact creation", "Backend prerequisite", "Explicit operator approval required"],
  checklistPrefix: "asset-upload-blocked-boundary",
  checklistSummary:
    "Asset upload blocked boundary preview shows denied asset upload denied media storage denied asset persistence denied rights persistence denied artifact creation and backend prerequisite.",
  blocked:
    "Asset upload blocked boundary preview blocks frontend upload frontend media storage frontend asset persistence frontend rights persistence frontend artifact creation and frontend provider calls.",
  approval:
    "Asset upload blocked boundary preview requires backend-owned asset storage rights review approval capture and explicit operator approval.",
  state: "blocked",
});

const ASSET_DOWNLOAD_BLOCKED_BOUNDARY = createSection({
  sectionId: "assetDownloadBlockedBoundary",
  label: "Asset Download Blocked Boundary",
  title: "Asset Download Blocked Boundary Preview",
  humanReadableSummary:
    "Asset download blocked boundary preview shows denied asset download, denied export, denied file write, denied media extraction, denied publish, and approval requirement.",
  plannedInputs: ["Denied asset download", "Denied export", "Denied file write", "Denied media extraction"],
  plannedOutputs: ["Asset Download Blocked Boundary", "Denied publish", "Approval requirement", "Backend-owned export service required"],
  checklistPrefix: "asset-download-blocked-boundary",
  checklistSummary:
    "Asset download blocked boundary preview shows denied asset download denied export denied file write denied media extraction denied publish and approval requirement.",
  blocked:
    "Asset download blocked boundary preview blocks frontend download frontend export frontend file write frontend media extraction frontend social posting and frontend publishing.",
  approval:
    "Asset download blocked boundary preview requires backend-owned export service rights review approval capture and operator approval.",
  state: "blocked",
});

const DENIED_ASSET_AND_SHOT_PLANNING_WORKSPACE_BOUNDARIES = createSection({
  sectionId: "deniedAssetAndShotPlanningWorkspaceBoundaries",
  label: "Denied Asset And Shot Planning Workspace Boundaries",
  title: "Denied Asset And Shot Planning Workspace Paths",
  humanReadableSummary:
    "Denied asset and shot planning workspace paths remain blocked for upload, download, media storage, rendering, export, generation, provider calls, model calls, connector calls, persistence, publishing, scheduling, command execution, and file mutation.",
  plannedInputs: ["Denied upload path", "Denied download path", "Denied render path", "Denied persistence path"],
  plannedOutputs: ["Denied asset and shot planning workspace paths", "Backend-owned prerequisites", "Operator approval requirement", "Review-only diagnostics"],
  checklistPrefix: "denied-asset-and-shot-planning-workspace",
  checklistSummary: "Denied asset and shot planning workspace paths remain blocked.",
  blocked:
    "Denied asset and shot planning workspace paths remain blocked for frontend upload download media storage rendering export generation provider model connector persistence publishing scheduling command execution and file mutation.",
  approval: "Denied asset and shot planning workspace paths require explicit operator approval and backend-owned services before any future real workflow.",
  state: "blocked",
});

const SECTION_LOOKUP: Record<AssetAndShotPlanningWorkspaceSectionId, AssetAndShotPlanningWorkspaceSection> = {
  assetAndShotPlanningWorkspaceBoundary: ASSET_AND_SHOT_PLANNING_WORKSPACE_BOUNDARY,
  shotListPlanning: SHOT_LIST_PLANNING,
  sceneAssetMap: SCENE_ASSET_MAP,
  bRollRequirement: B_ROLL_REQUIREMENT,
  productShotRequirement: PRODUCT_SHOT_REQUIREMENT,
  visualReferenceBoard: VISUAL_REFERENCE_BOARD,
  musicAndAudioAssetNote: MUSIC_AND_AUDIO_ASSET_NOTE,
  brandAssetChecklist: BRAND_ASSET_CHECKLIST,
  rightsAndSourceStatus: RIGHTS_AND_SOURCE_STATUS,
  missingAssetBlocker: MISSING_ASSET_BLOCKER,
  assetHandoffPacket: ASSET_HANDOFF_PACKET,
  assetUploadBlockedBoundary: ASSET_UPLOAD_BLOCKED_BOUNDARY,
  assetDownloadBlockedBoundary: ASSET_DOWNLOAD_BLOCKED_BOUNDARY,
  deniedAssetAndShotPlanningWorkspaceBoundaries: DENIED_ASSET_AND_SHOT_PLANNING_WORKSPACE_BOUNDARIES,
};

const ALL_SECTION_IDS: readonly AssetAndShotPlanningWorkspaceSectionId[] = [
  "assetAndShotPlanningWorkspaceBoundary",
  "shotListPlanning",
  "sceneAssetMap",
  "bRollRequirement",
  "productShotRequirement",
  "visualReferenceBoard",
  "musicAndAudioAssetNote",
  "brandAssetChecklist",
  "rightsAndSourceStatus",
  "missingAssetBlocker",
  "assetHandoffPacket",
  "assetUploadBlockedBoundary",
  "assetDownloadBlockedBoundary",
  "deniedAssetAndShotPlanningWorkspaceBoundaries",
];

const ASSET_AND_SHOT_PLANNING_WORKSPACE_MODEL: AssetAndShotPlanningWorkspaceModel = {
  assetAndShotPlanningWorkspaceId: "asset-and-shot-planning-workspace-v1",
  assetAndShotPlanningWorkspaceKind: "asset-and-shot-planning-workspace-v1",
  shotListPlanning: SHOT_LIST_PLANNING,
  sceneAssetMap: SCENE_ASSET_MAP,
  bRollRequirement: B_ROLL_REQUIREMENT,
  productShotRequirement: PRODUCT_SHOT_REQUIREMENT,
  visualReferenceBoard: VISUAL_REFERENCE_BOARD,
  musicAndAudioAssetNote: MUSIC_AND_AUDIO_ASSET_NOTE,
  brandAssetChecklist: BRAND_ASSET_CHECKLIST,
  rightsAndSourceStatus: RIGHTS_AND_SOURCE_STATUS,
  missingAssetBlocker: MISSING_ASSET_BLOCKER,
  assetHandoffPacket: ASSET_HANDOFF_PACKET,
  assetUploadBlockedBoundary: ASSET_UPLOAD_BLOCKED_BOUNDARY,
  assetDownloadBlockedBoundary: ASSET_DOWNLOAD_BLOCKED_BOUNDARY,
  deniedAssetAndShotPlanningWorkspaceBoundaries: DENIED_ASSET_AND_SHOT_PLANNING_WORKSPACE_BOUNDARIES,
  cockpitSummary: [
    {
      id: "shot-list",
      label: "Shot list",
      detail: "Synthetic shot list planning rows only; no footage capture, upload, transcode, persistence, or file creation.",
      state: "synthetic-only",
    },
    {
      id: "scene-asset-map",
      label: "Scene asset map",
      detail: "Scene to asset needs are review-only and require backend-owned asset storage before persistence.",
      state: "backend-owned",
    },
    {
      id: "b-roll",
      label: "B-roll requirements",
      detail: "B-roll planning stays synthetic with backend-owned asset storage and rights review required.",
      state: "backend-owned",
    },
    {
      id: "product-shot",
      label: "Product shot requirements",
      detail: "Product shot notes are synthetic planning only; product photos and generated visuals remain blocked.",
      state: "synthetic-only",
    },
    {
      id: "references",
      label: "Visual references",
      detail: "Reference boards do not download, upload, generate, store, or clear rights from the cockpit.",
      state: "blocked",
    },
    {
      id: "audio",
      label: "Music and audio notes",
      detail: "Music, voice, audio upload, audio storage, and music rights clearance remain backend-owned.",
      state: "backend-owned",
    },
    {
      id: "rights",
      label: "Rights and source status",
      detail: "Rights notes remain review-only; backend-owned rights review and approval capture remain required.",
      state: "backend-owned",
    },
    {
      id: "handoff",
      label: "Asset handoff packet",
      detail: "Handoff packet preview does not export packets, write files, upload assets, or create artifacts.",
      state: "blocked",
    },
  ],
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ROUTES: readonly AssetAndShotPlanningWorkspaceRouteDefinition[] = [
  {
    slug: "asset-and-shot-planning-workspace-boundary",
    href: "/asset-and-shot-planning-workspace-boundary",
    phase: "Phase 1946",
    title: "Asset And Shot Planning Workspace Boundary",
    commandLabel: "Go to Asset And Shot Planning Workspace Boundary",
    summary:
      "Previews the asset and shot planning workspace boundary without frontend upload, download, rendering, export, provider calls, model calls, connector calls, persistence, publishing, scheduling, or file mutation.",
    markerPhrases: [
      "Asset and shot planning workspace boundary",
      "Asset and shot planning workspace boundary does not upload assets download assets store media render videos export files call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist scripts persist storyboards persist assets persist rights or write files from the UI",
      "Asset and shot planning workspace boundary requires explicit operator approval",
      "Asset and shot planning workspace boundary prepares deterministic synthetic asset and shot planning workflows without frontend upload download rendering export provider calls asset persistence rights persistence or publishing",
      "Denied asset and shot planning workspace paths remain blocked",
      "Asset and shot planning workspace boundary checklist",
    ],
    sectionIds: ["assetAndShotPlanningWorkspaceBoundary", "deniedAssetAndShotPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "shot-list-planning-preview",
    href: "/shot-list-planning-preview",
    phase: "Phase 1947",
    title: "Shot List Planning Preview",
    commandLabel: "Go to Shot List Planning Preview",
    summary:
      "Previews deterministic synthetic shot planning rows without footage capture, media upload, file transcode, shot list persistence, or file creation.",
    markerPhrases: [
      "Shot list planning preview",
      "Shot list planning preview does not capture footage upload media transcode files persist shot lists or create files from the UI",
      "Shot list planning preview requires deterministic synthetic shot planning rows only",
      "Shot list planning preview shows simulated shot name simulated framing note simulated motion note simulated duration target simulated backend storage prerequisite",
      "Denied shot list planning paths remain blocked",
      "Shot list planning checklist",
    ],
    sectionIds: ["shotListPlanning", "assetAndShotPlanningWorkspaceBoundary", "deniedAssetAndShotPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "scene-asset-map-preview",
    href: "/scene-asset-map-preview",
    phase: "Phase 1948",
    title: "Scene Asset Map Preview",
    commandLabel: "Go to Scene Asset Map Preview",
    summary:
      "Previews backend-owned scene asset map planning without asset upload, media storage, map persistence, or asset provider calls from the UI.",
    markerPhrases: [
      "Scene asset map preview",
      "Scene asset map preview does not upload assets store media persist maps or call asset providers from the UI",
      "Scene asset map preview requires backend-owned asset storage before persistence",
      "Scene asset map preview shows simulated scene id simulated asset need simulated source note simulated rights status simulated denied frontend persistence",
      "Denied scene asset map paths remain blocked",
      "Scene asset map checklist",
    ],
    sectionIds: ["sceneAssetMap", "shotListPlanning", "deniedAssetAndShotPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "b-roll-requirement-preview",
    href: "/b-roll-requirement-preview",
    phase: "Phase 1949",
    title: "B-Roll Requirement Preview",
    commandLabel: "Go to B-Roll Requirement Preview",
    summary:
      "Previews backend-owned b-roll requirements without stock footage downloads, footage upload, media storage, or rights clearance from the UI.",
    markerPhrases: [
      "B-roll requirement preview",
      "B-roll requirement preview does not download stock footage upload footage store media or clear rights from the UI",
      "B-roll requirement preview requires backend-owned asset storage and rights review",
      "B-roll requirement preview shows simulated b-roll need simulated source option simulated rights note simulated shot purpose simulated storage prerequisite",
      "Denied b-roll requirement paths remain blocked",
      "B-roll requirement checklist",
    ],
    sectionIds: ["bRollRequirement", "sceneAssetMap", "deniedAssetAndShotPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "product-shot-requirement-preview",
    href: "/product-shot-requirement-preview",
    phase: "Phase 1950",
    title: "Product Shot Requirement Preview",
    commandLabel: "Go to Product Shot Requirement Preview",
    summary:
      "Previews deterministic synthetic product shot planning without image capture, product photo upload, file storage, or product visual generation.",
    markerPhrases: [
      "Product shot requirement preview",
      "Product shot requirement preview does not capture images upload product photos store files or generate product visuals from the UI",
      "Product shot requirement preview requires deterministic synthetic product shot planning only",
      "Product shot requirement preview shows simulated product shot simulated angle note simulated lighting note simulated usage note simulated asset persistence blocked state",
      "Denied product shot requirement paths remain blocked",
      "Product shot requirement checklist",
    ],
    sectionIds: ["productShotRequirement", "bRollRequirement", "deniedAssetAndShotPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "visual-reference-board-preview",
    href: "/visual-reference-board-preview",
    phase: "Phase 1951",
    title: "Visual Reference Board Preview",
    commandLabel: "Go to Visual Reference Board Preview",
    summary:
      "Previews backend-owned visual reference board planning without image download, reference upload, provider calls, image generation, asset storage, or rights clearance from the UI.",
    markerPhrases: [
      "Visual reference board preview",
      "Visual reference board preview does not download images upload references call providers generate images store assets or clear rights from the UI",
      "Visual reference board preview requires backend-owned asset storage and rights review",
      "Visual reference board preview shows simulated reference card simulated visual purpose simulated source note simulated rights note simulated generation blocked state",
      "Denied visual reference board paths remain blocked",
      "Visual reference board checklist",
    ],
    sectionIds: ["visualReferenceBoard", "productShotRequirement", "deniedAssetAndShotPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "music-and-audio-asset-note-preview",
    href: "/music-and-audio-asset-note-preview",
    phase: "Phase 1952",
    title: "Music And Audio Asset Note Preview",
    commandLabel: "Go to Music And Audio Asset Note Preview",
    summary:
      "Previews backend-owned music and audio asset notes without music download, voice synthesis, audio upload, media storage, or music rights clearance from the UI.",
    markerPhrases: [
      "Music and audio asset note preview",
      "Music and audio asset note preview does not download music synthesize voice upload audio store media or clear music rights from the UI",
      "Music and audio asset note preview requires backend-owned rights review asset storage and approval",
      "Music and audio asset note preview shows simulated music mood simulated audio cue simulated rights note simulated consent note simulated audio persistence blocked state",
      "Denied music and audio asset note paths remain blocked",
      "Music and audio asset note checklist",
    ],
    sectionIds: ["musicAndAudioAssetNote", "visualReferenceBoard", "deniedAssetAndShotPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "brand-asset-checklist-preview",
    href: "/brand-asset-checklist-preview",
    phase: "Phase 1953",
    title: "Brand Asset Checklist Preview",
    commandLabel: "Go to Brand Asset Checklist Preview",
    summary:
      "Previews backend-owned brand asset checklist planning without logo upload, brand file storage, brand approval, or publishing from the UI.",
    markerPhrases: [
      "Brand asset checklist preview",
      "Brand asset checklist preview does not upload logos store brand files approve brand use or publish content from the UI",
      "Brand asset checklist preview requires backend-owned brand review and operator approval",
      "Brand asset checklist preview shows simulated logo requirement simulated font note simulated color note simulated brand safety note simulated approval requirement",
      "Denied brand asset checklist paths remain blocked",
      "Brand asset checklist checklist",
    ],
    sectionIds: ["brandAssetChecklist", "musicAndAudioAssetNote", "deniedAssetAndShotPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "rights-and-source-status-preview",
    href: "/rights-and-source-status-preview",
    phase: "Phase 1954",
    title: "Rights And Source Status Preview",
    commandLabel: "Go to Rights And Source Status Preview",
    summary:
      "Previews backend-owned rights and source status planning without copyright clearance, licensing, usage approval, rights persistence, or publishing from the UI.",
    markerPhrases: [
      "Rights and source status preview",
      "Rights and source status preview does not clear copyright license music approve usage persist rights or publish content from the UI",
      "Rights and source status preview requires backend-owned rights review and approval capture",
      "Rights and source status preview shows simulated source status simulated license note simulated attribution need simulated approval state simulated denied frontend rights persistence",
      "Denied rights and source status paths remain blocked",
      "Rights and source status checklist",
    ],
    sectionIds: ["rightsAndSourceStatus", "brandAssetChecklist", "deniedAssetAndShotPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "missing-asset-blocker-preview",
    href: "/missing-asset-blocker-preview",
    phase: "Phase 1955",
    title: "Missing Asset Blocker Preview",
    commandLabel: "Go to Missing Asset Blocker Preview",
    summary:
      "Previews deterministic synthetic missing asset blockers without upload jobs, worker dispatch, queue persistence, or rights review bypasses.",
    markerPhrases: [
      "Missing asset blocker preview",
      "Missing asset blocker preview does not create upload jobs dispatch workers persist queues or bypass rights review from the UI",
      "Missing asset blocker preview requires deterministic synthetic blocker rows only",
      "Missing asset blocker preview shows simulated missing b-roll simulated missing product shot simulated missing music license simulated missing logo simulated missing approval and backend prerequisite",
      "Denied missing asset blocker paths remain blocked",
      "Missing asset blocker checklist",
    ],
    sectionIds: ["missingAssetBlocker", "rightsAndSourceStatus", "deniedAssetAndShotPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "asset-handoff-packet-preview",
    href: "/asset-handoff-packet-preview",
    phase: "Phase 1956",
    title: "Asset Handoff Packet Preview",
    commandLabel: "Go to Asset Handoff Packet Preview",
    summary:
      "Previews backend-owned asset handoff packet planning without packet export, file writes, asset upload, handoff persistence, or artifact creation from the UI.",
    markerPhrases: [
      "Asset handoff packet preview",
      "Asset handoff packet preview does not export packets write files upload assets persist handoffs or create artifacts from the UI",
      "Asset handoff packet preview requires backend-owned asset storage export service and approval capture",
      "Asset handoff packet preview shows simulated handoff summary simulated shot list simulated asset list simulated rights note simulated export blocked state",
      "Denied asset handoff packet paths remain blocked",
      "Asset handoff packet checklist",
    ],
    sectionIds: ["assetHandoffPacket", "missingAssetBlocker", "deniedAssetAndShotPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "asset-upload-blocked-boundary-preview",
    href: "/asset-upload-blocked-boundary-preview",
    phase: "Phase 1957",
    title: "Asset Upload Blocked Boundary Preview",
    commandLabel: "Go to Asset Upload Blocked Boundary Preview",
    summary:
      "Previews blocked frontend upload boundaries without media storage, asset persistence, rights persistence, artifact creation, or provider calls.",
    markerPhrases: [
      "Asset upload blocked boundary preview",
      "Asset upload blocked boundary preview blocks frontend upload frontend media storage frontend asset persistence frontend rights persistence frontend artifact creation and frontend provider calls",
      "Asset upload blocked boundary preview requires backend-owned asset storage rights review approval capture and explicit operator approval",
      "Asset upload blocked boundary preview shows denied asset upload denied media storage denied asset persistence denied rights persistence denied artifact creation and backend prerequisite",
      "Denied asset upload paths remain blocked",
      "Asset upload blocked boundary checklist",
    ],
    sectionIds: ["assetUploadBlockedBoundary", "assetHandoffPacket", "deniedAssetAndShotPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "asset-download-blocked-boundary-preview",
    href: "/asset-download-blocked-boundary-preview",
    phase: "Phase 1958",
    title: "Asset Download Blocked Boundary Preview",
    commandLabel: "Go to Asset Download Blocked Boundary Preview",
    summary:
      "Previews blocked frontend download boundaries without export, file writes, media extraction, social posting, or publishing from the UI.",
    markerPhrases: [
      "Asset download blocked boundary preview",
      "Asset download blocked boundary preview blocks frontend download frontend export frontend file write frontend media extraction frontend social posting and frontend publishing",
      "Asset download blocked boundary preview requires backend-owned export service rights review approval capture and operator approval",
      "Asset download blocked boundary preview shows denied asset download denied export denied file write denied media extraction denied publish and approval requirement",
      "Denied asset download paths remain blocked",
      "Asset download blocked boundary checklist",
    ],
    sectionIds: ["assetDownloadBlockedBoundary", "assetUploadBlockedBoundary", "deniedAssetAndShotPlanningWorkspaceBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-asset-and-shot-planning-summary",
    href: "/cockpit-asset-and-shot-planning-summary",
    phase: "Phase 1959",
    title: "Cockpit Asset And Shot Planning Summary",
    commandLabel: "Go to Cockpit Asset And Shot Planning Summary",
    summary:
      "Summarizes the review-only asset and shot planning workspace in the normal cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: [
      "Cockpit asset and shot planning summary",
      "Cockpit asset and shot planning summary keeps the cockpit as the normal user surface",
      "Cockpit asset and shot planning summary does not upload assets download assets store media render videos export files call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist scripts persist storyboards persist assets persist rights or write files from the cockpit",
      "Cockpit asset and shot planning summary shows shot list scene asset map b-roll requirements product shot requirements visual reference board music and audio notes brand asset checklist rights and source status missing asset blockers asset handoff packet upload blocked download blocked and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit asset and shot planning checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-asset-and-shot-planning-workspace-candidate",
    href: "/first-asset-and-shot-planning-workspace-candidate",
    phase: "Phase 1960",
    title: "First Asset And Shot Planning Workspace Candidate",
    commandLabel: "Go to First Asset And Shot Planning Workspace Candidate",
    summary:
      "Combines the first asset and shot planning workspace candidate without frontend upload, download, media storage, rendering, export, provider calls, model calls, connector calls, persistence, publishing, scheduling, or file writes.",
    markerPhrases: [
      "First asset and shot planning workspace candidate",
      "First asset and shot planning workspace candidate does not enable upload download media storage rendering export provider calls model calls connector calls image generation video generation voice generation publishing scheduling file writes script persistence storyboard persistence asset persistence rights persistence prompt persistence job persistence or approval persistence from the UI",
      "First asset and shot planning workspace candidate requires explicit operator approval",
      "Candidate combines shot list scene asset map b-roll requirements product shot requirements visual references music and audio notes brand asset checklist rights and source status missing blockers handoff packet upload blocked download blocked cockpit summary and denied paths",
      "Denied first asset and shot planning workspace paths remain blocked",
      "First asset and shot planning workspace checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-asset-and-shot-planning-workspace-release-candidate",
    href: "/controlled-asset-and-shot-planning-workspace-release-candidate",
    phase: "Phase 1961",
    title: "Controlled Asset And Shot Planning Workspace Release Candidate",
    commandLabel: "Go to Controlled Asset And Shot Planning Workspace Release Candidate",
    summary:
      "Release candidate adds the Asset And Shot Planning Workspace as a review-only planning workspace without frontend upload, download, rendering, export, provider calls, model calls, asset persistence, rights persistence, prompt persistence, job persistence, approval persistence, publishing, scheduling, or file mutation.",
    markerPhrases: [
      "Controlled asset and shot planning workspace release candidate",
      "Controlled asset and shot planning workspace release candidate does not render videos export files upload assets download assets store media call providers call models call connectors generate images generate videos generate voice synthesize audio publish posts schedule content write files persist scripts persist storyboards persist assets persist rights persist prompts persist jobs persist approvals dispatch workers create queues create artifacts run commands spawn processes bind ports install packages deploy runtimes start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend",
      "Controlled asset and shot planning workspace release requires explicit operator approval",
      "Release candidate adds the Asset And Shot Planning Workspace as a review-only planning workspace without frontend upload download rendering export provider calls model calls asset persistence rights persistence prompt persistence job persistence approval persistence publishing scheduling or file mutation",
      "Denied controlled asset and shot planning workspace paths remain blocked",
      "Controlled asset and shot planning workspace checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
] as const;

const ROUTE_LOOKUP: Record<AssetAndShotPlanningWorkspaceRouteSlug, AssetAndShotPlanningWorkspaceRouteDefinition> =
  ROUTES.reduce(
    (accumulator, route) => {
      accumulator[route.slug] = route;
      return accumulator;
    },
    {} as Record<AssetAndShotPlanningWorkspaceRouteSlug, AssetAndShotPlanningWorkspaceRouteDefinition>
  );

export function buildAssetAndShotPlanningWorkspaceStableKey(parts: readonly string[]): string {
  return parts
    .map((part) =>
      part
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .join("--");
}

export function listAssetAndShotPlanningWorkspaceRoutes(): readonly AssetAndShotPlanningWorkspaceRouteDefinition[] {
  return ROUTES;
}

export function buildAssetAndShotPlanningWorkspaceRouteModel(
  slug: AssetAndShotPlanningWorkspaceRouteSlug = "controlled-asset-and-shot-planning-workspace-release-candidate"
): AssetAndShotPlanningWorkspaceRouteModel {
  const route = ROUTE_LOOKUP[slug];
  const sections = route.sectionIds.map((sectionId) => SECTION_LOOKUP[sectionId]);

  return {
    route,
    assetAndShotPlanningWorkspace: ASSET_AND_SHOT_PLANNING_WORKSPACE_MODEL,
    sections,
    diagnosticRoutes: ROUTES,
    cockpitMarkers: ASSET_AND_SHOT_PLANNING_WORKSPACE_COCKPIT_MARKERS,
    summary: route.summary,
  };
}
