// src/data/mockData.ts
import type { User, Shoot, Deliverable } from "../../types/index";
import { ShootStatus } from "../../types/index";

export const photographer: User = {
  id: 1, name: "Juan dela Cruz", email: "juan@example.com",
  role: "photographer", isActive: true,
};

export const allShoots: Shoot[] = [
  {
    id: 1, clientId: 2, photographerId: 1, type: "Wedding",
    status: ShootStatus.Confirmed, scheduledDate: new Date(),
    location: "Tagaytay", price: 15000,
  },
  {
    id: 2, clientId: 3, photographerId: 1, type: "Debut",
    status: ShootStatus.Requested, scheduledDate: new Date(),
    location: "Batangas City", price: 12000,
  },
  {
    id: 3, clientId: 4, photographerId: 1, type: "Corporate Event",
    status: ShootStatus.Completed, scheduledDate: new Date(),
    location: "Lipa City", price: 20000,
  },
  {
    id: 4, clientId: 5, photographerId: 1, type: "Cosplay",
    status: ShootStatus.Confirmed, scheduledDate: new Date(),
    location: "SMX Convention Center", price: 8000,
  },
  {
    id: 5, clientId: 6, photographerId: 1, type: "Cosplay",
    status: ShootStatus.Requested, scheduledDate: new Date(),
    location: "Fanime Con Booth", price: 9500,
  },
];

export const allDeliverables: Deliverable[] = [
  {
    id: 1, shootId: 1, batchName: "Ceremony Highlights",
    status: "editing", fileCount: 42,
  },
  {
    id: 2, shootId: 3, batchName: "Corporate Event Final",
    status: "delivered", fileCount: 120, deliveredAt: new Date(),
  },
  {
    id: 3, shootId: 4, batchName: "Cosplay Con Set",
    status: "raw", fileCount: 68,
  },
];