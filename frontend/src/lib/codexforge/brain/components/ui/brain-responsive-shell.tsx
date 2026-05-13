"use client";

import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactNode,
} from "react";
import { BRAIN_PANEL_SURFACE_STYLES } from "./brain-ui-tokens";

export type BrainDisplayDensity = "compact" | "comfortable" | "dense";

type BrainResponsiveShellProps = ComponentPropsWithoutRef<"section"> & {
  density?: BrainDisplayDensity;
  children: ReactNode;
};

const DENSITY_STYLES: Record<BrainDisplayDensity, CSSProperties> = {
  compact: {
    gap: 12,
    padding: 14,
  },
  comfortable: {
    gap: 14,
    padding: 16,
  },
  dense: {
    gap: 10,
    padding: 12,
  },
};

export function BrainResponsiveShell({
  density = "comfortable",
  children,
  style,
  ...rest
}: BrainResponsiveShellProps) {
  return (
    <section
      {...rest}
      data-codexforge-brain-responsive-shell
      data-codexforge-brain-density={density}
      style={{
        ...BRAIN_PANEL_SURFACE_STYLES.shell,
        ...DENSITY_STYLES[density],
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
