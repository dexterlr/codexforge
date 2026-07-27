# CodexForge Jarvis Manual Provider And Model Selector v0

## Scope

This slice adds manual provider and model selection to the Jarvis private-alpha panel without changing backend schemas, backend record versions, API routes, provider adapters, transports, or execution routing.

The three exact selectable targets are:

- `Local Ollama / gpt-oss:20b`
- `Groq Cloud / openai/gpt-oss-20b`
- `Groq Cloud / openai/gpt-oss-120b`

`Local Ollama` is the initial target.

Groq model choice is explicit:

- there is no default Groq model;
- switching to `Groq Cloud` clears model selection;
- the operator must choose one exact Groq model before request creation is enabled.

There is no automatic routing or delegation in this slice.

## Request Creation And Approval

Local Ollama supports both `text` and `code`.

Groq approval binding supports `text` only.

Jarvis now persists the exact `modelKey` chosen by the operator. Provider, execution mode, data boundary, and cloud-transfer requirement remain backend-derived from `modelKey`.

Creating a Groq-bound request does not contact Groq.

Approving a Groq-bound request does not contact Groq.

Groq approval requires a second, separate cloud-transfer acknowledgement in addition to the generic manual approval acknowledgement.

Approval remains bound to the exact `approvalScopeHash` scope.

No credential is read or stored by the browser.

No runtime availability probe is made by the browser.

No API route was added.

No backend schema or record version changed:

- record version remains `1`;
- approval binding version remains `1`.

## Execution Behavior

Local execution remains available after approval and local runtime gates.

Groq is approval-only in this slice.

Cloud execution remains disabled.

No result is produced for a Groq approval-only run because no provider call occurs.

Historical records remain readable.

The next slice is explicit manually approved Groq execution through the existing adapter, still with no automatic routing, retry, or fallback.
