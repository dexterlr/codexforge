param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1163 File Write Adapter Contract" `
  -ScriptFile "smoke-codexforge-file-write-adapter-contract.ps1" `
  -Domain "src\lib\codexforge\file-write-adapter-contract" `
  -Route "src\app\file-write-adapter-contract" `
  -MainPanel "FileWriteAdapterContractPanel" `
  -CommandLabel "Go to File Write Adapter Contract" `
  -Modules @("file-write-adapter-contract-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFileWriteAdapterContractStableKey", "buildFileWriteAdapterContract", "buildFileWriteAdapterContractItems", "buildFileWriteAdapterContractBoundary", "buildFileWriteAdapterContractModel", "summarizeFileWriteAdapterContract", "FILE_WRITE_ADAPTER_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("File-write adapter contract", "File-write adapter contract does not execute writes", "File-write adapter contract requires explicit operator approval", "Adapter contract defines path guard diff evidence result and rollback gates", "Denied file-write adapter contract paths remain blocked", "File-write adapter contract checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File-write adapter contract does not execute writes", "File-write adapter contract requires explicit operator approval", "Denied file-write adapter contract paths remain blocked") `
  -RouteHref "/file-write-adapter-contract"

Write-Host "[OK] CodexForge Phase 1163 File Write Adapter Contract smoke passed."
