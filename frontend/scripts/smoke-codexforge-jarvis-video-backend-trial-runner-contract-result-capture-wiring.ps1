param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3996 Jarvis Video Backend Trial Runner Contract Result Capture Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-result-capture-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-result-capture-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-result-capture-wiring' -Phase 'Phase 3996' -Title 'Jarvis Video Backend Trial Runner Contract Result Capture Wiring'
