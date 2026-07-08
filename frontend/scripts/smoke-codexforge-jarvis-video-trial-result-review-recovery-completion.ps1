param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4041 Jarvis Video Trial Result Review Recovery Completion' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-completion.ps1' -Route 'jarvis-video-trial-result-review-recovery-completion' -RouteHref '/jarvis-video-trial-result-review-recovery-completion' -Phase 'Phase 4041' -Title 'Jarvis Video Trial Result Review Recovery Completion'
