import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Courses from "../pages/Courses";
import StudySessions from "../pages/StudySessions";
import Calendar from "../pages/Calendar";
import Quiz from "../pages/Quiz";
import AITutor from "../pages/AITutor";
import Submissions from "../pages/Submissions";
import { LayoutDashboard, BookOpen, Calendar as CalendarIcon, CheckSquare, Video, Upload, IdCard, User } from "lucide-react";

// Layout για τις εσωτερικές σελίδες (εμφανίζει Sidebar και περιεχόμενο)
function MainLayout() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Sidebar */}
      <aside style={{ width: "290px", background: "#0d1b2a", color: "white", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "24px 16px" }}>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "22px", paddingLeft: "12px", color: "#f8fafc", letterSpacing: "2.5px", textTransform: "uppercase" }}>
            Noesis Hub
          </h2>
          <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />} text="Dashboard" />
            <SidebarLink to="/courses" icon={<BookOpen size={18} />} text={lang === "el" ? "Μαθήματα" : "Courses"} />
            <SidebarLink to="/study-sessions" icon={<Video size={18} />} text="Study Sessions" />
            <SidebarLink to="/ai-tutor" icon={<span>🦉</span>} text="AI Tutor" />
            <SidebarLink to="/calendar" icon={<CalendarIcon size={18} />} text={lang === "el" ? "Ημερολόγιο" : "Calendar"} />
            <SidebarLink to="/submissions" icon={<Upload size={18} />} text={lang === "el" ? "Υποβολές" : "Submissions"} />
            <SidebarLink to="/quizzes" icon={<CheckSquare size={18} />} text="Quizzes" />
          </nav>
        </div>

        <button
          onClick={toggleLanguage}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "8px",
            padding: "10px 12px",
            cursor: "pointer",
            color: "white",
            fontSize: "13px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span>🌐</span> {lang === "el" ? "Ελληνικά" : "English"}
        </button>
      </aside>

      {/* Main Content Routes */}
      <main style={{ flex: 1, overflowY: "auto", background: "#f8fafc" }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/study-sessions" element={<StudySessions />} />
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/quizzes" element={<Quiz />} />
        </Routes>
      </main>
    </div>
  );
}

function SidebarLink({ to, icon, text }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "10px", color: isActive ? "#ffffff" : "#94a3b8", background: isActive ? "rgba(47, 128, 237, 0.2)" : "transparent", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
      <span style={{ color: isActive ? "#2f80ed" : "#94a3b8" }}>{icon}</span>
      {text}
    </Link>
  );
}

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Η αρχική διαδρομή φορτώνει αποκλειστικά το Login */}
        <Route path="/" element={<Login />} />
        
        {/* Όλες οι υπόλοιπες διαδρομές φορτώνουν το MainLayout με το Sidebar */}
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;