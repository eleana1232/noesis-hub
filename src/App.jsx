import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import StudySessions from "./pages/StudySessions";
import Calendar from "./pages/Calendar";
import Quiz from "./pages/Quiz";
import AITutor from "./pages/AITutor";
import Submissions from "./pages/Submissions";
import { LayoutDashboard, BookOpen, Calendar as CalendarIcon, CheckSquare, Mail, GraduationCap, IdCard, User, Video, Upload } from "lucide-react";

function LayoutWithSidebar() {
  const location = useLocation();
  const { lang, toggleLanguage } = useLanguage();

  const [studentName, setStudentName] = useState("Ελεάνα");
  const [studentEmail, setStudentEmail] = useState("eleana@noesis.edu");
  const [studentRole, setStudentRole] = useState("Φοιτήτρια Πληροφορικής");

  // Αν βρισκόμαστε στο root, δείχνουμε μόνο το Login χωρίς sidebar
  if (location.pathname === "/") {
    return <Login />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      
      {/* Sidebar */}
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

          {/* Student Profile Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #a855f7 0%, #6b21a8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxShadow: "0 0 15px rgba(168, 85, 247, 0.6)",
                flexShrink: 0,
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <User size={22} />
            </div>

            <div style={{ overflow: "hidden", flex: 1 }}>
              <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff", margin: "0 0 2px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {studentName}
              </h4>
              <p style={{ fontSize: "11px", color: "#cbd5e1", margin: "0 0 2px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "flex", alignItems: "center", gap: "4px" }}>
                <Mail size={10} color="#c084fc" /> {studentEmail}
              </p>
              <p style={{ fontSize: "10px", color: "#d8b4fe", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "flex", alignItems: "center", gap: "4px" }}>
                <GraduationCap size={10} color="#c084fc" /> {studentRole}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />} text="Dashboard" />
            <SidebarLink to="/profile" icon={<IdCard size={18} />} text={lang === "el" ? "Η κάρτα μου" : "My Card"} />
            <SidebarLink to="/courses" icon={<BookOpen size={18} />} text={lang === "el" ? "Μαθήματα" : "Courses"} />
            <SidebarLink to="/study-sessions" icon={<Video size={18} />} text="Study Sessions" />
            <SidebarLink to="/ai-tutor" icon={<span>🦉</span>} text="AI Tutor" />
            <SidebarLink to="/calendar" icon={<CalendarIcon size={18} />} text={lang === "el" ? "Ημερολόγιο" : "Calendar"} />
            <SidebarLink to="/submissions" icon={<Upload size={18} />} text={lang === "el" ? "Υποβολές" : "Submissions"} />
            <SidebarLink to="/quizzes" icon={<CheckSquare size={18} />} text="Quizzes" />
          </nav>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px" }}>
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
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: "auto", background: "#f8fafc" }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard studentName={studentName} />} />
          <Route 
            path="/profile" 
            element={
              <ProfilePage 
                studentName={studentName} 
                setStudentName={setStudentName} 
                studentEmail={studentEmail} 
                setStudentEmail={setStudentEmail} 
                studentRole={studentRole} 
                setStudentRole={setStudentRole} 
                lang={lang} 
              />
            } 
          />
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

function ProfilePage({ studentName, setStudentName, studentEmail, setStudentEmail, studentRole, setStudentRole, lang }) {
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ padding: "32px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
        {lang === "el" ? "Η κάρτα μου & Στοιχεία Φοιτητή" : "My Student Card & Profile"}
      </h1>
      <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
        {lang === "el" ? "Διαχειρίσου τις προσωπικές σου πληροφορίες και την ακαδημαϊκή σου ταυτότητα." : "Manage your personal info and academic identity."}
      </p>

      <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #eaeaea", padding: "28px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px", borderBottom: "1px solid #f1f5f9", paddingBottom: "20px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, #a855f7 0%, #6b21a8 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)" }}>
            <User size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", margin: "0 0 4px 0" }}>{studentName}</h3>
            <p style={{ fontSize: "13px", color: "#9333ea", fontWeight: "600", margin: 0 }}>{studentRole}</p>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>
              {lang === "el" ? "Ονοματεπώνυμο" : "Full Name"}
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>
              {lang === "el" ? "Email Φοιτητή" : "Student Email"}
            </label>
            <input
              type="email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>
              {lang === "el" ? "Ιδιότητα / Τμήμα" : "Role / Department"}
            </label>
            <input
              type="text"
              value={studentRole}
              onChange={(e) => setStudentRole(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
            <button
              type="submit"
              style={{ background: "#9333ea", color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
            >
              {lang === "el" ? "Αποθήκευση Αλλαγών" : "Save Changes"}
            </button>
            {saved && (
              <span style={{ color: "#27ae60", fontSize: "13px", fontWeight: "600" }}>
                ✓ {lang === "el" ? "Αποθηκεύτηκε επιτυχώς!" : "Saved successfully!"}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

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

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<LayoutWithSidebar />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;