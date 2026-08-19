// src/pages/ShootDetailPage.tsx
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import type { ApiShoot } from "../../types/index";
import ShootCard from "../components/ShootCard";
import { fetchShootById } from "../api/client";

function ShootDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery<ApiShoot>({
    queryKey: ["shoots", id],
    queryFn: () => fetchShootById(id!),
    enabled: id !== undefined,
  });

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-500">Loading shoot...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {data.type} -- {data.location}
      </h2>

      <div className="max-w-sm">
        <ShootCard shoot={data} />
      </div>

      <button onClick={() => navigate("/shoots")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm
          font-semibold text-white transition hover:bg-blue-700">
        Back to Shoots
      </button>
    </div>
  );
}

export default ShootDetailPage;