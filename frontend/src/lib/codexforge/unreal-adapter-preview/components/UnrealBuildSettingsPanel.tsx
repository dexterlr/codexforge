import type { UnrealBuildSettings } from "../unreal-adapter-types";
import { summarizeUnrealBuildSettings } from "../index";
import { metaGrid, UnrealList, UnrealMetric, UnrealPanel } from "./UnrealPanelShared";

export function UnrealBuildSettingsPanel({ settings }: { settings: UnrealBuildSettings }) {
  return (
    <UnrealPanel marker="UnrealBuildSettingsPanel renders" title="Build Settings">
      <div style={metaGrid}>
        <UnrealMetric label="Target platform label" value={settings.targetPlatformLabel} />
        <UnrealMetric label="Resolution" value={settings.resolutionLabel} />
        <UnrealMetric label="FPS" value={String(settings.fps)} />
      </div>
      <UnrealList title="Summary" items={summarizeUnrealBuildSettings(settings)} />
      <UnrealList title="Risk notes" items={settings.riskNotes} />
      <UnrealList title="Validation recommendations" items={settings.validationRecommendations} />
    </UnrealPanel>
  );
}
