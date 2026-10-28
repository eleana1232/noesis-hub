import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Login() {
  const { lang, toggleLanguage } = useLanguage();
  const [email, setEmail] = useState("eleana@noesis.edu");
  const [password, setPassword] = useState("********");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #4a154b 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "8px",
          padding: "8px 14px",
          color: "white",
          fontSize: "13px",
          fontWeight: "600",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          backdropFilter: "blur(5px)"
        }}
      >
        <span>🌐</span> {lang === "el" ? "English" : "Ελληνικά"}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "20px",
          padding: "40px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          color: "white",
          textAlign: "left"
        }}
      >
        {/* Logo / Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #9333ea 0%, #6b21a8 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px auto",
            boxShadow: "0 0 20px rgba(147, 51, 234, 0.6)",
            fontSize: "28px"
          }}>
            🦉
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 6px 0", letterSpacing: "1px" }}>
            Noesis Hub
          </h1>
          <p style={{ fontSize: "13px", color: "#cbd5e1", margin: 0 }}>
            {lang === "el" ? "Σύγχρονη πλατφόρμα e-class με AI Tutors" : "Modern E-class Platform with AI Tutors"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#cbd5e1", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {lang === "el" ? "Email Φοιτητή" : "Student Email"}
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Mail size={16} color="#94a3b8" style={{ position: "absolute", left: "14px" }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 42px",
                  background: "rgba(255, 255, 255, 0.07)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#cbd5e1", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {lang === "el" ? "Κωδικός Πρόσβασης" : "Password"}
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Lock size={16} color="#94a3b8" style={{ position: "absolute", left: "14px" }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 42px",
                  background: "rgba(255, 255, 255, 0.07)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={{
              background: "linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "14px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 4px 15px rgba(147, 51, 234, 0.4)",
              marginTop: "8px"
            }}
          >
            {lang === "el" ? "Σύνδεση στην Πλατφόρμα" : "Sign In to Platform"} <ArrowRight size={16} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
