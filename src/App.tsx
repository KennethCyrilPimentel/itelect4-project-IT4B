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
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDetails, toggleDetails] = useToggle(false);
   const shootCounts = useShootCount(shoots);

  useEffect(() => {
    setTimeout(() => {
      setShoots([shoot]);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return <p>Loading shoots...</p>;
  }

  return (
    <div className="app">
      <input
        ref={searchInputRef}
        value={searchTerm}
        type="text"
        placeholder="Search shoots..."
        onChange={handleSearchChange}
      />

      <div className="shoot-counts">
        <p>Requested: {shootCounts.requested}</p>
        <p>Confirmed: {shootCounts.confirmed}</p>
        <p>Completed: {shootCounts.completed}</p>
        <p>Cancelled: {shootCounts.cancelled}</p>
      </div>

      {shoots.map((s) => (
        <ShootCard key={s.id} shoot={s} />
      ))}

      <UserCard
        user={photographer}
        onSelect={setSelectedUser}
      />
      {selectedUser && <p>Selected: {selectedUser.name}</p>}

      <button onClick={toggleDetails}>{showDetails ? "Hide" : "Show"} Details</button>
      {showDetails && (
        <DeliverableBadge deliverable={deliverable}>
          <p>On schedule!</p>
        </DeliverableBadge>
      )}
    </div>
  );
}
export default App;