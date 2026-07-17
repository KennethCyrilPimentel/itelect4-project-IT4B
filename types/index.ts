// ===== INTERFACES =====
// An interface defines the SHAPE of an object -- what fields it must have.

export interface User {
  id: number;
  name: string;
  email: string;
  role: "client" | "photographer" | "admin"; // only these values
  isActive: boolean;
  faqs?: { question: string; answer: string }[]; // photographer only
}

export interface Shoot {
  id: number;
  clientId: number;
  photographerId: number;
  type: string;
  status: ShootStatus; // was: "requested" | "confirmed" | "completed" | "cancelled"
  scheduledDate: Date;
  location: string;
  price: number;
}

export interface Deliverable {
  id: number;
  shootId: number;
  batchName: string;
  status: "raw" | "editing" | "delivered";
  fileCount: number;
  deliveredAt?: Date; // optional -- only set once delivered
}

// ===== GENERIC INTERFACE =====
// ApiResponse<T> can wrap ANY data type -- every future GT reuses this
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====

// Partial<T> -- every field becomes optional (perfect for update payloads)
export type ShootUpdate = Partial<Shoot>;

// Pick<T, K> -- keep ONLY the listed fields
export type ShootPreview = Pick<Shoot, "id" | "type" | "status" | "scheduledDate">;

// Omit<T, K> -- keep every field EXCEPT the listed ones
export type PublicUser = Omit<User, "email" | "isActive" | "faqs">;

// Record<K, T> -- a fixed set of keys, each mapped to the same value type
export type RoleCount = Record<"client" | "photographer" | "admin", number>;


// ===== TYPE ALIASES =====
// A type alias gives a name to any type -- primitives, unions, functions, objects

// Alias for a union type (string OR number)
export type ID = number | string;

// Alias for an object shape
export type Coordinate = {
  x: number;
  y: number;
};

// Alias for a function signature
export type Formatter = (value: number) => string;

// ===== UNION TYPES -- One OR the other =====
export type StringOrNumber = string | number;

// Function that accepts a union type
export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}

// ===== ENUMS =====
// Regular enum -- exists at runtime; can be looped over or reverse-mapped
// Good fit here since you'll likely build a status dropdown/filter later
export enum ShootStatus {
  Requested,
  Confirmed,
  Completed,
  Cancelled,
}

