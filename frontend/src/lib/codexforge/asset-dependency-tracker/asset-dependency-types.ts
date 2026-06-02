export type AssetDependencyKind =
  | "prompt"
  | "style preset"
  | "consistency subject"
  | "shot template"
  | "storyboard shot"
  | "keyframe prompt"
  | "local image"
  | "keyframe image"
  | "workflow package"
  | "draft video"
  | "review note"
  | "export target"
  | "missing model note"
  | "missing custom node note";

export type AssetDependencyReadinessStatus =
  | "ready"
  | "missing"
  | "optional"
  | "needs-review"
  | "blocked"
  | "supplied"
  | "unknown";

export type AssetDependency = {
  id: string;
  kind: AssetDependencyKind;
  title: string;
  whyNeeded: string;
  status: AssetDependencyReadinessStatus;
  linkedRoute: string;
  manualNote: string;
};

export type AssetDependencyGroup = {
  id: string;
  title: string;
  plainEnglish: string;
  dependencies: AssetDependency[];
};

export type AssetDependencyRisk = {
  id: string;
  level: "low" | "medium" | "high";
  issues: string[];
  plainEnglish: string;
};

export type AssetDependencyReadiness = {
  id: string;
  status: AssetDependencyReadinessStatus;
  readyCount: number;
  blockedCount: number;
  missingCount: number;
  plainEnglish: string;
};

export type AssetDependencyNextAction = {
  id: string;
  label: string;
  plainEnglish: string;
  route: string;
  manualOnly: true;
};

export type AssetDependencyHandoff = {
  id: string;
  copyLabel: string;
  checklist: string[];
  safetyNote: string;
};

export type AssetDependencySummary = {
  dependencies: AssetDependency[];
  groups: AssetDependencyGroup[];
  risk: AssetDependencyRisk;
  readiness: AssetDependencyReadiness;
  nextAction: AssetDependencyNextAction;
  handoff: AssetDependencyHandoff;
  summary: string;
};
