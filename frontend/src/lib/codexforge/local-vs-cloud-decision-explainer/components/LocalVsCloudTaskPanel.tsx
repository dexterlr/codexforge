"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { LocalVsCloudTask } from "../local-vs-cloud-types";

export function LocalVsCloudTaskPanel({ tasks }: { tasks: LocalVsCloudTask[] }) {
  return (
    <PreviewFoundationCard title="Video job type">
      <PreviewFoundationCopy>Each task gets a local-first or cloud-review explanation in plain English.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={tasks.map((task) => task.label)} />
      <PreviewFoundationCopy>{tasks[0]?.plainEnglish ?? "Choose a task before deciding local or cloud."}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
