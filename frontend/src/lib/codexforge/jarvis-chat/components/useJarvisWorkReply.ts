"use client";

import { useRef, useState } from "react";
import { fetchJarvisChatConversation, JarvisChatApiError } from "../jarvis-chat-api-client";
import type { JarvisChatConversation } from "../jarvis-chat-types";
import { runJarvisWorkReply } from "../jarvis-work-reply-client";
import type { JarvisWorkReplyActivity } from "./JarvisChatPanel";

export function useJarvisWorkReply() {
  const [activity, setActivity] = useState<JarvisWorkReplyActivity | null>(null);
  const activeReply = useRef<string | null>(null);

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
      // Recover the durable state if a response was interrupted. Only Send starts a run.
      try { latest = await fetchJarvisChatConversation(initial.conversationId); } catch { /* Retain the last confirmed revision. */ }
      const error = caught instanceof JarvisChatApiError ? caught.message : "Jarvis couldn’t finish this reply. Your message is saved.";
      setActivity({ record: latest, pending: false, error });
    } finally {
      activeReply.current = null;
    }
  }

  return { activity, replyToSavedTurn };
}
