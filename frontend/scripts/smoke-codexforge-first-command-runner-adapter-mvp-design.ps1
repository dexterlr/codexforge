param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 715 First Command Runner Adapter MVP Design" `
  -ScriptFile "smoke-codexforge-first-command-runner-adapter-mvp-design.ps1" `
  -Domain "src\lib\codexforge\first-command-runner-adapter-mvp-design" `
  -Route "src\app\first-command-runner-adapter-mvp-design" `
  -MainPanel "FirstCommandRunnerAdapterMvpDesignPanel" `
  -CommandLabel "Go to First Command Runner Adapter MVP Design" `
  -Modules @("first-command-runner-adapter-mvp-design-model.ts", "index.ts") `
  -Components @("FirstCommandRunnerAdapterMvpDesignPanel.tsx", "index.ts") `
  -Exports @("buildFirstCommandRunnerAdapterMvpDesignStableKey", "buildFirstCommandRunnerAdapterMvpDesign", "buildFirstCommandRunnerAdapterMvpDesigns", "buildFirstCommandRunnerAdapterMvpDesignBoundary", "buildFirstCommandRunnerAdapterMvpDesignModel", "summarizeFirstCommandRunnerAdapterMvpDesign", "FIRST_COMMAND_RUNNER_ADAPTER_MVP_DESIGN_LANGUAGE") `
  -PhaseMarkers @("First Command Runner Adapter MVP Design", "First command runner adapter MVP design does not run commands", "Command runner adapter MVP requires explicit operator approval", "Command interface shape", "Working directory policy", "Env/secrets policy", "Timeout policy", "Stdout/stderr policy", "Exit-code policy", "Recovery policy", "Test harness needs", "Implementation blockers") `
  -PlainEnglish @("First Command Runner Adapter MVP Design identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-command-runner-adapter-mvp-design"

Write-Host "[OK] CodexForge Phase 715 first command runner adapter mvp design smoke passed."
