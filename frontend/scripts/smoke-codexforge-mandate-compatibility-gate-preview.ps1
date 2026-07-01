param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1854 Mandate Compatibility Gate Preview"
  ScriptFile = "smoke-codexforge-mandate-compatibility-gate-preview.ps1"
  Domain = "src\lib\codexforge\mandate-compatibility-gate-preview"
  Route = "src\app\mandate-compatibility-gate-preview"
  CommandLabel = "Go to Mandate Compatibility Gate Preview"
  RouteHref = "/mandate-compatibility-gate-preview"
  Markers = @("Mandate compatibility gate preview", "Mandate compatibility gate preview does not change trading mandate approved symbols approved strategies capital rules or execution permissions from the UI", "Mandate compatibility gate preview requires backend-owned mandate review workflow", "Mandate compatibility gate preview shows simulated mandate fit simulated approved universe status simulated strategy class status simulated capital rule status simulated evidence requirement and denied frontend mutation", "Denied mandate compatibility gate paths remain blocked", "Mandate compatibility gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
