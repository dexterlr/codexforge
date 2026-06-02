export type RenderVersionKind =
  | "image"
  | "keyframe"
  | "video draft"
  | "upscaled video"
  | "interpolated video"
  | "final candidate"
  | "export handoff";

export type RenderVersionChangeKind =
  | "prompt changed"
  | "style changed"
  | "keyframe changed"
  | "workflow changed"
  | "parameter changed"
  | "upscale added"
  | "interpolation added"
  | "artifact reviewed"
  | "recovery retry";

export type RenderVersion = {
  id: string;
  kind: RenderVersionKind;
  label: string;
  source: string;
  status: "supplied" | "reviewed" | "candidate" | "missing" | "handoff-only";
  isLatest: boolean;
  playbackAllowed: false;
};

export type RenderVersionChange = {
  id: string;
  versionId: string;
  kind: RenderVersionChangeKind;
  plainEnglish: string;
};

export type RenderVersionLineage = {
  id: string;
  rootVersionId: string;
  latestVersionId: string;
  steps: string[];
};

export type RenderVersionReview = {
  id: string;
  versionId: string;
  decision: "keep" | "needs review" | "retry planned" | "not selected" | "handoff only";
  note: string;
};

export type RenderVersionSelection = {
  id: string;
  selectedVersionId: string;
  latestVersionId: string;
  plainEnglish: string;
  manualOnly: true;
};

export type RenderVersionHandoff = {
  id: string;
  copyLabel: string;
  packet: string[];
  safetyNote: string;
};

export type RenderVersionHistorySummary = {
  versions: RenderVersion[];
  changes: RenderVersionChange[];
  lineage: RenderVersionLineage;
  reviews: RenderVersionReview[];
  selection: RenderVersionSelection;
  handoff: RenderVersionHandoff;
  summary: string;
};
