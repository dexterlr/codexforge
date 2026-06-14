param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\unified-result-policy-final-review"
$route = "src\app\unified-result-policy-final-review"
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
  "Unified result policy final review",
  "Unified result policy final review does not apply result policy",
  "Result policy changes require explicit operator approval",
  "Unsafe results remain blocked",
  "Result groups",
  "Reuse checklist"
)
$plainEnglish = @(
  "unified result policy identity",
  "acceptance checklist",
  "rejection checklist",
  "safety review checklist",
  "denied result shortcuts",
  "unresolved result blockers",
  "recovery policy route",
  "settings route",
  "next recommended action",
  "advanced result policy details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 493 Unified Result Policy Final Review" `
  -ScriptFile "smoke-codexforge-unified-result-policy-final-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "UnifiedResultPolicyFinalReviewPanel" `
  -CommandLabel "Go to Unified Result Policy Final Review" `
  -Modules @("unified-result-policy-final-review-types.ts","unified-result-policy-final-review-summary.ts","index.ts") `
  -Components @("UnifiedResultPolicyFinalReviewPanel.tsx","index.ts") `
  -Exports @("buildUnifiedResultPolicyFinalReviewStableKey","buildUnifiedResultPolicyFinalReview","buildUnifiedResultPolicyFinalReviews","buildUnifiedResultPolicyFinalReviewBoundary","buildUnifiedResultPolicyFinalReviewModel","summarizeUnifiedResultPolicyFinalReview","UNIFIED_RESULT_POLICY_FINAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/unified-evidence-policy-final-review","/unified-recovery-policy-final-review","/unified-settings-preferences-review","/live-workflow-result-review-inbox")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Unified Result Policy Final Review smoke passed."
