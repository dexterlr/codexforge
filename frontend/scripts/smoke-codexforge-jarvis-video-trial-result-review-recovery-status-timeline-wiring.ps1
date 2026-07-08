param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4031 Jarvis Video Trial Result Review Recovery Status Timeline Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-status-timeline-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-status-timeline-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-status-timeline-wiring' -Phase 'Phase 4031' -Title 'Jarvis Video Trial Result Review Recovery Status Timeline Wiring'
