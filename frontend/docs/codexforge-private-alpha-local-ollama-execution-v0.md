# CodexForge Private Alpha Local Ollama Execution v0

This document describes Private Alpha Slice B.

Slice B is the first real provider execution vertical slice for CodexForge
Private Alpha. The slice is still local-only and still private-alpha scoped,
but it now performs one real manually approved provider call through a
server-only Node.js boundary.

## Architecture

The execution flow is:

1. Operator creates a run.
2. The server persists the exact request, provider, model, retention mode, and
   execution mode.
3. Operator records manual approval for that exact scope.
4. Operator performs a second explicit execute action.
5. The Node.js server validates gates, then calls local Ollama once.
6. The run persists terminal output or a bounded terminal failure record.
7. Append-only audit events persist the execution timeline.

The browser never talks to Ollama directly. The browser only calls the
same-origin private-alpha routes under `/api/codexforge/private-alpha/...`.

## Fixed Provider Boundary

Production execution is hard-coded to one provider boundary:

- provider id: `ollama-local`
- provider label: `Local Ollama`
- model: `gpt-oss:20b`
- origin: `http://127.0.0.1:11434`
- availability probe: `GET /api/tags`
- generation call: `POST /api/chat`

No caller-supplied provider URL, host, port, or model origin is accepted.
There is no environment-variable override for the provider origin. Redirects
are rejected. No cloud provider is contacted.

## Exact Provider Request

The server sends one non-streaming Ollama chat request with:

- `model: "gpt-oss:20b"`
- one user message containing only the persisted approved request text
- `stream: false`
- `think: false`
- `options.num_predict` set to the approved `maximumOutputTokens`

There is no hidden system prompt. There are no tools. Browser state is never
transmitted. Approval commentary is never sent to the model.

## Approval Before Execution

Approval and execution are separate actions.

Approval persists the exact execution scope hash, including:

- run id
- normalized request hash
- capability
- provider `ollama-local`
- model `gpt-oss:20b`
- approved maximum output tokens
- retention mode
- execution mode

New Slice B runs persist:

- `providerPreference: "ollama-local"`
- `modelPreferenceLabel: "gpt-oss:20b"`
- `executionMode: "manual-approved-local-provider"`

Legacy Slice A runs using `auto` plus
`locked-until-provider-slice` remain readable but cannot execute.

## Idempotency

`POST /api/codexforge/private-alpha/runs/[runId]/execute` requires an
`Idempotency-Key` header.

Only the SHA-256 hash of that key is persisted. The raw key is never stored.

Per run:

- the same execution key replays the existing persisted execution result;
- a different key conflicts once execution has started;
- concurrent duplicates with the same key collapse to one provider call;
- one run gets at most one provider generation attempt in this slice.

There is no retry button, retry endpoint, or fallback provider.

## Kill Switch

The existing kill switch source remains bounded to:

- `CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH`
- the local `KILL_SWITCH` file under the private-alpha data root

The execute flow checks the kill switch:

- before provider availability probing
- again immediately before `POST /api/chat`

If the kill switch is engaged, no Ollama call is made. The run transitions to
`blocked`, a bounded execution record is persisted, and append-only audit
events record the block.

## Persisted Output and Audit

Successful local output is persisted locally with:

- full output text
- SHA-256 hash of the output
- provider id and model
- safe Ollama metadata when present
- append-only execution audit events

Persisted execution metadata may include:

- `done_reason`
- `total_duration`
- `load_duration`
- `prompt_eval_count`
- `eval_count`

The slice does not persist model thinking, tool calls, images, raw provider
bodies, headers, credentials, or absolute filesystem paths.

## Failure Semantics

The run state model now includes:

- `executing`
- `succeeded`
- `failed`
- `blocked`

Bounded provider-facing execution codes include:

- `ollama_unavailable`
- `ollama_model_missing`
- `ollama_timeout`
- `ollama_http_error`
- `ollama_malformed_response`
- `ollama_output_too_large`

Safe audit summaries and safe error messages never contain:

- full prompts
- model outputs
- stack traces
- raw response bodies
- credentials

If local Ollama or the required model is unavailable before chat generation,
the run is blocked and no chat call is made.

If the provider call begins and then fails inside the bounded execution path,
the run transitions to `failed` and no partial output is persisted.

## No Cloud, No API Key

Slice B is local-only:

- no cloud provider is contacted
- no provider SDK is used
- no API key is required
- no provider credential environment variable is read

The only allowed execution network target remains
`http://127.0.0.1:11434`.

## Known Private-Alpha Limitations

Slice B is intentionally narrow:

- local file persistence only
- single-process in-memory write queue only
- one execution attempt per run
- one fixed provider
- one fixed model
- no retry
- no fallback
- no worker queue
- no job dispatcher
- no background execution
- no cloud durability
- no multi-user claim
- no database durability claim
