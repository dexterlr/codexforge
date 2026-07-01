param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1837 Version Evidence Links Preview"
  ScriptFile = "smoke-codexforge-version-evidence-links-preview.ps1"
  Domain = "src\lib\codexforge\version-evidence-links-preview"
  Route = "src\app\version-evidence-links-preview"
  CommandLabel = "Go to Version Evidence Links Preview"
  RouteHref = "/version-evidence-links-preview"
  Markers = @("Version evidence links preview", "Version evidence links preview does not persist evidence promote memory write files mutate audit trails or store links from the UI", "Version evidence links preview requires backend-owned evidence capture", "Version evidence links preview shows simulated result ledger link simulated review dashboard link simulated change control link simulated redaction note simulated continuity note and denied frontend persistence", "Denied version evidence links paths remain blocked", "Version evidence links checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
