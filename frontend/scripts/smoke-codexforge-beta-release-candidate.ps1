param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\codexforge-beta-release-candidate"
$route = "src\app\codexforge-beta-release-candidate"
$newRoutes = @(
  "/beta-hardening-final-pass",
  "/codexforge-beta-release-candidate",
  "/controlled-provider-integration-plan",
  "/local-model-provider-trial-review"
)

$phaseMarkers = @(
  "CodexForge beta release candidate",
  "Beta release candidate does not publish beta",
  "Beta release requires explicit operator approval",
  "Unresolved blockers remain blocked",
  "Readiness groups",
  "Approval checklist"
)

$candidateSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no creative workflow execution",
  "no research execution",
  "no coding workflow execution",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no beta publish/release behavior",
  "no release/publish behavior",
  "no release-note publishing/exporting",
  "no release notes creation from UI",
  "no provider connection behavior",
  "no provider API calls",
  "no provider live connection tests",
  "no provider traffic",
  "no local model calls",
  "no local bridge endpoint calls",
  "no connector API calls",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/model data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no git command execution from UI",
  "no shell command execution from UI",
  "no command execution",
  "no test/build/smoke execution from UI",
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
  "no localStorage/sessionStorage token storage",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no token storage",
  "no endpoint storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no duplicate menus",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "server-only path boundary markers remain intact",
  "advanced beta candidate details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 411 CodexForge Beta Release Candidate" `
  -ScriptFile "smoke-codexforge-beta-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CodexForgeBetaReleaseCandidatePanel" `
  -CommandLabel "Go to CodexForge Beta Release Candidate" `
  -Modules @("codexforge-beta-release-candidate-types.ts","codexforge-beta-release-candidate-summary.ts","index.ts") `
  -Components @("CodexForgeBetaReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildCodexForgeBetaReleaseCandidateStableKey","buildCodexForgeBetaReleaseCandidate","buildCodexForgeBetaReleaseCandidates","buildCodexForgeBetaReleaseCandidateBoundary","buildCodexForgeBetaReleaseCandidateModel","summarizeCodexForgeBetaReleaseCandidate","CODEXFORGE_BETA_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("beta release candidate identity","workflow readiness summary","provider/local/connector/automation readiness summary","release blockers","controlled provider integration route","local model trial route","next recommended action") + $candidateSafetyMarkers) `
  -ExtraRoutes @("/controlled-provider-integration-plan","/local-model-provider-trial-review","/beta-hardening-final-pass","/beta-release-notes-draft-review")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source
foreach ($marker in @($phaseMarkers + $candidateSafetyMarkers + @("no Date.now","no Date.now for deterministic layout/ids","no Math.random","no obvious duplicate React key patterns"))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

$blockedPatterns = @{
  "no action execution workflow execution or approval automation" = "actionsExecutedFromUi:\s*true|actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|workflowExecutionAllowedFromUi:\s*true|workflowAutomaticRunAllowed:\s*true|creativeWorkflowExecutionAllowedFromUi:\s*true|researchExecutionAllowedFromUi:\s*true|codingWorkflowExecutionAllowedFromUi:\s*true|approveAction\s*\(|grantApproval\s*\(|executeAction\s*\(|runWorkflow\s*\(|executeWorkflow\s*\(|runCreativeWorkflow\s*\(|runResearch\s*\(|runCodingWorkflow\s*\("
  "no beta release publish release-note creation publish or export" = "releasePublishAllowedFromUi:\s*true|betaPublishAllowedFromUi:\s*true|releaseNotesCreationAllowedFromUi:\s*true|releaseNotesPublishAllowedFromUi:\s*true|releaseNotesExportAllowedFromUi:\s*true|publishBeta\s*\(|releaseBeta\s*\(|publishRelease\s*\(|createReleaseNotes\s*\(|publishReleaseNotes\s*\(|exportReleaseNotes\s*\("
  "no provider connection traffic API or live tests" = "providerApiCallsAllowedFromUi:\s*true|providerConnectionAllowedFromUi:\s*true|providerConnectionTestsAllowedFromUi:\s*true|liveProviderTrafficAllowedFromUi:\s*true|callProviderApi\s*\(|connectProvider\s*\(|testProviderConnection\s*\(|routeLiveProviderTraffic\s*\("
  "no local model or local bridge endpoint calls" = "localModelCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|callLocalModel\s*\(|runLocalModel\s*\(|callLocalBridge\s*\(|callLocalService\s*\("
  "no connector web search or GitHub API calls" = "connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|callConnectorApi\s*\(|callSearchProvider\s*\(|callGithubApi\s*\(|fetch\s*\(|XMLHttpRequest|axios"
  "no prompt file project connector provider or model data sends" = "promptFileProjectConnectorProviderModelDataAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendProjectData\s*\(|sendConnectorData\s*\(|sendProviderData\s*\(|sendModelData\s*\("
  "no arbitrary project scanning local file browsing path crawling or file open" = "arbitraryProjectScanningAllowed:\s*true|arbitraryLocalFileBrowsingAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|scanLocalProject\s*\(|browseLocalFiles\s*\(|crawlPath\s*\(|readFile\s*\(|openFile\s*\("
  "no git shell command test build or smoke execution" = "gitCommandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|runGit\s*\(|runCommand\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|child_process|execSync|spawn\s*\("
  "no file mutation write export patch or deletion" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|exportFile\s*\(|downloadFile\s*\(|applyPatch\s*\(|applyDiff\s*\(|deleteFile\s*\("
  "no memory RAG or Brain graph mutation" = "memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|ingestMemory\s*\(|ingestRag\s*\(|promoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\("
  "no reminder schedule automation background notification or polling" = "reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|createReminder\s*\(|scheduleTask\s*\(|createAutomation\s*\(|createBackgroundJob\s*\(|sendNotification\s*\(|setInterval\s*\(|setTimeout\s*\("
  "no plugin tool agent extension or MCP execution" = "pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|extensionRuntimeExecutorCreated:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createExtensionRuntimeExecutor\s*\(|createMcpServer\s*\(|callMcpTool\s*\("
  "no browser token endpoint secret or env exposure" = "tokenStorageAllowed:\s*true|endpointStorageAllowed:\s*true|localStorageTokenStorageAllowed:\s*true|sessionStorageTokenStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|sessionStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem|processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no route coverage removal vendoring package install or duplicate keys" = "routeCoverageRemovalAllowed:\s*true|thirdPartyCodeVendoredOrCopied:\s*true|packageInstallAllowedFromUi:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|key=\{label\}|key=\{summary\}|key=\{item\}|key=\{index\}|key=\{i\}"
  "no deterministic API misuse" = "Math\.random\s*\(|Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no deterministic API misuse") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Beta Release Candidate smoke passed."
