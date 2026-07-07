$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3929 Jarvis Unified Product IA Approval Summary Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-approval-summary-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Approval Summary Wiring' -RouteHref '/jarvis-unified-product-ia-approval-summary-wiring' -Phase 'Phase 3929' -Title 'Jarvis Unified Product IA Approval Summary Wiring'