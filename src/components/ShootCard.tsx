// src/components/ShootCard.tsx
import type { Shoot } from "../../types/index";

interface ShootCardProps {
  shoot: Shoot;
}

function ShootCard({ shoot }: ShootCardProps) {
  return (
    <div className="shoot-card">
      <h3>{shoot.type}</h3>
      <p>{shoot.location}</p>
      <p>Status: {shoot.status}</p>
    </div>
  );
}

export default ShootCard;