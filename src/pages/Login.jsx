import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Login() {
  const { lang, toggleLanguage } = useLanguage();
  const [email, setEmail] = useState("eleana@noesis.edu");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [loginError, setLoginError] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);
  const [lockedUntil, setLockedUntil] = useState(() => {
    const saved = Number(sessionStorage.getItem("demoLoginLockedUntil"));
    return saved > Date.now() ? saved : 0;
  });
  const isLocked = lockedUntil > 0;
  const navigate = useNavigate();

  useEffect(() => {
    if (!lockedUntil) return;
    sessionStorage.setItem("demoLoginLockedUntil", String(lockedUntil));
    const timer = setTimeout(() => {
      setLockedUntil(0);
      setFailedAttempts(0);
      setLoginError(false);
      sessionStorage.removeItem("demoLoginLockedUntil");
    }, Math.max(0, lockedUntil - Date.now()));
    return () => clearTimeout(timer);
  }, [lockedUntil]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (isLocked) return;
    // Demo only: replace with server authentication before production use.
    if (email.trim().toLowerCase() !== "eleana@noesis.edu" || password !== "NoesisDemo!2026") {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);
      if (nextAttempts >= 3) setLockedUntil(Date.now() + 60_000);
      setLoginError(true);
      setResetRequested(false);
      return;
    }
    setFailedAttempts(0);
    setLoginError(false);
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
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label htmlFor="student-email" style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#cbd5e1", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {lang === "el" ? "Email Φοιτητή" : "Student Email"}
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Mail size={16} color="#94a3b8" style={{ position: "absolute", left: "14px" }} />
              <input
                type="email"
                id="student-email"
                autoComplete="username"
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
            <label htmlFor="student-password" style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#cbd5e1", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {lang === "el" ? "Κωδικός Πρόσβασης" : "Password"}
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Lock size={16} color="#94a3b8" style={{ position: "absolute", left: "14px" }} />
              <input
                type={showPassword ? "text" : "password"}
                id="student-password"
                autoComplete="current-password"
                aria-invalid={loginError || isLocked}
                aria-describedby={isLocked ? "login-locked" : loginError ? "login-error" : undefined}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 48px 12px 42px",
                  background: "rgba(255, 255, 255, 0.07)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={lang === "el"
                  ? (showPassword ? "Απόκρυψη κωδικού" : "Εμφάνιση κωδικού")
                  : (showPassword ? "Hide password" : "Show password")}
                aria-controls="student-password"
                style={{ position: "absolute", right: "4px", display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", padding: 0, background: "transparent", border: "none", borderRadius: "8px", color: "#cbd5e1", cursor: "pointer" }}
              >
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
            {isLocked && (
              <p id="login-locked" role="alert" style={{ color: "#fda4af", fontSize: "13px", margin: "10px 0 0" }}>
                {lang === "el"
                  ? "Η σύνδεση κλειδώθηκε προσωρινά μετά από 3 αποτυχημένες προσπάθειες. Δοκίμασε ξανά σε 1 λεπτό ή επίλεξε επαναφορά κωδικού."
                  : "Sign-in has been temporarily locked after 3 unsuccessful attempts. Try again in 1 minute or reset your password."}
              </p>
            )}
            {loginError && !isLocked && (
              <p id="login-error" role="alert" style={{ color: "#fda4af", fontSize: "13px", margin: "10px 0 0" }}>
                {lang === "el" ? "Λάθος email ή κωδικός πρόσβασης. Δοκίμασε ξανά." : "Incorrect email or password. Please try again."}
              </p>
            )}
              <button
                type="button"
                onClick={() => setResetRequested(true)}
                style={{ background: "transparent", border: "none", color: "#d8b4fe", padding: "10px 0 0", textDecoration: "underline", cursor: "pointer", fontSize: "13px" }}
              >
                {lang === "el" ? "Επαναφορά κωδικού" : "Reset password"}
              </button>
            {resetRequested && (
              <p role="status" style={{ color: "#cbd5e1", fontSize: "13px", margin: "10px 0 0" }}>
                {lang === "el"
                  ? "Η επαναφορά κωδικού δεν είναι ακόμη διαθέσιμη στο πρωτότυπο. Δεν στάλθηκε email."
                  : "Password reset is not yet available in this prototype. No email has been sent."}
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLocked}
            style={{
              background: "linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "14px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: isLocked ? "not-allowed" : "pointer",
              opacity: isLocked ? 0.55 : 1,
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
