import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProductLoading() {
  return (
    <CodexForgeAppShell workspaceLabel="CodexForge" focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false}>
      <section aria-labelledby="product-loading-title" role="status" aria-live="polite" style={{ padding: 20 }}>
        <h1 id="product-loading-title">Loading CodexForge</h1>
        <p>Preparing the local product view. No provider call or execution starts while this page loads.</p>
      </section>
    </CodexForgeAppShell>
  );
}
