"use client";

import {
  type FormEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { WebsiteCreatorPanel } from "@/lib/codexforge/creator/components";
import { JarvisMemorySuggestions } from "./JarvisMemorySuggestions";
import { JarvisWorkConversation } from "./JarvisWorkConversation";
import { normalizeJarvisChatUserMessage } from "../jarvis-chat-policy";
import {
  fetchCreatorProject,
  listCreatorProjectSummaries,
} from "@/lib/codexforge/creator/creator-api-client";
import type { CreatorProjectSummary } from "@/lib/codexforge/creator/creator-types";
import { CREATOR_MODEL_ENVELOPE } from "@/lib/codexforge/creator/creator-policy";
import {
  listJarvisCreatorHandoffs,
  prepareJarvisCreatorHandoff,
  reviewJarvisCreatorHandoff,
  resumeJarvisCreatorHandoff,
} from "@/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-api-client";
import type {
  JarvisCreatorHandoffOperation,
  JarvisCreatorHandoffPrepareInput,
  JarvisCreatorHandoffProjectProjection,
  JarvisCreatorHandoffResumeReview,
  JarvisCreatorHandoffSummary,
} from "@/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-types";
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
const CREATOR_HANDOFF_BUSY_REASON_ID = "jarvis-creator-handoff-busy-reason";

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

export type JarvisWorkReplyActivity = Readonly<{
  record: JarvisChatConversation;
  pending: boolean;
  error: string | null;
}>;

type JarvisChatPanelProps = Readonly<{
  draftHandoff?: JarvisChatDraftHandoff | null;
}> & (
  | { workConversationId?: undefined; onNewWorkChat?: never; workReply?: never; onWorkReply?: never }
  | {
      workConversationId: string;
      onNewWorkChat: () => void;
      workReply: JarvisWorkReplyActivity | null;
      onWorkReply: (conversation: JarvisChatConversation) => void;
    }
);

type ResultAction = PrimaryAction | "stop-turn";

type CreatorReviewSource = Readonly<{
  conversationId: string;
  conversationRevision: number;
  turnId: string;
  messageId: string;
  messageDigest: string;
  messageText: string;
}>;

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

function sortCreatorCanonicalJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortCreatorCanonicalJson);
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right, "en"))
        .map(([key, child]) => [key, sortCreatorCanonicalJson(child)])
    );
  }
  return value;
}

async function hashCreatorCanonicalJsonInBrowser(value: unknown): Promise<string> {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    throw new Error(
      "This browser cannot verify the selected Website Creator run-binding evidence. The revision handoff was not prepared."
    );
  }
  const serialized = JSON.stringify(sortCreatorCanonicalJson(value));
  if (typeof serialized !== "string") {
    throw new Error("The selected Website Creator evidence could not be serialized safely.");
  }
  const digest = await subtle.digest("SHA-256", new TextEncoder().encode(serialized));
  return Array.from(
    new Uint8Array(digest),
    (entry) => entry.toString(16).padStart(2, "0")
  ).join("");
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

