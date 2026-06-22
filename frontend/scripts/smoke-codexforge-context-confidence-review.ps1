param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1414 Context Confidence Review" `
  -ScriptFile "smoke-codexforge-context-confidence-review.ps1" `
  -Domain "src\lib\codexforge\context-confidence-review" `
  -Route "src\app\context-confidence-review" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Context Confidence Review" `
  -RouteHref "/context-confidence-review" `
  -Markers @("Context confidence review", "Context confidence review does not overclaim project understanding", "Context confidence review requires explicit operator approval for backend-owned inspection", "Context confidence review shows known inferred unknown blocked and needs-approval context levels", "Denied context confidence paths remain blocked", "Context confidence checklist")
