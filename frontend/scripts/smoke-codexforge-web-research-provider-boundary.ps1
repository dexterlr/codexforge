param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\web-research-provider-boundary"
$route = "src\app\web-research-provider-boundary"

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
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no provider API calls",
  "no web or provider request sent",
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
  "Web research provider boundary",
  "Web research provider calls require explicit approval",
  "No web or provider request is sent from this page",
  "API keys and secrets are never displayed",
  "Allowed source scope",
  "Budget rate limit guardrail"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 323 Web Research Provider Boundary" `
  -ScriptFile "smoke-codexforge-web-research-provider-boundary.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "WebResearchProviderBoundaryPanel" `
  -CommandLabel "Go to Web Research Provider Boundary" `
  -Modules @("web-research-provider-boundary-types.ts","web-research-provider-boundary-summary.ts","index.ts") `
  -Components @("WebResearchProviderBoundaryPanel.tsx","index.ts") `
  -Exports @("buildWebResearchProviderBoundaryStableKey","buildWebResearchProviderBoundaryReview","buildWebResearchProviderBoundaryReviews","buildWebResearchProviderBoundary","buildWebResearchProviderBoundaryModel","summarizeWebResearchProviderBoundary","WEB_RESEARCH_PROVIDER_BOUNDARY_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Boundary identity","Source research workspace","Provider/search method summary","Query/privacy classification","Denied source scope","Approval requirement","Source collector route","Blocked reasons","advanced boundary details collapsed/secondary") + $sharedResearchSafetyMarkers) `
  -ExtraRoutes @("/research-workspace","/research-source-collector-trial","/prompt-privacy-classifier","/provider-budget-guardrails")

& (Join-Path $PSScriptRoot "codexforge-research-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Web Research Provider Boundary smoke passed."
