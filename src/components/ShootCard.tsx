// src/components/ShootCard.tsx
import type { Shoot } from "../../types/index";
import { ShootStatus } from "../../types/index";

interface ShootCardProps {
  shoot: Shoot;
}

function ShootCard({ shoot }: ShootCardProps) {
  return (
    <div className="shoot-card">
      <h3>{shoot.type}</h3>
      <p>{shoot.location}</p>
      <p>Status: {ShootStatus[shoot.status]}</p>
    </div>
  );
}

export default ShootCard;