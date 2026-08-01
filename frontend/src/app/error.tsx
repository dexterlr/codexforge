"use client";

import Link from "next/link";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProductError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <CodexForgeAppShell workspaceLabel="CodexForge" focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false}>
      <section aria-labelledby="product-error-title" role="alert" style={{ padding: 20 }}>
        <h1 id="product-error-title">This product view could not be loaded</h1>
        <p>The action did not complete. No success is assumed and no provider retry, fallback, file write, or paid reroute was started.</p>
        <div aria-label="Error recovery actions" style={actions}>
          <button type="button" onClick={reset} style={primaryAction}>Try this view again</button>
          <Link href="/jarvis" style={secondaryAction}>Return to Jarvis</Link>
          <Link href="/" style={secondaryAction}>Go to Home</Link>
        </div>
      </section>
    </CodexForgeAppShell>
  );
}

const actions = { display: "flex", flexWrap: "wrap", gap: 8 } as const;
const actionBase = { borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 850, padding: "9px 11px", textDecoration: "none" } as const;
const primaryAction = { ...actionBase, border: "1px solid rgba(45,212,191,0.4)", background: "rgba(20,184,166,0.18)", color: "#ccfbf1" } as const;
const secondaryAction = { ...actionBase, border: "1px solid rgba(148,163,184,0.24)", background: "rgba(15,23,42,0.7)", color: "#e2e8f0" } as const;
