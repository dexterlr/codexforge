import type { CSSProperties, ReactNode } from "react";
import { CodexForgeGlobalNav } from "./CodexForgeGlobalNav";

type CodexForgePageShellProps = {
  children: ReactNode;
  maxWidth?: number;
  compactNav?: boolean;
  style?: CSSProperties;
};

export function CodexForgePageShell({
  children,
  maxWidth = 1240,
  compactNav = false,
  style,
}: CodexForgePageShellProps) {
  return (
    <div
      data-codexforge-page-shell
      style={{
        width: "100%",
        maxWidth,
        margin: "0 auto",
        display: "grid",
        gap: 12,
        minWidth: 0,
        maxInlineSize: "100%",
        ...style,
      }}
    >
      <CodexForgeGlobalNav compact={compactNav} />
      {children}
    </div>
  );
}
