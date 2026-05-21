import type { WorkflowShortcut } from "./product-simplification-types";

export function buildWorkflowShortcut(input: WorkflowShortcut): WorkflowShortcut {
  return { ...input };
}

export function buildDefaultWorkflowShortcuts(): WorkflowShortcut[] {
  const shortcuts: WorkflowShortcut[] = [
    { id: "start-code-fix", label: "Start code fix", description: "Inspect files, preview a patch, and prepare checks.", href: "/files", primaryActionLabel: "Start code fix", safetyBadges: ["Review first", "Approval required"] },
    { id: "inspect-files", label: "Inspect files", description: "Browse project files before planning work.", href: "/files", primaryActionLabel: "Inspect a file", safetyBadges: ["No file writes"] },
    { id: "run-checks", label: "Run checks", description: "Prepare validation checks for review.", href: "/validation", primaryActionLabel: "Prepare checks", safetyBadges: ["Approval required", "No auto-run"] },
    { id: "review-failure", label: "Review failure", description: "Paste output and choose the next fix step.", href: "/closed-loop", primaryActionLabel: "Review a failure", safetyBadges: ["Review first"] },
    { id: "plan-creative-render", label: "Plan creative render", description: "Choose a creative path and preview the plan.", href: "/creative", primaryActionLabel: "Plan creative work", safetyBadges: ["Preview only"] },
    { id: "review-artifacts", label: "Review artifacts", description: "Inspect output, provenance, and handoff.", href: "/artifacts/review", primaryActionLabel: "Review artifact", safetyBadges: ["Review first"] },
    { id: "setup-local-tools", label: "Setup local tools", description: "Review local bridge readiness.", href: "/local-bridge-health", primaryActionLabel: "Check setup", safetyBadges: ["No auto-run"] },
    { id: "review-creative-mvp", label: "Review creative MVP", description: "Review the design-only candidate.", href: "/creative-mvp", primaryActionLabel: "Review MVP candidate", safetyBadges: ["Design only"] },
  ];
  return shortcuts.map(buildWorkflowShortcut);
}

export function summarizeWorkflowShortcuts(shortcuts: readonly WorkflowShortcut[]): string {
  return `${shortcuts.length} workflow shortcuts available: ${shortcuts.map((shortcut) => shortcut.label).join(", ")}.`;
}
