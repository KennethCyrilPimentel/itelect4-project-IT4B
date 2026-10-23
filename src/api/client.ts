// src/api/client.ts
// Every call to the backend lives in this one file.
import type {
  ApiShoot,
  NewShoot,
  ApiDeliverable,
  NewDeliverable,
  ApiUser,
  AuthResponse,
  LoginBody,
  RegisterBody,
  AiReview,
} from "../../types/index";
import useAuthStore from "../store/authStore";

// Set in .env.local (and in Vercel for the deployed site)
export const API_URL: string = import.meta.env.VITE_API_URL;

// One helper does the boring parts for every call: build the URL, attach
// the token if we have one, and turn a failed response into a readable Error.
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    // An expired or bad token: log out so ProtectedRoute sends us to /login
    if (res.status === 401 && token) {
      useAuthStore.getState().logout();
    }

    // The backend answers { message } (and { message, errors[] } for bad input)
    let message = "Something went wrong";
    try {
      const body = await res.json();
      message = Array.isArray(body.errors)
        ? body.errors.join(", ")
        : (body.message ?? message);
    } catch {
      // the body wasn't JSON, keep the default message
    }
    throw new Error(message);
  }

  // 204 = success with deliberately no body
  if (res.status === 204) {
    return undefined as T;
  }
  return res.json();
}

// ===== AUTH =====

export function registerUser(body: RegisterBody): Promise<ApiUser> {
  return request<ApiUser>("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function loginUser(body: LoginBody): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ===== SHOOTS =====

// GET /shoots -> only this user's shoots
export function fetchShoots(): Promise<ApiShoot[]> {
  return request<ApiShoot[]>("/shoots");
}

// GET /shoots/:id -> one shoot
export function fetchShootById(id: string): Promise<ApiShoot> {
  return request<ApiShoot>(`/shoots/${id}`);
}

// POST /shoots -> the row the server saved, with the id it made
export function createShoot(newShoot: NewShoot): Promise<ApiShoot> {
  return request<ApiShoot>("/shoots", {
    method: "POST",
    body: JSON.stringify(newShoot),
  });
}

// ===== DELIVERABLES =====

// GET /deliverables -> all of this user's deliverables
export function fetchDeliverables(): Promise<ApiDeliverable[]> {
  return request<ApiDeliverable[]>("/deliverables");
}

// GET /deliverables?shootId=abc -> deliverables for ONE shoot (an array)
export function fetchDeliverablesByShootId(
  shootId: string,
): Promise<ApiDeliverable[]> {
  return request<ApiDeliverable[]>(`/deliverables?shootId=${shootId}`);
}

// POST /deliverables -> the row the server saved, with the id it made
export function createDeliverable(
  newDeliverable: NewDeliverable,
): Promise<ApiDeliverable> {
  return request<ApiDeliverable>("/deliverables", {
    method: "POST",
    body: JSON.stringify(newDeliverable),
  });
}

// ===== AI =====

// POST /ai -> a review of the shoot description. Private like the shoots:
// request() adds the token, and without it anyone could spend the Gemini
// quota. The browser never talks to Gemini, only to our own backend.
export function askAi(prompt: string): Promise<AiReview> {
  return request<AiReview>("/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}