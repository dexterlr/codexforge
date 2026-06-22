param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1367 Tiny Real Operator Signoff" `
  -ScriptFile "smoke-codexforge-tiny-real-operator-signoff.ps1" `
  -Domain "src\lib\codexforge\tiny-real-operator-signoff" `
  -Route "src\app\tiny-real-operator-signoff" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real Operator Signoff" `
  -RouteHref "/tiny-real-operator-signoff" `
  -Markers @("Tiny real operator signoff", "Tiny real operator signoff does not release execution automatically", "Tiny real operator signoff requires explicit human approval", "Operator signoff previews goal scope sandbox path command allowlist evidence result audit recovery and go no-go decision", "Denied tiny real signoff paths remain blocked", "Tiny real operator signoff checklist")
