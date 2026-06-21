param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1175 File Write Cockpit Integration Contract" `
  -ScriptFile "smoke-codexforge-file-write-cockpit-integration-contract.ps1" `
  -Domain "src\lib\codexforge\file-write-cockpit-integration-contract" `
  -Route "src\app\file-write-cockpit-integration-contract" `
  -MainPanel "FileWriteCockpitIntegrationContractPanel" `
  -CommandLabel "Go to File Write Cockpit Integration Contract" `
  -Modules @("file-write-cockpit-integration-contract-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFileWriteCockpitIntegrationContractStableKey", "buildFileWriteCockpitIntegrationContract", "buildFileWriteCockpitIntegrationContractItems", "buildFileWriteCockpitIntegrationContractBoundary", "buildFileWriteCockpitIntegrationContractModel", "summarizeFileWriteCockpitIntegrationContract", "FILE_WRITE_COCKPIT_INTEGRATION_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("File-write cockpit integration contract", "File-write cockpit integration contract does not execute writes", "File-write cockpit integration requires explicit operator approval", "Future cockpit shows goal plan diff approval execution evidence result and recovery in one place", "Phase pages are dev/test surfaces only", "File-write cockpit integration checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File-write cockpit integration contract does not execute writes", "File-write cockpit integration requires explicit operator approval", "Phase pages are dev/test surfaces only") `
  -RouteHref "/file-write-cockpit-integration-contract"

Write-Host "[OK] CodexForge Phase 1175 File Write Cockpit Integration Contract smoke passed."
