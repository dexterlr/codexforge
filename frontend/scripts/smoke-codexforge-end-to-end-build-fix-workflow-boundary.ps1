param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1242 End-to-End Build Fix Workflow Boundary" `
  -ScriptFile "smoke-codexforge-end-to-end-build-fix-workflow-boundary.ps1" `
  -Domain "src\lib\codexforge\end-to-end-build-fix-workflow-boundary" `
  -Route "src\app\end-to-end-build-fix-workflow-boundary" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to End to End Build Fix Workflow Boundary" `
  -RouteHref "/end-to-end-build-fix-workflow-boundary" `
  -Markers @("End-to-end build fix workflow boundary", "End-to-end build fix workflow boundary does not call models write files or run commands", "End-to-end build fix workflow requires explicit operator approval", "Workflow unifies goal context plan diff command risk approval evidence result recovery and audit", "Denied end-to-end build fix workflow paths remain blocked", "End-to-end build fix workflow checklist")
