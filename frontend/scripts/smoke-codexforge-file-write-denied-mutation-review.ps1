param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1173 File Write Denied Mutation Review" `
  -ScriptFile "smoke-codexforge-file-write-denied-mutation-review.ps1" `
  -Domain "src\lib\codexforge\file-write-denied-mutation-review" `
  -Route "src\app\file-write-denied-mutation-review" `
  -MainPanel "FileWriteDeniedMutationReviewPanel" `
  -CommandLabel "Go to File Write Denied Mutation Review" `
  -Modules @("file-write-denied-mutation-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFileWriteDeniedMutationReviewStableKey", "buildFileWriteDeniedMutationReview", "buildFileWriteDeniedMutationReviewItems", "buildFileWriteDeniedMutationReviewBoundary", "buildFileWriteDeniedMutationReviewModel", "summarizeFileWriteDeniedMutationReview", "FILE_WRITE_DENIED_MUTATION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("File-write denied mutation review", "File-write denied mutation review does not mutate files", "Denied mutation review requires explicit operator approval", "Denied mutation review explains blocked traversal secrets system git node_modules env binary and build-output writes", "Denied file-write mutation paths remain blocked", "File-write denied mutation checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File-write denied mutation review does not mutate files", "Denied mutation review requires explicit operator approval", "Denied file-write mutation paths remain blocked") `
  -RouteHref "/file-write-denied-mutation-review"

Write-Host "[OK] CodexForge Phase 1173 File Write Denied Mutation Review smoke passed."
