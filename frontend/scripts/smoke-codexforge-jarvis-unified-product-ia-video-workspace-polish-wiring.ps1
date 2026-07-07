$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3920 Jarvis Unified Product IA Video Workspace Polish Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-video-workspace-polish-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Video Workspace Polish Wiring' -RouteHref '/jarvis-unified-product-ia-video-workspace-polish-wiring' -Phase 'Phase 3920' -Title 'Jarvis Unified Product IA Video Workspace Polish Wiring'