import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, CheckCircle, X, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const studySessions = [
  {
    id: 1,
    title: "Advanced React Architecture & State Management",
    course: "Web Development",
    code: "CS-301",
    duration: "45 mins",
    tutor: "Dr. Nikos Vlachos",
    description: "Deep dive into custom hooks, context performance optimization, and scalable component structures.",
    sections: [
      { title: "1. Custom Hooks Best Practices", duration: "10 mins" },
      { title: "2. Context API vs Redux Performance", duration: "15 mins" },
      { title: "3. Scalable Component Folder Structures", duration: "20 mins" }
    ]
  },
  {
    id: 2,
    title: "PostgreSQL Indexing & Query Optimization",
    course: "Databases",
    code: "CS-204",
    duration: "60 mins",
    tutor: "Dr. Maria Papadopoulou",
    description: "Analyzing execution plans, B-tree indexes, join strategies, and handling relational constraints efficiently.",
    sections: [
      { title: "1. Understanding Execution Plans (EXPLAIN)", duration: "15 mins" },
      { title: "2. B-Tree & Hash Indexes Strategies", duration: "20 mins" },
      { title: "3. Join Performance & Constraints", duration: "25 mins" }
    ]
  },
  {
    id: 3,
    title: "Interaction Design & Conversational Agents",
    course: "Abstract Interaction Methodologies",
    code: "UX-402",
    duration: "50 mins",
    tutor: "Dr. Eleni Dimitriou",
    description: "Combining user experience frameworks with LLM guardrails, latency handling, and intuitive conversational UI.",
    sections: [
      { title: "1. UX Frameworks for LLM Interfaces", duration: "15 mins" },
      { title: "2. Handling Latency & Streaming UI", duration: "15 mins" },
      { title: "3. Conversational Guardrails & Fallbacks", duration: "20 mins" }
    ]
  },
  {
    id: 4,
    title: "Operating Systems, Processes & DNS Resolution",
    course: "Systems & Network Architecture",
    code: "CS-305",
    duration: "50 mins",
    tutor: "Dr. Giorgos Georgiou",
    description: "Understanding process synchronization, memory management, local network configurations, and DNS lookup lifecycles.",
    sections: [
      { title: "1. Process Synchronization & Mutexes", duration: "15 mins" },
      { title: "2. Memory Management & Paging", duration: "15 mins" },
      { title: "3. DNS Lookup Lifecycles & Configs", duration: "20 mins" }
    ]
  },
];

