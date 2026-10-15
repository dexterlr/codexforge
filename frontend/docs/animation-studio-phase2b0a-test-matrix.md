# Phase 2B.0A estimate-only validation matrix

Scope: local implementation and synthetic mock validation. An estimate is a canonical `ESTIMATE` job with a typed estimate result, not actual spend and not a generation authorization. No live credentials, account state or provider prices are evidence in these tests.

The focused executable is `scripts/test-animation-studio-phase2b0a.mjs`. It loads actual source, policies and the installed native repository through the existing loader. Each execution has a fresh UUID evidence root and synthetic namespaces. Child-process cases launch only this same file with an allowlisted noncredential environment, retain child identities/terminal output and never kill an uncertain process. The script can also create a clearly labelled canonical fixture using `--seed-browser <fresh-phase2b0a-browser-namespace> prepared|ready|succeeded|unknown|stale`.

The table is a coverage assignment, not a blanket PASS. A fresh terminal result, build, security result and browser observation record must be present before the corresponding claim is accepted. Existing suites are not replaced or counted as new tests.

| Required proof | Executable evidence |
| --- | --- |
| 1. Intent persists | Native close/reopen equality and typed intent validation |
| 2. Maximum attempts = 1 | Canonical job maximum, attempted mutation rejected |
| 3–4. First acquires; second cannot | Durable start inspected inside fake transport; duplicate acquisition and service call |
| 5. Concurrent callers execute once | Parallel service calls and two actual Node processes against the same native namespace |
| 6. Refresh cannot execute again | Reopened repository/read-only Generate inspection, plus browser refresh event counts |
| 7. Restart cannot execute again | Owned child exits after durable start; another process cannot execute; isolated browser restart |
| 8. Duplicate HTTP cannot execute again | Actual NextRequest/operator handler, same operation/key; persisted attempt and fake-call count |
| 9–11. Revision, prompt and duration invalidate | Actual canonical shot revision commands followed by rejected acquisition |
| 12–14. Resolution, aspect and camera bind digest | Canonical request changes recompute a different digest; the old digest is rejected. Existing public edit contract intentionally does not offer these fields. |
| 15. Model binds digest | Altered provider/model/endpoint rejected by the supported contract, even with a new digest |
| 16. Digest deterministic | Reordered request keys and repeated actual builder produce identical canonical request/digest |
| 17. Routing required | Same canonical routing function: estimate planning eligibility distinct from blocked generation; incompatible method/identity rejected |
| 18–20. Generation policy, authorization and attempts unchanged | Every fixture has only estimate jobs, no generation intent/approval/output, zero generation attempts and locked policies |
| 21–24. Credits, USD, digest and correlation persist | Exact synthetic decimal values, all canonical identities/revision/timestamp, correlation and intent binding |
| 25–27. 401/422/5xx safe | Sanitized terminal error class/status, no raw response or secret sentinel; one consumed attempt |
| Additional: 429 | Same explicit terminal nonretryable accounting |
| 28. Before-send failure safe | Explicit transport error with transmitted=false becomes consumed FAILED |
| 29–31. Ambiguous result and no retry after restart | Transmitted response loss, bounded hanging transport, late response guard, native reopen and second actual process |
| 32. Stale stored estimate | Successful result retained; canonical shot edit produces stale view and re-estimate-required display |
| 33. Saved result in Generate | Actual Generate projection/GET and separate built desktop/mobile observation |
| 34–35. Client cannot forge price/completion | Strict action schema denies authority-bearing fields before repository access |
| 36–37. No credentials in API/persistence | Synthetic secret-bearing failures and correlation negatives, exact response/state scans; no real credential read |
| 38. No credentials in client bundle | Fresh canonical build artifact scan, including client JS and rendered HTML/RSC/body payloads; source unit tests alone are insufficient |
| 39. Existing Phase 2A.1 green | Fresh contract, persistence and integration suites (38/24/29 inherited cases), separately recorded |
| 40. Existing Phase 2A green | Fresh inherited 21-case suite |
| 41. Phase 1 operator green | Fresh inherited 16-case suite |
| 42. Phase 0 foundation green | Fresh inherited 14-case suite |
| 43. Existing HTTP security green | Fresh built-server security matrix, separate from in-process request tests |
| 44. Live request count zero | Network-denying source tests, fake-only call inventory and isolated preview denial counters; no OS packet-trace claim |

Further negatives cover managed-job generic lifecycle bypass, forged outcome token, malformed success, hostile correlation, invalid transport deadlines and disabled real transport. A mocked result is not a successful live estimate; browser Stop waiting is not provider cancellation. All historical failed evidence remains immutable, and source failures require a material fix before a fresh validation execution.
