import type { UnrealAssetPlan } from "../unreal-adapter-types";
import { summarizeUnrealAssetPlan } from "../index";
import { UnrealList, UnrealPanel } from "./UnrealPanelShared";

export function UnrealAssetPlanPanel({ plan }: { plan: UnrealAssetPlan }) {
  return (
    <UnrealPanel marker="UnrealAssetPlanPanel renders" title="Asset Plan">
      <UnrealList title="Summary" items={summarizeUnrealAssetPlan(plan)} />
      <UnrealList title="Asset placeholders" items={plan.items.map((item) => `${item.label}: ${item.assetType}; ${item.placeholderPath}; ${item.reviewAction}`)} />
      <UnrealList title="Required markers" items={["static-mesh", "level-sequence", "No real asset import.", "No filesystem writes."]} />
    </UnrealPanel>
  );
}
