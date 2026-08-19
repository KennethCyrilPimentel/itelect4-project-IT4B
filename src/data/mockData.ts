// src/data/mockData.ts
// allShoots and allDeliverables are DELETED. They live in db.json now,
// and the app fetches them instead of importing them.
//
// `photographer` stays. There is no /users endpoint and no real login
// until Module 4 -- the Dashboard's user is still hard-coded, on purpose.
import type { User } from "../../types/index";

export const photographer: User = {
  id: 1, name: "Juan dela Cruz", email: "juan@example.com",
  role: "photographer", isActive: true,
};