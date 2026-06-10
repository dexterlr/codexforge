param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\first-real-operator-workflow-trial"
$route = "src\app\first-real-operator-workflow-trial"
$protectedRoutes = @(
  "/project-knowledge-release-candidate",
  "/unified-workspace-home-review",
  "/workspace-navigation-consolidation-review",
  "/cross-loop-result-handoff-review",
  "/cross-loop-safety-audit-inbox",
  "/operator-dashboard-release-candidate",
  "/mvp-end-to-end-guided-trial",
  "/mvp-hardening-regression-matrix",
  "/codexforge-foundation-release-candidate",
  "/foundation-release-runbook-finalization",
  "/first-real-operator-workflow-trial",
  "/review-inbox"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 361 First Real Operator Workflow Trial" `
  -ScriptFile "smoke-codexforge-first-real-operator-workflow-trial.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FirstRealOperatorWorkflowTrialPanel" `
  -CommandLabel "Go to First Real Operator Workflow Trial" `
  -Modules @("first-real-operator-workflow-trial-types.ts","first-real-operator-workflow-trial-summary.ts","index.ts") `
  -Components @("FirstRealOperatorWorkflowTrialPanel.tsx","index.ts") `
  -Exports @("buildFirstRealOperatorWorkflowTrialStableKey","buildFirstRealOperatorWorkflowTrial","buildFirstRealOperatorWorkflowTrials","buildFirstRealOperatorWorkflowTrialBoundary","buildFirstRealOperatorWorkflowTrialModel","summarizeFirstRealOperatorWorkflowTrial","FIRST_REAL_OPERATOR_WORKFLOW_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First real operator workflow trial","First real workflow trial requires explicit approval","No real action runs from this page","Blocked actions remain blocked until approved","Operator scenario","Manual validation checklist") `
  -PlainEnglish @("Workflow trial identity","Source release runbook","Trial preparation checklist","Approval gates","Blocked real actions","Real-world trial report route","Blocked reasons","guided and approval-gated","advanced workflow trial details collapsed/secondary","review-only","approval required","no release/shipping execution","no build execution from UI","no smoke execution from UI","no workflow execution","no file export/write behavior","no token storage","no localStorage/sessionStorage token storage","no prompt/file/project/connector data sending without approval","No route coverage removal","no duplicate route hrefs","no duplicate shortLabel values") `
  -ExtraRoutes @("/foundation-release-runbook-finalization","/codexforge-foundation-release-candidate","/mvp-hardening-regression-matrix","/review-inbox")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "actionsExecutedFromUi:\s*true|executeAction\s*\(|runRealAction\s*\(" "no real action runs from this page"
Assert-NotMatches $source "workflowExecutionAllowedFromUi:\s*true|workflowAutomaticRunAllowed:\s*true|runWorkflow\s*\(|executeWorkflow\s*\(" "no workflow execution"
Assert-NotMatches $source "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|callProviderApi\s*\(|callConnectorApi\s*\(|callSearchProvider\s*\(" "no provider connector or web/search API calls"
Assert-NotMatches $source "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|gitCommandExecutionAllowedFromUi:\s*true|runCommand\s*\(|spawn\s*\(|execSync" "no command execution"
Assert-NotMatches $source "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|memoryIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|writeFile\s*\(|ingestMemory\s*\(|autoPromoteMemory\s*\(" "no file or memory mutation"
Assert-NotMatches $source "pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|mcpRuntimeCreated:\s*true|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createMcpServer\s*\(" "no plugin tool agent or MCP execution"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge First Real Operator Workflow Trial smoke passed."
