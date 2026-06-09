param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\automation-release-candidate"
$route = "src\app\automation-release-candidate"

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
  "Automation release candidate",
  "Automation release candidate remains review-only",
  "Automations are not created automatically",
  "Background work remains disabled from UI",
  "Release decision",
  "Known gaps"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 345 Automation Release Candidate" `
  -ScriptFile "smoke-codexforge-automation-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "AutomationReleaseCandidatePanel" `
  -CommandLabel "Go to Automation Release Candidate" `
  -Modules @("automation-release-candidate-types.ts","automation-release-candidate-summary.ts","index.ts") `
  -Components @("AutomationReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildAutomationReleaseCandidateStableKey","buildAutomationReleaseCandidate","buildAutomationReleaseCandidates","buildAutomationReleaseCandidateBoundary","buildAutomationReleaseCandidateModel","summarizeAutomationReleaseCandidate","AUTOMATION_RELEASE_CANDIDATE_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Release candidate identity","Covered automation surfaces","Reminder readiness","Scheduled research readiness","Conditional watch readiness","Notification readiness","Audit/recovery readiness","Next recommended route","advanced release details collapsed/secondary") + $sharedAutomationSafetyMarkers) `
  -ExtraRoutes @("/task-reminder-boundary","/scheduled-research-check-boundary","/conditional-watch-review-inbox","/operator-notification-center")

& (Join-Path $PSScriptRoot "codexforge-automation-boundary-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Automation Release Candidate smoke passed."
