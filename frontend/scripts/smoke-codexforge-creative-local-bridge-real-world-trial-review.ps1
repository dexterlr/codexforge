param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\creative-local-bridge-real-world-trial-review"
$route = "src\app\creative-local-bridge-real-world-trial-review"
$protectedRoutes = @(
  "/creative-local-bridge-real-world-trial-review",
  "/provider-governance-real-world-trial-review",
  "/project-knowledge-real-world-trial-review",
  "/unified-workspace-real-world-trial-report"
)

$phaseMarkers = @(
  "Creative local bridge real-world trial review",
  "Creative local bridge trial review does not launch local tools",
  "Render and generation jobs require explicit approval",
  "Artifacts are reviewed before use",
  "Local bridge tool readiness summary",
  "Provider governance trial route"
)

$sharedRealWorldSafetyMarkers = @(
  "real-world trial review",
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
  -PhaseName "Phase 366 Creative Local Bridge Real-World Trial Review" `
  -ScriptFile "smoke-codexforge-creative-local-bridge-real-world-trial-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CreativeLocalBridgeRealWorldTrialReviewPanel" `
  -CommandLabel "Go to Creative Local Bridge Real-World Trial Review" `
  -Modules @("creative-local-bridge-real-world-trial-review-types.ts","creative-local-bridge-real-world-trial-review-summary.ts","index.ts") `
  -Components @("CreativeLocalBridgeRealWorldTrialReviewPanel.tsx","index.ts") `
  -Exports @("buildCreativeLocalBridgeRealWorldTrialReviewStableKey","buildCreativeLocalBridgeRealWorldTrialReview","buildCreativeLocalBridgeRealWorldTrialReviews","buildCreativeLocalBridgeRealWorldTrialReviewBoundary","buildCreativeLocalBridgeRealWorldTrialReviewModel","summarizeCreativeLocalBridgeRealWorldTrialReview","CREATIVE_LOCAL_BRIDGE_REAL_WORLD_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("Creative trial identity","Source first real operator workflow trial","Operator creative scenario","Blender/Unreal/ComfyUI boundary summary","Render/generation approval gates","Artifact review checklist","Blocked real actions","Trial outcome notes","advanced creative trial details collapsed/secondary") + $sharedRealWorldSafetyMarkers) `
  -ExtraRoutes @("/first-real-operator-workflow-trial","/creative-bridge","/creative-sandbox","/provider-governance-real-world-trial-review")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"

$blockedPatterns = @{
  "no local bridge endpoint calls" = "localBridgeEndpointCallsAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|callLocalBridge\s*\(|localBridgeRequest\s*\("
  "no Blender Unreal ComfyUI local tool launch behavior" = "localToolLaunchAllowedFromUi:\s*true|blenderLaunchAllowedFromUi:\s*true|unrealLaunchAllowedFromUi:\s*true|comfyUiLaunchAllowedFromUi:\s*true|launchBlender\s*\(|launchUnreal\s*\(|launchComfyUi\s*\(|Start-Process"
  "no render generation job execution" = "renderGenerationJobExecutionAllowedFromUi:\s*true|runRenderJob\s*\(|startRender\s*\(|runGenerationJob\s*\(|generateImage\s*\(|generateVideo\s*\(|queue_prompt"
  "no provider connector web API calls" = "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|callProviderApi\s*\(|callConnectorApi\s*\(|sendSearchRequest\s*\("
  "no prompt file project connector data sending" = "promptFileProjectConnectorDataAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendProjectData\s*\(|sendConnectorData\s*\("
  "no file mutation export or deletion" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|downloadFile\s*\(|exportFile\s*\(|deleteFile\s*\("
  "no workflow command git test build smoke execution" = "workflowExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|gitCommandExecutionAllowedFromUi:\s*true|testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|runWorkflow\s*\(|runCommand\s*\(|runGit\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\("
  "no memory or Brain graph mutation" = "memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|appendEvent\s*\(|saveBrainGraph\s*\("
  "no automation background notification polling" = "reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|setInterval\s*\(|setTimeout\s*\("
  "no plugin tool agent MCP execution" = "pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|callMcpTool\s*\("
  "no secrets token storage or env printing" = "localStorageApiKeyStorageAllowed:\s*true|tokenStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem|processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no duplicate React key patterns" = "key=\{label\}|key=\{summary\}|key=\{item\}"
}

foreach ($name in $blockedPatterns.Keys) {
  Assert-NotMatches $source $blockedPatterns[$name] $name
}

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Creative Local Bridge Real-World Trial Review smoke passed."
