import type { LiveTrialExampleChange } from "./coding-flow-live-trial-types";

export function buildLiveTrialExampleChange(input: LiveTrialExampleChange): LiveTrialExampleChange {
  return { ...input };
}

export function buildDefaultLiveTrialExampleChanges(): LiveTrialExampleChange[] {
  return [
    buildLiveTrialExampleChange({ exampleId: "copy-only-wording-change", title: "copy-only wording change", suggestedFileType: "UI copy component or docs wording", changeText: "Change one sentence of helper copy to be clearer without changing behavior.", whyItIsSafe: "Copy-only edits are easy to preview and revert.", expectedPreview: "A tiny one-file diff with text replacement only.", validationRecommendation: "npm run build plus targeted smoke for the touched feature when known.", riskLevel: "low", avoidIf: "The text lives in a policy, config, or execution boundary file." }),
    buildLiveTrialExampleChange({ exampleId: "small-ui-label-change", title: "small UI label change", suggestedFileType: "Button, link, or panel label component", changeText: "Rename a confusing label while preserving the route and action behavior.", whyItIsSafe: "The trial checks whether UX copy improves without changing workflow logic.", expectedPreview: "A small JSX text diff with no handler changes.", validationRecommendation: "npm run build and the smoke for the touched route.", riskLevel: "low", avoidIf: "The label is part of an allowlist, command id, or smoke marker." }),
    buildLiveTrialExampleChange({ exampleId: "harmless-helper-comment", title: "add a harmless helper comment", suggestedFileType: "Non-critical helper near complex copy formatting", changeText: "Add one short comment explaining why a manual-only handoff stays copy-only.", whyItIsSafe: "A comment does not change runtime behavior.", expectedPreview: "Comment-only diff.", validationRecommendation: "git diff --check and npm run build.", riskLevel: "low", avoidIf: "The repository prefers no comments in that module or the helper is security-sensitive." }),
    buildLiveTrialExampleChange({ exampleId: "empty-state-copy", title: "improve empty-state copy", suggestedFileType: "Empty state component", changeText: "Make empty-state guidance clearer for a first-time operator.", whyItIsSafe: "Empty states are visible UX copy and do not execute actions.", expectedPreview: "Text-only diff in one component.", validationRecommendation: "npm run build plus route smoke if known.", riskLevel: "low", avoidIf: "The empty state includes command execution or persistence wiring." }),
    buildLiveTrialExampleChange({ exampleId: "stable-smoke-string", title: "update a test/smoke string only if safe", suggestedFileType: "Stable smoke marker or assertion text", changeText: "Update a marker string only when the product copy changed and the smoke contract remains intentional.", whyItIsSafe: "It keeps smoke aligned with reviewed UI copy.", expectedPreview: "One smoke assertion update paired with the UI copy change.", validationRecommendation: "Run the targeted smoke and full server smoke.", riskLevel: "medium", avoidIf: "The marker guards safety boundaries or route support." }),
    buildLiveTrialExampleChange({ exampleId: "docs-wording", title: "documentation/readme wording if available", suggestedFileType: "README or docs file", changeText: "Clarify an operator instruction without changing commands.", whyItIsSafe: "Docs-only wording is low risk for a first live trial.", expectedPreview: "Markdown text change only.", validationRecommendation: "git diff --check and npm run build if docs are imported.", riskLevel: "low", avoidIf: "The doc contains release policy, secrets, or generated content." }),
  ];
}

export function summarizeLiveTrialExampleChange(example: LiveTrialExampleChange): string {
  return `${example.title}: ${example.suggestedFileType}, risk ${example.riskLevel}.`;
}
