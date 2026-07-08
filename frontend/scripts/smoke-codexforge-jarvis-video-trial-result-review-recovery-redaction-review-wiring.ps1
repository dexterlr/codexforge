param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4016 Jarvis Video Trial Result Review Recovery Redaction Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-redaction-review-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-redaction-review-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-redaction-review-wiring' -Phase 'Phase 4016' -Title 'Jarvis Video Trial Result Review Recovery Redaction Review Wiring'
