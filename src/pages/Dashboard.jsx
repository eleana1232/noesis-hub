import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, CalendarDays, FileText } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "./Dashboard.css";

const updates = [
  { id: 1, urgent: true, course: "Web Systems (React)", author: "Dr. A. Karagiannis", en: ["Lecture postponed", "The next lecture has been postponed due to instructor illness. The material will be covered at the following meeting."], el: ["Αναβολή διάλεξης", "Η επόμενη διάλεξη αναβάλλεται λόγω ασθένειας του διδάσκοντα. Η ύλη θα καλυφθεί στην επόμενη συνάντηση."] },
  { id: 2, course: "Databases & AI", author: "Dr. M. Ioannou", en: ["PostgreSQL material", "Code examples and ER diagrams have been added for the next lab."], el: ["Υλικό PostgreSQL", "Προστέθηκαν παραδείγματα κώδικα και διαγράμματα ER για το επόμενο εργαστήριο."] },
  { id: 3, course: "Interaction/UX Design", author: "Prof. E. Vgenopoulou", en: ["Capstone project groups", "Confirm your group members before starting the next project activity."], el: ["Ομάδες Capstone Project", "Επιβεβαίωσε τα μέλη της ομάδας σου πριν ξεκινήσετε την επόμενη δραστηριότητα του project."] },
];

export default function Dashboard({ studentName }) {
  const { lang } = useLanguage();
  const el = lang === "el";
  const text = (english, greek) => el ? greek : english;
  return (
    <section className="nh-dashboard" aria-labelledby="dashboard-title">
      <header className="nh-dashboard-header">
        <div>
          <p className="nh-dashboard-eyebrow">{text("Your workspace", "Ο χώρος σου")}{studentName && studentName !== "Student" ? ` / ${studentName}` : ""}</p>
          <h1 id="dashboard-title">{text("A place to work things out.", "Χώρος για σκέψη και εξάσκηση.")}</h1>
          <p className="nh-dashboard-intro">{text("Your courses, reading and the questions you are working through.", "Τα μαθήματα, το υλικό και οι απορίες που δουλεύεις αυτή την περίοδο.")}</p>
        </div>
        <Link className="nh-dashboard-subtle-link" to="/submissions">{text("Submit assignment", "Υποβολή εργασίας")} <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </header>

      <div className="nh-dashboard-layout">
        <div>
          <section className="nh-dashboard-course" aria-labelledby="dashboard-course-title">
            <div className="nh-dashboard-section-heading"><span>{text("Course in focus", "Μάθημα στο επίκεντρο")}</span><span className="nh-dashboard-code">CS-301</span></div>
            <h2 id="dashboard-course-title">Advanced React</h2>
            <p className="nh-dashboard-course-subtitle">Architecture &amp; State Management</p>
            <p>{text("Start with state design: what a component needs to remember, and what it can calculate.", "Ξεκίνα από τον σχεδιασμό του state: τι χρειάζεται να θυμάται ένα component και τι μπορεί να υπολογίσει.")}</p>
            <div className="nh-dashboard-course-footer"><span>Nikos Vlachos</span><Link className="nh-dashboard-primary-link" to="/courses">{text("Open course", "Άνοιγμα μαθήματος")} <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
          </section>

          <section className="nh-dashboard-updates" aria-labelledby="dashboard-updates-title">
            <div className="nh-dashboard-section-heading"><h2 id="dashboard-updates-title">{text("Course notices", "Ανακοινώσεις μαθημάτων")}</h2><span>{text("Sample notices", "Ενδεικτικές ανακοινώσεις")}</span></div>
            {updates.map((update) => <details key={update.id} className="nh-dashboard-notice">
              <summary><span className="nh-dashboard-notice-title">{update.urgent && <span className="nh-dashboard-urgent">{text("Important", "Σημαντικό")}</span>}{update[el ? "el" : "en"][0]}</span><span className="nh-dashboard-notice-course">{update.course}</span></summary>
              <p>{update[el ? "el" : "en"][1]}</p><p className="nh-dashboard-notice-author">{update.author}</p>
            </details>)}
          </section>
        </div>

        <aside className="nh-dashboard-aside">
          <section aria-labelledby="dashboard-dates-title">
            <div className="nh-dashboard-section-heading"><h2 id="dashboard-dates-title">{text("Dates & deadlines", "Ημερομηνίες & προθεσμίες")}</h2></div>
            <p>{text("Your calendar brings together lectures, study sessions and assignment dates.", "Στο ημερολόγιο θα βρεις διαλέξεις, συνεδρίες μελέτης και ημερομηνίες εργασιών.")}</p>
            <Link className="nh-dashboard-row-link" to="/calendar"><CalendarDays size={17} aria-hidden="true" />{text("Open calendar", "Άνοιγμα ημερολογίου")}<ArrowUpRight size={15} aria-hidden="true" /></Link>
            <p className="nh-dashboard-footnote">{text("Calendar entries are demonstration data.", "Οι καταχωρίσεις είναι δοκιμαστικά δεδομένα.")}</p>
          </section>
          <section aria-labelledby="dashboard-study-title">
            <h2 id="dashboard-study-title">{text("Study tools", "Εργαλεία μελέτης")}</h2>
            <Link className="nh-dashboard-row-link" to="/study-sessions"><BookOpen size={17} aria-hidden="true" />{text("Study sessions", "Συνεδρίες μελέτης")}<ArrowUpRight size={15} aria-hidden="true" /></Link>
            <Link className="nh-dashboard-row-link" to="/quizzes"><FileText size={17} aria-hidden="true" />{text("Practice quizzes", "Κουίζ εξάσκησης")}<ArrowUpRight size={15} aria-hidden="true" /></Link>
          </section>
          <section className="nh-dashboard-tutor" aria-labelledby="dashboard-tutor-title">
            <p className="nh-dashboard-eyebrow">{text("Owlly / AI Tutor", "Owlly / AI Tutor")}</p>
            <h2 id="dashboard-tutor-title">{text("Start with a question.", "Ξεκίνα με μια απορία.")}</h2>
            <p>{text("Describe what you tried and where you got stuck.", "Περίγραψε τι δοκίμασες και σε ποιο σημείο δυσκολεύτηκες.")}</p>
            <Link className="nh-dashboard-subtle-link" to="/ai-tutor">{text("Open tutor", "Άνοιγμα tutor")}<ArrowUpRight size={16} aria-hidden="true" /></Link>
            <p className="nh-dashboard-footnote">{text("Prototype with predefined replies.", "Πρωτότυπο με προκαθορισμένες απαντήσεις.")}</p>
          </section>
        </aside>
      </div>
    </section>
  );
}
