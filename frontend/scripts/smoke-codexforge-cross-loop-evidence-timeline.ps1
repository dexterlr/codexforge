param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\cross-loop-evidence-timeline"
$route = "src\app\cross-loop-evidence-timeline"
$newRoutes = @(
  "/result-comparison-review",
  "/cross-loop-evidence-timeline",
  "/project-knowledge-search-preview",
  "/unified-workspace-search-release-candidate"
)

$phaseMarkers = @(
  "Cross-loop evidence timeline",
  "Evidence timeline does not fetch external data",
  "Evidence is reviewed before ingestion",
  "Private evidence stays redacted until approved",
  "Evidence groups by loop",
  "Chronology preview"
)

$safeReviewSearchMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no live search execution",
  "no search query persistence",
  "no provider API calls",
  "no connector API calls",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no external data fetching",
  "no evidence ingestion automation",
  "no evidence ingestion from UI",
  "no project scan",
  "no local file reads",
  "no prompt/file/project/connector/search/evidence data sending without approval",
  "no prompt/file/project/connector data sending without approval",
  "no prompt/file/project data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no git command execution from UI",
  "no shell command execution from UI",
  "no shell command execution",
  "no command execution",
  "no test/build/smoke execution from UI",
  "no test execution from UI",
  "no build execution from UI",
  "no smoke execution from UI",
  "no file mutation",
  "no file write",
  "no file export/write behavior",
  "no export/write behavior",
  "no patch apply behavior",
  "no file deletion",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no reminder creation",
  "no task scheduling",
  "no automation creation",
  "no background job creation",
  "no notification sending",
  "no polling loops from UI",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no token storage",
  "no localStorage/sessionStorage token storage",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no duplicate menus",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 399 Cross-Loop Evidence Timeline" `
  -ScriptFile "smoke-codexforge-cross-loop-evidence-timeline.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CrossLoopEvidenceTimelinePanel" `
  -CommandLabel "Go to Cross-Loop Evidence Timeline" `
  -Modules @("cross-loop-evidence-timeline-types.ts","cross-loop-evidence-timeline-summary.ts","index.ts") `
  -Components @("CrossLoopEvidenceTimelinePanel.tsx","index.ts") `
  -Exports @("buildCrossLoopEvidenceTimelineStableKey","buildCrossLoopEvidenceTimeline","buildCrossLoopEvidenceTimelines","buildCrossLoopEvidenceTimelineBoundary","buildCrossLoopEvidenceTimelineModel","summarizeCrossLoopEvidenceTimeline","CROSS_LOOP_EVIDENCE_TIMELINE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("Evidence timeline identity","Trust/freshness notes","Redaction and privacy notes","Blocked evidence gaps","Project knowledge search route","Result comparison route","Next recommended action","advanced timeline details collapsed/secondary") + $safeReviewSearchMarkers) `
  -ExtraRoutes @("/result-comparison-review","/project-knowledge-search-preview","/local-first-privacy-audit","/global-review-inbox")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "externalDataFetchingAllowedFromUi:\s*true|evidenceIngestionAllowedFromUi:\s*true|fetchExternalData\s*\(|refreshExternalEvidence\s*\(|ingestEvidence\s*\(" "no external data fetching or evidence ingestion"
Assert-NotMatches $source "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|callProviderApi\s*\(|callConnectorApi\s*\(|callSearchProvider\s*\(|callGithubApi\s*\(|callLocalBridge\s*\(" "no provider connector web GitHub or local bridge calls"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Cross-Loop Evidence Timeline smoke passed."
