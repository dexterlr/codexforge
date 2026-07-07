$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3918 Jarvis Unified Product IA Jarvis Command Center Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-jarvis-command-center-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Jarvis Command Center Wiring' -RouteHref '/jarvis-unified-product-ia-jarvis-command-center-wiring' -Phase 'Phase 3918' -Title 'Jarvis Unified Product IA Jarvis Command Center Wiring'