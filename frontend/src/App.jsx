import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SkillDetail from "./pages/SkillDetail";
import Discover from "./pages/Discover";
import CreatePath from "./pages/CreatePath";
import AddStep from "./pages/AddStep";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/skill/:id" element={<SkillDetail />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/create" element={<CreatePath />} />
        <Route path="/skill/:id/add-step" element={<AddStep />} />

      </Routes>
    </BrowserRouter>
  );
  function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
}
