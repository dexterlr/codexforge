"use client";

import type { CSSProperties } from "react";
import type { BrainDisplayDensity } from "./brain-responsive-shell";
import { BRAIN_PANEL_BADGE_STYLES } from "./brain-ui-tokens";

type BrainDensityControlsProps = {
  value: BrainDisplayDensity;
  onChange: (density: BrainDisplayDensity) => void;
};

const DENSITY_OPTIONS: ReadonlyArray<{
  value: BrainDisplayDensity;
  label: string;
  description: string;
}> = [
  {
    value: "comfortable",
    label: "Comfort",
    description: "Balanced command center spacing",
  },
  {
    value: "compact",
    label: "Compact",
    description: "Tighter spacing for smaller screens",
  },
  {
    value: "dense",
    label: "Dense",
    description: "Maximum panel density",
  },
] as const;

export function BrainDensityControls({
  value,
  onChange,
}: BrainDensityControlsProps) {
  return (
    <div
      data-codexforge-brain-density-controls
      role="group"
      aria-label="Brain display density"
      style={controlsStyle}
    >
      {DENSITY_OPTIONS.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            data-codexforge-brain-density-option
            data-codexforge-brain-density-option-active={active ? "true" : "false"}
            aria-label={option.description}
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            style={{
              ...optionStyle,
              borderColor: active
                ? "rgba(125,211,252,0.52)"
                : "rgba(255,255,255,0.10)",
              background: active
                ? "rgba(14,165,233,0.16)"
                : "rgba(255,255,255,0.045)",
              color: active ? "rgba(240,249,255,0.96)" : "rgba(226,232,240,0.76)",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

const controlsStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  minWidth: 0,
};

const optionStyle: CSSProperties = {
  ...BRAIN_PANEL_BADGE_STYLES.base,
  border: "1px solid rgba(255,255,255,0.10)",
  cursor: "pointer",
};
