param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\research-claim-builder"
$route = "src\app\research-claim-builder"

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
  "Research claim builder",
  "Claims are reviewed before use",
  "Conflicting or stale evidence stays flagged",
  "Memory is not auto-promoted",
  "Supporting evidence summary",
  "Citation draft route"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 326 Research Claim Builder" `
  -ScriptFile "smoke-codexforge-research-claim-builder.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ResearchClaimBuilderPanel" `
  -CommandLabel "Go to Research Claim Builder" `
  -Modules @("research-claim-builder-types.ts","research-claim-builder-summary.ts","index.ts") `
  -Components @("ResearchClaimBuilderPanel.tsx","index.ts") `
  -Exports @("buildResearchClaimBuilderStableKey","buildResearchClaimBuilderClaim","buildResearchClaimBuilderClaims","buildResearchClaimBuilderBoundary","buildResearchClaimBuilderModel","summarizeResearchClaimBuilder","RESEARCH_CLAIM_BUILDER_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Claim builder identity","Source evidence review inbox","Proposed claim summary","Conflicting/stale evidence flags","Confidence/quality signal","Summary draft route","Blocked reasons","advanced claim details collapsed/secondary") + $sharedResearchSafetyMarkers) `
  -ExtraRoutes @("/research-evidence-inbox","/research-citation-draft-review","/research-summary-draft-builder","/memory")

& (Join-Path $PSScriptRoot "codexforge-research-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Research Claim Builder smoke passed."
