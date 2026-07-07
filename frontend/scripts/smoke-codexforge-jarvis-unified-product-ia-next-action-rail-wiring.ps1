$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3927 Jarvis Unified Product IA Next Action Rail Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-next-action-rail-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Next Action Rail Wiring' -RouteHref '/jarvis-unified-product-ia-next-action-rail-wiring' -Phase 'Phase 3927' -Title 'Jarvis Unified Product IA Next Action Rail Wiring'