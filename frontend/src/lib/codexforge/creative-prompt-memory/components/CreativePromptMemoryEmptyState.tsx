"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function CreativePromptMemoryEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No saved prompt memory yet"
      message="That is expected. Start with reviewed memory candidates, copy a handoff if useful, and only save through an approved review boundary later."
    />
  );
}
