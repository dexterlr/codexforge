param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1168 File Write Apply Hold" `
  -ScriptFile "smoke-codexforge-file-write-apply-hold.ps1" `
  -Domain "src\lib\codexforge\file-write-apply-hold" `
  -Route "src\app\file-write-apply-hold" `
  -MainPanel "FileWriteApplyHoldPanel" `
  -CommandLabel "Go to File Write Apply Hold" `
  -Modules @("file-write-apply-hold-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFileWriteApplyHoldStableKey", "buildFileWriteApplyHold", "buildFileWriteApplyHoldItems", "buildFileWriteApplyHoldBoundary", "buildFileWriteApplyHoldModel", "summarizeFileWriteApplyHold", "FILE_WRITE_APPLY_HOLD_LANGUAGE") `
  -PhaseMarkers @("File-write apply hold", "File-write apply hold does not release writes", "File-write apply hold requires explicit operator approval", "Apply hold keeps every future mutation blocked", "Denied file-write apply hold paths remain blocked", "File-write apply hold checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File-write apply hold does not release writes", "File-write apply hold requires explicit operator approval", "Denied file-write apply hold paths remain blocked") `
  -RouteHref "/file-write-apply-hold"

Write-Host "[OK] CodexForge Phase 1168 File Write Apply Hold smoke passed."
