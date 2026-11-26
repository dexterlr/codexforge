import type { JarvisChatConversation } from "../../jarvis-chat/jarvis-chat-types";
import { containsPrivateAlphaSecretLikeContent } from "../../private-alpha/private-alpha-validation";

export type ProjectMemoryEntry = Readonly<{
  id: string;
  kind: "decision" | "worked" | "did-not-work";
  text: string;
  at: string;
  sourceLabel: string;
  sourceId: string;
  sourceType: "jarvis" | "creator" | "project-note" | "codex-chat";
  relatedDecisionId: string | null;
}>;

type Kind = ProjectMemoryEntry["kind"];

export type CodexLearningMessage = Readonly<{
  id: string;
  turnId: string;
  role: "user" | "assistant";
  at: string;
  text: string;
}>;

// Use complete, attributable statements. Truncating a clause could remove a qualification.
const MAX_STATEMENT = 480;
const RECALL_LIMIT = 12;
const STOP_WORDS = new Set((
  "a an and are as at be because been but by do does doesn't did didn't for from had has have how " +
  "i in into is it its me my not of on or our so than that the their them then these they this " +
  "those to us was we were what when which why will with would you your " +
  "about any can tell show remember recall previous earlier related before again please " +
  "approach change decision decisions decide decided choose chose agreed use using " +
  "outcome outcomes result results work works worked failed failure passed fix fixed"
).split(/\s+/u));

