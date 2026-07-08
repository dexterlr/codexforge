param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 4002 Jarvis Video Backend Trial Runner Contract Jarvis Video Update Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-jarvis-video-update-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-jarvis-video-update-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-jarvis-video-update-wiring' -Phase 'Phase 4002' -Title 'Jarvis Video Backend Trial Runner Contract Jarvis Video Update Wiring'
