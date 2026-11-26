"use client";

import { useEffect, useState } from "react";
import type { ProjectMemoryFeed } from "./development-chat.server";
import { fetchProjectMemoryFeed } from "./project-learning-client";

const EMPTY_FEED: ProjectMemoryFeed = { result: [], developmentChatStatus: "unconfigured" };

export function useProjectMemory() {
  const [feed, setFeed] = useState(EMPTY_FEED);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    let polling: ReturnType<typeof setInterval> | undefined;
    let pending = false;

    async function refreshChat() {
      if (signal.aborted || pending || document.visibilityState === "hidden") return;
      pending = true;
      try {
        const update = await fetchProjectMemoryFeed(signal, true);
        if (signal.aborted) return;
        setFeed(previous => {
          const keepPrior = update.developmentChatStatus === "storage-error";
          const entries = new Map(previous.result
            .filter(entry => keepPrior || entry.sourceType !== "codex-chat")
            .map(entry => [entry.id, entry]));
          for (const entry of update.result) entries.set(entry.id, entry);
          return {
            developmentChatStatus: update.developmentChatStatus,
            result: [...entries.values()].sort((a, b) => b.at.localeCompare(a.at) || a.id.localeCompare(b.id)),
          };
        });
      } catch {
        // A transport failure supplies no evidence that a saved memory was removed.
        if (!signal.aborted) setFeed(previous => ({ ...previous, developmentChatStatus: "unavailable" }));
      } finally {
        pending = false;
      }
    }

    fetchProjectMemoryFeed(signal).then(initial => {
      if (signal.aborted) return;
      setFeed(initial);
      setStatus("ready");
      if (initial.developmentChatStatus !== "unconfigured") {
        polling = setInterval(refreshChat, 15_000);
        document.addEventListener("visibilitychange", refreshChat);
      }
    }).catch(() => {
      if (signal.aborted) return;
      setFeed(EMPTY_FEED);
      setStatus("error");
    });
    return () => {
      controller.abort();
      clearInterval(polling);
      document.removeEventListener("visibilitychange", refreshChat);
    };
  }, [revision]);

  function refresh() {
    setStatus("loading");
    setRevision(value => value + 1);
  }
  return { entries: feed.result, developmentChatStatus: feed.developmentChatStatus, status, refresh };
}
