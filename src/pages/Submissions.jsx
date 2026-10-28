import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Submissions() {
  const { lang } = useLanguage();
  const [selectedCourse, setSelectedCourse] = useState("Web Systems (React)");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const courses = [
    "Web Systems (React)",
    "Databases & AI",
    "Software Architecture",
    "Interaction/UX Design",
    "Distributed Systems"
  ];

  const [submissionsList, setSubmissionsList] = useState([
    { id: 1, course: "Web Systems (React)", filename: "React_Project_Final_v1.zip", date: "2026-09-25", status: "Submitted" },
    { id: 2, course: "Databases & AI", filename: "SQL_Schema_Draft.pdf", date: "2026-09-20", status: "Reviewed" }
  ]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsSubmitting(true);
    setSuccessMessage(false);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(true);
      setSubmissionsList(prev => [
        {
          id: Date.now(),
          course: selectedCourse,
          filename: selectedFile.name,
          date: new Date().toISOString().split('T')[0],
          status: "Submitted"
        },
        ...prev
      ]);
      setSelectedFile(null);
    }, 1200);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ padding: "24px", maxWidth: "950px", margin: "0 auto" }}
    >
      <div style={{ marginBottom: "24px", textAlign: "left" }}>
        <p style={{ fontSize: "12px", color: "#2f80ed", fontWeight: "600", textTransform: "uppercase", marginBottom: "4px" }}>
          {lang === "el" ? "Διαχείριση Εργασιών" : "Assignment Hub"}
        </p>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b", margin: "0 0 6px 0" }}>
          {lang === "el" ? "Υποβολή Εργασιών" : "Assignment Submissions"}
        </h1>
        <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
          {lang === "el" 
            ? "Ανεβάστε τα αρχεία των εργασιών σας για τα 5 μαθήματα του εξαμήνου." 
            : "Upload your coursework files and track your academic submissions."}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "20px" }}>
        
        {/* Upload Box */}
        <div style={{ background: "#ffffff", padding: "22px", borderRadius: "16px", border: "1px solid #eaeaea", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", marginBottom: "16px" }}>
            {lang === "el" ? "Νέα Υποβολή" : "New Submission"}
          </h3>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", display: "block", marginBottom: "6px" }}>
                {lang === "el" ? "Επιλογή Μαθήματος" : "Select Course"}
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "12px", background: "white", boxSizing: "border-box" }}
              >
                {courses.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", display: "block", marginBottom: "6px" }}>
                {lang === "el" ? "Αρχείο Εργασίας (ZIP, PDF, DOCX)" : "Upload File"}
              </label>
              <label style={{ border: "2px dashed #cbd5e1", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "#f8fafc", transition: "border 0.2s" }}>
                <Upload size={24} color="#2f80ed" style={{ marginBottom: "6px" }} />
                <span style={{ fontSize: "12px", fontWeight: "600", color: "#334155" }}>
                  {selectedFile ? selectedFile.name : (lang === "el" ? "Κάντε κλικ ή σύρετε αρχείο εδώ" : "Click or drag file here")}
                </span>
                <span style={{ fontSize: "10px", color: "#94a3b8", marginTop: "2px" }}>Max size: 25MB</span>
                <input type="file" onChange={handleFileChange} style={{ display: "none" }} />
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting || !selectedFile}
              style={{
                background: selectedFile ? "#2f80ed" : "#94a3b8",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: selectedFile ? "pointer" : "not-allowed",
                marginTop: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              {isSubmitting ? (lang === "el" ? "Γίνεται αποστολή..." : "Submitting...") : (lang === "el" ? "Οριστική Υποβολή" : "Submit Assignment")}
            </motion.button>
          </form>

          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(39, 174, 96, 0.1)", color: "#27ae60", padding: "10px 14px", borderRadius: "8px", marginTop: "12px", fontSize: "12px", fontWeight: "600" }}
              >
                <CheckCircle2 size={16} />
                <span>{lang === "el" ? "Η εργασία υποβλήθηκε με επιτυχία!" : "Assignment submitted successfully!"}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* History / Recent Submissions */}
        <div style={{ background: "#ffffff", padding: "22px", borderRadius: "16px", border: "1px solid #eaeaea", boxShadow: "0 4px 12px rgba(0,0,0,0.02)", textAlign: "left" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", marginBottom: "16px" }}>
            {lang === "el" ? "Ιστορικό Υποβολών" : "Submission History"}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {submissionsList.map((sub) => (
              <div key={sub.id} style={{ padding: "12px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#1e293b" }}>{sub.course}</span>
                  <span style={{ fontSize: "10px", background: sub.status === "Reviewed" ? "rgba(39, 174, 96, 0.1)" : "rgba(47, 128, 237, 0.1)", color: sub.status === "Reviewed" ? "#27ae60" : "#2f80ed", padding: "2px 6px", borderRadius: "4px", fontWeight: "600" }}>
                    {sub.status}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#64748b" }}>
                  <FileText size={14} color="#2f80ed" />
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub.filename}</span>
                </div>
                <span style={{ fontSize: "10px", color: "#94a3b8" }}>{sub.date}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}

export default Submissions;