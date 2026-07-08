param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3988 Jarvis Video Backend Trial Runner Contract Approval Audit Join Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-approval-audit-join-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-approval-audit-join-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-approval-audit-join-wiring' -Phase 'Phase 3988' -Title 'Jarvis Video Backend Trial Runner Contract Approval Audit Join Wiring'
