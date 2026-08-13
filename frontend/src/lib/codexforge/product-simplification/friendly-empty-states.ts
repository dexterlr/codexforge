import type { FriendlyEmptyState } from "./product-simplification-types";

export function buildFriendlyEmptyState(input: FriendlyEmptyState): FriendlyEmptyState {
  return { ...input };
}

const STATES: readonly FriendlyEmptyState[] = [
  { route: "/files", title: "Select a file to inspect it.", body: "Choose a file from the project explorer to preview code and prepare safe context.", primaryActionLabel: "Inspect a file", secondaryActionLabel: "Ask Jarvis", routeSuggestion: "/jarvis", safetyNote: "Read-only and no file writes." },
  { route: "/closed-loop", title: "Paste validation output to start a fix loop.", body: "A failure can become a reviewed path through file inspection, patch preview, and checks.", primaryActionLabel: "Start fix loop", secondaryActionLabel: "Prepare checks", routeSuggestion: "/validation", safetyNote: "Review first; no auto-fix." },
  { route: "/creative", title: "Choose a creative path to plan your first artifact.", body: "Start with Blender, ComfyUI, Unreal, video render, or artifact review.", primaryActionLabel: "Plan creative work", secondaryActionLabel: "Review artifacts", routeSuggestion: "/artifacts/review", safetyNote: "Preview only; no render execution." },
  { route: "/local-bridge-health", title: "Add setup details to check local tool readiness.", body: "Review what is configured before planning a real tool path.", primaryActionLabel: "Check setup", secondaryActionLabel: "Audit readiness", routeSuggestion: "/creative-readiness", safetyNote: "No probes run automatically." },
  { route: "/creative-mvp", title: "Review the recommended MVP candidate before enabling anything real.", body: "The candidate stays design-only until a future approved implementation phase.", primaryActionLabel: "Review MVP candidate", secondaryActionLabel: "Audit readiness", routeSuggestion: "/creative-readiness", safetyNote: "Design only; execution allowed false." },
  { route: "/start", title: "What do you want to do?", body: "Choose a plain-English goal and CodexForge will point you to the right safe surface.", primaryActionLabel: "Choose an intent", secondaryActionLabel: "Open advanced links", routeSuggestion: "/start", safetyNote: "No auto-run from Start." },
];

export function buildDefaultFriendlyEmptyStates(): FriendlyEmptyState[] {
  return STATES.map(buildFriendlyEmptyState);
}

export function summarizeFriendlyEmptyState(state: FriendlyEmptyState): string {
  return `${state.route}: ${state.title} Primary action: ${state.primaryActionLabel}.`;
}
