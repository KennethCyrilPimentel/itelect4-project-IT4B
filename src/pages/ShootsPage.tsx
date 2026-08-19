// src/pages/ShootsPage.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // <-- useMutation, useQueryClient NEW
import { Link } from "react-router";
import type { ApiShoot } from "../../types/index";
import ShootCard from "../components/ShootCard";
import { fetchShoots, createShoot } from "../api/client"; // <-- createShoot NEW

function ShootsPage() {
  const queryClient = useQueryClient(); // <-- NEW

  // 1. READ -- unchanged
  const { data, isPending, isError, error } = useQuery<ApiShoot[]>({
    queryKey: ["shoots"],
    queryFn: fetchShoots,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Form fields for a new shoot -- kept simple: type + location
  const [newType, setNewType] = useState<string>("");
  const [newLocation, setNewLocation] = useState<string>("");

  // 2. WRITE -- mutationFn does the POST, onSuccess cleans up after it
  const addShoot = useMutation({
    mutationFn: createShoot,
    onSuccess: () => {
      // "the shoots list is out of date now -- go and refetch it"
      queryClient.invalidateQueries({ queryKey: ["shoots"] });
      setNewType("");
      setNewLocation("");
    },
  });

  const handleAdd = (): void => {
    addShoot.mutate({
      clientId: 1,
      photographerId: 1,
      type: newType,
      status: 0, // ShootStatus.Requested
      scheduledDate: new Date().toISOString(), // a STRING, not a Date
      location: newLocation,
      price: 0,
    });
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => setSearchTerm(e.target.value);

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-500">Loading shoots...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message} -- is json-server running on port 3001?
      </div>
    );
  }

  const filteredShoots = data.filter((s) =>
    s.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Shoots
      </h2>

      {/* NEW: small form to request a shoot */}
      <div className="mb-4 flex flex-wrap gap-2">
        <input value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="Shoot type (e.g. Wedding)"
          className="rounded border border-gray-300 p-2
            dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
        <input value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder="Location"
          className="rounded border border-gray-300 p-2
            dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
        <button onClick={handleAdd}
          disabled={newType === "" || newLocation === "" || addShoot.isPending}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold
            text-white transition hover:bg-blue-700 disabled:bg-gray-400">
          {addShoot.isPending ? "Requesting..." : "Request Shoot"}
        </button>
      </div>
      {addShoot.isError && (
        <p className="mb-4 text-sm text-red-700">{addShoot.error.message}</p>
      )}

      <input value={searchTerm}
        onChange={handleSearchChange} placeholder="Search shoots..."
        className="w-full rounded border border-gray-300 p-2
          dark:border-gray-600 dark:bg-gray-700 dark:text-white" />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredShoots.map((s) => (
          <Link key={s.id} to={`/shoots/${s.id}`}>
            <ShootCard shoot={s} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ShootsPage;