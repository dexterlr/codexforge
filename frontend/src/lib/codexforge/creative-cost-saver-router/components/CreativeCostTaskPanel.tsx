"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CreativeCostTask } from "../creative-cost-saver-types";

export function CreativeCostTaskPanel({ tasks }: { tasks: CreativeCostTask[] }) {
  return (
    <PreviewFoundationCard title="Creative tasks">
      {tasks.map((task) => (
        <div key={task.id}>
          <PreviewFoundationCopy>{task.label}: {task.plainEnglish}</PreviewFoundationCopy>
          <PreviewFoundationPillList items={[task.qualityGoal, task.localFirstStep]} />
        </div>
      ))}
    </PreviewFoundationCard>
  );
}
