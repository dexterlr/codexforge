param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 650 First Project Scaffold Controlled Trial" `
  -ScriptFile "smoke-codexforge-first-project-scaffold-controlled-trial.ps1" `
  -Domain "src\lib\codexforge\first-project-scaffold-controlled-trial" `
  -Route "src\app\first-project-scaffold-controlled-trial" `
  -MainPanel "FirstProjectScaffoldControlledTrialPanel" `
  -CommandLabel "Go to First Project Scaffold Controlled Trial" `
  -Modules @("first-project-scaffold-controlled-trial-model.ts", "index.ts") `
  -Components @("FirstProjectScaffoldControlledTrialPanel.tsx", "index.ts") `
  -Exports @("buildFirstProjectScaffoldControlledTrialStableKey", "buildFirstProjectScaffoldControlledTrial", "buildFirstProjectScaffoldControlledTrials", "buildFirstProjectScaffoldControlledTrialBoundary", "buildFirstProjectScaffoldControlledTrialModel", "summarizeFirstProjectScaffoldControlledTrial", "FIRST_PROJECT_SCAFFOLD_CONTROLLED_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First project scaffold controlled trial", "First project scaffold controlled trial does not create projects", "Project scaffold controlled trials require explicit operator approval", "Trial identity", "Scaffold scope", "Allowed targets", "Denied actions", "Approval checklist", "Evidence checklist", "Result checklist", "Recovery checklist", "Next action", "Original medieval fantasy", "No copied franchise assets") `
  -PlainEnglish @("Trial identity", "Scaffold scope", "Allowed targets", "Denied actions", "Approval checklist", "Evidence checklist", "Result checklist", "Recovery checklist", "Next action") `
  -RouteHref "/first-project-scaffold-controlled-trial"

Write-Host "[OK] CodexForge Phase 650 first project scaffold controlled trial smoke passed."
