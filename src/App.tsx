// src/App.tsx
import { useState, useEffect, useRef } from "react";
import UserCard from "./components/UserCard";
import ShootCard from "./components/ShootCard";
import DeliverableBadge from "./components/DeliverableBadge";
import type { User, Shoot, Deliverable } from "../types/index";
import { ShootStatus } from "../types/index";
import useToggle from "./hooks/useToggle";
import useShootCount from "./hooks/useShootCount";

const photographer: User = {
  id: 1, name: "Juan dela Cruz", email: "juan@example.com", role: "photographer", isActive: true,
};

const shoot: Shoot = {
  id: 1, clientId: 2, photographerId: 1, type: "Wedding", status: ShootStatus.Confirmed, scheduledDate: new Date(), location: "Tagaytay", price: 15000,
};

const deliverable: Deliverable = {
  id: 1, shootId: 1, batchName: "Ceremony Highlights", status: "editing", fileCount: 42,
};

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [shoots, setShoots] = useState<Shoot[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const shootCounts = useShootCount(shoots);

  useEffect(() => {
    setTimeout(() => {
      setShoots([shoot]);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      searchInputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  const filteredShoots = shoots.filter((s) =>
    s.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="animate-pulse p-6 text-gray-500">
        Loading shoots...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-6 rounded-lg bg-red-50 p-4 text-red-700">
        Could not load shoots. Please try again.
      </div>
    );
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
        <button onClick={toggleDarkMode}
          className="rounded bg-gray-800 px-3 py-1.5 text-sm text-white
            dark:bg-gray-200 dark:text-gray-900">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <input
          ref={searchInputRef}
          value={searchTerm}
          type="text"
          placeholder="Search shoots..."
          onChange={handleSearchChange}
          className="mt-4 w-full rounded border border-gray-300 p-2
            dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        <div className="mt-4 flex gap-4 text-sm text-gray-600 dark:text-gray-300">
          <p>Requested: {shootCounts.requested}</p>
          <p>Confirmed: {shootCounts.confirmed}</p>
          <p>Completed: {shootCounts.completed}</p>
          <p>Cancelled: {shootCounts.cancelled}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredShoots.map((s, i) => (
            <ShootCard key={s.id} shoot={s} variant={i === 0 ? "compact" : "default"} />
          ))}
        </div>

        <div className="mt-6">
          <UserCard user={photographer} onSelect={setSelectedUser} />
          {selectedUser && <p className="mt-2 dark:text-white">Selected: {selectedUser.name}</p>}
        </div>

        <button onClick={toggleDetails}
          className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
          {showDetails ? "Hide" : "Show"} Details
        </button>
        {showDetails && (
          <DeliverableBadge deliverable={deliverable}>
            <p className="dark:text-white">On schedule!</p>
          </DeliverableBadge>
        )}
      </div>
    </div>
  );
}
export default App;