import type { UnrealProjectInput } from "../unreal-adapter-types";
import { summarizeUnrealProjectInput } from "../index";
import { lede, metaGrid, UnrealList, UnrealMetric, UnrealPanel } from "./UnrealPanelShared";

export function UnrealProjectInputPanel({ input }: { input: UnrealProjectInput }) {
  return (
    <UnrealPanel marker="UnrealProjectInputPanel renders" title="Project Input">
      <p style={lede}>{input.projectGoal}</p>
      <div style={metaGrid}>
        <UnrealMetric label="Kind" value={input.projectKind} />
        <UnrealMetric label="Target platform label" value={input.targetPlatformLabel} />
        <UnrealMetric label="Style" value={input.visualStyle} />
      </div>
      <UnrealList title="Summary" items={summarizeUnrealProjectInput(input)} />
      <UnrealList title="Kinds supported" items={["cinematic-preview", "playable-level-preview", "architectural-visualization", "product-showcase", "virtual-production", "technical-demo", "environment-blockout", "interaction-prototype", "unknown"]} />
      <UnrealList title="Operator constraints" items={input.operatorConstraints} />
    </UnrealPanel>
  );
}
