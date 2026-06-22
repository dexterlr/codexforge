param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1463 Cockpit Evidence Memory Summary" `
  -ScriptFile "smoke-codexforge-cockpit-evidence-memory-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-evidence-memory-summary" `
  -Route "src\app\cockpit-evidence-memory-summary" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Cockpit Evidence Memory Summary" `
  -RouteHref "/cockpit-evidence-memory-summary" `
  -Markers @("Cockpit evidence memory summary", "Cockpit evidence memory summary keeps the cockpit as the normal user surface", "Cockpit evidence memory summary does not persist memory from the cockpit", "Cockpit evidence memory summary shows remembered goal context plan files commands approval evidence result recovery audit and denied memory", "Phase pages remain dev test diagnostics only", "Cockpit evidence memory checklist")
