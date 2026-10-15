/** Exact, nonnegative timeline time in seconds. Pure compatibility foundation only:
 * persisted editorial v1 still uses integer microseconds; no runtime migration occurs here. */
export interface EditorialRational { readonly numerator: number; readonly denominator: number }
export type EditorialRounding = "EXACT" | "FLOOR" | "CEIL" | "NEAREST_EVEN";
export type EditorialFrameRateName = "23.976" | "24" | "25" | "29.97" | "30" | "50" | "59.94" | "60";
export class EditorialTimeError extends Error {
  constructor(readonly code: "EDITORIAL_TIME_INVALID" | "EDITORIAL_TIME_OVERFLOW" | "EDITORIAL_TIME_INEXACT") {
    super(code === "EDITORIAL_TIME_INEXACT" ? "Time cannot be represented exactly in the requested unit." : code === "EDITORIAL_TIME_OVERFLOW" ? "Exact time exceeds the safe JSON integer representation." : "Use canonical nonnegative rational time and an explicit supported rounding policy.");
    this.name = "EditorialTimeError";
  }
}
// Constructor syntax preserves exact BigInt arithmetic under the repository's ES2017 target.
const ZERO = BigInt(0), ONE = BigInt(1), TWO = BigInt(2), MAX = BigInt(Number.MAX_SAFE_INTEGER), US = BigInt(1_000_000);
const fail = (code: EditorialTimeError["code"] = "EDITORIAL_TIME_INVALID"): never => { throw new EditorialTimeError(code); };
function integer(value: unknown, positive = false): bigint {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || Object.is(value, -0) || value < (positive ? 1 : 0)) return fail();
  return BigInt(value);
}
function gcd(a: bigint, b: bigint): bigint { while (b !== ZERO) { const next = a % b; a = b; b = next; } return a; }
function reduced(numerator: bigint, denominator: bigint): EditorialRational {
  if (numerator < ZERO || denominator <= ZERO) return fail();
  const divisor = gcd(numerator, denominator), n = numerator / divisor, d = denominator / divisor;
  if (n > MAX || d > MAX) return fail("EDITORIAL_TIME_OVERFLOW");
  return Object.freeze({ numerator: Number(n), denominator: Number(d) });
}
/** Constructor normalizes equivalent fractions; zero always becomes 0/1. */
export function makeEditorialRational(numerator: number, denominator: number): EditorialRational { return reduced(integer(numerator), integer(denominator, true)); }
/** Persisted/input rationals must already be canonical; no getters or alternate fields. */
export function validateEditorialRational(value: unknown): EditorialRational {
  if (!value || typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype) return fail();
  const keys = Reflect.ownKeys(value);
  if (keys.length !== 2 || !keys.includes("numerator") || !keys.includes("denominator")) return fail();
  for (const key of keys) { const descriptor = Object.getOwnPropertyDescriptor(value, key)!; if (!descriptor.enumerable || !("value" in descriptor)) return fail(); }
  const raw = value as EditorialRational, result = makeEditorialRational(raw.numerator, raw.denominator);
  if (result.numerator !== raw.numerator || result.denominator !== raw.denominator) return fail();
  return result;
}
/** Broadcast-style labels are explicit identities, never rounded decimal arithmetic. */
export function editorialFrameRate(name: EditorialFrameRateName): EditorialRational {
  switch (name) {
    case "23.976": return makeEditorialRational(24_000, 1_001);
    case "29.97": return makeEditorialRational(30_000, 1_001);
    case "59.94": return makeEditorialRational(60_000, 1_001);
    case "24": return makeEditorialRational(24, 1);
    case "25": return makeEditorialRational(25, 1);
    case "30": return makeEditorialRational(30, 1);
    case "50": return makeEditorialRational(50, 1);
    case "60": return makeEditorialRational(60, 1);
    default: return fail();
  }
}
function rate(value: unknown): EditorialRational { const result = validateEditorialRational(value); if (result.numerator === 0) return fail(); return result; }
function rounded(numerator: bigint, denominator: bigint, mode: EditorialRounding): number {
  if (!["EXACT", "FLOOR", "CEIL", "NEAREST_EVEN"].includes(mode)) return fail();
  const quotient = numerator / denominator, remainder = numerator % denominator;
  if (mode === "EXACT" && remainder !== ZERO) return fail("EDITORIAL_TIME_INEXACT");
  const up = mode === "CEIL" ? remainder !== ZERO : mode === "NEAREST_EVEN" && (remainder * TWO > denominator || (remainder * TWO === denominator && quotient % TWO === ONE));
  const result = quotient + (up ? ONE : ZERO); if (result > MAX) return fail("EDITORIAL_TIME_OVERFLOW"); return Number(result);
}
export function editorialTimeFromUs(microseconds: number): EditorialRational { return reduced(integer(microseconds), US); }
/** Rounding is a presentation adapter, not permission to replace canonical source time. */
export function editorialTimeToUs(time: unknown, rounding: EditorialRounding = "EXACT"): number {
  const t = validateEditorialRational(time); return rounded(BigInt(t.numerator) * US, BigInt(t.denominator), rounding);
}
export function editorialTimeFromFrames(frameIndex: number, frameRate: unknown): EditorialRational {
  const frames = integer(frameIndex), r = rate(frameRate); return reduced(frames * BigInt(r.denominator), BigInt(r.numerator));
}
export function editorialTimeToFrames(time: unknown, frameRate: unknown, rounding: EditorialRounding = "EXACT"): number {
  const t = validateEditorialRational(time), r = rate(frameRate); return rounded(BigInt(t.numerator) * BigInt(r.numerator), BigInt(t.denominator) * BigInt(r.denominator), rounding);
}
export function editorialAddTime(left: unknown, right: unknown): EditorialRational {
  const a = validateEditorialRational(left), b = validateEditorialRational(right);
  return reduced(BigInt(a.numerator) * BigInt(b.denominator) + BigInt(b.numerator) * BigInt(a.denominator), BigInt(a.denominator) * BigInt(b.denominator));
}
export function editorialSubtractTime(left: unknown, right: unknown): EditorialRational {
  const a = validateEditorialRational(left), b = validateEditorialRational(right);
  return reduced(BigInt(a.numerator) * BigInt(b.denominator) - BigInt(b.numerator) * BigInt(a.denominator), BigInt(a.denominator) * BigInt(b.denominator));
}
export function editorialScaleTime(time: unknown, factor: unknown): EditorialRational {
  const t = validateEditorialRational(time), f = validateEditorialRational(factor); return reduced(BigInt(t.numerator) * BigInt(f.numerator), BigInt(t.denominator) * BigInt(f.denominator));
}
export function editorialCompareTime(left: unknown, right: unknown): -1 | 0 | 1 {
  const a = validateEditorialRational(left), b = validateEditorialRational(right), difference = BigInt(a.numerator) * BigInt(b.denominator) - BigInt(b.numerator) * BigInt(a.denominator);
  return difference < ZERO ? -1 : difference > ZERO ? 1 : 0;
}
