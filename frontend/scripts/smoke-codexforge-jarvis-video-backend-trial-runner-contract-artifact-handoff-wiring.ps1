param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3997 Jarvis Video Backend Trial Runner Contract Artifact Handoff Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-artifact-handoff-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-artifact-handoff-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-artifact-handoff-wiring' -Phase 'Phase 3997' -Title 'Jarvis Video Backend Trial Runner Contract Artifact Handoff Wiring'
