param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\unified-workspace-search-release-candidate"
$route = "src\app\unified-workspace-search-release-candidate"
$newRoutes = @(
  "/result-comparison-review",
  "/cross-loop-evidence-timeline",
  "/project-knowledge-search-preview",
  "/unified-workspace-search-release-candidate"
)

$phaseMarkers = @(
  "Unified workspace search release candidate",
  "Unified search candidate does not run live search",
  "Live search requires explicit approval",
  "Denied sources remain blocked",
  "Search scope matrix",
  "Denied source matrix"
)

$safeReviewSearchMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no live search execution",
  "no search execution from UI",
  "no search query persistence",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
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
  -PhaseName "Phase 401 Unified Workspace Search Release Candidate" `
  -ScriptFile "smoke-codexforge-unified-workspace-search-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "UnifiedWorkspaceSearchReleaseCandidatePanel" `
  -CommandLabel "Go to Unified Workspace Search Release Candidate" `
  -Modules @("unified-workspace-search-release-candidate-types.ts","unified-workspace-search-release-candidate-summary.ts","index.ts") `
  -Components @("UnifiedWorkspaceSearchReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildUnifiedWorkspaceSearchReleaseCandidateStableKey","buildUnifiedWorkspaceSearchReleaseCandidate","buildUnifiedWorkspaceSearchReleaseCandidates","buildUnifiedWorkspaceSearchReleaseCandidateBoundary","buildUnifiedWorkspaceSearchReleaseCandidateModel","summarizeUnifiedWorkspaceSearchReleaseCandidate","UNIFIED_WORKSPACE_SEARCH_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("Unified search candidate identity","Source search previews","Approval gates","Privacy/redaction requirements","Release blockers","Provider readiness route","Connector readiness route","Next recommended action","advanced release candidate details collapsed/secondary") + $safeReviewSearchMarkers) `
  -ExtraRoutes @("/project-knowledge-search-preview","/result-comparison-review","/provider-governance-release-candidate","/connector-release-candidate")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "liveSearchExecutionAllowedFromUi:\s*true|searchExecutionAllowedFromUi:\s*true|searchQueryPersistenceAllowedFromUi:\s*true|runLiveSearch\s*\(|executeSearch\s*\(|runSearch\s*\(|saveSearch\s*\(|persistSearchQuery\s*\(" "no live search execution or search query persistence"
Assert-NotMatches $source "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|callProviderApi\s*\(|callConnectorApi\s*\(|callSearchProvider\s*\(|callGithubApi\s*\(|callLocalBridge\s*\(" "no provider connector web GitHub or local bridge calls"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Unified Workspace Search Release Candidate smoke passed."
