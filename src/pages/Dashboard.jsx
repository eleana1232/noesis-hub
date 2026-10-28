import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, AlertTriangle, BookOpen, Megaphone, CheckCircle2, X, Clock, ArrowRight, Sparkles, FileCode } from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard({ studentName }) {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      type: "urgent",
      course: "Web Systems (React)",
      title: "Ακύρωση αυριανής διάλεξης ⚠️",
      message: "Λόγω ασθένειας του διδάσκοντα, η αυριανή διάλεξη αναβάλλεται. Η ύλη θα καλυφθεί κανονικά στην επόμενη συνάντηση.",
      date: "Σήμερα",
      professor: "Dr. A. Karagiannis"
    },
    {
      id: 2,
      type: "news",
      course: "Databases & AI",
      title: "Νέο εκπαιδευτικό υλικό PostgreSQL 📚",
      message: "Έχουν αναρτηθεί τα νέα παραδείγματα κώδικα και τα διαγράμματα ERD για την επόμενη εργαστηριακή άσκηση.",
      date: "Χθες",
      professor: "Dr. M. Ioannou"
    },
    {
      id: 3,
      type: "news",
      course: "Interaction/UX Design",
      title: "Υπενθύμιση ομάδων Capstone Project 👥",
      message: "Παρακαλώ οριστικοποιήστε τα μέλη των ομάδων σας για το AI Tutor project έως την Παρασκευή.",
      date: "2 ημέρες πριν",
      professor: "Prof. E. Vgenopoulou"
    }
  ]);

  const [activePopup, setActivePopup] = useState(announcements.find(a => a.type === "urgent") || null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ padding: "28px", maxWidth: "1050px", margin: "0 auto", position: "relative" }}
    >
      {/* Welcome Banner */}
      <div style={{ 
        background: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)", 
        borderRadius: "20px", 
        padding: "28px 32px", 
        color: "white", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "28px",
        boxShadow: "0 10px 25px rgba(13, 27, 42, 0.15)"
      }}>
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(47, 128, 237, 0.2)", color: "#60a5fa", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", marginBottom: "10px" }}>
            ✨ Noesis Hub Portal
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 6px 0" }}>
            Καλώς όρισες, {studentName}! 👋
          </h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, maxWidth: "550px" }}>
            Συνολική εικόνα εξαμήνου, προθεσμιών και ακαδημαϊκών ανακοινώσεων.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/submissions" style={{ background: "#2f80ed", color: "white", padding: "10px 16px", borderRadius: "10px", textDecoration: "none", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" }}>
            Υποβολή Εργασίας <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px", textAlign: "left" }}>
        <div style={{ background: "white", padding: "18px", borderRadius: "16px", border: "1px solid #eaeaea", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <p style={{ fontSize: "11px", color: "#64748b", fontWeight: "600", margin: "0 0 6px 0" }}>📚 ΕΝΕΡΓΑ ΜΑΘΗΜΑΤΑ</p>
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b", margin: 0 }}>5 Μαθήματα</h3>
          <span style={{ fontSize: "10px", color: "#27ae60", fontWeight: "600" }}>✓ Τρέχον εξάμηνο</span>
        </div>
        <div style={{ background: "white", padding: "18px", borderRadius: "16px", border: "1px solid #eaeaea", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <p style={{ fontSize: "11px", color: "#64748b", fontWeight: "600", margin: "0 0 6px 0" }}>⏰ ΠΡΟΘΕΣΜΙΕΣ</p>
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#2f80ed", margin: 0 }}>2 Εκκρεμείς</h3>
          <span style={{ fontSize: "10px", color: "#e67e22", fontWeight: "600" }}>Επερχόμενα deadlines</span>
        </div>
        <div style={{ background: "white", padding: "18px", borderRadius: "16px", border: "1px solid #eaeaea", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <p style={{ fontSize: "11px", color: "#64748b", fontWeight: "600", margin: "0 0 6px 0" }}>🤖 AI TUTOR (ΣΟΦΟΥΛΑ)</p>
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#9333ea", margin: 0 }}>Διαθέσιμη</h3>
          <span style={{ fontSize: "10px", color: "#9333ea", fontWeight: "600" }}>Υποστήριξη μελέτης</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "20px", textAlign: "left" }}>
        
        {/* Left: Professor Announcements */}
        <div style={{ background: "#ffffff", padding: "22px", borderRadius: "16px", border: "1px solid #eaeaea", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Megaphone size={20} color="#2f80ed" />
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                📢 Ανακοινώσεις & Ενημερώσεις
              </h3>
            </div>
            <span style={{ fontSize: "11px", background: "#f1f5f9", color: "#64748b", padding: "4px 8px", borderRadius: "6px", fontWeight: "600" }}>
              {announcements.length} Νέες
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {announcements.map((item) => {
              const isUrgent = item.type === "urgent";
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => isUrgent && setActivePopup(item)}
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: isUrgent ? "rgba(239, 68, 68, 0.04)" : "#f8fafc",
                    border: isUrgent ? "1px solid rgba(239, 68, 68, 0.2)" : "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    cursor: isUrgent ? "pointer" : "default"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {isUrgent ? (
                        <AlertTriangle size={16} color="#ef4444" />
                      ) : (
                        <BookOpen size={16} color="#2f80ed" />
                      )}
                      <span style={{ fontSize: "12px", fontWeight: "700", color: isUrgent ? "#dc2626" : "#1e293b" }}>
                        {item.course} — {item.title}
                      </span>
                    </div>
                    <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600" }}>
                      {item.date}
                    </span>
                  </div>

                  <p style={{ fontSize: "12px", color: "#475569", margin: 0, lineHeight: "1.5" }}>
                    {item.message}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px", paddingTop: "8px", borderTop: "1px dashed rgba(0,0,0,0.06)" }}>
                    <span style={{ fontSize: "11px", fontWeight: "600", color: "#64748b" }}>
                      👤 {item.professor}
                    </span>
                    <span style={{ 
                      fontSize: "10px", 
                      fontWeight: "600", 
                      padding: "2px 6px", 
                      borderRadius: "4px", 
                      background: isUrgent ? "rgba(239, 68, 68, 0.1)" : "rgba(47, 128, 237, 0.1)",
                      color: isUrgent ? "#ef4444" : "#2f80ed"
                    }}>
                      {isUrgent ? "⚠️ Έκτακτη Ειδοποίηση" : "ℹ️ Ενημέρωση"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Tools */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid #eaeaea", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b", margin: "0 0 12px 0" }}>
              ⚡ Γρήγορη Πρόσβαση
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link to="/ai-tutor" style={{ padding: "10px 12px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", textDecoration: "none", color: "#1e293b", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={16} color="#9333ea" /> AI Tutor (Σοφούλα)
              </Link>
              <Link to="/calendar" style={{ padding: "10px 12px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", textDecoration: "none", color: "#1e293b", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={16} color="#2f80ed" /> Ακαδημαϊκό Ημερολόγιο
              </Link>
              <Link to="/quizzes" style={{ padding: "10px 12px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", textDecoration: "none", color: "#1e293b", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <FileCode size={16} color="#27ae60" /> Quizzes & Αξιολογήσεις
              </Link>
            </div>
          </div>

          <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid #eaeaea", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b", margin: "0 0 10px 0" }}>
              💡 Σημείωση Ημέρας
            </h3>
            <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: "1.5" }}>
              "Η τεχνολογία συνδυάζει την επιστήμη με το UX. Συνέχισε την εξαιρετική δουλειά για το capstone project σου!"
            </p>
          </div>

        </div>

      </div>

      {/* Pop-up Modal για Έκτακτες Ειδοποιήσεις */}
      <AnimatePresence>
        {activePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              style={{
                background: "white",
                padding: "28px",
                borderRadius: "18px",
                width: "400px",
                textAlign: "left",
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                border: "1px solid rgba(239, 68, 68, 0.2)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(239, 68, 68, 0.1)", padding: "6px 10px", borderRadius: "8px", color: "#ef4444" }}>
                  <AlertTriangle size={18} />
                  <span style={{ fontSize: "12px", fontWeight: "700" }}>Έκτακτη Ανακοίνωση ⚠️</span>
                </div>
                <button
                  onClick={() => setActivePopup(null)}
                  style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b" }}
                >
                  <X size={16} />
                </button>
              </div>

              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: "0 0 6px 0" }}>
                {activePopup.course}
              </h3>
              <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#dc2626", margin: "0 0 12px 0" }}>
                {activePopup.title}
              </h4>

              <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", margin: "0 0 20px 0", background: "#f8fafc", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                {activePopup.message}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>
                  👤 {activePopup.professor}
                </span>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActivePopup(null)}
                  style={{ background: "#2f80ed", color: "white", border: "none", padding: "8px 20px", borderRadius: "8px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                >
                  OK
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default Dashboard;