param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2061 Asset Rights Tagging Contract Preview"
  ScriptFile = "smoke-codexforge-asset-rights-tagging-contract-preview.ps1"
  Domain = "src\lib\codexforge\asset-rights-tagging-contract-preview"
  Route = "src\app\asset-rights-tagging-contract-preview"
  CommandLabel = "Go to Asset Rights Tagging Contract Preview"
  RouteHref = "/asset-rights-tagging-contract-preview"
  Contract = "Asset"
  Markers = @("Asset rights tagging contract preview", "Asset rights tagging contract preview does not clear copyright approve usage persist rights or publish content from the UI", "Asset rights tagging contract preview requires backend-owned rights workflow evidence capture approval capture and audit trail", "Asset rights tagging contract preview shows simulated rights tag simulated license note simulated attribution need simulated approval state simulated denied frontend rights persistence", "Denied asset rights tagging paths remain blocked", "Asset rights tagging contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
