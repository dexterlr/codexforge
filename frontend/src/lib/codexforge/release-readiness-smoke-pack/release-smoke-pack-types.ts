export type ReleaseSmokeCommand = { id: string; command: string; purpose: string; copyOnly: true };
export type ReleaseSmokeSuite = { title: string; commands: ReleaseSmokeCommand[]; noAutoRun: true };
export type ReleaseSmokeChecklist = { items: string[]; manual: true };
export type ReleaseSmokeResultCapture = { fields: string[]; outputManual: true; noFabricatedSuccess: true };
export type ReleaseSmokeFailureRouting = { failedBuild: "/closed-loop"; failedValidation: "/validation-results"; failedDiff: "/files" };
export type ReleaseSmokeCoverageMap = { coveredPhases: string[]; routeCoverage: string[] };
export type ReleaseSmokeHandoff = { title: string; copyChecklist: string; noUnsafeExecution: true };
export type ReleaseSmokeSummary = { title: string; commandCount: number; nextAction: string; safety: string };
