param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\end-to-end-approval-flow-review"
$route = "src\app\end-to-end-approval-flow-review"
$newRoutes = @(
  "/unified-live-integration-readiness-review",
  "/first-end-to-end-dry-run-review",
  "/end-to-end-approval-flow-review",
  "/codexforge-live-integration-release-candidate"
)

$phaseMarkers = @(
  "End-to-end approval flow review",
  "End-to-end approval flow does not approve actions automatically",
  "Every live action requires explicit operator approval",
  "Denied actions remain blocked",
  "Approval gate groups",
  "Audit and rollback checklist"
)

$plainEnglish = @(
  "end-to-end approval flow identity",
  "required operator decisions",
  "denied auto-approval shortcuts",
  "safety escalation checklist",
  "blocked approval flow risks",
  "live integration release candidate route",
  "dry-run route",
  "next recommended action",
  "advanced approval details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 444 End-to-End Approval Flow Review" `
  -ScriptFile "smoke-codexforge-end-to-end-approval-flow-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "EndToEndApprovalFlowReviewPanel" `
  -CommandLabel "Go to End-to-End Approval Flow Review" `
  -Modules @("end-to-end-approval-flow-review-types.ts","end-to-end-approval-flow-review-summary.ts","index.ts") `
  -Components @("EndToEndApprovalFlowReviewPanel.tsx","index.ts") `
  -Exports @("buildEndToEndApprovalFlowReviewStableKey","buildEndToEndApprovalFlowReview","buildEndToEndApprovalFlowReviews","buildEndToEndApprovalFlowReviewBoundary","buildEndToEndApprovalFlowReviewModel","summarizeEndToEndApprovalFlowReview","END_TO_END_APPROVAL_FLOW_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/first-end-to-end-dry-run-review","/codexforge-live-integration-release-candidate","/unified-live-integration-readiness-review","/approval-queue")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge End-to-End Approval Flow Review smoke passed."
