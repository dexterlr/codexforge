param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\foundation-release-runbook-finalization"
$route = "src\app\foundation-release-runbook-finalization"
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
  "/first-real-operator-workflow-trial"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 360 Foundation Release Runbook Finalization" `
  -ScriptFile "smoke-codexforge-foundation-release-runbook-finalization.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FoundationReleaseRunbookFinalizationPanel" `
  -CommandLabel "Go to Foundation Release Runbook Finalization" `
  -Modules @("foundation-release-runbook-finalization-types.ts","foundation-release-runbook-finalization-summary.ts","index.ts") `
  -Components @("FoundationReleaseRunbookFinalizationPanel.tsx","index.ts") `
  -Exports @("buildFoundationReleaseRunbookFinalizationStableKey","buildFoundationReleaseRunbookFinalization","buildFoundationReleaseRunbookFinalizations","buildFoundationReleaseRunbookFinalizationBoundary","buildFoundationReleaseRunbookFinalizationModel","summarizeFoundationReleaseRunbookFinalization","FOUNDATION_RELEASE_RUNBOOK_FINALIZATION_LANGUAGE") `
  -PhaseMarkers @("Foundation release runbook finalization","Release runbooks are reviewed before use","No release runbook file is written from this page","Secrets and private values are excluded","Release checklist","Operator handoff checklist") `
  -PlainEnglish @("Release runbook identity","Source foundation release candidate","Validation checklist","Rollback/recovery checklist","Privacy/secrets checklist","First real workflow route","Blocked reasons","advanced runbook details collapsed/secondary","review-only","approval required","no release/shipping execution","no build execution from UI","no smoke execution from UI","no workflow execution","no file export/write behavior","no runbook export/write behavior","no token storage","no localStorage/sessionStorage token storage","no prompt/file/project/connector data sending without approval","No route coverage removal","no duplicate route hrefs","no duplicate shortLabel values") `
  -ExtraRoutes @("/codexforge-foundation-release-candidate","/mvp-hardening-regression-matrix","/cross-loop-safety-audit-inbox","/first-real-operator-workflow-trial")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "runbookExportAllowedFromUi:\s*true|runbookFileWriteAllowedFromUi:\s*true|runbookFileWrittenFromPage:\s*true|exportRunbook\s*\(|writeRunbook\s*\(" "no runbook export/write behavior"
Assert-NotMatches $source "fileWriteAllowedFromUi:\s*true|writeFile\s*\(" "no file write"
Assert-NotMatches $source "fileExportAllowedFromUi:\s*true|downloadFile\s*\(|exportFile\s*\(" "no file export/write behavior"
Assert-NotMatches $source "releaseShippingExecutionAllowedFromUi:\s*true|shipRelease\s*\(|publishRelease\s*\(|deployRelease\s*\(" "no release/shipping execution"
Assert-NotMatches $source "secretValuesDisplayedAllowed:\s*true|apiKeysDisplayedAllowed:\s*true|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}" "no API keys or secrets displayed"
Assert-NotMatches $source "workflowExecutionAllowedFromUi:\s*true|workflowAutomaticRunAllowed:\s*true|runWorkflow\s*\(|executeWorkflow\s*\(" "no workflow execution"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Foundation Release Runbook Finalization smoke passed."
