param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4037 Jarvis Video Trial Result Review Recovery No Execution Guard Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-no-execution-guard-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-no-execution-guard-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-no-execution-guard-wiring' -Phase 'Phase 4037' -Title 'Jarvis Video Trial Result Review Recovery No Execution Guard Wiring'
