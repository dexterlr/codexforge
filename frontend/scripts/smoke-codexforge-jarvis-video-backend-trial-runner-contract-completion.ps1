param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 4009 Jarvis Video Backend Trial Runner Contract Completion' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-completion.ps1' -Route 'jarvis-video-backend-trial-runner-contract-completion' -RouteHref '/jarvis-video-backend-trial-runner-contract-completion' -Phase 'Phase 4009' -Title 'Jarvis Video Backend Trial Runner Contract Completion'
