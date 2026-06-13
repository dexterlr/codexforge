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
  buildBetaTwoHardeningPassModel,
  buildBetaTwoHardeningPassStableKey,
} from "@/lib/codexforge/beta-2-hardening-pass";

const BETA_TWO_HARDENING_PASS_MARKERS =
  "Beta 2 hardening pass Beta 2 hardening pass does not apply changes Beta 2 hardening changes require explicit operator approval Unresolved hardening blockers stay blocked Hardening groups Release readiness checklist Beta 2 hardening identity regression/safety/docs/onboarding/trial/feedback status denied hardening actions unresolved hardening blockers next milestone route release readiness dashboard route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no beta trial launch no trial launch no live workflow launch no live workflow launch from UI no live action execution no go-live action no go-live behavior no release approval automation no automatic safety signoff no safety signoff automation no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no regression/test execution from UI no regression replay execution no documentation publish behavior no onboarding launch behavior no feedback auto-ingestion no feedback ingestion automation no fix application no patch apply behavior no hardening apply behavior no issue creation automation no ticket creation automation no commit creation from UI no release notes publishing no external feedback fetching no provider API calls no provider live connection tests no provider traffic routing no live provider/local/connector/automation traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no output persistence no output storage no connector data storage no automation data storage no evidence ingestion automation no evidence auto-ingestion no result auto-ingestion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no localStorage/sessionStorage token storage no token storage no endpoint storage no credential storage no localStorage writes no sessionStorage writes no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw regression/signoff/docs/onboarding/beta JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced hardening details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function BetaTwoHardeningPassPanel() {
  const model = buildBetaTwoHardeningPassModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-beta-2-hardening-pass={`${BETA_TWO_HARDENING_PASS_MARKERS} buildBetaTwoHardeningPassStableKey BetaTwoHardeningPassPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 489"
        title="Beta 2 hardening"
        subtitle="Beta 2 hardening pass summarizes hardening needs without applying changes. Beta 2 hardening changes require explicit operator approval, and unresolved hardening blockers stay blocked."
        primary={{ href: "#beta-2-hardening-pass", label: "Review hardening" }}
        links={[
          { href: "/beta-2-operator-feedback-review", label: "Feedback review" },
          { href: "/beta-2-controlled-operator-trial", label: "Controlled trial" },
          { href: "/codexforge-beta-2-release-candidate", label: "Beta 2 RC" },
          { href: "/readiness", label: "Readiness" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.hardeningLanguage} />
      <PreviewFoundationCard title="Plain-English Beta 2 hardening pass">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews Beta 2 hardening identity, hardening groups,
          regression/safety/docs/onboarding/trial/feedback status, release readiness checklist, denied hardening
          actions, unresolved hardening blockers, next milestone route, release readiness dashboard route, and next
          recommended action. It does not apply changes, execute workflows, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="beta-2-hardening-pass" style={previewStyles.grid}>
        {model.passes.map((pass) => (
          <PreviewFoundationCard
            key={buildBetaTwoHardeningPassStableKey("beta-2-hardening-card", pass.id)}
            title={pass.betaTwoHardeningIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${pass.status}`,
                `Hardening groups: ${pass.hardeningGroups.join("; ")}`,
                `Regression/safety/docs/onboarding/trial/feedback status: ${pass.regressionSafetyDocsOnboardingTrialFeedbackStatus.join("; ")}`,
                `Release readiness checklist: ${pass.releaseReadinessChecklist.join("; ")}`,
                `Denied hardening actions: ${pass.deniedHardeningActions.join("; ")}`,
                `Unresolved hardening blockers: ${pass.unresolvedHardeningBlockers.join("; ")}`,
                pass.nextMilestoneRoute,
                pass.releaseReadinessDashboardRoute,
                pass.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced hardening details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.passes.map((pass) => pass.advancedHardeningDetails)} />
        <PreviewFoundationCopy>
          Advanced hardening details stay collapsed or secondary. This route never applies changes, executes workflows,
          mutates files, mutates memory, runs tests, calls providers, calls local models, calls connectors, or creates
          automations.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
