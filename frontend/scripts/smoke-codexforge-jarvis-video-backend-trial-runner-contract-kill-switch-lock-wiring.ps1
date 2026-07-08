param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3999 Jarvis Video Backend Trial Runner Contract Kill Switch Lock Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-kill-switch-lock-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-kill-switch-lock-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-kill-switch-lock-wiring' -Phase 'Phase 3999' -Title 'Jarvis Video Backend Trial Runner Contract Kill Switch Lock Wiring'
