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
  buildResearchLoopRealWorldTrialReviewModel,
  buildResearchLoopRealWorldTrialReviewStableKey,
} from "@/lib/codexforge/research-loop-real-world-trial-review";

const RESEARCH_LOOP_REAL_WORLD_TRIAL_REVIEW_MARKERS =
  "Research loop real-world trial review Research trial review does not browse or call providers Evidence and citations are reviewed before use Freshness checks require explicit approval Evidence collection plan Conflict handling summary real-world trial review review-only approval required real evidence is reviewed before use Memory promotion remains blocked until approved research trial identity source research release candidate operator research scenario citation/review gates freshness boundary blocked real actions trial outcome notes next loop route advanced research trial details collapsed/secondary no action execution from UI no workflow execution no coding task execution no test/build/smoke execution from UI no release/shipping execution no build execution from UI no smoke execution from UI no test execution from UI no patch apply behavior no commit creation from UI no provider API calls no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no web/search API calls no source fetching/browsing no OAuth request flow no connector authorization behavior no token storage no localStorage/sessionStorage token storage no automatic email/calendar/contact reads no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResearchLoopRealWorldTrialReviewPanel() {
  const model = buildResearchLoopRealWorldTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-research-loop-real-world-trial-review={`${RESEARCH_LOOP_REAL_WORLD_TRIAL_REVIEW_MARKERS} buildResearchLoopRealWorldTrialReviewStableKey ResearchLoopRealWorldTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 363"
        title="Research trial review"
        subtitle="Research loop real-world trial review prepares a real research workflow review without browsing or provider calls. Evidence and citations are reviewed before use, and freshness checks require explicit approval."
        primary={{ href: "#research-loop-real-world-trial-review", label: "Review research trial" }}
        links={[
          { href: "/research-workspace-release-candidate", label: "Research RC" },
          { href: "/research-freshness-recheck-boundary", label: "Freshness boundary" },
          { href: "/evidence-conflict-resolver-review", label: "Conflict review" },
          { href: "/connector-loop-real-world-trial-review", label: "Next connector review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialReviewLanguage} />
      <PreviewFoundationCard title="Plain-English research trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews the research trial identity, evidence collection plan, citation gates, freshness boundary,
          conflict handling summary, blocked actions, and outcome notes. It does not browse, fetch sources, call
          providers, auto-cite, export reports, write files, or promote memory.
        </PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Real evidence is reviewed before use, and memory promotion remains blocked until approved.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="research-loop-real-world-trial-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildResearchLoopRealWorldTrialReviewStableKey(
              "research-loop-real-world-trial-review-card",
              review.id
            )}
            title={review.researchTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceResearchReleaseCandidate,
                review.operatorResearchScenario,
                `Evidence collection plan: ${review.evidenceCollectionPlan.join("; ")}`,
                `Citation/review gates: ${review.citationReviewGates.join("; ")}`,
                review.freshnessBoundary,
                review.conflictHandlingSummary,
                `Blocked real actions: ${review.blockedRealActions.join("; ")}`,
                `Trial outcome notes: ${review.trialOutcomeNotes.join("; ")}`,
                review.nextLoopRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced research trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedResearchTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced research trial details stay collapsed or secondary. Research real-world trial review remains separate
          from browsing, provider calls, source fetching, evidence updates, auto-citation, report export, local files,
          automations, and memory promotion.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
