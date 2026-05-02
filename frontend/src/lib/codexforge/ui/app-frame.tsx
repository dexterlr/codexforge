import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  appPageStyle,
  appShellStyle,
  codexforgeTheme,
  glassPanelStyle,
  pillButtonStyle,
} from "./theme";

type NavItem = {
  href: string;
  label: string;
};

type AppFrameProps = {
  title?: string;
  subtitle?: string;
  navItems?: NavItem[];
  children: ReactNode;
  shellMaxWidth?: number;
};

export function CodexForgeAppFrame({
  title = "CodexForge",
  subtitle = "AI developer workspace",
  navItems = [],
  children,
  shellMaxWidth = 1160,
}: AppFrameProps) {
  return (
    <main style={appPageStyle()}>
      <div style={appShellStyle(shellMaxWidth)}>
        <header style={topBar}>
          <div style={brand}>
            <div aria-hidden="true" style={logo} />
            <div style={brandTextWrap}>
              <div style={brandTitle}>{title}</div>
              <div style={brandSubtitle}>{subtitle}</div>
            </div>
          </div>

          {navItems.length > 0 ? (
            <nav style={topNav}>
              {navItems.map((item, index) => (
                <Link
                  key={`${item.href}-${index}`}
                  href={item.href}
                  style={pillButtonStyle("ghost", navLink)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </header>

        {children}
      </div>
    </main>
  );
}

export function CodexForgeSurface(props: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return <section style={glassPanelStyle(props.style)}>{props.children}</section>;
}

const topBar: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "10px 12px",
  borderRadius: 14,
  border: `1px solid ${codexforgeTheme.color.borderSoft}`,
  background: codexforgeTheme.color.panelBg,
  backdropFilter: "blur(10px)",
};

const brand: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const logo: CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: 10,
  background: `linear-gradient(135deg, ${codexforgeTheme.color.primaryStart}, ${codexforgeTheme.color.primaryEnd})`,
  boxShadow: codexforgeTheme.shadow.logo,
};

const brandTextWrap: CSSProperties = {
  display: "grid",
  gap: 2,
  lineHeight: 1.1,
};

const brandTitle: CSSProperties = {
  fontWeight: 800,
  letterSpacing: 0.2,
};

const brandSubtitle: CSSProperties = {
  fontSize: 12,
  opacity: 0.75,
};

const topNav: CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const navLink: CSSProperties = {
  padding: "9px 12px",
  fontSize: 13,
};