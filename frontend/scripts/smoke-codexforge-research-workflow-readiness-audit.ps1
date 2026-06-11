param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\research-workflow-readiness-audit"
$route = "src\app\research-workflow-readiness-audit"
$newRoutes = @(
  "/creative-workflow-readiness-audit",
  "/research-workflow-readiness-audit",
  "/coding-workflow-readiness-audit",
  "/operator-cockpit-release-candidate"
)

$phaseMarkers = @(
  "Research workflow readiness audit",
  "Research readiness audit does not run research",
  "Research execution requires explicit operator approval",
  "Evidence is not ingested automatically",
  "Supported research workflow groups",
  "Freshness conflict checklist"
)

$workflowSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no research execution",
  "no research execution from UI",
  "no browsing/search/fetching from UI",
  "no automatic web browsing",
  "no browse from UI",
  "no search execution from UI",
  "no source fetching from UI",
  "no external data fetching",
  "no evidence ingestion automation",
  "no evidence auto-ingestion",
  "no source auto-fetching",
  "no source auto-ingestion",
  "no provider API calls",
  "no connector API calls",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no creative asset generation",
  "no local tool launching",
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
  "advanced research readiness details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 407 Research Workflow Readiness Audit" `
  -ScriptFile "smoke-codexforge-research-workflow-readiness-audit.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ResearchWorkflowReadinessAuditPanel" `
  -CommandLabel "Go to Research Workflow Readiness Audit" `
  -Modules @("research-workflow-readiness-audit-types.ts","research-workflow-readiness-audit-summary.ts","index.ts") `
  -Components @("ResearchWorkflowReadinessAuditPanel.tsx","index.ts") `
  -Exports @("buildResearchWorkflowReadinessAuditStableKey","buildResearchWorkflowReadinessAudit","buildResearchWorkflowReadinessAudits","buildResearchWorkflowReadinessAuditBoundary","buildResearchWorkflowReadinessAuditModel","summarizeResearchWorkflowReadinessAudit","RESEARCH_WORKFLOW_READINESS_AUDIT_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("research workflow readiness identity","evidence dependency summary","connector/provider boundary summary","denied research actions","blocked research readiness risks","coding readiness route","operator cockpit route","next recommended action","research workflow readiness language") + $workflowSafetyMarkers) `
  -ExtraRoutes @("/coding-workflow-readiness-audit","/operator-cockpit-release-candidate","/research-workspace-release-candidate","/research-report-export-review")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "researchExecutionAllowedFromUi:\s*true|browsingAllowedFromUi:\s*true|searchAllowedFromUi:\s*true|sourceFetchAllowedFromUi:\s*true|externalDataFetchingAllowedFromUi:\s*true|runResearch\s*\(|browseWeb\s*\(|runSearch\s*\(|executeSearch\s*\(|fetchSource\s*\(|collectSource\s*\(" "no research browsing search fetching or collection"
Assert-NotMatches $source "evidenceIngestionAllowedFromUi:\s*true|evidenceAutoIngestionAllowed:\s*true|sourceAutoIngestionAllowed:\s*true|sourceAutoFetchAllowed:\s*true|ingestEvidence\s*\(|ingestSource\s*\(|ingestMemory\s*\(|promoteMemory\s*\(" "no evidence source or memory ingestion automation"
Assert-NotMatches $source "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|callProviderApi\s*\(|callConnectorApi\s*\(|callSearchProvider\s*\(|callGithubApi\s*\(|callLocalBridge\s*\(" "no provider connector web GitHub or local bridge calls"
Assert-NotMatches $source "actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|approveAction\s*\(|autoApprove\s*\(" "no approval automation"
Assert-NotMatches $source "promptFileProjectConnectorProviderWorkflowDataAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendProjectData\s*\(|sendConnectorData\s*\(|sendProviderData\s*\(|sendWorkflowData\s*\(" "no prompt file project connector provider or workflow data sending without approval"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Research Workflow Readiness Audit smoke passed."
