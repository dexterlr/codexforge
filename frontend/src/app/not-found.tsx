import Link from "next/link";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProductNotFound() {
  return (
    <CodexForgeAppShell workspaceLabel="Page not found" focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false}>
      <section aria-labelledby="product-not-found-title" style={{ padding: 20 }}>
        <h1 id="product-not-found-title">Page not found</h1>
        <p>The link may be historical or unavailable. Continue from the canonical product Home or Jarvis workspace.</p>
        <div aria-label="Page recovery actions" style={actions}>
          <Link href="/jarvis" style={primaryAction}>Build with Jarvis</Link>
          <Link href="/" style={secondaryAction}>Open CodexForge Home</Link>
          <Link href="/developer-diagnostics-hub-preview" style={secondaryAction}>Developer Diagnostics</Link>
        </div>
      </section>
    </CodexForgeAppShell>
  );
}

const actions = { display: "flex", flexWrap: "wrap", gap: 8 } as const;
const actionBase = { borderRadius: 8, fontSize: 13, fontWeight: 850, padding: "9px 11px", textDecoration: "none" } as const;
const primaryAction = { ...actionBase, border: "1px solid rgba(45,212,191,0.4)", background: "rgba(20,184,166,0.18)", color: "#ccfbf1" } as const;
const secondaryAction = { ...actionBase, border: "1px solid rgba(148,163,184,0.24)", background: "rgba(15,23,42,0.7)", color: "#e2e8f0" } as const;
