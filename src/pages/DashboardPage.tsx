// src/pages/DashboardPage.tsx
import { useState } from "react";
import type { User } from "../../types/index";
import UserCard from "../components/UserCard";
import DeliverableBadge from "../components/DeliverableBadge";
import useToggle from "../hooks/useToggle";
import useShootCount from "../hooks/useShootCount";
import { photographer, allShoots, allDeliverables } from "../data/mockData";

function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetails, toggleDetails] = useToggle(false);
  const shootCounts = useShootCount(allShoots);

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
      {showDetails && (
        <DeliverableBadge deliverable={allDeliverables[0]}>
          <p className="dark:text-white">On schedule!</p>
        </DeliverableBadge>
      )}
    </div>
  );
}

export default DashboardPage;