param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2177 Immutable Audit Ledger Preview"
  ScriptFile = "smoke-codexforge-immutable-audit-ledger-preview.ps1"
  Domain = "src\lib\codexforge\immutable-audit-ledger-preview"
  Route = "src\app\immutable-audit-ledger-preview"
  CommandLabel = "Go to Immutable Audit Ledger Preview"
  RouteHref = "/immutable-audit-ledger-preview"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Immutable audit ledger preview", "Immutable audit ledger preview does not persist audit logs mutate ledgers transmit telemetry or inspect secrets from the UI", "Immutable audit ledger preview requires backend-owned immutable audit storage hash chaining redaction policy and retention policy", "Immutable audit ledger preview shows simulated ledger entry simulated chain hash placeholder simulated actor binding simulated protected action simulated denied frontend ledger persistence", "Denied immutable audit ledger paths remain blocked", "Immutable audit ledger checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
