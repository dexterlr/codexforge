param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1271 Guided Operator Completion Checklist" `
  -ScriptFile "smoke-codexforge-guided-operator-completion-checklist.ps1" `
  -Domain "src\lib\codexforge\guided-operator-completion-checklist" `
  -Route "src\app\guided-operator-completion-checklist" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Completion Checklist" `
  -RouteHref "/guided-operator-completion-checklist" `
  -Markers @("Guided operator completion checklist", "Guided operator completion checklist does not mark real work complete", "Guided operator completion checklist requires explicit operator approval before future completion", "Completion checklist shows reviewed goal plan diff command approval evidence result recovery timeline and denied paths", "Denied guided operator completion paths remain blocked", "Guided operator completion checklist")
