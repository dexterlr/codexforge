import type { UnrealMaterialPlan } from "../unreal-adapter-types";
import { summarizeUnrealMaterialPlan } from "../index";
import { UnrealList, UnrealPanel } from "./UnrealPanelShared";

export function UnrealMaterialPlanPanel({ plan }: { plan: UnrealMaterialPlan }) {
  return (
    <UnrealPanel marker="UnrealMaterialPlanPanel renders" title="Material Plan">
      <UnrealList title="Summary" items={summarizeUnrealMaterialPlan(plan)} />
      <UnrealList title="Material placeholders" items={plan.items.map((item) => `${item.label}: ${item.baseColorLabel}; ${item.roughnessHint}; ${item.materialInstanceNote}`)} />
    </UnrealPanel>
  );
}
