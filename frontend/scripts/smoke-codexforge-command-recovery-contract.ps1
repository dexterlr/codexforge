param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1189 Command Recovery Contract" `
  -ScriptFile "smoke-codexforge-command-recovery-contract.ps1" `
  -Domain "src\lib\codexforge\command-recovery-contract" `
  -Route "src\app\command-recovery-contract" `
  -MainPanel "CommandRecoveryContractPanel" `
  -CommandLabel "Go to Command Recovery Contract" `
  -Modules @("command-recovery-contract-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCommandRecoveryContractStableKey", "buildCommandRecoveryContract", "buildCommandRecoveryContractItems", "buildCommandRecoveryContractBoundary", "buildCommandRecoveryContractModel", "summarizeCommandRecoveryContract", "COMMAND_RECOVERY_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Command recovery contract", "Command recovery contract does not execute recovery", "Command recovery requires explicit operator approval", "Recovery contract describes retry stop rollback related file write restore prior state and explain failure gates", "Denied command recovery paths remain blocked", "Command recovery checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command recovery contract does not execute recovery", "Command recovery requires explicit operator approval", "Denied command recovery paths remain blocked") `
  -RouteHref "/command-recovery-contract"

Write-Host "[OK] CodexForge Phase 1189 Command Recovery Contract smoke passed."
