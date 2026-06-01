import type { ModelCapabilityComparison, ModelCapabilityEntry } from "./model-capability-types";
import { scoreModelCapabilityFit } from "./model-capability-fit";
export function buildModelCapabilityComparison(entries: ModelCapabilityEntry[], task = "review a patch"): ModelCapabilityComparison { const fits = entries.map((entry) => scoreModelCapabilityFit(entry, task)).sort((a,b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id)); return { task, fits, best: fits[0] }; }
