import type { UnrealLevelModel } from "../unreal-adapter-types";
import { summarizeUnrealLevelModel } from "../index";
import { metaGrid, UnrealList, UnrealMetric, UnrealPanel } from "./UnrealPanelShared";

export function UnrealLevelModelPanel({ model }: { model: UnrealLevelModel }) {
  return (
    <UnrealPanel marker="UnrealLevelModelPanel renders" title="Level Model">
      <div style={metaGrid}>
        <UnrealMetric label="Layers" value={String(model.levelLayers.length)} />
        <UnrealMetric label="Risk" value={model.riskLevel} />
        <UnrealMetric label="Approval" value={model.approvalRequired ? "required" : "not required"} />
      </div>
      <UnrealList title="Summary" items={summarizeUnrealLevelModel(model)} />
      <UnrealList title="Level layers" items={model.levelLayers.map((layer) => `${layer.layer}: ${layer.purpose}`)} />
      <UnrealList title="Expected artifacts" items={model.expectedArtifacts} />
    </UnrealPanel>
  );
}
