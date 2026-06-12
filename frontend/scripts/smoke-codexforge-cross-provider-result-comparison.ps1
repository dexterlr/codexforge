param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\cross-provider-result-comparison"
$route = "src\app\cross-provider-result-comparison"
$newRoutes = @(
  "/creative-provider-trial-review",
  "/research-provider-trial-review",
  "/coding-provider-trial-review",
  "/cross-provider-result-comparison"
)

$phaseMarkers = @(
  "Cross-provider result comparison",
  "Cross-provider comparison does not call providers",
  "Provider comparisons are reviewed before use",
  "Private outputs stay redacted",
  "Comparison groups",
  "Validation evidence comparison"
)

$comparisonSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no provider API calls",
  "no provider live connection tests",
  "no provider traffic",
  "no provider traffic routing",
  "no provider output persistence",
  "no provider output ingestion",
  "no provider output storage",
  "no output storage",
  "no prompt sending to providers",
  "no provider response ingestion",
  "no response ingestion",
  "no local model calls",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no connector API calls",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/model/output data sending without approval",
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
  "no research execution",
  "no evidence ingestion automation",
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
  "advanced comparison details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 429 Cross-Provider Result Comparison" `
  -ScriptFile "smoke-codexforge-cross-provider-result-comparison.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CrossProviderResultComparisonPanel" `
  -CommandLabel "Go to Cross-Provider Result Comparison" `
  -Modules @("cross-provider-result-comparison-types.ts","cross-provider-result-comparison-summary.ts","index.ts") `
  -Components @("CrossProviderResultComparisonPanel.tsx","index.ts") `
  -Exports @("buildCrossProviderResultComparisonStableKey","buildCrossProviderResultComparison","buildCrossProviderResultComparisons","buildCrossProviderResultComparisonBoundary","buildCrossProviderResultComparisonModel","summarizeCrossProviderResultComparison","CROSS_PROVIDER_RESULT_COMPARISON_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("cross-provider comparison identity","Creative/research/coding provider comparison","Safety comparison","Cost/rate comparison","Denied comparison actions","Blocked comparison risks","Provider selection UX route","Provider audit trail route","Next recommended action") + $comparisonSafetyMarkers) `
  -ExtraRoutes @("/creative-provider-trial-review","/research-provider-trial-review","/coding-provider-trial-review","/provider-audit-log")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source
foreach ($marker in @($phaseMarkers + $comparisonSafetyMarkers + @("no Date.now","no Date.now for deterministic layout/ids","no Math.random","no obvious duplicate React key patterns"))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

Assert-NotMatches $source "providerApiCallsAllowedFromUi:\s*true|providerConnectionTestsAllowedFromUi:\s*true|liveProviderTrafficAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|callProviderApi\s*\(|connectProvider\s*\(|testProviderConnection\s*\(|routeLiveProviderTraffic\s*\(|sendPrompt\s*\(" "no provider calls connection tests traffic routing or prompt sending"
Assert-NotMatches $source "providerOutputStorageAllowedFromUi:\s*true|providerOutputIngestionAllowedFromUi:\s*true|responseIngestionAllowedFromUi:\s*true|outputStorageAllowed:\s*true|storeProviderOutput\s*\(|persistProviderOutput\s*\(|ingestProviderOutput\s*\(|ingestResponse\s*\(|storeOutput\s*\(" "no provider output storage ingestion or response ingestion"
Assert-NotMatches $source "localModelCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|callLocalModel\s*\(|runLocalModel\s*\(|callLocalBridge\s*\(" "no local model or bridge calls"
Assert-NotMatches $source "connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|callConnectorApi\s*\(|callSearchProvider\s*\(|callGithubApi\s*\(|fetch\s*\(|XMLHttpRequest|axios" "no connector web search or GitHub calls"
Assert-NotMatches $source "actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|approveAction\s*\(|autoApprove\s*\(" "no approval automation"
Assert-NotMatches $source "workflowExecutionAllowedFromUi:\s*true|executeWorkflow\s*\(|runWorkflow\s*\(" "no workflow execution"
Assert-NotMatches $source "localStorage\.setItem|sessionStorage\.setItem|credentialStorageAllowed:\s*true|endpointStorageAllowed:\s*true|tokenStorageAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}" "no credential endpoint token storage env print or displayed secret"
Assert-NotMatches $source "readFile\s*\(|openFile\s*\(|writeFile\s*\(|exportFile\s*\(|downloadFile\s*\(|deleteFile\s*\(|applyPatch\s*\(|applyDiff\s*\(|runGit\s*\(|runCommand\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|child_process|execSync|spawn\s*\(" "no file git shell test build smoke or patch behavior"
Assert-NotMatches $source "ingestMemory\s*\(|ingestRag\s*\(|promoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\(|createReminder\s*\(|scheduleTask\s*\(|createAutomation\s*\(|createBackgroundJob\s*\(|sendNotification\s*\(|setInterval\s*\(|setTimeout\s*\(|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createMcpServer\s*\(|callMcpTool\s*\(" "no memory automation plugin tool agent MCP or polling behavior"
Assert-NotMatches $deterministicSource "Math\.random\s*\(|Date\.now\s*\(|key=\{label\}|key=\{summary\}|key=\{item\}|key=\{index\}|key=\{i\}|$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)" "no deterministic key mojibake or duplicate key issues"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Cross-Provider Result Comparison smoke passed."
