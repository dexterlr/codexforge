param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1170 File Write Result Capture Contract" `
  -ScriptFile "smoke-codexforge-file-write-result-capture-contract.ps1" `
  -Domain "src\lib\codexforge\file-write-result-capture-contract" `
  -Route "src\app\file-write-result-capture-contract" `
  -MainPanel "FileWriteResultCaptureContractPanel" `
  -CommandLabel "Go to File Write Result Capture Contract" `
  -Modules @("file-write-result-capture-contract-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFileWriteResultCaptureContractStableKey", "buildFileWriteResultCaptureContract", "buildFileWriteResultCaptureContractItems", "buildFileWriteResultCaptureContractBoundary", "buildFileWriteResultCaptureContractModel", "summarizeFileWriteResultCaptureContract", "FILE_WRITE_RESULT_CAPTURE_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("File-write result capture contract", "File-write result capture contract does not persist results", "File-write result capture requires explicit operator approval", "Result contract supports success denied blocked failed and needs-review states", "Denied file-write result paths remain blocked", "File-write result capture checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File-write result capture contract does not persist results", "File-write result capture requires explicit operator approval", "Denied file-write result paths remain blocked") `
  -RouteHref "/file-write-result-capture-contract"

Write-Host "[OK] CodexForge Phase 1170 File Write Result Capture Contract smoke passed."
