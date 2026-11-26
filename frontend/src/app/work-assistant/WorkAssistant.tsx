"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition, type FormEvent, type KeyboardEvent } from "react";
import {
  createJarvisChatConversation,
  fetchJarvisChatConversation,
  JarvisChatApiError,
} from "@/lib/codexforge/jarvis-chat/jarvis-chat-api-client";
import { JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS } from "@/lib/codexforge/jarvis-chat/jarvis-chat-policy";
import { runJarvisWorkReply } from "@/lib/codexforge/jarvis-chat/jarvis-work-reply-client";
import type { JarvisChatConversation } from "@/lib/codexforge/jarvis-chat/jarvis-chat-types";
import type { JarvisWorkReplyActivity } from "@/lib/codexforge/jarvis-chat/components/JarvisChatPanel";
import { RecentConversations } from "./RecentConversations";
import styles from "./WorkAssistant.module.css";

const JarvisChatPanel = dynamic(
  () => import("@/lib/codexforge/jarvis-chat/components/JarvisChatPanel").then((module) => module.JarvisChatPanel),
  { ssr: false, loading: () => <p role="status">Opening conversation…</p> },
);

const tasks = {
  question: {
    title: "Ask a question",
    hint: "Understand a topic",
    example: "What is the difference between a project milestone and a deliverable? Give me a simple example.",
    label: "Your question",
    placeholder: "What would you like help understanding?",
    instruction: "",
  },
  plan: {
    title: "Plan a task",
    hint: "Break a goal into steps",
    example: "Prepare a 15-minute project kickoff for a three-person team. Give me a timed agenda and one clear follow-up.",
    label: "What are you working toward?",
    placeholder: "Describe the goal, deadline, and any constraints.",
    instruction: "Break this task into steps and suggest what to do first.",
  },
  message: {
    title: "Draft a message",
    hint: "Find the right words",
    example: "Write a friendly note asking my team to send their agenda items by Thursday. Keep it under 60 words.",
    label: "Who are you writing to?",
    placeholder: "Describe the audience, the key points, and the tone you want.",
    instruction: "Draft a message using these details.",
  },
  notes: {
    title: "Summarize notes",
    hint: "Pull out the essentials",
    example: "Monday check-in: We chose the shorter onboarding flow. Lee will update the prototype by Thursday. We still need to pick a date for user testing.",
    label: "Your notes",
    placeholder: "Paste the notes you want Jarvis to summarize.",
    instruction: "Summarize these notes. List any decisions and next steps mentioned.",
  },
} as const;

type Task = keyof typeof tasks;
const taskKeys = Object.keys(tasks) as Task[];

