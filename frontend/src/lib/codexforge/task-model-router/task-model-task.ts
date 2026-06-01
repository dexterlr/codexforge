import type { TaskModelTask } from "./task-model-router-types";
export function buildTaskModelTask(input: TaskModelTask): TaskModelTask { return input; }
export function buildDefaultTaskModelTasks(): TaskModelTask[] { return [
 { id:"fix-small-ui-bug", title:"fix small UI bug", sensitivity:"low", needsReasoning:false, needsLongContext:false, wantsCheapDraft:true, wantsLocalPrivate:false, tokenBudget:4000 },
 { id:"review-patch", title:"review a patch", sensitivity:"medium", needsReasoning:true, needsLongContext:false, wantsCheapDraft:false, wantsLocalPrivate:false, tokenBudget:7000 },
 { id:"summarize-file", title:"summarize file", sensitivity:"medium", needsReasoning:false, needsLongContext:true, wantsCheapDraft:true, wantsLocalPrivate:false, tokenBudget:12000 },
 { id:"explain-error", title:"explain error", sensitivity:"low", needsReasoning:true, needsLongContext:false, wantsCheapDraft:true, wantsLocalPrivate:false, tokenBudget:5000 },
 { id:"classify-validation-failure", title:"classify validation failure", sensitivity:"medium", needsReasoning:false, needsLongContext:false, wantsCheapDraft:true, wantsLocalPrivate:false, tokenBudget:5000 },
 { id:"plan-refactor", title:"plan refactor", sensitivity:"medium", needsReasoning:true, needsLongContext:true, wantsCheapDraft:false, wantsLocalPrivate:false, tokenBudget:16000 },
 { id:"high-risk-apply-review", title:"high-risk apply review", sensitivity:"high", needsReasoning:true, needsLongContext:true, wantsCheapDraft:false, wantsLocalPrivate:false, tokenBudget:18000 },
 { id:"private-local-prepass", title:"private local prepass", sensitivity:"high", needsReasoning:false, needsLongContext:false, wantsCheapDraft:true, wantsLocalPrivate:true, tokenBudget:6000 },
 { id:"long-context-analysis", title:"long context analysis", sensitivity:"medium", needsReasoning:true, needsLongContext:true, wantsCheapDraft:false, wantsLocalPrivate:false, tokenBudget:24000 },
]; }
