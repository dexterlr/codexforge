$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3915 Jarvis Unified Product IA Intent Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-intent-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Intent Wiring' -RouteHref '/jarvis-unified-product-ia-intent-wiring' -Phase 'Phase 3915' -Title 'Jarvis Unified Product IA Intent Wiring'