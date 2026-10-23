// src/App.tsx -- REPLACE the whole file (final version)
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ShootsPage from "./pages/ShootsPage";
import ShootDetailPage from "./pages/ShootDetailPage";
import LoginPage from "./pages/LoginPage";
import DeliverablesPage from "./pages/DeliverablesPage";
import ReviewPage from "./pages/ReviewPage"; // GT5
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="login" element={<LoginPage />} />
        {/* CHANGED: shoots and shoot detail moved in here. The API needs a
            token, so a logged-out visitor goes to /login instead of
            seeing an error. */}
        <Route element={<ProtectedRoute />}>
          <Route path="shoots" element={<ShootsPage />} />
          <Route path="shoots/:id" element={<ShootDetailPage />} />
          <Route path="deliverables" element={<DeliverablesPage />} />
          {/* GT5: behind the same guard, the API refuses it without a token */}
          <Route path="review" element={<ReviewPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;