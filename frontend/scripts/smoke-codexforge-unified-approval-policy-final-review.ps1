param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\unified-approval-policy-final-review"
$route = "src\app\unified-approval-policy-final-review"
$newRoutes = @(
  "/provider-local-connector-automation-cohesion-review",
  "/unified-approval-policy-final-review",
  "/unified-evidence-policy-final-review",
  "/unified-result-policy-final-review",
  "/unified-recovery-policy-final-review",
  "/unified-settings-preferences-review",
  "/daily-operator-cockpit-final-polish",
  "/global-command-palette-final-polish"
)
$deterministicMarkerFallback = @(
  "no Math.random",
  "no Date.now",
  "no Date.now for deterministic layout/ids",
  "no appendEvent/saveBrainGraph calls from UI",
  "no direct appendEvent call from UI",
  "no direct saveBrainGraph call from UI",
  "no direct apply-diff call from UI",
  "no direct write-file call from UI",
  "no direct run-command call from UI",
  "no broker-execution call except blocked-policy text"
)
$phaseMarkers = @(
  "Unified approval policy final review",
  "Unified approval policy final review does not apply approval policy",
  "Approval policy changes require explicit operator approval",
  "Denied approval shortcuts stay blocked",
  "Approval groups",
  "Audit trail checklist"
)
$plainEnglish = @(
  "unified approval policy identity",
  "provider/local/connector/automation approval gates",
  "denied approval shortcuts",
  "rollback checklist",
  "unresolved approval blockers",
  "evidence policy route",
  "result policy route",
  "next recommended action",
  "no approval policy mutation",
  "advanced approval policy details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 491 Unified Approval Policy Final Review" `
  -ScriptFile "smoke-codexforge-unified-approval-policy-final-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "UnifiedApprovalPolicyFinalReviewPanel" `
  -CommandLabel "Go to Unified Approval Policy Final Review" `
  -Modules @("unified-approval-policy-final-review-types.ts","unified-approval-policy-final-review-summary.ts","index.ts") `
  -Components @("UnifiedApprovalPolicyFinalReviewPanel.tsx","index.ts") `
  -Exports @("buildUnifiedApprovalPolicyFinalReviewStableKey","buildUnifiedApprovalPolicyFinalReview","buildUnifiedApprovalPolicyFinalReviews","buildUnifiedApprovalPolicyFinalReviewBoundary","buildUnifiedApprovalPolicyFinalReviewModel","summarizeUnifiedApprovalPolicyFinalReview","UNIFIED_APPROVAL_POLICY_FINAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/provider-local-connector-automation-cohesion-review","/unified-evidence-policy-final-review","/unified-result-policy-final-review","/approval-queue")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Unified Approval Policy Final Review smoke passed."
