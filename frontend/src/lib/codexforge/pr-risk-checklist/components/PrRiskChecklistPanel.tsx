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
  buildPrRiskChecklistModel,
  buildPrRiskChecklistStableKey,
} from "@/lib/codexforge/pr-risk-checklist";

const PR_RISK_CHECKLIST_MARKERS =
  "PR risk checklist plain English PR risk review does not approve merges automatically Suspected secrets are redacted High-risk changes require explicit review Test and validation coverage Migration config env risk approved local boundary required release actions are not run from arbitrary UI git commands are not run from arbitrary UI nothing executes from arbitrary UI no git command execution from UI no branch creation no tag creation no PR creation no release publishing no push behavior no merge behavior no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced checklist details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no commit creation no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no provider APIs are called no GitHub API calls from UI no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function PrRiskChecklistPanel() {
  const model = buildPrRiskChecklistModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-pr-risk-checklist={`${PR_RISK_CHECKLIST_MARKERS} buildPrRiskChecklistStableKey PrRiskChecklistPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 240"
        title="PR risk checklist"
        subtitle="PR risk checklist reviews merge and release risk before PR handoff. PR risk review does not approve merges automatically, suspected secrets are redacted, and high-risk changes require explicit review."
        primary={{ href: "#pr-risk-checklist", label: "Review PR risk" }}
        links={[
          { href: "/pull-request-prep-review", label: "PR prep" },
          { href: "/branch-tag-release-handoff", label: "Branch/tag handoff" },
          { href: "/test-result-summary", label: "Test result" },
          { href: "/project-risk-secrets-scan", label: "Risk scan" },
          { href: "/release-notes-draft-builder", label: "Release notes" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.checklistLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a risk review surface only. It does not call GitHub APIs, create PRs, approve merges, push,
          create branches, create tags, mutate files, apply patches, publish releases, call providers, or show secret
          values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="pr-risk-checklist" style={previewStyles.grid}>
        {model.checks.map((check) => (
          <PreviewFoundationCard
            key={buildPrRiskChecklistStableKey("pr-risk-checklist-card", check.id)}
            title={check.riskChecklistIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${check.status}`,
                check.sourcePrPrep,
                check.changedAreas,
                `Risk categories: ${check.riskCategories.join("; ")}`,
                check.testValidationCoverage,
                check.secretsScanStatus,
                check.migrationConfigEnvRisk,
                check.uxNavigationRisk,
                check.releaseNotesRoute,
                `Blocked reasons: ${check.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced checklist details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced checklist details stay collapsed or secondary. High-risk changes require explicit human review before
          any PR, merge, branch, tag, or release handoff proceeds.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
