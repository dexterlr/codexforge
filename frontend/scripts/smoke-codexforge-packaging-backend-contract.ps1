param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 802 Packaging Backend Contract" `
  -ScriptFile "smoke-codexforge-packaging-backend-contract.ps1" `
  -Domain "src\lib\codexforge\packaging-backend-contract" `
  -Route "src\app\packaging-backend-contract" `
  -MainPanel "PackagingBackendContractPanel" `
  -CommandLabel "Go to Packaging Backend Contract" `
  -Modules @("packaging-backend-contract-model.ts", "index.ts") `
  -Components @("PackagingBackendContractPanel.tsx", "index.ts") `
  -Exports @("buildPackagingBackendContractStableKey", "buildPackagingBackendContract", "buildPackagingBackendContractItems", "buildPackagingBackendContractBoundary", "buildPackagingBackendContractModel", "summarizePackagingBackendContract", "PACKAGING_BACKEND_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Packaging Backend Contract", "Packaging backend contract does not create packages or exports", "Packaging backend execution requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "artifact source", "bundle type", "destination", "license/redaction", "handoff", "rollback", "audit/evidence/result links", "validation", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Packaging backend contract does not create packages or exports") `
  -RouteHref "/packaging-backend-contract"

Write-Host "[OK] CodexForge Phase 802 packaging backend contract smoke passed."