export function JarvisChatPanel({ draftHandoff = null, workConversationId, onNewWorkChat, workReply, onWorkReply }: JarvisChatPanelProps = {}) {
  const creatorReviewTitleId = useId();
  const creatorReviewDescriptionId = useId();
  const creatorReviewReasonId = useId();
  const creatorReviewSectionId = useId();
  const creatorRevisionTargetId = useId();
  const creatorRecoverySectionId = useId();
  const creatorRecoveryReasonId = useId();
  const [summaries, setSummaries] = useState<readonly JarvisChatConversationSummary[]>([]);
  const [loadedConversation, setConversation] = useState<JarvisChatConversation | null>(null);
  const currentWorkReply = workReply && workReply.record.conversationId === workConversationId ? workReply : null;
  const conversation = loadedConversation && currentWorkReply && currentWorkReply.record.revision > loadedConversation.revision
    ? currentWorkReply.record : loadedConversation;
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
  const [creatorReviewSource, setCreatorReviewSource] = useState<CreatorReviewSource | null>(null);
  const [creatorOperation, setCreatorOperation] = useState<JarvisCreatorHandoffOperation>("create");
  const [creatorProjectTitle, setCreatorProjectTitle] = useState("");
  const [creatorDescription, setCreatorDescription] = useState("");
  const [creatorProjectSummaries, setCreatorProjectSummaries] = useState<readonly CreatorProjectSummary[]>([]);
  const [creatorRevisionProjectId, setCreatorRevisionProjectId] = useState("");
  const [creatorAcknowledged, setCreatorAcknowledged] = useState(false);
  const [creatorHandoffBusy, setCreatorHandoffBusy] = useState(false);
  const [creatorHandoffHistoryBusy, setCreatorHandoffHistoryBusy] = useState(false);
  const [creatorHandoffError, setCreatorHandoffError] = useState<string | null>(null);
  const [creatorHandoffNotice, setCreatorHandoffNotice] = useState<string | null>(null);
  const [creatorHandoffs, setCreatorHandoffs] = useState<readonly JarvisCreatorHandoffSummary[]>([]);
  const [activeCreatorProjection, setActiveCreatorProjection] = useState<JarvisCreatorHandoffProjectProjection | null>(null);
  const [activeCreatorProjectId, setActiveCreatorProjectId] = useState<string | null>(null);
  const [creatorRecoveryReview, setCreatorRecoveryReview] = useState<JarvisCreatorHandoffResumeReview | null>(null);
  const [creatorResumeAcknowledged, setCreatorResumeAcknowledged] = useState(false);
  const [creatorRecoveryAction, setCreatorRecoveryAction] = useState<"review" | "resume" | null>(null);

  const selectedIdRef = useRef<string | null>(null);
  const loadSequenceRef = useRef(0);
  const primaryBusyRef = useRef(false);
  const stopBusyRef = useRef(false);
  const refreshingRef = useRef(false);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const lifecycleStatusRef = useRef<HTMLParagraphElement | null>(null);
  const appliedDraftHandoffRef = useRef<number | null>(null);
  const creatorReviewTitleRef = useRef<HTMLInputElement | null>(null);
  const creatorHandoffStatusRef = useRef<HTMLParagraphElement | null>(null);
  const creatorHandoffOpenerRef = useRef<HTMLButtonElement | null>(null);
  const creatorRecoveryHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const selectId = useCallback((id: string | null) => {
    selectedIdRef.current = id;
    setSelectedId(id);
    if (workConversationId !== undefined) return;
    const url = new URL(window.location.href);
    if (url.searchParams.has("conversation") && url.searchParams.get("conversation") !== id) {
      if (id === null) url.searchParams.delete("conversation");
      else url.searchParams.set("conversation", id);
      window.history.replaceState(null, "", url);
    }
  }, [workConversationId]);

  const refreshSummaries = useCallback(async () => {
    const sequence = loadSequenceRef.current;
    const activeId = selectedIdRef.current;
    const next = workConversationId === undefined ? await listJarvisChatConversations() : [];
    if (sequence !== loadSequenceRef.current || activeId !== selectedIdRef.current) {
      return { reconciliationCount: 0 };
    }
    if (!activeId) {
      setSummaries(next);
      return { reconciliationCount: 0 };
    }
    const activeSummary = next.find((entry) => entry.conversationId === activeId);
    if (workConversationId === undefined && (!activeSummary || activeSummary.state === "deleting")) {
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
  }, [selectId, workConversationId]);

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
    const linkedId = workConversationId ?? new URLSearchParams(window.location.search).get("conversation");
    loadSequenceRef.current = sequence;
    if (linkedId !== null) selectId(linkedId);
    setInitialLoading(true);
    setConversation(null);
    setDraft("");
    setContextMode("none");
    setError(null);
    try {
      const [nextSummaries, nextRuntime] = await Promise.all([
        workConversationId === undefined ? listJarvisChatConversations() : [],
        fetchJarvisChatRuntimeStatus(),
      ]);
      if (loadSequenceRef.current !== sequence) return;
      setSummaries(nextSummaries);
      setRuntime(nextRuntime);
      const conversationId = workConversationId ?? nextSummaries.find((entry) =>
        entry.state !== "deleting" && (linkedId === null || entry.conversationId === linkedId)
      )?.conversationId;
      if (linkedId !== null && !conversationId) {
        setError("This conversation is unavailable. Choose another conversation from local history or start a new chat.");
        return;
      }
      if (conversationId) {
        selectId(conversationId);
        setLoadingConversationId(conversationId);
        const nextConversation = await fetchJarvisChatConversation(conversationId);
        if (loadSequenceRef.current !== sequence) return;
        if (nextConversation.state === "deleting") {
          setError("This conversation is being deleted. Choose another conversation from local history or start a new chat.");
          return;
        }
        const reconciliation = await reconcileJarvisChatRetainedMutations(nextConversation);
        if (loadSequenceRef.current === sequence && selectedIdRef.current === conversationId) {
          setSummaries(mergeSummary(nextSummaries, nextConversation));
          setConversation(nextConversation);
          setRenameValue(nextConversation.title);
          if (reconciliation.retiredCount > 0) {
            setNotice(`Verified and reconciled ${reconciliation.retiredCount} retained local response ${reconciliation.retiredCount === 1 ? "record" : "records"} from exact durable evidence.`);
          }
        }
      } else {
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
  }, [selectId, workConversationId]);

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

  useEffect(() => {
    if (workConversationId !== undefined) return;
    const conversationId = conversation?.conversationId ?? null;
    setCreatorReviewSource(null);
    setCreatorHandoffError(null);
    setCreatorHandoffNotice(null);
    setActiveCreatorProjection(null);
    setCreatorRecoveryReview(null);
    setCreatorResumeAcknowledged(false);
    setCreatorRecoveryAction(null);
    setCreatorProjectSummaries([]);
    setCreatorRevisionProjectId("");
    if (!conversationId) {
      setCreatorHandoffs([]);
      setActiveCreatorProjectId(null);
      setCreatorHandoffHistoryBusy(false);
      return;
    }
    let active = true;
    setCreatorHandoffHistoryBusy(true);
    listJarvisCreatorHandoffs(conversationId)
      .then((next) => {
        if (!active) return;
        setCreatorHandoffs(next);
        const latestPrepared = next.find(
          (handoff) => handoff.status === "prepared" && handoff.resultingProjectStatus !== null
        );
        setActiveCreatorProjectId((current) =>
          current && next.some(
            (handoff) => handoff.projectId === current && handoff.status === "prepared"
          )
            ? current
            : latestPrepared?.projectId ?? null
        );
      })
      .catch((caught: unknown) => {
        if (!active) return;
        setCreatorHandoffs([]);
        setActiveCreatorProjectId(null);
        setCreatorHandoffError(
          caught instanceof Error
            ? caught.message
            : "Creator handoff history could not be restored. The selected chat remains unchanged."
        );
      })
      .finally(() => {
        if (active) setCreatorHandoffHistoryBusy(false);
      });
    return () => {
      active = false;
    };
  }, [conversation?.conversationId, workConversationId]);

  useEffect(() => {
    if (!creatorReviewSource || creatorOperation !== "revise") return;
    let active = true;
    listCreatorProjectSummaries(256)
      .then((next) => {
        if (active) setCreatorProjectSummaries(next);
      })
      .catch((caught: unknown) => {
        if (active) {
          setCreatorProjectSummaries([]);
          setCreatorHandoffError(
            caught instanceof Error
              ? caught.message
              : "Eligible Website Creator projects could not be loaded. No revision target was selected."
          );
        }
      });
    return () => {
      active = false;
    };
  }, [creatorOperation, creatorReviewSource]);

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
        ? ` Deletion audit ${result.deletionAuditId}; tombstone digest ${result.tombstoneDigest.slice(0, 12)}...; completed ${formatTimestamp(result.deletedAt)}. Any separately retained bounded Private Alpha run/audit and committed Website Creator handoff/project evidence remains unchanged.`
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
        return result;
      } catch (caught) {
        if (operation.conversationId && selectedIdRef.current === operation.conversationId) {
          try {
            const refreshed = await fetchJarvisChatConversation(operation.conversationId);
            const reconciliation = await reconcileJarvisChatRetainedMutations(refreshed);
            if (selectedIdRef.current !== operation.conversationId) return false;
            setConversation(refreshed);
            setSummaries((current) => mergeSummary(current, refreshed));
            if (reconciliation.retiredSignatures.includes(operation.signature)) {
              setError(null);
              setNotice(`${mutationNotice(operation.action, { conversation: refreshed, replayed: true, responseStatus: 200 }, successMessage)} The original response was recovered from exact durable local evidence.`);
              globalThis.requestAnimationFrame(() => lifecycleStatusRef.current?.focus());
              return { conversation: refreshed, replayed: true, responseStatus: 200 } as const;
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

  const activeExecutionId = primaryBusy?.action === "execute-turn" ? primaryBusy.conversationId :
    workConversationId !== undefined && (currentWorkReply?.pending || conversation?.state === "executing" || conversation?.state === "stopping")
      ? workConversationId : null;

  useEffect(() => {
    if (!activeExecutionId) return;
    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const poll = async () => {
      try {
        const next = await fetchJarvisChatConversation(activeExecutionId);
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
  }, [activeExecutionId]);

  const currentTurn = latestTurn(conversation);
  const globalBusy = primaryBusy !== null || stopBusy || Boolean(workReply?.pending);
  const synchronizing = loadingConversationId !== null || refreshing;
  const mutationLocked = initialLoading || globalBusy || synchronizing || creatorHandoffBusy;
  const creatorReviewControlsLockReasonId = creatorHandoffBusy
    ? CREATOR_HANDOFF_BUSY_REASON_ID
    : mutationLocked
      ? GLOBAL_BUSY_REASON_ID
      : null;
  const lockedActivity = primaryBusy
    ? readableAction(primaryBusy.action).toLowerCase()
    : creatorHandoffBusy
      ? "the exact Website Creator handoff finishes"
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
  const eligibleRevisionProjects = creatorProjectSummaries.filter(
    (item) =>
      item.status === "ready" &&
      item.latestArtifactRevision !== null &&
      item.latestManifestDigest !== null &&
      item.latestAggregateDigest !== null &&
      item.latestValidationDigest !== null &&
      item.explicitRevisionCount < 2
  );
  const selectedRevisionProject = creatorRevisionProjectId
    ? eligibleRevisionProjects.find((item) => item.projectId === creatorRevisionProjectId) ?? null
    : null;
  const creatorSourceStillExact = Boolean(
    creatorReviewSource &&
    conversation &&
    creatorReviewSource.conversationId === conversation.conversationId &&
    creatorReviewSource.conversationRevision === conversation.revision &&
    conversation.turns.some(
      (turn) =>
        turn.turnId === creatorReviewSource.turnId &&
        turn.userMessage.messageId === creatorReviewSource.messageId &&
        turn.userMessage.textDigest === creatorReviewSource.messageDigest &&
        turn.userMessage.text === creatorReviewSource.messageText
    )
  );
  const creatorReviewDisabledReason = creatorHandoffBusy
    ? "The reviewed creator handoff is frozen while the exact server request finishes."
    : mutationLocked
      ? `Creator handoff is unavailable while ${lockedActivity}.`
      : !creatorSourceStillExact
        ? "The source chat changed after this review opened. Close it and select the exact user message again."
        : creatorOperation === "revise" && !selectedRevisionProject
          ? "Choose one eligible Website Creator project and review its exact current validated artifact revision."
          : !creatorProjectTitle.trim()
            ? "Enter a project title before preparing the creator plan."
            : creatorProjectTitle.trim().length > MAX_TITLE_CHARACTERS
              ? `Project titles are limited to ${MAX_TITLE_CHARACTERS} characters.`
              : !creatorDescription.trim()
                ? "Enter a visible creator brief before preparing the plan."
                : creatorDescription.trim().length > MAX_MESSAGE_CHARACTERS
                  ? `Creator briefs are limited to ${MAX_MESSAGE_CHARACTERS} characters.`
                  : !creatorAcknowledged
                    ? "Confirm that you reviewed this exact visible brief and understand that approval and execution remain separate."
                    : null;
  const creatorRecoveryDisabledReason = creatorHandoffBusy
    ? creatorRecoveryAction === "review"
      ? "The exact persisted Website Creator request is being revealed for review."
      : "The exact acknowledged Website Creator handoff is being resumed."
    : !creatorRecoveryReview
      ? "Review the exact persisted Website Creator request before resuming it."
      : !creatorRecoveryReview.resumable
        ? creatorRecoveryReview.status === "prepared"
          ? "This handoff is already prepared; open its Creator controls instead."
          : "This handoff failed safely and cannot be resumed."
        : !creatorResumeAcknowledged
          ? "Confirm that you reviewed the exact persisted request before resuming its plan preparation."
          : null;

  const openCreatorReview = (
    turn: JarvisChatTurn,
    opener: HTMLButtonElement
  ) => {
    if (!conversation || mutationLocked || creatorHandoffBusy) return;
    creatorHandoffOpenerRef.current = opener;
    setCreatorReviewSource({
      conversationId: conversation.conversationId,
      conversationRevision: conversation.revision,
      turnId: turn.turnId,
      messageId: turn.userMessage.messageId,
      messageDigest: turn.userMessage.textDigest,
      messageText: turn.userMessage.text,
    });
    setCreatorOperation("create");
    setCreatorProjectTitle(conversation.title.slice(0, MAX_TITLE_CHARACTERS));
    setCreatorDescription(turn.userMessage.text);
    setCreatorRevisionProjectId("");
    setCreatorAcknowledged(false);
    setCreatorHandoffError(null);
    setCreatorHandoffNotice(null);
    globalThis.requestAnimationFrame(() => creatorReviewTitleRef.current?.focus());
  };

  const closeCreatorReview = () => {
    if (creatorHandoffBusy) return;
    setCreatorReviewSource(null);
    setCreatorRevisionProjectId("");
    setCreatorAcknowledged(false);
    globalThis.requestAnimationFrame(() => creatorHandoffOpenerRef.current?.focus());
  };

  const changeCreatorOperation = (operation: JarvisCreatorHandoffOperation) => {
    if (creatorHandoffBusy) return;
    setCreatorOperation(operation);
    setCreatorRevisionProjectId("");
    setCreatorAcknowledged(false);
    if (operation === "create") {
      setCreatorProjectTitle(conversation?.title.slice(0, MAX_TITLE_CHARACTERS) ?? "");
    } else {
      setCreatorProjectTitle("");
    }
  };

  const selectRevisionProject = (projectId: string) => {
    setCreatorRevisionProjectId(projectId);
    const selected = eligibleRevisionProjects.find((item) => item.projectId === projectId);
    setCreatorProjectTitle(selected?.projectTitle ?? "");
    setCreatorAcknowledged(false);
  };

  const submitCreatorHandoff = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const source = creatorReviewSource;
    const activeConversation = conversation;
    const target = selectedRevisionProject;
    if (
      !source ||
      !activeConversation ||
      creatorReviewDisabledReason !== null ||
      creatorHandoffBusy
    ) return;
    const projectTitle = creatorProjectTitle.trim();
    const description = creatorDescription.trim();
    setCreatorHandoffBusy(true);
    setCreatorHandoffError(null);
    setCreatorHandoffNotice(null);
    try {
      const common = {
        conversationId: source.conversationId,
        expectedConversationRevision: source.conversationRevision,
        sourceTurnId: source.turnId,
        sourceMessageId: source.messageId,
        sourceMessageDigest: source.messageDigest,
        creatorKind: "website-browser-app" as const,
        projectTitle,
        description,
        acknowledgement: true as const,
      };
      let input: JarvisCreatorHandoffPrepareInput;
      if (creatorOperation === "create") {
        input = { ...common, operation: "create" };
      } else {
        if (!target) {
          throw new Error("Choose the exact validated Website Creator project again.");
        }
        const exactProject = await fetchCreatorProject(target.projectId);
        const exactManifest = exactProject.exportManifest;
        const exactMaterialization = exactProject.materializations.find(
          (item) => item.artifactRevision === target.latestArtifactRevision
        );
        const exactRunBindingsDigest = await hashCreatorCanonicalJsonInBrowser(
          exactProject.runBindings
        );
        if (
          exactProject.identity.projectId !== target.projectId ||
          exactProject.identity.projectTitle !== projectTitle ||
          exactProject.identity.creatorKind !== "website-browser-app" ||
          exactProject.status !== "ready" ||
          exactProject.stateRevision !== target.stateRevision ||
          exactProject.validation?.valid !== true ||
          !exactManifest ||
          exactManifest.artifactRevision !== target.latestArtifactRevision ||
          exactManifest.manifestDigest !== target.latestManifestDigest ||
          exactManifest.aggregateDigest !== target.latestAggregateDigest ||
          exactManifest.validationDigest !== target.latestValidationDigest ||
          !exactMaterialization ||
          exactMaterialization.aggregateDigest !== target.latestAggregateDigest ||
          exactMaterialization.validationDigest !== target.latestValidationDigest ||
          exactRunBindingsDigest !== target.sourceRunBindingsDigest ||
          exactProject.runBindings.length !== target.sourceRunBindingCount ||
          exactProject.revisionRequests.length !== target.explicitRevisionCount ||
          exactProject.revisionRequests.length >= 2
        ) {
          throw new Error(
            "The selected Website Creator project changed after review. No revision handoff was prepared; choose its exact current validated artifact again."
          );
        }
        input = {
          ...common,
          operation: "revise",
          sourceProjectId: exactProject.identity.projectId,
          sourceProjectStatus: "ready",
          sourceProjectStateRevision: exactProject.stateRevision,
          sourceArtifactRevision: exactManifest.artifactRevision,
          sourceManifestDigest: exactManifest.manifestDigest,
          sourceAggregateDigest: exactMaterialization.aggregateDigest,
          sourceValidationDigest: exactMaterialization.validationDigest,
          sourceRunBindingsDigest: exactRunBindingsDigest,
          sourceRunBindingCount: exactProject.runBindings.length,
          sourceExplicitRevisionCount: exactProject.revisionRequests.length,
        };
      }
      const result = await prepareJarvisCreatorHandoff(input);
      setActiveCreatorProjection(result.project);
      setActiveCreatorProjectId(result.project.projectId);
      setCreatorReviewSource(null);
      setCreatorAcknowledged(false);
      setCreatorHandoffNotice(
        result.replayed
          ? "The exact reviewed Website Creator handoff was safely replayed. No project, approval, or provider run was duplicated."
          : creatorOperation === "create"
            ? "The exact reviewed brief prepared a server-owned creator plan. No provider run exists; review and approve the plan separately below."
            : "The exact reviewed brief prepared a revision plan for the selected validated artifact. No provider run exists; review and approve the revision plan separately below."
      );
      try {
        setCreatorHandoffs(await listJarvisCreatorHandoffs(source.conversationId));
      } catch (caught) {
        setCreatorHandoffError(
          caught instanceof Error
            ? `The Creator plan was prepared, but its conversation history could not be refreshed: ${caught.message}`
            : "The Creator plan was prepared, but its conversation history could not be refreshed."
        );
      }
      globalThis.requestAnimationFrame(() => creatorHandoffStatusRef.current?.focus());
    } catch (caught) {
      setCreatorHandoffError(
        caught instanceof Error
          ? caught.message
          : "The Website Creator handoff failed safely. No approval or execution occurred."
      );
    } finally {
      setCreatorHandoffBusy(false);
    }
  };

  const reviewPreparingCreatorHandoff = async (
    handoff: JarvisCreatorHandoffSummary
  ) => {
    const conversationId = conversation?.conversationId;
    if (
      !conversationId ||
      handoff.conversationId !== conversationId ||
      handoff.status !== "preparing" ||
      mutationLocked
    ) return;
    setCreatorHandoffBusy(true);
    setCreatorRecoveryAction("review");
    setCreatorRecoveryReview(null);
    setCreatorResumeAcknowledged(false);
    setCreatorHandoffError(null);
    setCreatorHandoffNotice(null);
    try {
      const review = await reviewJarvisCreatorHandoff({
        conversationId,
        handoffId: handoff.handoffId,
        expectedHandoffRecordDigest: handoff.recordDigest,
      });
      setActiveCreatorProjection(null);
      setActiveCreatorProjectId(null);
      setCreatorRecoveryReview(review);
      setCreatorHandoffNotice(
        review.resumable
          ? "The exact persisted request is visible below. Review it and separately acknowledge Resume; no project, provider run, approval, or execution occurred."
          : review.status === "prepared"
            ? "This handoff completed before review. Refresh its history and open the prepared Creator controls."
            : "This handoff failed safely and cannot be resumed. No approval or execution occurred."
      );
      if (!review.resumable) {
        try {
          setCreatorHandoffs(await listJarvisCreatorHandoffs(conversationId));
        } catch (caught) {
          setCreatorHandoffError(
            caught instanceof Error
              ? `The exact request was reviewed, but its history could not be refreshed: ${caught.message}`
              : "The exact request was reviewed, but its history could not be refreshed."
          );
        }
      }
      globalThis.requestAnimationFrame(() => creatorRecoveryHeadingRef.current?.focus());
    } catch (caught) {
      setCreatorHandoffError(
        caught instanceof Error
          ? caught.message
          : "The exact persisted Website Creator request could not be reviewed safely."
      );
    } finally {
      setCreatorRecoveryAction(null);
      setCreatorHandoffBusy(false);
    }
  };

  const resumePreparingCreatorHandoff = async () => {
    const conversationId = conversation?.conversationId;
    const review = creatorRecoveryReview;
    if (
      !conversationId ||
      !review ||
      !review.resumable ||
      !creatorResumeAcknowledged ||
      creatorHandoffBusy
    ) return;
    setCreatorHandoffBusy(true);
    setCreatorRecoveryAction("resume");
    setCreatorHandoffError(null);
    setCreatorHandoffNotice(null);
    try {
      const result = await resumeJarvisCreatorHandoff({
        conversationId,
        handoffId: review.handoffId,
        expectedHandoffRecordDigest: review.recordDigest,
        reviewedRequestDigest: review.reviewedRequest.handoffRequestDigest,
      });
      setActiveCreatorProjection(result.project);
      setActiveCreatorProjectId(result.project.projectId);
      setCreatorRecoveryReview(null);
      setCreatorResumeAcknowledged(false);
      setCreatorHandoffNotice(
        result.replayed
          ? "The exact acknowledged Website Creator resume was safely replayed. No project, approval, or provider run was duplicated."
          : "The exact acknowledged handoff resumed and prepared its Creator plan. Review and approval remain separate; no provider ran."
      );
      try {
        setCreatorHandoffs(await listJarvisCreatorHandoffs(conversationId));
      } catch (caught) {
        setCreatorHandoffError(
          caught instanceof Error
            ? `The Creator plan was prepared, but its history could not be refreshed: ${caught.message}`
            : "The Creator plan was prepared, but its history could not be refreshed."
        );
      }
      globalThis.requestAnimationFrame(() => creatorHandoffStatusRef.current?.focus());
    } catch (caught) {
      setCreatorHandoffError(
        caught instanceof Error
          ? caught.message
          : "The Website Creator resume was not confirmed. The exact reviewed evidence remains available for a safe explicit retry."
      );
    } finally {
      setCreatorRecoveryAction(null);
      setCreatorHandoffBusy(false);
    }
  };

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

  const submitMessage = async (selectedContext: JarvisChatContextMode = contextMode) => {
    const message = draft.trim();
    if (sendDisabled || !message) return;
    let completed: JarvisChatActionResult | false;
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
        contextMode: selectedContext,
      } as const;
      completed = await performPrimary(
        {
          action: "append-turn",
          conversationId,
          signature: buildJarvisChatMutationSignature(conversationId, input),
        },
        () => actOnJarvisChatConversation(conversationId, input),
        selectedContext === "conversation"
          ? "Message submitted with the selected bounded conversation context."
          : "Message submitted without earlier conversation context."
      );
      if (completed && "conversation" in completed && onWorkReply) {
        const next = completed.conversation;
        const turn = next.turns.at(-1);
        const ordinal = conversation.turns.length + 1;
        if (next.conversationId !== conversationId || next.revision <= expectedRevision ||
            next.turns.length !== ordinal || next.turns.at(-2)?.turnId !== conversation.currentTurnId ||
            !turn || turn.turnId !== next.currentTurnId || turn.ordinal !== ordinal ||
            turn.contextMode !== selectedContext || turn.userMessage.text !== normalizeJarvisChatUserMessage(message)) {
          setError("This conversation changed while your message was being saved. Refresh to see the latest turn.");
        } else if (next.state === "awaiting_approval" || next.state === "approved") {
          onWorkReply(next);
        }
      }
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

  const runBoundAction = (action: "approve-turn" | "execute-turn") => {
    if (!exactRunBinding || mutationLocked || (action === "execute-turn" && executionReason)) return;
    void performConversationAction(action, (active) => ({
      action,
      expectedRevision: active.revision,
      approvalScopeHash: exactRunBinding.approvalScopeHash,
      acknowledgement: true,
    }), action === "approve-turn"
      ? "Exact local run approved. Execution still requires a separate action."
      : "One bounded local response attempt completed.");
  };

  const cancelTurn = () => {
    if (mutationLocked) return;
    void performConversationAction("cancel-turn", (active) => ({
      action: "cancel-turn",
      expectedRevision: active.revision,
      reason: "Canceled by the local operator before execution.",
    }), conversation?.state === "approved"
      ? "Approved turn canceled before provider execution."
      : "Turn canceled before provider execution.");
  };

  const recoverTurn = () => {
    if (mutationLocked || !conversation?.pendingOperation) return;
    void performConversationAction("recover-turn", (active) => ({
      action: "recover-turn",
      expectedRevision: active.revision,
    }), "Interrupted local action reconciled from durable evidence.");
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
      "Local conversation display and history deleted. Separately retained run, audit, and committed Website Creator handoff/project evidence was not deleted."
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
  const activeCreatorHandoff = activeCreatorProjectId
    ? creatorHandoffs.find(
      (item) => item.projectId === activeCreatorProjectId && item.status === "prepared"
    ) ?? null
    : null;
  const activeCreatorProjectConfirmed = Boolean(
    activeCreatorHandoff ||
    (activeCreatorProjectId && activeCreatorProjection?.projectId === activeCreatorProjectId)
  );

  if (workConversationId !== undefined) {
    return (
      <JarvisWorkConversation
        conversation={conversation}
        draft={draft}
        onDraft={setDraft}
        onSend={() => {
          if (!conversation || mutationLocked) return;
          if (conversation.state === "awaiting_approval" || conversation.state === "approved") {
            onWorkReply(conversation);
          } else {
            void submitMessage("conversation");
          }
        }}
        composerRef={composerRef}
        loading={initialLoading || loadingConversationId !== null}
        busy={mutationLocked}
        generating={Boolean(activeExecutionId)}
        canStop={conversation?.state === "executing" && !stopBusy && !synchronizing && !initialLoading}
        canRecover={Boolean(conversation?.pendingOperation) && !mutationLocked}
        composerBlockedReason={composerBlockedReason}
        executionReason={executionReason}
        status={workReply?.pending && !currentWorkReply ? "Jarvis is replying in another chat." : null}
        error={error ?? (currentWorkReply?.record.currentTurnId === conversation?.currentTurnId ? currentWorkReply?.error ?? null : null)}
        onRefresh={() => void (conversation ? refreshWorkspace() : initialize())}
        onCancel={cancelTurn}
        onStop={() => void stopExecution()}
        onRecover={recoverTurn}
        onNew={onNewWorkChat}
      />
    );
  }

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
            : creatorHandoffBusy
              ? "Conversation switching and chat mutations are temporarily unavailable while the exact Website Creator handoff finishes."
            : `Conversation switching and other mutations are temporarily unavailable while ${primaryBusy ? readableAction(primaryBusy.action).toLowerCase() : "the stop request finishes"}.`}
        </p>
      ) : null}
      {creatorHandoffBusy ? (
        <p id={CREATOR_HANDOFF_BUSY_REASON_ID} className={styles.disabledReason}>
          The selected user message and reviewed creator request are frozen while the exact handoff finishes. Chat, source, and creator review controls are temporarily unavailable.
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
                      <button
                        type="button"
                        className={styles.messageAction}
                        disabled={mutationLocked || creatorHandoffBusy}
                        aria-expanded={creatorReviewSource?.messageId === turn.userMessage.messageId}
                        aria-controls={
                          creatorReviewSource?.messageId === turn.userMessage.messageId
                            ? creatorReviewSectionId
                            : undefined
                        }
                        aria-describedby={
                          mutationLocked
                            ? GLOBAL_BUSY_REASON_ID
                            : creatorHandoffBusy
                              ? CREATOR_HANDOFF_BUSY_REASON_ID
                              : undefined
                        }
                        onClick={(event) => openCreatorReview(turn, event.currentTarget)}
                      >
                        Continue this user message in Website Creator
                      </button>
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

          {creatorReviewSource ? (
            <section
              id={creatorReviewSectionId}
              className={styles.handoffReview}
              aria-labelledby={`${creatorReviewSectionId}-title`}
            >
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.eyebrow}>Exact visible handoff</p>
                  <h3 id={`${creatorReviewSectionId}-title`} className={styles.sectionTitle}>
                    Review before Website Creator receives anything
                  </h3>
                </div>
                <span className={styles.stateBadge}>No provider run</span>
              </div>
              <p className={styles.handoffBoundaryCopy}>
                Only the exact user message shown below is the source. Earlier chat context, assistant output, memory, and unsent drafts are excluded. Submitting prepares a server-owned plan; approval and execution remain separate.
              </p>
              <dl className={styles.handoffEnvelope} aria-label="Website Creator execution boundary">
                <div><dt>Provider</dt><dd>{CREATOR_MODEL_ENVELOPE.providerKey} ({CREATOR_MODEL_ENVELOPE.providerLabel})</dd></div>
                <div><dt>Model</dt><dd>{CREATOR_MODEL_ENVELOPE.modelKey} / {CREATOR_MODEL_ENVELOPE.runtimeModel}</dd></div>
                <div><dt>Data</dt><dd>{CREATOR_MODEL_ENVELOPE.providerLocality}</dd></div>
                <div><dt>Output limit</dt><dd>{CREATOR_MODEL_ENVELOPE.maximumOutputTokens} tokens</dd></div>
                <div><dt>Provider charge</dt><dd>USD {CREATOR_MODEL_ENVELOPE.estimatedProviderTokenChargeUsd}; local resources {CREATOR_MODEL_ENVELOPE.localResourceCost}</dd></div>
                <div><dt>Retry / fallback / substitution</dt><dd>{CREATOR_MODEL_ENVELOPE.retry} / {CREATOR_MODEL_ENVELOPE.fallback} / {CREATOR_MODEL_ENVELOPE.substitution}</dd></div>
              </dl>
              <blockquote className={styles.handoffSource}>
                <strong>Selected user message</strong>
                <p>{creatorReviewSource.messageText}</p>
                <small>
                  Message {creatorReviewSource.messageId} · digest {creatorReviewSource.messageDigest.slice(0, 16)}...
                </small>
              </blockquote>
              <form className={styles.handoffForm} onSubmit={submitCreatorHandoff}>
                <fieldset
                  disabled={mutationLocked}
                  aria-describedby={creatorReviewControlsLockReasonId ?? undefined}
                >
                  <legend>Website Creator workflow</legend>
                  <label>
                    <input
                      type="radio"
                      name="jarvis-creator-operation"
                      value="create"
                      checked={creatorOperation === "create"}
                      disabled={mutationLocked}
                      aria-describedby={creatorReviewControlsLockReasonId ?? undefined}
                      onChange={() => changeCreatorOperation("create")}
                    />
                    Create a new Website Creator project
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="jarvis-creator-operation"
                      value="revise"
                      checked={creatorOperation === "revise"}
                      disabled={mutationLocked}
                      aria-describedby={creatorReviewControlsLockReasonId ?? undefined}
                      onChange={() => changeCreatorOperation("revise")}
                    />
                    Revise an existing validated Website Creator project
                  </label>
                </fieldset>

                {creatorOperation === "revise" ? (
                  <div className={styles.handoffField}>
                    <label htmlFor={creatorRevisionTargetId}>Exact Website Creator project</label>
                    <select
                      id={creatorRevisionTargetId}
                      className={styles.select}
                      value={creatorRevisionProjectId}
                      disabled={mutationLocked}
                      aria-describedby={`${creatorRevisionTargetId}-help${creatorReviewControlsLockReasonId ? ` ${creatorReviewControlsLockReasonId}` : ""}`}
                      onChange={(event) => selectRevisionProject(event.target.value)}
                      required
                    >
                      <option value="">Choose one validated project</option>
                      {eligibleRevisionProjects.map((item) => (
                        <option key={item.projectId} value={item.projectId}>
                          {item.projectTitle} · artifact r{item.latestArtifactRevision} · revisions {item.explicitRevisionCount}/2
                        </option>
                      ))}
                    </select>
                    <p id={`${creatorRevisionTargetId}-help`} className={styles.fieldHelp}>
                      {creatorReviewControlsLockReasonId
                        ? "The exact revision target is frozen while the current Jarvis or Website Creator operation finishes."
                        : selectedRevisionProject
                        ? `Selected exact current validated artifact revision ${selectedRevisionProject.latestArtifactRevision}; project state revision ${selectedRevisionProject.stateRevision}; explicit revisions used ${selectedRevisionProject.explicitRevisionCount}/2. No target was inferred.`
                        : eligibleRevisionProjects.length
                          ? "Select the exact project whose current validated artifact should be revised."
                          : "No eligible project with a current validated artifact is available."}
                    </p>
                  </div>
                ) : null}

                <div className={styles.handoffField}>
                  <label htmlFor={creatorReviewTitleId}>Project title</label>
                  <input
                    ref={creatorReviewTitleRef}
                    id={creatorReviewTitleId}
                    className={styles.input}
                    value={creatorProjectTitle}
                    maxLength={MAX_TITLE_CHARACTERS}
                    disabled={mutationLocked || creatorOperation === "revise"}
                    aria-describedby={`${creatorReviewTitleId}-help${creatorReviewControlsLockReasonId ? ` ${creatorReviewControlsLockReasonId}` : ""}`}
                    onChange={(event) => {
                      setCreatorProjectTitle(event.target.value);
                      setCreatorAcknowledged(false);
                    }}
                    required
                  />
                  <p id={`${creatorReviewTitleId}-help`} className={styles.fieldHelp}>
                    {creatorReviewControlsLockReasonId
                      ? "The reviewed project title is frozen while the current Jarvis or Website Creator operation finishes."
                      : creatorOperation === "revise"
                      ? "The title is locked to the explicitly selected existing project."
                      : `${creatorProjectTitle.length}/${MAX_TITLE_CHARACTERS} characters. This remains editable until submission.`}
                  </p>
                </div>

                <div className={styles.handoffField}>
                  <label htmlFor={creatorReviewDescriptionId}>Reviewed creator brief</label>
                  <textarea
                    id={creatorReviewDescriptionId}
                    className={styles.textarea}
                    value={creatorDescription}
                    maxLength={MAX_MESSAGE_CHARACTERS}
                    rows={6}
                    disabled={mutationLocked}
                    aria-describedby={`${creatorReviewDescriptionId}-help${creatorReviewControlsLockReasonId ? ` ${creatorReviewControlsLockReasonId}` : ""}`}
                    onChange={(event) => {
                      setCreatorDescription(event.target.value);
                      setCreatorAcknowledged(false);
                    }}
                    required
                  />
                  <p id={`${creatorReviewDescriptionId}-help`} className={styles.fieldHelp}>
                    {creatorReviewControlsLockReasonId
                      ? "The reviewed creator brief is frozen while the current Jarvis or Website Creator operation finishes."
                      : `${creatorDescription.length}/${MAX_MESSAGE_CHARACTERS} characters. Initialized from the exact selected user message and visibly editable; hidden chat context is never appended.`}
                  </p>
                </div>

                <label className={styles.handoffAcknowledgement}>
                  <input
                    type="checkbox"
                    checked={creatorAcknowledged}
                    disabled={mutationLocked}
                    aria-describedby={creatorReviewControlsLockReasonId ?? undefined}
                    onChange={(event) => setCreatorAcknowledged(event.target.checked)}
                  />
                  I reviewed this exact visible brief. Prepare only the plan; do not approve it, call a provider, or execute generation.
                </label>

                <div className={styles.buttonRow}>
                  <button
                    type="submit"
                    className={styles.primaryButton}
                    disabled={creatorReviewDisabledReason !== null}
                    aria-describedby={creatorReviewDisabledReason ? creatorReviewReasonId : undefined}
                  >
                    {creatorOperation === "create"
                      ? "Prepare exact creator plan"
                      : "Prepare exact revision plan"}
                  </button>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    disabled={creatorHandoffBusy}
                    aria-describedby={creatorHandoffBusy ? creatorReviewReasonId : undefined}
                    onClick={closeCreatorReview}
                  >
                    Cancel handoff review
                  </button>
                </div>
                <p id={creatorReviewReasonId} className={styles.disabledReason}>
                  {creatorReviewDisabledReason ?? "Ready to prepare this exact reviewed plan. Approval and execution remain separate."}
                </p>
              </form>
            </section>
          ) : null}

          <section className={styles.handoffHistory} aria-labelledby="jarvis-creator-handoff-history-title">
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Conversation → Website Creator</p>
                <h3 id="jarvis-creator-handoff-history-title" className={styles.sectionTitle}>
                  Prepared creator plans from this chat
                </h3>
              </div>
            </div>
            {creatorHandoffError ? <p className={styles.errorNotice} role="alert">{creatorHandoffError}</p> : null}
            {creatorHandoffNotice ? (
              <p
                ref={creatorHandoffStatusRef}
                className={styles.successNotice}
                role="status"
                tabIndex={-1}
              >
                {creatorHandoffNotice}
              </p>
            ) : null}
            {creatorHandoffHistoryBusy ? (
              <p className={styles.emptyText} role="status">Restoring exact creator handoff evidence...</p>
            ) : creatorHandoffs.length ? (
              <ol className={styles.handoffList}>
                {creatorHandoffs.map((handoff) => {
                  const controlsShown =
                    handoff.status === "prepared" &&
                    activeCreatorProjectId === handoff.projectId;
                  const exactRecoveryShown =
                    creatorRecoveryReview?.handoffId === handoff.handoffId;
                  return (
                    <li key={handoff.handoffId} data-handoff-state={handoff.status}>
                      <div>
                        <strong>{handoff.projectTitle}</strong>
                        <span>
                          {handoff.operation === "create"
                            ? "New project plan"
                            : `Revision plan for artifact r${handoff.revisionTarget?.sourceArtifactRevision ?? "unknown"}`} {" · "}
                          {handoff.resultingProjectStatus?.replaceAll("_", " ") ?? handoff.status}
                        </span>
                        <small>
                          Exact user message {handoff.sourceMessageId} · handoff {handoff.handoffId}
                        </small>
                        {handoff.status === "preparing" ? (
                          <small>
                            Preparation was interrupted or its result is uncertain. Creator controls remain unavailable until you review and explicitly resume this exact persisted request.
                          </small>
                        ) : null}
                        {handoff.status === "failed" ? (
                          <p className={styles.disabledReason}>
                            Failed safely{handoff.failureCode ? ` (${handoff.failureCode})` : ""}: {handoff.failureMessage ?? "No project, approval, execution, or provider run was admitted."}
                          </p>
                        ) : null}
                      </div>
                      {handoff.status === "prepared" ? (
                        <button
                          type="button"
                          className={styles.secondaryButton}
                          disabled={mutationLocked}
                          aria-describedby={mutationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
                          aria-pressed={controlsShown}
                          onClick={() => {
                            setCreatorRecoveryReview(null);
                            setCreatorResumeAcknowledged(false);
                            setActiveCreatorProjection(null);
                            setActiveCreatorProjectId(handoff.projectId);
                          }}
                        >
                          {controlsShown ? "Creator controls shown" : "Show creator controls"}
                        </button>
                      ) : handoff.status === "preparing" ? (
                        <button
                          type="button"
                          className={styles.secondaryButton}
                          disabled={mutationLocked}
                          aria-describedby={mutationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
                          aria-expanded={exactRecoveryShown}
                          aria-controls={exactRecoveryShown ? creatorRecoverySectionId : undefined}
                          onClick={() => void reviewPreparingCreatorHandoff(handoff)}
                        >
                          {exactRecoveryShown
                            ? "Exact persisted request shown"
                            : "Review exact persisted request"}
                        </button>
                      ) : (
                        <span className={styles.stateBadge}>No Creator controls</span>
                      )}
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className={styles.emptyText}>No Website Creator plan has been prepared from this chat.</p>
            )}
            {creatorRecoveryReview ? (
              <section
                id={creatorRecoverySectionId}
                className={styles.handoffReview}
                aria-labelledby={`${creatorRecoverySectionId}-title`}
              >
                <div className={styles.sectionHeader}>
                  <div>
                    <p className={styles.eyebrow}>Explicit crash recovery</p>
                    <h4
                      ref={creatorRecoveryHeadingRef}
                      id={`${creatorRecoverySectionId}-title`}
                      className={styles.sectionTitle}
                      tabIndex={-1}
                    >
                      Review the exact persisted request before Resume
                    </h4>
                  </div>
                  <span className={styles.stateBadge}>{creatorRecoveryReview.status}</span>
                </div>
                <p className={styles.handoffBoundaryCopy}>
                  Review reveals this bounded persisted request only. Resume is a separate acknowledged action that reconciles plan preparation; it does not approve a plan, call a provider, or execute generation.
                </p>
                <dl className={styles.handoffProvenance}>
                  <div><dt>Operation</dt><dd>{creatorRecoveryReview.operation}</dd></div>
                  <div><dt>Project ID</dt><dd>{creatorRecoveryReview.projectId}</dd></div>
                  <div><dt>Project title</dt><dd>{creatorRecoveryReview.reviewedRequest.projectTitle}</dd></div>
                  <div><dt>Reviewed brief</dt><dd>{creatorRecoveryReview.reviewedRequest.description}</dd></div>
                  <div><dt>Source text edited</dt><dd>{creatorRecoveryReview.reviewedRequest.sourceTextEdited ? "Yes — the visible brief differs from the selected user message" : "No — the visible brief matches the selected user message"}</dd></div>
                  <div><dt>Request digest</dt><dd>{creatorRecoveryReview.reviewedRequest.handoffRequestDigest}</dd></div>
                  <div><dt>Record digest</dt><dd>{creatorRecoveryReview.recordDigest}</dd></div>
                  {creatorRecoveryReview.revisionTarget ? (
                    <div>
                      <dt>Exact revision target</dt>
                      <dd>{creatorRecoveryReview.revisionTarget.projectId} · artifact r{creatorRecoveryReview.revisionTarget.sourceArtifactRevision}</dd>
                    </div>
                  ) : null}
                </dl>
                <dl className={styles.handoffEnvelope} aria-label="Website Creator resume boundary">
                  <div><dt>Provider</dt><dd>{CREATOR_MODEL_ENVELOPE.providerKey} ({CREATOR_MODEL_ENVELOPE.providerLabel})</dd></div>
                  <div><dt>Model</dt><dd>{CREATOR_MODEL_ENVELOPE.modelKey} / {CREATOR_MODEL_ENVELOPE.runtimeModel}</dd></div>
                  <div><dt>Data</dt><dd>{CREATOR_MODEL_ENVELOPE.providerLocality}</dd></div>
                  <div><dt>Output limit</dt><dd>{CREATOR_MODEL_ENVELOPE.maximumOutputTokens} tokens</dd></div>
                  <div><dt>Provider charge</dt><dd>USD {CREATOR_MODEL_ENVELOPE.estimatedProviderTokenChargeUsd}; local resources {CREATOR_MODEL_ENVELOPE.localResourceCost}</dd></div>
                  <div><dt>Retry / fallback / substitution</dt><dd>{CREATOR_MODEL_ENVELOPE.retry} / {CREATOR_MODEL_ENVELOPE.fallback} / {CREATOR_MODEL_ENVELOPE.substitution}</dd></div>
                </dl>
                {creatorRecoveryReview.resumable ? (
                  <>
                    <label className={styles.handoffAcknowledgement}>
                      <input
                        type="checkbox"
                        checked={creatorResumeAcknowledged}
                        disabled={creatorHandoffBusy}
                        aria-describedby={creatorHandoffBusy ? creatorRecoveryReasonId : undefined}
                        onChange={(event) => setCreatorResumeAcknowledged(event.target.checked)}
                      />
                      I reviewed this exact persisted request. Resume only its plan preparation; do not approve or execute anything.
                    </label>
                    <div className={styles.buttonRow}>
                      <button
                        type="button"
                        className={styles.primaryButton}
                        disabled={creatorRecoveryDisabledReason !== null}
                        aria-describedby={creatorRecoveryDisabledReason ? creatorRecoveryReasonId : undefined}
                        onClick={() => void resumePreparingCreatorHandoff()}
                      >
                        Resume exact reviewed plan
                      </button>
                    </div>
                  </>
                ) : null}
                <p id={creatorRecoveryReasonId} className={styles.disabledReason}>
                  {creatorRecoveryDisabledReason ?? "Ready to resume this exact reviewed plan preparation. Approval and execution remain separate."}
                </p>
              </section>
            ) : null}
            {activeCreatorHandoff ? (
              <dl className={styles.handoffProvenance}>
                <div><dt>Operation</dt><dd>{activeCreatorHandoff.operation}</dd></div>
                <div><dt>Project</dt><dd>{activeCreatorHandoff.projectId}</dd></div>
                <div><dt>Source message</dt><dd>{activeCreatorHandoff.sourceMessageId}</dd></div>
                <div><dt>Source digest</dt><dd>{activeCreatorHandoff.sourceMessageDigest}</dd></div>
                <div><dt>Plan digest</dt><dd>{activeCreatorProjection?.planDigest ?? activeCreatorHandoff.resultingCreatorPlanDigest ?? "Loading exact project"}</dd></div>
                <div><dt>Provider runs prepared</dt><dd>{activeCreatorProjection?.runBindingCount ?? 0}</dd></div>
              </dl>
            ) : null}
          </section>

          {activeCreatorProjectConfirmed && activeCreatorProjectId ? (
            <div className={styles.embeddedCreator}>
              <WebsiteCreatorPanel
                key={activeCreatorProjectId}
                initialProjectId={activeCreatorProjectId}
                embedded
              />
            </div>
          ) : null}

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
            {!composerBlockedReason && draft.trim().length >= 3 ? (
              <JarvisMemorySuggestions
                key={conversation?.conversationId ?? "new-chat"}
                draft={draft}
                onUse={(nextDraft) => {
                  setDraft(nextDraft);
                  composerRef.current?.focus();
                }}
              />
            ) : null}
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
                    onClick={() => runBoundAction("approve-turn")}
                  >
                    Approve this run
                  </button>
                  <button
                    type="button"
                    className={styles.dangerButton}
                    disabled={mutationLocked}
                    aria-describedby={mutationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
                    onClick={cancelTurn}
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
                    onClick={() => runBoundAction("execute-turn")}
                  >
                    Execute one response
                  </button>
                  <button
                    type="button"
                    className={styles.dangerButton}
                    disabled={mutationLocked}
                    aria-describedby={mutationLocked ? GLOBAL_BUSY_REASON_ID : undefined}
                    onClick={cancelTurn}
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
                  onClick={recoverTurn}
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
                    This removes the local conversation display and history. Any separately retained bounded Private Alpha run/audit and committed Website Creator handoff/project evidence remains unchanged under its own safety lifecycle.
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
