import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/Verification";
import { Toaster } from "sonner";
import CreateTask from "./pages/user/CreateTask";
import RunnerTasks from "./pages/runner/RunnerTasks";
import RunnerActiveTask from "./pages/runner/RunnerActiveTask";
import MyTasks from "./pages/user/MyTasks";
import TaskDetail from "./pages/task/TaskDetail";
import { useAuth } from "./context";
import UserDashboard from "./pages/user/UserDashboard";
import RunnerDashboard from "./pages/runner/RunnerDashboard";
import UserLayout from "./components/layout/UserLayout";
import RunnerLayout from "./components/layout/RunnerLayout";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => {
  const location = useLocation();
  const authRoutes = ["/login", "/register", "/verify-email"];
  const isAuthPage = authRoutes.includes(location.pathname);
  const { isAuthenticated, user, isLoading } = useAuth();

  // Wait for auth to load before routing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B1220] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-white">
          <div className="h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          <span className="text-slate-400 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ScrollToTop />
      {/* Show main navbar only on public pages */}
      {!isAuthPage &&
        !location.pathname.startsWith("/user") &&
        !location.pathname.startsWith("/runner") && <Navbar />}

      <Routes>
        {/* Landing route — decides where user goes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              user?.status === "runner" ? (
                <Navigate to="/runner" />
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <Home />
            )
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* USER MODE */}
        <Route path="/user/*" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="tasks" element={<MyTasks />} />
          <Route path="create" element={<CreateTask />} />
          <Route path="task/:id" element={<TaskDetail />} />
        </Route>

        {/* RUNNER MODE */}
        <Route path="/runner/*" element={<RunnerLayout />}>
          <Route index element={<RunnerDashboard />} />
          <Route path="tasks" element={<RunnerTasks />} />
          <Route path="active" element={<RunnerActiveTask />} />
          <Route path="task/:id" element={<TaskDetail />} />
        </Route>

        {/* Public home */}
        <Route path="/home" element={<Home />} />
      </Routes>

      {!isAuthPage &&
        !location.pathname.startsWith("/user") &&
        !location.pathname.startsWith("/runner") && <Footer />}

      <Toaster richColors />
    </div>
  );
};

export default App;