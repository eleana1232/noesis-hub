import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FileText, Download, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function Courses() {
  const { lang } = useLanguage();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const coursesList = [
    {
      id: 1,
      titleEl: "Αρχιτεκτονική React & Διαχείριση Κατάστασης",
      titleEn: "Advanced React Architecture & State Management",
      code: "CS-301",
      professor: "Dr. Nikos Vlachos",
      progress: 75,
      descriptionEl: "Βαθιά ανάλυση σε custom hooks, βελτιστοποίηση απόδοσης context και κλιμακούμενες δομές στοιχείων.",
      descriptionEn: "Deep dive into custom hooks, context performance optimization, and scalable component structures.",
      files: [
        { name: lang === "el" ? "React_Hooks_Advanced.pdf" : "React_Hooks_Advanced.pdf", size: "3.2 MB" },
        { name: lang === "el" ? "State_Management_Patterns.docx" : "State_Management_Patterns.docx", size: "1.5 MB" }
      ]
    },
    {
      id: 2,
      titleEl: "Ευρετηρίαση PostgreSQL & Βελτιστοποίηση",
      titleEn: "PostgreSQL Indexing & Query Optimization",
      code: "CS-204",
      professor: "Dr. Maria Papadopoulou",
      progress: 60,
      descriptionEl: "Ανάλυση σχεδίων εκτέλεσης, B-tree indexes, στρατηγικές join και αποτελεσματικός χειρισμός περιορισμών.",
      descriptionEn: "Analyzing execution plans, B-tree indexes, join strategies, and handling relational constraints efficiently.",
      files: [
        { name: lang === "el" ? "PostgreSQL_Indexing_Guide.pdf" : "PostgreSQL_Indexing_Guide.pdf", size: "4.1 MB" },
        { name: lang === "el" ? "SQL_Execution_Plans.pdf" : "SQL_Execution_Plans.pdf", size: "900 KB" }
      ]
    },
    {
      id: 3,
      titleEl: "Σχεδίαση Αλληλεπίδρασης & AI Agents",
      titleEn: "Interaction Design & Conversational Agents",
      code: "UX-402",
      professor: "Dr. Eleni Dimitriou",
      progress: 50,
      descriptionEl: "Συνδυασμός frameworks εμπειρίας χρήστη με LLM guardrails, διαχείριση latency και διαισθητικό UI.",
      descriptionEn: "Combining user experience frameworks with LLM guardrails, latency handling, and intuitive conversational UI.",
      files: [
        { name: lang === "el" ? "UX_Conversational_UI.pdf" : "UX_Conversational_UI.pdf", size: "2.8 MB" },
        { name: lang === "el" ? "AI_Guardrails_Case_Study.docx" : "AI_Guardrails_Case_Study.docx", size: "1.9 MB" }
      ]
    },
    {
      id: 4,
      titleEl: "Λειτουργικά Συστήματα & Διεργασίες DNS",
      titleEn: "Operating Systems, Processes & DNS Resolution",
      code: "CS-305",
      professor: "Dr. Giorgos Georgiou",
      progress: 40,
      descriptionEl: "Κατανόηση συγχρονισμού διεργασιών, διαχείρισης μνήμης, τοπικών δικτύων και κύκλου ζωής DNS.",
      descriptionEn: "Understanding process synchronization, memory management, local network configurations, and DNS lookup lifecycles.",
      files: [
        { name: lang === "el" ? "OS_Processes_Sync.pdf" : "OS_Processes_Sync.pdf", size: "3.5 MB" },
        { name: lang === "el" ? "DNS_Lifecycle_Notes.pdf" : "DNS_Lifecycle_Notes.pdf", size: "1.2 MB" }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ padding: "32px", maxWidth: "1100px", margin: "0 auto" }}
    >
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
          {lang === "el" ? "Τα Μαθήματά μου" : "My Courses"}
        </h1>
        <p style={{ color: "#64748b", fontSize: "14px" }}>
          {lang === "el" ? "Παρακολούθησε την πρόοδο των μαθημάτων σου και κατέβασε το εκπαιδευτικό υλικό." : "Track your course progress and download learning materials."}
        </p>
      </div>

      {selectedCourse ? (
        <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #eaeaea", padding: "28px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <button
            onClick={() => setSelectedCourse(null)}
            style={{ background: "transparent", border: "none", color: "#9333ea", fontSize: "13px", fontWeight: "600", cursor: "pointer", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}
          >
            ← {lang === "el" ? "Επιστροφή στα Μαθήματα" : "Back to Courses"}
          </button>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div>
              <span style={{ background: "rgba(147, 51, 234, 0.1)", color: "#9333ea", fontSize: "11px", fontWeight: "700", padding: "4px 8px", borderRadius: "6px" }}>
                {selectedCourse.code}
              </span>
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b", margin: "8px 0 4px 0" }}>
                {lang === "el" ? selectedCourse.titleEl : selectedCourse.titleEn}
              </h2>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                {lang === "el" ? "Διδάσκων:" : "Instructor:"} {selectedCourse.professor}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#9333ea" }}>{selectedCourse.progress}% {lang === "el" ? "Ολοκληρωμένο" : "Completed"}</span>
              <div style={{ width: "120px", height: "8px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden", marginTop: "6px" }}>
                <div style={{ width: `${selectedCourse.progress}%`, height: "100%", background: "#9333ea", borderRadius: "4px" }}></div>
              </div>
            </div>
          </div>

          <p style={{ fontSize: "14px", color: "#334155", lineHeight: "1.5", marginBottom: "24px" }}>
            {lang === "el" ? selectedCourse.descriptionEl : selectedCourse.descriptionEn}
          </p>

          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginBottom: "12px" }}>
            {lang === "el" ? "Υλικό & Αρχεία Μαθήματος" : "Course Materials & Files"}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {selectedCourse.files.map((file, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <FileText size={18} color="#9333ea" />
                  <div>
                    <h4 style={{ fontSize: "13px", fontWeight: "600", color: "#1e293b", margin: 0 }}>{file.name}</h4>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>{file.size}</span>
                  </div>
                </div>
                <button
                  onClick={() => alert(lang === "el" ? `Λήψη αρχείου: ${file.name}` : `Downloading file: ${file.name}`)}
                  style={{ background: "#9333ea", color: "white", border: "none", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <Download size={14} /> {lang === "el" ? "Λήψη" : "Download"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {coursesList.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #eaeaea", padding: "24px", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.02)", transition: "all 0.2s ease", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ background: "rgba(147, 51, 234, 0.1)", color: "#9333ea", fontSize: "11px", fontWeight: "700", padding: "4px 8px", borderRadius: "6px" }}>
                    {course.code}
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "#64748b" }}>{course.progress}%</span>
                </div>

                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginBottom: "6px" }}>
                  {lang === "el" ? course.titleEl : course.titleEn}
                </h3>
                <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0", lineHeight: "1.4" }}>
                  {lang === "el" ? course.descriptionEl : course.descriptionEn}
                </p>
              </div>

              <div>
                <div style={{ width: "100%", height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden", marginBottom: "16px" }}>
                  <div style={{ width: `${course.progress}%`, height: "100%", background: "#9333ea", borderRadius: "3px" }}></div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>{course.professor}</span>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "#9333ea", display: "flex", alignItems: "center", gap: "4px" }}>
                    {lang === "el" ? "Προβολή" : "View"} <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Courses;