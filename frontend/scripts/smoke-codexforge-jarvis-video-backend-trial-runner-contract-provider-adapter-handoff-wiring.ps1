param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3987 Jarvis Video Backend Trial Runner Contract Provider Adapter Handoff Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-provider-adapter-handoff-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-provider-adapter-handoff-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-provider-adapter-handoff-wiring' -Phase 'Phase 3987' -Title 'Jarvis Video Backend Trial Runner Contract Provider Adapter Handoff Wiring'
