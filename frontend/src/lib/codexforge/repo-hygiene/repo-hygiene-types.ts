export type RepoHygieneStatus = "pass" | "review" | "manual";

export type RepoHygieneCheckCategory =
  | "ignore"
  | "workspace"
  | "generated"
  | "test"
  | "secret"
  | "docs";

export type RepoHygieneCheck = {
  id: string;
  label: string;
  category: RepoHygieneCheckCategory;
  status: RepoHygieneStatus;
  evidence: string;
  nextStep: string;
  safetyCritical: boolean;
};

export type GeneratedFilePolicy = {
  id: string;
  ignoredPatterns: string[];
  reviewableWork: string[];
  neverCommit: string[];
  policySummary: string;
};

export type CanonicalProjectCandidate = {
  path: string;
  status: "canonical" | "unverified-duplicate";
  note: string;
};

export type CanonicalProject = {
  activeProduct: string;
  activePath: string;
  sourceOfTruth: string;
  candidates: CanonicalProjectCandidate[];
};

export type RepoHygieneTestScript = {
  packageName: string;
  previousPlaceholder: string;
  currentTestScript: string;
  validationScripts: string[];
  status: RepoHygieneStatus;
};

export type RepoHygieneSecretPolicy = {
  trackedEnvStatus: string;
  localEnvStatus: string;
  browserRules: string[];
  serverRules: string[];
  status: RepoHygieneStatus;
};

export type RepoHygieneSummary = {
  title: string;
  subtitle: string;
  primaryAction: string;
  checks: RepoHygieneCheck[];
  generatedFilePolicy: GeneratedFilePolicy;
  canonicalProject: CanonicalProject;
  testScript: RepoHygieneTestScript;
  secretPolicy: RepoHygieneSecretPolicy;
  manualActions: string[];
  safetyNotes: string[];
};
