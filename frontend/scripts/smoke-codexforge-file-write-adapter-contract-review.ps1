param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 667 File Write Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-file-write-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\file-write-adapter-contract-review" `
  -Route "src\app\file-write-adapter-contract-review" `
  -MainPanel "FileWriteAdapterContractReviewPanel" `
  -CommandLabel "Go to File Write Adapter Contract Review" `
  -Modules @("file-write-adapter-contract-review-model.ts", "index.ts") `
  -Components @("FileWriteAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildFileWriteAdapterContractReviewStableKey", "buildFileWriteAdapterContractReview", "buildFileWriteAdapterContractReviews", "buildFileWriteAdapterContractReviewBoundary", "buildFileWriteAdapterContractReviewModel", "summarizeFileWriteAdapterContractReview", "FILE_WRITE_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("File write adapter contract review", "File write adapter contract review does not write files", "File write adapters require explicit operator approval", "Adapter not executable from UI", "Input contract", "Output contract", "Path allowlist/denylist", "Diff preview", "Rollback", "Audit", "Denied file write adapter actions") `
  -PlainEnglish @("File write adapter contract review identity", "Input contract", "Output contract", "Path allowlist/denylist", "Diff preview", "Rollback", "Audit", "Denied file write adapter actions", "Unresolved file write adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/file-write-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 667 file write adapter contract review smoke passed."
