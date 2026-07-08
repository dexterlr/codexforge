param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4013 Jarvis Video Trial Result Review Recovery Result Receipt Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-result-receipt-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-result-receipt-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-result-receipt-wiring' -Phase 'Phase 4013' -Title 'Jarvis Video Trial Result Review Recovery Result Receipt Wiring'
