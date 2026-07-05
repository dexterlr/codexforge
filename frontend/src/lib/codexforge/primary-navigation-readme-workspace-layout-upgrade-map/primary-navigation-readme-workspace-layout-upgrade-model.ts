export const PRIMARY_NAVIGATION_README_WORKSPACE_LAYOUT_UPGRADE_SHARED_MARKERS = [
  "3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade",
  "CodexForge Primary Navigation, README, and Workspace Layout Upgrade",
  "god-tier product shell consolidation",
  "primary navigation product areas",
  "Home / Operator Cockpit",
  "Generate",
  "Projects",
  "Assets",
  "Providers",
  "Workflows",
  "Trading",
  "Audit / Runs",
  "Settings / Safety",
  "Developer / Checkpoints",
  "user action first",
  "safety state second",
  "evidence audit third",
  "technical implementation details last",
  "generation chat box appears first on generation pages",
  "approval state appears above technical metadata",
  "output preview appears above technical checkpoint details",
  "phase checkpoint routes remain preserved",
  "phase checkpoint routes do not dominate primary navigation",
  "README explains current live readiness status",
  "README explains provider key never exposed to frontend",
  "README explains first live text provider bridge",
  "Return OK and the approved dry-run id.",
  "next likely batch: 3242-3273 - First Live Image Provider Call Backend Bridge",
  "First Live Text Provider Call Backend Bridge is the latest completed provider bridge after batch 3178-3209",
  "live provider execution remains tightly controlled",
  "provider keys must never be exposed to frontend",
  "flat route slugs only",
  "no nested /codexforge routes for this batch",
  "smoke scripts live directly under scripts",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no frontend provider key reads",
  "no credentials exposed",
  "no secrets stored",
  "no browser storage for secrets",
  "no fetch/network calls",
  "no frontend service creation",
  "no API creation from frontend",
  "no worker execution",
  "no render/export/publish execution"
] as const;

export const PRIMARY_NAVIGATION_PRODUCT_AREA_LABELS = [
  "Home / Operator Cockpit",
  "Generate",
  "Projects",
  "Assets",
  "Providers",
  "Workflows",
  "Trading",
  "Audit / Runs",
  "Settings / Safety",
  "Developer / Checkpoints"
] as const;

export const PRIMARY_NAVIGATION_LAYOUT_ORDER = [
  "user action first",
  "safety state second",
  "evidence audit third",
  "technical implementation details last"
] as const;

