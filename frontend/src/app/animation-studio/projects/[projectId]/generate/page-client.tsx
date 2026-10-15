"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell/components/CodexForgeAppShell";
import type { ExternalExecutionPolicy, StudioProject } from "@/lib/codexforge/animation-studio/domain";
import type { GenerationPlan } from "@/lib/codexforge/animation-studio/generation-preparation.server";
import type { HiggsfieldEstimateView, HiggsfieldSupportedContractView } from "@/lib/codexforge/animation-studio/higgsfield-view";
import { estimateExecutionOperatorMessage, parseEstimateExecutionReport, unknownEstimateExecutionReport, type EstimateExecutionReport } from "@/lib/codexforge/animation-studio/higgsfield-estimate-execution";
import type { StudioSnapshot } from "@/lib/codexforge/animation-studio/store.server";
import styles from "./generate.module.css";

type InspectableGenerationPlan = GenerationPlan & { supportedContract?: HiggsfieldSupportedContractView };
type Result = {
  projects: StudioProject[];
  snapshot: StudioSnapshot | null;
  executionPolicy: ExternalExecutionPolicy;
  generationPlan?: InspectableGenerationPlan;
  estimateViews?: HiggsfieldEstimateView[];
  estimateExecution?: { mode: "TEST_ONLY_MOCK" | "UNAVAILABLE"; liveExecutionAllowed: false };
  executionOutcome?: EstimateExecutionReport;
};
type Inspection = { action?: "inspect-generation" | "prepare-estimate" | "execute-estimate"; shotId: string; expectedProjectRevision: number; expectedShotRevision: number };
const ENDPOINT = "/api/codexforge/animation-studio";
const HEADERS = { "X-CodexForge-Animation-Studio": "local-operator-v1" };
const words = (value: string) => value.replaceAll("_", " ");
class WorkspaceRequestError extends Error {}

