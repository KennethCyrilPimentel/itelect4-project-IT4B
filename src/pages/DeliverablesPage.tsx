// src/pages/DeliverablesPage.tsx
import { useQuery } from "@tanstack/react-query";
import type { ApiDeliverable } from "../../types/index";
import DeliverableBadge from "../components/DeliverableBadge";
import { fetchDeliverables } from "../api/client";

function DeliverablesPage() {
  const { data, isPending, isError, error } = useQuery<ApiDeliverable[]>({
    queryKey: ["deliverables"],
    queryFn: fetchDeliverables,
  });

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-500">Loading deliverables...</div>;
  }

  // CHANGED: the old message blamed json-server on port 3001
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
        My Deliverables
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((d) => (
          <DeliverableBadge key={d.id} deliverable={d}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Files: {d.fileCount}
            </p>
          </DeliverableBadge>
        ))}
      </div>
    </div>
  );
}

export default DeliverablesPage;