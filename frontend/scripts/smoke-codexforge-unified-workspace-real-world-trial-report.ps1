param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\unified-workspace-real-world-trial-report"
$route = "src\app\unified-workspace-real-world-trial-report"
$protectedRoutes = @(
  "/creative-local-bridge-real-world-trial-review",
  "/provider-governance-real-world-trial-review",
  "/project-knowledge-real-world-trial-review",
  "/unified-workspace-real-world-trial-report"
)

$phaseMarkers = @(
  "Unified workspace real-world trial report",
  "Unified trial report is reviewed before export or use",
  "No report file is written from this page",
  "Unresolved loop risks stay blocked",
  "Release readiness recommendation",
  "Daily operator polish route"
)

$sharedRealWorldSafetyMarkers = @(
  "real-world trial report",
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no local bridge endpoint calls",
  "no Blender/Unreal/ComfyUI/local tool launch behavior",
  "no render/generation job execution",
  "no provider API calls",
  "no token spending",
  "no connector API calls",
  "no web/search API calls",
  "no source fetching/browsing",
  "no prompt/file/project/connector data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no git command execution from UI",
  "no shell command execution",
  "no test/build/smoke execution from UI",
  "no file mutation",
  "no file write",
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
  "no localStorage API key storage",
  "no token storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "No route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "server-only path boundary markers remain intact"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 369 Unified Workspace Real-World Trial Report" `
  -ScriptFile "smoke-codexforge-unified-workspace-real-world-trial-report.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "UnifiedWorkspaceRealWorldTrialReportPanel" `
  -CommandLabel "Go to Unified Workspace Real-World Trial Report" `
  -Modules @("unified-workspace-real-world-trial-report-types.ts","unified-workspace-real-world-trial-report-summary.ts","index.ts") `
  -Components @("UnifiedWorkspaceRealWorldTrialReportPanel.tsx","index.ts") `
  -Exports @("buildUnifiedWorkspaceRealWorldTrialReportStableKey","buildUnifiedWorkspaceRealWorldTrialReport","buildUnifiedWorkspaceRealWorldTrialReports","buildUnifiedWorkspaceRealWorldTrialReportBoundary","buildUnifiedWorkspaceRealWorldTrialReportModel","summarizeUnifiedWorkspaceRealWorldTrialReport","UNIFIED_WORKSPACE_REAL_WORLD_TRIAL_REPORT_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("Unified report identity","Source real-world trial reviews","Coding trial outcome","Research trial outcome","Connector trial outcome","Automation trial outcome","Creative/local bridge trial outcome","Provider governance trial outcome","Project knowledge trial outcome","Cross-loop risks","Blocked reasons","advanced report details collapsed/secondary") + $sharedRealWorldSafetyMarkers) `
  -ExtraRoutes @("/coding-loop-real-world-trial-review","/creative-local-bridge-real-world-trial-review","/project-knowledge-real-world-trial-review","/code-flow/final-polish")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"

$blockedPatterns = @{
  "no report export or report file write" = "\breportExportAllowedFromUi:\s*true|\breportFileWrittenFromPage:\s*true|\bfileExportAllowedFromUi:\s*true|\bfileWriteAllowedFromUi:\s*true|exportReport\s*\(|writeReport\s*\(|downloadFile\s*\(|exportFile\s*\("
  "no workflow command git test build smoke execution" = "workflowExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|gitCommandExecutionAllowedFromUi:\s*true|testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|runWorkflow\s*\(|runCommand\s*\(|runGit\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\("
  "no provider connector web or source calls" = "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|sourceAutoFetchAllowed:\s*true|fetch\s*\(|XMLHttpRequest|axios|callProviderApi\s*\(|callConnectorApi\s*\(|sendSearchRequest\s*\("
  "no local bridge or creative job execution" = "callLocalBridge\s*\(|launchBlender\s*\(|launchUnreal\s*\(|launchComfyUi\s*\(|runRenderJob\s*\(|runGenerationJob\s*\("
  "no prompt file project connector data sending" = "promptFileProjectConnectorDataAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendProjectData\s*\(|sendConnectorData\s*\("
  "no project scan file browse or git file reads" = "arbitraryProjectScanningAllowed:\s*true|arbitraryLocalFileBrowsingAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|scanLocalProject\s*\(|readFile\s*\(|openFile\s*\("
  "no file mutation patch or deletion" = "fileMutationAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|applyPatch\s*\(|applyDiff\s*\(|deleteFile\s*\("
  "no memory or Brain graph mutation" = "memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|appendEvent\s*\(|saveBrainGraph\s*\("
  "no automations background notifications or polling" = "reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|setInterval\s*\(|setTimeout\s*\("
  "no plugin tool agent MCP execution" = "pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|callMcpTool\s*\("
  "no secrets token storage or env printing" = "localStorageApiKeyStorageAllowed:\s*true|tokenStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem|processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no duplicate React key patterns" = "key=\{label\}|key=\{summary\}|key=\{item\}"
}

foreach ($name in $blockedPatterns.Keys) {
  Assert-NotMatches $source $blockedPatterns[$name] $name
}

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Unified Workspace Real-World Trial Report smoke passed."
