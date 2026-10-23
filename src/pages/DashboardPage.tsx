// src/pages/DashboardPage.tsx
import { useQuery } from "@tanstack/react-query";
import DeliverableBadge from "../components/DeliverableBadge";
import useToggle from "../hooks/useToggle";
import useShootCount from "../hooks/useShootCount";
import useAuthStore from "../store/authStore"; // NEW
import { fetchShoots, fetchDeliverables } from "../api/client";
// CHANGED: the mockData, User, UserCard and useState imports are GONE

function DashboardPage() {
  const [showDetails, toggleDetails] = useToggle(false);

  // NEW: the real logged-in user, from the store, instead of a hard-coded one
  const token = useAuthStore((state) => state.token);
  const userName = useAuthStore((state) => state.userName);

  // Same key ["shoots"] as ShootsPage -- shares the same cache entry,
  // so if that page already fetched it, this loads instantly.
  // CHANGED: enabled only when logged in, because the API needs a token.
  // Without it the request would just fail with a 401.
  const { data: shoots } = useQuery({
    queryKey: ["shoots"],
    queryFn: fetchShoots,
    enabled: token !== null,
  });

  const { data: deliverables } = useQuery({
    queryKey: ["deliverables"],
    queryFn: fetchDeliverables,
    enabled: token !== null,
  });

  // shoots may still be loading (undefined) on first visit to this page --
  // fall back to an empty array so useShootCount always has something safe
  const shootCounts = useShootCount(shoots ?? []);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h2>

      {/* CHANGED: was <UserCard user={photographer} ... /> */}
      <p className="text-gray-700 dark:text-gray-300">
        {userName === null
          ? "Log in to see your shoots and deliverables."
          : `Welcome back, ${userName}.`}
      </p>

      <div className="mt-4 flex gap-4 text-sm text-gray-600 dark:text-gray-300">
        <p>Requested: {shootCounts.requested}</p>
        <p>Confirmed: {shootCounts.confirmed}</p>
        <p>Completed: {shootCounts.completed}</p>
        <p>Cancelled: {shootCounts.cancelled}</p>
      </div>

      <button onClick={toggleDetails}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
        {showDetails ? "Hide" : "Show"} Latest Deliverable
      </button>
      {showDetails && deliverables && deliverables.length > 0 && (
        <DeliverableBadge deliverable={deliverables[0]}>
          <p className="dark:text-white">On schedule!</p>
        </DeliverableBadge>
      )}
    </div>
  );
}

export default DashboardPage;