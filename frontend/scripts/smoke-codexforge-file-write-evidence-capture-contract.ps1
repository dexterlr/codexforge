param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1169 File Write Evidence Capture Contract" `
  -ScriptFile "smoke-codexforge-file-write-evidence-capture-contract.ps1" `
  -Domain "src\lib\codexforge\file-write-evidence-capture-contract" `
  -Route "src\app\file-write-evidence-capture-contract" `
  -MainPanel "FileWriteEvidenceCaptureContractPanel" `
  -CommandLabel "Go to File Write Evidence Capture Contract" `
  -Modules @("file-write-evidence-capture-contract-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFileWriteEvidenceCaptureContractStableKey", "buildFileWriteEvidenceCaptureContract", "buildFileWriteEvidenceCaptureContractItems", "buildFileWriteEvidenceCaptureContractBoundary", "buildFileWriteEvidenceCaptureContractModel", "summarizeFileWriteEvidenceCaptureContract", "FILE_WRITE_EVIDENCE_CAPTURE_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("File-write evidence capture contract", "File-write evidence capture contract does not persist evidence", "File-write evidence capture requires explicit operator approval", "Evidence contract captures before snapshot after snapshot diff approval and operator placeholders", "Denied file-write evidence paths remain blocked", "File-write evidence capture checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File-write evidence capture contract does not persist evidence", "File-write evidence capture requires explicit operator approval", "Denied file-write evidence paths remain blocked") `
  -RouteHref "/file-write-evidence-capture-contract"

Write-Host "[OK] CodexForge Phase 1169 File Write Evidence Capture Contract smoke passed."
