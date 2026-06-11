param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\coding-workflow-readiness-audit"
$route = "src\app\coding-workflow-readiness-audit"
$newRoutes = @(
  "/creative-workflow-readiness-audit",
  "/research-workflow-readiness-audit",
  "/coding-workflow-readiness-audit",
  "/operator-cockpit-release-candidate"
)

$phaseMarkers = @(
  "Coding workflow readiness audit",
  "Coding readiness audit does not apply code",
  "Code changes require explicit operator approval",
  "Validation is required before merge",
  "Supported coding workflow groups",
  "Approval and apply gates"
)

$workflowSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no coding workflow execution",
  "no coding workflow execution from UI",
  "no patch apply behavior",
  "no code apply behavior",
  "no git command execution from UI",
  "no shell command execution from UI",
  "no shell command execution",
  "no command execution",
  "no test/build/smoke execution from UI",
  "no test execution from UI",
  "no build execution from UI",
  "no smoke execution from UI",
  "no commit creation from UI",
  "no release/publish behavior",
  "no provider API calls",
  "no connector API calls",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no creative asset generation",
  "no local tool launching",
  "no research execution",
  "no browsing/search/fetching from UI",
  "no evidence ingestion automation",
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
  "advanced coding readiness details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 408 Coding Workflow Readiness Audit" `
  -ScriptFile "smoke-codexforge-coding-workflow-readiness-audit.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CodingWorkflowReadinessAuditPanel" `
  -CommandLabel "Go to Coding Workflow Readiness Audit" `
  -Modules @("coding-workflow-readiness-audit-types.ts","coding-workflow-readiness-audit-summary.ts","index.ts") `
  -Components @("CodingWorkflowReadinessAuditPanel.tsx","index.ts") `
  -Exports @("buildCodingWorkflowReadinessAuditStableKey","buildCodingWorkflowReadinessAudit","buildCodingWorkflowReadinessAudits","buildCodingWorkflowReadinessAuditBoundary","buildCodingWorkflowReadinessAuditModel","summarizeCodingWorkflowReadinessAudit","CODING_WORKFLOW_READINESS_AUDIT_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("coding workflow readiness identity","repo/project boundary summary","validation checklist","denied coding actions","blocked coding readiness risks","creative readiness route","operator cockpit route","next recommended action","coding workflow readiness language") + $workflowSafetyMarkers) `
  -ExtraRoutes @("/creative-workflow-readiness-audit","/operator-cockpit-release-candidate","/code-flow/rc","/apply-guard-review")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "codingWorkflowExecutionAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|codeApplyAllowedFromUi:\s*true|runCodingWorkflow\s*\(|applyPatch\s*\(|applyDiff\s*\(|applyCode\s*\(" "no coding workflow execution patch apply or code apply"
Assert-NotMatches $source "testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|testBuildSmokeExecutionAllowedFromUi:\s*true|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|executeTests\s*\(" "no test build or smoke execution from UI"
Assert-NotMatches $source "shellExecutionAllowedFromUi:\s*true|gitCommandExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|runCommand\s*\(|runGit\s*\(|createCommit\s*\(|git\s+(log|show|status|diff|commit|push)" "no shell git command or commit execution from UI"
Assert-NotMatches $source "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|mutateFiles\s*\(" "no file mutation write or deletion"
Assert-NotMatches $source "actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|approveAction\s*\(|autoApprove\s*\(" "no approval automation"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Coding Workflow Readiness Audit smoke passed."
