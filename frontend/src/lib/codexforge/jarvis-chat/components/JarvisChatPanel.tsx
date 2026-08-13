"use client";

import {
  type FormEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  actOnJarvisChatConversation,
  buildJarvisChatMutationSignature,
  createJarvisChatConversation,
  fetchJarvisChatConversation,
  fetchJarvisChatRuntimeStatus,
  JarvisChatApiError,
  listJarvisChatConversations,
  reconcileJarvisChatRetainedMutations,
} from "../jarvis-chat-api-client";
import type {
  JarvisChatActionResult,
  JarvisChatContextMode,
  JarvisChatConversation,
  JarvisChatConversationState,
  JarvisChatConversationSummary,
  JarvisChatMutationAction,
  JarvisChatRuntimeStatus,
  JarvisChatTurn,
  JarvisChatTurnState,
} from "../jarvis-chat-types";
import styles from "./JarvisChatPanel.module.css";

const MAX_MESSAGE_CHARACTERS = 2_000;
const MAX_TITLE_CHARACTERS = 80;
const MAX_TURNS = 8;
const DELETE_CONFIRMATION = "DELETE";

const GLOBAL_BUSY_REASON_ID = "jarvis-chat-global-busy-reason";
const COMPOSER_REASON_ID = "jarvis-chat-composer-disabled-reason";
const SEND_REASON_ID = "jarvis-chat-send-disabled-reason";
const EXECUTE_REASON_ID = "jarvis-chat-execute-disabled-reason";
const RECOVERY_REASON_ID = "jarvis-chat-recovery-disabled-reason";
const STOP_REASON_ID = "jarvis-chat-stop-disabled-reason";
const RENAME_REASON_ID = "jarvis-chat-rename-disabled-reason";
const DELETE_REASON_ID = "jarvis-chat-delete-disabled-reason";

const TERMINAL_STATES = new Set<JarvisChatConversationState>([
  "ready",
  "stopped",
  "rejected",
  "failed",
  "canceled",
]);

const STATE_LABELS: Readonly<Record<JarvisChatConversationState, string>> = {
  binding: "Queued and binding",
  awaiting_approval: "Awaiting approval",
  approved: "Approved - awaiting execution",
  executing: "Generating",
  stopping: "Stop requested",
  ready: "Completed",
  stopped: "Stopped",
  rejected: "Rejected",
  failed: "Failed",
  canceled: "Canceled",
  deleting: "Deleting",
};

const TURN_STATE_LABELS: Readonly<Record<JarvisChatTurnState, string>> = {
  binding: "Queued and binding",
  awaiting_approval: "Awaiting approval",
  approved: "Approved - awaiting execution",
  executing: "Generating",
  stopping: "Stop requested",
  succeeded: "Completed",
  stopped: "Stopped",
  rejected: "Rejected",
  failed: "Failed",
  canceled: "Canceled",
};

type PrimaryAction =
  | "create"
  | "append-turn"
  | "approve-turn"
  | "execute-turn"
  | "cancel-turn"
  | "recover-turn"
  | "rename-conversation"
  | "delete-conversation";

type BusyOperation = Readonly<{
  action: PrimaryAction;
  conversationId: string | null;
  signature: string;
}>;

export type JarvisChatDraftHandoff = Readonly<{
  id: number;
  text: string;
}>;

type JarvisChatPanelProps = Readonly<{
  draftHandoff?: JarvisChatDraftHandoff | null;
}>;

type ResultAction = PrimaryAction | "stop-turn";

const MUTATION_ACTION_BY_PRIMARY: Readonly<Record<PrimaryAction, JarvisChatMutationAction>> = {
  create: "create_conversation",
  "append-turn": "append_turn",
  "approve-turn": "approve_turn",
  "execute-turn": "execute_turn",
  "cancel-turn": "cancel_turn",
  "recover-turn": "recover_turn",
  "rename-conversation": "rename_conversation",
  "delete-conversation": "delete_conversation",
};

function latestTurn(conversation: JarvisChatConversation | null): JarvisChatTurn | null {
  return conversation?.turns.at(-1) ?? null;
}

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "Unknown time";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function readableAction(action: PrimaryAction): string {
  switch (action) {
    case "create":
      return "Creating the chat";
    case "append-turn":
      return "Submitting the message";
    case "approve-turn":
      return "Recording approval";
    case "execute-turn":
      return "Running one local response";
    case "cancel-turn":
      return "Canceling the turn";
    case "recover-turn":
      return "Recovering the interrupted action";
    case "rename-conversation":
      return "Renaming the chat";
    case "delete-conversation":
      return "Deleting the chat";
  }
}

function safeErrorMessage(error: unknown): string {
  if (error instanceof JarvisChatApiError) return error.message;
  return "Jarvis could not complete that local chat action. Refresh the chat and try the available recovery action.";
}

function stateExplanation(conversation: JarvisChatConversation): string {
  const turn = latestTurn(conversation);
  switch (conversation.state) {
    case "binding":
      return "Jarvis is preparing an exact local run. Nothing has been approved or executed.";
    case "awaiting_approval":
      return "Review the exact run scope below. Approval does not execute the response.";
    case "approved":
      return "The exact local run is approved. A separate Execute action is still required.";
    case "executing":
      return "One bounded local response attempt is running. Streaming is unavailable; the complete response appears only after validation.";
    case "stopping":
      return "Stop was requested. The provider request may finish, but its output will not be added to this chat.";
    case "ready":
      return "The last bounded response completed and is stored in this conversation.";
    case "stopped":
      return "The response was stopped and no late provider output will be added.";
    case "rejected":
      return turn?.safeFailureMessage ?? "The provider output was rejected and was not added to the conversation.";
    case "failed":
      return turn?.safeFailureMessage ?? "The local response attempt failed safely. No automatic retry occurred.";
    case "canceled":
      return "This turn was canceled before provider execution.";
    case "deleting":
      return "Confirmed local deletion is being completed.";
  }
}

