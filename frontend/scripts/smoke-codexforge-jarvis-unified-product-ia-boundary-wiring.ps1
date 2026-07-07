$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3914 Jarvis Unified Product IA Boundary Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-boundary-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Boundary Wiring' -RouteHref '/jarvis-unified-product-ia-boundary-wiring' -Phase 'Phase 3914' -Title 'Jarvis Unified Product IA Boundary Wiring'