export default function GenerationWorkspace({ projectId }: { projectId: string }) {
  const [result, setResult] = useState<Result | null>(null);
  const [selectedShotId, setSelectedShotId] = useState("");
  const [plan, setPlan] = useState<InspectableGenerationPlan | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [errorExecution, setErrorExecution] = useState<EstimateExecutionReport | null>(null);
  const [notice, setNotice] = useState("");
  const inFlight = useRef(false);
  const active = useRef<AbortController | null>(null);
  const snapshot = result?.snapshot ?? null;
  const shot = snapshot?.shots.find(item => item.shotId === selectedShotId) ?? null;
  const contract = plan?.supportedContract ?? null;
  const providerOperation = contract?.providerOperation ?? null;
  const estimate = result?.estimateViews?.find(item => item.shotId === selectedShotId) ?? contract?.estimateOperation ?? null;
  const savedExecution = estimate ? parseEstimateExecutionReport(estimate.executionOutcome) ?? unknownEstimateExecutionReport() : null;
  const executionErrorMessage = errorExecution ? estimateExecutionOperatorMessage(errorExecution) : null;
  const savedExecutionMessage = savedExecution ? estimateExecutionOperatorMessage(savedExecution) : null;

  const request = useCallback(async (inspection?: Inspection) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setBusy(true); setError(""); setErrorExecution(null); setNotice(""); setPlan(null);
    const controller = new AbortController(); active.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    const operation = inspection?.action ?? "inspect-generation";
    const inspecting = inspection !== undefined && operation === "inspect-generation";
    const executing = inspection !== undefined && operation === "execute-estimate";
    let executionOutcome: EstimateExecutionReport | null = null;
    try {
      const response = await fetch(inspection ? ENDPOINT : `${ENDPOINT}?projectId=${encodeURIComponent(projectId)}`, {
        method: inspection ? "POST" : "GET", cache: "no-store", credentials: "same-origin", signal: controller.signal,
        headers: inspection ? { ...HEADERS, "Content-Type": "application/json", "Idempotency-Key": crypto.randomUUID() } : HEADERS,
        ...(inspection ? { body: JSON.stringify({ action: operation, projectId, ...inspection, requestedAt: new Date().toISOString() }) } : {}),
      });
      let payload;
      try { payload = await response.json(); } catch { throw new WorkspaceRequestError("The local service returned an unreadable response. No inspection result has been assumed."); }
      executionOutcome = parseEstimateExecutionReport(payload?.executionOutcome ?? payload?.result?.executionOutcome);
      if (executing && !executionOutcome) throw new WorkspaceRequestError("The local service did not return a valid execution classification. Do not retry; reload saved state for reconciliation.");
      if (!response.ok || payload?.ok !== true) {
        const code = payload?.error?.code;
        if (code === "revision_conflict") throw new WorkspaceRequestError("The saved project or shot changed. Reload its current saved state. No automatic retry or attempt reset is available.");
        if (code === "estimate_unavailable" || code === "estimate_not_prepared") throw new WorkspaceRequestError("The saved estimate is unavailable, stale or already consumed. Reload its saved state. No automatic retry or attempt reset is available.");
        if (code === "estimate_execution_disabled") throw new WorkspaceRequestError("Estimate execution is unavailable on this server. Local preparation grants no authority to contact Higgsfield.");
        if (response.status === 404) throw new WorkspaceRequestError("This saved project or shot was not found. Return to Animation Studio to choose a local project.");
        if (response.status === 403) throw new WorkspaceRequestError("The local request security boundary rejected this request. Use the supported direct local workspace; no boundary was bypassed.");
        if (response.status === 503) throw new WorkspaceRequestError("The local Studio service could not complete this request safely. Reload saved state when it is available; no result or unused attempt has been assumed.");
        throw new WorkspaceRequestError("The local workspace request was rejected. Reload its saved state. No automatic retry or attempt reset is available.");
      }
      const next = payload.result as Result;
      if (!next || !Array.isArray(next.projects) || !next.executionPolicy || !next.snapshot || next.snapshot.project.projectId !== projectId) {
        throw new WorkspaceRequestError("The local service returned an incomplete project result. No inspection result has been assumed.");
      }
      if (inspecting && (!next.generationPlan || next.generationPlan.request.projectId !== projectId || next.generationPlan.request.shotId !== inspection.shotId)) {
        throw new WorkspaceRequestError("The local service did not return the requested shot inspection. No result has been assumed.");
      }
      if (inspection && !inspecting && !next.estimateViews?.some(item => item.shotId === inspection.shotId)) throw new WorkspaceRequestError("The local service did not return the requested saved estimate. Reload saved state; no result or unused attempt has been assumed.");
      setResult(next);
      setSelectedShotId(previous => next.snapshot!.shots.some(item => item.shotId === previous) ? previous : next.snapshot!.shots[0]?.shotId ?? "");
      if (inspecting && next.generationPlan) setPlan(next.generationPlan);
      setNotice(inspection ? inspecting ? "Local request inspection complete. No job was dispatched and no provider was contacted." : operation === "prepare-estimate" ? "Local mock estimate intent saved. Preparation does not execute an estimate or grant generation authority." : estimateExecutionOperatorMessage(executionOutcome!).message : "Saved project and estimate state loaded. Refresh only reads; it never estimates or dispatches.");
    } catch (cause) {
      setErrorExecution(executing ? executionOutcome ?? unknownEstimateExecutionReport() : executionOutcome?.reconciliationRequired || executionOutcome?.externalExecution === "ATTEMPTED" ? executionOutcome : null);
      setError(controller.signal.aborted
        ? "Stopped waiting. Reload saved state; no result or unused attempt has been assumed. No automatic retry or reset will occur."
        : cause instanceof WorkspaceRequestError ? cause.message : "The local service could not be reached. No inspection result has been assumed.");
    } finally {
      window.clearTimeout(timeout); active.current = null; inFlight.current = false; setBusy(false);
    }
  }, [projectId]);

  useEffect(() => {
    // Initial reads are deferred so React development replay cannot leave a stranded aborted request.
    const startup = window.setTimeout(() => { void request(); }, 0);
    return () => { window.clearTimeout(startup); active.current?.abort(); };
  }, [request]);

  return <CodexForgeAppShell activePath="/animation-studio" focusMode showRightRail={false} showSafetyStrip={false} contentMaxWidth="wide">
    <div className={styles.workspace}>
      <a className={styles.back} href="/animation-studio">← Back to Animation Studio</a>
      <header className={styles.hero}>
        <div><p className={styles.eyebrow}>Animation Studio · Generate</p><h1>Prepare a generation</h1><p>Review the saved shot, routing and exact local plan before any future provider connection.</p></div>
        <span className={styles.badge}>Phase 2B.0C / Estimate execution locked</span>
      </header>
      <section className={styles.boundary} aria-label="Live dispatch boundary">
        <strong>LIVE HIGGSFIELD DISPATCH NOT AUTHORISED</strong>
        <p>No live generation, authentication, estimate, upload, polling or other provider request is available here. Saved mock estimates never authorize generation. Production has no estimate execution control.</p>
      </section>
      <div role="status" aria-live="polite">{busy ? "Working with the local saved workspace…" : notice}</div>
      {error && <div className={styles.error} role="alert">{executionErrorMessage ? <><strong>{executionErrorMessage.heading}</strong><p>{executionErrorMessage.message}</p></> : error}</div>}
      <div className={styles.actions}>
        <button className={styles.secondary} disabled={busy} onClick={() => void request()}>Reload saved project</button>
        {busy && <button className={styles.secondary} onClick={() => active.current?.abort()}>Stop waiting</button>}
      </div>
      {snapshot ? <>
        <section className={styles.card} aria-labelledby="saved-shot-title">
          <p className={styles.eyebrow}>Saved source · Project revision {snapshot.project.revision}</p>
          <h2 id="saved-shot-title">{snapshot.project.title}</h2>
          <p className={styles.identifier}>{snapshot.project.projectId}</p>
          <label htmlFor="generation-shot">Shot to inspect</label>
          <select id="generation-shot" disabled={busy} value={selectedShotId} onChange={event => { setSelectedShotId(event.target.value); setPlan(null); setNotice(""); setError(""); setErrorExecution(null); }}>
            {snapshot.shots.map(item => <option key={item.shotId} value={item.shotId}>{item.shotId} · revision {item.revision}</option>)}
          </select>
          {shot ? <><p>{shot.description}</p><dl className={styles.facts}>
            <div><dt>Sequence</dt><dd>{shot.sequenceId}</dd></div><div><dt>Production method</dt><dd>{words(shot.generationMethod)}</dd></div>
            <div><dt>Saved output intent</dt><dd>{shot.duration}s · {shot.resolution.width} × {shot.resolution.height} · {shot.fps} fps</dd></div><div><dt>Saved aspect ratio</dt><dd>{shot.aspectRatio.width}:{shot.aspectRatio.height}</dd></div><div><dt>Shot revision</dt><dd>{shot.revision}</dd></div>
          </dl><p className={styles.muted}>These are saved shot requirements. Inspect to compare them with the documented candidate contract; incompatible values are not silently substituted. No account capability or cost has been checked.</p>
          <div className={styles.actions}><button disabled={busy} onClick={() => void request({ shotId: shot.shotId, expectedProjectRevision: snapshot.project.revision, expectedShotRevision: shot.revision })}>Inspect local generation plan</button></div></> : <p>No saved shot is available in this project. Return to Animation Studio to prepare one.</p>}
        </section>
        {estimate && shot && <section className={styles.card} aria-labelledby="estimate-title">
          <p className={styles.eyebrow}>Persistent estimate-only lifecycle</p>
          <h2 id="estimate-title">Higgsfield estimate / Saved operation</h2>
          <p className={styles.localOnly}>{estimate.executionMode === "LIVE_ESTIMATE" ? "LIVE ESTIMATE RECORD. A saved quote is an estimate only. It grants no generation authorization and records no actual spend." : "SYNTHETIC MOCK ESTIMATE. Stored prices are test values, not a live quote, actual spend or generation authorization."}</p>
          {estimate.stale && <div className={styles.warning} role="status"><strong>RE-ESTIMATE REQUIRED</strong><p>The saved shot, request or routing scope changed. The historical result does not apply to the current request. Its consumed attempt is preserved; this phase does not reset or automatically replace it.</p></div>}
          {savedExecution?.reconciliationRequired && savedExecutionMessage && <div className={styles.error} role="status"><strong>{savedExecutionMessage.heading}</strong><p>{savedExecutionMessage.message}</p></div>}
          <dl className={styles.facts}>
            <div><dt>Contract</dt><dd>OFFICIAL API FOUND</dd></div>
            <div><dt>Credential status</dt><dd>NOT INSPECTED · No current presence claim</dd></div>
            <div><dt>Remote authentication</dt><dd>NOT VERIFIED</dd></div>
            <div><dt>Estimate implementation</dt><dd>READY / Exact server authority required</dd></div>
            <div><dt>Live estimate authorization</dt><dd>{words(estimate.liveAuthorization)}</dd></div>
            <div><dt>Prepared model</dt><dd>{estimate.model ?? "Not compatible"}</dd></div>
            <div><dt>Estimate endpoint</dt><dd><code>{estimate.endpoint ?? "Not prepared"}</code></dd></div>
            <div><dt>Current prepared request</dt><dd>{estimate.preparedRequest ? "VALID LOCAL CONTRACT · Not live-authorized" : "NOT PREPARABLE"}</dd></div>
            <div><dt>Canonical estimate routing</dt><dd>{words(estimate.planningEligibility)} · Does not enable provider execution</dd></div>
            <div><dt>Estimate state</dt><dd>{words(estimate.state)}{estimate.stale ? " · STALE" : ""}</dd></div>
            <div><dt>Estimate attempt</dt><dd>{estimate.attempt} / {estimate.maxAttempts}</dd></div>
            <div><dt>External estimate execution</dt><dd>{words(savedExecution?.externalExecution ?? "UNKNOWN")}{estimate.executionMode === "MOCK" ? " · SYNTHETIC TRANSPORT ONLY" : ""}</dd></div>
            <div><dt>Estimate result persistence</dt><dd>{words(savedExecution?.persistence ?? "UNCONFIRMED")}</dd></div>
            <div><dt>Stored estimated credits</dt><dd>{estimate.result?.credits ?? "Not recorded"}{estimate.result && estimate.stale ? " · Historical only" : ""}</dd></div>
            <div><dt>Stored estimated USD</dt><dd>{estimate.result?.usd ?? "Not recorded"}{estimate.result && estimate.stale ? " · Historical only" : ""}</dd></div>
            <div><dt>Estimate timestamp</dt><dd>{estimate.result?.estimatedAt ?? "Not recorded"}</dd></div>
            <div><dt>Estimate correlation ID</dt><dd>{estimate.correlationId ?? "Not recorded"}</dd></div>
            <div><dt>Generation</dt><dd>LOCKED · NOT AUTHORISED</dd></div>
            <div><dt>Generation attempt</dt><dd>{estimate.generationAttempts} / 1</dd></div>
            <div><dt>Automatic retries</dt><dd>0</dd></div>
            <div><dt>Estimate execution here</dt><dd>{result?.estimateExecution?.mode === "TEST_ONLY_MOCK" ? "EXPLICIT TEST-ONLY FAKE TRANSPORT" : "UNAVAILABLE · Production boundary locked"}</dd></div>
          </dl>
          {estimate.failure && <p className={styles.warning}>Saved estimate failure: {words(estimate.failure.code)}{estimate.failure.httpStatus === null ? "" : ` · HTTP ${estimate.failure.httpStatus}`} · Terminal, no retry. No raw provider error or credential is displayed.</p>}
          {!estimate.estimateIntentId && estimate.preparationBlockers.length > 0 && <div className={styles.warning}><p>Local preparation is unavailable for this saved request:</p><ul>{estimate.preparationBlockers.map(reason => <li key={reason}>{words(reason)}</li>)}</ul></div>}
          <div className={styles.hash}><h3>Current provider-ready request digest</h3><code>{estimate.currentRequestDigest ?? "No compatible current request"}</code></div>
          {estimate.requestDigest && <div className={styles.hash}><h3>Persisted estimate request digest</h3><code>{estimate.requestDigest}</code></div>}
          {estimate.preparedRequest !== null && <details><summary>Exact current non-secret request · Server prepared</summary><pre>{JSON.stringify(estimate.preparedRequest, null, 2)}</pre></details>}
          {estimate.estimateIntentId && <details><summary>Saved estimate identity and times</summary><pre>{JSON.stringify({ estimateIntentId: estimate.estimateIntentId, createdAt: estimate.createdAt, startedAt: estimate.startedAt, completedAt: estimate.completedAt }, null, 2)}</pre></details>}
          <div className={styles.actions}>
            {!estimate.estimateIntentId && <button disabled={busy || !estimate.preparationAllowed} onClick={() => void request({ action: "prepare-estimate", shotId: shot.shotId, expectedProjectRevision: snapshot.project.revision, expectedShotRevision: shot.revision })}>Prepare local estimate intent · No provider call</button>}
            {result?.estimateExecution?.mode === "TEST_ONLY_MOCK" && <button disabled={busy || errorExecution !== null || estimate.stale || estimate.attempt !== 0 || !["PREPARED", "READY"].includes(estimate.state)} onClick={() => void request({ action: "execute-estimate", shotId: shot.shotId, expectedProjectRevision: snapshot.project.revision, expectedShotRevision: shot.revision })}>Run one test-only MOCK estimate</button>}
          </div>
          <p className={styles.muted}>The server derives the intent, saved revision, model, digest and single-use authority. The browser cannot supply a price or grant generation permission. Loading, selecting a shot, refreshing and restarting do not execute estimates.</p>
        </section>}
        <div className={styles.columns}>
          <section className={styles.card} aria-labelledby="readiness-title">
            <p className={styles.eyebrow}>Provider readiness</p><h2 id="readiness-title">Higgsfield</h2>
            {plan ? <><dl className={styles.facts}>
              <div><dt>Configuration</dt><dd>{contract ? "NOT INSPECTED" : words(plan.readiness.configuration)}</dd></div>
              <div><dt>Integration surface</dt><dd>{words(contract?.surface ?? plan.readiness.integrationSurface)}</dd></div>
              <div><dt>Remote authentication</dt><dd>{words(plan.readiness.remoteAuthentication)}</dd></div>
              <div><dt>Capability</dt><dd>{words(plan.readiness.capability)}</dd></div>
              <div><dt>Credential inspection</dt><dd>{words(plan.readiness.credentialInspection)}</dd></div>
              <div><dt>Execution</dt><dd>{words(plan.readiness.execution)}</dd></div>
            </dl><p className={styles.muted}>Documented support is not proof of account access, credential presence, working credentials or remote readiness. Real credential configuration has not been inspected.</p></> : <p>Request a local inspection to see the server’s current readiness result. No remote check will be made.</p>}
          </section>
          <section className={styles.card} aria-labelledby="authorization-title">
            <p className={styles.eyebrow}>Independent gates</p><h2 id="authorization-title">Approval, attempts and cost</h2>
            <dl className={styles.facts}>
              <div><dt>Live authorization</dt><dd>{plan ? words(plan.authorization) : "NOT GRANTED"}</dd></div>
              <div><dt>Human dispatch approval</dt><dd>{plan ? words(plan.approval.state) : "REQUIRED"}</dd></div>
              <div><dt>Attempts used</dt><dd>{plan ? `${plan.attemptsUsed} / ${plan.request.maxAttempts}` : "Inspect saved state"}</dd></div>
              <div><dt>Automatic retries</dt><dd>0</dd></div>
              <div><dt>Future cost</dt><dd>UNKNOWN · REQUIRES EXPLICIT ACKNOWLEDGEMENT</dd></div>
              <div><dt>Hard currency ceiling</dt><dd>Not established — no price has been assumed</dd></div>
            </dl>
            <p className={styles.warning}>Unknown cost cannot proceed automatically. A later exact-operation authorization must establish the cost policy separately. The future test is limited to one attempt, with no automatic retries.</p>
            {plan && plan.approval.reasons.length > 0 && <ul>{plan.approval.reasons.map((reason, index) => <li key={`${index}-${reason}`}>{reason}</li>)}</ul>}
          </section>
        </div>
        {plan && <>
          <section className={styles.card} aria-labelledby="routing-title">
            <p className={styles.eyebrow}>Canonical deterministic router</p><h2 id="routing-title">Routing: {words(plan.route.status)}</h2>
            <dl className={styles.facts}>
              <div><dt>Selected method</dt><dd>{words(plan.route.selectedMethod)}</dd></div>
              <div><dt>Selected engines</dt><dd>{plan.route.selectedEngines.join(", ") || "None"}</dd></div>
              <div><dt>Blocked capability evidence</dt><dd>{plan.route.blockedCapabilities.join(", ") || "None recorded"}</dd></div>
              <div><dt>Fallbacks</dt><dd>{plan.route.fallbacks.join(", ") || "None"}</dd></div>
            </dl>
            <p>Routing expresses shot compatibility; it does not grant execution permission. No fallback is automatically executed.</p>
            <details><summary>Exact routing reasons and requirements</summary><pre>{JSON.stringify(plan.route, null, 2)}</pre></details>
          </section>
          <section className={styles.card} aria-labelledby="inspector-title">
            <p className={styles.eyebrow}>Server-built dry-run request inspector</p><h2 id="inspector-title">Prepared local plan · Not dispatched</h2>
            <p>This is the canonical preparation record returned by the server’s request builder. It is <strong>not a mapped Higgsfield API payload</strong>. {contract ? "The separate supported-contract section below shows the provider-ready mapping and its own digest, when this saved shot is compatible." : "A supported mapping is not available in this inspection result."}</p>
            <dl className={styles.facts}>
              <div><dt>Provider</dt><dd>{plan.provider}</dd></div><div><dt>Mode in canonical plan</dt><dd>{plan.request.mode ?? "Not bound in this canonical record"}</dd></div>
              <div><dt>Model in canonical plan</dt><dd>{plan.request.model ?? "Not bound in this canonical record"}</dd></div><div><dt>Job</dt><dd>{plan.jobId ?? "None — inspection creates no dispatch job"}</dd></div>
              <div><dt>Planned attempt</dt><dd>{plan.request.attempt} of {plan.request.maxAttempts}</dd></div><div><dt>Provider requests from inspection</dt><dd>{plan.providerRequests}</dd></div>
              <div><dt>Destination</dt><dd>{plan.destination}</dd></div><div><dt>Hash scope</dt><dd>{words(plan.hashKind)}</dd></div>
              <div><dt>Reference assets</dt><dd>{plan.request.references.length === 0 ? "None · Text-only candidate" : <ul>{plan.request.references.map(reference => <li key={`${reference.assetId}@${reference.version}`}>{reference.assetId} · version {reference.version}<br /><code>{reference.contentHash}</code></li>)}</ul>}</dd></div>
            </dl>
            <div className={styles.hash}><h3>Canonical plan SHA-256</h3><code>{plan.requestHash}</code></div>
            <div className={styles.prompt}><h3>Prompt from the saved shot</h3><p>{plan.request.prompt}</p></div>
            <details><summary>Exact non-secret request record</summary><pre>{JSON.stringify(plan.request, null, 2)}</pre></details>
            <p className={styles.muted}>No credentials, authorization headers or secret URL parameters are part of this preparation record. Inspection grants no approval and starts no job.</p>
          </section>
          {contract && <section className={styles.card} aria-labelledby="supported-contract-title">
            <p className={styles.eyebrow}>Supported provider contract · Local document binding</p>
            <h2 id="supported-contract-title">Official API found · Live execution disabled</h2>
            <dl className={styles.facts}>
              <div><dt>Contract</dt><dd>{words(contract.surface)}</dd></div>
              <div><dt>Local SDK</dt><dd>{contract.sdk === "NOT_USED_EXPLICIT_REST" ? "Not installed in application · Explicit REST contract" : words(contract.sdk)}</dd></div>
              <div><dt>Documented candidate model</dt><dd>{contract.model ?? "NOT YET SELECTED"}</dd></div>
              <div><dt>Documented candidate mode</dt><dd>{contract.mode ? words(contract.mode) : "NOT YET SELECTED"}</dd></div>
              <div><dt>Official submission endpoint</dt><dd><code>{contract.endpoint ?? "NOT YET SELECTED"}</code></dd></div>
              <div><dt>Credentials</dt><dd>{words(contract.credentials)} · No presence claim</dd></div>
              <div><dt>Remote authentication</dt><dd>NOT VERIFIED</dd></div>
              <div><dt>Live estimate</dt><dd>{words(contract.estimate)}</dd></div>
            </dl>
            <p>Only the supplied official contract is used for this local mapping. No provider account, model availability, price or authorization has been verified.</p>
            <h3>Saved-shot compatibility</h3>
            {contract.compatibility.length > 0 ? <ul>{contract.compatibility.map((reason, index) => <li key={`${index}-${reason}`}>{reason}</li>)}</ul> : <p>No additional compatibility notes returned by the server.</p>}
            {contract.requestDigest && contract.request !== null ? <>
              <div className={`${styles.hash} ${styles.providerDigest}`}><h3>Provider-ready non-secret request SHA-256</h3><code>{contract.requestDigest}</code><p className={styles.muted}>Separate from the canonical planning hash above. Future estimate, approval and single-use authorization must bind to this exact request.</p></div>
              <details><summary>Exact provider-ready non-secret request · Local only</summary><pre>{JSON.stringify(contract.request, null, 2)}</pre></details>
              <p className={styles.muted}>Prepared locally is not authorized to send. No credentials or authentication headers are part of this inspector.</p>
            </> : <p className={styles.warning}>No provider-ready request has been prepared for this saved shot. Resolve the reported contract requirements before a digest can be bound; the shot has not been altered.</p>}
          </section>}
          {contract && <section className={styles.card} aria-labelledby="provider-operation-title">
            <p className={styles.eyebrow}>Persisted local provider-operation projection</p>
            <h2 id="provider-operation-title">{providerOperation ? "Local mock operation · Not live evidence" : "No local provider operation recorded"}</h2>
            {providerOperation ? <>
              <p className={styles.localOnly}>LOCAL / MOCK RECORD ONLY. These identifiers, estimates, approvals and outputs belong to the local test lifecycle. They do not prove a real Higgsfield submission or grant live authorization.</p>
              {providerOperation.requestDigest !== contract.requestDigest && <p className={styles.warning}>This persisted operation is bound to a different or no longer preparable request. Its recorded estimate, approval and authorization do not apply to the current saved plan. Historical evidence is preserved; no retry is started.</p>}
              {providerOperation.reconciliationRequired && <div className={styles.error} role="status"><strong>RECONCILIATION REQUIRED</strong><p>Submission outcome is unknown. The attempt stays blocked; refresh, restart or another click must not retry submission. No live reconciliation is available in this phase.</p></div>}
              <dl className={styles.facts}>
                <div><dt>Canonical job</dt><dd>{providerOperation.jobId}</dd></div>
                <div><dt>Recorded lifecycle state</dt><dd>{words(providerOperation.state)}</dd></div>
                <div><dt>Mock request ID</dt><dd>{providerOperation.requestId ?? "Not received"}</dd></div>
                <div><dt>Mock correlation ID</dt><dd>{providerOperation.correlationId ?? "Not received"}</dd></div>
                <div><dt>Mock estimated credits</dt><dd>{providerOperation.estimate?.credits ?? "Not recorded"}</dd></div>
                <div><dt>Mock estimated USD</dt><dd>{providerOperation.estimate?.usd ?? "Not recorded"}</dd></div>
                <div><dt>Recorded mock approval</dt><dd>{words(providerOperation.approval)}</dd></div>
                <div><dt>Recorded mock authorization</dt><dd>{words(providerOperation.authorization)}</dd></div>
                <div><dt>Recorded attempt</dt><dd>{providerOperation.attempt} / 1</dd></div>
                <div><dt>Registered local outputs</dt><dd>{providerOperation.outputsCount}</dd></div>
              </dl>
              <div className={styles.hash}><h3>Persisted operation request digest</h3><code>{providerOperation.requestDigest}</code></div>
              <p className={styles.muted}>This read-only projection comes from the saved canonical job. Reloading does not estimate, submit, poll, cancel, retrieve or reconcile.</p>
            </> : <p>Inspection does not create a job, request an estimate or dispatch a request. There is no saved provider identifier or lifecycle result to show for this shot.</p>}
          </section>}
          <section className={styles.card} aria-labelledby="blockers-title"><h2 id="blockers-title">What still blocks live generation</h2><ul>{plan.blockers.map((blocker, index) => <li key={`${index}-${blocker}`}>{blocker}</li>)}</ul><p>Any future live test requires new explicit authorization after the missing setup and independent gates are resolved.</p></section>
        </>}
        <section className={styles.card}><h2>Default execution policy stays locked</h2><p>Inspecting a plan does not change any policy, create an authorization or contact a provider. Reloading this page only reads saved local state.</p><details><summary>Current server policy and saved record binding</summary><pre>{JSON.stringify({ executionPolicy: result?.executionPolicy, projectRevision: snapshot.project.revision, recordDigest: snapshot.recordDigest }, null, 2)}</pre></details></section>
      </> : !busy && <section className={styles.card}><h2>No saved project loaded</h2><p>Reload this project or return to Animation Studio to select a saved local project. No inspection or provider request runs automatically.</p></section>}
    </div>
  </CodexForgeAppShell>;
}
