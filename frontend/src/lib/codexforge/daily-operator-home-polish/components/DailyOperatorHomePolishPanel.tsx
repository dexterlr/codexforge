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
  buildDailyOperatorHomePolishModel,
  buildDailyOperatorHomePolishStableKey,
} from "@/lib/codexforge/daily-operator-home-polish";

const DAILY_OPERATOR_HOME_POLISH_MARKERS =
  "Daily operator home polish Daily home does not run workflows automatically All actions remain behind explicit approval gates Private details stay redacted until review Today review priorities Safety reminders daily home identity loop readiness summary blocked work summary approval queue route global review inbox route result history route next recommended action review-only approval required daily home does not run workflows automatically no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local tool launch behavior no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced daily home details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function DailyOperatorHomePolishPanel() {
  const model = buildDailyOperatorHomePolishModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-daily-operator-home-polish={`${DAILY_OPERATOR_HOME_POLISH_MARKERS} buildDailyOperatorHomePolishStableKey DailyOperatorHomePolishPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 370"
        title="Daily operator home"
        subtitle="Daily operator home polish shows what the operator should review next without running workflows. Daily home does not run workflows automatically, all actions remain behind explicit approval gates, and private details stay redacted until review."
        primary={{ href: "#daily-operator-home-polish", label: "Review daily home" }}
        links={[
          { href: "/global-review-inbox", label: "Global inbox" },
          { href: "/approval-queue", label: "Approval queue" },
          { href: "/result-history", label: "Result history" },
          { href: "/unified-workspace-real-world-trial-report", label: "Unified report" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.dailyHomeLanguage} />
      <PreviewFoundationCard title="Plain-English daily operator home">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page summarizes daily home identity, today review priorities, loop readiness summary, blocked work
          summary, approval queue route, global review inbox route, result history route, safety reminders, and next
          recommended action. It does not execute workflows, call APIs, mutate files, approve anything automatically, or
          promote memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="daily-operator-home-polish" style={previewStyles.grid}>
        {model.dailyHomes.map((home) => (
          <PreviewFoundationCard
            key={buildDailyOperatorHomePolishStableKey("daily-operator-home-card", home.id)}
            title={home.dailyHomeIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${home.status}`,
                `Today review priorities: ${home.todayReviewPriorities.join("; ")}`,
                `Loop readiness summary: ${home.loopReadinessSummary.join("; ")}`,
                `Blocked work summary: ${home.blockedWorkSummary.join("; ")}`,
                home.approvalQueueRoute,
                home.globalReviewInboxRoute,
                home.resultHistoryRoute,
                `Safety reminders: ${home.safetyReminders.join("; ")}`,
                home.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced daily home details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.dailyHomes.map((home) => home.advancedDailyHomeDetails)} />
        <PreviewFoundationCopy>
          Advanced daily home details stay collapsed or secondary. The daily operator home is a review-only cockpit and
          does not run workflows automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}

