import { NextResponse } from "next/server";

type HealthEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  weight?: number;
  steps?: number;
  water?: number; // liters
  sleep?: number; // hours
  notes?: string;
};

function summarize(entries: HealthEntry[]): string {
  if (!entries.length) {
    return "No entries yet. Add one first, then I’ll summarize patterns.";
  }

  const last7 = entries.slice(0, 7);

  const nums = (arr: (number | undefined)[]) =>
    arr.filter((v): v is number => typeof v === "number" && Number.isFinite(v));

  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / Math.max(1, arr.length);

  const weights = nums(last7.map((e) => e.weight));
  const steps = nums(last7.map((e) => e.steps));
  const water = nums(last7.map((e) => e.water));
  const sleep = nums(last7.map((e) => e.sleep));

  const lines: string[] = [];
  lines.push(`Based on your latest ${last7.length} entries:`);

  if (weights.length) lines.push(`• Avg weight: ${avg(weights).toFixed(1)} kg`);
  if (steps.length) lines.push(`• Avg steps: ${Math.round(avg(steps)).toLocaleString()}`);
  if (water.length) lines.push(`• Avg water: ${avg(water).toFixed(1)} L`);
  if (sleep.length) lines.push(`• Avg sleep: ${avg(sleep).toFixed(1)} hrs`);

  if (!weights.length && !steps.length && !water.length && !sleep.length) {
    lines.push("• You’ve only entered notes/dates so far — add numbers to get trends.");
  }

  lines.push("");
  lines.push("Next: replace this stub with a real AI model call (keeping it optional so the app stays fast).");

  return lines.join("\n");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { entries?: HealthEntry[] };
    const entries = Array.isArray(body.entries) ? body.entries : [];
    const text = summarize(entries);

    return NextResponse.json({
      ok: true,
      insight: text,
      model: "stub",
    });
  } catch {
    return NextResponse.json(
      { ok: false, insight: "Bad request: expected JSON { entries: [...] }", model: "stub" },
      { status: 400 }
    );
  }
}
