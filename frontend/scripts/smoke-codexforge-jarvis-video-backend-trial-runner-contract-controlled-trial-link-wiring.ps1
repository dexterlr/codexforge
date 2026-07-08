param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 4003 Jarvis Video Backend Trial Runner Contract Controlled Trial Link Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-controlled-trial-link-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-controlled-trial-link-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-controlled-trial-link-wiring' -Phase 'Phase 4003' -Title 'Jarvis Video Backend Trial Runner Contract Controlled Trial Link Wiring'
