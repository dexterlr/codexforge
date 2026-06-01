import type { ModelCapabilitySummary } from "./model-capability-types";
import { buildModelCapabilityComparison } from "./model-capability-comparison";
import { buildDefaultModelCapabilityEntries } from "./model-capability-entry";
export function summarizeModelCapabilities(summary: ModelCapabilitySummary): string { return summary.entries.length + " model families compared with approximate labels and no live pricing claims."; }
export function buildModelCapabilitySummary(): ModelCapabilitySummary { const entries = buildDefaultModelCapabilityEntries(); const comparison = buildModelCapabilityComparison(entries); const summary = { entries, comparison, summary: "" }; return { ...summary, summary: summarizeModelCapabilities(summary) }; }
