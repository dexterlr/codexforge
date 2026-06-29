param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1756 Synthetic Buying Power Preview" `
  -ScriptFile "smoke-codexforge-synthetic-buying-power-preview.ps1" `
  -Domain "src\lib\codexforge\synthetic-buying-power-preview" `
  -Route "src\app\synthetic-buying-power-preview" `
  -CommandLabel "Go to Synthetic Buying Power Preview" `
  -RouteHref "/synthetic-buying-power-preview" `
  -Markers @("Synthetic buying power preview", "Synthetic buying power preview does not read real buying power margin leverage account capacity or broker restrictions from the UI", "Synthetic buying power preview requires deterministic synthetic calculations only", "Synthetic buying power preview shows simulated cash buffer simulated exposure cap simulated per-order cap simulated reserved buying power and denied real broker reads", "Denied synthetic buying power paths remain blocked", "Synthetic buying power checklist")
