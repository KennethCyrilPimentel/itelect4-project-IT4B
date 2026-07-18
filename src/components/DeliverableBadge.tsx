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
    <div className="deliverable-badge">
      <p>Batch: {deliverable.batchName}</p>
      <p>Files: {deliverable.fileCount}</p>
      <p>
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