param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 638 Project Scaffold Hardening Pass" `
  -ScriptFile "smoke-codexforge-project-scaffold-hardening-pass.ps1" `
  -Domain "src\lib\codexforge\project-scaffold-hardening-pass" `
  -Route "src\app\project-scaffold-hardening-pass" `
  -MainPanel "ProjectScaffoldHardeningPassPanel" `
  -CommandLabel "Go to Project Scaffold Hardening Pass" `
  -Modules @("project-scaffold-hardening-pass-model.ts", "index.ts") `
  -Components @("ProjectScaffoldHardeningPassPanel.tsx", "index.ts") `
  -Exports @("buildProjectScaffoldHardeningPassStableKey", "buildProjectScaffoldHardeningPass", "buildProjectScaffoldHardeningPasses", "buildProjectScaffoldHardeningPassBoundary", "buildProjectScaffoldHardeningPassModel", "summarizeProjectScaffoldHardeningPass", "PROJECT_SCAFFOLD_HARDENING_PASS_LANGUAGE") `
  -PhaseMarkers @("Project scaffold hardening pass", "Project scaffold hardening pass does not apply changes", "Hardening changes require explicit operator approval", "File hardening", "Command hardening", "Runtime hardening", "Provider hardening", "Connector hardening", "Evidence/result/recovery hardening") `
  -PlainEnglish @("Project scaffold hardening pass identity", "File hardening", "Command hardening", "Runtime hardening", "Provider hardening", "Connector hardening", "Evidence/result/recovery hardening", "Next recommended action") `
  -RouteHref "/project-scaffold-hardening-pass"

Write-Host "[OK] CodexForge Phase 638 project scaffold hardening pass smoke passed."
