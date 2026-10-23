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

// Const enum -- inlined at compile time, no runtime object generated
// Mirrors the same values already used in User.role
export const enum Role {
  Client = "client",
  Photographer = "photographer",
  Admin = "admin",
}

// ===== API TYPES (Session 10) =====
// These now describe what the REAL backend sends, not json-server.
// Ids are strings (Mongo ObjectIds), dates are ISO strings, and a shoot's
// photographer and price are optional because the request form doesn't set them.

export type ApiShoot = Omit<
  Shoot,
  "id" | "clientId" | "photographerId" | "scheduledDate" | "price"
> & {
  id: string;
  clientId: string;
  photographerId?: string;
  scheduledDate: string; // an ISO string, never a Date object
  price?: number;
};

// What we SEND when creating a shoot. Nothing else: the server reads the
// owner off the token and sets the status itself.
export type NewShoot = Pick<ApiShoot, "type" | "location" | "scheduledDate">;

export type ApiDeliverable = Omit<Deliverable, "id" | "shootId" | "deliveredAt"> & {
  id: string;
  shootId: string;      // a shoot's id, which is now a string
  deliveredAt?: string; // still optional, just a string now instead of a Date
};

// What we SEND when creating a deliverable. status is optional (defaults to "raw").
export type NewDeliverable = Pick<
  ApiDeliverable,
  "shootId" | "batchName" | "fileCount"
> &
  Partial<Pick<ApiDeliverable, "status">>;

// ===== AUTH TYPES (Session 10) =====
export type ApiUser = Omit<User, "id" | "faqs"> & { id: string };

export interface AuthResponse {
  token: string;
  user: ApiUser;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}