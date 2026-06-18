param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 719 First Recovery Adapter MVP Design" `
  -ScriptFile "smoke-codexforge-first-recovery-adapter-mvp-design.ps1" `
  -Domain "src\lib\codexforge\first-recovery-adapter-mvp-design" `
  -Route "src\app\first-recovery-adapter-mvp-design" `
  -MainPanel "FirstRecoveryAdapterMvpDesignPanel" `
  -CommandLabel "Go to First Recovery Adapter MVP Design" `
  -Modules @("first-recovery-adapter-mvp-design-model.ts", "index.ts") `
  -Components @("FirstRecoveryAdapterMvpDesignPanel.tsx", "index.ts") `
  -Exports @("buildFirstRecoveryAdapterMvpDesignStableKey", "buildFirstRecoveryAdapterMvpDesign", "buildFirstRecoveryAdapterMvpDesigns", "buildFirstRecoveryAdapterMvpDesignBoundary", "buildFirstRecoveryAdapterMvpDesignModel", "summarizeFirstRecoveryAdapterMvpDesign", "FIRST_RECOVERY_ADAPTER_MVP_DESIGN_LANGUAGE") `
  -PhaseMarkers @("First Recovery Adapter MVP Design", "First recovery adapter MVP design does not trigger recovery or retry", "Recovery adapter MVP requires explicit operator approval", "Recovery interface shape", "Retry policy", "Rollback policy", "Cleanup policy", "Escalation policy", "Audit policy", "Test harness needs", "Implementation blockers") `
  -PlainEnglish @("First Recovery Adapter MVP Design identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-recovery-adapter-mvp-design"

Write-Host "[OK] CodexForge Phase 719 first recovery adapter mvp design smoke passed."
