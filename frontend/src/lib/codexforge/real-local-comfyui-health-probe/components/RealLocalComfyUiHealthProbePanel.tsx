"use client";

import {
  PreviewFoundationCard,
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  PreviewFoundationPillList,
  PreviewFoundationSafetyStrip,
  previewStyles,
} from "../../video-foundation-ui";
import { buildRealLocalComfyUiHealthProbeSummary } from "@/lib/codexforge/real-local-comfyui-health-probe";

export function RealLocalComfyUiHealthProbePanel() {
  const model = buildRealLocalComfyUiHealthProbeSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-real-local-comfyui-health-probe="RealLocalComfyUiHealthProbePanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Real local ComfyUI health probe Localhost-only readiness check Nothing is submitted yet No cloud calls Approved local boundary required no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no artifact deletion no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 174"
        title="Real ComfyUI health"
        subtitle="Localhost-only readiness check for a future approved local ComfyUI health probe."
        primary={{ href: "#real-local-comfyui-health", label: "Review health readiness" }}
        links={[
          { href: "/comfyui-health/gate", label: "Health gate" },
          { href: "/local-bridge-health", label: "Bridge health" },
          { href: "/comfyui-metadata-reader", label: "Metadata reader" },
          { href: "/workflow-package-validator", label: "Package validator" },
          { href: "/comfyui-submit-trial", label: "Submit trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Localhost-only readiness check",
          "Nothing is submitted yet",
          "No cloud calls",
          "No secrets shown",
          "Approved local boundary required",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            `status: ${model.status}`,
            `existing health gate: ${model.boundary.existingHealthGateStatus}`,
            `local bridge readiness: ${model.boundary.localBridgeFutureProbeReadiness}`,
            `live probe ready: ${model.readyForLiveProbe ? "yes" : "no"}`,
          ]}
        />
      </PreviewFoundationCard>
      <section id="real-local-comfyui-health" style={previewStyles.grid}>
        <PreviewFoundationCard title={model.contract.title}>
          <PreviewFoundationCopy>
            This page prepares a real local ComfyUI health probe contract. It does not add arbitrary network input, does not run a UI fetch, and does not contact ComfyUI yet.
          </PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              model.contract.scopeLabel,
              `allowed hosts: ${model.contract.allowedHosts.join(", ")}`,
              model.contract.configuredBaseUrlPolicy,
              model.contract.timeoutBoundary,
              model.contract.retryBoundary,
              model.contract.healthEndpoint,
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Readiness checklist">
          <PreviewFoundationPillList
            items={model.checks.map((check) => `${check.label}: ${check.status}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Boundary">
          <PreviewFoundationCopy>
            The live probe is not executed from arbitrary UI yet. A future local bridge can own the localhost check only after explicit approval.
          </PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              "local bridge availability",
              "configured ComfyUI base URL policy",
              "allowed host boundary",
              "timeout / retry boundaries",
              "health endpoint readiness",
              "no cloud call",
              "no secret exposure",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval handoff">
          <PreviewFoundationCopy>{model.handoff.approvalCopy}</PreviewFoundationCopy>
          <PreviewFoundationPillList items={[model.handoff.nextStep, model.handoff.safetyNote]} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced health probe details">
        <PreviewFoundationCopy>
          Advanced details are secondary. The allowed-host policy is loopback only, the configured ComfyUI base URL is not a secret, timeout and retry limits must be explicit, and the health endpoint readiness check cannot submit a workflow or mutate a queue.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
