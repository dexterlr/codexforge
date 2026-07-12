"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import {
  buildAthenaProviderSelectionPreviewFromExactStaticExamples,
  buildBlockedProviderExecutionSummary,
  buildCapabilityMatrixPreview,
  buildProviderReadinessSummary,
  groupCapabilitiesByWorkspaceTarget,
  listModelProviderSlots,
} from "@/lib/codexforge/ai-provider-registry";
import {
  buildAdapterReadinessSummary,
  buildBlockedModelExecutionSummary,
  groupAdapterContractsByCapabilityFamily,
  groupAdapterContractsByWorkspaceTarget,
  listModelAdapterErrorEnvelopePreviews,
  listModelAdapterRequestEnvelopePreviews,
  listModelAdapterResponseEnvelopePreviews,
  listServerOnlyAdapterGateChecklist,
  listServerOnlyModelAdapterContracts,
} from "@/lib/codexforge/server-only-model-adapter-contracts";
import {
  buildBlockedDryRunExecutionSummary,
  buildDryRunReadinessSummary,
  buildNextResultReviewAndRecoveryChecklist,
  getManualGatedModelAdapterDryRunHarness,
  listDryRunDenialFailurePreviews,
  listDryRunFixtureResultPreviews,
  listDryRunRequestPacketPreviews,
  listManualDryRunGateChecklist,
  listManualGatedModelAdapterDryRunScenarios,
} from "@/lib/codexforge/manual-gated-model-adapter-dry-run-harness";

