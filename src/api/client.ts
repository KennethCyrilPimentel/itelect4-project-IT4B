// src/api/client.ts
// Every call to json-server lives in this one file.
import type {
  ApiShoot,
  NewShoot,
  ApiDeliverable,
  NewDeliverable,
} from "../../types/index";

export const API_URL = "http://localhost:3001";

// ===== SHOOTS =====

// GET /shoots -> the whole list
export async function fetchShoots(): Promise<ApiShoot[]> {
  const res = await fetch(`${API_URL}/shoots`);
  if (!res.ok) {
    throw new Error("Could not load shoots");
  }
  return res.json();
}

// POST /shoots -> the row the server saved, with the id it made
export async function createShoot(newShoot: NewShoot): Promise<ApiShoot> {
  const res = await fetch(`${API_URL}/shoots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newShoot),
  });
  if (!res.ok) {
    throw new Error("Could not save the shoot");
  }
  return res.json();
}

// ===== DELIVERABLES =====

// GET /deliverables -> the whole list
export async function fetchDeliverables(): Promise<ApiDeliverable[]> {
  const res = await fetch(`${API_URL}/deliverables`);
  if (!res.ok) {
    throw new Error("Could not load deliverables");
  }
  return res.json();
}

// GET /deliverables?shootId=1 -> deliverables for ONE shoot (an array)
export async function fetchDeliverablesByShootId(
  shootId: number
): Promise<ApiDeliverable[]> {
  const res = await fetch(`${API_URL}/deliverables?shootId=${shootId}`);
  if (!res.ok) {
    throw new Error("Could not load deliverables for that shoot");
  }
  return res.json();
}

// POST /deliverables -> the row the server saved, with the id it made
export async function createDeliverable(
  newDeliverable: NewDeliverable
): Promise<ApiDeliverable> {
  const res = await fetch(`${API_URL}/deliverables`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDeliverable),
  });
  if (!res.ok) {
    throw new Error("Could not save the deliverable");
  }
  return res.json();
}

// GET /shoots/:id -> one shoot directly, no array wrapping needed
export async function fetchShootById(id: string): Promise<ApiShoot> {
  const res = await fetch(`${API_URL}/shoots/${id}`);
  if (!res.ok) {
    throw new Error(`No shoot found with id "${id}"`);
  }
  return res.json();
}