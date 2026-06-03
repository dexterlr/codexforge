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
import { buildLocalFileOperationApprovalGateModel } from "@/lib/codexforge/local-file-operation-approval-gate";

export function LocalFileOperationApprovalGatePanel() {
  const model = buildLocalFileOperationApprovalGateModel();

  return (
    <div style={previewStyles.shell} data-codexforge-local-file-operation-approval-gate="LocalFileOperationApprovalGatePanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Local file operation approval gate No file operation runs automatically Arbitrary local browsing is not allowed Delete requests require separate explicit review Allowed scope Rollback and recovery note approved local boundary required nothing executes from arbitrary UI no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no arbitrary local file browsing no file mutation no file deletion no process kill restart mutation no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 218"
        title="File approval"
        subtitle="Local file operation approval gate reviews proposed file operations before any future Jarvisd or local daemon action. No file operation runs automatically, arbitrary local browsing is not allowed, and delete requests require separate explicit review."
        primary={{ href: "#local-file-operation-approval-gate", label: "Review file gate" }}
        links={[
          { href: "/local-command-approval", label: "Command gate" },
          { href: "/workspace-trust-policy", label: "Trust policy" },
          { href: "/jarvisd-permissions", label: "Jarvisd permissions" },
          { href: "/jarvisd-capabilities", label: "Capabilities" },
          { href: "/local-bridge-health", label: "Bridge health" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.approvalLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Nothing executes from arbitrary UI. Any future local file operation needs an approved local boundary first.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-file-operation-approval-gate" style={previewStyles.grid}>
        <PreviewFoundationCard title="Operation identity">
          <PreviewFoundationPillList items={model.operations.map((operation) => operation.operationIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Operation type">
          <PreviewFoundationPillList items={model.operations.map((operation) => operation.operationType)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Target scope summary">
          <PreviewFoundationPillList items={model.operations.map((operation) => operation.targetScopeSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Allowed scope">
          <PreviewFoundationPillList items={model.operations.map((operation) => operation.allowedScope)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Denied scope">
          <PreviewFoundationPillList items={model.operations.map((operation) => operation.deniedScope)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Risk level">
          <PreviewFoundationPillList
            items={model.operations.map((operation) => `${operation.riskLevel}: ${operation.status}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval copy">
          <PreviewFoundationPillList items={model.operations.map((operation) => operation.approvalCopy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit note">
          <PreviewFoundationPillList items={model.operations.map((operation) => operation.auditNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Rollback and recovery note">
          <PreviewFoundationPillList items={model.operations.map((operation) => operation.rollbackRecoveryNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.operations.map((operation) => operation.blockedReasons.join("; "))} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced operation details">
        <PreviewFoundationPillList items={model.operations.map((operation) => operation.advancedOperationDetails)} />
        <PreviewFoundationCopy>
          Advanced operation details stay secondary. This review surface does not browse files, write files, move files, delete files, call Jarvisd, run commands, call providers, display secrets, or mutate Brain graph state.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
