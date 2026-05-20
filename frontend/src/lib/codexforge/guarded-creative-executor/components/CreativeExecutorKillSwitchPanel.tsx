"use client";

import type { CreativeExecutorKillSwitchPlan } from "../guarded-creative-executor-types";
import { summarizeCreativeExecutorKillSwitchPlan } from "../creative-executor-kill-switch";
import { ExecutorList, panel, titleStyle } from "./shared";

export function CreativeExecutorKillSwitchPanel({ plan }: { plan: CreativeExecutorKillSwitchPlan }) {
  return (
    <section style={panel} data-creative-executor-kill-switch-panel="CreativeExecutorKillSwitchPanel renders kill-switch plan says future-only no current execution to cancel">
      <h2 style={titleStyle}>Kill-Switch</h2>
      <ExecutorList title="Summary" items={summarizeCreativeExecutorKillSwitchPlan(plan)} />
      <ExecutorList title="Policy items" items={plan.items.map((item) => `${item.label}: ${item.currentPhaseAction}`)} />
    </section>
  );
}
