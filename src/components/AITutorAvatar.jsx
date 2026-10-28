import { motion } from "framer-motion";
import { User, Glasses } from "lucide-react";

function AITutorAvatar({ mode = "strict", isThinking = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <motion.div
        animate={isThinking ? { scale: [1, 1.06, 1], rotate: [0, 2, -2, 0] } : { y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: isThinking ? 1 : 3, ease: "easeInOut" }}
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: mode === "strict" ? "linear-gradient(135deg, #0f2742 0%, #2f80ed 100%)" : "var(--ai-gradient)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          boxShadow: "0 8px 20px rgba(47, 128, 237, 0.25)",
          position: "relative",
        }}
      >
        {/* Ανθρωπάκι με γυαλιά */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <User size={26} />
          <Glasses size={16} style={{ position: "absolute", top: "5px" }} />
        </div>
        
        <span
          style={{
            position: "absolute",
            bottom: "-2px",
            right: "-2px",
            background: mode === "strict" ? "#10b981" : "#f59e0b",
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            border: "2px solid white",
          }}
          title="AI Assistant Active"
        />
      </motion.div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <h4 style={{ margin: 0, fontSize: "16px", color: "var(--sidebar-bg)", fontWeight: "700" }}>
            Noesis AI Guide
          </h4>
        </div>
        <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>
          {isThinking ? "Thinking..." : "Ready to assist with your studies."}
        </p>
      </div>
    </div>
  );
}

export default AITutorAvatar;