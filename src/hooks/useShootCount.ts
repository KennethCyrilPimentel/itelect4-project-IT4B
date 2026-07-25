import type { Shoot } from "../../types/index";
import { ShootStatus } from "../../types/index";

interface ShootCounts {
  requested: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

// Explicit return type: a fixed-shape object of counts, one per status
function useShootCount(shoots: Shoot[]): ShootCounts {
  return {
    requested: shoots.filter((s) => s.status === ShootStatus.Requested).length,
    confirmed: shoots.filter((s) => s.status === ShootStatus.Confirmed).length,
    completed: shoots.filter((s) => s.status === ShootStatus.Completed).length,
    cancelled: shoots.filter((s) => s.status === ShootStatus.Cancelled).length,
  };
}

export default useShootCount;