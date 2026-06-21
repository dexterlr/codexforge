param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1167 File Write Preflight Review" `
  -ScriptFile "smoke-codexforge-file-write-preflight-review.ps1" `
  -Domain "src\lib\codexforge\file-write-preflight-review" `
  -Route "src\app\file-write-preflight-review" `
  -MainPanel "FileWritePreflightReviewPanel" `
  -CommandLabel "Go to File Write Preflight Review" `
  -Modules @("file-write-preflight-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFileWritePreflightReviewStableKey", "buildFileWritePreflightReview", "buildFileWritePreflightReviewItems", "buildFileWritePreflightReviewBoundary", "buildFileWritePreflightReviewModel", "summarizeFileWritePreflightReview", "FILE_WRITE_PREFLIGHT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("File-write preflight review", "File-write preflight review does not execute writes", "File-write preflight review requires explicit operator approval", "Preflight reviews gate path diff size secrets binary writes and rollback readiness", "Denied file-write preflight paths remain blocked", "File-write preflight checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File-write preflight review does not execute writes", "File-write preflight review requires explicit operator approval", "Denied file-write preflight paths remain blocked") `
  -RouteHref "/file-write-preflight-review"

Write-Host "[OK] CodexForge Phase 1167 File Write Preflight Review smoke passed."
