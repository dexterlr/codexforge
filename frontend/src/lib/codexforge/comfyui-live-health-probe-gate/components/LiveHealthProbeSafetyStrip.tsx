"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function LiveHealthProbeSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={["Preview only", "Local-only target", "Metadata only", "No prompt sent", "No workflow run", "No queue submit"]}
    />
  );
}
