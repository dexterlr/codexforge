export type DemoStep = { id: string; order: number; title: string; route: string; talkingPoint: string };
export type DemoScript = { title: string; steps: DemoStep[]; noExecution: true };
export type DemoSafeScenario = { title: string; fileCategory: string; change: string; blockedClaims: string[] };
export type DemoScreenMap = { routes: string[]; advancedDetailsHidden: true };
export type DemoTalkingPoints = { proves: string[]; remainsManual: string[] };
export type DemoSuccessCriteria = { criteria: string[]; noFakeApplyClaim: true; noFakeValidationSuccess: true };
export type DemoHandoff = { title: string; copyScript: string; hrefs: string[]; noUnsafeExecution: true };
export type DemoSummary = { title: string; stepCount: number; nextAction: string; safety: string };
