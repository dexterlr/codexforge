"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildConnectorAdapterPreviewModel } from "@/lib/codexforge/connector-adapter-preview";

export function ConnectorAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildConnectorAdapterPreviewModel()} />;
}
