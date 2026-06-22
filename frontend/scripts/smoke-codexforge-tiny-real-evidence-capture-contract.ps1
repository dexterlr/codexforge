param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1362 Tiny Real Evidence Capture Contract" `
  -ScriptFile "smoke-codexforge-tiny-real-evidence-capture-contract.ps1" `
  -Domain "src\lib\codexforge\tiny-real-evidence-capture-contract" `
  -Route "src\app\tiny-real-evidence-capture-contract" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real Evidence Capture Contract" `
  -RouteHref "/tiny-real-evidence-capture-contract" `
  -Markers @("Tiny real evidence capture contract", "Tiny real evidence capture contract does not persist evidence from the frontend", "Tiny real evidence capture contract requires explicit operator approval", "Evidence capture contract covers diff command stdout stderr exit code approval timestamp redaction operator audit and queue references", "Denied tiny real evidence paths remain blocked", "Tiny real evidence checklist")
