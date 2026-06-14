param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\unified-recovery-policy-final-review"
$route = "src\app\unified-recovery-policy-final-review"
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
  "Unified recovery policy final review",
  "Unified recovery policy final review does not trigger recovery",
  "Recovery policy changes require explicit operator approval",
  "Unsafe recovery shortcuts stay blocked",
  "Recovery groups",
  "Provider local connector automation recovery matrix"
)
$plainEnglish = @(
  "unified recovery policy identity",
  "rollback checklist",
  "escalation checklist",
  "denied recovery shortcuts",
  "unresolved recovery blockers",
  "settings route",
  "cockpit final polish route",
  "next recommended action",
  "no recovery execution",
  "advanced recovery policy details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 494 Unified Recovery Policy Final Review" `
  -ScriptFile "smoke-codexforge-unified-recovery-policy-final-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "UnifiedRecoveryPolicyFinalReviewPanel" `
  -CommandLabel "Go to Unified Recovery Policy Final Review" `
  -Modules @("unified-recovery-policy-final-review-types.ts","unified-recovery-policy-final-review-summary.ts","index.ts") `
  -Components @("UnifiedRecoveryPolicyFinalReviewPanel.tsx","index.ts") `
  -Exports @("buildUnifiedRecoveryPolicyFinalReviewStableKey","buildUnifiedRecoveryPolicyFinalReview","buildUnifiedRecoveryPolicyFinalReviews","buildUnifiedRecoveryPolicyFinalReviewBoundary","buildUnifiedRecoveryPolicyFinalReviewModel","summarizeUnifiedRecoveryPolicyFinalReview","UNIFIED_RECOVERY_POLICY_FINAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/unified-result-policy-final-review","/unified-settings-preferences-review","/daily-operator-cockpit-final-polish","/live-trial-failure-recovery-review")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Unified Recovery Policy Final Review smoke passed."
