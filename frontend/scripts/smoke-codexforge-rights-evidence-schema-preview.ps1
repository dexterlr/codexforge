param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2169 Rights Evidence Schema Preview"
  ScriptFile = "smoke-codexforge-rights-evidence-schema-preview.ps1"
  Domain = "src\lib\codexforge\rights-evidence-schema-preview"
  Route = "src\app\rights-evidence-schema-preview"
  CommandLabel = "Go to Rights Evidence Schema Preview"
  RouteHref = "/rights-evidence-schema-preview"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Rights evidence schema preview", "Rights evidence schema preview does not upload evidence persist files clear rights or grant licenses from the UI", "Rights evidence schema preview requires backend-owned rights evidence storage checksum capture legal review and audit trail", "Rights evidence schema preview shows simulated rights evidence simulated source claim simulated attribution note simulated legal hold simulated denied frontend rights evidence persistence", "Denied rights evidence schema paths remain blocked", "Rights evidence schema checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
