"use client";

import type { BridgeHealthSetupGuide } from "../local-bridge-health-types";
import { buildLocalBridgeHealthReactKey } from "../local-bridge-health-types";
import { HealthList, HealthPanel, pill, titleStyle } from "./shared";

export function BridgeHealthSetupGuidePanel({ guide }: { guide: BridgeHealthSetupGuide }) {
  return (
    <HealthPanel marker="BridgeHealthSetupGuidePanel renders setup guide includes Blender setup guide includes ComfyUI setup guide includes Unreal setup guide includes ffmpeg setup guide includes artifact output boundary">
      <h2 style={titleStyle}>Setup Guide</h2>
      <HealthList title="Guide summary" items={guide.summary} />
      {guide.steps.map((step, index) => (
        <article key={buildLocalBridgeHealthReactKey("setup", step.id, index)} style={{ display: "grid", gap: 6, minWidth: 0 }}>
          <span style={pill}>{step.targetId}</span>
          <strong>{step.label}</strong>
          <span style={{ color: "#cbd5e1", overflowWrap: "break-word" }}>{step.detail}</span>
          <span style={{ color: "#fef3c7", overflowWrap: "break-word" }}>{step.blockedUntil}</span>
        </article>
      ))}
    </HealthPanel>
  );
}
