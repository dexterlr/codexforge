param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1303 Real Trial Go No-Go Review" `
  -ScriptFile "smoke-codexforge-real-trial-go-no-go-review.ps1" `
  -Domain "src\lib\codexforge\real-trial-go-no-go-review" `
  -Route "src\app\real-trial-go-no-go-review" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Trial Go No Go Review" `
  -RouteHref "/real-trial-go-no-go-review" `
  -Markers @("Real trial go no-go review", "Real trial go no-go review does not release execution", "Real trial go no-go review requires explicit operator approval", "Go no-go review reports preview-only status blocked execution and required future backend guards", "Denied real trial go no-go paths remain blocked", "Real trial go no-go checklist")
