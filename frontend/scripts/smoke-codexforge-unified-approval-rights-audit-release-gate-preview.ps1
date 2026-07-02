param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2184 Unified Approval Rights Audit Release Gate Preview"
  ScriptFile = "smoke-codexforge-unified-approval-rights-audit-release-gate-preview.ps1"
  Domain = "src\lib\codexforge\unified-approval-rights-audit-release-gate-preview"
  Route = "src\app\unified-approval-rights-audit-release-gate-preview"
  CommandLabel = "Go to Unified Approval Rights Audit Release Gate Preview"
  RouteHref = "/unified-approval-rights-audit-release-gate-preview"
  ContractFamily = "Foundation"
  Markers = @("Unified approval rights audit release gate preview", "Unified approval rights audit release gate preview does not approve releases persist approvals clear rights grant consent export files publish content render videos or mutate audit logs from the UI", "Unified approval rights audit release gate preview requires backend-owned approval capture rights workflow consent workflow immutable audit ledger and protected action gates", "Unified approval rights audit release gate preview shows simulated all gates required simulated approval hold simulated rights hold simulated consent hold simulated audit hold simulated denied frontend release approval", "Denied unified approval rights audit release gate paths remain blocked", "Unified approval rights audit release gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
