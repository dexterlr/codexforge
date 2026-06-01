export type EmptyStateDefinition = { id: string; title: string; missing: string; whyItMatters: string; safeNextStep: string; href: string };
export type EmptyStateNextAction = { label: string; href: string; copy: string };
export type EmptyStateHelpCopy = { title: string; copy: string };
export type EmptyStateRouteMap = { title: string; routes: string[] };
export type EmptyStateSafetyNote = { title: string; note: string };
export type SmartEmptyStateSummary = { title: string; subtitle: string; primaryAction: string; definitions: EmptyStateDefinition[]; nextAction: EmptyStateNextAction; helpCopy: EmptyStateHelpCopy; routeMap: EmptyStateRouteMap; safetyNote: EmptyStateSafetyNote };
