"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildLiveBackendBoundaryInventoryModel, buildLiveBackendBoundaryInventoryStableKey } from "@/lib/codexforge/live-backend-boundary-inventory";

const LIVE_BACKEND_BOUNDARY_INVENTORY_MARKERS = [
  "Live backend boundary inventory",
  "Live backend boundary inventory does not execute boundary probes",
  "Missing boundaries remain blocked until implemented and approved",
  "UI review surfaces are not proof of live execution",
  "Boundary groups",
  "Provider boundary status",
] as const;

export function LiveBackendBoundaryInventoryPanel() {
  const model = buildLiveBackendBoundaryInventoryModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.inventories.map((inventory) => ({
    id: buildLiveBackendBoundaryInventoryStableKey("live-backend-boundary-inventory-card", inventory.id),
    title: inventory.liveBackendBoundaryInventoryIdentity,
    status: inventory.status,
    sections: [
      { label: "Boundary groups", items: inventory.boundaryGroups },
      { label: "Provider boundary status", items: inventory.providerBoundaryStatus },
      { label: "Local model boundary status", items: inventory.localModelBoundaryStatus },
      { label: "Connector boundary status", items: inventory.connectorBoundaryStatus },
      { label: "Automation boundary status", items: inventory.automationBoundaryStatus },
      { label: "File/test execution boundary status", items: inventory.fileTestExecutionBoundaryStatus },
      { label: "Evidence/logging boundary status", items: inventory.evidenceLoggingBoundaryStatus },
      { label: "Denied inventory actions", items: inventory.deniedInventoryActions },
      { label: "Unresolved backend boundary gaps", items: inventory.unresolvedBackendBoundaryGaps },
    ],
    routes: [inventory.providerExecutionReadinessRoute, inventory.localModelExecutionReadinessRoute],
    nextRecommendedAction: inventory.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 533"
      title="Backend boundaries"
      subtitle="Live backend boundary inventory distinguishes missing, review-only, and approved-elsewhere execution boundaries in plain English. Live backend boundary inventory does not execute boundary probes. Missing boundaries remain blocked until implemented and approved, and UI review surfaces are not proof of live execution."
      primaryLabel="Review inventory"
      anchor="live-backend-boundary-inventory"
      plainEnglishTitle="Plain-English live backend boundary inventory"
      plainEnglishCopy="This page reviews live backend boundary inventory identity, Boundary groups, Provider boundary status, Local model boundary status, Connector boundary status, Automation boundary status, File/test execution boundary status, Evidence/logging boundary status, Denied inventory actions, Unresolved backend boundary gaps, Provider execution readiness route, Local model execution readiness route, and next recommended action. It is review-only, approval required, and it does not execute boundary probes, call backends, claim live execution works, execute workflows, call providers, call local models, call connectors, create automations, mutate files, mutate memory, or store credentials."
      language={model.language}
      markers={[...LIVE_BACKEND_BOUNDARY_INVENTORY_MARKERS]}
      links={[
        { href: "/provider-execution-boundary-readiness-review", label: "Provider boundary" },
        { href: "/local-model-execution-boundary-readiness-review", label: "Local model boundary" },
        { href: "/connector-execution-boundary-readiness-review", label: "Connector boundary" },
        { href: "/automation-execution-boundary-readiness-review", label: "Automation boundary" },
      ]}
      cards={cards}
      advancedSummary="Advanced live backend boundary inventory details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.inventories.map((inventory) => inventory.advancedLiveBackendBoundaryInventoryDetails)}
      advancedCopy="advanced live backend boundary inventory details collapsed/secondary. This route remains review-only and approval required. It never executes boundary probes, calls backends, claims live execution works, executes workflows, calls providers, calls local models, calls local bridge endpoints, calls connectors, creates automations, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="live-backend-boundary-inventory buildLiveBackendBoundaryInventoryStableKey LiveBackendBoundaryInventoryPanel"
    />
  );
}
