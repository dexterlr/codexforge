param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\unified-evidence-policy-final-review"
$route = "src\app\unified-evidence-policy-final-review"
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
  "Unified evidence policy final review",
  "Unified evidence policy final review does not apply evidence policy",
  "Evidence policy changes require explicit operator approval",
  "Private evidence remains redacted",
  "Evidence groups",
  "Citation source checklist"
)
$plainEnglish = @(
  "unified evidence policy identity",
  "capture checklist",
  "redaction/privacy checklist",
  "retention checklist",
  "denied evidence shortcuts",
  "unresolved evidence blockers",
  "result policy route",
  "recovery policy route",
  "next recommended action",
  "advanced evidence policy details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 492 Unified Evidence Policy Final Review" `
  -ScriptFile "smoke-codexforge-unified-evidence-policy-final-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "UnifiedEvidencePolicyFinalReviewPanel" `
  -CommandLabel "Go to Unified Evidence Policy Final Review" `
  -Modules @("unified-evidence-policy-final-review-types.ts","unified-evidence-policy-final-review-summary.ts","index.ts") `
  -Components @("UnifiedEvidencePolicyFinalReviewPanel.tsx","index.ts") `
  -Exports @("buildUnifiedEvidencePolicyFinalReviewStableKey","buildUnifiedEvidencePolicyFinalReview","buildUnifiedEvidencePolicyFinalReviews","buildUnifiedEvidencePolicyFinalReviewBoundary","buildUnifiedEvidencePolicyFinalReviewModel","summarizeUnifiedEvidencePolicyFinalReview","UNIFIED_EVIDENCE_POLICY_FINAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/unified-approval-policy-final-review","/unified-result-policy-final-review","/unified-recovery-policy-final-review","/live-workflow-evidence-capture-review")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Unified Evidence Policy Final Review smoke passed."
