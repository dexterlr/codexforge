param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\research-runbook-finalization"
$route = "src\app\research-runbook-finalization"

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
  "Research runbook finalization",
  "Research runbooks are reviewed before use",
  "Runbooks never include API keys or secrets",
  "Runbook finalization does not browse or export automatically",
  "Operator checklist",
  "Freshness recheck policy"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 331 Research Runbook Finalization" `
  -ScriptFile "smoke-codexforge-research-runbook-finalization.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ResearchRunbookFinalizationPanel" `
  -CommandLabel "Go to Research Runbook Finalization" `
  -Modules @("research-runbook-finalization-types.ts","research-runbook-finalization-summary.ts","index.ts") `
  -Components @("ResearchRunbookFinalizationPanel.tsx","index.ts") `
  -Exports @("buildResearchRunbookFinalizationStableKey","buildResearchRunbookFinalization","buildResearchRunbookFinalizations","buildResearchRunbookFinalizationBoundary","buildResearchRunbookFinalizationModel","summarizeResearchRunbookFinalization","RESEARCH_RUNBOOK_FINALIZATION_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Runbook identity","Source research release candidate","Approved research workflow summary","Source collection rules","Citation rules","Conflict handling rules","Privacy/redaction checklist","Blocked reasons","advanced runbook details collapsed/secondary") + $sharedResearchSafetyMarkers) `
  -ExtraRoutes @("/research-workspace-release-candidate","/evidence-conflict-resolver-review","/research-freshness-recheck-boundary","/research-report-export-review")

& (Join-Path $PSScriptRoot "codexforge-research-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Research Runbook Finalization smoke passed."
