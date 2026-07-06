param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3369 Controlled Render Artifact Assembly Trial Completion' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-trial-completion.ps1' `
  -Route 'controlled-render-artifact-assembly-trial-completion' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Trial Completion' `
  -RouteHref '/controlled-render-artifact-assembly-trial-completion' `
  -Phase 'Phase 3369' `
  -Title 'Controlled Render Artifact Assembly Trial Completion'
