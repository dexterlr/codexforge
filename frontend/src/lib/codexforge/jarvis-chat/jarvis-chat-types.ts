export const JARVIS_CHAT_RECORD_VERSION = 1 as const;
export const JARVIS_CHAT_ENVELOPE_VERSION = "codexforge.jarvis-chat.envelope.v1" as const;
export const JARVIS_CHAT_DATA_ROOT_SUBDIRECTORY = "jarvis-chat" as const;

export const JARVIS_CHAT_CONVERSATION_STATES = [
  "binding",
  "awaiting_approval",
  "approved",
  "executing",
  "stopping",
  "ready",
  "stopped",
  "rejected",
  "failed",
  "canceled",
  "deleting",
] as const;

export const JARVIS_CHAT_TURN_STATES = [
  "binding",
  "awaiting_approval",
  "approved",
  "executing",
  "stopping",
  "succeeded",
  "stopped",
  "rejected",
  "failed",
  "canceled",
] as const;

export const JARVIS_CHAT_AUDIT_EVENT_TYPES = [
  "conversation.created",
  "turn.requested",
  "turn.run_bound",
  "turn.approved",
  "turn.execution_requested",
  "turn.stop_requested",
  "turn.output_received",
  "turn.output_rejected",
  "turn.failed",
  "turn.stopped",
  "turn.canceled",
  "turn.recovery_requested",
  "turn.reconciled",
  "conversation.renamed",
  "conversation.deletion_requested",
  "conversation.deleted",
] as const;

export const JARVIS_CHAT_MUTATION_ACTIONS = [
  "create_conversation",
  "append_turn",
  "approve_turn",
  "execute_turn",
  "cancel_turn",
  "stop_turn",
  "recover_turn",
  "rename_conversation",
  "delete_conversation",
] as const;

export type JarvisChatConversationState =
  (typeof JARVIS_CHAT_CONVERSATION_STATES)[number];
export type JarvisChatTurnState = (typeof JARVIS_CHAT_TURN_STATES)[number];
export type JarvisChatAuditEventType =
  (typeof JARVIS_CHAT_AUDIT_EVENT_TYPES)[number];
export type JarvisChatMutationAction =
  (typeof JARVIS_CHAT_MUTATION_ACTIONS)[number];

export type JarvisChatMessage = Readonly<{
  messageId: string;
  role: "user" | "assistant";
  text: string;
  textDigest: string;
  createdAt: string;
}>;

export type JarvisChatContextMessageReference = Readonly<{
  messageId: string;
  role: "user" | "assistant";
  textDigest: string;
}>;

export type JarvisChatContextMode = "conversation" | "none";

export type JarvisChatProviderEnvelope = Readonly<{
  envelopeVersion: typeof JARVIS_CHAT_ENVELOPE_VERSION;
  providerVisibleRequest: string;
  requestDigest: string;
  utf8Bytes: number;
  contextMessages: readonly JarvisChatContextMessageReference[];
  omittedEarlierMessageCount: number;
}>;

export type JarvisChatRunBinding = Readonly<{
  sourceRunId: string;
  ownershipBindingId: string;
  runRevision: number;
  approvalScopeHash: string;
  requestEnvelopeDigest: string;
  providerKey: "ollama-local";
  modelKey: "ollama-local::gpt-oss:20b";
  runtimeModel: "gpt-oss:20b";
  dataBoundary: "local-machine";
  maximumOutputTokens: 4096;
}>;

export type JarvisChatTurn = Readonly<{
  turnId: string;
  ordinal: number;
  state: JarvisChatTurnState;
  userMessage: JarvisChatMessage;
  assistantMessage: JarvisChatMessage | null;
  contextMode: JarvisChatContextMode;
  ownershipBindingId: string;
  envelope: JarvisChatProviderEnvelope;
  runBinding: JarvisChatRunBinding | null;
  failureCode: string | null;
  safeFailureMessage: string | null;
  requestedAt: string;
  updatedAt: string;
}>;

export type JarvisChatAuditEvent = Readonly<{
  auditId: string;
  eventType: JarvisChatAuditEventType;
  actor: "local-operator" | "system";
  turnId: string;
  previousState: JarvisChatConversationState | null;
  resultingState: JarvisChatConversationState;
  timestamp: string;
  summary: string;
  sourceRunId: string | null;
}>;

export type JarvisChatIdempotencyRecord = Readonly<{
  requestId: string;
  action: JarvisChatMutationAction;
  keyHash: string;
  requestDigest: string;
  resultingRevision: number;
  responseStatus: 200 | 201;
  responseClassification: "conversation";
  responseDigest: string;
  createdAt: string;
}>;

export type JarvisChatPendingOperation = Readonly<{
  operationId: string;
  action:
    | "create_conversation"
    | "append_turn"
    | "approve_turn"
    | "execute_turn"
    | "cancel_turn"
    | "delete_conversation";
  keyHash: string;
  requestDigest: string;
  cancellationReason: string | null;
  startedRevision: number;
  startedAt: string;
}>;

