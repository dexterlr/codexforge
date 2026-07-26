# CodexForge Groq Provider Qualification Foundation v0

This slice establishes the first cloud-provider qualification boundary for CodexForge without admitting Groq into production routing or current private-alpha execution. Groq is the first cloud qualification target because the current production path is still local-only, and this slice needs one fixed cloud boundary to qualify before routing work begins.

## Scope

- Fixed provider boundary: `https://api.groq.com` with only `/openai/v1/models` and `/openai/v1/chat/completions`.
- Two allowlisted GPT-OSS model identifiers:
  - `openai/gpt-oss-20b`
  - `openai/gpt-oss-120b`
- Server-only credential handling through `GROQ_API_KEY`.
- Built-in `fetch` only. No Groq SDK, OpenAI SDK, Axios, proxy layer, retry loop, fallback path, or browser call.
- Authenticated model discovery for the allowlisted models only.
- Fixed low reasoning with `reasoning_effort: "low"`.
- Hidden reasoning with `include_reasoning: false`.
- One user message only in generation requests.
- Bounded non-streaming generation with fixed request, response, and visible-output limits.
- Safe error classification with Groq-specific high-level messages.
- Deterministic fake-transport testing with injected `fetch`.

## Guardrails

- Free-versus-paid account tier is not inferred by this slice.
- Free-tier status requires later operator verification after one live qualification.
- Provider rate limits are external and can change.
- This slice does not hardcode a permanent quota promise.
- Groq is not admitted to the production routing catalog.
- Groq is not in the Jarvis selector.
- Groq is not integrated into the current private-alpha store or execution path.
- Validation does not perform a cloud call.
- Cloud data transfer still requires explicit future approval.
- Paid execution is not allowed by this slice.

## Next Step

The next step is operator credential configuration plus one live qualification that confirms authenticated model discovery and visible text output for the allowlisted models. Only after live verification and operator account-tier confirmation can catalog admission be considered.
