param([string]$BaseUrl = "http://localhost:3000")

$protectedRoutes = @(
  "/full-smoke-suite-stability-pass",
  "/foundation-beta-candidate",
  "/beta-trial-intake-review",
  "/beta-feedback-inbox",
  "/beta-issue-triage-review",
  "/beta-fix-priority-matrix",
  "/beta-regression-replay-review",
  "/beta-release-notes-draft-review",
  "/validation",
  "/patch-preview-workbench"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 387 Beta Fix Priority Matrix" `
  -ScriptFile "smoke-codexforge-beta-fix-priority-matrix.ps1" `
  -Domain "src\lib\codexforge\beta-fix-priority-matrix" `
  -Route "src\app\beta-fix-priority-matrix" `
  -MainPanel "BetaFixPriorityMatrixPanel" `
  -CommandLabel "Go to Beta Fix Priority Matrix" `
  -Modules @("beta-fix-priority-matrix-types.ts","beta-fix-priority-matrix-summary.ts","index.ts") `
  -Components @("BetaFixPriorityMatrixPanel.tsx","index.ts") `
  -Exports @("buildBetaFixPriorityMatrixStableKey","buildBetaFixPriorityMatrixReview","buildBetaFixPriorityMatrixReviews","buildBetaFixPriorityMatrixBoundary","buildBetaFixPriorityMatrixModel","summarizeBetaFixPriorityMatrix","BETA_FIX_PRIORITY_MATRIX_LANGUAGE") `
  -PhaseMarkers @("Beta fix priority matrix","Fix priority matrix does not apply fixes","Fixes require explicit operator approval","Validation evidence is required before merge release","Fix buckets","Regression replay route") `
  -PlainEnglish @("Fix priority identity","Source issue triage review","User impact summary","Safety/regression risk","Validation required","Blocked fixes","Next recommended action","advanced priority details collapsed/secondary") `
  -ExtraRoutes @("/beta-issue-triage-review","/beta-regression-replay-review","/validation","/patch-preview-workbench") `
  -ProtectedRoutes $protectedRoutes
