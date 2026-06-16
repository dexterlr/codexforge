param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 614 First Controlled Launch Hardening" `
  -ScriptFile "smoke-codexforge-first-controlled-launch-hardening.ps1" `
  -Domain "src\lib\codexforge\first-controlled-launch-hardening" `
  -Route "src\app\first-controlled-launch-hardening" `
  -MainPanel "FirstControlledLaunchHardeningPanel" `
  -CommandLabel "Go to First Controlled Launch Hardening" `
  -Modules @("first-controlled-launch-hardening-types.ts", "first-controlled-launch-hardening-summary.ts", "index.ts") `
  -Components @("FirstControlledLaunchHardeningPanel.tsx", "index.ts") `
  -Exports @("buildFirstControlledLaunchHardeningStableKey", "buildFirstControlledLaunchHardening", "buildFirstControlledLaunchHardenings", "buildFirstControlledLaunchHardeningBoundary", "buildFirstControlledLaunchHardeningModel", "summarizeFirstControlledLaunchHardening", "FIRST_CONTROLLED_LAUNCH_HARDENING_LANGUAGE") `
  -PhaseMarkers @("First controlled launch hardening", "First controlled launch hardening does not apply changes", "Controlled launch hardening changes require explicit operator approval", "Unresolved controlled launch hardening blockers stay blocked", "Hardening groups", "Boundary readiness status") `
  -PlainEnglish @("Controlled launch hardening identity", "Launch review status", "Evidence/result/recovery status", "Operator readiness checklist", "Denied hardening actions", "Unresolved hardening blockers", "Controlled launch candidate route", "Controlled launch handoff route", "Next recommended action", "no hardening apply behavior", "no patch apply behavior") `
  -RouteHref "/first-controlled-launch-hardening"

Write-Host "[OK] CodexForge Phase 614 first controlled launch hardening smoke passed."
