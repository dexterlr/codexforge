$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3937 Jarvis Unified Product IA Accessibility Guard Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-accessibility-guard-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Accessibility Guard Wiring' -RouteHref '/jarvis-unified-product-ia-accessibility-guard-wiring' -Phase 'Phase 3937' -Title 'Jarvis Unified Product IA Accessibility Guard Wiring'