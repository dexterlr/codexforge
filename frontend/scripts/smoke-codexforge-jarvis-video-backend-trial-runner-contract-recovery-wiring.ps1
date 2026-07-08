param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3998 Jarvis Video Backend Trial Runner Contract Recovery Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-recovery-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-recovery-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-recovery-wiring' -Phase 'Phase 3998' -Title 'Jarvis Video Backend Trial Runner Contract Recovery Wiring'
