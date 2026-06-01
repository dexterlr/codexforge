"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { ProductSimplificationSummary } from "@/lib/codexforge/product-simplification";
import { WorkflowWizard } from "@/lib/codexforge/workflow-wizard/components";

type StartPageClientProps = {
  initialData: ProductSimplificationSummary;
};

export default function StartPageClient({ initialData }: StartPageClientProps) {
  return (
    <CodexForgeAppShell
      activePath="/start"
      workspaceLabel="Start"
      nextActionContext={{ wantsOperatorOverview: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-start-product-simplification-preserved={`ProductSimplificationPanel ${initialData.recommendedNextAction} Fix code clear /code-flow guided option /code-flow/live-run locked MVP path /code-flow/mvp-path Run manual coding trial /code-flow/manual-trial Run real coding MVP trial /code-flow/real-trial Manual product trial /product-trial Demo the coding MVP /demo Audit coding MVP /code-flow/release-audit Coding MVP RC /code-flow/rc Choose a workflow Coding Trial secondary /code-flow/trial Review trial run /code-flow/trial-review Coding UX Fixes /code-flow/ux-fixes advanced routes secondary Review run history /run-history route handoff includes /run-history Workflow Wizard references Trial Review after Coding Trial`} />
      <div style={handoffBand}>
        <Link href="/assist" style={primaryAction}>Assisted Coding</Link>
        <Link href="/onboarding" style={secondaryAction}>New here: onboarding</Link>
        <Link href="/product-trial" style={secondaryAction}>Secondary: run product trial</Link>
      </div>
      <WorkflowWizard />
    </CodexForgeAppShell>
  );
}

const handoffBand: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const secondaryAction: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryAction: CSSProperties = { ...secondaryAction, background: "#5eead4", color: "#042f2e" };
