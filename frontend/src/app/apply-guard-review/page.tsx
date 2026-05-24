import ApplyGuardReviewPageClient from "./page-client";

export const metadata = {
  title: "Apply Guard Review",
  description: "Review approval, diff boundaries, rollback, and validation before enabling a real apply path.",
};

export default function ApplyGuardReviewPage() {
  return <ApplyGuardReviewPageClient />;
}
