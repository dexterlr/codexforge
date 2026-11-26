"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listJarvisChatConversations } from "@/lib/codexforge/jarvis-chat/jarvis-chat-api-client";
import type { JarvisChatConversationSummary } from "@/lib/codexforge/jarvis-chat/jarvis-chat-types";
import styles from "./WorkAssistant.module.css";

const dateFormat = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" });

export function RecentConversations({ disabled }: { disabled: boolean }) {
  const [chats, setChats] = useState<readonly JarvisChatConversationSummary[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [expanded, setExpanded] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    listJarvisChatConversations().then((result) => {
      if (!active) return;
      setChats(result.filter((chat) => chat.state !== "deleting"));
      setStatus("ready");
    }).catch(() => {
      if (active) setStatus("error");
    });
    return () => { active = false; };
  }, [attempt]);

  function refresh() {
    setStatus("loading");
    setAttempt((current) => current + 1);
  }

  return (
    <aside className={styles.history} aria-labelledby="work-history-title" inert={disabled}>
      <h2 id="work-history-title">{expanded ? "All conversations" : "Recent conversations"}</h2>
      {chats.length > 0 ? (
        <ul className={styles.historyList} id="work-history-list">
          {(expanded ? chats : chats.slice(0, 3)).map((chat) => (
            <li key={chat.conversationId}>
              <Link href={`/work-assistant?conversation=${encodeURIComponent(chat.conversationId)}`} prefetch={false}>
                <span className={styles.historyTitle}>{chat.title}</span>
                <time dateTime={chat.updatedAt}>{dateFormat.format(new Date(chat.updatedAt))}</time>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.historyNotice} role="status">
          {status === "loading" && "Loading your local chats…"}
          {status === "error" && "Your conversation history couldn’t load."}
          {status === "ready" && "Your conversations will appear here after you start a chat."}
        </p>
      )}
      {status === "error" && (
        <button type="button" className={styles.historyLink} onClick={refresh}>Try again</button>
      )}
      {chats.length > 3 && (
        <button type="button" className={styles.historyLink} aria-controls="work-history-list"
          aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show recent conversations" : "View all conversations"}
        </button>
      )}
    </aside>
  );
}
