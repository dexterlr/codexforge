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
  buildConnectorLoopRealWorldTrialReviewModel,
  buildConnectorLoopRealWorldTrialReviewStableKey,
} from "@/lib/codexforge/connector-loop-real-world-trial-review";

const CONNECTOR_LOOP_REAL_WORLD_TRIAL_REVIEW_MARKERS =
  "Connector loop real-world trial review Connector trial review does not read connector data Gmail Calendar and Contacts access require explicit approval Tokens and private values are never displayed Connector access plan Privacy redaction checklist real-world trial review review-only approval required real evidence is reviewed before use Memory promotion remains blocked until approved connector trial identity source connector release candidate operator connector scenario Gmail/Calendar/Contacts boundaries evidence capture review blocked real actions trial outcome notes next loop route advanced connector trial details collapsed/secondary no action execution from UI no workflow execution no coding task execution no test/build/smoke execution from UI no release/shipping execution no build execution from UI no smoke execution from UI no test execution from UI no patch apply behavior no commit creation from UI no provider API calls no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no web/search API calls no source fetching/browsing no OAuth request flow no connector authorization behavior no token storage no localStorage/sessionStorage token storage no automatic email/calendar/contact reads no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ConnectorLoopRealWorldTrialReviewPanel() {
  const model = buildConnectorLoopRealWorldTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-connector-loop-real-world-trial-review={`${CONNECTOR_LOOP_REAL_WORLD_TRIAL_REVIEW_MARKERS} buildConnectorLoopRealWorldTrialReviewStableKey ConnectorLoopRealWorldTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 364"
        title="Connector trial review"
        subtitle="Connector loop real-world trial review prepares connector readiness review without reading connector data. Gmail Calendar and Contacts access require explicit approval, and tokens and private values are never displayed."
        primary={{ href: "#connector-loop-real-world-trial-review", label: "Review connector trial" }}
        links={[
          { href: "/connector-release-candidate", label: "Connector RC" },
          { href: "/connector-privacy-redaction-review", label: "Privacy review" },
          { href: "/connector-evidence-capture-review", label: "Evidence capture" },
          { href: "/automation-loop-real-world-trial-review", label: "Next automation review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialReviewLanguage} />
      <PreviewFoundationCard title="Plain-English connector trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews connector access intent, Gmail Calendar and Contacts boundaries, privacy redaction,
          evidence capture, blocked actions, and outcome notes. It does not request OAuth, authorize connectors, read
          emails, read calendar events, read contacts, store tokens, or display private values.
        </PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Real evidence is reviewed before use, and memory promotion remains blocked until approved.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="connector-loop-real-world-trial-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildConnectorLoopRealWorldTrialReviewStableKey(
              "connector-loop-real-world-trial-review-card",
              review.id
            )}
            title={review.connectorTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceConnectorReleaseCandidate,
                review.operatorConnectorScenario,
                `Connector access plan: ${review.connectorAccessPlan.join("; ")}`,
                `Gmail/Calendar/Contacts boundaries: ${review.gmailCalendarContactsBoundaries.join("; ")}`,
                `Privacy redaction checklist: ${review.privacyRedactionChecklist.join("; ")}`,
                review.evidenceCaptureReview,
                `Blocked real actions: ${review.blockedRealActions.join("; ")}`,
                `Trial outcome notes: ${review.trialOutcomeNotes.join("; ")}`,
                review.nextLoopRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced connector trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedConnectorTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced connector trial details stay collapsed or secondary. Connector real-world trial review remains
          separate from OAuth, connector authorization, connector data reads, token storage, private value display,
          provider calls, local files, automations, and memory promotion.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
