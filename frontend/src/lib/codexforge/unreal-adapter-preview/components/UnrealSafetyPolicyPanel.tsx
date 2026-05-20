import type { UnrealAdapterSafetyPolicy } from "../unreal-adapter-types";
import { summarizeUnrealAdapterSafetyPolicy } from "../index";
import { metaGrid, UnrealList, UnrealMetric, UnrealPanel } from "./UnrealPanelShared";

export function UnrealSafetyPolicyPanel({ policy }: { policy: UnrealAdapterSafetyPolicy }) {
  return (
    <UnrealPanel marker="UnrealSafetyPolicyPanel renders" title="Safety Policy">
      <div style={metaGrid}>
        <UnrealMetric label="Preview" value={policy.previewAllowed ? "allowed" : "blocked"} />
        <UnrealMetric label="Execution" value={policy.executionAllowed ? "allowed" : "blocked"} />
        <UnrealMetric label="Request" value={policy.requestReady ? "ready" : "not ready"} />
      </div>
      <UnrealList title="Summary" items={summarizeUnrealAdapterSafetyPolicy(policy)} />
      <UnrealList title="Blocked reasons" items={policy.blockedReasons} />
      <UnrealList title="Warnings" items={policy.warnings} />
    </UnrealPanel>
  );
}
