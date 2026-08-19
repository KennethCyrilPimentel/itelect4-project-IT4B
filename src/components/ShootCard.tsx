import type { ApiShoot } from "../../types/index";
import { ShootStatus } from "../../types/index"; // <-- NEW

interface ShootCardProps {
  shoot: ApiShoot;
  variant?: "default" | "compact";
}

// NEW: maps each enum value back to a readable label
const statusLabels: Record<ShootStatus, string> = {
  [ShootStatus.Requested]: "Requested",
  [ShootStatus.Confirmed]: "Confirmed",
  [ShootStatus.Completed]: "Completed",
  [ShootStatus.Cancelled]: "Cancelled",
};

function ShootCard({ shoot, variant = "default" }: ShootCardProps) {
  const isCompact = variant === "compact";

  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm
      dark:bg-gray-800 dark:border-gray-700 ${isCompact ? "p-3" : "p-5"}`}>
      <h3 className={`font-bold text-gray-900 dark:text-white
        ${isCompact ? "text-sm" : "text-lg"}`}>
        {shoot.type}
      </h3>
      {!isCompact && (
        <p className="text-gray-600 dark:text-gray-300">{shoot.location}</p>
      )}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Status: {statusLabels[shoot.status]} {/* <-- was shoot.status */}
      </p>
    </div>
  );
}

export default ShootCard;