function turnExplanation(turn: JarvisChatTurn): string {
  switch (turn.state) {
    case "binding":
      return "The exact local run is being prepared. Nothing has been approved or executed.";
    case "awaiting_approval":
      return "This exact local run is waiting for manual approval.";
    case "approved":
      return "This exact local run is approved but has not been executed.";
    case "executing":
      return "One bounded local response attempt is running.";
    case "stopping":
      return "Stop was requested; late provider output will not be added.";
    case "succeeded":
      return "The bounded response completed.";
    case "stopped":
      return "This response was stopped without adding late output.";
    case "rejected":
      return turn.safeFailureMessage ?? "Provider output was rejected and not added.";
    case "failed":
      return turn.safeFailureMessage ?? "The local attempt failed safely without automatic retry.";
    case "canceled":
      return "This turn was canceled before provider execution.";
  }
}

function conversationSummaryFromRecord(
  conversation: JarvisChatConversation
): JarvisChatConversationSummary {
  const lastTurn = latestTurn(conversation)!;
  const preview = lastTurn.assistantMessage?.text ?? lastTurn.userMessage.text;
  return {
    conversationId: conversation.conversationId,
    title: conversation.title,
    state: conversation.state,
    revision: conversation.revision,
    turnCount: conversation.turns.length,
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
    lastMessagePreview: preview.slice(0, 120),
  };
}

