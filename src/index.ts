import type { User, Shoot, ApiResponse } from "../types/index";
import { ShootStatus } from "../types/index";

const client: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "client",
  isActive: true,
};

const engagementShoot: Shoot = {
  id: 1,
  clientId: 1,
  photographerId: 2,
  type: "engagement",
  status: ShootStatus.Confirmed, // was: "confirmed"
  scheduledDate: new Date("2026-08-15"),
  location: "Lipa City",
  price: 5000,
};

const userResponse: ApiResponse<User> = {
  success: true,
  data: client,
};

const shootListResponse: ApiResponse<Shoot[]> = {
  success: true,
  data: [engagementShoot],
};

console.log(userResponse.data.name); // Juan dela Cruz
console.log(shootListResponse.data[0]?.location); // Lipa City

// ===== GENERIC FUNCTIONS =====
// T is inferred automatically from whatever array you pass in
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// Constrained generic -- T must have an "id: number" field
function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

// Using them with YOUR entities, not the class demo's
const firstShoot = getFirst<Shoot>([engagementShoot]);
const foundShoot = getById<Shoot>([engagementShoot], 1);

console.log(firstShoot?.location);  // Lipa City
console.log(foundShoot?.price);     // 5000

// ===== USING UTILITY TYPES =====
import type { ShootUpdate, ShootPreview, PublicUser, RoleCount } from "../types/index";

// Partial<T> -- update payload only needs the changed fields
const patch: ShootUpdate = { status: ShootStatus.Completed }; // was: "completed"

// Pick<T,K> -- a lightweight preview object, e.g. for a shoot list view
const preview: ShootPreview = {
  id: 1,
  type: "engagement",
  status: ShootStatus.Confirmed, // was: "confirmed"
  scheduledDate: new Date("2026-08-15"),
};

// Omit<T,K> -- safe to expose publicly (no email, no isActive, no faqs)
const publicProfile: PublicUser = {
  id: 1,
  name: "Juan dela Cruz",
  role: "client",
};

// Record<K,T> -- dashboard-style counts
const roleCount: RoleCount = { client: 30, photographer: 5, admin: 2 };

console.log(patch);
console.log(preview.type);
console.log(publicProfile.name);
console.log(roleCount.photographer);

// ===== USING ENUMS =====
console.log(ShootStatus[engagementShoot.status]); // "Confirmed" -- reverse mapping
console.log(engagementShoot.status === ShootStatus.Confirmed); // true