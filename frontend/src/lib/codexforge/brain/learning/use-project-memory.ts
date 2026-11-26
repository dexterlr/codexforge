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
        setFeed(previous => ({
          developmentChatStatus: update.developmentChatStatus,
          result: [...previous.result.filter(entry => entry.sourceType !== "codex-chat"), ...update.result]
            .sort((a, b) => b.at.localeCompare(a.at) || a.id.localeCompare(b.id)),
        }));
      } catch {
        if (!signal.aborted) setFeed(previous => ({
          developmentChatStatus: "unavailable",
          result: previous.result.filter(entry => entry.sourceType !== "codex-chat"),
        }));
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
