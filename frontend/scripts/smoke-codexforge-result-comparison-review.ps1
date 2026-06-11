param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\result-comparison-review"
$route = "src\app\result-comparison-review"
$newRoutes = @(
  "/result-comparison-review",
  "/cross-loop-evidence-timeline",
  "/project-knowledge-search-preview",
  "/unified-workspace-search-release-candidate"
)

$phaseMarkers = @(
  "Result comparison review",
  "Result comparison does not rerun workflows",
  "Comparisons are reviewed before use",
  "Historical results remain read-only",
  "Compared result groups",
  "Validation evidence comparison"
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
  -PhaseName "Phase 398 Result Comparison Review" `
  -ScriptFile "smoke-codexforge-result-comparison-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ResultComparisonReviewPanel" `
  -CommandLabel "Go to Result Comparison Review" `
  -Modules @("result-comparison-review-types.ts","result-comparison-review-summary.ts","index.ts") `
  -Components @("ResultComparisonReviewPanel.tsx","index.ts") `
  -Exports @("buildResultComparisonReviewStableKey","buildResultComparisonReview","buildResultComparisonReviews","buildResultComparisonReviewBoundary","buildResultComparisonReviewModel","summarizeResultComparisonReview","RESULT_COMPARISON_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("Result comparison identity","Quality/safety comparison","Regression notes","Blocked comparisons","Evidence timeline route","Unified search candidate route","Next recommended action","no workflow rerun from UI","no result replay from UI","no compare by running workflows from UI","advanced comparison details collapsed/secondary") + $safeReviewSearchMarkers) `
  -ExtraRoutes @("/result-history","/cross-loop-evidence-timeline","/unified-workspace-search-release-candidate","/global-review-inbox")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "workflowRerunAllowedFromUi:\s*true|resultReplayAllowedFromUi:\s*true|rerunWorkflow\s*\(|replayResult\s*\(|compareByRunningWorkflow\s*\(" "no workflow rerun or result replay from UI"
Assert-NotMatches $source "liveSearchExecutionAllowedFromUi:\s*true|searchQueryPersistenceAllowedFromUi:\s*true|externalDataFetchingAllowedFromUi:\s*true|evidenceIngestionAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|runLiveSearch\s*\(|executeSearch\s*\(|saveSearch\s*\(|persistSearchQuery\s*\(|callGithubApi\s*\(|callLocalBridge\s*\(|ingestEvidence\s*\(" "no search persistence external fetching evidence ingestion GitHub or local bridge execution"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Result Comparison Review smoke passed."
