param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\research-freshness-recheck-boundary"
$route = "src\app\research-freshness-recheck-boundary"

$sharedResearchSafetyMarkers = @(
  "no automatic web browsing",
  "no web/search/provider API calls",
  "no automatic provider calls",
  "no automatic provider send",
  "no prompt/file/source sending without approval",
  "no auto-spend tokens",
  "no provider retries automatically",
  "no source auto-fetching",
  "no source auto-ingestion",
  "no evidence auto-ingestion",
  "no auto-cite",
  "no auto-citation finalization",
  "no automatic report export",
  "no file export/write behavior",
  "no source auto-refreshing",
  "no freshness auto-recheck",
  "no evidence auto-update",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no provider API calls",
  "no web or provider request sent",
  "no API keys or secrets displayed",
  "no localStorage API key storage",
  "no process.env printing",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension install behavior",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no Jarvisd capability execution from UI",
  "no daemon process creation from frontend",
  "no command execution",
  "no shell command execution",
  "no git command execution from UI",
  "no test execution from UI",
  "no browser-stored signing secrets",
  "no session token localStorage storage",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open",
  "no auto-open local files",
  "no file mutation",
  "no file write",
  "no patch apply behavior",
  "no file deletion",
  "no artifact deletion",
  "no process kill/restart/shutdown from UI",
  "no package install behavior",
  "no Ruflo/Odysseus vendoring",
  "no Ruflo/Odysseus runtime integration",
  "no Ruflo/Odysseus dependency references",
  "future adoption requires license/security review"
)

$phaseMarkers = @(
  "Research freshness recheck boundary",
  "Freshness rechecks require explicit approval",
  "No source is refreshed from this page",
  "API keys and secrets are never displayed",
  "Allowed recheck scope",
  "Budget rate-limit guardrail"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 333 Research Freshness Recheck Boundary" `
  -ScriptFile "smoke-codexforge-research-freshness-recheck-boundary.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ResearchFreshnessRecheckBoundaryPanel" `
  -CommandLabel "Go to Research Freshness Recheck Boundary" `
  -Modules @("research-freshness-recheck-boundary-types.ts","research-freshness-recheck-boundary-summary.ts","index.ts") `
  -Components @("ResearchFreshnessRecheckBoundaryPanel.tsx","index.ts") `
  -Exports @("buildResearchFreshnessRecheckBoundaryStableKey","buildResearchFreshnessRecheckBoundaryReview","buildResearchFreshnessRecheckBoundaryReviews","buildResearchFreshnessRecheckBoundary","buildResearchFreshnessRecheckBoundaryModel","summarizeResearchFreshnessRecheckBoundary","RESEARCH_FRESHNESS_RECHECK_BOUNDARY_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Freshness boundary identity","Source conflict resolver","Source/report dependency","Stale source summary","Denied recheck scope","Provider/web boundary dependency","Approval requirement","Blocked reasons","advanced freshness details collapsed/secondary") + $sharedResearchSafetyMarkers) `
  -ExtraRoutes @("/evidence-conflict-resolver-review","/web-research-provider-boundary","/research-runbook-finalization","/research-workspace-release-candidate")

& (Join-Path $PSScriptRoot "codexforge-research-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Research Freshness Recheck Boundary smoke passed."