function terms(text: string): Set<string> {
  return new Set((text.toLowerCase().replaceAll("’", "'").match(/[\p{L}\p{N}]+(?:'[\p{L}]+)?/gu) ?? [])
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word)));
}

function overlap(left: ReadonlySet<string>, right: ReadonlySet<string>) {
  let count = 0;
  for (const word of left) if (right.has(word)) count++;
  return count;
}

const GENERATED_CONTEXT = /^(?:Use these memories as context for the next response\.|Use this Brain recall before file work\.|Selected Brain recall context for this chat:|Evidence-Grounded Chat Context)$/iu;

export function withoutRecalledMemory(text: string): string {
  const remaining: string[] = [];
  let inRecall = false;
  for (const line of text.split(/\r?\n/u)) {
    const trimmed = line.trim();
    if (trimmed === "[Brain memory]") inRecall = true;
    else if (trimmed === "[/Brain memory]") inRecall = false;
    else if (!inRecall) remaining.push(line);
  }
  return remaining.join("\n");
}

function* operatorClauses(message: string, codexRole?: CodexLearningMessage["role"]) {
  let fence = "";
  let example: "awaiting" | "paragraph" | "section" | null = null;
  const lines: string[] = [];
  for (const line of withoutRecalledMemory(message).split("\n")) {
    let trimmed = line.trim();
    if (fence) {
      if (trimmed.startsWith(fence)) fence = "";
      continue;
    }
    if (GENERATED_CONTEXT.test(trimmed)) break;
    const openingFence = /^(`{3,}|~{3,})/u.exec(trimmed);
    if (openingFence) {
      fence = openingFence[1];
      if (example === "awaiting") example = "paragraph";
      continue;
    }
    if (example === "paragraph" && !trimmed) example = null;
    if (example === "awaiting" && trimmed) example = "paragraph";
    if (!trimmed || /^\s*>|^(?: {4}|\t)/u.test(line)) continue;
    if (codexRole) {
      // Keep readable link labels. Link destinations can contain local paths or account identifiers.
      trimmed = trimmed.replace(/!?\[([^\]\n]*)\]\((?:<[^>\n]*>|[^()\n]|\([^()\n]*\))*\)/gu, "$1")
        .replace(/\*\*|__/gu, "");
      if (/^(?:#{1,6}\s*)?(?:for example|examples?|sample|hypothetical|e\.g\.)\b/iu.test(trimmed)) {
        example = trimmed.startsWith("#") ? "section" : trimmed.endsWith(":") ? "awaiting" : null;
        continue;
      }
      if (/^#/u.test(trimmed) || /^(?:actual results?|verification|test results?)\s*:/iu.test(trimmed)) example = null;
      if (example) continue;
    }
    // A code-formatted identifier can be the object of an explicit technical decision.
    lines.push(DECISION.test(trimmed) ? trimmed.replace(/`([\w./:-]+)`/gu, "$1") : trimmed);
  }
  // Mask complete quoted spans, including multiline quotations, before sentence splitting.
  const masked = lines.join("\n").replace(
    /"[^"]*(?:"|$)|“[^”]*(?:”|$)|(?:^|\s)['‘][\s\S]*?(?:['’](?=\s|[.,!?;:]|$)|$)|`[^`]*(?:`|$)/gu,
    (quoted) => quoted.replace(/[^\n]+/gu, "\uFFFC")
  );
  for (const line of masked.split("\n")) {
    for (const sentence of line.split(/(?<=[.!?;])\s+/u)) {
      if (sentence.includes("?") && !(codexRole === "user" && isImplementationRequest(sentence) && /^[^?]+\?$/u.test(sentence))) continue;
      const contrasted = sentence.split(/,?\s+(?:but|and)\s+/iu);
      // Keep qualifications ("worked but only once") and attribution ("we tried X but it failed").
      const parts = contrasted.length > 1 && contrasted.every((part) => classifyMessageClause(part, codexRole)) ? contrasted : [sentence];
      for (const part of parts) {
        const clause = part.replace(/^[-*•]\s+/u, "").replace(/;$/u, "").trim();
        if (clause && clause.length <= MAX_STATEMENT && !clause.includes("\uFFFC")) yield clause;
      }
    }
  }
}

const HEDGED = /\b(?:if|whether|unless|maybe|perhaps|probably|possibly|might|could|would|should|hopefully|suppose|supposed|imagine|example|hypothetical|apparently|allegedly)\b|\b(?:think|thought|guess|wonder|wondering|hope|hoping|assume|suspect|expect|seems?|seemed|looks like|not sure|unclear|not certain|not convinced)\b/iu;
const REPORTED_SPEECH = /\b(?:said|says?|wrote|claims?|claimed|reported|asked|quoted|pretend|repeat|write|print)\b/iu;
const DECISION = /^(?:(?:decision|decided|agreed)\s*:\s*\S|(?:we|i)(?:'ve| have)?\s+(?:decided|chose|selected|picked|agreed|settled on|opted for|went with)\s+\S|(?:let's|let us|(?:we|i)(?:'ll| will))\s+(?:use|go with|keep|choose|switch to|adopt|stop using|drop|stick with|build)\s+\S)/iu;
const NEGATIVE_LABEL = /^(?:what (?:didn't|did not|doesn't|does not) work|didn't work|did not work|failed)\s*:\s*\S/iu;
const POSITIVE_LABEL = /^(?:what worked|what works|worked|succeeded)\s*:\s*\S/iu;
const NEGATIVE = /\b(?:(?:didn't|did not|doesn't|does not|never)\s+(?:work|fix|solve|resolve|pass|help|succeed)|(?:isn't|is not|wasn't|was not) working|no longer works|(?:is|was|were|are|still)\s+(?:still\s+)?(?:broken|failing)|failed|fails|broke|regressed|timed out|made (?:it|things) worse)\b/iu;
const POSITIVE = /\b(?:worked|works|passed|passes|succeeded|fixed|resolved|prevented|solved|helped|(?:are|were|is|was) passing)\b/iu;

function classify(clause: string): Kind | null {
  const text = clause.replaceAll("’", "'");
  // Keep the condition as part of the decision. It describes when to apply it.
  const commitment = text.split(/\s+\b(?:if|unless)\b/iu, 1)[0];
  if (DECISION.test(commitment) && !HEDGED.test(commitment) && !REPORTED_SPEECH.test(commitment)) return "decision";
  if (HEDGED.test(text) || REPORTED_SPEECH.test(text)) return null;
  if (NEGATIVE_LABEL.test(text)) return "did-not-work";
  if (POSITIVE_LABEL.test(text)) return "worked";
  if (/^(?:did|does|can|is|are|was|were|why|how|when|will|tell|show|find|explain|check|verify|ensure|consider)\b/iu.test(text) ||
      /\b(?:will|won't|going to|used to|may|cannot tell|can't tell|make sure|(?:want|need|trying) to (?:know|understand|find|see)|needs? to be|has to be|must be)\b/iu.test(text)) return null;
  if (NEGATIVE.test(text) && !/\b(?:not|never|no longer|\w+n't)\s+(?:failed|failing|broken|timed out|regressed)\b/iu.test(text)) return "did-not-work";
  if (/^(?:nothing|neither approach) worked\b/iu.test(text)) return "did-not-work";
  if (/\b(?:not|never|no|nothing|neither|\w+n't)\b/iu.test(text)) return null;
  if (/\bworked (?:on|at|for a|as|together|hard)\b|\b(?:a|an|the|our|some|any) fixed\b|\b(?:fixed|resolved) (?:width|height|budget|price|rate|cost|deadline|size)\b/iu.test(text)) return null;
  return POSITIVE.test(text) ? "worked" : null;
}

// A request to change the software records the user's chosen direction. Questions
// about feasibility or diagnosing an outcome do not establish that choice.
function isImplementationRequest(text: string): boolean {
  const request = text.replace(/^(?:(?:can|could|would|will) you\s+)?(?:please\s+)?/iu, "");
  if (!/^(?:build|implement|add|make|remove|replace|switch|use|enable|disable|set up|connect|integrate|fix|keep)\s+\S/iu.test(request)) return false;
  return !/^(?:make sure|use an example|use this example)\b|\b(?:whether|hypothetically|maybe|might|wonder|instead of actually|or would|or should|if we decide)\b/iu.test(request);
}

function classifyMessageClause(text: string, codexRole?: CodexLearningMessage["role"]): Kind | null {
  if (!codexRole) return classify(text);
  // Desktop messages did not pass through Jarvis's local request admission.
  if (/[\p{Cc}\p{Cf}\p{Cs}<>]/u.test(text) || /(?:https?:\/\/|[A-Za-z]:[\\/]|\/Users\/|\/home\/)/u.test(text)) return null;
  if (codexRole === "user") {
    const direction = text.replace(/^(?:yes|no|ok(?:ay)?|actually)[,;]\s*/iu, "");
    if (isImplementationRequest(direction) || /^this (?:chat is|is (?:a|the) chat) for\s+\S/iu.test(text)) return "decision";
    if (/^(?:what|how|why|who)\b/iu.test(text) && !POSITIVE_LABEL.test(text) && !NEGATIVE_LABEL.test(text)) return null;
    return classify(direction);
  }
  // Assistant evidence is a report, never a substitute for an operator decision.
  // Require an observed outcome, so suggestions and example assertions stay out.
  if (HEDGED.test(text) || /\b(?:for example|for instance|you can|you could|you will|you’ll|should|would|will|plan to|to verify|run this|try this)\b/iu.test(text)) return null;
  const check = /\b(?:tests?|checks?|lint|eslint|typescript|tsc|typecheck|build|smokes?|suite|verification|validation|browser|migration|deployment|integration|fix|repair)\b/iu.test(text);
  if (/\b(?:no|none of the) (?:tests?|checks?) failed\b|\b(?:did not|didn't) fail\b/iu.test(text)) return null;
  if (check && /\b(?:checks?|tests?|lint) (?:still |continue to )?flags?\s|\b(?:still|remain(?:s)?) failing\b/iu.test(text)) return "did-not-work";
  const outcome = classify(text);
  if (outcome === "decision") return null;
  if (!outcome && check && /\b(?:verified|confirmed|demonstrated) that\b/iu.test(text) &&
      !/\b(?:not|never|no|\w+n't|didn’t|couldn’t)\b/iu.test(text)) return "worked";
  if (check || POSITIVE_LABEL.test(text) || NEGATIVE_LABEL.test(text)) return outcome;
  return null;
}

function relatedDecision(
  text: string, decisionsByTerm: ReadonlyMap<string, ProjectMemoryEntry | null>, recent: readonly ProjectMemoryEntry[]
): ProjectMemoryEntry | null {
  let matched: ProjectMemoryEntry | undefined;
  for (const term of terms(text)) {
    const candidate = decisionsByTerm.get(term);
    if (candidate === null || (candidate && matched && candidate !== matched)) return null;
    if (candidate) matched = candidate;
  }
  if (matched) return matched;
  const refersBack = /^(?:that|this|it)(?:\s+(?:approach|change|decision|fix))?\s+(?:(?:still|actually|also|finally)\s+)?(?:did|didn't|does|doesn't|never|was|is|isn't|worked|works|passed|failed|fails|succeeded|fixed|solved|helped|broke)\b/iu;
  if (recent.length === 1 && refersBack.test(text.replaceAll("’", "'"))) return recent[0];
  return null;
}

type MemoryMessage = CodexLearningMessage & { label: string };

function extractMessageMemory(
  sourceType: "jarvis" | "codex-chat", sourceId: string, messages: readonly MemoryMessage[]
): ProjectMemoryEntry[] {
  const entries: ProjectMemoryEntry[] = [];
  // A term points to one decision or to null when multiple decisions contain it.
  const decisionsByTerm = new Map<string, ProjectMemoryEntry | null>();
  const turnDecisions = new Map<string, ProjectMemoryEntry[]>();
  let recent: ProjectMemoryEntry[] = [];
  for (const message of messages) {
    const role = sourceType === "codex-chat" ? message.role : undefined;
    const currentDecisions: ProjectMemoryEntry[] = [];
    let clauseIndex = 0;
    for (const text of operatorClauses(message.text, role)) {
      const id = `${sourceType}:${sourceId}:${message.id}:${clauseIndex++}`;
      const kind = classifyMessageClause(text, role);
      if (!kind) {
        if (role !== "assistant") recent = [];
        continue;
      }
      const sameTurn = turnDecisions.get(message.turnId);
      const linked = kind === "decision" ? null : relatedDecision(text, decisionsByTerm, recent) ??
        (role === "assistant" && sameTurn?.length === 1 ? sameTurn[0] : null);
      const entry: ProjectMemoryEntry = {
        id, kind, text, at: message.at, sourceId, sourceType, sourceLabel: message.label,
        relatedDecisionId: linked?.id ?? null,
      };
      entries.push(entry);
      if (kind === "decision") {
        for (const term of terms(text)) decisionsByTerm.set(term, decisionsByTerm.has(term) ? null : entry);
        currentDecisions.push(entry);
        if (role === "user") {
          const inTurn = turnDecisions.get(message.turnId) ?? [];
          inTurn.push(entry);
          turnDecisions.set(message.turnId, inTurn);
        }
        recent = currentDecisions;
      } else {
        recent = linked ? [linked] : [];
      }
    }
    if (clauseIndex === 0 && role !== "assistant") recent = [];
  }
  return entries;
}

export function extractConversationMemory(conversation: JarvisChatConversation): ProjectMemoryEntry[] {
  if (conversation.state === "deleting") return [];
  return extractMessageMemory("jarvis", conversation.conversationId, conversation.turns.map((turn) => ({
    id: turn.userMessage.messageId, turnId: turn.turnId, role: "user", at: turn.userMessage.createdAt,
    text: turn.userMessage.text, label: `${conversation.title} · Turn ${turn.ordinal}`,
  })));
}

export function extractCodexChatMemory(threadId: string, messages: readonly CodexLearningMessage[]): ProjectMemoryEntry[] {
  const seen = new Set<string>();
  const safeMessages: MemoryMessage[] = [];
  for (const message of messages) {
    if ((message.role !== "user" && message.role !== "assistant") || !message.id || !message.turnId ||
        !Number.isFinite(Date.parse(message.at)) || containsPrivateAlphaSecretLikeContent(message.text) ||
        /\b(?:password|passphrase|api[_ -]?key|access[_ -]?token|client[_ -]?secret)\s*(?:[:=]|\bis\b)\s*\S/iu.test(message.text) ||
        /<(?:environment_context|user_instructions|system|developer|INSTRUCTIONS)>/iu.test(message.text)) continue;
    const id = `${message.role}:${message.id}`;
    if (seen.has(id)) continue;
    seen.add(id);
    safeMessages.push({ ...message, id, label: message.role === "user" ? "User message" : "Assistant report" });
  }
  return extractMessageMemory("codex-chat", threadId, safeMessages);
}

export function recallProjectMemory(entries: readonly ProjectMemoryEntry[], query: string, limit = RECALL_LIMIT): ProjectMemoryEntry[] {
  if (limit <= 0 || !Number.isSafeInteger(limit)) return [];
  const words = terms(query);
  const requested = new Set<Kind>();
  if (/\bdecisions?\b|\bdecided?\b/iu.test(query)) requested.add("decision");
  if (/\b(?:worked|works|passed|succeeded)\b/iu.test(query)) requested.add("worked");
  if (/\b(?:failed|failures?|did(?:n't|n’t| not) work|does(?:n't|n’t| not) work)\b/iu.test(query)) requested.add("did-not-work");
  const directScores = new Map(entries.map((entry) => {
    const searchable = entry.sourceType === "jarvis" ? entry.text : `${entry.sourceLabel} ${entry.sourceId} ${entry.text}`;
    return [entry.id, overlap(words, terms(searchable))];
  }));
  const linkedScores = new Map<string, number>();
  for (const entry of entries) {
    if (entry.relatedDecisionId) {
      linkedScores.set(entry.relatedDecisionId, Math.max(linkedScores.get(entry.relatedDecisionId) ?? 0, directScores.get(entry.id) ?? 0));
    }
  }
  const ranked = entries.map((entry) => {
    const matched = directScores.get(entry.id) ?? 0;
    const groupId = entry.relatedDecisionId ?? entry.id;
    const linked = Math.max(directScores.get(groupId) ?? 0, linkedScores.get(groupId) ?? 0);
    const relevant = Math.max(2 * matched, linked);
    const requestedKind = requested.has(entry.kind);
    const score = relevant > 0 || words.size === 0 ? 2 * relevant + Number(requestedKind) : 0;
    return { entry, score };
  }).filter(({ score }) => score > 0).sort((left, right) =>
    right.score - left.score || right.entry.at.localeCompare(left.entry.at) || left.entry.id.localeCompare(right.entry.id));

  const selected = ranked.slice(0, limit);
  // Keep at least one relevant contrary observation even when repeated successes fill the first page.
  for (const kind of ["worked", "did-not-work"] as const) {
    const evidence = ranked.find(({ entry }) => entry.kind === kind);
    if (evidence && !selected.some(({ entry }) => entry.kind === kind)) {
      const replace = selected.findLastIndex(({ entry }) => entry.kind === "decision" ||
        selected.filter((item) => item.entry.kind === entry.kind).length > 1);
      if (replace >= 0) selected[replace] = evidence;
    }
  }
  return selected.map(({ entry }) => entry);
}
