"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { GpuJobResourcePlan } from "../local-gpu-scheduler-types";

export function GpuJobResourcePlanPanel({ resourcePlans }: { resourcePlans: GpuJobResourcePlan[] }) {
  return (
    <PreviewFoundationCard title="Resource plan">
      {resourcePlans.map((plan) => (
        <div key={plan.id}>
          <PreviewFoundationCopy>{plan.queueReason}</PreviewFoundationCopy>
          <PreviewFoundationPillList items={[plan.resourcePosture, plan.workerHint, plan.safetyNote]} />
        </div>
      ))}
    </PreviewFoundationCard>
  );
}
