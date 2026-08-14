// src/pages/DeliverablesPage.tsx
import DeliverableBadge from "../components/DeliverableBadge";
import { allDeliverables } from "../data/mockData";

function DeliverablesPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Deliverables
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {allDeliverables.map((d) => (
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