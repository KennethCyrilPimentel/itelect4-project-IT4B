// src/pages/DashboardPage.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query"; // <-- NEW
import type { User } from "../../types/index";
import UserCard from "../components/UserCard";
import DeliverableBadge from "../components/DeliverableBadge";
import useToggle from "../hooks/useToggle";
import useShootCount from "../hooks/useShootCount";
import { fetchShoots, fetchDeliverables } from "../api/client"; // <-- NEW
import { photographer } from "../data/mockData"; // <-- allShoots/allDeliverables GONE

function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetails, toggleDetails] = useToggle(false);

  // Same key ["shoots"] as ShootsPage -- shares the same cache entry,
  // so if that page already fetched it, this loads instantly.
  const { data: shoots } = useQuery({
    queryKey: ["shoots"],
    queryFn: fetchShoots,
  });

  const { data: deliverables } = useQuery({
    queryKey: ["deliverables"],
    queryFn: fetchDeliverables,
  });

  // shoots may still be loading (undefined) on first visit to this page --
  // fall back to an empty array so useShootCount always has something safe
  const shootCounts = useShootCount(shoots ?? []);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h2>

      <UserCard user={photographer} onSelect={setSelectedUser} />
      {selectedUser && (
        <p className="mt-2 dark:text-white">Selected: {selectedUser.name}</p>
      )}

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