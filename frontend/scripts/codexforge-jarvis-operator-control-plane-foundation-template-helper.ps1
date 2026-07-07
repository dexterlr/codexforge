Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$routes = @(
  @{ Phase = 3562; Slug = "jarvis-control-plane-boundary-wiring"; Title = "Jarvis Control Plane Boundary Wiring" },
  @{ Phase = 3563; Slug = "jarvis-control-plane-intent-wiring"; Title = "Jarvis Control Plane Intent Wiring" },
  @{ Phase = 3564; Slug = "jarvis-control-plane-capability-registry-wiring"; Title = "Jarvis Control Plane Capability Registry Wiring" },
  @{ Phase = 3565; Slug = "jarvis-control-plane-feature-map-wiring"; Title = "Jarvis Control Plane Feature Map Wiring" },
  @{ Phase = 3566; Slug = "jarvis-control-plane-permission-posture-wiring"; Title = "Jarvis Control Plane Permission Posture Wiring" },
  @{ Phase = 3567; Slug = "jarvis-control-plane-approval-router-wiring"; Title = "Jarvis Control Plane Approval Router Wiring" },
  @{ Phase = 3568; Slug = "jarvis-control-plane-backend-adapter-contract-wiring"; Title = "Jarvis Control Plane Backend Adapter Contract Wiring" },
  @{ Phase = 3569; Slug = "jarvis-control-plane-video-adapter-awareness-wiring"; Title = "Jarvis Control Plane Video Adapter Awareness Wiring" },
  @{ Phase = 3570; Slug = "jarvis-control-plane-website-adapter-awareness-wiring"; Title = "Jarvis Control Plane Website Adapter Awareness Wiring" },
  @{ Phase = 3571; Slug = "jarvis-control-plane-avatar-adapter-awareness-wiring"; Title = "Jarvis Control Plane Avatar Adapter Awareness Wiring" },
  @{ Phase = 3572; Slug = "jarvis-control-plane-chatbot-brain-awareness-wiring"; Title = "Jarvis Control Plane Chatbot Brain Awareness Wiring" },
  @{ Phase = 3573; Slug = "jarvis-control-plane-trading-adapter-awareness-wiring"; Title = "Jarvis Control Plane Trading Adapter Awareness Wiring" },
  @{ Phase = 3574; Slug = "jarvis-control-plane-workflow-adapter-awareness-wiring"; Title = "Jarvis Control Plane Workflow Adapter Awareness Wiring" },
  @{ Phase = 3575; Slug = "jarvis-control-plane-render-export-publish-awareness-wiring"; Title = "Jarvis Control Plane Render Export Publish Awareness Wiring" },
  @{ Phase = 3576; Slug = "jarvis-control-plane-task-planner-readiness-wiring"; Title = "Jarvis Control Plane Task Planner Readiness Wiring" },
  @{ Phase = 3577; Slug = "jarvis-control-plane-human-approval-gate-wiring"; Title = "Jarvis Control Plane Human Approval Gate Wiring" },
  @{ Phase = 3578; Slug = "jarvis-control-plane-risk-tier-wiring"; Title = "Jarvis Control Plane Risk Tier Wiring" },
  @{ Phase = 3579; Slug = "jarvis-control-plane-dry-run-first-policy-wiring"; Title = "Jarvis Control Plane Dry Run First Policy Wiring" },
  @{ Phase = 3580; Slug = "jarvis-control-plane-audit-readiness-wiring"; Title = "Jarvis Control Plane Audit Readiness Wiring" },
  @{ Phase = 3581; Slug = "jarvis-control-plane-observability-readiness-wiring"; Title = "Jarvis Control Plane Observability Readiness Wiring" },
  @{ Phase = 3582; Slug = "jarvis-control-plane-result-ledger-readiness-wiring"; Title = "Jarvis Control Plane Result Ledger Readiness Wiring" },
  @{ Phase = 3583; Slug = "jarvis-control-plane-memory-boundary-wiring"; Title = "Jarvis Control Plane Memory Boundary Wiring" },
  @{ Phase = 3584; Slug = "jarvis-control-plane-kill-switch-wiring"; Title = "Jarvis Control Plane Kill Switch Wiring" },
  @{ Phase = 3585; Slug = "jarvis-control-plane-lock-manager-readiness-wiring"; Title = "Jarvis Control Plane Lock Manager Readiness Wiring" },
  @{ Phase = 3586; Slug = "jarvis-control-plane-idempotency-readiness-wiring"; Title = "Jarvis Control Plane Idempotency Readiness Wiring" },
  @{ Phase = 3587; Slug = "jarvis-control-plane-replay-block-wiring"; Title = "Jarvis Control Plane Replay Block Wiring" },
  @{ Phase = 3588; Slug = "jarvis-control-plane-operator-review-wiring"; Title = "Jarvis Control Plane Operator Review Wiring" },
  @{ Phase = 3589; Slug = "jarvis-control-plane-status-dashboard-wiring"; Title = "Jarvis Control Plane Status Dashboard Wiring" },
  @{ Phase = 3590; Slug = "jarvis-control-plane-adapter-plugin-roadmap-wiring"; Title = "Jarvis Control Plane Adapter Plugin Roadmap Wiring" },
  @{ Phase = 3591; Slug = "jarvis-control-plane-no-execution-guard-wiring"; Title = "Jarvis Control Plane No Execution Guard Wiring" },
  @{ Phase = 3592; Slug = "jarvis-control-plane-foundation-readiness-wiring"; Title = "Jarvis Control Plane Foundation Readiness Wiring" },
  @{ Phase = 3593; Slug = "jarvis-control-plane-foundation-completion"; Title = "Jarvis Control Plane Foundation Completion" }
)

