import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, ExternalLink, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function AITutor() {
  const { lang } = useLanguage();
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "tutor",
      text: lang === "el" 
        ? "Γεια σου! Είμαι η Σοφία 🦉, ο προσωπικός σου AI Tutor. Πώς μπορώ να σε βοηθήσω με τα μαθήματα ή το capstone project σου σήμερα?"
        : "Hello! I'm Sofia 🦉, your personal AI Tutor. How can I help you with your courses or capstone project today?"
    }
  ]);

  const quickPrompts = lang === "el" ? [
    "💡 Πώς να στήσω τα React Hooks στο Dashboard;",
    "🗄️ Ποια η λογική για τα Foreign Keys στο PostgreSQL;",
    "🎨 Πώς να βελτιώσω το UX στο Noesis Hub?"
  ] : [
    "💡 How to structure React Hooks in Dashboard?",
    "🗄️ What is the logic for PostgreSQL Foreign Keys?",
    "🎨 How to improve UX in Noesis Hub?"
  ];

  const handleSendMessage = (e, textToSend) => {
    if (e) e.preventDefault();
    const content = textToSend || inputMessage;
    if (!content.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: content };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");

    setIsTyping(true);

    setTimeout(() => {
      const lower = content.toLowerCase();
      let botReply = "";
      let sourceLink = null;

      // 1. Κομπλιμέντα & επιδοκιμασίες
      if (lower.includes("πρώτη") || lower.includes("πρωτη") || lower.includes("τελεια") || lower.includes("μπράβο") || lower.includes("πωπω")) {
        botReply = lang === "el"
          ? "Σε ευχαριστώ πολύ! 🦉 Χαίρομαι πάρα πολύ που βοηθάω. Συνεχίζουμε δυναμικά; Πες μου σε ποιο σημείο θες να επικεντρωθούμε τώρα!"
          : "Thank you so much! 🦉 I'm thrilled to help. Shall we keep going? Tell me what to focus on next!";
        sourceLink = null;
      }
      // 2. Ασκήσεις / Εργασίες
      else if (lower.includes("λύσει") || lower.includes("λυσεις") || lower.includes("ασκησ") || lower.includes("άσκηση") || lower.includes("δούμε") || lower.includes("εξασκησ") || lower.includes("εκρεμμ")) {
        botReply = lang === "el"
          ? "Πολύ ευχαρίστως να τις δούμε! 🦉 Πες μου τι αφορούν οι ασκήσεις (React, PostgreSQL, UX;) και ποιο ακριβώς ερώτημα σε δυσκολεύει, ώστε να σε καθοδηγήσω βήμα-βήμα."
          : "I'd love to help you look at them! 🦉 Tell me what the exercises are about (React, PostgreSQL, UX?) and which exact part is tricky so we can solve it step-by-step.";
        sourceLink = null;
      }
      // 3. Ερωτήσεις κατάστασης ("τι κάνεις", "πώς είσαι")
      else if (lower.includes("είσαι καλά") || lower.includes("εισαι καλα") || lower.includes("τι κάνεις") || lower.includes("πως εισαι") || lower.includes("how are you")) {
        botReply = lang === "el"
          ? "Εγώ είμαι μια χαρά, έτοιμη να πετάξω πάνω από τους κώδικες και τα διαγράμματά σου! 🦉 Εσύ πώς είσαι; Πώς μπορώ να σε βοηθήσω σήμερα;"
          : "I'm doing great, ready to fly over your code and diagrams! 🦉 How are you doing? How can I help you today?";
        sourceLink = null;
      }
      // 4. Απλός χαιρετισμός ("γεια σου", "hello")
      else if (lower.includes("γεια") || lower.includes("hello") || lower.includes("hi") || lower.includes("καλημερα")) {
        botReply = lang === "el"
          ? "Γεια σου Ελεάνα! 🦉 Τι θα ήθελες να δούμε ή να ετοιμάσουμε μαζί σήμερα;"
          : "Hello Eleana! 🦉 What would you like us to review or work on together today?";
        sourceLink = null;
      }
      // 5. Γενική βοήθεια
      else if (lower.includes("βοηθ") || lower.includes("help") || lower.includes("τι μπορείς")) {
        botReply = lang === "el"
          ? "Φυσικά! Μπορώ να σε βοηθήσω να ξεκολλήσεις από απορίες κώδικα, να οργανώσεις τη βάση δεδομένων σου, να βελτιώσεις το UX design ή να συζητήσουμε τη θεωρία των μαθημάτων. Πού θες να εστιάσουμε; 🦉"
          : "Of course! I can help you debug code, structure your database, improve UX design, or discuss course theory. Where should we focus? 🦉";
        sourceLink = null;
      }
      // 6. Τεχνικά: React Hooks
      else if (lower.includes("react") || lower.includes("hook") || lower.includes("state") || lower.includes("χουντ")) {
        botReply = lang === "el"
          ? "Ωραίο θέμα! Στα React hooks, σκέψου αν χρειάζεσαι τοπικό state για κάποιο component ή global state μέσω Context. Ποια λειτουργία προσπαθείς να υλοποιήσεις αυτή τη στιγμή; 🦉"
          : "Great topic! For React hooks, consider whether you need local component state or global state. What feature are you implementing right now? 🦉";
        sourceLink = { title: "React Hooks Reference", url: "https://react.dev/reference/react" };
      } 
      // 7. Τεχνικά: PostgreSQL / Database
      else if (lower.includes("database") || lower.includes("postgres") || lower.includes("schema") || lower.includes("sql") || lower.includes("erd") || lower.includes("βάση") || lower.includes("πινακ")) {
        botReply = lang === "el"
          ? "Η βάση δεδομένων είναι η καρδιά του e-class σου! Σκέψου τις οντότητες: Φοιτητές, Μαθήματα, Εργασίες. Πώς πιστεύεις ότι συνδέονται μεταξύ τους; 🦉"
          : "The database is the heart of your e-class! Think about the entities: Students, Courses, Submissions. How do you think they relate to each other? 🦉";
        sourceLink = { title: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/" };
      } 
      // 8. Τεχνικά: UX Design
      else if (lower.includes("ux") || lower.includes("design") || lower.includes("interface") || lower.includes("figma") || lower.includes("σχεδιασ")) {
        botReply = lang === "el"
          ? "Το UX design θέλει καθαρή ιεραρχία και σωστή πλοήγηση. Δούλεψες καθόλου τα frames στο Figma πριν περάσεις σε κώδικα React; 🦉"
          : "UX design requires clean visual hierarchy and clear navigation. Did you work on Figma frames before moving to React code? 🦉";
        sourceLink = { title: "W3C Accessibility & UX Guidelines", url: "https://www.w3.org/WAI/sitemap/" };
      } 
      // Fallback
      else {
        botReply = lang === "el"
          ? `Κατάλαβα! 🦉 Θέλεις να το εξετάσουμε τεχνικά ή σχεδιαστικά; Πες μου περισσότερες λεπτομέρειες για να σε βοηθήσω να το λύσεις.`
          : `I see! 🦉 Would you like us to examine it technically or from a design perspective? Tell me more details to help you out.`;
        sourceLink = null;
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: "tutor", text: botReply, link: sourceLink }]);
    }, 1200);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ padding: "28px", maxWidth: "950px", margin: "0 auto", display: "flex", flexDirection: "column", height: "calc(100vh - 40px)" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "20px", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ 
            width: "50px", 
            height: "50px", 
            borderRadius: "50%", 
            background: "linear-gradient(135deg, #9333ea 0%, #6b21a8 100%)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            color: "white",
            boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)",
            fontSize: "24px"
          }}>
            🦉
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "#9333ea", fontWeight: "600", textTransform: "uppercase", margin: 0 }}>
              Noesis Hub Assistant
            </p>
            <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
              AI Tutor
            </h1>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div style={{ 
        flex: 1, 
        background: "white", 
        borderRadius: "16px", 
        border: "1px solid #eaeaea", 
        boxShadow: "0 4px 12px rgba(0,0,0,0.02)", 
        display: "flex", 
        flexDirection: "column", 
        overflow: "hidden",
        marginBottom: "16px"
      }}>
        
        {/* Messages History */}
        <div style={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "14px", textAlign: "left" }}>
          {messages.map((msg) => {
            const isTutor = msg.sender === "tutor";
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: "flex",
                  justifyContent: isTutor ? "flex-start" : "flex-end",
                  gap: "10px",
                  alignItems: "flex-start"
                }}
              >
                {isTutor && (
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#f3e8ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>
                    🦉
                  </div>
                )}
                <div style={{
                  maxWidth: "75%",
                  padding: "12px 16px",
                  borderRadius: "14px",
                  background: isTutor ? "#f8fafc" : "#9333ea",
                  color: isTutor ? "#1e293b" : "white",
                  border: isTutor ? "1px solid #e2e8f0" : "none",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
                }}>
                  <div>{msg.text}</div>
                  {msg.link && (
                    <a
                      href={msg.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "10px",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        background: "rgba(147, 51, 234, 0.1)",
                        color: "#7e22ce",
                        fontSize: "12px",
                        fontWeight: "600",
                        textDecoration: "none",
                        border: "1px solid rgba(147, 51, 234, 0.2)"
                      }}
                    >
                      🔗 {msg.link.title} <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                {!isTutor && (
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#2f80ed", color: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                    <User size={16} />
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Typing Indicator Animation */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#f3e8ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>
                  🦉
                </div>
                <div style={{
                  padding: "12px 18px",
                  borderRadius: "14px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  gap: "6px",
                  alignItems: "center"
                }}>
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#9333ea", display: "inline-block" }}
                  />
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#9333ea", display: "inline-block" }}
                  />
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#9333ea", display: "inline-block" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ padding: "10px 20px", background: "#f8fafc", borderTop: "1px solid #eaeaea", display: "flex", gap: "8px", overflowX: "auto" }}>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={(e) => handleSendMessage(e, prompt)}
              style={{
                background: "white",
                border: "1px solid #cbd5e1",
                borderRadius: "20px",
                padding: "6px 12px",
                fontSize: "11px",
                fontWeight: "600",
                color: "#475569",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s"
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => handleSendMessage(e, null)} style={{ padding: "16px 20px", background: "white", borderTop: "1px solid #eaeaea", display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={lang === "el" ? "Ρώτησε τον AI Tutor..." : "Ask the AI Tutor..."}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontSize: "13px",
              outline: "none"
            }}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={{
              background: "#9333ea",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "0 20px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <Send size={16} /> {lang === "el" ? "Αποστολή" : "Send"}
          </motion.button>
        </form>

      </div>
    </motion.section>
  );
}

export default AITutor;
