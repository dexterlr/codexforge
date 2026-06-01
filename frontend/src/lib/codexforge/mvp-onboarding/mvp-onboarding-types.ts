export type OnboardingStep = { id: string; title: string; route: string; plainEnglish: string };
export type OnboardingSafeTask = { title: string; detail: string; route: string };
export type OnboardingSafetyPromise = { title: string; promises: string[] };
export type OnboardingRouteGuide = { title: string; routes: string[] };
export type OnboardingFirstRun = { title: string; steps: string[] };
export type OnboardingCompletion = { title: string; doneWhen: string[] };
export type OnboardingHandoff = { title: string; copyText: string };
export type MvpOnboardingSummary = { title: string; subtitle: string; primaryAction: string; steps: OnboardingStep[]; safeTask: OnboardingSafeTask; safetyPromise: OnboardingSafetyPromise; routeGuide: OnboardingRouteGuide; firstRun: OnboardingFirstRun; completion: OnboardingCompletion; handoff: OnboardingHandoff };
