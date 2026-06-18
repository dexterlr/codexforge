param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 746 First File Write Adapter Implementation Review" `
  -ScriptFile "smoke-codexforge-first-file-write-adapter-implementation-review.ps1" `
  -Domain "src\lib\codexforge\first-file-write-adapter-implementation-review" `
  -Route "src\app\first-file-write-adapter-implementation-review" `
  -MainPanel "FirstFileWriteAdapterImplementationReviewPanel" `
  -CommandLabel "Go to First File Write Adapter Implementation Review" `
  -Modules @("first-file-write-adapter-implementation-review-model.ts", "index.ts") `
  -Components @("FirstFileWriteAdapterImplementationReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstFileWriteAdapterImplementationReviewStableKey", "buildFirstFileWriteAdapterImplementationReview", "buildFirstFileWriteAdapterImplementationReviewItems", "buildFirstFileWriteAdapterImplementationReviewBoundary", "buildFirstFileWriteAdapterImplementationReviewModel", "summarizeFirstFileWriteAdapterImplementationReview", "FIRST_FILE_WRITE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First File Write Adapter Implementation Review", "First file write adapter implementation review does not write files", "File write adapter implementation requires explicit operator approval", "Implementation review", "Allowlist/denylist", "Diff preview", "Rollback", "Audit", "Evidence", "Validation", "Unresolved blockers") `
  -PlainEnglish @("First File Write Adapter Implementation Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "What this unlocks next", "first actual bounded file-write request contract") `
  -RouteHref "/first-file-write-adapter-implementation-review"

Write-Host "[OK] CodexForge Phase 746 first file write adapter implementation review smoke passed."
