param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 920 First Controlled Provider Trial Candidate" `
  -ScriptFile "smoke-codexforge-first-controlled-provider-trial-candidate.ps1" `
  -Domain "src\lib\codexforge\first-controlled-provider-trial-candidate" `
  -Route "src\app\first-controlled-provider-trial-candidate" `
  -MainPanel "FirstControlledProviderTrialCandidatePanel" `
  -CommandLabel "Go to First Controlled Provider Trial Candidate" `
  -Modules @("first-controlled-provider-trial-candidate-model.ts", "index.ts") `
  -Components @("FirstControlledProviderTrialCandidatePanel.tsx", "index.ts") `
  -Exports @("buildFirstControlledProviderTrialCandidateStableKey", "buildFirstControlledProviderTrialCandidate", "buildFirstControlledProviderTrialCandidateItems", "buildFirstControlledProviderTrialCandidateBoundary", "buildFirstControlledProviderTrialCandidateModel", "summarizeFirstControlledProviderTrialCandidate", "FIRST_CONTROLLED_PROVIDER_TRIAL_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First controlled provider trial candidate", "First controlled provider trial candidate does not call providers", "Provider trials require explicit operator approval", "Trial candidates preserve shared CodexForge brain state", "Denied provider trial candidate paths remain blocked", "First controlled provider trial checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First controlled provider trial candidate does not call providers", "Provider trials require explicit operator approval", "Denied provider trial candidate paths remain blocked") `
  -RouteHref "/first-controlled-provider-trial-candidate"

Write-Host "[OK] CodexForge Phase 920 first controlled provider trial candidate smoke passed."
