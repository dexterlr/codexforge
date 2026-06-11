param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\creative-workflow-readiness-audit"
$route = "src\app\creative-workflow-readiness-audit"
$newRoutes = @(
  "/creative-workflow-readiness-audit",
  "/research-workflow-readiness-audit",
  "/coding-workflow-readiness-audit",
  "/operator-cockpit-release-candidate"
)

$phaseMarkers = @(
  "Creative workflow readiness audit",
  "Creative readiness audit does not generate assets",
  "Creative execution requires explicit operator approval",
  "Blocked creative actions stay blocked",
  "Supported creative workflow groups",
  "Local bridge dependency summary"
)

$workflowSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no creative workflow execution",
  "no creative workflows run from UI",
  "no creative asset generation",
  "no asset generation from UI",
  "no media generation from UI",
  "no local tool launching",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no provider API calls",
  "no connector API calls",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no research execution",
  "no browsing/search/fetching from UI",
  "no evidence ingestion automation",
  "no coding workflow execution",
  "no test/build/smoke execution from UI",
  "no release/publish behavior",
  "no prompt/file/project/connector/provider/workflow data sending without approval",
  "no prompt/file/project/connector data sending without approval",
  "no prompt/file/project data sending without approval",
  "no file export/write behavior",
  "no export/write behavior",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no token storage",
  "no localStorage/sessionStorage token storage",
  "no sessionStorage API key storage",
  "no localStorage writes",
  "no sessionStorage writes",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no duplicate menus",
  "advanced creative readiness details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 406 Creative Workflow Readiness Audit" `
  -ScriptFile "smoke-codexforge-creative-workflow-readiness-audit.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CreativeWorkflowReadinessAuditPanel" `
  -CommandLabel "Go to Creative Workflow Readiness Audit" `
  -Modules @("creative-workflow-readiness-audit-types.ts","creative-workflow-readiness-audit-summary.ts","index.ts") `
  -Components @("CreativeWorkflowReadinessAuditPanel.tsx","index.ts") `
  -Exports @("buildCreativeWorkflowReadinessAuditStableKey","buildCreativeWorkflowReadinessAudit","buildCreativeWorkflowReadinessAudits","buildCreativeWorkflowReadinessAuditBoundary","buildCreativeWorkflowReadinessAuditModel","summarizeCreativeWorkflowReadinessAudit","CREATIVE_WORKFLOW_READINESS_AUDIT_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("creative workflow readiness identity","provider dependency summary","manual validation checklist","denied creative actions","blocked creative readiness risks","research readiness route","operator cockpit route","next recommended action","creative workflow readiness language") + $workflowSafetyMarkers) `
  -ExtraRoutes @("/research-workflow-readiness-audit","/operator-cockpit-release-candidate","/local-bridge-readiness-audit","/creative-readiness")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "creativeWorkflowExecutionAllowedFromUi:\s*true|assetGenerationAllowedFromUi:\s*true|mediaGenerationAllowedFromUi:\s*true|imageGenerationAllowedFromUi:\s*true|videoGenerationAllowedFromUi:\s*true|runCreativeWorkflow\s*\(|generateAsset\s*\(|createAsset\s*\(|generateImage\s*\(|generateVideo\s*\(|createImage\s*\(|createVideo\s*\(" "no creative workflow execution or creative asset generation"
Assert-NotMatches $source "localToolLaunchingAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|launchLocalTool\s*\(|launchCreativeTool\s*\(|callLocalBridge\s*\(|callLocalService\s*\(" "no local tool launching or local bridge endpoint calls"
Assert-NotMatches $source "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|callProviderApi\s*\(|callCreativeProvider\s*\(|callConnectorApi\s*\(|callSearchProvider\s*\(|callGithubApi\s*\(" "no provider connector web or GitHub API calls"
Assert-NotMatches $source "actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|approveAction\s*\(|autoApprove\s*\(" "no approval automation"
Assert-NotMatches $source "promptFileProjectConnectorProviderWorkflowDataAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendProjectData\s*\(|sendConnectorData\s*\(|sendProviderData\s*\(|sendWorkflowData\s*\(" "no prompt file project connector provider or workflow data sending without approval"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Creative Workflow Readiness Audit smoke passed."
