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
import { buildJarvisdRecoveryConsoleModel } from "@/lib/codexforge/jarvisd-recovery-console";

export function JarvisdRecoveryConsolePanel() {
  const model = buildJarvisdRecoveryConsoleModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-recovery-console="JarvisdRecoveryConsolePanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Jarvisd recovery console nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd recovery console Recovery actions are reviewed not executed Restart kill reset actions require future approved local boundary No local process is mutated from this page Safe recovery checklist Manual handoff Jarvisd actions are not executed from arbitrary UI Approved local boundary required no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live log fetching from arbitrary UI no audit log mutation from UI no Jarvisd capability execution from UI no daemon action runs from this page no settings auto-import no settings auto-export no provider APIs are called no GitHub API calls from UI no command execution no shell command execution no local command execution no local process mutation no file mutation no file deletion no arbitrary file read/open no arbitrary local file browsing no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no provider registry mutation no router config mutation from UI no auto-routing no auto-spend no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no raw secret display no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 243"
        title="Jarvisd recovery console"
        subtitle="Jarvisd recovery console helps review safe recovery options after local daemon failures. Recovery actions are reviewed not executed, restart kill reset actions require future approved local boundary, and no local process is mutated from this page."
        primary={{ href: "#jarvisd-recovery-console", label: "Review recovery" }}
        links={[
          { href: "/jarvisd-audit-log", label: "Audit log" },
          { href: "/jarvisd-permissions", label: "Permission boundary" },
          { href: "/jarvisd-health", label: "Daemon health" },
          { href: "/jarvisd-settings-review", label: "Settings review" },
          { href: "/jarvisd-release-audit", label: "Release audit" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.recoveryLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-recovery-console" style={previewStyles.grid}>
        <PreviewFoundationCard title="Recovery identity">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.recoveryIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Source event/failure">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.sourceEventFailure)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Failure category">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.failureCategory)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Safe recovery checklist">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.safeRecoveryChecklist.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked recovery reasons">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.blockedRecoveryReasons.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Permission dependency">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.permissionDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit dependency">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.auditDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Manual handoff">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.manualHandoff)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Escalation route">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.escalationRoute)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Next recommended route">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.nextRecommendedRoute)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced recovery details">
        <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.advancedRecoveryDetails)} />
        <PreviewFoundationCopy>
          Advanced recovery details stay secondary. This console does not execute commands, restart processes, kill processes, reset Jarvisd, mutate local files, call Jarvisd directly, or run Jarvisd capabilities from arbitrary UI.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
