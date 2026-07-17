# Shutterbook — Photo Gig Booking Tracker

## Project Concept

Shutterbook is a booking and delivery management tool for
freelance photographers and their clients. Clients can request photo
shoots (weddings, events, portraits), photographers can accept and
manage bookings, and both sides can track the status of a shoot from
initial request through to delivery of the final edited photos. The
app also includes a lightweight FAQ feature so clients can get instant
answers to common questions (turnaround time, pricing, policies)
without waiting for a manual reply.

Core user roles: **client**, **photographer**, and **admin**.

## Interfaces & Types Defined So Far

### Interfaces
- `User` — represents a client, photographer, or admin account
- `Shoot` — a booking request/session, with a status lifecycle
- `Deliverable` — a batch of edited photos tied to a completed shoot
- `ApiResponse<T>` — generic wrapper for API responses (success, data, message)

### Utility Types
- `ShootUpdate` — `Partial<Shoot>`, for partial update payloads
- `ShootPreview` — `Pick<Shoot, "id" | "type" | "status" | "scheduledDate">`, for list views
- `PublicUser` — `Omit<User, "email" | "isActive" | "faqs">`, for public-facing profiles
- `RoleCount` — `Record<"client" | "photographer" | "admin", number>`, for dashboard stats

### Type Aliases
- `ID` — `number | string`
- `Coordinate` — `{ x: number; y: number }`
- `Formatter` — `(value: number) => string`
- `StringOrNumber` — `string | number`

### Enums
- `ShootStatus` — regular enum: `Requested`, `Confirmed`, `Completed`, `Cancelled`

### Generic Functions
- `getFirst<T>(items: T[]): T | undefined`
- `getById<T extends { id: number }>(items: T[], id: number): T | undefined`

## How to Install and Run

```bash
npm install
npx ts-node src/index.ts
```

To type-check without producing output:

```bash
npx tsc --noEmit
```