param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4012 Jarvis Video Trial Result Review Recovery Result Envelope Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-result-envelope-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-result-envelope-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-result-envelope-wiring' -Phase 'Phase 4012' -Title 'Jarvis Video Trial Result Review Recovery Result Envelope Wiring'