function StudySessions() {
  const { lang } = useLanguage();
  const [activeSession, setActiveSession] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  
  const tutorName = lang === "el" ? "Σοφούλα" : "Sophia";
  const initialGreeting = lang === "el" 
    ? `Γεια σου Ελεάνα! Είμαι η ${tutorName}. Διάλεξε ενότητα ή ρώτησε με ό,τι απορία έχεις για το μάθημα!` 
    : `Hello Eleana! I am ${tutorName}. Choose a section or ask me any questions about the course!`;

  const [messages, setMessages] = useState([
    { sender: "bot", text: initialGreeting }
  ]);
  const [inputVal, setInputVal] = useState("");

  // Smart function with academic restrictions and clickable source links
  const generateSmartReply = (question) => {
    const q = question.toLowerCase();

    if (q.includes("answer") || q.includes("απαντ") || q.includes("δωσε") || q.includes("give me")) {
      return lang === "el"
        ? `⚠️ [Academic Restriction]: Ως AI Tutor, απαγορεύεται να σου δώσω έτοιμες απαντήσεις. Σύμφωνα με την ακαδημαϊκή μεθοδολογία του μαθήματος "${activeSession?.title}", συμβουλεύσου την επίσημη βιβλιογραφία και τα IEEE/ACM papers εδώ: https://ieeexplore.ieee.org`
        : `⚠️ [Academic Restriction]: As an AI Tutor, I am restricted from giving direct answers. Per the academic standards of "${activeSession?.title}", please consult the official literature and IEEE/ACM papers here: https://ieeexplore.ieee.org`;
    }

    if (q.includes("let's go") || q.includes("παμε") || q.includes("ναι") || q.includes("yes") || q.includes("ετοιμη") || q.includes("ready")) {
      return lang === "el"
        ? `Εξαιρετικά! Ας ξεκινήσουμε την πρώτη ενότητα. Με βάση τα πρότυπα του μαθήματος "${activeSession?.title}", ποια θεωρείς ότι είναι η βασική πρόκληση;`
        : `Excellent! Let's begin the first module. Based on the academic standards of "${activeSession?.title}", what do you consider to be the primary challenge?`;
    }

    if (q.includes("react") || q.includes("hook") || q.includes("state")) {
      return lang === "el"
        ? `Για το React, μελέτησε την επίσημη τεκμηρίωση και το κεφάλαιο για τα Custom Hooks εδώ: https://react.dev/learn/reusing-logic-with-custom-hooks. Ποια διαφορά εντοπίζεις στη διαχείριση state;`
        : `For React, study the official documentation and custom hooks guide here: https://react.dev/learn/reusing-logic-with-custom-hooks. What difference do you notice in state management?`;
    }

    if (q.includes("sql") || q.includes("postgres") || q.includes("database") || q.includes("index")) {
      return lang === "el"
        ? `Σχετικά με τις Βάσεις Δεδομένων, ανέτρεξε στην επίσημη τεκμηρίωση της PostgreSQL για τα B-Tree Indexes εδώ: https://www.postgresql.org/docs/current/indexes-types.html.`
        : `Regarding Databases, refer to the official PostgreSQL documentation on B-Tree Indexes here: https://www.postgresql.org/docs/current/indexes-types.html.`;
    }

    if (q.includes("ux") || q.includes("ui") || q.includes("design") || q.includes("agent")) {
      return lang === "el"
        ? `Στο Interaction Design, μελέτησε τα frameworks του Nielsen Norman Group σχετικά με τα LLM interfaces εδώ: https://www.nngroup.com/articles/ai-ui-ux/.`
        : `In Interaction Design, study the Nielsen Norman Group frameworks on LLM interfaces here: https://www.nngroup.com/articles/ai-ui-ux/.`;
    }

    if (q.includes("os") || q.includes("dns") || q.includes("network") || q.includes("process")) {
      return lang === "el"
        ? `Στα Λειτουργικά και τα Δίκτυα, συμβουλεύσου τα επίσημα πρότυπα IETF RFCs για το DNS lifecycle εδώ: https://datatracker.ietf.org/doc/html/rfc1034.`
        : `In OS and Networks, consult the official IETF RFCs for the DNS lifecycle here: https://datatracker.ietf.org/doc/html/rfc1034.`;
    }

    return lang === "el"
      ? `Αυτό απαιτεί κριτική σκέψη! Σύμφωνα με την ακαδημαϊκή μεθοδολογία του "${activeSession?.title}", ποια βιβλιογραφική πηγή πιστεύεις ότι ταιριάζει καλύτερα εδώ?`
      : `This requires critical thinking! According to the academic methodology of "${activeSession?.title}", which bibliographic source do you think applies best here?`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setInputVal("");

    setTimeout(() => {
      const reply = generateSmartReply(userText);
      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ padding: "32px", maxWidth: "1100px", margin: "0 auto", position: "relative", minHeight: "100vh" }}
    >
      {activeSession ? (
        <div>
          <button
            onClick={() => {
              setActiveSession(null);
              setChatOpen(false);
            }}
            style={{ background: "transparent", border: "none", color: "var(--accent-color, #9333ea)", fontSize: "13px", fontWeight: "600", cursor: "pointer", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}
          >
            ← {lang === "el" ? "Επιστροφή στις Study Sessions" : "Back to Study Sessions"}
          </button>

          <div style={{ background: "var(--card-bg, #ffffff)", color: "var(--text-main, #1e293b)", borderRadius: "16px", border: "1px solid var(--border-color, #eaeaea)", padding: "28px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", marginBottom: "32px" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ background: "rgba(147, 51, 234, 0.1)", color: "#9333ea", fontSize: "11px", fontWeight: "700", padding: "4px 8px", borderRadius: "6px" }}>
                {activeSession.code} - {activeSession.course}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted, #64748b)", fontSize: "13px" }}>
                <Clock size={14} color="#9333ea" /> {activeSession.duration}
              </span>
            </div>

            <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>
              {activeSession.title}
            </h1>
            <p style={{ color: "var(--text-muted, #64748b)", fontSize: "14px", marginBottom: "16px" }}>
              {activeSession.description}
            </p>
            <p style={{ fontSize: "13px", color: "#9333ea", fontWeight: "600", margin: 0 }}>
              {lang === "el" ? "Διδάσκων:" : "Instructor:"} {activeSession.tutor}
            </p>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>
            {lang === "el" ? "Ενότητες Συνεδρίας (Session Modules)" : "Session Modules"}
          </h2>

          <div style={{ display: "grid", gap: "14px", marginBottom: "60px" }}>
            {activeSession.sections.map((sec, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--card-bg, #ffffff)",
                  color: "var(--text-main, #1e293b)",
                  borderRadius: "12px",
                  border: "1px solid var(--border-color, #eaeaea)",
                  padding: "18px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <CheckCircle size={20} color="#9333ea" />
                  <h3 style={{ fontSize: "15px", fontWeight: "600", margin: 0 }}>
                    {sec.title}
                  </h3>
                </div>
                <span style={{ fontSize: "13px", color: "var(--text-muted, #64748b)", background: "var(--bg-subtle, #f8fafc)", padding: "6px 12px", borderRadius: "8px", border: "1px solid var(--border-color, #e2e8f0)" }}>
                  {sec.duration}
                </span>
              </div>
            ))}
          </div>

          {/* Floating AI Tutor Popup (Bottom Right) with Owl Emoji Avatar */}
          <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1000 }}>
            {!chatOpen ? (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => setChatOpen(true)}
                style={{
                  background: "linear-gradient(135deg, #9333ea 0%, #6b21a8 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  padding: "12px 20px",
                  boxShadow: "0 8px 24px rgba(147, 51, 234, 0.4)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "14px",
                  fontWeight: "650"
                }}
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                  🦉
                </div>
                {lang === "el" ? `Ρώτησε τη ${tutorName}` : `Ask ${tutorName}`}
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                style={{
                  background: "var(--card-bg, #ffffff)",
                  color: "var(--text-main, #1e293b)",
                  width: "350px",
                  height: "450px",
                  borderRadius: "16px",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  border: "1px solid var(--border-color, #eaeaea)"
                }}
              >
                {/* Chat Header */}
                <div style={{ padding: "12px 16px", background: "#0d1b2a", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#9333ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                      🦉
                    </div>
                    <div>
                      <h4 style={{ fontSize: "13px", fontWeight: "700", margin: 0 }}>{tutorName} (AI Tutor)</h4>
                      <p style={{ fontSize: "10px", color: "#cbd5e1", margin: 0 }}>{lang === "el" ? "Ενεργή συνεδρία" : "Active session"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setChatOpen(false)}
                    style={{ background: "transparent", border: "none", color: "white", cursor: "pointer", padding: "2px" }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Messages Container */}
                <div style={{ flex: 1, padding: "14px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", background: "var(--bg-subtle, #f8fafc)" }}>
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "flex-start",
                        alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                        maxWidth: "85%"
                      }}
                    >
                      {msg.sender === "bot" && (
                        <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#9333ea", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "12px" }}>
                          🦉
                        </div>
                      )}
                      <div
                        style={{
                          padding: "10px 12px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          lineHeight: "1.4",
                          background: msg.sender === "user" ? "#9333ea" : "var(--card-bg, #ffffff)",
                          color: msg.sender === "user" ? "#ffffff" : "var(--text-main, #1e293b)",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
                          border: msg.sender === "bot" ? "1px solid var(--border-color, #eaeaea)" : "none",
                          wordBreak: "break-word"
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(e);
                  }} 
                  style={{ padding: "10px", background: "var(--card-bg, #ffffff)", borderTop: "1px solid var(--border-color, #eaeaea)", display: "flex", gap: "8px" }}
                >
                  <input
                    type="text"
                    placeholder={lang === "el" ? "Γράψε μήνυμα..." : "Type a message..."}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    style={{ flex: 1, padding: "8px 10px", borderRadius: "8px", border: "1px solid var(--border-color, #cbd5e1)", background: "var(--input-bg, #ffffff)", color: "var(--text-main, #1e293b)", fontSize: "12px", outline: "none" }}
                  />
                  <button
                    type="submit"
                    style={{ background: "#9333ea", color: "white", border: "none", borderRadius: "8px", padding: "0 12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Send size={14} />
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>
              {lang === "el" ? "Συνεδρίες Μελέτης" : "Study Sessions"}
            </h1>
            <p style={{ color: "var(--text-muted, #64748b)", fontSize: "14px" }}>
              {lang === "el" ? "Ενεργές καθοδηγούμενες συνεδρίες και ενότητες επανάληψης με τους AI tutors." : "Active guided sessions and focused revision modules with your integrated AI tutors."}
            </p>
          </div>

          <div style={{ display: "grid", gap: "18px" }}>
            {studySessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                style={{
                  background: "var(--card-bg, #ffffff)",
                  color: "var(--text-main, #1e293b)",
                  borderRadius: "16px",
                  border: "1px solid var(--border-color, #eaeaea)",
                  padding: "24px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ background: "rgba(147, 51, 234, 0.1)", color: "#9333ea", fontSize: "11px", fontWeight: "700", padding: "4px 8px", borderRadius: "6px" }}>
                      {session.code} - {session.course}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted, #64748b)", fontSize: "13px" }}>
                      <Clock size={14} color="#9333ea" /> {session.duration}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "6px" }}>
                    {session.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-muted, #64748b)", margin: "0 0 12px 0", lineHeight: "1.4" }}>
                    {session.description}
                  </p>
                  <p style={{ fontSize: "13px", color: "#9333ea", fontWeight: "600", margin: 0 }}>
                    {lang === "el" ? "Διδάσκων:" : "Instructor:"} {session.tutor}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setActiveSession(session);
                      setMessages([
                        { sender: "bot", text: lang === "el" ? `Γεια σου Ελεάνα! Είμαι η ${tutorName}. Είσαι έτοιμη να ξεκινήσουμε τη συνεδρία για το "${session.title}";` : `Hello Eleana! I am ${tutorName}. Are you ready to start the session for "${session.title}"?` }
                      ]);
                    }}
                    style={{
                      background: "#9333ea",
                      color: "white",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {lang === "el" ? "Έναρξη Συνεδρίας" : "Start Session"} <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default StudySessions;
