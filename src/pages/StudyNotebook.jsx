import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./StudyNotebook.css";

const storageKey = "noesis.study-notebook.v1";
const courses = ["Advanced React Architecture & State Management", "PostgreSQL Indexing & Query Optimization", "Interaction Design & Conversational Agents", "Operating Systems, Processes & DNS Resolution"];
const emptyNote = () => ({ course: courses[0], title: "", difficulty: "", attempts: "", discovery: "", sources: "" });

function loadNotes() {
  try {
    const raw = localStorage.getItem(storageKey);
    const notes = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(notes) || !notes.every(note => note && typeof note.id === "string" && ["course", "title", "difficulty", "attempts", "discovery", "sources", "updatedAt"].every(key => typeof note[key] === "string"))) throw new Error("Invalid notes");
    return { notes, error: false };
  } catch { return { notes: [], error: true }; }
}

export default function StudyNotebook() {
  const { lang } = useLanguage();
  const el = lang === "el";
  const t = (en, gr) => el ? gr : en;
  const [stored] = useState(loadNotes);
  const [notes, setNotes] = useState(stored.notes);
  const [draft, setDraft] = useState(emptyNote);
  const [activeId, setActiveId] = useState(null);
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState("");
  const [dirty, setDirty] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const fields = [
    ["difficulty", t("What was unclear?", "Τι με δυσκόλεψε;")],
    ["attempts", t("What did I try and observe?", "Τι δοκίμασα και τι παρατήρησα;")],
    ["discovery", t("What did I work out?", "Τι κατάλαβα τελικά;")],
    ["sources", t("Sources to revisit", "Πηγές στις οποίες θέλω να επιστρέψω")],
  ];
  const canLeave = () => !dirty || window.confirm(t("Discard unsaved changes?", "Να απορριφθούν οι αλλαγές που δεν αποθηκεύτηκαν;"));
  const edit = note => {
    if (!canLeave()) return;
    setDraft(note || emptyNote()); setActiveId(note?.id || null); setDirty(false); setStatus(""); setSaveError(false);
  };
  const change = (key, value) => { setDraft(previous => ({ ...previous, [key]: value })); setDirty(true); setStatus(""); };
  const save = event => {
    event.preventDefault();
    if (stored.error || !draft.title.trim()) return;
    const note = { ...draft, title: draft.title.trim(), id: activeId || crypto.randomUUID(), updatedAt: new Date().toISOString() };
    const next = [note, ...notes.filter(item => item.id !== note.id)];
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setNotes(next); setDraft(note); setActiveId(note.id); setDirty(false); setSaveError(false); setStatus("saved");
    } catch { setSaveError(true); setStatus(""); }
  };
  return <section className="nh-notebook" aria-labelledby="notebook-title">
    <header><p className="nh-notebook-kicker">{t("Your learning, in your words", "Η μάθησή σου, με δικά σου λόγια")}</p><h1 id="notebook-title">{t("Study Notebook", "Σημειωματάριο μελέτης")}</h1><p>{t("Keep track of questions, experiments and things you figured out.", "Κράτησε τις απορίες, τις δοκιμές και όσα κατάλαβες στην πορεία.")}</p></header>
    <p className="nh-notebook-storage">{t("Notes are saved only in this browser, not to your account. They are not sent to the AI Tutor. Clearing browser data removes them; avoid sensitive information on shared devices.", "Οι σημειώσεις αποθηκεύονται μόνο σε αυτόν τον browser, όχι στον λογαριασμό σου, και δεν στέλνονται στον AI Tutor. Διαγράφονται με την εκκαθάριση δεδομένων του browser· απόφυγε ευαίσθητα στοιχεία σε κοινόχρηστες συσκευές.")}</p>
    {stored.error && <p role="alert">{t("Saved notes could not be read. Saving is disabled to avoid overwriting them. Your draft can still be copied.", "Δεν ήταν δυνατή η ανάγνωση των σημειώσεων. Η αποθήκευση απενεργοποιήθηκε για να μην αντικατασταθούν. Μπορείς να αντιγράψεις το πρόχειρό σου.")}</p>}
    <div className="nh-notebook-layout"><aside aria-label={t("Saved notes", "Αποθηκευμένες σημειώσεις")}>
      <button type="button" onClick={() => edit(null)}>{t("New note", "Νέα σημείωση")}</button>
      <label htmlFor="notebook-filter">{t("Filter by course", "Φίλτρο μαθήματος")}</label><select id="notebook-filter" value={filter} onChange={event => setFilter(event.target.value)}><option value="">{t("All courses", "Όλα τα μαθήματα")}</option>{courses.map(course => <option key={course}>{course}</option>)}</select>
      {!notes.some(note => !filter || note.course === filter) && <p>{t("No saved notes here yet.", "Δεν υπάρχουν ακόμη σημειώσεις εδώ.")}</p>}
      {notes.filter(note => !filter || note.course === filter).map(note => <button className="nh-notebook-note" type="button" aria-pressed={activeId === note.id} key={note.id} onClick={() => edit(note)}><strong>{note.title}</strong><span>{note.course}</span><small>{new Date(note.updatedAt).toLocaleDateString(el ? "el-GR" : "en-GB")}</small></button>)}
    </aside><form onSubmit={save}>
      <label htmlFor="notebook-course">{t("Course", "Μάθημα")}</label><select id="notebook-course" value={draft.course} onChange={event => change("course", event.target.value)}>{courses.map(course => <option key={course}>{course}</option>)}</select>
      <label htmlFor="notebook-note-title">{t("Note title", "Τίτλος σημείωσης")}</label><input id="notebook-note-title" required maxLength={160} value={draft.title} onChange={event => change("title", event.target.value)} />
      {fields.map(([key, label]) => <div key={key}><label htmlFor={`notebook-${key}`}>{label}</label><textarea id={`notebook-${key}`} rows={3} value={draft[key]} onChange={event => change(key, event.target.value)} /></div>)}
      <div className="nh-notebook-save"><button type="submit" disabled={stored.error || !draft.title.trim()}>{t("Save note", "Αποθήκευση σημείωσης")}</button><span role="status">{status === "saved" ? t("Saved in this browser.", "Αποθηκεύτηκε σε αυτόν τον browser.") : dirty ? t("Unsaved changes", "Μη αποθηκευμένες αλλαγές") : ""}</span></div>
      {saveError && <p role="alert">{t("Could not save. Browser storage may be full or unavailable. Copy your draft before leaving.", "Δεν έγινε αποθήκευση. Ο χώρος μπορεί να είναι πλήρης ή μη διαθέσιμος. Αντίγραψε το πρόχειρό σου πριν φύγεις.")}</p>}
    </form></div>
  </section>;
}
