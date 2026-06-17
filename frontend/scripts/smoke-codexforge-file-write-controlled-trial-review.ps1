param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 640 File Write Controlled Trial Review" `
  -ScriptFile "smoke-codexforge-file-write-controlled-trial-review.ps1" `
  -Domain "src\lib\codexforge\file-write-controlled-trial-review" `
  -Route "src\app\file-write-controlled-trial-review" `
  -MainPanel "FileWriteControlledTrialReviewPanel" `
  -CommandLabel "Go to File Write Controlled Trial Review" `
  -Modules @("file-write-controlled-trial-review-model.ts", "index.ts") `
  -Components @("FileWriteControlledTrialReviewPanel.tsx", "index.ts") `
  -Exports @("buildFileWriteControlledTrialReviewStableKey", "buildFileWriteControlledTrialReview", "buildFileWriteControlledTrialReviews", "buildFileWriteControlledTrialReviewBoundary", "buildFileWriteControlledTrialReviewModel", "summarizeFileWriteControlledTrialReview", "FILE_WRITE_CONTROLLED_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers @("File write controlled trial review", "File write controlled trial review does not apply file writes", "Controlled file writes require explicit operator approval", "Result checklist", "Evidence checklist", "Recovery checklist", "Reuse checklist") `
  -PlainEnglish @("File write controlled trial review identity", "Result checklist", "Evidence checklist", "Recovery checklist", "Reuse checklist", "Next recommended action") `
  -RouteHref "/file-write-controlled-trial-review"

Write-Host "[OK] CodexForge Phase 640 file write controlled trial review smoke passed."