function Write-Utf8NoBomFile {
  param(
    [string]$Path,
    [string]$Content
  )

  $directory = Split-Path -Parent $Path
  if ($directory -and -not (Test-Path $directory)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
  }

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $encoding)
}

foreach ($route in $routes) {
  $panelName = ($route.Title -replace "[^A-Za-z0-9]", "") + "Panel"

  Write-Utf8NoBomFile "src/app/$($route.Slug)/page.tsx" "export { JarvisControlPlanePhasePageClient as default } from './page-client';`n"

  Write-Utf8NoBomFile "src/app/$($route.Slug)/page-client.tsx" @"
'use client';

import { JarvisControlPlanePageClientShell } from '@/lib/codexforge/jarvis-control-plane-map/components';

export function JarvisControlPlanePhasePageClient() {
  return JarvisControlPlanePageClientShell({ routeSlug: '$($route.Slug)' });
}
"@

  Write-Utf8NoBomFile "src/lib/codexforge/$($route.Slug)/index.ts" "export * from './components';`n"
  Write-Utf8NoBomFile "src/lib/codexforge/$($route.Slug)/components/index.ts" "export * from './$panelName';`n"

  Write-Utf8NoBomFile "src/lib/codexforge/$($route.Slug)/components/$panelName.tsx" @"
'use client';

import { JarvisControlPlaneRoutePanel } from '../../jarvis-control-plane-map/components';

export function $panelName() {
  return JarvisControlPlaneRoutePanel({ routeSlug: '$($route.Slug)' });
}
"@

  Write-Utf8NoBomFile "scripts/smoke-codexforge-$($route.Slug).ps1" @"
param([string]`$BaseUrl = 'http://localhost:3000')

`$ErrorActionPreference = 'Stop'
. (Join-Path `$PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase $($route.Phase) $($route.Title)' -ScriptFile 'smoke-codexforge-$($route.Slug).ps1' -Route '$($route.Slug)' -CommandLabel 'Go to $($route.Title)' -RouteHref '/$($route.Slug)' -Phase '$($route.Phase)' -Title '$($route.Title)'
"@
}

$megaLines = ($routes | ForEach-Object {
  "& (Join-Path `$PSScriptRoot 'smoke-codexforge-$($_.Slug).ps1') -BaseUrl `$BaseUrl"
}) -join "`n"

Write-Utf8NoBomFile "scripts/smoke-codexforge-jarvis-operator-control-plane-foundation-mega-batch.ps1" @"
param([string]`$BaseUrl = 'http://localhost:3000')

`$ErrorActionPreference = 'Stop'
Write-Host '=== CodexForge Jarvis Operator Control Plane Foundation Mega Batch smoke ==='
$megaLines
Write-Host '[OK] CodexForge Jarvis Operator Control Plane Foundation Mega Batch smoke passed.'
"@
