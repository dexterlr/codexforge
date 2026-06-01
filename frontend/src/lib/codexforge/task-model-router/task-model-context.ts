import type { TaskModelContext } from "./task-model-router-types";
import { buildProviderHealthSummary } from "../provider-health-checks";
import { buildModelCapabilitySummary } from "../model-capability-matrix";
export function buildTaskModelContext(): TaskModelContext { return { providerHealthSummary: buildProviderHealthSummary().summary, modelCapabilitySummary: buildModelCapabilitySummary().summary, tokenPolicy: "cheap/local first, escalate if needed, manual remains manual", noProviderCalls: true }; }
