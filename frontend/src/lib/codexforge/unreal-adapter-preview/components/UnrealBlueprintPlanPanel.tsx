import type { UnrealBlueprintPlan } from "../unreal-adapter-types";
import { summarizeUnrealBlueprintPlan } from "../index";
import { UnrealList, UnrealPanel } from "./UnrealPanelShared";

export function UnrealBlueprintPlanPanel({ plan }: { plan: UnrealBlueprintPlan }) {
  return (
    <UnrealPanel marker="UnrealBlueprintPlanPanel renders" title="Blueprint Plan">
      <UnrealList title="Summary" items={summarizeUnrealBlueprintPlan(plan)} />
      <UnrealList title="Blueprint placeholders" items={plan.items.map((item) => `${item.label}: ${item.blueprintType}; ${item.eventGraphSummary}; ${item.safetyNote}`)} />
      <UnrealList title="Required markers" items={["actor-blueprint", "No Blueprint execution."]} />
    </UnrealPanel>
  );
}
