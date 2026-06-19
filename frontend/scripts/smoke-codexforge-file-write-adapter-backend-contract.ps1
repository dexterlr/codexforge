param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 796 File Write Adapter Backend Contract" `
  -ScriptFile "smoke-codexforge-file-write-adapter-backend-contract.ps1" `
  -Domain "src\lib\codexforge\file-write-adapter-backend-contract" `
  -Route "src\app\file-write-adapter-backend-contract" `
  -MainPanel "FileWriteAdapterBackendContractPanel" `
  -CommandLabel "Go to File Write Adapter Backend Contract" `
  -Modules @("file-write-adapter-backend-contract-model.ts", "index.ts") `
  -Components @("FileWriteAdapterBackendContractPanel.tsx", "index.ts") `
  -Exports @("buildFileWriteAdapterBackendContractStableKey", "buildFileWriteAdapterBackendContract", "buildFileWriteAdapterBackendContractItems", "buildFileWriteAdapterBackendContractBoundary", "buildFileWriteAdapterBackendContractModel", "summarizeFileWriteAdapterBackendContract", "FILE_WRITE_ADAPTER_BACKEND_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("File Write Adapter Backend Contract", "File write adapter backend contract does not write files", "File write backend execution requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "path policy", "operation type", "diff contract", "rollback contract", "audit/evidence/result links", "sandbox profile", "validation", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "File write adapter backend contract does not write files") `
  -RouteHref "/file-write-adapter-backend-contract"

Write-Host "[OK] CodexForge Phase 796 file write adapter backend contract smoke passed."
