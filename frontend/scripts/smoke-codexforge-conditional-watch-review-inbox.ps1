param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\conditional-watch-review-inbox"
$route = "src\app\conditional-watch-review-inbox"

$sharedAutomationSafetyMarkers = @(
  "no OAuth request flow",
  "no connector authorization behavior",
  "no connector API calls",
  "no Gmail API calls",
  "no Calendar API calls",
  "no Contacts API calls",
  "no Google API calls",
  "no connector data reads",
  "no automatic email reads",
  "no automatic calendar reads",
  "no automatic contact reads",
  "no token storage",
  "no localStorage/sessionStorage token storage",
  "no private connector values displayed",
  "no notifications sent",
  "no reminder creation",
  "no task scheduling",
  "no schedule creation",
  "no automation creation",
  "no watch activation",
  "no background check activation",
  "no background job creation",
  "no background work runs from UI",
  "no cron/interval/polling loops from UI",
  "no automatic web browsing",
  "no web/search/provider API calls",
  "no automatic provider calls",
  "no provider API calls",
  "no source auto-fetching",
  "no source auto-refreshing",
  "no freshness auto-recheck",
  "no evidence auto-update",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no command execution",
  "no shell command execution",
  "no git command execution from UI",
  "no test execution from UI",
  "no Jarvisd capability execution from UI",
  "no daemon process creation from frontend",
  "no browser-stored signing secrets",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open",
  "no auto-open local files",
  "no file mutation",
  "no file write",
  "no patch apply behavior",
  "no file deletion",
  "no package install behavior",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake"
)

$phaseMarkers = @(
  "Conditional watch review inbox",
  "Conditional watches are reviewed before activation",
  "No watch is activated from this page",
  "No background check runs from this page",
  "Trigger condition summary",
  "Automation release route"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 344 Conditional Watch Review Inbox" `
  -ScriptFile "smoke-codexforge-conditional-watch-review-inbox.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ConditionalWatchReviewInboxPanel" `
  -CommandLabel "Go to Conditional Watch Review Inbox" `
  -Modules @("conditional-watch-review-inbox-types.ts","conditional-watch-review-inbox-summary.ts","index.ts") `
  -Components @("ConditionalWatchReviewInboxPanel.tsx","index.ts") `
  -Exports @("buildConditionalWatchReviewInboxStableKey","buildConditionalWatchReviewItem","buildConditionalWatchReviewItems","buildConditionalWatchReviewBoundary","buildConditionalWatchReviewInboxModel","summarizeConditionalWatchReviewInbox","CONDITIONAL_WATCH_REVIEW_INBOX_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Inbox identity","Source reminder boundary","Source scheduled research boundary","Proposed watch summary","Data access boundary","Approval status","Blocked watch reasons","Audit handoff","advanced watch details collapsed/secondary") + $sharedAutomationSafetyMarkers) `
  -ExtraRoutes @("/task-reminder-boundary","/scheduled-research-check-boundary","/automation-release-candidate","/operator-notification-center")

& (Join-Path $PSScriptRoot "codexforge-automation-boundary-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Conditional Watch Review Inbox smoke passed."
