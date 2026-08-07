import type { Shoot } from "../../types/index";

interface ShootCardProps {
  shoot: Shoot;
  variant?: "default" | "compact";      // NEW: the optional variant prop
}

function ShootCard({ shoot, variant = "default" }: ShootCardProps) {
  const isCompact = variant === "compact";   // NEW

  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm
      dark:bg-gray-800 dark:border-gray-700 ${isCompact ? "p-3" : "p-5"}`}>
      <h3 className={`font-bold text-gray-900 dark:text-white
        ${isCompact ? "text-sm" : "text-lg"}`}>
        {shoot.type}
      </h3>
      {!isCompact && (                     // NEW: compact hides the location
        <p className="text-gray-600 dark:text-gray-300">{shoot.location}</p>
      )}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Status: {shoot.status}
      </p>
    </div>
  );
}

export default ShootCard;