function mergeSummary(
  current: readonly JarvisChatConversationSummary[],
  conversation: JarvisChatConversation
): readonly JarvisChatConversationSummary[] {
  const replacement = conversationSummaryFromRecord(conversation);
  return [
    replacement,
    ...current.filter((entry) => entry.conversationId !== conversation.conversationId),
  ].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function mutationNotice(
  action: ResultAction,
  result: JarvisChatActionResult,
  fallback: string
): string {
  if ("deleted" in result) return fallback;
  if (action === "execute-turn") {
    switch (result.conversation.state) {
      case "ready":
        return "One bounded local response attempt completed.";
      case "stopping":
        return "Stop is recorded. The in-flight local request may finish, but its output will not be added.";
      case "stopped":
        return "The local response was stopped. No late provider output was added.";
      case "rejected":
        return "The provider output was rejected and was not added to this conversation.";
      case "failed":
        return "The local response attempt failed safely. No automatic retry occurred.";
      case "canceled":
        return "The turn was canceled before provider execution.";
      case "binding":
        return "The exact local run is still being bound. Refresh or recover if this state persists.";
      case "awaiting_approval":
        return "The exact local run is awaiting manual approval.";
      case "approved":
        return "The exact local run remains approved and still requires explicit execution.";
      case "executing":
        return "One bounded local response attempt is still running.";
      case "deleting":
        return "Confirmed conversation deletion is still being finalized.";
      default:
        return "The local response lifecycle was not reported as complete.";
    }
  }
  if (action === "stop-turn") {
    return result.conversation.state === "stopped"
      ? "The local response was stopped. No late provider output was added."
      : "Stop requested. An in-flight local request may continue, but its output will not be added.";
  }
  return fallback;
}

export function JarvisChatPanel({ draftHandoff = null }: JarvisChatPanelProps = {}) {
  const [summaries, setSummaries] = useState<readonly JarvisChatConversationSummary[]>([]);
  const [conversation, setConversation] = useState<JarvisChatConversation | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [runtime, setRuntime] = useState<JarvisChatRuntimeStatus | null>(null);
  const [draft, setDraft] = useState("");
  const [contextMode, setContextMode] = useState<JarvisChatContextMode>("none");
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingConversationId, setLoadingConversationId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [primaryBusy, setPrimaryBusy] = useState<BusyOperation | null>(null);
  const [stopBusy, setStopBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [composerFocusRequest, setComposerFocusRequest] = useState(0);

  const selectedIdRef = useRef<string | null>(null);
  const loadSequenceRef = useRef(0);
  const primaryBusyRef = useRef(false);
  const stopBusyRef = useRef(false);
  const refreshingRef = useRef(false);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const lifecycleStatusRef = useRef<HTMLParagraphElement | null>(null);
  const appliedDraftHandoffRef = useRef<number | null>(null);

  const selectId = useCallback((id: string | null) => {
    selectedIdRef.current = id;
    setSelectedId(id);
  }, []);

  const refreshSummaries = useCallback(async () => {
    const sequence = loadSequenceRef.current;
    const activeId = selectedIdRef.current;
    const next = await listJarvisChatConversations();
    if (sequence !== loadSequenceRef.current || activeId !== selectedIdRef.current) {
      return { reconciliationCount: 0 };
    }
    if (!activeId) {
      setSummaries(next);
      return { reconciliationCount: 0 };
    }
    const activeSummary = next.find((entry) => entry.conversationId === activeId);
    if (!activeSummary || activeSummary.state === "deleting") {
      loadSequenceRef.current += 1;
      selectId(null);
      setConversation(null);
      setDraft("");
      setContextMode("none");
      setRenameOpen(false);
      setDeleteOpen(false);
      setSummaries(next);
      return { reconciliationCount: 0 };
    }
    const refreshed = await fetchJarvisChatConversation(activeId);
    const reconciliation = await reconcileJarvisChatRetainedMutations(refreshed);
    if (sequence !== loadSequenceRef.current || activeId !== selectedIdRef.current) {
      return { reconciliationCount: 0 };
    }
    setSummaries(mergeSummary(next, refreshed));
    setConversation(refreshed);
    setRenameValue(refreshed.title);
    return { reconciliationCount: reconciliation.retiredCount };
  }, [selectId]);

  const loadConversation = useCallback(async (id: string) => {
    if (primaryBusyRef.current || stopBusyRef.current || refreshingRef.current) return;
    const sequence = loadSequenceRef.current + 1;
    loadSequenceRef.current = sequence;
    selectId(id);
    setLoadingConversationId(id);
    setConversation(null);
    setDraft("");
    setError(null);
    setNotice(null);
    setRenameOpen(false);
    setDeleteOpen(false);
    setContextMode("none");
    try {
      const next = await fetchJarvisChatConversation(id);
      const reconciliation = await reconcileJarvisChatRetainedMutations(next);
      if (loadSequenceRef.current === sequence && selectedIdRef.current === id) {
        setConversation(next);
        setRenameValue(next.title);
        setSummaries((current) => mergeSummary(current, next));
        if (reconciliation.retiredCount > 0) {
          setNotice(`Verified and reconciled ${reconciliation.retiredCount} retained local response ${reconciliation.retiredCount === 1 ? "record" : "records"} from exact durable evidence.`);
        }
      }
    } catch (caught) {
      if (loadSequenceRef.current === sequence && selectedIdRef.current === id) {
        setConversation(null);
        setError(safeErrorMessage(caught));
      }
    } finally {
      if (loadSequenceRef.current === sequence) setLoadingConversationId(null);
    }
  }, [selectId]);

  const initialize = useCallback(async () => {
    const sequence = loadSequenceRef.current + 1;
    loadSequenceRef.current = sequence;
    setInitialLoading(true);
    setConversation(null);
    setDraft("");
    setContextMode("none");
    setError(null);
    try {
      const [nextSummaries, nextRuntime] = await Promise.all([
        listJarvisChatConversations(),
        fetchJarvisChatRuntimeStatus(),
      ]);
      if (loadSequenceRef.current !== sequence) return;
      const first = nextSummaries.find((entry) => entry.state !== "deleting");
      if (first) {
        selectId(first.conversationId);
        setLoadingConversationId(first.conversationId);
        const nextConversation = await fetchJarvisChatConversation(first.conversationId);
        const reconciliation = await reconcileJarvisChatRetainedMutations(nextConversation);
        if (loadSequenceRef.current === sequence && selectedIdRef.current === first.conversationId) {
          setSummaries(mergeSummary(nextSummaries, nextConversation));
          setRuntime(nextRuntime);
          setConversation(nextConversation);
          setRenameValue(nextConversation.title);
          if (reconciliation.retiredCount > 0) {
            setNotice(`Verified and reconciled ${reconciliation.retiredCount} retained local response ${reconciliation.retiredCount === 1 ? "record" : "records"} from exact durable evidence.`);
          }
        }
      } else {
        setSummaries(nextSummaries);
        setRuntime(nextRuntime);
        selectId(null);
        setConversation(null);
      }
    } catch (caught) {
      if (loadSequenceRef.current === sequence) setError(safeErrorMessage(caught));
    } finally {
      if (loadSequenceRef.current === sequence) {
        setLoadingConversationId(null);
        setInitialLoading(false);
      }
    }
  }, [selectId]);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  useEffect(() => {
    if (composerFocusRequest === 0) return;
    const frame = globalThis.requestAnimationFrame(() => composerRef.current?.focus());
    return () => globalThis.cancelAnimationFrame(frame);
  }, [composerFocusRequest]);

  useEffect(() => {
    if (!draftHandoff || appliedDraftHandoffRef.current === draftHandoff.id) return;
    appliedDraftHandoffRef.current = draftHandoff.id;
    if (
      draftHandoff.text.length === 0 ||
      draftHandoff.text.length > MAX_MESSAGE_CHARACTERS
    ) {
      setError("The advanced-tool prompt was empty or exceeded the 2,000-character composer limit, so it was not loaded.");
      return;
    }
    if (draft.length > 0 && draft !== draftHandoff.text) {
      setError("The composer already contains an unsent draft. Clear it before loading the advanced-tool prompt; your existing text was preserved.");
      globalThis.requestAnimationFrame(() => composerRef.current?.focus());
      return;
    }
    setDraft(draftHandoff.text);
    setError(null);
    setNotice("A visible advanced-tool prompt was loaded into the composer. Review it before sending; nothing was sent automatically.");
    globalThis.requestAnimationFrame(() => composerRef.current?.focus());
  }, [draft, draftHandoff]);

  const refreshWorkspace = useCallback(async () => {
    if (primaryBusyRef.current || stopBusyRef.current || refreshingRef.current || initialLoading) return;
    refreshingRef.current = true;
    setRefreshing(true);
    setError(null);
    setNotice(null);
    try {
      const result = await refreshSummaries();
      setNotice(result.reconciliationCount > 0
        ? `Local history refreshed and ${result.reconciliationCount} retained response ${result.reconciliationCount === 1 ? "record was" : "records were"} reconciled from exact durable evidence.`
        : "Local conversation history and the selected chat were refreshed.");
    } catch (caught) {
      setError(safeErrorMessage(caught));
    } finally {
      refreshingRef.current = false;
      setRefreshing(false);
    }
  }, [initialLoading, refreshSummaries]);

  const applyMutationResult = useCallback(
    async (
      result: JarvisChatActionResult,
      action: ResultAction,
      successMessage: string,
      options: Readonly<{ forceSelect?: boolean }> = {}
    ) => {
      const evidenceMessage = "deleted" in result
        ? ` Deletion audit ${result.deletionAuditId}; tombstone digest ${result.tombstoneDigest.slice(0, 12)}...; completed ${formatTimestamp(result.deletedAt)}. Any separately retained bounded Private Alpha run or audit provenance is unchanged by conversation deletion.`
        : "";
      if ("deleted" in result) {
        setSummaries((current) =>
          current.filter((entry) => entry.conversationId !== result.conversationId)
        );
        if (selectedIdRef.current === result.conversationId) {
          selectId(null);
          setConversation(null);
          setDraft("");
          setContextMode("none");
        }
      } else {
        const next = result.conversation;
        setSummaries((current) => mergeSummary(current, next));
        if (options.forceSelect) selectId(next.conversationId);
        if (options.forceSelect || selectedIdRef.current === next.conversationId) {
          setConversation((current) =>
            current?.conversationId === next.conversationId && current.revision > next.revision
              ? current
              : next
          );
          setRenameValue(next.title);
        }
      }
      const exactSuccessMessage = mutationNotice(action, result, successMessage);
      const completionNotice = result.replayed
        ? `${exactSuccessMessage} The exact request was safely replayed.${evidenceMessage}`
        : `${exactSuccessMessage}${evidenceMessage}`;
      setNotice(completionNotice);
      try {
        await refreshSummaries();
      } catch {
        setNotice(`${completionNotice} Conversation history will refresh on the next load.`);
      }
      globalThis.requestAnimationFrame(() => lifecycleStatusRef.current?.focus());
    },
    [refreshSummaries, selectId]
  );

  const performPrimary = useCallback(
    async (
      operation: BusyOperation,
      request: () => Promise<JarvisChatActionResult>,
      successMessage: string,
      options: Readonly<{ forceSelect?: boolean }> = {}
    ) => {
      if (primaryBusyRef.current || stopBusyRef.current || refreshingRef.current) return false;
      primaryBusyRef.current = true;
      setPrimaryBusy(operation);
      setError(null);
      setNotice(null);
      try {
        const result = await request();
        await applyMutationResult(result, operation.action, successMessage, options);
        return true;
      } catch (caught) {
        if (operation.conversationId && selectedIdRef.current === operation.conversationId) {
          try {
            const refreshed = await fetchJarvisChatConversation(operation.conversationId);
            const reconciliation = await reconcileJarvisChatRetainedMutations(refreshed);
            setConversation(refreshed);
            setSummaries((current) => mergeSummary(current, refreshed));
            if (reconciliation.retiredSignatures.includes(operation.signature)) {
              setError(null);
              setNotice(`${mutationNotice(operation.action, { conversation: refreshed, replayed: true, responseStatus: 200 }, successMessage)} The original response was recovered from exact durable local evidence.`);
              globalThis.requestAnimationFrame(() => lifecycleStatusRef.current?.focus());
              return true;
            }
          } catch {
            // Preserve the bounded API error; Refresh remains available.
          }
        }
        setError(safeErrorMessage(caught));
        return false;
      } finally {
        primaryBusyRef.current = false;
        setPrimaryBusy(null);
      }
    },
    [applyMutationResult]
  );

  const recoverDeletingSummary = useCallback(
    (summary: JarvisChatConversationSummary) => {
      if (summary.state !== "deleting") return;
      const input = {
        action: "recover-turn",
        expectedRevision: summary.revision,
      } as const;
      void performPrimary(
        {
          action: "recover-turn",
          conversationId: summary.conversationId,
          signature: buildJarvisChatMutationSignature(summary.conversationId, input),
        },
        () => actOnJarvisChatConversation(summary.conversationId, input),
        "Interrupted confirmed deletion completed from its exact durable intent."
      );
    },
    [performPrimary]
  );

  useEffect(() => {
    if (primaryBusy?.action !== "execute-turn" || !primaryBusy.conversationId) return;
    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const poll = async () => {
      try {
        const next = await fetchJarvisChatConversation(primaryBusy.conversationId!);
        if (disposed) return;
        setSummaries((current) => mergeSummary(current, next));
        if (selectedIdRef.current === next.conversationId) {
          setConversation((current) =>
            current?.conversationId === next.conversationId && current.revision > next.revision
              ? current
              : next
          );
        }
      } catch {
        // The original execution request owns user-visible error handling.
      }
      if (!disposed) timer = setTimeout(poll, 650);
    };
    timer = setTimeout(poll, 350);
    return () => {
      disposed = true;
      if (timer) clearTimeout(timer);
    };
  }, [primaryBusy]);

  const currentTurn = latestTurn(conversation);
  const globalBusy = primaryBusy !== null || stopBusy;
  const synchronizing = loadingConversationId !== null || refreshing;
  const mutationLocked = initialLoading || globalBusy || synchronizing;
  const lockedActivity = primaryBusy
    ? readableAction(primaryBusy.action).toLowerCase()
    : stopBusy
      ? "the stop request finishes"
      : synchronizing
        ? "the selected local conversation is synchronized"
        : "local conversation history loads";
  const appendable = conversation === null || (
    TERMINAL_STATES.has(conversation.state) &&
    conversation.pendingOperation === null &&
    conversation.turns.length < MAX_TURNS
  );
  const composerBlockedReason = initialLoading
    ? "The message composer is unavailable while local conversation history loads."
    : synchronizing
      ? "The message composer is unavailable while the selected local conversation is synchronized."
    : globalBusy
      ? `The message composer is unavailable while ${primaryBusy ? readableAction(primaryBusy.action).toLowerCase() : "the stop request finishes"}.`
      : selectedId !== null && conversation === null
        ? "The message composer is unavailable because the selected local conversation could not be loaded. Refresh it or start a new chat."
      : conversation && conversation.turns.length >= MAX_TURNS
        ? `This bounded chat already contains the maximum ${MAX_TURNS} turns. Start a new chat to continue.`
        : !appendable
          ? "The message composer is unavailable until the current turn is completed, stopped, rejected, failed, or canceled."
          : null;
  const draftIsEmpty = draft.trim().length === 0;
  const sendDisabled = composerBlockedReason !== null || draftIsEmpty;
  const sendReason = composerBlockedReason ?? "Enter a message before sending it to Jarvis.";
  const exactRunBinding = currentTurn?.runBinding ?? null;
  const executionReason = runtime === null
    ? "Execution is unavailable until the local runtime boundary has loaded."
    : runtime.killSwitchEngaged
      ? "Execution is unavailable because the local safety kill switch is engaged."
      : !runtime.executionPermittedByPolicy
        ? "Execution is unavailable under the current local execution policy."
        : mutationLocked
          ? `Execution is unavailable while ${lockedActivity}.`
          : null;

  const startNewChat = () => {
    if (primaryBusyRef.current || stopBusyRef.current || refreshingRef.current || initialLoading) return;
    loadSequenceRef.current += 1;
    selectId(null);
    setConversation(null);
    setLoadingConversationId(null);
    setDraft("");
    setContextMode("none");
    setError(null);
    setNotice(null);
    setRenameOpen(false);
    setDeleteOpen(false);
    setComposerFocusRequest((current) => current + 1);
  };

  const submitMessage = async () => {
    const message = draft.trim();
    if (sendDisabled || !message) return;
    let completed = false;
    if (!conversation) {
      const input = { message };
      completed = await performPrimary(
        {
          action: "create",
          conversationId: null,
          signature: buildJarvisChatMutationSignature(null, input),
        },
        () => createJarvisChatConversation(input),
        "New local chat created. Review the exact run before approval.",
        { forceSelect: true }
      );
    } else {
      const expectedRevision = conversation.revision;
      const conversationId = conversation.conversationId;
      const input = {
        action: "append-turn",
        expectedRevision,
        message,
        contextMode,
      } as const;
      completed = await performPrimary(
        {
          action: "append-turn",
          conversationId,
          signature: buildJarvisChatMutationSignature(conversationId, input),
        },
        () => actOnJarvisChatConversation(conversationId, input),
        contextMode === "conversation"
          ? "Message submitted with the selected bounded conversation context."
          : "Message submitted without earlier conversation context."
      );
    }
    if (completed) {
      setDraft("");
      setContextMode("none");
    }
  };

  const handleComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
    event.preventDefault();
    if (!sendDisabled) void submitMessage();
  };

  const performConversationAction = (
    action: Exclude<PrimaryAction, "create" | "append-turn" | "stop-turn">,
    buildInput: (active: JarvisChatConversation) => Parameters<typeof actOnJarvisChatConversation>[1],
    successMessage: string
  ) => {
    if (!conversation) return Promise.resolve(false);
    const active = conversation;
    const input = buildInput(active);
    return performPrimary(
      {
        action,
        conversationId: active.conversationId,
        signature: buildJarvisChatMutationSignature(active.conversationId, input),
      },
      () => actOnJarvisChatConversation(active.conversationId, input),
      successMessage
    );
  };

  const stopExecution = async () => {
    if (!conversation || stopBusyRef.current || refreshingRef.current || conversation.state !== "executing") return;
    const active = conversation;
    stopBusyRef.current = true;
    setStopBusy(true);
    setError(null);
    setNotice(null);
    try {
      const result = await actOnJarvisChatConversation(active.conversationId, {
        action: "stop-turn",
        expectedRevision: active.revision,
      });
      await applyMutationResult(
        result,
        "stop-turn",
        "Stop requested. An in-flight local request may continue, but its output will not be added."
      );
    } catch (caught) {
      setError(safeErrorMessage(caught));
    } finally {
      stopBusyRef.current = false;
      setStopBusy(false);
    }
  };

  const saveRename = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!conversation) return;
    const title = renameValue.trim();
    const active = conversation;
    if (!title || title === active.title || title.length > MAX_TITLE_CHARACTERS) return;
    void performConversationAction(
      "rename-conversation",
      () => ({
        action: "rename-conversation",
        expectedRevision: active.revision,
        title,
      }),
      "Chat renamed locally."
    ).then((completed) => {
      if (completed) setRenameOpen(false);
    });
  };

  const confirmDelete = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!conversation || deleteConfirmation !== DELETE_CONFIRMATION) return;
    const active = conversation;
    void performConversationAction(
      "delete-conversation",
      () => ({
        action: "delete-conversation",
        expectedRevision: active.revision,
        confirmationConversationId: active.conversationId,
      }),
      "Local chat history deleted."
    ).then((completed) => {
      if (completed) {
        setDeleteOpen(false);
        setDeleteConfirmation("");
      }
    });
  };

  const renameInvalidReason = mutationLocked
    ? `Rename is unavailable while ${lockedActivity}.`
    : !renameValue.trim()
      ? "Enter a title before saving the rename."
      : renameValue.trim() === conversation?.title
        ? "Change the title before saving the rename."
        : renameValue.trim().length > MAX_TITLE_CHARACTERS
          ? `Chat titles are limited to ${MAX_TITLE_CHARACTERS} characters.`
          : null;
  const deletionReason = mutationLocked
    ? `Deletion is unavailable while ${lockedActivity}.`
    : deleteConfirmation !== DELETE_CONFIRMATION
      ? `Type ${DELETE_CONFIRMATION} exactly to confirm this local chat deletion.`
      : null;
  const navigationLocked = mutationLocked;
  const selectedSummary = selectedId
    ? summaries.find((entry) => entry.conversationId === selectedId) ?? null
    : null;

  return (
    <section
      id="jarvis-task-workspace"
      className={styles.panel}
      aria-labelledby="jarvis-chat-panel-title"
      data-codexforge-jarvis-chat="canonical-local-first"
    >
      <header className={styles.panelHeader}>
        <div>
          <p className={styles.eyebrow}>Canonical conversation</p>
          <h2 id="jarvis-chat-panel-title" className={styles.panelTitle}>
            Talk with Jarvis
          </h2>
          <p className={styles.panelSummary}>
            Start with one message, review the exact local run, approve it, then execute one response attempt. Nothing runs automatically.
          </p>
        </div>
        <button
          type="button"
          className={styles.primaryButton}
          disabled={navigationLocked}
          aria-describedby={navigationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
          onClick={startNewChat}
        >
          New chat
        </button>
      </header>

      <details
        id="jarvis-model-data-boundary"
        className={styles.boundaryStrip}
      >
        <summary className={styles.boundarySummary}>
          Local model and data boundary - Ollama local, gpt-oss:20b, local-machine, 4096 tokens, manual approval
        </summary>
        <div className={styles.boundaryBody}>
          <dl className={styles.boundaryGrid}>
            <div><dt>Provider key</dt><dd>{runtime?.providerKey ?? "ollama-local"}</dd></div>
            <div><dt>Model key</dt><dd>{runtime?.modelKey ?? "ollama-local::gpt-oss:20b"}</dd></div>
            <div><dt>Runtime model</dt><dd>{runtime?.runtimeModel ?? "gpt-oss:20b"}</dd></div>
            <div><dt>Data boundary</dt><dd>{runtime?.dataBoundary ?? "local-machine"}</dd></div>
            <div><dt>Output limit</dt><dd>{runtime?.maximumOutputTokens ?? 4096} tokens</dd></div>
            <div><dt>Cost</dt><dd>No provider token charge</dd></div>
            <div><dt>Availability</dt><dd>{runtime ? "Not checked until execution" : "Loading boundary..."}</dd></div>
            <div><dt>Safety policy</dt><dd>{runtime ? (runtime.executionPermittedByPolicy ? "Execution permitted; approval required" : "Execution blocked") : "Loading boundary..."}</dd></div>
          </dl>
          <p className={styles.boundaryNote}>
            Earlier messages are included only when you explicitly choose conversation context. Streaming, cloud fallback, retry, and model substitution are unavailable.
          </p>
        </div>
      </details>

      {mutationLocked ? (
        <p id={GLOBAL_BUSY_REASON_ID} className={styles.disabledReason}>
          {initialLoading
            ? "Conversation switching and mutation controls are temporarily unavailable while local chat history loads."
            : synchronizing
              ? "Conversation switching and mutation controls are temporarily unavailable while the selected local conversation is synchronized."
            : `Conversation switching and other mutations are temporarily unavailable while ${primaryBusy ? readableAction(primaryBusy.action).toLowerCase() : "the stop request finishes"}.`}
        </p>
      ) : null}

      {error ? (
        <div className={styles.errorNotice} role="alert">
          <strong>Jarvis needs your attention.</strong>
          <span>{error}</span>
          <button
            type="button"
            className={styles.secondaryButton}
            disabled={mutationLocked}
            aria-describedby={mutationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
            onClick={() => void initialize()}
          >
            Refresh local chats
          </button>
        </div>
      ) : null}
      {notice ? <p className={styles.successNotice} role="status">{notice}</p> : null}

      <div className={styles.workspace}>
        <aside className={styles.sidebar} aria-labelledby="jarvis-chat-history-title">
          <div className={styles.sidebarHeader}>
            <div>
              <p className={styles.eyebrow}>Local history</p>
              <h3 id="jarvis-chat-history-title" className={styles.sectionTitle}>Conversations</h3>
            </div>
            <button
              type="button"
              className={styles.textButton}
              disabled={navigationLocked}
              aria-describedby={navigationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
              onClick={() => void refreshWorkspace()}
            >
              Refresh
            </button>
          </div>
          {summaries.length === 0 ? (
            <p className={styles.emptyText}>No local chats yet. Write a message to begin.</p>
          ) : (
            <ol className={styles.historyList}>
              {summaries.map((summary) => (
                <li key={summary.conversationId}>
                  <button
                    type="button"
                    className={styles.historyButton}
                    aria-current={selectedId === summary.conversationId ? "page" : undefined}
                    disabled={navigationLocked}
                    aria-describedby={navigationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
                    onClick={() => summary.state === "deleting"
                      ? recoverDeletingSummary(summary)
                      : void loadConversation(summary.conversationId)}
                  >
                    <span className={styles.historyTitle}>{summary.title}</span>
                    <span className={styles.historyPreview}>{summary.lastMessagePreview}</span>
                    <span className={styles.historyMeta}>
                      {summary.state === "deleting"
                        ? "Deletion recovery required - activate to finish"
                        : `${STATE_LABELS[summary.state]} - ${summary.turnCount}/${MAX_TURNS} turns`}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </aside>

        <div className={styles.chatColumn}>
          <section
            id="jarvis-result-output"
            className={styles.transcriptSection}
            aria-labelledby="jarvis-chat-messages-title"
          >
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Conversation</p>
                <h3 id="jarvis-chat-messages-title" className={styles.sectionTitle}>Messages</h3>
              </div>
            </div>
            <div className={styles.transcript} role="log" aria-live="polite" aria-relevant="additions text">
              {loadingConversationId ? (
                <div className={styles.welcomeCard}>
                  <strong>Loading the selected local conversation...</strong>
                  <p>Messages and mutation controls remain unavailable until this exact local record is verified.</p>
                </div>
              ) : !conversation ? (
                <div className={styles.welcomeCard}>
                  <strong>What would you like to talk through?</strong>
                  <p>Jarvis can provide one bounded text response from the fixed local model after you approve and execute it.</p>
                </div>
              ) : (
                conversation.turns.map((turn) => (
                  <div key={turn.turnId} className={styles.turnGroup}>
                    <article className={`${styles.message} ${styles.userMessage}`}>
                      <header><strong>You</strong><time dateTime={turn.userMessage.createdAt}>{formatTimestamp(turn.userMessage.createdAt)}</time></header>
                      <p>{turn.userMessage.text}</p>
                    </article>
                    {turn.assistantMessage ? (
                      <article className={`${styles.message} ${styles.assistantMessage}`}>
                        <header><strong>Jarvis</strong><time dateTime={turn.assistantMessage.createdAt}>{formatTimestamp(turn.assistantMessage.createdAt)}</time></header>
                        <p>{turn.assistantMessage.text}</p>
                      </article>
                    ) : (
                      <div className={styles.pendingMessage} data-turn-state={turn.state}>
                        <strong>Jarvis - {TURN_STATE_LABELS[turn.state]}</strong>
                        <span>{turnExplanation(turn)}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          <form className={styles.composer} onSubmit={(event) => { event.preventDefault(); void submitMessage(); }}>
            <label htmlFor="jarvis-chat-composer" className={styles.composerLabel}>
              Message Jarvis
            </label>
            {conversation ? (
              <div className={styles.contextRow}>
                <label htmlFor="jarvis-chat-context">Memory and context</label>
                <select
                  id="jarvis-chat-context"
                  className={styles.select}
                  value={contextMode}
                  disabled={composerBlockedReason !== null}
                  aria-describedby={composerBlockedReason ? COMPOSER_REASON_ID : "jarvis-chat-context-help"}
                  onChange={(event) => setContextMode(event.target.value as JarvisChatContextMode)}
                >
                  <option value="none">Do not include earlier messages</option>
                  <option value="conversation">Include bounded messages from this chat</option>
                </select>
                <p id="jarvis-chat-context-help" className={styles.fieldHelp}>
                  No earlier messages are sent unless you select conversation context for this message.
                </p>
              </div>
            ) : (
              <p className={styles.contextFixed}><strong>Memory and context:</strong> None - a new chat has no earlier messages.</p>
            )}
            <textarea
              ref={composerRef}
              id="jarvis-chat-composer"
              className={styles.textarea}
              value={draft}
              maxLength={MAX_MESSAGE_CHARACTERS}
              rows={3}
              disabled={composerBlockedReason !== null}
              aria-describedby={`jarvis-chat-composer-help${composerBlockedReason ? ` ${COMPOSER_REASON_ID}` : ""}`}
              placeholder="Ask one bounded question..."
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleComposerKeyDown}
            />
            <div className={styles.composerFooter}>
              <p id="jarvis-chat-composer-help" className={styles.fieldHelp}>
                Enter sends. Shift+Enter adds a line. {draft.length}/{MAX_MESSAGE_CHARACTERS} characters.
              </p>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={sendDisabled}
                aria-describedby={sendDisabled ? (composerBlockedReason ? COMPOSER_REASON_ID : SEND_REASON_ID) : undefined}
              >
                {conversation ? "Send message" : "Start chat"}
              </button>
            </div>
            {composerBlockedReason ? <p id={COMPOSER_REASON_ID} className={styles.disabledReason}>{composerBlockedReason}</p> : null}
            {sendDisabled && !composerBlockedReason ? <p id={SEND_REASON_ID} className={styles.disabledReason}>{sendReason}</p> : null}
          </form>

          <section
            id="jarvis-current-run"
            className={styles.lifecycleCard}
            aria-labelledby="jarvis-chat-lifecycle-title"
            aria-busy={globalBusy}
          >
            <div className={styles.lifecycleHeader}>
              <div>
                <p className={styles.eyebrow}>Current lifecycle</p>
                <h3 id="jarvis-chat-lifecycle-title" className={styles.sectionTitle}>
                  {conversation?.title ?? selectedSummary?.title ?? "New local chat"}
                </h3>
              </div>
              <span className={styles.stateBadge} data-state={conversation?.state ?? "new"}>
                {initialLoading
                  ? "Loading"
                  : primaryBusy
                    ? readableAction(primaryBusy.action)
                    : conversation
                      ? STATE_LABELS[conversation.state]
                      : "Ready"}
              </span>
            </div>
            <p
              ref={lifecycleStatusRef}
              className={styles.lifecycleExplanation}
              tabIndex={-1}
            >
              {loadingConversationId
                ? "Loading the selected local conversation."
                : conversation
                  ? stateExplanation(conversation)
                  : "Your first message creates a bounded local conversation and an exact run awaiting manual approval."}
            </p>
            {conversation ? (
              <dl className={styles.lifecycleMeta}>
                <div><dt>Revision</dt><dd>{conversation.revision}</dd></div>
                <div><dt>Turns</dt><dd>{conversation.turns.length}/{MAX_TURNS}</dd></div>
                <div><dt>Context</dt><dd>{currentTurn?.contextMode === "conversation" ? "Explicit conversation context" : "No earlier messages"}</dd></div>
                <div><dt>Execution</dt><dd>One attempt; no automatic retry</dd></div>
              </dl>
            ) : null}
          </section>

          {conversation ? (
            <section
              id="jarvis-plan-approval"
              className={styles.actionSection}
              aria-labelledby="jarvis-chat-action-title"
            >
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Next explicit action</p>
                <h3 id="jarvis-chat-action-title" className={styles.sectionTitle}>Review and control this turn</h3>
              </div>
            </div>

            {conversation?.state === "awaiting_approval" && exactRunBinding ? (
              <div className={styles.approvalCard}>
                <p>
                  Approve only this run: <strong>{exactRunBinding.runtimeModel}</strong> through <strong>Ollama local</strong>, local-machine data boundary, maximum 4096 output tokens. Approval alone will not execute it.
                </p>
                <details className={styles.requestDetails}>
                  <summary>Review the exact provider-visible request</summary>
                  <div className={styles.requestDetailsBody}>
                    <p>
                      Context selection: <strong>{currentTurn?.contextMode === "conversation" ? "bounded messages from this conversation" : "no earlier messages"}</strong>. Selected messages: {currentTurn?.envelope.contextMessages.length ?? 0}. Omitted earlier messages: {currentTurn?.envelope.omittedEarlierMessageCount ?? 0}.
                    </p>
                    <pre className={styles.requestPreview}>{currentTurn?.envelope.providerVisibleRequest}</pre>
                    <p className={styles.requestIdentity}>Run {exactRunBinding.sourceRunId} - approval scope {exactRunBinding.approvalScopeHash}</p>
                  </div>
                </details>
                <div className={styles.buttonRow}>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    disabled={mutationLocked}
                    aria-describedby={mutationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
                    onClick={() => void performConversationAction(
                      "approve-turn",
                      (active) => ({
                        action: "approve-turn",
                        expectedRevision: active.revision,
                        approvalScopeHash: exactRunBinding.approvalScopeHash,
                        acknowledgement: true,
                      }),
                      "Exact local run approved. Execution still requires a separate action."
                    )}
                  >
                    Approve this run
                  </button>
                  <button
                    type="button"
                    className={styles.dangerButton}
                    disabled={mutationLocked}
                    aria-describedby={mutationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
                    onClick={() => void performConversationAction(
                      "cancel-turn",
                      (active) => ({
                        action: "cancel-turn",
                        expectedRevision: active.revision,
                        reason: "Canceled by the local operator before execution.",
                      }),
                      "Turn canceled before provider execution."
                    )}
                  >
                    Cancel turn
                  </button>
                </div>
              </div>
            ) : null}

            {conversation?.state === "approved" && exactRunBinding ? (
              <div className={styles.approvalCard}>
                <p>
                  This exact run is approved. Execute starts one local attempt; there is no fallback, substitution, or automatic retry.
                </p>
                <div className={styles.buttonRow}>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    disabled={executionReason !== null}
                    aria-describedby={executionReason ? EXECUTE_REASON_ID : undefined}
                    onClick={() => void performConversationAction(
                      "execute-turn",
                      (active) => ({
                        action: "execute-turn",
                        expectedRevision: active.revision,
                        approvalScopeHash: exactRunBinding.approvalScopeHash,
                        acknowledgement: true,
                      }),
                      "One bounded local response attempt completed."
                    )}
                  >
                    Execute one response
                  </button>
                  <button
                    type="button"
                    className={styles.dangerButton}
                    disabled={mutationLocked}
                    aria-describedby={mutationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
                    onClick={() => void performConversationAction(
                      "cancel-turn",
                      (active) => ({
                        action: "cancel-turn",
                        expectedRevision: active.revision,
                        reason: "Canceled by the local operator before execution.",
                      }),
                      "Approved turn canceled before provider execution."
                    )}
                  >
                    Cancel without executing
                  </button>
                </div>
                {executionReason ? <p id={EXECUTE_REASON_ID} className={styles.disabledReason}>{executionReason}</p> : null}
              </div>
            ) : null}

            {conversation?.state === "executing" ? (
              <div className={styles.stopCard}>
                <p>One local response attempt is in progress. Stop prevents its output from being added; it may not terminate the provider request itself.</p>
                <button
                  type="button"
                  className={styles.dangerButton}
                  disabled={stopBusy || synchronizing || initialLoading}
                  aria-describedby={stopBusy ? STOP_REASON_ID : (synchronizing || initialLoading) ? GLOBAL_BUSY_REASON_ID : undefined}
                  onClick={() => void stopExecution()}
                >
                  Stop response
                </button>
                {stopBusy ? <p id={STOP_REASON_ID} className={styles.disabledReason}>Stop is temporarily unavailable while the current stop request finishes.</p> : null}
              </div>
            ) : null}

            {conversation?.pendingOperation ? (
              <div className={styles.recoveryCard}>
                <p>
                  The durable <strong>{conversation.pendingOperation.action.replaceAll("_", " ")}</strong> intent can be reconciled explicitly. Recovery does not approve, retry, or substitute a provider.
                </p>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  disabled={mutationLocked}
                  aria-describedby={globalBusy ? RECOVERY_REASON_ID : mutationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
                  onClick={() => void performConversationAction(
                    "recover-turn",
                    (active) => ({
                      action: "recover-turn",
                      expectedRevision: active.revision,
                    }),
                    "Interrupted local action reconciled from durable evidence."
                  )}
                >
                  Recover interrupted action
                </button>
                {globalBusy ? (
                  <p id={RECOVERY_REASON_ID} className={styles.disabledReason}>
                    This recovery action is unavailable while the current Jarvis chat operation finishes.
                  </p>
                ) : null}
              </div>
            ) : null}

            {conversation && TERMINAL_STATES.has(conversation.state) && !conversation.pendingOperation ? (
              <p className={styles.actionReady}>This turn is terminal. Send another message or manage the local chat below.</p>
            ) : null}
            </section>
          ) : null}

          {conversation && TERMINAL_STATES.has(conversation.state) && !conversation.pendingOperation ? (
            <section className={styles.manageSection} aria-labelledby="jarvis-chat-manage-title">
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.eyebrow}>Local conversation</p>
                  <h3 id="jarvis-chat-manage-title" className={styles.sectionTitle}>Rename or delete this chat</h3>
                </div>
                <div className={styles.buttonRow}>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    disabled={mutationLocked}
                    aria-describedby={mutationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
                    onClick={() => { setRenameOpen((open) => !open); setDeleteOpen(false); setRenameValue(conversation.title); }}
                  >
                    Rename
                  </button>
                  <button
                    type="button"
                    className={styles.dangerButton}
                    disabled={mutationLocked}
                    aria-describedby={mutationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
                    onClick={() => { setDeleteOpen((open) => !open); setRenameOpen(false); setDeleteConfirmation(""); }}
                  >
                    Delete chat...
                  </button>
                </div>
              </div>
              {renameOpen ? (
                <form className={styles.manageForm} onSubmit={saveRename}>
                  <label htmlFor="jarvis-chat-rename">New chat title</label>
                  <input
                    id="jarvis-chat-rename"
                    className={styles.input}
                    value={renameValue}
                    maxLength={MAX_TITLE_CHARACTERS}
                    disabled={mutationLocked}
                    aria-describedby={mutationLocked ? RENAME_REASON_ID : "jarvis-chat-rename-help"}
                    onChange={(event) => setRenameValue(event.target.value)}
                  />
                  <p id="jarvis-chat-rename-help" className={styles.fieldHelp}>Use a local title of up to {MAX_TITLE_CHARACTERS} characters.</p>
                  <button
                    type="submit"
                    className={styles.primaryButton}
                    disabled={renameInvalidReason !== null}
                    aria-describedby={renameInvalidReason ? RENAME_REASON_ID : undefined}
                  >
                    Save title
                  </button>
                  {renameInvalidReason ? <p id={RENAME_REASON_ID} className={styles.disabledReason}>{renameInvalidReason}</p> : null}
                </form>
              ) : null}
              {deleteOpen ? (
                <form className={styles.deleteForm} onSubmit={confirmDelete}>
                  <p>
                    This removes the local chat history. Any separately retained bounded Private Alpha run or audit provenance is unchanged under its existing safety lifecycle.
                  </p>
                  <label htmlFor="jarvis-chat-delete-confirmation">Type {DELETE_CONFIRMATION} to confirm</label>
                  <input
                    id="jarvis-chat-delete-confirmation"
                    className={styles.input}
                    value={deleteConfirmation}
                    autoComplete="off"
                    disabled={mutationLocked}
                    aria-describedby={mutationLocked ? DELETE_REASON_ID : "jarvis-chat-delete-help"}
                    onChange={(event) => setDeleteConfirmation(event.target.value)}
                  />
                  <p id="jarvis-chat-delete-help" className={styles.fieldHelp}>Deletion cannot be undone from the Jarvis chat interface.</p>
                  <button
                    type="submit"
                    className={styles.dangerButton}
                    disabled={deletionReason !== null}
                    aria-describedby={deletionReason ? DELETE_REASON_ID : undefined}
                  >
                    Delete local chat history
                  </button>
                  {deletionReason ? <p id={DELETE_REASON_ID} className={styles.disabledReason}>{deletionReason}</p> : null}
                </form>
              ) : null}
            </section>
          ) : null}

          <details
            id="jarvis-activity-audit"
            className={styles.advancedDetails}
          >
            <summary>Advanced run and audit details</summary>
            <div className={styles.advancedBody}>
              <p>
                These identifiers are local provenance, not credentials. They are shown for review and are never added to context automatically.
              </p>
              {conversation && currentTurn ? (
                <>
                  <dl className={styles.advancedGrid}>
                    <div><dt>Conversation</dt><dd>{conversation.conversationId}</dd></div>
                    <div><dt>Turn</dt><dd>{currentTurn.turnId}</dd></div>
                    <div><dt>Run</dt><dd>{currentTurn.runBinding?.sourceRunId ?? "Not bound"}</dd></div>
                    <div><dt>Request bytes</dt><dd>{currentTurn.envelope.utf8Bytes}</dd></div>
                    <div><dt>Selected context messages</dt><dd>{currentTurn.envelope.contextMessages.length}</dd></div>
                    <div><dt>Omitted earlier messages</dt><dd>{currentTurn.envelope.omittedEarlierMessageCount}</dd></div>
                  </dl>
                  <ol className={styles.auditList} aria-label="Recent chat audit events">
                    {conversation.auditEvents.slice(-8).map((event) => (
                      <li key={event.auditId}>
                        <strong>{event.eventType.replaceAll("_", " ")}</strong>
                        <span>{event.summary}</span>
                        <small>{formatTimestamp(event.timestamp)} - {event.auditId}</small>
                      </li>
                    ))}
                  </ol>
                </>
              ) : <p>No conversation audit is selected.</p>}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
