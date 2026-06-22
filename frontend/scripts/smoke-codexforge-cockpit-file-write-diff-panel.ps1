param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1197 Cockpit File-Write Diff Panel" `
  -ScriptFile "smoke-codexforge-cockpit-file-write-diff-panel.ps1" `
  -Domain "src\lib\codexforge\cockpit-file-write-diff-panel" `
  -Route "src\app\cockpit-file-write-diff-panel" `
  -MainPanel "CockpitFileWriteDiffPanel" `
  -CommandLabel "Go to Cockpit File Write Diff Panel" `
  -RouteHref "/cockpit-file-write-diff-panel" `
  -Markers @("Cockpit file-write diff panel", "Cockpit file-write diff panel does not write files", "File-write diff panel requires explicit operator approval before future apply", "Diff panel shows path guard diff approval evidence result and rollback readiness", "Denied cockpit file-write paths remain blocked", "Cockpit file-write diff checklist")
