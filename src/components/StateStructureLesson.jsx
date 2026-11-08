import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { reactMaterials } from "../data/reactMaterials";

export default function StateStructureLesson() {
  const { lang } = useLanguage();
  const el = lang === "el";
  const [answer, setAnswer] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const hints = el ? [
    "Ξεκίνα από τις πληροφορίες που αλλάζει άμεσα ο χρήστης. Ποια είναι η πηγή αλήθειας για καθεμία;",
    "Αν αλλάξει μία δραστηριότητα, ποια άλλα στοιχεία μπορούν να υπολογιστούν ξανά από τη λίστα;",
    "Τι θα συμβεί στην επιλογή σου αν μια δραστηριότητα αλλάξει ή διαγραφεί; Σκέψου τη διαφορά ανάμεσα σε ένα αναγνωριστικό και ένα αντίγραφο αντικειμένου.",
  ] : [
    "Start with information the user changes directly. What is the source of truth for each piece?",
    "When an activity changes, which other values could be calculated again from the activity list?",
    "What happens to your selection if an activity changes or is deleted? Consider the difference between an identifier and a copied object.",
  ];

  return (
    <section aria-labelledby="state-lesson-title" style={{ margin: "24px 0", padding: "24px", background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: "16px", color: "#334155" }}>
      <p style={{ color: "#7e22ce", fontSize: "12px", fontWeight: 700, margin: "0 0 8px" }}>{el ? "ΕΝΟΤΗΤΑ 01 · ΣΧΕΔΙΑΣΜΟΣ STATE" : "UNIT 01 · STATE DESIGN"}</p>
      <h3 id="state-lesson-title" style={{ margin: "0 0 12px", color: "#1e293b" }}>Choosing the State Structure</h3>
      <p style={{ fontSize: "14px", lineHeight: 1.7 }}>{el
        ? "Στόχος: να ξεχωρίζεις τι χρειάζεται αποθήκευση σε state και τι μπορεί να υπολογιστεί, αποφεύγοντας διπλές ή αντιφατικές πληροφορίες."
        : "Goal: distinguish values that need state from values you can calculate, and avoid duplicated or contradictory information."}</p>
      <a href={reactMaterials[0].url} target="_blank" rel="noopener noreferrer" style={{ color: "#7e22ce", fontSize: "14px", fontWeight: 600 }}>{el ? "Διάβασε την επίσημη πηγή" : "Read the official lesson"} ↗</a>
      <div style={{ background: "white", padding: "18px", borderRadius: "12px", marginTop: "20px", fontSize: "14px", lineHeight: 1.7 }}>
        <h4 style={{ margin: "0 0 8px" }}>{el ? "Πριν ξεκινήσεις: τι είναι το state;" : "Before you start: what is state?"}</h4>
        <p>{el
          ? "State είναι πληροφορίες που θυμάται ένα component ανάμεσα στα renders. Όταν αλλάζουν, το React μπορεί να ενημερώσει την οθόνη. Δεν σημαίνει μόνιμη αποθήκευση: για παράδειγμα, ένα απλό state δεν διατηρείται μετά από ανανέωση της σελίδας."
          : "State is information a component remembers between renders. When it changes, React can update the screen. It is not permanent storage: ordinary component state does not survive a page refresh."}</p>
        <h4 style={{ marginBottom: "8px" }}>{el ? "Ένα μικρό παράδειγμα: εισιτήρια" : "A small example: tickets"}</h4>
        <p>{el
          ? "Σε μια κράτηση εισιτηρίων, ο χρήστης επιλέγει πόσα εισιτήρια θέλει. Η ποσότητα χρειάζεται να διατηρείται σε state. Αν η τιμή του εισιτηρίου είναι γνωστή, το συνολικό κόστος υπολογίζεται από την ποσότητα και την τιμή. Δεν χρειάζεται δεύτερο state για το ίδιο αποτέλεσμα."
          : "In a ticket booking screen, the user chooses a quantity. That quantity needs state. If the ticket price is known, the total cost can be calculated from quantity and price. You do not need another state value for that result."}</p>
        <p style={{ marginBottom: 0 }}>{el
          ? "Ρώτησε τον εαυτό σου: χρειάζεται να θυμάμαι αυτή την πληροφορία ή μπορώ να τη βρω από όσα ήδη γνωρίζω;"
          : "Ask yourself: do I need to remember this information, or can I work it out from information I already have?"}</p>
      </div>
      <h4 style={{ marginBottom: "8px" }}>{el ? "Δοκίμασε τη σκέψη σου" : "Try your reasoning"}</h4>
      <p id="state-exercise" style={{ fontSize: "14px", lineHeight: 1.7 }}>{el
        ? "Σχεδίασε έναν study planner με δραστηριότητες, φίλτρο ολοκλήρωσης, επιλεγμένη δραστηριότητα και πλήθος ολοκληρωμένων δραστηριοτήτων. Τι θα αποθήκευες σε state και τι θα υπολόγιζες; Εξήγησε τη σκέψη σου πριν γράψεις κώδικα."
        : "Design a study planner with activities, a completion filter, a selected activity, and a completed activity count. What would you store in state and what would you calculate? Explain your reasoning before writing code."}</p>
      <details style={{ fontSize: "14px", lineHeight: 1.7, marginBottom: "16px" }}>
        <summary style={{ cursor: "pointer", color: "#7e22ce", fontWeight: 600 }}>{el ? "Δεν είμαι σίγουρος τι ζητά η άσκηση" : "I'm not sure what the task is asking"}</summary>
        <p>{el
          ? "Δεν χρειάζεται να φτιάξεις την εφαρμογή. Διάλεξε ένα μόνο στοιχείο του planner και εξήγησε αν πρέπει να το θυμάται ή αν μπορεί να το υπολογίζει. Μετά συνέχισε στα υπόλοιπα."
          : "You do not need to build the app. Pick just one piece of planner information and explain whether the app needs to remember it or can calculate it. Then consider the other pieces."}</p>
        <p>{el
          ? "Φίλτρο: επιλογή που καθορίζει τι εμφανίζεται. Επιλεγμένη δραστηριότητα: αυτή που άνοιξε ο χρήστης για λεπτομέρειες. ID: μοναδικό αναγνωριστικό μιας δραστηριότητας. Status: πληροφορία για την κατάστασή της, π.χ. ολοκληρωμένη."
          : "Filter: a choice that controls what is shown. Selected activity: the activity opened for details. ID: an activity's unique identifier. Status: its condition, such as completed."}</p>
      </details>
      <label htmlFor="state-reasoning" style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>{el ? "Η προσέγγισή σου" : "Your approach"}</label>
      <textarea id="state-reasoning" aria-describedby="state-exercise state-draft-note" value={answer} onChange={(event) => setAnswer(event.target.value)} rows={5} style={{ width: "100%", boxSizing: "border-box", padding: "12px", border: "1px solid #c4b5fd", borderRadius: "10px", font: "inherit", resize: "vertical", background: "white", color: "#1e293b" }} />
      <p id="state-draft-note" style={{ fontSize: "12px", color: "#64748b" }}>{el ? "Πρόχειρο μόνο σε αυτή την οθόνη. Δεν αποθηκεύεται και δεν βαθμολογείται." : "Draft for this screen only. Your response is not saved or graded."}</p>
      <button type="button" disabled={!answer.trim() || hintCount === hints.length} onClick={() => setHintCount((count) => Math.min(count + 1, hints.length))} style={{ padding: "10px 16px", borderRadius: "8px", background: "#7e22ce", color: "white", border: 0, fontWeight: 600, cursor: !answer.trim() || hintCount === hints.length ? "not-allowed" : "pointer", opacity: !answer.trim() || hintCount === hints.length ? 0.5 : 1 }}>
        {hintCount === hints.length ? (el ? "Εμφανίστηκαν όλες οι υποδείξεις" : "All hints shown") : (el ? "Δώσε μου μια υπόδειξη" : "Give me a hint")}
      </button>
      <div aria-live="polite">{hints.slice(0, hintCount).map((hint, index) => <p key={index} style={{ fontSize: "14px", lineHeight: 1.6 }}><strong>{el ? "Υπόδειξη" : "Hint"} {index + 1}:</strong> {hint}</p>)}</div>
      <p style={{ fontSize: "12px", color: "#64748b", marginBottom: 0 }}>{el ? "Οι υποδείξεις είναι προκαθορισμένες για αυτή την άσκηση. Δεν αποτελούν ακόμη απαντήσεις AI Tutor." : "These are predefined practice hints, not AI Tutor responses yet."}</p>
    </section>
  );
}
