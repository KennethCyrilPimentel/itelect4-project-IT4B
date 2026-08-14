// src/App.tsx -- REPLACE the whole file (final version)
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ShootsPage from "./pages/ShootsPage";
import ShootDetailPage from "./pages/ShootDetailPage";
import LoginPage from "./pages/LoginPage";
import DeliverablesPage from "./pages/DeliverablesPage";
import NotFoundPage from "./pages/NotFoundPage"; // <-- NEW

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="shoots" element={<ShootsPage />} />
        <Route path="shoots/:id" element={<ShootDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="deliverables" element={<DeliverablesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} /> {/* <-- NEW */}
      </Route>
    </Routes>
  );
}

export default App;