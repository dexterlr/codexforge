"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function SubmitBoundaryEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No ComfyUI submit executed"
      message="The submit boundary is prepared for review, but there is no submit button. A future button must stay disabled unless policy, approval, and a guarded executor all allow it."
    />
  );
}
