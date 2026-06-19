param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 799 Evidence Store Backend Contract" `
  -ScriptFile "smoke-codexforge-evidence-store-backend-contract.ps1" `
  -Domain "src\lib\codexforge\evidence-store-backend-contract" `
  -Route "src\app\evidence-store-backend-contract" `
  -MainPanel "EvidenceStoreBackendContractPanel" `
  -CommandLabel "Go to Evidence Store Backend Contract" `
  -Modules @("evidence-store-backend-contract-model.ts", "index.ts") `
  -Components @("EvidenceStoreBackendContractPanel.tsx", "index.ts") `
  -Exports @("buildEvidenceStoreBackendContractStableKey", "buildEvidenceStoreBackendContract", "buildEvidenceStoreBackendContractItems", "buildEvidenceStoreBackendContractBoundary", "buildEvidenceStoreBackendContractModel", "summarizeEvidenceStoreBackendContract", "EVIDENCE_STORE_BACKEND_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Evidence Store Backend Contract", "Evidence store backend contract does not store or ingest evidence", "Evidence backend storage requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "source", "citation", "redaction", "retention", "privacy", "audit", "result linkage", "validation", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Evidence store backend contract does not store or ingest evidence") `
  -RouteHref "/evidence-store-backend-contract"

Write-Host "[OK] CodexForge Phase 799 evidence store backend contract smoke passed."
