param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 622 Provider Model Call Approval Boundary" `
  -ScriptFile "smoke-codexforge-provider-model-call-approval-boundary.ps1" `
  -Domain "src\lib\codexforge\provider-model-call-approval-boundary" `
  -Route "src\app\provider-model-call-approval-boundary" `
  -MainPanel "ProviderModelCallApprovalBoundaryPanel" `
  -CommandLabel "Go to Provider Model Call Approval Boundary" `
  -Modules @("provider-model-call-approval-boundary-types.ts", "provider-model-call-approval-boundary-summary.ts", "index.ts") `
  -Components @("ProviderModelCallApprovalBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildProviderModelCallApprovalBoundaryStableKey", "buildProviderModelCallApprovalBoundary", "buildProviderModelCallApprovalBoundaries", "buildProviderModelCallApprovalBoundaryBoundary", "buildProviderModelCallApprovalBoundaryModel", "summarizeProviderModelCallApprovalBoundary", "PROVIDER_MODEL_CALL_APPROVAL_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Provider model call approval boundary", "Provider/model call approval boundary does not call providers or models", "Provider/model calls require explicit operator approval", "Unsafe provider/model calls stay blocked", "Provider model groups", "Prompt preview checklist") `
  -PlainEnglish @("Provider/model boundary identity", "Data redaction checklist", "Cost/rate-limit checklist", "Output handling checklist", "Denied provider/model actions", "Unresolved provider/model blockers", "Evidence boundary route", "Result review boundary route", "Next recommended action") `
  -RouteHref "/provider-model-call-approval-boundary"

Write-Host "[OK] CodexForge Phase 622 provider model call approval boundary smoke passed."
