param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1364 Tiny Real Audit Capture Contract" `
  -ScriptFile "smoke-codexforge-tiny-real-audit-capture-contract.ps1" `
  -Domain "src\lib\codexforge\tiny-real-audit-capture-contract" `
  -Route "src\app\tiny-real-audit-capture-contract" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real Audit Capture Contract" `
  -RouteHref "/tiny-real-audit-capture-contract" `
  -Markers @("Tiny real audit capture contract", "Tiny real audit capture contract does not persist audit logs from the frontend", "Tiny real audit capture contract requires explicit operator approval", "Audit capture contract covers goal plan diff apply command approval evidence result recovery queue operator and denied-path records", "Denied tiny real audit paths remain blocked", "Tiny real audit checklist")
