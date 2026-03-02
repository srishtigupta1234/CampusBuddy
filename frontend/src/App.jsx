import { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Components/Home";
import About from "./Components/about"; 
import CgpaCalculator from "./Components/CgpaCalculator";
import Resource from "./Components/Resource";
import AcademicResource from "./Components/AcademicResource";
import Branch from "./Components/Branch";
import AttendanceTracker from "./Components/AttendanceTracker";
import SubjectResources from "./Components/SubjectResources";
import ResourceCategory from "./Components/ResourceCategory";
import Scholarship from "./Components/Scholarship";
import Societies from "./Components/Societies";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AuthModal from "./Components/AuthModal";
import ResourcePage from "./Components/Admin/ResourcePage";
import SubjectPage from "./Components/Admin/SubjectPage";
import BranchPage from "./Components/Admin/BranchPage";
import Analytics from "./Components/Admin/Analytics";
import ProtectedRoute from "./Components/ProtectedRoute";
import Profile from "./Components/Profile";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cgpa-calculator" element={<CgpaCalculator />} />
            <Route path="/resources" element={<Resource />} />
            <Route
              path="/academic/:branchCode/:semester/:subjectName/:type"
              element={<ResourceCategory />}
            />
            <Route path="/scholarship" element={<Scholarship />} />
            <Route path="/branch/:id" element={<AcademicResource />} />
            <Route path="/resource/:subjectId" element={<SubjectResources />} />
            <Route path="/branch" element={<Branch />} />
            <Route path="/tracker" element={<AttendanceTracker />} />
            <Route path="/societies" element={<Societies />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="branches" element={<BranchPage />} />
              <Route path="subjects" element={<SubjectPage />} />
              <Route path="resources" element={<ResourcePage />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
