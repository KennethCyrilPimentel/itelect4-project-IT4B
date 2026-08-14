// src/pages/ShootsPage.tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router"; // <-- NEW
import type { Shoot } from "../../types/index";
import ShootCard from "../components/ShootCard";
import { allShoots } from "../data/mockData"; // <-- NEW

function ShootsPage() {
  const [shoots, setShoots] = useState<Shoot[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setShoots(allShoots); // <-- was setShoots([shoot])
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
  ): void => setSearchTerm(e.target.value);

  const filteredShoots = shoots.filter((s) =>
    s.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="animate-pulse p-6 text-gray-500">Loading shoots...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load shoots. Please try again.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Shoots
      </h2>

      <button onClick={() => setIsError(true)}
        className="mb-2 rounded bg-red-100 px-2 py-1 text-xs text-red-700">
        Simulate Error
      </button>

      <input ref={searchInputRef} value={searchTerm}
        onChange={handleSearchChange} placeholder="Search shoots..."
        className="w-full rounded border border-gray-300 p-2
          dark:border-gray-600 dark:bg-gray-700 dark:text-white" />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredShoots.map((s) => (
          <Link key={s.id} to={`/shoots/${s.id}`}> {/* <-- NEW */}
            <ShootCard shoot={s} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ShootsPage;