// src/pages/ShootDetailPage.tsx
import { useParams, useNavigate } from "react-router";
import ShootCard from "../components/ShootCard";
import { allShoots } from "../data/mockData";

function ShootDetailPage() {
  // Reads whatever is in the :id slot of the URL -- always a string
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Shoot.id is a number, but everything read from the URL is a
  // string -- so we convert before comparing
  const shoot = allShoots.find((s) => s.id === Number(id));

  if (shoot === undefined) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        No shoot found with id "{id}".
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {shoot.type} -- {shoot.location}
      </h2>

      <div className="max-w-sm">
        <ShootCard shoot={shoot} />
      </div>

      <button onClick={() => navigate("/shoots")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm
          font-semibold text-white transition hover:bg-blue-700">
        Back to Shoots
      </button>
    </div>
  );
}

export default ShootDetailPage;