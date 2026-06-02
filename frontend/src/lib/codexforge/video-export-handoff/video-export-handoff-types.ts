export type VideoExportTargetKind =
  | "local file"
  | "social clip"
  | "product demo"
  | "internal review"
  | "client review"
  | "archive package"
  | "cloud final later"
  | "manual delivery";

export type VideoExportChecklistItem =
  | "final candidate selected"
  | "version history reviewed"
  | "assets complete"
  | "export target chosen"
  | "resolution known"
  | "duration known"
  | "audio status known"
  | "license/source notes reviewed"
  | "no secrets included"
  | "no export executed";

export type VideoExportPackage = {
  id: string;
  title: string;
  finalCandidateId: string;
  packageMode: "handoff-only";
  noFileWrite: true;
  noUpload: true;
};

export type VideoExportTarget = {
  id: string;
  kind: VideoExportTargetKind;
  label: string;
  resolution: string;
  duration: string;
  audioStatus: string;
  manualNote: string;
};

export type VideoExportChecklist = {
  id: string;
  items: {
    id: string;
    item: VideoExportChecklistItem;
    complete: boolean;
    plainEnglish: string;
  }[];
};

export type VideoExportSafety = {
  id: string;
  rules: string[];
  plainEnglish: string;
};

export type VideoExportDeliveryNote = {
  id: string;
  audience: string;
  note: string;
  manualOnly: true;
};

export type VideoExportHandoffSummary = {
  package: VideoExportPackage;
  target: VideoExportTarget;
  checklist: VideoExportChecklist;
  safety: VideoExportSafety;
  deliveryNote: VideoExportDeliveryNote;
  summary: string;
};
