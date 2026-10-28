import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, Bot, Calendar as CalendarIcon, CheckSquare, IdCard, Video } from "lucide-react";

function SidebarLink({ to, icon, text }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
        borderRadius: "10px",
        color: isActive ? "#ffffff" : "#94a3b8",
        background: isActive ? "rgba(47, 128, 237, 0.2)" : "transparent",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "600",
        transition: "all 0.2s ease",
      }}
    >
      <span style={{ color: isActive ? "#2f80ed" : "#94a3b8" }}>{icon}</span>
      {text}
    </Link>
  );
}

function Sidebar() {
  return (
    <aside
      style={{
        width: "290px",
        background: "#0d1b2a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 16px",
        boxShadow: "6px 0 20px rgba(0, 0, 0, 0.15)",
        zIndex: 10,
      }}
    >
      <div>
        <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "22px", paddingLeft: "12px", color: "#f8fafc", letterSpacing: "2.5px", textTransform: "uppercase" }}>
          Noesis Hub
        </h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />} text="Dashboard" />
          <SidebarLink to="/profile" icon={<IdCard size={18} />} text="Η κάρτα μου" />
          <SidebarLink to="/courses" icon={<BookOpen size={18} />} text="Μαθήματα" />
          <SidebarLink to="/study-sessions" icon={<Video size={18} />} text="Study Sessions" />
          <SidebarLink to="/ai-tutor" icon={<Bot size={18} />} text="AI Tutor" />
          <SidebarLink to="/calendar" icon={<CalendarIcon size={18} />} text="Ημερολόγιο" />
          <SidebarLink to="/quizzes" icon={<CheckSquare size={18} />} text="Quizzes" />
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;