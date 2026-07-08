param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4025 Jarvis Video Trial Result Review Recovery Cost Rate Recovery Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-cost-rate-recovery-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-cost-rate-recovery-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-cost-rate-recovery-wiring' -Phase 'Phase 4025' -Title 'Jarvis Video Trial Result Review Recovery Cost Rate Recovery Wiring'
