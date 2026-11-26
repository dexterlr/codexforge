import {
  assertPrivateAlphaLoopbackRequest, privateAlphaHttpErrorResponse, privateAlphaJsonResponse, readPrivateAlphaJsonBody,
} from "@/lib/codexforge/private-alpha/private-alpha-http.server";
import {
  findPracticeOrder, finishPracticeOrder, PRACTICE_ALLOCATION_PENCE, PracticeRequestError,
  practiceLedgerSnapshot, publicPracticeOrder, readPracticeIntent, reservePracticeOrder,
} from "@/lib/codexforge/trading-research/practice-ledger.server";
import {
  listPracticeInstruments, placePracticeLimitBuy, PracticeBrokerError, practiceConfigured, readPracticeAccount,
} from "@/lib/codexforge/trading-research/trading212-practice.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function failure(error: unknown, safeToEdit = false) {
  const boundary = privateAlphaHttpErrorResponse(error);
  if (boundary) return boundary;
  const status = error instanceof PracticeRequestError ? error.status : 503;
  const message = error instanceof PracticeRequestError || error instanceof PracticeBrokerError
    ? error.message : "The practice service is unavailable. Refresh the order history before trying again.";
  return privateAlphaJsonResponse({ error: { message }, safeToEdit }, { status });
}

export async function GET(request: Request) {
  try {
    assertPrivateAlphaLoopbackRequest(request);
    const base = {
      configured: practiceConfigured(), currency: "GBP", allocationPence: PRACTICE_ALLOCATION_PENCE,
      availableCashPence: null, instruments: [], ...practiceLedgerSnapshot(),
    };
    if (!base.configured) return privateAlphaJsonResponse(base);
    try {
      const [account, instruments] = await Promise.all([readPracticeAccount(), listPracticeInstruments()]);
      return privateAlphaJsonResponse({ ...base, availableCashPence: account.freeCashPence, instruments });
    } catch (error) {
      return privateAlphaJsonResponse({ ...base, accountIssue: error instanceof PracticeBrokerError ? error.message : "Could not verify your GBP practice balance or instruments." });
    }
  } catch (error) { return failure(error); }
}

export async function POST(request: Request) {
  let safeToEdit = true;
  try {
    assertPrivateAlphaLoopbackRequest(request, true);
    const intent = readPracticeIntent(await readPrivateAlphaJsonBody(request));
    const existing = findPracticeOrder(intent);
    if (existing) {
      safeToEdit = existing.status === "rejected";
      return receipt(existing);
    }
    if (!practiceConfigured()) throw new PracticeRequestError(503, "Connect Trading 212 practice in the server settings first.");
    const account = await readPracticeAccount();
    if (account.freeCashPence < intent.reservedPence) throw new PracticeRequestError(409, "The order exceeds the available GBP practice balance.");
    const reservation = reservePracticeOrder(intent, account.accountRef);
    safeToEdit = false;
    if (!reservation.created) return receipt(reservation.order);
    let brokerId: string;
    try {
      const order = await placePracticeLimitBuy({
        ticker: intent.ticker, quantity: intent.quantityUnits / 10_000, limitPricePence: intent.pricePence,
      }, account.accountRef);
      brokerId = order.id;
    } catch (error) {
      const uncertain = !(error instanceof PracticeBrokerError) || error.ambiguous;
      finishPracticeOrder(intent.id, uncertain ? "unconfirmed" : "rejected", null);
      safeToEdit = !uncertain;
      if (uncertain) throw new PracticeRequestError(409, "The broker outcome is unconfirmed. The budget is reserved. Check Trading 212 practice before placing another order.");
      throw error;
    }
    finishPracticeOrder(intent.id, "submitted", brokerId);
    return receipt({ ...reservation.order, status: "submitted", brokerOrderId: brokerId });
  } catch (error) { return failure(error, safeToEdit); }
}

function receipt(order: Parameters<typeof publicPracticeOrder>[0]) {
  if (order.status === "submitting" || order.status === "unconfirmed") {
    throw new PracticeRequestError(409, "This order is already recorded. Check its status in Trading 212 practice. The budget remains reserved.");
  }
  if (order.status === "rejected") throw new PracticeRequestError(422, "This instruction was rejected. Review it before creating a new practice order.");
  return privateAlphaJsonResponse({ order: publicPracticeOrder(order) });
}
