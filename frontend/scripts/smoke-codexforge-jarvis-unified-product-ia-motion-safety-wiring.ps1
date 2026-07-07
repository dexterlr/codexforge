$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3938 Jarvis Unified Product IA Motion Safety Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-motion-safety-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Motion Safety Wiring' -RouteHref '/jarvis-unified-product-ia-motion-safety-wiring' -Phase 'Phase 3938' -Title 'Jarvis Unified Product IA Motion Safety Wiring'