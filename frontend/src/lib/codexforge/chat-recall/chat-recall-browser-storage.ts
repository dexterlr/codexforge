"use client";

import { CHAT_RECALL_CONTEXT_STORAGE_KEY } from "./chat-recall-types";
import { containsPrivateAlphaSecretLikeContent } from "../private-alpha/private-alpha-validation";

export const CHAT_RECALL_MAX_BROWSER_STORAGE_BYTES = 65_536;

const CHAT_RECALL_HANDOFF_KEYS = [
  "context",
  "handoff",
  "policy",
  "safety",
  "selection",
] as const;

function isBoundedCanonicalRecallPayload(payload: string): boolean {
  if (
    new TextEncoder().encode(payload).byteLength >
      CHAT_RECALL_MAX_BROWSER_STORAGE_BYTES ||
    containsPrivateAlphaSecretLikeContent(payload)
  ) {
    return false;
  }

  try {
    const parsed: unknown = JSON.parse(payload);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return false;
    }

    const keys = Object.keys(parsed).sort();
    return (
      keys.length === CHAT_RECALL_HANDOFF_KEYS.length &&
      keys.every((key, index) => key === CHAT_RECALL_HANDOFF_KEYS[index])
    );
  } catch {
    return false;
  }
}

export function readChatRecallHandoffFromBrowserStorage(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CHAT_RECALL_CONTEXT_STORAGE_KEY);
}

export function writeChatRecallHandoffToBrowserStorage(payload: string | undefined): boolean {
  if (
    !payload ||
    typeof window === "undefined" ||
    !isBoundedCanonicalRecallPayload(payload)
  ) {
    return false;
  }

  try {
    window.localStorage.setItem(CHAT_RECALL_CONTEXT_STORAGE_KEY, payload);
    return true;
  } catch {
    return false;
  }
}
