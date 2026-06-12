param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\research-provider-trial-review"
$route = "src\app\research-provider-trial-review"
$newRoutes = @(
  "/creative-provider-trial-review",
  "/research-provider-trial-review",
  "/coding-provider-trial-review",
  "/cross-provider-result-comparison"
)

$phaseMarkers = @(
  "Research provider trial review",
  "Research provider trial does not run research",
  "Research provider calls require explicit operator approval",
  "Evidence is not ingested automatically",
  "Research provider families",
  "Freshness conflict checklist"
)

$providerTrialSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no research provider calls",
  "no research execution",
  "no browsing/search/fetching from UI",
  "no source fetching/browsing",
  "no external data fetching",
  "no evidence ingestion automation",
  "no evidence ingestion",
  "no provider API calls",
  "no provider live connection tests",
  "no provider traffic",
  "no provider traffic routing",
  "no provider output persistence",
  "no provider output ingestion",
  "no prompt sending to providers",
  "no output storage",
  "no local model calls",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no connector API calls",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/model/evidence/output data sending without approval",
  "no prompt/file/project/connector/provider/model data sending without approval",
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
  "no runbook export/write behavior",
  "no patch apply behavior",
  "no file deletion",
  "no creative asset generation",
  "no coding workflow execution",
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
  "no credential storage",
  "no provider key storage",
  "no connector token storage",
  "no token storage",
  "no endpoint storage",
  "no localStorage/sessionStorage token storage",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no example real key/token/endpoint values",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no duplicate menus",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "server-only path boundary markers remain intact",
  "advanced research provider details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 427 Research Provider Trial Review" `
  -ScriptFile "smoke-codexforge-research-provider-trial-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ResearchProviderTrialReviewPanel" `
  -CommandLabel "Go to Research Provider Trial Review" `
  -Modules @("research-provider-trial-review-types.ts","research-provider-trial-review-summary.ts","index.ts") `
  -Components @("ResearchProviderTrialReviewPanel.tsx","index.ts") `
  -Exports @("buildResearchProviderTrialReviewStableKey","buildResearchProviderTrialReview","buildResearchProviderTrialReviews","buildResearchProviderTrialReviewBoundary","buildResearchProviderTrialReviewModel","summarizeResearchProviderTrialReview","RESEARCH_PROVIDER_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("research provider trial identity","Evidence and citation boundary notes","Approval gate checklist","Denied research provider actions","Blocked research trial risks","Coding provider trial route","Cross-provider comparison route","Next recommended action") + $providerTrialSafetyMarkers) `
  -ExtraRoutes @("/creative-provider-trial-review","/coding-provider-trial-review","/cross-provider-result-comparison","/research-workflow-readiness-audit")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source
foreach ($marker in @($phaseMarkers + $providerTrialSafetyMarkers + @("no Date.now","no Date.now for deterministic layout/ids","no Math.random","no obvious duplicate React key patterns"))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

Assert-NotMatches $source "researchExecutionAllowedFromUi:\s*true|browsingAllowedFromUi:\s*true|searchAllowedFromUi:\s*true|sourceFetchAllowedFromUi:\s*true|externalDataFetchingAllowedFromUi:\s*true|runResearch\s*\(|browseWeb\s*\(|runSearch\s*\(|fetchSource\s*\(|fetch\s*\(|XMLHttpRequest|axios" "no research browsing searching fetching or external data calls"
Assert-NotMatches $source "evidenceIngestionAllowedFromUi:\s*true|evidenceAutoIngestionAllowed:\s*true|ingestEvidence\s*\(|autoIngestEvidence\s*\(" "no evidence ingestion automation"
Assert-NotMatches $source "researchProviderCallsAllowedFromUi:\s*true|providerApiCallsAllowedFromUi:\s*true|providerConnectionTestsAllowedFromUi:\s*true|liveProviderTrafficAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|callProviderApi\s*\(|callResearchProvider\s*\(|connectProvider\s*\(|testProviderConnection\s*\(|routeLiveProviderTraffic\s*\(|sendPrompt\s*\(" "no provider calls connection tests traffic routing or prompt sending"
Assert-NotMatches $source "providerOutputStorageAllowedFromUi:\s*true|providerOutputIngestionAllowedFromUi:\s*true|outputStorageAllowed:\s*true|storeProviderOutput\s*\(|persistProviderOutput\s*\(|ingestProviderOutput\s*\(|storeOutput\s*\(" "no provider output persistence ingestion or storage"
Assert-NotMatches $source "localModelCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|callLocalModel\s*\(|runLocalModel\s*\(|callLocalBridge\s*\(" "no local model or bridge calls"
Assert-NotMatches $source "connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|callConnectorApi\s*\(|callSearchProvider\s*\(|callGithubApi\s*\(" "no connector web search or GitHub calls"
Assert-NotMatches $source "actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|approveAction\s*\(|autoApprove\s*\(" "no approval automation"
Assert-NotMatches $source "workflowExecutionAllowedFromUi:\s*true|executeWorkflow\s*\(|runWorkflow\s*\(" "no workflow execution"
Assert-NotMatches $source "localStorage\.setItem|sessionStorage\.setItem|credentialStorageAllowed:\s*true|endpointStorageAllowed:\s*true|tokenStorageAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}" "no credential endpoint token storage env print or displayed secret"
Assert-NotMatches $source "readFile\s*\(|openFile\s*\(|writeFile\s*\(|exportFile\s*\(|downloadFile\s*\(|deleteFile\s*\(|applyPatch\s*\(|applyDiff\s*\(|runGit\s*\(|runCommand\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|child_process|execSync|spawn\s*\(" "no file git shell test build smoke or patch behavior"
Assert-NotMatches $source "ingestMemory\s*\(|ingestRag\s*\(|promoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\(|createReminder\s*\(|scheduleTask\s*\(|createAutomation\s*\(|createBackgroundJob\s*\(|sendNotification\s*\(|setInterval\s*\(|setTimeout\s*\(|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createMcpServer\s*\(|callMcpTool\s*\(" "no memory automation plugin tool agent MCP or polling behavior"
Assert-NotMatches $deterministicSource "Math\.random\s*\(|Date\.now\s*\(|key=\{label\}|key=\{summary\}|key=\{item\}|key=\{index\}|key=\{i\}|$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)" "no deterministic key mojibake or duplicate key issues"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Research Provider Trial Review smoke passed."
