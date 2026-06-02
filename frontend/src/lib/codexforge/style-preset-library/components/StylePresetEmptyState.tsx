"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function StylePresetEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No custom style presets saved"
      message="The built-in presets are deterministic examples. Custom saving still needs an approved persistence boundary."
    />
  );
}
