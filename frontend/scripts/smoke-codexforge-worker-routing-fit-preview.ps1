param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1591 Worker Routing Fit Preview" `
  -ScriptFile "smoke-codexforge-worker-routing-fit-preview.ps1" `
  -Domain "src\lib\codexforge\worker-routing-fit-preview" `
  -Route "src\app\worker-routing-fit-preview" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Worker Routing Fit Preview" `
  -RouteHref "/worker-routing-fit-preview" `
  -Markers @("Worker routing fit preview", "Worker routing fit preview does not dispatch workers", "Worker routing fit preview requires explicit operator approval", "Worker routing fit preview matches goal domain task type capability privacy cost model route provider approval local model bridge evidence and denied worker paths", "Denied worker routing fit paths remain blocked", "Worker routing fit checklist")
