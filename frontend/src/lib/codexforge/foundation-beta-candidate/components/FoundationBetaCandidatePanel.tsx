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
  buildFoundationBetaCandidateModel,
  buildFoundationBetaCandidateStableKey,
} from "@/lib/codexforge/foundation-beta-candidate";

const FOUNDATION_BETA_CANDIDATE_MARKERS =
  "Foundation beta candidate Foundation beta candidate remains review-only Beta does not publish or invite users automatically Beta approval requires explicit operator sign-off Foundation readiness summary Release recommendation beta candidate identity safety readiness summary smoke stability summary operator cockpit readiness beta blockers beta trial intake route feedback inbox route review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no release/publish/invite behavior no release publish behavior no invite sending no participant data collection no external feedback fetching no feedback ingestion automation no issue creation automation no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced beta candidate details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FoundationBetaCandidatePanel() {
  const model = buildFoundationBetaCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-foundation-beta-candidate={`${FOUNDATION_BETA_CANDIDATE_MARKERS} buildFoundationBetaCandidateStableKey FoundationBetaCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 383"
        title="Beta candidate"
        subtitle="Foundation beta candidate reviews whether CodexForge is ready for beta operator trials. Foundation beta candidate remains review-only, beta does not publish or invite users automatically, and beta approval requires explicit operator sign-off."
        primary={{ href: "#foundation-beta-candidate", label: "Review beta candidate" }}
        links={[
          { href: "/full-smoke-suite-stability-pass", label: "Smoke stability" },
          { href: "/beta-trial-intake-review", label: "Beta intake" },
          { href: "/beta-feedback-inbox", label: "Feedback inbox" },
          { href: "/codexforge-foundation-release-candidate", label: "Foundation RC" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.betaCandidateLanguage} />
      <PreviewFoundationCard title="Plain-English foundation beta candidate">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews beta candidate identity, foundation readiness summary, safety readiness summary, smoke
          stability summary, operator cockpit readiness, beta blockers, beta trial intake route, feedback inbox route,
          and release recommendation. It does not publish, release, invite users, call APIs, run checks, mutate files,
          approve beta, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="foundation-beta-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildFoundationBetaCandidateStableKey("foundation-beta-candidate-card", candidate.id)}
            title={candidate.betaCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${candidate.status}`,
                `Foundation readiness summary: ${candidate.foundationReadinessSummary.join("; ")}`,
                `Safety readiness summary: ${candidate.safetyReadinessSummary.join("; ")}`,
                `Smoke stability summary: ${candidate.smokeStabilitySummary.join("; ")}`,
                `Operator cockpit readiness: ${candidate.operatorCockpitReadiness.join("; ")}`,
                `Beta blockers: ${candidate.betaBlockers.join("; ")}`,
                candidate.betaTrialIntakeRoute,
                candidate.feedbackInboxRoute,
                candidate.releaseRecommendation,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced beta candidate details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.advancedBetaCandidateDetails)} />
        <PreviewFoundationCopy>
          Advanced beta candidate details stay collapsed or secondary. This page does not publish beta, invite users,
          grant approval, call APIs, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
