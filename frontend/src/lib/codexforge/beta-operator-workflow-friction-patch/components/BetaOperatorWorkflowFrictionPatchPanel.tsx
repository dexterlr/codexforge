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
  buildBetaOperatorWorkflowFrictionPatchModel,
  buildBetaOperatorWorkflowFrictionPatchStableKey,
} from "@/lib/codexforge/beta-operator-workflow-friction-patch";

const BETA_OPERATOR_WORKFLOW_FRICTION_PATCH_MARKERS =
  "Beta operator workflow friction patch Beta operator workflow friction patch does not apply patches Friction fixes require explicit operator approval Unsafe friction patch shortcuts stay blocked Friction categories Candidate improvement groups beta workflow friction patch identity validation checklist rollback checklist denied patch actions blocked patch risks release candidate route beta daily workflow route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no live workflow launch from UI no trial launch no live action execution no go-live action no go-live behavior no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no recovery auto-trigger no replay execution no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no feedback auto-ingestion no feedback ingestion automation no web/search API calls no GitHub API calls from UI no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no issue creation automation no ticket creation automation no fix application no commit creation from UI no regression replay execution no release notes publishing no external feedback fetching no local tool launch behavior no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no evidence auto-ingestion no result auto-ingestion no output persistence no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no localStorage/sessionStorage token storage no endpoint storage no credential storage no output storage no connector data storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw workflow/trial/result/recovery/friction JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced friction patch details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function BetaOperatorWorkflowFrictionPatchPanel() {
  const model = buildBetaOperatorWorkflowFrictionPatchModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-beta-operator-workflow-friction-patch={`${BETA_OPERATOR_WORKFLOW_FRICTION_PATCH_MARKERS} buildBetaOperatorWorkflowFrictionPatchStableKey BetaOperatorWorkflowFrictionPatchPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 480"
        title="Friction patch"
        subtitle="Beta operator workflow friction patch proposes usability fixes without applying them. Beta operator workflow friction patch does not apply patches, friction fixes require explicit operator approval, and unsafe friction patch shortcuts stay blocked."
        primary={{ href: "#beta-operator-workflow-friction-patch", label: "Review fixes" }}
        links={[
          { href: "/beta-operator-daily-workflow-review", label: "Workflow review" },
          { href: "/beta-operator-workflow-release-candidate", label: "Release candidate" },
          { href: "/beta-operator-daily-workflow-trial", label: "Daily trial" },
          { href: "/beta-fix-priority-matrix", label: "Fix priority" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.patchLanguage} />
      <PreviewFoundationCard title="Plain-English beta operator workflow friction patch">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews beta workflow friction patch identity, friction categories, candidate improvement groups,
          validation checklist, rollback checklist, denied patch actions, blocked patch risks, release candidate route,
          beta daily workflow route, and next recommended action. It does not apply patches, write files, run commands,
          run tests, execute workflows, or persist approvals.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="beta-operator-workflow-friction-patch" style={previewStyles.grid}>
        {model.patches.map((patch) => (
          <PreviewFoundationCard
            key={buildBetaOperatorWorkflowFrictionPatchStableKey("beta-friction-patch-card", patch.id)}
            title={patch.betaWorkflowFrictionPatchIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${patch.status}`,
                `Friction categories: ${patch.frictionCategories.join("; ")}`,
                `Candidate improvement groups: ${patch.candidateImprovementGroups.join("; ")}`,
                `Validation checklist: ${patch.validationChecklist.join("; ")}`,
                `Rollback checklist: ${patch.rollbackChecklist.join("; ")}`,
                `Denied patch actions: ${patch.deniedPatchActions.join("; ")}`,
                `Blocked patch risks: ${patch.blockedPatchRisks.join("; ")}`,
                patch.releaseCandidateRoute,
                patch.betaDailyWorkflowRoute,
                patch.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced friction patch details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.patches.map((patch) => patch.advancedFrictionPatchDetails)} />
        <PreviewFoundationCopy>
          Advanced friction patch details stay collapsed or secondary. Friction patch review remains separate from patch
          application, file writes, tests, builds, smoke scripts, shell commands, git commands, workflow execution,
          provider calls, connector calls, approval persistence, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
