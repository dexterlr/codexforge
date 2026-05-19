import type { CSSProperties } from "react";

export function ComfyUiAdapterEmptyState() {
  return (
    <section
      style={empty}
      data-codexforge-comfyui-adapter-empty-state="ComfyUiAdapterEmptyState renders empty preview state no ComfyUI execution"
    >
      ComfyUI workflow metadata is available as a deterministic preview. If model data is missing, the route stays
      blocked rather than guessing executor-ready settings.
    </section>
  );
}

const empty: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(255,255,255,0.035)",
  borderRadius: 8,
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.45,
  minWidth: 0,
  padding: 12,
  overflowWrap: "anywhere",
};

