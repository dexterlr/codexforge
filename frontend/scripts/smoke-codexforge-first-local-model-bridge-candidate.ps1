param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1576 First Local Model Bridge Candidate" `
  -ScriptFile "smoke-codexforge-first-local-model-bridge-candidate.ps1" `
  -Domain "src\lib\codexforge\first-local-model-bridge-candidate" `
  -Route "src\app\first-local-model-bridge-candidate" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to First Local Model Bridge Candidate" `
  -RouteHref "/first-local-model-bridge-candidate" `
  -Markers @("First local model bridge candidate", "First local model bridge candidate does not call local models from the UI", "First local model bridge candidate requires explicit operator approval", "Candidate combines runtime identity model registry endpoint boundary prompt handoff redaction capability fit timeout cancellation response capture fallback denial evidence result and audit", "Denied first local model bridge paths remain blocked", "First local model bridge checklist")
