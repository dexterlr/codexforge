param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4017 Jarvis Video Trial Result Review Recovery Approval Audit Join Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-approval-audit-join-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-approval-audit-join-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-approval-audit-join-wiring' -Phase 'Phase 4017' -Title 'Jarvis Video Trial Result Review Recovery Approval Audit Join Wiring'
