import {
  actOnJarvisChatConversation,
  buildJarvisChatMutationSignature,
  fetchJarvisChatConversation,
  JarvisChatApiError,
  reconcileJarvisChatRetainedMutations,
} from "./jarvis-chat-api-client";
import type { JarvisChatConversation, JarvisChatConversationState } from "./jarvis-chat-types";

const terminalStates = new Set<JarvisChatConversationState>([
  "ready", "stopped", "rejected", "failed", "canceled",
]);

function changedTurn() {
  return new JarvisChatApiError(409, "work_turn_changed", "This turn changed. Refresh the conversation to see its latest state.");
}

/** Complete the bound turn selected by one explicit Work Assistant Send. */
export async function runJarvisWorkReply(
  conversation: JarvisChatConversation,
  onProgress: (record: JarvisChatConversation) => void
): Promise<JarvisChatConversation> {
  const turn = conversation.turns.at(-1);
  if (!turn || turn.turnId !== conversation.currentTurnId) throw changedTurn();
  if (terminalStates.has(conversation.state) && !conversation.pendingOperation) return conversation;

  const binding = turn.runBinding;
  if (!binding || binding.dataBoundary !== "local-machine" || binding.providerKey !== "ollama-local" ||
      binding.ownershipBindingId !== turn.ownershipBindingId || binding.requestEnvelopeDigest !== turn.envelope.requestDigest) {
    throw changedTurn();
  }
  const { sourceRunId, ownershipBindingId, requestEnvelopeDigest, approvalScopeHash } = binding;
  const { conversationId, currentTurnId } = conversation;

  function verifyRecord(record: JarvisChatConversation, minimumRevision: number) {
    const nextTurn = record.turns.at(-1);
    const nextBinding = nextTurn?.runBinding;
    if (record.conversationId !== conversationId || record.currentTurnId !== currentTurnId ||
        nextTurn?.turnId !== currentTurnId || !nextBinding || record.revision < minimumRevision ||
        nextBinding.sourceRunId !== sourceRunId || nextBinding.approvalScopeHash !== approvalScopeHash ||
        nextBinding.ownershipBindingId !== ownershipBindingId ||
        nextBinding.requestEnvelopeDigest !== requestEnvelopeDigest) {
      throw changedTurn();
    }
  }

  async function advance(record: JarvisChatConversation, action: "approve-turn" | "execute-turn") {
    if (record.pendingOperation) {
      throw new JarvisChatApiError(409, "operation_in_progress", "This turn has an unfinished operation. Refresh the conversation before continuing.");
    }
    const input = { action, expectedRevision: record.revision, approvalScopeHash, acknowledgement: true } as const;
    const signature = buildJarvisChatMutationSignature(conversationId, input);
    let next: JarvisChatConversation;
    try {
      const result = await actOnJarvisChatConversation(conversationId, input);
      if (!("conversation" in result)) throw changedTurn();
      next = result.conversation;
    } catch (error) {
      // A lost HTTP response can follow a successful mutation. Read its durable
      // receipt instead of issuing the mutation or attempting generation again.
      const fresh = await fetchJarvisChatConversation(conversationId).catch(() => { throw error; });
      verifyRecord(fresh, record.revision);
      const evidence = await reconcileJarvisChatRetainedMutations(fresh);
      if (!evidence.retiredSignatures.includes(signature)) {
        onProgress(fresh);
        throw error;
      }
      next = fresh;
    }
    verifyRecord(next, record.revision + 1);
    onProgress(next);
    return next;
  }

  let latest = conversation;
  if (latest.state === "awaiting_approval") latest = await advance(latest, "approve-turn");
  if (latest.state === "approved") latest = await advance(latest, "execute-turn");
  if (terminalStates.has(latest.state) && !latest.pendingOperation) return latest;
  throw new JarvisChatApiError(409, "work_reply_incomplete", "This turn is still in progress. Refresh the conversation to check its reply.");
}
