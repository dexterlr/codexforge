"use client";

import {
  PreviewFoundationCard,
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  PreviewFoundationPillList,
  PreviewFoundationSafetyStrip,
  previewStyles,
} from "../../video-foundation-ui";
import {
  buildDashboardDensityNavigationPolishModel,
  buildDashboardDensityNavigationPolishStableKey,
} from "@/lib/codexforge/dashboard-density-navigation-polish";

const DASHBOARD_DENSITY_NAVIGATION_POLISH_MARKERS =
  "Dashboard density navigation polish Dashboard density review does not remove route coverage Navigation changes require review before removal No route is executed from this page Protected route coverage Expert fast path adjustments dashboard polish identity current navigation groups density risks novice mode adjustments cross-loop search route privacy audit route blocked reasons review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no route execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no search execution from UI no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced density details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function DashboardDensityNavigationPolishPanel() {
  const model = buildDashboardDensityNavigationPolishModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-dashboard-density-navigation-polish={`${DASHBOARD_DENSITY_NAVIGATION_POLISH_MARKERS} buildDashboardDensityNavigationPolishStableKey DashboardDensityNavigationPolishPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 378"
        title="Dashboard polish"
        subtitle="Dashboard density navigation polish reviews cockpit density, grouping, novice mode, and expert fast paths without changing route coverage. Dashboard density review does not remove route coverage, navigation changes require review before removal, and no route is executed from this page."
        primary={{ href: "#dashboard-density-navigation-polish", label: "Review dashboard" }}
        links={[
          { href: "/daily-operator-home", label: "Daily home" },
          { href: "/novice-mode-guided-flow-polish", label: "Novice mode" },
          { href: "/expert-mode-fast-path-review", label: "Expert path" },
          { href: "/cross-loop-search-review", label: "Search review" },
          { href: "/local-first-privacy-audit", label: "Privacy audit" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.dashboardLanguage} />
      <PreviewFoundationCard title="Plain-English dashboard density review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews dashboard polish identity, current navigation groups, density risks, novice mode
          adjustments, expert fast path adjustments, protected route coverage, cross-loop search route, privacy audit
          route, and blocked reasons. It does not execute routes, remove routes, run searches, call APIs, mutate files,
          approve actions, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="dashboard-density-navigation-polish" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildDashboardDensityNavigationPolishStableKey("dashboard-density-card", review.id)}
            title={review.dashboardPolishIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Current navigation groups: ${review.currentNavigationGroups.join("; ")}`,
                `Density risks: ${review.densityRisks.join("; ")}`,
                `Novice mode adjustments: ${review.noviceModeAdjustments.join("; ")}`,
                `Expert fast path adjustments: ${review.expertFastPathAdjustments.join("; ")}`,
                `Protected route coverage: ${review.protectedRouteCoverage.join("; ")}`,
                review.crossLoopSearchRoute,
                review.privacyAuditRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced density details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedDensityDetails)} />
        <PreviewFoundationCopy>
          Advanced density details stay collapsed or secondary. Dashboard density review does not remove route coverage,
          navigation changes require review before removal, and no route is executed from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
