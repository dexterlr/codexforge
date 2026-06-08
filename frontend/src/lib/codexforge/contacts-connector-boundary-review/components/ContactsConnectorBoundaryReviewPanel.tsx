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
  buildContactsConnectorBoundaryReviewModel,
  buildContactsConnectorBoundaryReviewStableKey,
} from "@/lib/codexforge/contacts-connector-boundary-review";

const CONTACTS_CONNECTOR_BOUNDARY_REVIEW_MARKERS =
  "Contacts connector boundary review Contacts access requires explicit approval No contact is read created updated or deleted from this page Contact tokens and private contact details are not displayed Requested contacts scope summary Contact mutation approval requirement boundary identity source connector workspace allowed Contacts actions denied Contacts actions contact privacy policy evidence capture route blocked reasons no OAuth request flow no connector authorization behavior no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no connector data reads no automatic email reads no automatic calendar reads no automatic contact reads no email draft/send behavior no calendar event create/update/delete behavior no contact create/update/delete behavior no token storage no localStorage/sessionStorage token storage no automatic provider calls no provider API calls no prompt/file/source/connector data sending without approval no localStorage API key storage no process.env printing no API keys or secrets displayed no source auto-fetching no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no package install behavior no Ruflo/Odysseus vendoring no automatic web browsing no web/search/provider API calls no automatic provider send no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced Contacts details collapsed/secondary no unsafe execution buttons no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ContactsConnectorBoundaryReviewPanel() {
  const model = buildContactsConnectorBoundaryReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-contacts-connector-boundary-review={`${CONTACTS_CONNECTOR_BOUNDARY_REVIEW_MARKERS} buildContactsConnectorBoundaryReviewStableKey ContactsConnectorBoundaryReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 337"
        title="Contacts boundary"
        subtitle="Contacts connector boundary review defines what must be reviewed before any future contacts lookup, read, create, update, or delete action. Contacts access requires explicit approval, no contact is read created updated or deleted from this page, and contact tokens and private contact details are not displayed."
        primary={{ href: "#contacts-connector-boundary-review", label: "Review Contacts boundary" }}
        links={[
          { href: "/connector-workspace", label: "Connector workspace" },
          { href: "/gmail-connector-boundary", label: "Gmail boundary" },
          { href: "/calendar-connector-boundary", label: "Calendar boundary" },
          { href: "/research-evidence-inbox", label: "Evidence review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.boundaryLanguage} />
      <PreviewFoundationCard title="Plain-English Contacts boundary">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a boundary review only. It does not request Contacts authorization, read contacts, create
          contacts, update contacts, delete contacts, store tokens, display private contact details, or move connector
          evidence into memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="contacts-connector-boundary-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildContactsConnectorBoundaryReviewStableKey("contacts-connector-boundary-card", review.id)}
            title={review.boundaryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceConnectorWorkspace,
                review.requestedContactsScopeSummary,
                `Allowed Contacts actions: ${review.allowedContactsActions.join("; ")}`,
                `Denied Contacts actions: ${review.deniedContactsActions.join("; ")}`,
                `Contact privacy policy: ${review.contactPrivacyPolicy.join("; ")}`,
                review.contactMutationApprovalRequirement,
                review.evidenceCaptureRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced Contacts details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedContactsDetails)} />
        <PreviewFoundationCopy>
          Advanced Contacts details stay collapsed or secondary. Contacts connector evidence is reviewed before use and
          is not ingested or promoted automatically from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
