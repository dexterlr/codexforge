import type { EmptyStateDefinition } from "./smart-empty-state-types";

export function buildEmptyStateDefinition(input: EmptyStateDefinition): EmptyStateDefinition {
  return input;
}

export function buildDefaultEmptyStateDefinitions(): EmptyStateDefinition[] {
  return [
    buildEmptyStateDefinition({ id: "no-goal-selected", title: "No goal selected", missing: "You have not chosen the tiny task yet.", whyItMatters: "The app needs a safe target before it can guide you.", safeNextStep: "Start with the first safe task.", href: "/first-task" }),
    buildEmptyStateDefinition({ id: "no-file-selected", title: "No file selected", missing: "No file is selected.", whyItMatters: "A preview needs one safe file.", safeNextStep: "Choose a harmless UI file.", href: "/files" }),
    buildEmptyStateDefinition({ id: "no-patch-preview-yet", title: "No preview yet", missing: "No proposed change has been previewed.", whyItMatters: "Preview lets you read before anything changes.", safeNextStep: "Create or inspect a preview first.", href: "/files" }),
    buildEmptyStateDefinition({ id: "no-apply-approval-yet", title: "No approval yet", missing: "The apply request is not approved.", whyItMatters: "Apply may change a file.", safeNextStep: "Review the apply request.", href: "/guarded-apply-mvp" }),
    buildEmptyStateDefinition({ id: "no-evidence-captured-yet", title: "No evidence captured", missing: "Nothing has been recorded yet.", whyItMatters: "Evidence tells you what happened.", safeNextStep: "Capture the result note.", href: "/apply-evidence" }),
    buildEmptyStateDefinition({ id: "no-validation-output-pasted", title: "No validation output", missing: "No check result has been pasted.", whyItMatters: "Review needs the output you ran separately.", safeNextStep: "Paste validation output.", href: "/validation-results" }),
    buildEmptyStateDefinition({ id: "no-review-items", title: "No review items", missing: "There is nothing waiting for review.", whyItMatters: "The inbox stays calm when no action is needed.", safeNextStep: "Continue to run history.", href: "/run-history" }),
    buildEmptyStateDefinition({ id: "no-run-history-yet", title: "No run history yet", missing: "No reviewed run has been recorded.", whyItMatters: "History helps you remember safe work.", safeNextStep: "Finish a first task handoff.", href: "/first-task" }),
    buildEmptyStateDefinition({ id: "no-recovery-case-selected", title: "No recovery case selected", missing: "No failure or blocked case is selected.", whyItMatters: "Recovery needs a clear symptom.", safeNextStep: "Choose blocked, failed, or unknown.", href: "/recovery" }),
    buildEmptyStateDefinition({ id: "no-demo-result-yet", title: "No demo result yet", missing: "The demo has not been reviewed.", whyItMatters: "A demo result shows what still remains manual.", safeNextStep: "Run the demo script manually.", href: "/demo" }),
  ];
}