export function AiProviderRegistryPanel() {
  const providerSlots = listModelProviderSlots();
  const readinessSummary = buildProviderReadinessSummary();
  const blockedExecutionSummary = buildBlockedProviderExecutionSummary();
  const capabilityMatrixPreview = buildCapabilityMatrixPreview();
  const selectionPreview =
    buildAthenaProviderSelectionPreviewFromExactStaticExamples();
  const workspaceCapabilityGroups = groupCapabilitiesByWorkspaceTarget();
  const adapterContracts = listServerOnlyModelAdapterContracts();
  const adapterRequestEnvelopePreviews = listModelAdapterRequestEnvelopePreviews();
  const adapterResponseEnvelopePreviews =
    listModelAdapterResponseEnvelopePreviews();
  const adapterErrorEnvelopePreviews = listModelAdapterErrorEnvelopePreviews();
  const adapterReadinessSummary = buildAdapterReadinessSummary();
  const blockedModelExecutionSummary = buildBlockedModelExecutionSummary();
  const adapterContractsByCapabilityFamily =
    groupAdapterContractsByCapabilityFamily();
  const adapterContractsByWorkspaceTarget =
    groupAdapterContractsByWorkspaceTarget();
  const serverOnlyAdapterGateChecklist = listServerOnlyAdapterGateChecklist();
  const dryRunHarness = getManualGatedModelAdapterDryRunHarness();
  const dryRunReadinessSummary = buildDryRunReadinessSummary();
  const blockedDryRunExecutionSummary = buildBlockedDryRunExecutionSummary();
  const nextResultReviewRecoveryChecklist =
    buildNextResultReviewAndRecoveryChecklist();
  const dryRunScenarios = listManualGatedModelAdapterDryRunScenarios();
  const dryRunRequestPacketPreviews = listDryRunRequestPacketPreviews();
  const dryRunFixtureResultPreviews = listDryRunFixtureResultPreviews();
  const dryRunDenialFailurePreviews = listDryRunDenialFailurePreviews();
  const manualDryRunGateChecklist = listManualDryRunGateChecklist();
  const representativeRequestEnvelope = adapterRequestEnvelopePreviews[0] ?? null;
  const representativeResponseEnvelope =
    adapterResponseEnvelopePreviews[0] ?? null;
  const representativeErrorEnvelope = adapterErrorEnvelopePreviews[0] ?? null;
  const representativeDryRunRequestPacket = dryRunRequestPacketPreviews[0] ?? null;
  const representativeDryRunFixtureResult =
    dryRunFixtureResultPreviews[0] ?? null;
  const representativeDryRunDenialFailure =
    dryRunDenialFailurePreviews[0] ?? null;
  const providerLabelsById = new Map(
    providerSlots.map((slot) => [slot.id, slot.label] as const)
  );

  return (
    <div
      style={shell}
      data-codexforge-ai-provider-registry="4682-4713 - AI Model Provider Registry and Capability Matrix 4714-4745 - Server-Only Model Adapter Contracts 4746-4777 - Manual Gated Model Adapter Dry-Run Harness AI model provider registry Capability matrix Provider selection preview Server-only model adapter contracts Adapter envelope preview Server-only adapter gates Manual gated model adapter dry-run harness Dry-run scenario preview Fixture result preview Manual dry-run gates Provider slots are registry-only dry-run harness is fixture-only No model calls yet No prompt sending No provider SDKs imported Provider execution is blocked Dry-run result review and recovery comes next"
    >
      <section style={hero}>
        <div>
          <span style={eyebrow}>{`Phase ${dryRunHarness.highestDetectedPhase}`}</span>
          <h1 style={headline}>AI model provider registry</h1>
          <p style={lede}>
            Athena can see model provider slots, capability families, workspace
            targets, blocked routing posture, server-only model adapter
            contracts, adapter envelope previews, and the live fixture-only
            manual gated dry-run harness previews. Provider slots are
            registry-only. Capability matrix is preview-only. Server-only model
            adapter contracts are preview-only. Adapter envelope preview is
            preview-only. dry-run harness is fixture-only. No model calls yet.
            No prompt sending. No provider SDKs imported. Frontend provider
            calls are blocked. Dry-run result review and recovery comes next.
          </p>
        </div>
        <div style={linkRow}>
          <Link href="/jarvis" style={primaryLink}>Open Athena Command Center</Link>
          <Link href="/jarvis-video" style={link}>Open Jarvis Video Studio</Link>
          <Link href="/jarvis-safety" style={link}>Safety / Settings</Link>
          <Link href="/jarvis-audit" style={link}>Audit / Runs</Link>
        </div>
      </section>

      <section style={metricGrid}>
        <div style={metric}>
          <span>Provider slots</span>
          <strong>{readinessSummary.providerSlotCount}</strong>
        </div>
        <div style={metric}>
          <span>Capability rows</span>
          <strong>{capabilityMatrixPreview.capabilityCount}</strong>
        </div>
        <div style={metric}>
          <span>Workspace targets</span>
          <strong>{readinessSummary.workspaceTargetCount}</strong>
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Registry posture</span>
            <h2 style={sectionTitle}>AI model provider registry</h2>
          </div>
          <span style={sectionBadge}>Registry-only</span>
        </div>
        <p style={copy}>
          Provider slots are registry-only. No model calls yet. No prompt
          sending. No provider SDKs imported. Server-only adapters required.
          Credential isolation required. Operator approval required. Kill switch
          required. Audit required.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Registry summary</span>
            <h3 style={cardTitle}>Athena / Jarvis Model Gateway</h3>
            <p style={copy}>Source: Athena / Jarvis Model Gateway.</p>
            <p style={copy}>Registry mode: preview-only.</p>
            <p style={copy}>Provider status: registry-only / not connected.</p>
            <div style={list}>
              {readinessSummary.summaryLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Blocked posture</span>
            <h3 style={cardTitle}>Execution remains blocked</h3>
            <p style={copy}>{blockedExecutionSummary.summary}</p>
            <div style={list}>
              {blockedExecutionSummary.blockedLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Next batch</span>
            <h3 style={cardTitle}>Manual gated model adapter dry-run harness</h3>
            <p style={copy}>
              Fixture-only dry-run harness previews are now visible in the
              provider hub.
            </p>
            <div style={list}>
              {[
                "dry-run harness is fixture-only",
                "manual operator approval is required",
                "manual confirmation is required",
                "kill switch required",
                "audit required",
                "Dry-run result review and recovery comes next",
              ].map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
        <div style={grid}>
          {providerSlots.map((slot) => (
            <article key={slot.key} style={card}>
              <span style={tag}>Provider slot</span>
              <h3 style={cardTitle}>{slot.label}</h3>
              <p style={copy}>{slot.description}</p>
              <p style={copy}>
                {`Status: ${slot.providerStatus}. Current state: ${slot.currentState}.`}
              </p>
              <p style={copy}>
                {`Workspace targets: ${slot.workspaceTargets.join(" | ")}`}
              </p>
              <div style={list}>
                {slot.capabilityFamilies.map((item) => (
                  <span key={item} style={pill}>
                    {item}
                  </span>
                ))}
              </div>
              <p style={copy}>{`Blocked by: ${slot.blockedBy.join(" | ")}`}</p>
              <p style={copy}>
                {`Next adapter requirement: ${slot.nextAdapterRequirement}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Capability families</span>
            <h2 style={sectionTitle}>Capability matrix</h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          text/chat, code, image, video, audio/voice, transcription,
          embeddings/search, safety/moderation, and local inference stay blocked
          / registry-only. Each capability is not connected yet. Each capability
          requires a server-only adapter before execution.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Matrix summary</span>
            <h3 style={cardTitle}>Capability matrix is preview-only</h3>
            <p style={copy}>
              {`${capabilityMatrixPreview.blockedCapabilityCount} of ${capabilityMatrixPreview.capabilityCount} capability rows are blocked / registry-only.`}
            </p>
            <div style={list}>
              <span style={pill}>No model calls yet</span>
              <span style={pill}>No prompt sending</span>
              <span style={pill}>No provider SDKs imported</span>
              <span style={pill}>Server-only adapters required</span>
              <span style={pill}>Credential isolation required</span>
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Workspace coverage</span>
            <h3 style={cardTitle}>Which plugin/workspace each capability can serve</h3>
            <div style={list}>
              {workspaceCapabilityGroups.map((group) => (
                <span key={group.workspaceTarget} style={pill}>
                  {`${group.workspaceTarget}: ${group.capabilityRows.length}`}
                </span>
              ))}
            </div>
          </article>
        </div>
        <div style={grid}>
          {capabilityMatrixPreview.matrixRows.map((row) => (
            <article key={row.key} style={card}>
              <span style={tag}>Capability row</span>
              <h3 style={cardTitle}>{row.label}</h3>
              <p style={copy}>{row.description}</p>
              <p style={copy}>
                {`Provider slots: ${row.providerSlotIds
                  .map((slotId) => providerLabelsById.get(slotId) ?? slotId)
                  .join(" | ")}`}
              </p>
              <p style={copy}>
                {`Workspace targets: ${row.workspaceTargets.join(" | ")}`}
              </p>
              <div style={list}>
                <span style={pill}>{row.approvalRequirement}</span>
                <span style={pill}>{row.safetyRequirement}</span>
                <span style={pill}>{row.auditRequirement}</span>
                <span style={pill}>{row.credentialIsolationRequirement}</span>
                <span style={pill}>{row.backendOnlyAdapterRequirement}</span>
                <span style={pill}>{row.executionPosture}</span>
              </div>
              <p style={copy}>{`Current state: ${row.currentState}.`}</p>
              <p style={copy}>
                {`Next adapter requirement: ${row.nextAdapterRequirement}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Routing-readiness preview</span>
            <h2 style={sectionTitle}>Provider selection preview</h2>
          </div>
          <span style={sectionBadge}>Blocked by default</span>
        </div>
        <p style={copy}>
          command planning -&gt; text/planning capability. product video -&gt;
          video capability. storyboard -&gt; image capability. narration -&gt;
          audio/voice capability. captions -&gt; transcription capability.
          private/local task -&gt; local inference capability.
        </p>
        <div style={grid}>
          {selectionPreview.map((item) => (
            <article key={item.id} style={card}>
              <span style={tag}>Static example</span>
              <h3 style={cardTitle}>{item.requestLabel}</h3>
              <p style={copy}>
                {`${item.providerFamilyLabel} -> ${item.capabilityLabel}`}
              </p>
              <p style={copy}>
                {`Workspace targets: ${item.workspaceTargets.join(" | ")}`}
              </p>
              <p style={copy}>{`Execution posture: ${item.executionPosture}.`}</p>
              <p style={copy}>{`Current state: ${item.currentState}.`}</p>
              <p style={copy}>{`Blocked by: ${item.blockedBy.join(" | ")}`}</p>
              <p style={copy}>
                {`Next adapter requirement: ${item.nextAdapterRequirement}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Model Gateway contract layer</span>
            <h2 style={sectionTitle}>Server-only model adapter contracts</h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          Server-only model adapter contracts. model adapters must run
          server-only. Frontend provider calls are blocked. No model calls yet.
          No prompt sending. No provider SDKs imported. Opaque credential
          references only. Manual gated model adapter dry-run harness is now
          available as a fixture-only preview. Dry-run result review and
          recovery comes next.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Contract posture</span>
            <h3 style={cardTitle}>model adapters must run server-only</h3>
            <p style={copy}>{blockedModelExecutionSummary.summary}</p>
            <div style={list}>
              {blockedModelExecutionSummary.blockedLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Coverage</span>
            <h3 style={cardTitle}>Typed capability families stay inert</h3>
            <p style={copy}>
              {`${adapterReadinessSummary.contractCount} contracts | ${adapterContractsByCapabilityFamily.length} capability families | ${adapterContractsByWorkspaceTarget.length} workspace targets.`}
            </p>
            <div style={list}>
              {adapterContractsByCapabilityFamily.map((group) => (
                <span key={group.capabilityFamilyId} style={pill}>
                  {`${group.capabilityFamilyLabel}: ${group.contractCount}`}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Next likely batch</span>
            <h3 style={cardTitle}>
              Manual gated model adapter dry-run harness
            </h3>
            <p style={copy}>
              {`Latest completed batch: ${adapterReadinessSummary.latestCompletedBatch}. Previous completed batch: ${adapterReadinessSummary.previousCompletedBatch}.`}
            </p>
            <div style={list}>
              {nextResultReviewRecoveryChecklist.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
        <div style={grid}>
          {adapterContracts.map((contract) => (
            <article key={contract.key} style={card}>
              <span style={tag}>Capability family</span>
              <h3 style={cardTitle}>{contract.label}</h3>
              <p style={copy}>{contract.summary}</p>
              <p style={copy}>
                {`Workspace targets: ${contract.workspaceTargets.join(" | ")}`}
              </p>
              <div style={list}>
                <span style={pill}>{contract.contractVersion}</span>
                <span style={pill}>{contract.contractMode}</span>
                <span style={pill}>{contract.adapterPosture}</span>
                <span style={pill}>{contract.credentialPosture}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Preview-only envelopes</span>
            <h2 style={sectionTitle}>Adapter envelope preview</h2>
          </div>
          <span style={sectionBadge}>Blocked by default</span>
        </div>
        <p style={copy}>
          Adapter envelope preview. request envelope preview. response envelope
          preview. error envelope preview. prompt payload is redacted placeholder
          only. provider response is not received. result is placeholder only.
          audit/approval/result persistence not implemented.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Envelope summary</span>
            <h3 style={cardTitle}>adapter envelopes are preview-only</h3>
            <p style={copy}>
              {`${adapterReadinessSummary.requestEnvelopeCount} request envelope previews | ${adapterReadinessSummary.responseEnvelopeCount} response envelope previews | ${adapterReadinessSummary.errorEnvelopeCount} error envelope previews.`}
            </p>
            <div style={list}>
              {adapterReadinessSummary.summaryLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeRequestEnvelope ? (
            <article style={card}>
              <span style={tag}>request envelope preview</span>
              <h3 style={cardTitle}>
                {representativeRequestEnvelope.capabilityLabel}
              </h3>
              <p style={copy}>
                {`request envelope version: ${representativeRequestEnvelope.requestEnvelopeVersion}.`}
              </p>
              <p style={copy}>
                {`prompt payload posture: ${representativeRequestEnvelope.promptPayloadPosture}.`}
              </p>
              <p style={copy}>
                {`workspace target: ${representativeRequestEnvelope.workspaceTarget}.`}
              </p>
            </article>
          ) : null}
          {representativeResponseEnvelope ? (
            <article style={card}>
              <span style={tag}>response envelope preview</span>
              <h3 style={cardTitle}>result is placeholder only</h3>
              <p style={copy}>
                {`response envelope version: ${representativeResponseEnvelope.responseEnvelopeVersion}.`}
              </p>
              <p style={copy}>
                {`provider response state: ${representativeResponseEnvelope.providerResponseState}.`}
              </p>
              <p style={copy}>
                {`result capture state: ${representativeResponseEnvelope.resultCaptureState}.`}
              </p>
            </article>
          ) : null}
          {representativeErrorEnvelope ? (
            <article style={card}>
              <span style={tag}>error envelope preview</span>
              <h3 style={cardTitle}>provider error state is not received</h3>
              <p style={copy}>
                {`error envelope version: ${representativeErrorEnvelope.errorEnvelopeVersion}.`}
              </p>
              <p style={copy}>
                {`retry/fallback posture: ${representativeErrorEnvelope.retryFallbackPosture}.`}
              </p>
              <div style={list}>
                {representativeErrorEnvelope.localValidationErrorExamples.map(
                  (item) => (
                    <span key={item} style={pill}>
                      {item}
                    </span>
                  )
                )}
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Release gate posture</span>
            <h2 style={sectionTitle}>Server-only adapter gates</h2>
          </div>
          <span style={sectionBadge}>Required</span>
        </div>
        <p style={copy}>
          Server-only adapter gates. No model calls yet. No prompt sending. No
          provider SDKs imported. Frontend provider calls are blocked. Opaque
          credential references only. Manual gated model adapter dry-run
          harness is fixture-only. Dry-run result review and recovery comes
          next.
        </p>
        <div style={grid}>
          {serverOnlyAdapterGateChecklist.map((gate) => (
            <article key={gate.id} style={card}>
              <span style={tag}>Required gate</span>
              <h3 style={cardTitle}>{gate.label}</h3>
              <p style={copy}>{gate.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Fixture-only harness</span>
            <h2 style={sectionTitle}>Manual gated model adapter dry-run harness</h2>
          </div>
          <span style={sectionBadge}>Fixture-only</span>
        </div>
        <p style={copy}>
          dry-run harness is fixture-only. manual operator approval is
          required. manual confirmation is required. kill switch required.
          audit required. server-only adapter contract required. No model calls
          yet. No prompt sending. No provider SDKs imported. Provider
          execution is blocked. Dry-run result review and recovery comes next.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Harness posture</span>
            <h3 style={cardTitle}>{dryRunHarness.currentBatch}</h3>
            <p style={copy}>
              {`Source: ${dryRunHarness.source}. Harness mode: ${dryRunHarness.harnessMode}. Fixture mode: ${dryRunHarness.fixtureMode}.`}
            </p>
            <div style={list}>
              {[
                "dry-run harness is fixture-only",
                dryRunHarness.manualOperatorApprovalRequired,
                dryRunHarness.manualConfirmationRequired,
                dryRunHarness.killSwitchRequired,
                dryRunHarness.auditRequired,
                "server-only adapter contract required",
              ].map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Blocked execution</span>
            <h3 style={cardTitle}>Provider execution is blocked</h3>
            <p style={copy}>{blockedDryRunExecutionSummary.summary}</p>
            <div style={list}>
              {blockedDryRunExecutionSummary.blockedLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>What comes next</span>
            <h3 style={cardTitle}>{dryRunReadinessSummary.nextLikelyBatch}</h3>
            <div style={list}>
              {nextResultReviewRecoveryChecklist.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Blocked scenario catalog</span>
            <h2 style={sectionTitle}>Dry-run scenario preview</h2>
          </div>
          <span style={sectionBadge}>Blocked by default</span>
        </div>
        <p style={copy}>
          text planning. code assistance. image storyboard. video prompt
          planning. audio narration. transcription/caption. embeddings/search.
          safety/moderation. local/private inference. each scenario is blocked
          by default. each scenario uses fixture-only packets.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Scenario readiness</span>
            <h3 style={cardTitle}>
              {`${dryRunReadinessSummary.scenarioCount} dry-run scenarios`}
            </h3>
            <p style={copy}>
              {`${dryRunReadinessSummary.requestPacketCount} request packets | ${dryRunReadinessSummary.fixtureResultCount} fixture results | ${dryRunReadinessSummary.denialFailureCount} denial/failure previews.`}
            </p>
            <div style={list}>
              {dryRunReadinessSummary.summaryLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          {representativeDryRunRequestPacket ? (
            <article style={card}>
              <span style={tag}>Fixture packet posture</span>
              <h3 style={cardTitle}>
                {representativeDryRunRequestPacket.operatorObjective}
              </h3>
              <p style={copy}>
                {`Prompt payload posture: ${representativeDryRunRequestPacket.promptPayloadPosture}.`}
              </p>
              <p style={copy}>
                {`Prompt transmission state: ${representativeDryRunRequestPacket.promptTransmissionState}.`}
              </p>
              <p style={copy}>
                {`Approval reference posture: ${representativeDryRunRequestPacket.approvalReferencePosture}.`}
              </p>
              <p style={copy}>
                {`Audit reference posture: ${representativeDryRunRequestPacket.auditReferencePosture}.`}
              </p>
            </article>
          ) : null}
        </div>
        <div style={grid}>
          {dryRunScenarios.map((scenario) => (
            <article key={scenario.key} style={card}>
              <span style={tag}>Static scenario</span>
              <h3 style={cardTitle}>{scenario.label}</h3>
              <p style={copy}>{scenario.summary}</p>
              <p style={copy}>{`Workspace target: ${scenario.workspaceTarget}`}</p>
              <div style={list}>
                <span style={pill}>{scenario.capabilityFamilyLabel}</span>
                <span style={pill}>{scenario.fixturePacketPosture}</span>
                <span style={pill}>{`Provider slot: ${scenario.providerSlotId}`}</span>
              </div>
              <p style={copy}>{scenario.blockedDefaultReason}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Static placeholder outputs</span>
            <h2 style={sectionTitle}>Fixture result preview</h2>
          </div>
          <span style={sectionBadge}>Static preview only</span>
        </div>
        <p style={copy}>
          static fixture result only. provider response is not received. model
          output is not generated. audit/approval/result persistence not
          implemented. denial/failure preview remains static. recovery is
          future manual review only.
        </p>
        <div style={grid}>
          {representativeDryRunFixtureResult ? (
            <article style={card}>
              <span style={tag}>Fixture result posture</span>
              <h3 style={cardTitle}>
                {representativeDryRunFixtureResult.fixtureResultState}
              </h3>
              <p style={copy}>
                {`Provider response state: ${representativeDryRunFixtureResult.providerResponseState}.`}
              </p>
              <p style={copy}>
                {`Model output state: ${representativeDryRunFixtureResult.modelOutputState}.`}
              </p>
              <p style={copy}>
                {`Result capture state: ${representativeDryRunFixtureResult.resultCaptureState}.`}
              </p>
            </article>
          ) : null}
          {representativeDryRunDenialFailure ? (
            <article style={card}>
              <span style={tag}>Denial/failure preview</span>
              <h3 style={cardTitle}>Future manual review only</h3>
              <p style={copy}>
                {representativeDryRunDenialFailure.promptNotSentReason}
              </p>
              <p style={copy}>
                {representativeDryRunDenialFailure.providerNotCalledReason}
              </p>
              <p style={copy}>
                {representativeDryRunDenialFailure.noProviderErrorReceivedStatement}
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Required gate checklist</span>
            <h2 style={sectionTitle}>Manual dry-run gates</h2>
          </div>
          <span style={sectionBadge}>Required</span>
        </div>
        <p style={copy}>
          Manual dry-run gates keep approval, confirmation, kill switch, audit,
          server-only boundary, prompt redaction, credential isolation,
          fixture-only result posture, and non-persistence visible together.
        </p>
        <div style={grid}>
          {manualDryRunGateChecklist.map((gate) => (
            <article key={gate.id} style={card}>
              <span style={tag}>Required gate</span>
              <h3 style={cardTitle}>{gate.label}</h3>
              <p style={copy}>{gate.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={notice}>
        {nextResultReviewRecoveryChecklist.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </section>
    </div>
  );
}

const shell: CSSProperties = { display: "grid", gap: 16, color: "#f8fafc", minWidth: 0 };
const hero: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(45,212,191,0.22)",
  background: "rgba(15,23,42,0.72)",
  borderRadius: 8,
  padding: 18,
};
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1, margin: "8px 0", letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { maxWidth: 780, color: "rgba(226,232,240,0.76)", lineHeight: 1.55, margin: 0, fontSize: 14 };
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, alignContent: "flex-start" };
const link: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(125,211,252,0.18)",
  borderRadius: 8,
  color: "#dbeafe",
  padding: "9px 11px",
  fontSize: 12,
  fontWeight: 900,
  textDecoration: "none",
};
const primaryLink: CSSProperties = { ...link, background: "#5eead4", color: "#042f2e" };
const metricGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 10 };
const metric: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(148,163,184,0.16)",
  borderRadius: 8,
  padding: 12,
  background: "rgba(15,23,42,0.62)",
  display: "grid",
  gap: 4,
};
const section: CSSProperties = { display: "grid", gap: 12 };
const sectionHeader: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" };
const sectionTitle: CSSProperties = { margin: "8px 0 0", fontSize: 24, letterSpacing: 0 };
const sectionBadge: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(125,211,252,0.22)",
  borderRadius: 999,
  padding: "6px 10px",
  fontSize: 11,
  fontWeight: 900,
  color: "#dbeafe",
};
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 12 };
const card: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(148,163,184,0.16)",
  borderRadius: 8,
  background: "rgba(2,6,23,0.68)",
  padding: 14,
  display: "grid",
  gap: 8,
};
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const cardTitle: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
const list: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6 };
const pill: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(45,212,191,0.18)",
  borderRadius: 999,
  padding: "4px 8px",
  fontSize: 11,
  color: "#ccfbf1",
};
const notice: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(45,212,191,0.16)",
  borderRadius: 8,
  padding: 12,
  background: "rgba(20,83,45,0.16)",
  color: "#dcfce7",
  fontSize: 13,
};
