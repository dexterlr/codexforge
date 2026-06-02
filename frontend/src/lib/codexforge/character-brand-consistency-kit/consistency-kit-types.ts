export type ConsistencySubjectKind =
  | "character"
  | "brand"
  | "product"
  | "location"
  | "vehicle"
  | "object"
  | "mascot"
  | "environment"
  | "style-system";

export type ConsistencyApprovalStatus = "draft" | "needs-review" | "reviewed" | "approved-notes-only";

export type ConsistencySubject = {
  id: string;
  label: string;
  subjectKind: ConsistencySubjectKind;
  description: string;
  mustKeep: string[];
  mustAvoid: string[];
  colors: string[];
  materials: string[];
  silhouette: string;
  cameraAngleRules: string[];
  styleReferencesAsNotesOnly: string[];
  approvalStatus: ConsistencyApprovalStatus;
};

export type ConsistencyIdentityCard = {
  id: string;
  subjectId: string;
  label: string;
  notes: string[];
};

export type ConsistencyVisualRules = {
  id: string;
  subjectId: string;
  mustKeep: string[];
  colors: string[];
  materials: string[];
  silhouette: string;
  cameraAngleRules: string[];
};

export type ConsistencyNegativeRules = {
  id: string;
  subjectId: string;
  mustAvoid: string[];
  negativePromptNotes: string[];
};

export type ConsistencyCheck = {
  id: string;
  label: string;
  passed: boolean;
  explanation: string;
};

export type ConsistencyHandoff = {
  id: string;
  copyLabel: string;
  handoffText: string;
  reviewReminder: string;
};

export type ConsistencyKitSummary = {
  subjects: ConsistencySubject[];
  identityCards: ConsistencyIdentityCard[];
  visualRules: ConsistencyVisualRules[];
  negativeRules: ConsistencyNegativeRules[];
  checks: ConsistencyCheck[];
  handoff: ConsistencyHandoff;
  summary: string;
};
