import type { ProductSimplificationRoute, UserIntentId, UserIntentOption } from "./product-simplification-types";

export function buildUserIntentOption(input: UserIntentOption): UserIntentOption {
  return { ...input };
}

const INTENTS: readonly UserIntentOption[] = [
  {
    id: "try-coding-flow",
    label: "Try coding flow",
    description: "Use the live trial pack before a real coding-flow run.",
    primaryRoute: "/code-flow/trial",
    recommendedRoute: "/code-flow/trial",
    secondaryRoutes: ["/code-flow", "/run-history"],
    userOutcome: "A guided operator trial from safe file choice to result handoff.",
    hiddenAdvancedRoutes: ["/readiness"],
    safetyPosture: ["Review first", "Approval required", "No auto-run"],
    nextActionLabel: "Start trial",
  },
  {
    id: "fix-code",
    label: "Fix code",
    description: "Inspect files, preview a patch, then validate before any apply step.",
    primaryRoute: "/files",
    recommendedRoute: "/start",
    secondaryRoutes: ["/validation", "/closed-loop"],
    userOutcome: "A reviewed fix path with checks ready.",
    hiddenAdvancedRoutes: ["/jarvis", "/readiness"],
    safetyPosture: ["Review first", "Approval required", "No auto-run"],
    nextActionLabel: "Start code fix",
  },
  {
    id: "inspect-project",
    label: "Inspect project files",
    description: "Browse the project and read files before planning a change.",
    primaryRoute: "/files",
    recommendedRoute: "/files",
    secondaryRoutes: ["/jarvis"],
    userOutcome: "You know what file or area needs attention.",
    hiddenAdvancedRoutes: ["/readiness"],
    safetyPosture: ["Review first", "No file writes"],
    nextActionLabel: "Inspect a file",
  },
  {
    id: "run-validation",
    label: "Run checks",
    description: "Prepare the build and smoke checks you want to review.",
    primaryRoute: "/validation",
    recommendedRoute: "/validation",
    secondaryRoutes: ["/closed-loop"],
    userOutcome: "A validation plan ready for manual or approved execution.",
    hiddenAdvancedRoutes: ["/readiness"],
    safetyPosture: ["Approval required", "No auto-run"],
    nextActionLabel: "Prepare checks",
  },
  {
    id: "review-failure",
    label: "Review a failure",
    description: "Paste failure output and route it into a fix loop.",
    primaryRoute: "/closed-loop",
    recommendedRoute: "/closed-loop",
    secondaryRoutes: ["/validation", "/files"],
    userOutcome: "A failure is converted into a clear next fix step.",
    hiddenAdvancedRoutes: ["/jarvis"],
    safetyPosture: ["Review first", "Preview only"],
    nextActionLabel: "Start fix loop",
  },
  {
    id: "create-artifact",
    label: "Plan creative work",
    description: "Choose a Blender, ComfyUI, Unreal, or video render path.",
    primaryRoute: "/creative",
    recommendedRoute: "/creative",
    secondaryRoutes: ["/blender", "/comfyui", "/unreal", "/video-render"],
    userOutcome: "A creative plan ready for review.",
    hiddenAdvancedRoutes: ["/creative-executor", "/creative-sandbox"],
    safetyPosture: ["Preview only", "No auto-run"],
    nextActionLabel: "Plan creative work",
  },
  {
    id: "review-artifact",
    label: "Review artifacts",
    description: "Check outputs, provenance, and handoff notes.",
    primaryRoute: "/artifacts/review",
    recommendedRoute: "/artifacts/review",
    secondaryRoutes: ["/creative"],
    userOutcome: "A reviewed artifact with clear handoff guidance.",
    hiddenAdvancedRoutes: ["/creative-mvp"],
    safetyPosture: ["Review first", "Preview only"],
    nextActionLabel: "Review artifact",
  },
  {
    id: "setup-local-tools",
    label: "Set up local tools",
    description: "Review local bridge readiness before any creative execution plan.",
    primaryRoute: "/local-bridge-health",
    recommendedRoute: "/local-bridge-health",
    secondaryRoutes: ["/health-probe", "/creative-readiness"],
    userOutcome: "Setup gaps are visible before a real tool path.",
    hiddenAdvancedRoutes: ["/creative-executor"],
    safetyPosture: ["Review first", "No auto-run"],
    nextActionLabel: "Check setup",
  },
  {
    id: "plan-creative-execution",
    label: "Plan a creative render",
    description: "Review readiness, dry-run design, and MVP candidate before anything real.",
    primaryRoute: "/creative-mvp",
    recommendedRoute: "/creative-mvp",
    secondaryRoutes: ["/creative-readiness", "/creative-executor"],
    userOutcome: "A safe creative execution plan, still design-only.",
    hiddenAdvancedRoutes: ["/creative-sandbox", "/health-probe"],
    safetyPosture: ["Design only", "Approval required", "No auto-run"],
    nextActionLabel: "Review MVP candidate",
  },
  {
    id: "manage-memory",
    label: "Manage memory",
    description: "Review memory work without graph mutation.",
    primaryRoute: "/memory",
    recommendedRoute: "/memory",
    secondaryRoutes: ["/jarvis"],
    userOutcome: "Memory candidates are reviewed before promotion.",
    hiddenAdvancedRoutes: ["/readiness"],
    safetyPosture: ["Review first", "No file writes"],
    nextActionLabel: "Review memory",
  },
  {
    id: "audit-readiness",
    label: "Audit readiness",
    description: "Check product posture and next implementation guidance.",
    primaryRoute: "/readiness",
    recommendedRoute: "/readiness",
    secondaryRoutes: ["/start"],
    userOutcome: "A readiness checkpoint with the next safe product step.",
    hiddenAdvancedRoutes: ["/creative-readiness"],
    safetyPosture: ["Review first", "Preview only"],
    nextActionLabel: "Audit readiness",
  },
] as const;

export function buildDefaultUserIntentOptions(): UserIntentOption[] {
  return INTENTS.map(buildUserIntentOption);
}

export function classifyUserIntent(value: string): UserIntentOption {
  const normalized = value.toLowerCase();
  const intents = buildDefaultUserIntentOptions();
  return (
    intents.find((intent) => intent.id === normalized || intent.label.toLowerCase() === normalized) ??
    intents.find((intent) => normalized.includes(intent.label.toLowerCase())) ??
    intents[0]
  );
}

export function summarizeUserIntentOption(intent: UserIntentOption): string {
  const routes: ProductSimplificationRoute[] = [intent.primaryRoute, ...intent.secondaryRoutes];
  return `${intent.label}: ${intent.userOutcome} Next: ${intent.nextActionLabel}. Routes: ${routes.join(", ")}.`;
}
