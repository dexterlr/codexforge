param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 801 Recovery Backend Contract" `
  -ScriptFile "smoke-codexforge-recovery-backend-contract.ps1" `
  -Domain "src\lib\codexforge\recovery-backend-contract" `
  -Route "src\app\recovery-backend-contract" `
  -MainPanel "RecoveryBackendContractPanel" `
  -CommandLabel "Go to Recovery Backend Contract" `
  -Modules @("recovery-backend-contract-model.ts", "index.ts") `
  -Components @("RecoveryBackendContractPanel.tsx", "index.ts") `
  -Exports @("buildRecoveryBackendContractStableKey", "buildRecoveryBackendContract", "buildRecoveryBackendContractItems", "buildRecoveryBackendContractBoundary", "buildRecoveryBackendContractModel", "summarizeRecoveryBackendContract", "RECOVERY_BACKEND_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Recovery Backend Contract", "Recovery backend contract does not trigger recovery or retry", "Recovery backend execution requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "failure source", "recovery mode", "retry scope", "rollback target", "cleanup plan", "escalation path", "audit/evidence/result links", "validation", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Recovery backend contract does not trigger recovery or retry") `
  -RouteHref "/recovery-backend-contract"

Write-Host "[OK] CodexForge Phase 801 recovery backend contract smoke passed."