const PRIMARY_NAVIGATION_README_WORKSPACE_LAYOUT_UPGRADE_ROUTE_SPECS = [
  [3210, "primary-navigation-upgrade-boundary-wiring", "Primary Navigation Upgrade Boundary Wiring", "god-tier product shell consolidation boundary wiring"],
  [3211, "primary-navigation-product-areas-wiring", "Primary Navigation Product Areas Wiring", "primary navigation product areas"],
  [3212, "primary-navigation-operator-cockpit-wiring", "Primary Navigation Operator Cockpit Wiring", "Home / Operator Cockpit"],
  [3213, "primary-navigation-generate-area-wiring", "Primary Navigation Generate Area Wiring", "Generate"],
  [3214, "primary-navigation-projects-area-wiring", "Primary Navigation Projects Area Wiring", "Projects"],
  [3215, "primary-navigation-assets-area-wiring", "Primary Navigation Assets Area Wiring", "Assets"],
  [3216, "primary-navigation-providers-area-wiring", "Primary Navigation Providers Area Wiring", "Providers"],
  [3217, "primary-navigation-workflows-area-wiring", "Primary Navigation Workflows Area Wiring", "Workflows"],
  [3218, "primary-navigation-trading-area-wiring", "Primary Navigation Trading Area Wiring", "Trading"],
  [3219, "primary-navigation-audit-runs-area-wiring", "Primary Navigation Audit Runs Area Wiring", "Audit / Runs"],
  [3220, "primary-navigation-settings-safety-area-wiring", "Primary Navigation Settings Safety Area Wiring", "Settings / Safety"],
  [3221, "primary-navigation-developer-checkpoints-area-wiring", "Primary Navigation Developer Checkpoints Area Wiring", "Developer / Checkpoints"],
  [3222, "workspace-layout-action-first-wiring", "Workspace Layout Action First Wiring", "user action first"],
  [3223, "workspace-layout-generation-chat-first-wiring", "Workspace Layout Generation Chat First Wiring", "generation chat box appears first on generation pages"],
  [3224, "workspace-layout-approval-state-wiring", "Workspace Layout Approval State Wiring", "approval state appears above technical metadata"],
  [3225, "workspace-layout-output-preview-wiring", "Workspace Layout Output Preview Wiring", "output preview appears above technical checkpoint details"],
  [3226, "workspace-layout-safety-audit-panel-wiring", "Workspace Layout Safety Audit Panel Wiring", "safety state second and evidence audit third"],
  [3227, "workspace-layout-technical-details-lower-wiring", "Workspace Layout Technical Details Lower Wiring", "technical implementation details last"],
  [3228, "readme-god-tier-project-overview-wiring", "README God Tier Project Overview Wiring", "README explains CodexForge operator cockpit"],
  [3229, "readme-current-status-wiring", "README Current Status Wiring", "README explains current live readiness status"],
  [3230, "readme-live-readiness-boundary-wiring", "README Live Readiness Boundary Wiring", "README explains provider key never exposed to frontend"],
  [3231, "readme-roadmap-next-steps-wiring", "README Roadmap Next Steps Wiring", "next likely batch: 3242-3273 - First Live Image Provider Call Backend Bridge"],
  [3232, "docs-handoff-god-tier-update-wiring", "Docs Handoff God Tier Update Wiring", "handoff docs updated"],
  [3233, "docs-checkpoint-history-preservation-wiring", "Docs Checkpoint History Preservation Wiring", "phase checkpoint routes remain preserved"],
  [3234, "docs-operator-runbook-update-wiring", "Docs Operator Runbook Update Wiring", "operator runbook updated"],
  [3235, "docs-developer-runbook-update-wiring", "Docs Developer Runbook Update Wiring", "developer runbook updated"],
  [3236, "docs-safety-boundary-summary-wiring", "Docs Safety Boundary Summary Wiring", "safety boundary summary updated"],
  [3237, "docs-live-provider-bridge-summary-wiring", "Docs Live Provider Bridge Summary Wiring", "README explains first live text provider bridge"],
  [3238, "docs-navigation-model-summary-wiring", "Docs Navigation Model Summary Wiring", "phase checkpoint routes do not dominate primary navigation"],
  [3239, "docs-next-session-resume-point-wiring", "Docs Next Session Resume Point Wiring", "next session resume point"],
  [3240, "product-shell-readiness-gate-wiring", "Product Shell Readiness Gate Wiring", "product shell readiness gate"],
  [3241, "primary-navigation-readme-workspace-layout-upgrade-completion", "Primary Navigation README Workspace Layout Upgrade Completion", "CodexForge Primary Navigation README and Workspace Layout Upgrade"],
] as const;

type PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSpec = (typeof PRIMARY_NAVIGATION_README_WORKSPACE_LAYOUT_UPGRADE_ROUTE_SPECS)[number];
export type PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSlug = PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSpec[1];
type PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteTitle = PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSpec[2];
type PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteFocus = PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSpec[3];
type PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteHref = `/${PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSlug}`;

function buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary(title: PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteTitle) {
  return title + " is part of the 3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade. CodexForge is an operator cockpit for controlled AI/video/workflow/trading development. This god-tier product shell consolidation keeps primary navigation product areas visible, keeps phase checkpoint routes preserved but secondary, and keeps live provider execution tightly controlled. First Live Text Provider Call Backend Bridge remains the latest completed provider bridge after batch 3178-3209; provider keys must never be exposed to frontend; the first live text provider call remains limited to one harmless approved prompt: Return OK and the approved dry-run id. Next likely batch: 3242-3273 - First Live Image Provider Call Backend Bridge.";
}

function buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(
  phase: PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSpec[0],
  title: PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteTitle,
  slug: PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSlug,
  href: PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteHref,
  focus: PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteFocus
) {
  return [
    String(phase) + " " + title,
    slug,
    href,
    title,
    focus,
    title + " keeps CodexForge Primary Navigation, README, and Workspace Layout Upgrade as god-tier product shell consolidation",
    title + " keeps primary navigation product areas: Home / Operator Cockpit, Generate, Projects, Assets, Providers, Workflows, Trading, Audit / Runs, Settings / Safety, and Developer / Checkpoints",
    title + " keeps user action first, safety state second, evidence audit third, and technical implementation details last",
    title + " keeps generation chat box appears first on generation pages, approval state appears above technical metadata, and output preview appears above technical checkpoint details",
    title + " keeps phase checkpoint routes remain preserved and phase checkpoint routes do not dominate primary navigation",
    title + " keeps README explains current live readiness status, README explains provider key never exposed to frontend, README explains first live text provider bridge, Return OK and the approved dry-run id., and next likely batch: 3242-3273 - First Live Image Provider Call Backend Bridge",
    title + " keeps no live provider calls, no model calls, no prompt sending, no streaming, no provider SDK imports, no frontend provider key reads, no credentials exposed, no secrets stored, no browser storage for secrets, no fetch/network calls, no frontend service creation, no API creation from frontend, no worker execution, and no render/export/publish execution"
  ] as const;
}