export function WorkAssistant({ conversationId }: { conversationId: string | null }) {
  const router = useRouter();
  const [navigating, startTransition] = useTransition();
  const [task, setTask] = useState<Task>("question");
  const [drafts, setDrafts] = useState<Record<Task, string>>({
    question: "",
    plan: "",
    message: "",
    notes: "",
  });
  const [opening, setOpening] = useState(false);
  const [activity, setActivity] = useState<JarvisWorkReplyActivity | null>(null);
  const activeReply = useRef<string | null>(null);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const editor = useRef<HTMLTextAreaElement>(null);
  const current = tasks[task];
  const draft = drafts[task];
  const taskInstruction = current.instruction ? "\n\n" + current.instruction : "";
  const limit = JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS - taskInstruction.length;
  const excess = draft.length - limit;
  const locked = opening || navigating || Boolean(activity?.pending);
  const canSubmit = Boolean(draft.trim()) && excess <= 0 && !locked;

  function insertExample() {
    if (draft.length || locked) return;
    setDrafts({ ...drafts, [task]: current.example });
    setError("");
    editor.current?.focus();
  }

  function handleEditorKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      if (canSubmit) event.currentTarget.form?.requestSubmit();
    }
  }

  async function replyToSavedTurn(initial: JarvisChatConversation) {
    if (activeReply.current !== null) return;
    activeReply.current = initial.currentTurnId;
    let latest = initial;
    const showProgress = (record: JarvisChatConversation) => {
      latest = record;
      setActivity({ record, pending: true, error: null });
    };
    showProgress(initial);
    try {
      const record = await runJarvisWorkReply(initial, showProgress);
      setActivity({ record, pending: false, error: null });
    } catch (caught) {
      // Read back the durable state if a response was interrupted. Only Send starts a run.
      try { latest = await fetchJarvisChatConversation(initial.conversationId); } catch { /* Retain the last confirmed revision. */ }
      const error = caught instanceof JarvisChatApiError ? caught.message : "Jarvis couldn’t finish this reply. Your message is saved.";
      setActivity({ record: latest, pending: false, error });
    } finally {
      activeReply.current = null;
    }
  }

  async function startChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !canSubmit) return;
    submitting.current = true;
    setOpening(true);
    setError("");
    const startUrl = window.location.href;
    try {
      const result = await createJarvisChatConversation({ message: draft.trim() + taskInstruction });
      void replyToSavedTurn(result.conversation);
      if (window.location.href !== startUrl) return;
      setDrafts((earlier) => ({ ...earlier, [task]: "" }));
      startTransition(() => {
        router.push(`/work-assistant?conversation=${encodeURIComponent(result.conversation.conversationId)}`);
      });
    } catch (caught) {
      setError(caught instanceof JarvisChatApiError
        ? caught.message
        : "Couldn’t open the chat. Your draft is still here. Try again.");
    } finally {
      submitting.current = false;
      setOpening(false);
    }
  }

  if (conversationId !== null) {
    return (
      <>
        <header className={`${styles.hero} ${styles.chatHero}`}>
          <h1>Work <em>Assistant</em></h1>
        </header>
        <JarvisChatPanel
          key={conversationId}
          workConversationId={conversationId}
          workReply={activity}
          onWorkReply={replyToSavedTurn}
          onNewWorkChat={() => router.push("/work-assistant")}
        />
      </>
    );
  }

  return (
    <>
      <header className={styles.hero}>
        <h1>Work <em>Assistant</em></h1>
        <p>Plan your next task, draft a message, or make sense of your notes with Jarvis.</p>
      </header>
      <fieldset className={styles.taskList} disabled={locked}>
        <legend>What would you like to do?</legend>
        <div className={styles.choices}>
          {taskKeys.map((key) => (
            <label key={key} className={styles.choice} data-task={key}>
              <input
                type="radio"
                name="work-task"
                value={key}
                checked={key === task}
                onChange={() => {
                  setTask(key);
                  setError("");
                }}
              />
              <span aria-hidden="true" className={styles.iconTile}><i className={styles.glyph} /></span>
              <span className={styles.choiceTitle}>{tasks[key].title}</span>
              <span className={styles.choiceHint}>{tasks[key].hint}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className={styles.workArea}>
        <form className={styles.composer} onSubmit={startChat} aria-label="Start a Jarvis conversation">
          <div className={styles.editorHeading}>
            <label className={styles.promptLabel} htmlFor="work-assistant-draft">{current.label}</label>
            {draft.length === 0 && (
              <button type="button" className={styles.example} onClick={insertExample} disabled={locked}>
                Use an example
              </button>
            )}
          </div>
          <div className={styles.editor}>
            <textarea
              id="work-assistant-draft"
              ref={editor}
              rows={4}
              value={draft}
              disabled={locked}
              placeholder={current.placeholder}
              aria-invalid={excess > 0}
              aria-describedby={current.instruction ? "work-instruction work-count" : "work-count"}
              onKeyDown={handleEditorKey}
              onChange={(event) => {
                setDrafts({ ...drafts, [task]: event.target.value });
                setError("");
              }}
            />
            <span className={styles.count} id="work-count">
              {excess > 0
                ? <strong className={styles.error}>Shorten your draft by {excess} {excess === 1 ? "character" : "characters"}.</strong>
                : `${draft.length} / ${limit} characters`}
            </span>
            {current.instruction && <p id="work-instruction" className={styles.instruction}>{current.instruction}</p>}
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <div className={styles.actions}>
            <p>Send runs Jarvis locally. Shift+Enter adds a new line.</p>
            <button type="submit" className={styles.submit} disabled={!canSubmit}>
              Send
            </button>
          </div>
          <span className={styles.srOnly} role="status">{locked ? "Starting your conversation." : ""}</span>
        </form>
        <RecentConversations disabled={locked} />
      </div>
    </>
  );
}
