param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1852 Evidence Sufficiency Gate Preview"
  ScriptFile = "smoke-codexforge-evidence-sufficiency-gate-preview.ps1"
  Domain = "src\lib\codexforge\evidence-sufficiency-gate-preview"
  Route = "src\app\evidence-sufficiency-gate-preview"
  CommandLabel = "Go to Evidence Sufficiency Gate Preview"
  RouteHref = "/evidence-sufficiency-gate-preview"
  Markers = @("Evidence sufficiency gate preview", "Evidence sufficiency gate preview does not persist evidence promote memory write files mutate audit trails or store links from the UI", "Evidence sufficiency gate preview requires backend-owned evidence capture", "Evidence sufficiency gate preview shows simulated result evidence simulated review dashboard evidence simulated version evidence simulated redaction requirement simulated continuity note and denied frontend persistence", "Denied evidence sufficiency gate paths remain blocked", "Evidence sufficiency gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