export const PRIMARY_NAVIGATION_README_WORKSPACE_LAYOUT_UPGRADE_ROUTES = [
  { slug: "primary-navigation-upgrade-boundary-wiring", href: "/primary-navigation-upgrade-boundary-wiring", phase: "Phase 3210", phaseNumber: 3210, title: "Primary Navigation Upgrade Boundary Wiring", commandLabel: "Go to Primary Navigation Upgrade Boundary Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Primary Navigation Upgrade Boundary Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3210, "Primary Navigation Upgrade Boundary Wiring", "primary-navigation-upgrade-boundary-wiring", "/primary-navigation-upgrade-boundary-wiring", "god-tier product shell consolidation boundary wiring") },
  { slug: "primary-navigation-product-areas-wiring", href: "/primary-navigation-product-areas-wiring", phase: "Phase 3211", phaseNumber: 3211, title: "Primary Navigation Product Areas Wiring", commandLabel: "Go to Primary Navigation Product Areas Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Primary Navigation Product Areas Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3211, "Primary Navigation Product Areas Wiring", "primary-navigation-product-areas-wiring", "/primary-navigation-product-areas-wiring", "primary navigation product areas") },
  { slug: "primary-navigation-operator-cockpit-wiring", href: "/primary-navigation-operator-cockpit-wiring", phase: "Phase 3212", phaseNumber: 3212, title: "Primary Navigation Operator Cockpit Wiring", commandLabel: "Go to Primary Navigation Operator Cockpit Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Primary Navigation Operator Cockpit Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3212, "Primary Navigation Operator Cockpit Wiring", "primary-navigation-operator-cockpit-wiring", "/primary-navigation-operator-cockpit-wiring", "Home / Operator Cockpit") },
  { slug: "primary-navigation-generate-area-wiring", href: "/primary-navigation-generate-area-wiring", phase: "Phase 3213", phaseNumber: 3213, title: "Primary Navigation Generate Area Wiring", commandLabel: "Go to Primary Navigation Generate Area Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Primary Navigation Generate Area Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3213, "Primary Navigation Generate Area Wiring", "primary-navigation-generate-area-wiring", "/primary-navigation-generate-area-wiring", "Generate") },
  { slug: "primary-navigation-projects-area-wiring", href: "/primary-navigation-projects-area-wiring", phase: "Phase 3214", phaseNumber: 3214, title: "Primary Navigation Projects Area Wiring", commandLabel: "Go to Primary Navigation Projects Area Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Primary Navigation Projects Area Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3214, "Primary Navigation Projects Area Wiring", "primary-navigation-projects-area-wiring", "/primary-navigation-projects-area-wiring", "Projects") },
  { slug: "primary-navigation-assets-area-wiring", href: "/primary-navigation-assets-area-wiring", phase: "Phase 3215", phaseNumber: 3215, title: "Primary Navigation Assets Area Wiring", commandLabel: "Go to Primary Navigation Assets Area Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Primary Navigation Assets Area Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3215, "Primary Navigation Assets Area Wiring", "primary-navigation-assets-area-wiring", "/primary-navigation-assets-area-wiring", "Assets") },
  { slug: "primary-navigation-providers-area-wiring", href: "/primary-navigation-providers-area-wiring", phase: "Phase 3216", phaseNumber: 3216, title: "Primary Navigation Providers Area Wiring", commandLabel: "Go to Primary Navigation Providers Area Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Primary Navigation Providers Area Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3216, "Primary Navigation Providers Area Wiring", "primary-navigation-providers-area-wiring", "/primary-navigation-providers-area-wiring", "Providers") },
  { slug: "primary-navigation-workflows-area-wiring", href: "/primary-navigation-workflows-area-wiring", phase: "Phase 3217", phaseNumber: 3217, title: "Primary Navigation Workflows Area Wiring", commandLabel: "Go to Primary Navigation Workflows Area Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Primary Navigation Workflows Area Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3217, "Primary Navigation Workflows Area Wiring", "primary-navigation-workflows-area-wiring", "/primary-navigation-workflows-area-wiring", "Workflows") },
  { slug: "primary-navigation-trading-area-wiring", href: "/primary-navigation-trading-area-wiring", phase: "Phase 3218", phaseNumber: 3218, title: "Primary Navigation Trading Area Wiring", commandLabel: "Go to Primary Navigation Trading Area Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Primary Navigation Trading Area Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3218, "Primary Navigation Trading Area Wiring", "primary-navigation-trading-area-wiring", "/primary-navigation-trading-area-wiring", "Trading") },
  { slug: "primary-navigation-audit-runs-area-wiring", href: "/primary-navigation-audit-runs-area-wiring", phase: "Phase 3219", phaseNumber: 3219, title: "Primary Navigation Audit Runs Area Wiring", commandLabel: "Go to Primary Navigation Audit Runs Area Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Primary Navigation Audit Runs Area Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3219, "Primary Navigation Audit Runs Area Wiring", "primary-navigation-audit-runs-area-wiring", "/primary-navigation-audit-runs-area-wiring", "Audit / Runs") },
  { slug: "primary-navigation-settings-safety-area-wiring", href: "/primary-navigation-settings-safety-area-wiring", phase: "Phase 3220", phaseNumber: 3220, title: "Primary Navigation Settings Safety Area Wiring", commandLabel: "Go to Primary Navigation Settings Safety Area Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Primary Navigation Settings Safety Area Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3220, "Primary Navigation Settings Safety Area Wiring", "primary-navigation-settings-safety-area-wiring", "/primary-navigation-settings-safety-area-wiring", "Settings / Safety") },
  { slug: "primary-navigation-developer-checkpoints-area-wiring", href: "/primary-navigation-developer-checkpoints-area-wiring", phase: "Phase 3221", phaseNumber: 3221, title: "Primary Navigation Developer Checkpoints Area Wiring", commandLabel: "Go to Primary Navigation Developer Checkpoints Area Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Primary Navigation Developer Checkpoints Area Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3221, "Primary Navigation Developer Checkpoints Area Wiring", "primary-navigation-developer-checkpoints-area-wiring", "/primary-navigation-developer-checkpoints-area-wiring", "Developer / Checkpoints") },
  { slug: "workspace-layout-action-first-wiring", href: "/workspace-layout-action-first-wiring", phase: "Phase 3222", phaseNumber: 3222, title: "Workspace Layout Action First Wiring", commandLabel: "Go to Workspace Layout Action First Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Workspace Layout Action First Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3222, "Workspace Layout Action First Wiring", "workspace-layout-action-first-wiring", "/workspace-layout-action-first-wiring", "user action first") },
  { slug: "workspace-layout-generation-chat-first-wiring", href: "/workspace-layout-generation-chat-first-wiring", phase: "Phase 3223", phaseNumber: 3223, title: "Workspace Layout Generation Chat First Wiring", commandLabel: "Go to Workspace Layout Generation Chat First Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Workspace Layout Generation Chat First Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3223, "Workspace Layout Generation Chat First Wiring", "workspace-layout-generation-chat-first-wiring", "/workspace-layout-generation-chat-first-wiring", "generation chat box appears first on generation pages") },
  { slug: "workspace-layout-approval-state-wiring", href: "/workspace-layout-approval-state-wiring", phase: "Phase 3224", phaseNumber: 3224, title: "Workspace Layout Approval State Wiring", commandLabel: "Go to Workspace Layout Approval State Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Workspace Layout Approval State Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3224, "Workspace Layout Approval State Wiring", "workspace-layout-approval-state-wiring", "/workspace-layout-approval-state-wiring", "approval state appears above technical metadata") },
  { slug: "workspace-layout-output-preview-wiring", href: "/workspace-layout-output-preview-wiring", phase: "Phase 3225", phaseNumber: 3225, title: "Workspace Layout Output Preview Wiring", commandLabel: "Go to Workspace Layout Output Preview Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Workspace Layout Output Preview Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3225, "Workspace Layout Output Preview Wiring", "workspace-layout-output-preview-wiring", "/workspace-layout-output-preview-wiring", "output preview appears above technical checkpoint details") },
  { slug: "workspace-layout-safety-audit-panel-wiring", href: "/workspace-layout-safety-audit-panel-wiring", phase: "Phase 3226", phaseNumber: 3226, title: "Workspace Layout Safety Audit Panel Wiring", commandLabel: "Go to Workspace Layout Safety Audit Panel Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Workspace Layout Safety Audit Panel Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3226, "Workspace Layout Safety Audit Panel Wiring", "workspace-layout-safety-audit-panel-wiring", "/workspace-layout-safety-audit-panel-wiring", "safety state second and evidence audit third") },
  { slug: "workspace-layout-technical-details-lower-wiring", href: "/workspace-layout-technical-details-lower-wiring", phase: "Phase 3227", phaseNumber: 3227, title: "Workspace Layout Technical Details Lower Wiring", commandLabel: "Go to Workspace Layout Technical Details Lower Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Workspace Layout Technical Details Lower Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3227, "Workspace Layout Technical Details Lower Wiring", "workspace-layout-technical-details-lower-wiring", "/workspace-layout-technical-details-lower-wiring", "technical implementation details last") },
  { slug: "readme-god-tier-project-overview-wiring", href: "/readme-god-tier-project-overview-wiring", phase: "Phase 3228", phaseNumber: 3228, title: "README God Tier Project Overview Wiring", commandLabel: "Go to README God Tier Project Overview Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("README God Tier Project Overview Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3228, "README God Tier Project Overview Wiring", "readme-god-tier-project-overview-wiring", "/readme-god-tier-project-overview-wiring", "README explains CodexForge operator cockpit") },
  { slug: "readme-current-status-wiring", href: "/readme-current-status-wiring", phase: "Phase 3229", phaseNumber: 3229, title: "README Current Status Wiring", commandLabel: "Go to README Current Status Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("README Current Status Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3229, "README Current Status Wiring", "readme-current-status-wiring", "/readme-current-status-wiring", "README explains current live readiness status") },
  { slug: "readme-live-readiness-boundary-wiring", href: "/readme-live-readiness-boundary-wiring", phase: "Phase 3230", phaseNumber: 3230, title: "README Live Readiness Boundary Wiring", commandLabel: "Go to README Live Readiness Boundary Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("README Live Readiness Boundary Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3230, "README Live Readiness Boundary Wiring", "readme-live-readiness-boundary-wiring", "/readme-live-readiness-boundary-wiring", "README explains provider key never exposed to frontend") },
  { slug: "readme-roadmap-next-steps-wiring", href: "/readme-roadmap-next-steps-wiring", phase: "Phase 3231", phaseNumber: 3231, title: "README Roadmap Next Steps Wiring", commandLabel: "Go to README Roadmap Next Steps Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("README Roadmap Next Steps Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3231, "README Roadmap Next Steps Wiring", "readme-roadmap-next-steps-wiring", "/readme-roadmap-next-steps-wiring", "next likely batch: 3242-3273 - First Live Image Provider Call Backend Bridge") },
  { slug: "docs-handoff-god-tier-update-wiring", href: "/docs-handoff-god-tier-update-wiring", phase: "Phase 3232", phaseNumber: 3232, title: "Docs Handoff God Tier Update Wiring", commandLabel: "Go to Docs Handoff God Tier Update Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Docs Handoff God Tier Update Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3232, "Docs Handoff God Tier Update Wiring", "docs-handoff-god-tier-update-wiring", "/docs-handoff-god-tier-update-wiring", "handoff docs updated") },
  { slug: "docs-checkpoint-history-preservation-wiring", href: "/docs-checkpoint-history-preservation-wiring", phase: "Phase 3233", phaseNumber: 3233, title: "Docs Checkpoint History Preservation Wiring", commandLabel: "Go to Docs Checkpoint History Preservation Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Docs Checkpoint History Preservation Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3233, "Docs Checkpoint History Preservation Wiring", "docs-checkpoint-history-preservation-wiring", "/docs-checkpoint-history-preservation-wiring", "phase checkpoint routes remain preserved") },
  { slug: "docs-operator-runbook-update-wiring", href: "/docs-operator-runbook-update-wiring", phase: "Phase 3234", phaseNumber: 3234, title: "Docs Operator Runbook Update Wiring", commandLabel: "Go to Docs Operator Runbook Update Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Docs Operator Runbook Update Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3234, "Docs Operator Runbook Update Wiring", "docs-operator-runbook-update-wiring", "/docs-operator-runbook-update-wiring", "operator runbook updated") },
  { slug: "docs-developer-runbook-update-wiring", href: "/docs-developer-runbook-update-wiring", phase: "Phase 3235", phaseNumber: 3235, title: "Docs Developer Runbook Update Wiring", commandLabel: "Go to Docs Developer Runbook Update Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Docs Developer Runbook Update Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3235, "Docs Developer Runbook Update Wiring", "docs-developer-runbook-update-wiring", "/docs-developer-runbook-update-wiring", "developer runbook updated") },
  { slug: "docs-safety-boundary-summary-wiring", href: "/docs-safety-boundary-summary-wiring", phase: "Phase 3236", phaseNumber: 3236, title: "Docs Safety Boundary Summary Wiring", commandLabel: "Go to Docs Safety Boundary Summary Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Docs Safety Boundary Summary Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3236, "Docs Safety Boundary Summary Wiring", "docs-safety-boundary-summary-wiring", "/docs-safety-boundary-summary-wiring", "safety boundary summary updated") },
  { slug: "docs-live-provider-bridge-summary-wiring", href: "/docs-live-provider-bridge-summary-wiring", phase: "Phase 3237", phaseNumber: 3237, title: "Docs Live Provider Bridge Summary Wiring", commandLabel: "Go to Docs Live Provider Bridge Summary Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Docs Live Provider Bridge Summary Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3237, "Docs Live Provider Bridge Summary Wiring", "docs-live-provider-bridge-summary-wiring", "/docs-live-provider-bridge-summary-wiring", "README explains first live text provider bridge") },
  { slug: "docs-navigation-model-summary-wiring", href: "/docs-navigation-model-summary-wiring", phase: "Phase 3238", phaseNumber: 3238, title: "Docs Navigation Model Summary Wiring", commandLabel: "Go to Docs Navigation Model Summary Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Docs Navigation Model Summary Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3238, "Docs Navigation Model Summary Wiring", "docs-navigation-model-summary-wiring", "/docs-navigation-model-summary-wiring", "phase checkpoint routes do not dominate primary navigation") },
  { slug: "docs-next-session-resume-point-wiring", href: "/docs-next-session-resume-point-wiring", phase: "Phase 3239", phaseNumber: 3239, title: "Docs Next Session Resume Point Wiring", commandLabel: "Go to Docs Next Session Resume Point Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Docs Next Session Resume Point Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3239, "Docs Next Session Resume Point Wiring", "docs-next-session-resume-point-wiring", "/docs-next-session-resume-point-wiring", "next session resume point") },
  { slug: "product-shell-readiness-gate-wiring", href: "/product-shell-readiness-gate-wiring", phase: "Phase 3240", phaseNumber: 3240, title: "Product Shell Readiness Gate Wiring", commandLabel: "Go to Product Shell Readiness Gate Wiring", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Product Shell Readiness Gate Wiring"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3240, "Product Shell Readiness Gate Wiring", "product-shell-readiness-gate-wiring", "/product-shell-readiness-gate-wiring", "product shell readiness gate") },
  { slug: "primary-navigation-readme-workspace-layout-upgrade-completion", href: "/primary-navigation-readme-workspace-layout-upgrade-completion", phase: "Phase 3241", phaseNumber: 3241, title: "Primary Navigation README Workspace Layout Upgrade Completion", commandLabel: "Go to Primary Navigation README Workspace Layout Upgrade Completion", summary: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSummary("Primary Navigation README Workspace Layout Upgrade Completion"), markerPhrases: buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteMarkers(3241, "Primary Navigation README Workspace Layout Upgrade Completion", "primary-navigation-readme-workspace-layout-upgrade-completion", "/primary-navigation-readme-workspace-layout-upgrade-completion", "CodexForge Primary Navigation README and Workspace Layout Upgrade") },
] as const;

export type PrimaryNavigationReadmeWorkspaceLayoutUpgradeRoute = (typeof PRIMARY_NAVIGATION_README_WORKSPACE_LAYOUT_UPGRADE_ROUTES)[number];

export const PRIMARY_NAVIGATION_ACTION_ITEMS = [
  "Open Home / Operator Cockpit for the operator overview",
  "Use Generate for request drafting and review-only generation planning",
  "Review Projects and Assets before provider or workflow decisions",
  "Check Providers and Workflows for readiness, approval, and recent results",
  "Use Trading for research, thesis, watchlist, risk, and paper-review surfaces",
  "Use Audit / Runs for evidence, run history, and redaction state",
  "Use Settings / Safety for blocked state, policy, and guardrails",
  "Use Developer / Checkpoints for historical phase routes and smoke coverage"
] as const;

export const PRIMARY_NAVIGATION_READINESS_ITEMS = [
  "First Live Text Provider Call Backend Bridge is the latest completed provider bridge after batch 3178-3209",
  "live provider execution remains tightly controlled",
  "provider keys must never be exposed to frontend",
  "first live text provider call remains limited to Return OK and the approved dry-run id.",
  "phase checkpoint routes remain preserved",
  "phase checkpoint routes do not dominate primary navigation"
] as const;

export const PRIMARY_NAVIGATION_DENIED_ITEMS = PRIMARY_NAVIGATION_README_WORKSPACE_LAYOUT_UPGRADE_SHARED_MARKERS.filter((marker) => marker.startsWith("no ") || marker.includes("must never") || marker.includes("tightly controlled"));

export function buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeStableKey(parts: readonly string[]) {
  return parts.join("::");
}

export function buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeModel(routeSlug: PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSlug) {
  const route = PRIMARY_NAVIGATION_README_WORKSPACE_LAYOUT_UPGRADE_ROUTES.find((candidate) => candidate.slug === routeSlug) ?? PRIMARY_NAVIGATION_README_WORKSPACE_LAYOUT_UPGRADE_ROUTES[0];
  return {
    route,
    routes: PRIMARY_NAVIGATION_README_WORKSPACE_LAYOUT_UPGRADE_ROUTES,
    productAreas: PRIMARY_NAVIGATION_PRODUCT_AREA_LABELS,
    layoutOrder: PRIMARY_NAVIGATION_LAYOUT_ORDER,
    actionItems: PRIMARY_NAVIGATION_ACTION_ITEMS,
    readinessItems: PRIMARY_NAVIGATION_READINESS_ITEMS,
    safetyMarkers: PRIMARY_NAVIGATION_README_WORKSPACE_LAYOUT_UPGRADE_SHARED_MARKERS,
    deniedItems: PRIMARY_NAVIGATION_DENIED_ITEMS
  };
}