export type JarvisChatConversation = Readonly<{
  recordVersion: typeof JARVIS_CHAT_RECORD_VERSION;
  conversationId: string;
  title: string;
  state: JarvisChatConversationState;
  revision: number;
  createdAt: string;
  updatedAt: string;
  currentTurnId: string;
  turns: readonly JarvisChatTurn[];
  auditEvents: readonly JarvisChatAuditEvent[];
  idempotencyRecords: readonly JarvisChatIdempotencyRecord[];
  pendingOperation: JarvisChatPendingOperation | null;
  previousRecordDigest: string | null;
  recordDigest: string;
}>;

export type JarvisChatConversationSummary = Readonly<{
  conversationId: string;
  title: string;
  state: JarvisChatConversationState;
  revision: number;
  turnCount: number;
  createdAt: string;
  updatedAt: string;
  lastMessagePreview: string;
}>;

export type JarvisChatRuntimeStatus = Readonly<{
  providerKey: "ollama-local";
  modelKey: "ollama-local::gpt-oss:20b";
  runtimeModel: "gpt-oss:20b";
  dataBoundary: "local-machine";
  maximumOutputTokens: 4096;
  costClass: "local-no-provider-token-charge";
  approvalMode: "manual-approval-then-separate-execution";
  streaming: "unavailable";
  memory: "current-conversation-or-none";
  killSwitchEngaged: boolean;
  executionPermittedByPolicy: boolean;
  providerAvailability: "not-checked";
}>;

export type JarvisChatCreateConversationInput = Readonly<{
  message: string;
}>;

export type JarvisChatAppendTurnInput = Readonly<{
  action: "append-turn";
  expectedRevision: number;
  message: string;
  contextMode: JarvisChatContextMode;
}>;

export type JarvisChatApproveTurnInput = Readonly<{
  action: "approve-turn";
  expectedRevision: number;
  approvalScopeHash: string;
  acknowledgement: true;
}>;

export type JarvisChatExecuteTurnInput = Readonly<{
  action: "execute-turn";
  expectedRevision: number;
  approvalScopeHash: string;
  acknowledgement: true;
}>;

export type JarvisChatCancelTurnInput = Readonly<{
  action: "cancel-turn";
  expectedRevision: number;
  reason: string;
}>;

export type JarvisChatRecoverTurnInput = Readonly<{
  action: "recover-turn";
  expectedRevision: number;
}>;

export type JarvisChatStopTurnInput = Readonly<{
  action: "stop-turn";
  expectedRevision: number;
}>;

export type JarvisChatRenameConversationInput = Readonly<{
  action: "rename-conversation";
  expectedRevision: number;
  title: string;
}>;

export type JarvisChatDeleteConversationInput = Readonly<{
  action: "delete-conversation";
  expectedRevision: number;
  confirmationConversationId: string;
}>;

export type JarvisChatActionInput =
  | JarvisChatAppendTurnInput
  | JarvisChatApproveTurnInput
  | JarvisChatExecuteTurnInput
  | JarvisChatCancelTurnInput
  | JarvisChatStopTurnInput
  | JarvisChatRecoverTurnInput
  | JarvisChatRenameConversationInput
  | JarvisChatDeleteConversationInput;

export type JarvisChatMutationResult = Readonly<{
  conversation: JarvisChatConversation;
  replayed: boolean;
  responseStatus: 200 | 201;
}>;

export type JarvisChatDeletionAuditEvent = Readonly<{
  eventType: "conversation.deleted";
  auditId: string;
  actor: "system";
  previousState: "deleting";
  resultingState: "deleted";
  timestamp: string;
  summary: string;
}>;

export type JarvisChatDeletionResult = Readonly<{
  conversationId: string;
  deleted: true;
  replayed: boolean;
  responseStatus: 200;
  deletionAuditId: string;
  deletionEvent: JarvisChatDeletionAuditEvent;
  tombstoneDigest: string;
  deletedAt: string;
}>;

export type JarvisChatActionResult =
  | JarvisChatMutationResult
  | JarvisChatDeletionResult;

export type JarvisChatDeletionTombstone = Readonly<{
  version: 1;
  conversationId: string;
  titleDigest: string;
  finalRevision: number;
  finalRecordDigest: string;
  deletionKeyHash: string;
  deletionRequestDigest: string;
  deletionRequestId: string;
  deletionAuditId: string;
  recoveryKeyHash: string | null;
  recoveryRequestDigest: string | null;
  recoveryRequestId: string | null;
  deletionEvent: JarvisChatDeletionAuditEvent;
  deletedAt: string;
  tombstoneDigest: string;
}>;

export type JarvisChatApiSuccess<T> = Readonly<{
  ok: true;
  result: T;
}>;

export type JarvisChatApiFailure = Readonly<{
  ok: false;
  error: Readonly<{
    code: string;
    message: string;
  }>;
}>;
