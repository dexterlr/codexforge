param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\scheduled-research-check-boundary"
$route = "src\app\scheduled-research-check-boundary"

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
  "no background job creation",
  "no background work runs from UI",
  "no cron/interval/polling loops from UI",
  "no automatic web browsing",
  "no web/search/provider API calls",
  "no automatic provider calls",
  "no provider API calls",
  "no prompt/file/source sending without approval",
  "no auto-spend tokens",
  "no provider retries automatically",
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
  "Scheduled research check boundary",
  "Scheduled research checks require explicit approval",
  "No research check is scheduled from this page",
  "No source is refreshed automatically",
  "Budget rate-limit policy",
  "Conditional watch route"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 343 Scheduled Research Check Boundary" `
  -ScriptFile "smoke-codexforge-scheduled-research-check-boundary.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ScheduledResearchCheckBoundaryPanel" `
  -CommandLabel "Go to Scheduled Research Check Boundary" `
  -Modules @("scheduled-research-check-boundary-types.ts","scheduled-research-check-boundary-summary.ts","index.ts") `
  -Components @("ScheduledResearchCheckBoundaryPanel.tsx","index.ts") `
  -Exports @("buildScheduledResearchCheckBoundaryStableKey","buildScheduledResearchCheckBoundaryReview","buildScheduledResearchCheckBoundaryReviews","buildScheduledResearchCheckBoundary","buildScheduledResearchCheckBoundaryModel","summarizeScheduledResearchCheckBoundary","SCHEDULED_RESEARCH_CHECK_BOUNDARY_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Boundary identity","Source research freshness boundary","Research check summary","Allowed schedule scope","Denied schedule scope","Source/provider boundary","Approval requirement","Blocked reasons","advanced schedule details collapsed/secondary") + $sharedAutomationSafetyMarkers) `
  -ExtraRoutes @("/research-freshness-recheck-boundary","/web-research-provider-boundary","/conditional-watch-review-inbox","/research-runbook-finalization")

& (Join-Path $PSScriptRoot "codexforge-automation-boundary-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Scheduled Research Check Boundary smoke passed."
