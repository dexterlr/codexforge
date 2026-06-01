import type { TaskModelProviderCandidate } from "./task-model-router-types";
export function buildTaskModelProviderCandidate(input: TaskModelProviderCandidate): TaskModelProviderCandidate { return input; }
export function buildDefaultTaskModelProviderCandidates(): TaskModelProviderCandidate[] { return [
 { id:"local-private", family:"local small", provider:"Ollama or LM Studio", localPrivate:true, cheapDraft:true, premium:false, manualOnly:false, blocked:false, reason:"Private local prepass for sensitive work." },
 { id:"cheap-cloud", family:"OpenAI-compatible fast", provider:"Configured compatible API", localPrivate:false, cheapDraft:true, premium:false, manualOnly:false, blocked:true, reason:"Cheap draft route after an API key is configured." },
 { id:"premium-reasoning", family:"OpenAI-compatible reasoning", provider:"Configured compatible API", localPrivate:false, cheapDraft:false, premium:true, manualOnly:false, blocked:true, reason:"Premium escalation route for hard reasoning." },
 { id:"long-context", family:"Gemini long-context", provider:"Gemini API", localPrivate:false, cheapDraft:false, premium:true, manualOnly:false, blocked:true, reason:"Long-context analysis after setup." },
 { id:"manual-chatgpt", family:"manual ChatGPT subscription", provider:"ChatGPT website", localPrivate:false, cheapDraft:false, premium:true, manualOnly:true, blocked:false, reason:"Manual browser fallback with no password storage." },
]; }
