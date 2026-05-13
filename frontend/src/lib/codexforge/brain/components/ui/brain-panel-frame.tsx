"use client";

import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactNode,
} from "react";
import { BrainSectionHeader } from "./brain-ui-primitives";
import { BRAIN_PANEL_SURFACE_STYLES } from "./brain-ui-tokens";

type BrainPanelFrameProps = ComponentPropsWithoutRef<"section"> & {
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  actions?: ReactNode;
  status?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
};

export function BrainPanelFrame({
  title,
  eyebrow,
  description,
  actions,
  status,
  children,
  compact = false,
  style,
  ...rest
}: BrainPanelFrameProps) {
  const compactStyle: CSSProperties = compact
    ? { gap: 10, padding: 12 }
    : {};

  return (
    <section
      {...rest}
      data-codexforge-brain-panel-frame
      style={{
        ...BRAIN_PANEL_SURFACE_STYLES.panel,
        ...compactStyle,
        ...style,
      }}
    >
      <BrainSectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={actions}
        status={status}
        compact={compact}
      />
      {children}
    </section>
  );
}
