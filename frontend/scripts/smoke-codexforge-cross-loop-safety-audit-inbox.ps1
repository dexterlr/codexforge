param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\cross-loop-safety-audit-inbox"
$route = "src\app\cross-loop-safety-audit-inbox"
$protectedRoutes = @(
  "/project-knowledge-release-candidate",
  "/unified-workspace-home-review",
  "/workspace-navigation-consolidation-review",
  "/cross-loop-result-handoff-review",
  "/cross-loop-safety-audit-inbox",
  "/operator-dashboard-release-candidate",
  "/mvp-end-to-end-guided-trial"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 355 Cross-Loop Safety Audit Inbox" `
  -ScriptFile "smoke-codexforge-cross-loop-safety-audit-inbox.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CrossLoopSafetyAuditInboxPanel" `
  -CommandLabel "Go to Cross-Loop Safety Audit Inbox" `
  -Modules @("cross-loop-safety-audit-inbox-types.ts","cross-loop-safety-audit-inbox-summary.ts","index.ts") `
  -Components @("CrossLoopSafetyAuditInboxPanel.tsx","index.ts") `
  -Exports @("buildCrossLoopSafetyAuditInboxStableKey","buildCrossLoopSafetyAuditInboxItem","buildCrossLoopSafetyAuditInboxItems","buildCrossLoopSafetyAuditInboxBoundary","buildCrossLoopSafetyAuditInboxModel","summarizeCrossLoopSafetyAuditInbox","CROSS_LOOP_SAFETY_AUDIT_INBOX_LANGUAGE") `
  -PhaseMarkers @("Cross-loop safety audit inbox","Safety audit items are reviewed before release","Unresolved audit items stay blocked","No action is executed from this page","Approval gate checks","Memory boundary checks") `
  -PlainEnglish @("Audit inbox identity","Source handoff review","Audited loop boundaries","Privacy/redaction checks","Execution boundary checks","Unresolved audit items","Dashboard route","Blocked reasons","review-only","approval required","advanced audit details collapsed/secondary","no workflow execution","no workflow runs automatically","no file export/write behavior","no token storage","no localStorage/sessionStorage token storage","No route coverage removal","no duplicate route hrefs","no duplicate shortLabel values") `
  -ExtraRoutes @("/cross-loop-result-handoff-review","/operator-dashboard-release-candidate","/provider-policy-bundle-export-review","/project-memory-promotion-boundary")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "workflowExecutionAllowedFromUi:\s*true|workflowAutomaticRunAllowed:\s*true|runWorkflow\s*\(|executeWorkflow\s*\(" "no workflow execution"
Assert-NotMatches $source "tokenStorageAllowed:\s*true|localStorageTokenStorageAllowed:\s*true|sessionStorageTokenStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem" "no token storage"
Assert-NotMatches $source "fileExportAllowedFromUi:\s*true|downloadFile\s*\(|exportFile\s*\(" "no export/write behavior"
Assert-NotMatches $source "routeCoverageRemovalAllowed:\s*true|removeRoute\s*\(|deleteRoute\s*\(" "no route coverage removal"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Cross-Loop Safety Audit Inbox smoke passed."
