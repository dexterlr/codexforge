param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 805 Adapter Backend Audit Contract" `
  -ScriptFile "smoke-codexforge-adapter-backend-audit-contract.ps1" `
  -Domain "src\lib\codexforge\adapter-backend-audit-contract" `
  -Route "src\app\adapter-backend-audit-contract" `
  -MainPanel "AdapterBackendAuditContractPanel" `
  -CommandLabel "Go to Adapter Backend Audit Contract" `
  -Modules @("adapter-backend-audit-contract-model.ts", "index.ts") `
  -Components @("AdapterBackendAuditContractPanel.tsx", "index.ts") `
  -Exports @("buildAdapterBackendAuditContractStableKey", "buildAdapterBackendAuditContract", "buildAdapterBackendAuditContractItems", "buildAdapterBackendAuditContractBoundary", "buildAdapterBackendAuditContractModel", "summarizeAdapterBackendAuditContract", "ADAPTER_BACKEND_AUDIT_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Adapter Backend Audit Contract", "Adapter backend audit contract does not store audit events", "Backend audit persistence requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "actor", "request id", "adapter family", "approved operation", "denied operation", "evidence/result/recovery links", "redaction", "retention", "validation", "unresolved blockers") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "Adapter backend audit contract does not store audit events") `
  -RouteHref "/adapter-backend-audit-contract"

Write-Host "[OK] CodexForge Phase 805 adapter backend audit contract smoke passed."
