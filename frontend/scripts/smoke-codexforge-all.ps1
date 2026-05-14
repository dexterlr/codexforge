param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot

$scripts = @(
  @{
    Name = "Navigation"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-navigation.ps1"
    Required = $true
  },
  @{
    Name = "Product surface UI"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-product-surface-ui.ps1"
    Required = $true
  },
  @{
    Name = "Product surface planning"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-product-surface-planning.ps1"
    Required = $true
  },
  @{
    Name = "Tool adapter registry"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-tool-adapter-registry.ps1"
    Required = $true
  },
  @{
    Name = "Capability bridge"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-capability-bridge.ps1"
    Required = $true
  },
  @{
    Name = "Capability Cockpit"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-capability-cockpit.ps1"
    Required = $true
  },
  @{
    Name = "Web research executor"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-web-research.ps1"
    Required = $true
  },
  @{
    Name = "Self-upgrade backlog"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-self-upgrade.ps1"
    Required = $true
  },
  @{
    Name = "Self-upgrade console UI"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-self-upgrade-console-ui.ps1"
    Required = $true
  },
  @{
    Name = "Tool-policy UI"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-tool-policy-ui.ps1"
    Required = $true
  },
  @{
    Name = "Tool approval retry API"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-tool-approval-retry-api.ps1"
    Required = $true
  },
  @{
    Name = "Capability routing"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-capability-routing.ps1"
    Required = $false
  },
  @{
    Name = "Latest-message authority"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-latest-message-authority.ps1"
    Required = $false
  },
  @{
    Name = "Premium response composer"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-premium-response-composer.ps1"
    Required = $true
  },
  @{
    Name = "Final response validation"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-final-response-validation.ps1"
    Required = $true
  },
  @{
    Name = "Domain alignment"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-domain-alignment.ps1"
    Required = $true
  },
  @{
    Name = "Route override visible meta"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-route-override-visible-meta.ps1"
    Required = $false
  }
  @{
    Name = "Brain graph UI"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-graph-ui.ps1"
  }
  @{
    Name = "Brain command center"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-command-center.ps1"
    Required = $true
  }
  @{
    Name = "Brain command palette"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-command-palette.ps1"
    Required = $true
  }
  @{
    Name = "Brain layout polish"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-layout-polish.ps1"
    Required = $true
  }
  @{
    Name = "Brain replay lineage"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-replay-lineage.ps1"
    Required = $true
  }
  @{
    Name = "Brain semantic topology"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-semantic-topology.ps1"
    Required = $true
  }
  @{
    Name = "Brain recommendations"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-recommendations.ps1"
    Required = $true
  }
  @{
    Name = "Brain runtime health dashboard"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-runtime-health-dashboard.ps1"
    Required = $true
  }
  @{
    Name = "Brain panel data integration"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-panel-data-integration.ps1"
    Required = $true
  }
  @{
    Name = "Brain quality gates"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-quality-gates.ps1"
    Required = $true
  }
  @{
    Name = "Brain first-run onboarding"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-first-run-onboarding.ps1"
    Required = $true
  }
  @{
    Name = "Brain focus drilldown"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-focus-drilldown.ps1"
    Required = $true
  }
  @{
    Name = "Brain memory ingestion"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-memory-ingestion.ps1"
    Required = $true
  }
  @{
    Name = "Brain runtime"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brain-runtime.ps1"
    Required = $true
  }
  @{
    Name = "Agent runtime"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-agent-runtime.ps1"
    Required = $true
  }
  @{
    Name = "Agent runtime UX"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-agent-runtime-ux.ps1"
    Required = $true
  }
  @{
    Name = "Cognitive memory"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-cognitive-memory.ps1"
    Required = $true
  }
  @{
    Name = "Cognitive memory runtime integration"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-cognitive-memory-runtime-integration.ps1"
    Required = $true
  }
  @{
    Name = "Files UX"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-files-ux.ps1"
    Required = $true
  }
  @{
    Name = "Files runtime"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-files-runtime.ps1"
    Required = $true
  }
  @{
    Name = "Files Command Center"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-files-command-center.ps1"
    Required = $true
  }
  @{
    Name = "File workflow"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-file-workflow.ps1"
    Required = $true
  }
  @{
    Name = "File Brain Chat workflow"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-file-brain-chat-workflow.ps1"
    Required = $true
  }
  @{
    Name = "Patch Preview"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-patch-preview.ps1"
    Required = $true
  }
  @{
    Name = "Creative Production Studio"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-creative-production-studio.ps1"
    Required = $true
  }
  @{
    Name = "Operator Run Center"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-operator-run-center.ps1"
    Required = $true
  }
  @{
    Name = "Local Bridge"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-local-bridge.ps1"
    Required = $true
  }
  @{
    Name = "Predictive context"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-predictive-context.ps1"
    Required = $true
  }
  @{
    Name = "Predictive context UX"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-predictive-context-ux.ps1"
    Required = $true
  }
  @{
    Name = "Model router"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-model-router.ps1"
  }
  @{
    Name = "Brand cleanup"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-brand-clean.ps1"
  }
)

$startedAt = Get-Date
$results = @()

Write-Host ""
Write-Host "=== CodexForge smoke suite ==="
Write-Host "Base URL: $BaseUrl"
Write-Host "Started:  $($startedAt.ToString("s"))"
Write-Host ""

foreach ($item in $scripts) {
  $name = [string]$item.Name
  $path = [string]$item.Path
  $required = [bool]$item.Required

  if (-not (Test-Path $path)) {
    if ($required) {
      throw "[FAIL] Required smoke script missing: $path"
    }

    Write-Host "[SKIP] $name - script not found"
    $results += [pscustomobject]@{
      Name = $name
      Status = "SKIP"
      Path = $path
    }
    continue
  }

  Write-Host "[RUN ] $name"

  try {
    & powershell -ExecutionPolicy Bypass -File $path -BaseUrl $BaseUrl

    if ($LASTEXITCODE -ne 0) {
      throw "[FAIL] $name exited with code $LASTEXITCODE"
    }

    Write-Host "[PASS] $name"
    Write-Host ""

    $results += [pscustomobject]@{
      Name = $name
      Status = "PASS"
      Path = $path
    }
  } catch {
    Write-Host "[FAIL] $name"
    Write-Host $_
    throw
  }
}

$finishedAt = Get-Date
$passed = @($results | Where-Object { $_.Status -eq "PASS" }).Count
$skipped = @($results | Where-Object { $_.Status -eq "SKIP" }).Count

Write-Host ""
Write-Host "=== CodexForge smoke suite complete ==="
Write-Host "Passed:  $passed"
Write-Host "Skipped: $skipped"
Write-Host "Elapsed: $([math]::Round(($finishedAt - $startedAt).TotalSeconds, 2))s"
Write-Host ""

if ($passed -lt 1) {
  throw "[FAIL] No smoke scripts ran."
}

Write-Host "[OK] CodexForge smoke suite passed."
