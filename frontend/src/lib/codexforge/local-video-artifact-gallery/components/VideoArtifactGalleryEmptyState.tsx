"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function VideoArtifactGalleryEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No renders exist yet"
      message="Future local videos, keyframes, workflow packages, and review notes will appear here after a guarded artifact source exists."
    />
  );
}
