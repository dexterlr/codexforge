export type SafetyTerm = { term: string; plainEnglish: string; example: string };
export type SafetyPromise = { title: string; promises: string[] };
export type SafetyWarning = { title: string; warnings: string[] };
export type SafetyNextStep = { label: string; href: string; why: string };
export type SafetyCopy = { title: string; copyText: string };
export type SafetyCoachSummary = { title: string; subtitle: string; primaryAction: string; terms: SafetyTerm[]; promise: SafetyPromise; warning: SafetyWarning; nextStep: SafetyNextStep; copy: SafetyCopy };
