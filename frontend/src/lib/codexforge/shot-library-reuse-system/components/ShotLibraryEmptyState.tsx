"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function ShotLibraryEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No custom shots saved"
      message="Use the default templates as planning examples. Saving custom shot libraries still needs an approved persistence boundary."
    />
  );
}
