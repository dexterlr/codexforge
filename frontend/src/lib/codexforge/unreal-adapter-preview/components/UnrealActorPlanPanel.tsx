import type { UnrealActorPlan } from "../unreal-adapter-types";
import { summarizeUnrealActorPlan } from "../index";
import { metaGrid, UnrealList, UnrealMetric, UnrealPanel } from "./UnrealPanelShared";

export function UnrealActorPlanPanel({ plan }: { plan: UnrealActorPlan }) {
  return (
    <UnrealPanel marker="UnrealActorPlanPanel renders" title="Actor Plan">
      <div style={metaGrid}>
        <UnrealMetric label="Actors" value={String(plan.items.length)} />
        <UnrealMetric label="Cine camera" value={plan.items.some((item) => item.actorType === "cine-camera-actor") ? "planned" : "optional"} />
        <UnrealMetric label="Blueprint actor" value={plan.items.some((item) => item.actorType === "blueprint-actor-placeholder") ? "planned" : "optional"} />
      </div>
      <UnrealList title="Summary" items={summarizeUnrealActorPlan(plan)} />
      <UnrealList title="Actor items" items={plan.items.map((item) => `${item.label}: ${item.actorType}; ${item.locationHint}; ${item.riskNote}`)} />
      <UnrealList title="Required markers" items={["cine-camera-actor", "blueprint-actor-placeholder"]} />
    </UnrealPanel>
  );
}
