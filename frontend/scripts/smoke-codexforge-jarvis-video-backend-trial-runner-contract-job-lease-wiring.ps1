param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3984 Jarvis Video Backend Trial Runner Contract Job Lease Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-job-lease-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-job-lease-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-job-lease-wiring' -Phase 'Phase 3984' -Title 'Jarvis Video Backend Trial Runner Contract Job Lease Wiring'
