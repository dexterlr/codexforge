import type { TaskModelRouterSummary } from "./task-model-router-types";
import { buildTaskModelContext } from "./task-model-context";
import { buildDefaultTaskModelProviderCandidates } from "./task-model-provider-candidate";
import { buildTaskModelRouteDecision } from "./task-model-route-decision";
import { buildDefaultTaskModelTasks } from "./task-model-task";
export function buildTaskModelRouterSummary(): TaskModelRouterSummary { const tasks = buildDefaultTaskModelTasks(); const candidates = buildDefaultTaskModelProviderCandidates(); const decision = buildTaskModelRouteDecision(tasks[0], candidates); return { tasks, context: buildTaskModelContext(), candidates, decision, summary: "Deterministic task-to-model recommendation with provider health, model capability, and token budget context. No real provider calls." }; }
