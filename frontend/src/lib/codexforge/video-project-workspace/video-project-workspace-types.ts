export type VideoProjectSectionKind =
  | "brief"
  | "prompt"
  | "style"
  | "consistency kit"
  | "shot library"
  | "storyboard"
  | "keyframes"
  | "local image requests"
  | "local video draft requests"
  | "artifact capture"
  | "review"
  | "comparison"
  | "finishing"
  | "export handoff";

export type VideoProjectStatusKind =
  | "idea"
  | "planning"
  | "assets-needed"
  | "draft-ready"
  | "review-needed"
  | "finishing-ready"
  | "export-ready"
  | "blocked"
  | "archived-preview";

export type VideoProjectSection = {
  id: string;
  kind: VideoProjectSectionKind;
  title: string;
  summary: string;
  requiredForProject: boolean;
  status: "supplied" | "needs review" | "missing" | "optional" | "blocked";
  linkedRoute: string;
};

export type VideoProject = {
  id: string;
  title: string;
  ownerNote: string;
  status: VideoProjectStatusKind;
  sections: VideoProjectSection[];
  previewOnly: true;
  persistenceNote: string;
};

export type VideoProjectStatus = {
  id: string;
  status: VideoProjectStatusKind;
  label: string;
  plainEnglish: string;
  blockingSections: string[];
};

export type VideoProjectReadinessCheck = {
  id: string;
  label: string;
  ready: boolean;
  plainEnglish: string;
};

export type VideoProjectReadiness = {
  id: string;
  checks: VideoProjectReadinessCheck[];
  readyForExportHandoff: boolean;
  plainEnglish: string;
};

export type VideoProjectNextAction = {
  id: string;
  label: string;
  plainEnglish: string;
  route: string;
  manualOnly: true;
};

export type VideoProjectHandoff = {
  id: string;
  copyLabel: string;
  packet: string[];
  safetyNote: string;
};

export type VideoProjectWorkspaceSummary = {
  project: VideoProject;
  status: VideoProjectStatus;
  readiness: VideoProjectReadiness;
  nextAction: VideoProjectNextAction;
  handoff: VideoProjectHandoff;
  summary: string;
};
