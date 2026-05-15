import type {
  TaskReviewAction,
  TaskReviewActionType,
  TaskReviewItem,
  TaskReviewQueue,
  TaskReviewState,
  TaskSuggestion,
} from "./task-autopilot-types";
import { buildTaskHandoff } from "./task-handoff";
import { buildTaskPlanPreview } from "./task-plan-preview";

function nextStateForAction(type: TaskReviewActionType): TaskReviewState {
  if (type === "accept") return "accepted-for-planning";
  if (type === "reject") return "rejected";
  if (type === "defer") return "deferred";
  if (type === "block") return "blocked";
  if (type === "preview-plan") return "accepted-for-planning";
  return "handoff-ready";
}

export function buildTaskReviewItem(suggestion: TaskSuggestion, selected = false): TaskReviewItem {
  const planPreview = selected ? buildTaskPlanPreview(suggestion) : null;
  return {
    id: `task-review-item:${suggestion.id}`,
    suggestion,
    reviewState: suggestion.reviewState,
    selected,
    planPreview,
    handoffPrompt: buildTaskHandoff(suggestion, planPreview).prompt,
    summary: [
      "Review required before planning handoff.",
      "No active task is created silently.",
    ],
  };
}

export function buildTaskReviewQueue(suggestions: TaskSuggestion[]): TaskReviewQueue {
  return {
    id: "task-review-queue",
    items: suggestions.map((suggestion, index) => buildTaskReviewItem(suggestion, index === 0)),
    summary: summarizeTaskReviewQueue({
      id: "task-review-queue",
      items: suggestions.map((suggestion, index) => buildTaskReviewItem(suggestion, index === 0)),
      summary: [],
    }),
  };
}

export function reduceTaskReviewQueue(queue: TaskReviewQueue, action: TaskReviewAction): TaskReviewQueue {
  const nextItems = queue.items.map((item) => {
    if (item.id !== action.itemId) return item;
    const reviewState = nextStateForAction(action.type);
    const planPreview =
      action.type === "preview-plan" || action.type === "copy-handoff" || action.type === "accept"
        ? buildTaskPlanPreview(item.suggestion)
        : item.planPreview;
    return {
      ...item,
      reviewState,
      selected: true,
      planPreview,
      handoffPrompt: buildTaskHandoff(item.suggestion, planPreview).prompt,
      summary: [`Action ${action.type} applied in pure reducer.`, "No persistence write occurred."],
    };
  });

  return {
    id: "task-review-queue",
    items: nextItems,
    summary: summarizeTaskReviewQueue({ id: "task-review-queue", items: nextItems, summary: [] }),
  };
}

export function summarizeTaskReviewQueue(queue: TaskReviewQueue): string[] {
  const reviewRequired = queue.items.filter(
    (item) => item.reviewState === "suggested" || item.reviewState === "needs-review"
  ).length;
  const ready = queue.items.filter((item) => item.reviewState === "handoff-ready").length;
  const blocked = queue.items.filter((item) => item.reviewState === "blocked").length;
  return [
    `${queue.items.length} suggestions are in the review queue.`,
    `${reviewRequired} suggestions still need review.`,
    `${ready} suggestions are handoff ready; ${blocked} are blocked.`,
  ];
}
