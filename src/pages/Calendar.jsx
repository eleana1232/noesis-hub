import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, AlertCircle, Calendar as CalendarIcon, BookOpen, Plus } from "lucide-react";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const holidays = [
  "2026-10-28",
  "2026-12-25", "2026-12-26",
  "2026-12-24", "2026-12-27", "2026-12-28", "2026-12-29", "2026-12-30", "2026-12-31",
  "2027-01-01", "2027-01-02", "2027-01-03", "2027-01-04", "2027-01-05", "2027-01-06",
  "2027-03-25",
  "2027-04-30", "2027-05-01", "2027-05-02", "2027-05-03", "2027-05-04", "2027-05-05"
];

const initialEvents = {
  "2026-09-25": { title: "React Project Deadline", type: "deadline" },
  "2026-09-28": { title: "Databases Midterm", type: "exam" },
  "2026-10-10": { title: "AI & UX Theory Submission", type: "deadline" },
  "2026-11-15": { title: "Web Dev Progress Review", type: "study" },
  "2026-12-18": { title: "Winter Semester Presentations", type: "exam" },
  "2027-01-15": { title: "Exams Period Starts", type: "exam" },
  "2027-02-10": { title: "Spring Semester Orientation", type: "study" },
  "2027-03-12": { title: "Databases Final Project", type: "deadline" },
  "2027-04-15": { title: "AI Tutor Milestone Check", type: "study" },
  "2027-05-20": { title: "Final Thesis Submission", type: "deadline" }
};

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1));
  const [scheduledEvents, setScheduledEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventType, setNewEventType] = useState("deadline");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

  const daysInCurrentMonth = getDaysInMonth(year, month);
  const startingDay = getFirstDayOfMonth(year, month);

  const calendarDays = [];

  for (let i = 0; i < startingDay; i++) {
    calendarDays.push({
      date: "",
      muted: true,
    });
  }

  const today = new Date();
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(i).padStart(2, '0');
    const dateString = `${year}-${formattedMonth}-${formattedDay}`;

    calendarDays.push({
      date: i,
      muted: false,
      dateString,
      holiday: holidays.includes(dateString),
      event: scheduledEvents[dateString],
      active: i === today.getDate() && month === today.getMonth() && year === today.getFullYear(),
    });
  }

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventDate || !newEventTitle) return;

    setScheduledEvents(prev => ({
      ...prev,
      [newEventDate]: { title: newEventTitle, type: newEventType }
    }));

    setNewEventDate("");
    setNewEventTitle("");
    setIsModalOpen(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ padding: "20px", maxWidth: "950px", margin: "0 auto", textAlign: "center" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ textAlign: "left" }}>
          <p style={{ fontSize: "12px", color: "#2f80ed", fontWeight: "600", textTransform: "uppercase", marginBottom: "4px" }}>Planner & Schedule</p>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b", margin: "0 0 4px 0" }}>Academic Calendar</h1>
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>Monthly planner view for tracking your lectures, holidays, and deadlines.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsModalOpen(true)}
          style={{ background: "#2f80ed", color: "white", border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "12px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", boxShadow: "0 2px 6px rgba(47, 128, 237, 0.2)" }}
        >
          <Plus size={16} /> Add Event
        </motion.button>
      </div>

      <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid #eaeaea", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: 0 }}>{monthNames[month]} {year}</h2>
          <div style={{ display: "flex", gap: "6px" }}>
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={handlePrevMonth} style={{ background: "#f1f5f9", border: "none", borderRadius: "6px", padding: "6px", cursor: "pointer" }}><ChevronLeft size={16} /></motion.button>
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={handleNextMonth} style={{ background: "#f1f5f9", border: "none", borderRadius: "6px", padding: "6px", cursor: "pointer" }}><ChevronRight size={16} /></motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={`${month}-${year}`}
            initial={{ opacity: 0, scale: 0.98, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "6px",
            }}
          >
            {daysOfWeek.map((day) => (
              <div key={day} style={{ fontWeight: "700", fontSize: "11px", color: "#94a3b8", paddingBottom: "6px" }}>{day}</div>
            ))}

            {calendarDays.map((item, index) => (
              <motion.div 
                key={index}
                whileHover={!item.muted ? { y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  minHeight: "65px",
                  padding: "6px",
                  borderRadius: "8px",
                  background: item.muted ? "transparent" : "#f8fafc",
                  border: item.muted ? "none" : "1px solid #e2e8f0",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                {item.date !== "" && (
                  <>
                    <span style={{ fontWeight: "600", fontSize: "11px", color: item.active ? "#2f80ed" : "#1e293b" }}>{item.date}</span>
                    {item.event && (
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "9px", background: "rgba(47, 128, 237, 0.1)", color: "#2f80ed", padding: "2px 4px", borderRadius: "4px", marginTop: "2px" }}>
                        {item.event.type === "deadline" ? (
                          <AlertCircle size={10} color="#ef4444" />
                        ) : item.event.type === "exam" ? (
                          <CalendarIcon size={10} color="#f59e0b" />
                        ) : (
                          <BookOpen size={10} color="#2f80ed" />
                        )}
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.event.title}</span>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/*Add Event modal with a smooth spring animation*/}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              style={{ background: "white", padding: "24px", borderRadius: "16px", width: "350px", textAlign: "left", boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "16px", color: "#1e293b" }}>Add New Event / Deadline</h3>
              <form onSubmit={handleAddEvent} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", display: "block", marginBottom: "4px" }}>Date</label>
                  <input 
                    type="date" 
                    value={newEventDate} 
                    onChange={(e) => setNewEventDate(e.target.value)} 
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", boxSizing: "border-box" }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", display: "block", marginBottom: "4px" }}>Event Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. React Assignment 2" 
                    value={newEventTitle} 
                    onChange={(e) => setNewEventTitle(e.target.value)} 
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", boxSizing: "border-box" }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", display: "block", marginBottom: "4px" }}>Type</label>
                  <select 
                    value={newEventType} 
                    onChange={(e) => setNewEventType(e.target.value)} 
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", background: "white", boxSizing: "border-box" }}
                  >
                    <option value="deadline">Deadline</option>
                    <option value="exam">Exam</option>
                    <option value="study">Study Session</option>
                  </select>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "12px" }}>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    style={{ background: "#e2e8f0", border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", color: "#475569" }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    style={{ background: "#2f80ed", color: "white", border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                  >
                    Save Event
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default Calendar;
