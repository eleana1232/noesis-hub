import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Quiz() {
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="page-header">
        <p className="page-kicker">{t.quizKicker}</p>
        <h1>{t.quizTitle}</h1>
        <p>{t.quizDesc}</p>
      </div>

      <div className="dashboard-card" style={{ maxWidth: "800px", padding: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ background: "rgba(47, 128, 237, 0.1)", padding: "12px", borderRadius: "10px", color: "#2f80ed" }}>
            <Sparkles size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: "20px", color: "var(--text-main)", margin: "0 0 4px 0" }}>{t.startQuizCard}</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", margin: 0 }}>{t.selectCoursePrompt}</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "10px" }}>
          <button className="continue-actions" style={{ background: "#2f80ed", color: "white", border: "none", padding: "12px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
            Web Development <ArrowRight size={16} />
          </button>
          <button className="continue-actions" style={{ background: "rgba(47, 128, 237, 0.1)", color: "#2f80ed", border: "1px solid rgba(47, 128, 237, 0.3)", padding: "12px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
            Databases
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export default Quiz;