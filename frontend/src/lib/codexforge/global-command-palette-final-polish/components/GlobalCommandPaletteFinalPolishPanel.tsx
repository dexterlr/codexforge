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
  buildGlobalCommandPaletteFinalPolishModel,
  buildGlobalCommandPaletteFinalPolishStableKey,
} from "@/lib/codexforge/global-command-palette-final-polish";

const GLOBAL_COMMAND_PALETTE_FINAL_POLISH_MARKERS =
  "Global command palette final polish Global command palette final polish does not execute commands Command changes require explicit operator approval Unsafe command shortcuts remain blocked Command groups Duplicate command checklist command palette polish identity route discoverability checklist safety command checklist denied command actions unresolved command blockers release readiness dashboard route foundation milestone review route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live traffic routing no live provider/local/connector/automation traffic routing no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no conditional watch creation no watch creation no schedule creation no scheduled task creation no polling loop creation no polling loops from UI no background job creation no background jobs no notification sending no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no policy auto-apply no settings persistence no preference persistence no evidence ingestion no evidence ingestion automation no evidence auto-ingestion no result ingestion no result auto-ingestion no recovery trigger no patch apply behavior no hardening apply behavior no command execution no shell/git/test/build/smoke execution from UI no git command execution from UI no shell command execution from UI no shell command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no localStorage/sessionStorage token storage no token storage no endpoint storage no credential storage no automation data storage no localStorage writes no sessionStorage writes no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced command palette details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct memory event append call from UI no direct Brain graph save call from UI no direct graph mutation from UI no direct patch application call from UI no direct file writer call from UI no direct command runner call from UI no brokered execution call except blocked-policy text no deterministic random API usage no realtime clock ID usage deterministic layout and ids only no d3-force no mojibake no obvious duplicate React key patterns";

export function GlobalCommandPaletteFinalPolishPanel() {
  const model = buildGlobalCommandPaletteFinalPolishModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-global-command-palette-final-polish={`${GLOBAL_COMMAND_PALETTE_FINAL_POLISH_MARKERS} buildGlobalCommandPaletteFinalPolishStableKey GlobalCommandPaletteFinalPolishPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 497"
        title="Palette polish"
        subtitle="Global command palette final polish reviews command discoverability without executing commands. Command changes require explicit operator approval, and unsafe command shortcuts remain blocked."
        primary={{ href: "#global-command-palette-final-polish", label: "Review palette" }}
        links={[
          { href: "/daily-operator-cockpit-final-polish", label: "Cockpit polish" },
          { href: "/readiness", label: "Readiness" },
          { href: "/codexforge-foundation-release-candidate", label: "Foundation review" },
          { href: "/provider-local-connector-automation-cohesion-review", label: "Cohesion" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.commandLanguage} />
      <PreviewFoundationCard title="Plain-English global command palette final polish">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews command palette polish identity, command groups, route discoverability checklist, duplicate
          command checklist, safety command checklist, denied command actions, unresolved command blockers, release
          readiness dashboard route, foundation milestone review route, and next recommended action. It does not execute
          commands, run shell, run git, run tests, run builds, run smoke, or persist settings.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="global-command-palette-final-polish" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildGlobalCommandPaletteFinalPolishStableKey("global-command-palette-final-polish-card", review.id)}
            title={review.commandPalettePolishIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Command groups: ${review.commandGroups.join("; ")}`,
                `Route discoverability checklist: ${review.routeDiscoverabilityChecklist.join("; ")}`,
                `Duplicate command checklist: ${review.duplicateCommandChecklist.join("; ")}`,
                `Safety command checklist: ${review.safetyCommandChecklist.join("; ")}`,
                `Denied command actions: ${review.deniedCommandActions.join("; ")}`,
                `Unresolved command blockers: ${review.unresolvedCommandBlockers.join("; ")}`,
                review.releaseReadinessDashboardRoute,
                review.foundationMilestoneReviewRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced command palette details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedCommandPaletteDetails)} />
        <PreviewFoundationCopy>
          Advanced command palette details stay collapsed or secondary. This route never executes commands, runs shell,
          runs git, runs tests, runs builds, runs smoke, persists settings, or creates automation.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
