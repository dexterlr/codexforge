param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1360 Tiny Real Command Guard" `
  -ScriptFile "smoke-codexforge-tiny-real-command-guard.ps1" `
  -Domain "src\lib\codexforge\tiny-real-command-guard" `
  -Route "src\app\tiny-real-command-guard" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real Command Guard" `
  -RouteHref "/tiny-real-command-guard" `
  -Markers @("Tiny real command guard", "Tiny real command guard does not run commands from the frontend", "Tiny real command guard requires explicit operator approval", "Command guard checks allowlist arguments working directory environment-name-only display timeout cancellation stdout stderr and exit-code capture", "Denied tiny real command guard paths remain blocked", "Tiny real command guard checklist")
