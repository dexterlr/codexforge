param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1203 Cockpit Recovery Panel" `
  -ScriptFile "smoke-codexforge-cockpit-recovery-panel.ps1" `
  -Domain "src\lib\codexforge\cockpit-recovery-panel" `
  -Route "src\app\cockpit-recovery-panel" `
  -MainPanel "CockpitRecoveryPanel" `
  -CommandLabel "Go to Cockpit Recovery Panel" `
  -RouteHref "/cockpit-recovery-panel" `
  -Markers @("Cockpit recovery panel", "Cockpit recovery panel does not execute recovery", "Recovery panel requires explicit operator approval before future recovery", "Recovery panel shows rollback retry stop restore and explain-failure options as previews", "Denied cockpit recovery paths remain blocked", "Cockpit recovery checklist")
