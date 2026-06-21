param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1171 File Write Rollback Contract" `
  -ScriptFile "smoke-codexforge-file-write-rollback-contract.ps1" `
  -Domain "src\lib\codexforge\file-write-rollback-contract" `
  -Route "src\app\file-write-rollback-contract" `
  -MainPanel "FileWriteRollbackContractPanel" `
  -CommandLabel "Go to File Write Rollback Contract" `
  -Modules @("file-write-rollback-contract-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFileWriteRollbackContractStableKey", "buildFileWriteRollbackContract", "buildFileWriteRollbackContractItems", "buildFileWriteRollbackContractBoundary", "buildFileWriteRollbackContractModel", "summarizeFileWriteRollbackContract", "FILE_WRITE_ROLLBACK_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("File-write rollback contract", "File-write rollback contract does not execute rollback", "File-write rollback requires explicit operator approval", "Rollback contract describes restore reverse-create reverse-delete reverse-move and retry gates", "Denied file-write rollback paths remain blocked", "File-write rollback checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File-write rollback contract does not execute rollback", "File-write rollback requires explicit operator approval", "Denied file-write rollback paths remain blocked") `
  -RouteHref "/file-write-rollback-contract"

Write-Host "[OK] CodexForge Phase 1171 File Write Rollback Contract smoke passed."
