// src/App.tsx
import UserCard from "./components/UserCard";
import ShootCard from "./components/ShootCard";
import DeliverableBadge from "./components/DeliverableBadge";
import type { User, Shoot, Deliverable } from "../types/index";
import { ShootStatus } from "../types/index";

const photographer: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "photographer",
  isActive: true,
};

const shoot: Shoot = {
  id: 1,
  clientId: 2,
  photographerId: 1,
  type: "Wedding",
  status: ShootStatus.Confirmed,
  scheduledDate: new Date(),
  location: "Tagaytay",
  price: 15000,
};

const deliverable: Deliverable = {
  id: 1,
  shootId: 1,
  batchName: "Ceremony Highlights",
  status: "editing",
  fileCount: 42,
};

function App() {
  return (
    <div className="app">
      <UserCard
        user={photographer}
        onSelect={(u) => console.log(u)}
      />
      <ShootCard shoot={shoot} />
      <DeliverableBadge deliverable={deliverable}>
        <p>On schedule!</p>
      </DeliverableBadge>
    </div>
  );
}

export default App;