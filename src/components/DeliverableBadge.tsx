// src/components/DeliverableBadge.tsx
import type { Deliverable } from "../../types/index";

interface DeliverableBadgeProps {
  deliverable: Deliverable;
  children?: React.ReactNode;
}

const DeliverableBadge: React.FC<DeliverableBadgeProps> = ({
  deliverable,
  children,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5
      shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <p className="text-gray-900 dark:text-white">
        Batch: {deliverable.batchName}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Files: {deliverable.fileCount}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Delivered:{" "}
        {deliverable.deliveredAt
          ? deliverable.deliveredAt.toLocaleDateString()
          : "Not yet delivered"}
      </p>
      {children}
    </div>
  );
};

export default DeliverableBadge;