param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1257 Controlled End-to-End Build Fix Workflow Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-end-to-end-build-fix-workflow-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-end-to-end-build-fix-workflow-release-candidate" `
  -Route "src\app\controlled-end-to-end-build-fix-workflow-release-candidate" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Controlled End to End Build Fix Workflow Release Candidate" `
  -RouteHref "/controlled-end-to-end-build-fix-workflow-release-candidate" `
  -Markers @("Controlled end-to-end build fix workflow release candidate", "Controlled end-to-end build fix workflow release candidate does not call models write files run commands persist results or execute recovery", "Controlled end-to-end build fix workflow release requires explicit operator approval", "Release candidate moves CodexForge toward the first usable controlled build fix loop", "Denied controlled end-to-end build fix workflow paths remain blocked", "Controlled end-to-end build fix workflow release checklist")
