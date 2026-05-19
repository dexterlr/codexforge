"use client";

import { ValidationRunnerPanel } from "@/lib/codexforge/validation-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ValidationPageClient() {
  return (
    <div data-codexforge-validation-route="Validation route imports and renders ValidationRunnerPanel approval required no arbitrary shell no command execution without approval no file writes preserve latest-message authority">
      <CodexForgeAppShell activePath="/validation" workspaceLabel="Validation Runner" nextActionContext={{ hasRegressionOrFixWork: true }}>
        <ValidationRunnerPanel />
      </CodexForgeAppShell>
    </div>
  );
}
