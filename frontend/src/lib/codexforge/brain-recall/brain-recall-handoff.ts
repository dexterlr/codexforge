import type { BrainRecallHandoff, BrainRecallResult, BrainRecallSummary } from "./brain-recall-types";

const SAFETY_NOTES = [
  "Use these memories as context, not as source-of-truth.",
  "Inspect before editing.",
  "Do not mutate files without preview.",
  "Do not trust memory blindly if source is stale.",
  "Prefer current file content over recalled memory.",
  "Do not mutate the Brain graph from recall.",
];

function formatResult(result: BrainRecallResult): string {
  return [
    `- ${result.title}`,
    `  Node: ${result.nodeId}`,
    `  Kind: ${result.kind}`,
    `  Score: ${result.score}`,
    `  Snippet: ${result.snippet}`,
  ].join("\n");
}

export function buildRecallToChatPrompt(results: BrainRecallResult[], summary: BrainRecallSummary): string {
  return [
    "Use these memories as context for the next response.",
    "",
    `Query: ${summary.query}`,
    `Result count: ${summary.resultCount}`,
    "",
    "Recalled memories:",
    ...(results.length ? results.map(formatResult) : ["- No matching memories."]),
    "",
    "Safety:",
    ...SAFETY_NOTES.map((note) => `- ${note}`),
  ].join("\n");
}

export function buildRecallToFilePrompt(results: BrainRecallResult[], summary: BrainRecallSummary): string {
  const files = Array.from(new Set(results.flatMap((result) => result.relatedContext.files.map((file) => file.path)))).sort();

  return [
    "Use this Brain recall before file work.",
    "",
    `Query: ${summary.query}`,
    files.length ? `Related files: ${files.join(", ")}` : "Related files: none",
    "",
    "Instructions:",
    "- Inspect current file content before editing.",
    "- Prefer current file content over recalled memory.",
    "- Do not mutate files without preview.",
    "- Treat stale or contradictory memories as risks to verify.",
  ].join("\n");
}

export function buildBrainRecallHandoff(results: BrainRecallResult[], summary: BrainRecallSummary): BrainRecallHandoff {
  const selected = results.slice(0, 5);
  const handoff: BrainRecallHandoff = {
    id: "brain-recall-handoff",
    query: summary.query,
    selectedResultIds: selected.map((result) => result.id),
    chatPrompt: buildRecallToChatPrompt(selected, summary),
    filePrompt: buildRecallToFilePrompt(selected, summary),
    safetyNotes: SAFETY_NOTES,
    summary: [],
  };

  return { ...handoff, summary: summarizeBrainRecallHandoff(handoff) };
}

export function summarizeBrainRecallHandoff(handoff: BrainRecallHandoff): string[] {
  return [
    `${handoff.selectedResultIds.length} recall cards prepared for safe handoff.`,
    "No automatic chat submission, file mutation, or Brain graph mutation is performed.",
  ];
}
