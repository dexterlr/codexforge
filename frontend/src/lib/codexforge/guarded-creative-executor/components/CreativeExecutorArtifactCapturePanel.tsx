"use client";

import type { CreativeExecutorArtifactCapture } from "../guarded-creative-executor-types";
import { summarizeCreativeExecutorArtifactCapture } from "../creative-executor-artifact-capture";
import { ExecutorList, panel, titleStyle } from "./shared";

export function CreativeExecutorArtifactCapturePanel({ capture }: { capture: CreativeExecutorArtifactCapture }) {
  return (
    <section style={panel} data-creative-executor-artifact-capture-panel="CreativeExecutorArtifactCapturePanel renders artifact capture has waiting-for-future-executor no file writes">
      <h2 style={titleStyle}>Artifact Capture</h2>
      <ExecutorList title="Summary" items={summarizeCreativeExecutorArtifactCapture(capture)} />
      <ExecutorList title="Capture items" items={capture.items.map((item) => `${item.type}: ${item.captureStatus}; ${item.placeholderPath}; ${item.reviewRoute}`)} />
    </section>
  );
}
