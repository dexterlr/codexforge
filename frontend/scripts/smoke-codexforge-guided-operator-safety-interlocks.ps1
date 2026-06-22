param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1270 Guided Operator Safety Interlocks" `
  -ScriptFile "smoke-codexforge-guided-operator-safety-interlocks.ps1" `
  -Domain "src\lib\codexforge\guided-operator-safety-interlocks" `
  -Route "src\app\guided-operator-safety-interlocks" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Safety Interlocks" `
  -RouteHref "/guided-operator-safety-interlocks" `
  -Markers @("Guided operator safety interlocks", "Guided operator safety interlocks do not release actions", "Guided operator safety interlocks require explicit operator approval", "Safety interlocks block file writes commands models providers connectors runtimes adapters persistence export recovery queues and memory promotion", "Denied guided operator safety paths remain blocked", "Guided operator safety interlocks checklist")
