import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function ProgrammeEvents() {
  const [allProgrammes, setAllProgrammes] = useState([]);
const [selectedProgrammeId, setSelectedProgrammeId] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  const [programme, setProgramme] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const emptyForm = {
    title_en: "",
    title_ta: "",
    event_date: "",
    location_en: "",
    location_ta: "",
    description_en: "",
    description_ta: "",
    status: "active",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    loadAllProgrammes();
    loadProgramme();
  }, [slug]);

  async function loadProgramme() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("programmes")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setProgramme(data);
setSelectedProgrammeId(data.id);
await loadEvents(data.id);

    setLoading(false);
  }
  async function loadAllProgrammes() {
  const { data, error } = await supabase
    .from("programmes")
    .select("id, slug, name_en, name_ta")
    .order("name_en");

  if (error) {
    console.error(error);
    return;
  }

  setAllProgrammes(data || []);
}

  async function loadEvents(programmeId) {
    const { data, error } = await supabase
      .from("programme_events")
      .select("*")
      .eq("programme_id", programmeId)
      .order("event_date", { ascending: false });

    if (error) {
      console.error(error);
      setError(error.message);
      return;
    }

    setEvents(data || []);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function openAddForm() {
    setEditingEvent(null);
    setForm(emptyForm);
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function openEditForm(event) {
    setEditingEvent(event);

    setForm({
      title_en: event.title_en || "",
      title_ta: event.title_ta || "",
      event_date: event.event_date
        ? event.event_date.substring(0, 10)
        : "",
      location_en: event.location_en || "",
      location_ta: event.location_ta || "",
      description_en: event.description_en || "",
      description_ta: event.description_ta || "",
      status: event.status || "active",
    });

    setMessage("");
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingEvent(null);
    setForm(emptyForm);
  }

  async function saveEvent(e) {
    e.preventDefault();

    if (!programme) return;

    setSaving(true);
    setMessage("");
    setError("");

    const eventData = {
      programme_id: selectedProgrammeId || programme.id,
      title_en: form.title_en,
      title_ta: form.title_ta,
      event_date: form.event_date,
      location_en: form.location_en,
      location_ta: form.location_ta,
      description_en: form.description_en,
      description_ta: form.description_ta,
      status: form.status,
    };

    let result;

    if (editingEvent) {
      result = await supabase
        .from("programme_events")
        .update(eventData)
        .eq("id", editingEvent.id);
    } else {
      result = await supabase
        .from("programme_events")
        .insert(eventData);
    }

    if (result.error) {
      console.error(result.error);
      setError(result.error.message);
      setSaving(false);
      return;
    }

    setMessage(
      editingEvent
        ? "Event updated successfully."
        : "Event added successfully."
    );

    await loadEvents(programme.id);

    setSaving(false);
    closeForm();
  }

  async function deleteEvent(event) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title_en}"?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    const { error } = await supabase
      .from("programme_events")
      .delete()
      .eq("id", event.id);

    if (error) {
      console.error(error);
      setError(error.message);
      return;
    }

    setMessage("Event deleted successfully.");

    await loadEvents(programme.id);
  }

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          Loading events...
        </div>
      </div>
    );
  }

  if (!programme) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h2>Programme not found</h2>

          <button
            onClick={() => navigate("/admin")}
            style={styles.secondaryButton}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <button
            onClick={() => navigate("/admin")}
            style={styles.backButton}
          >
            ← Back to Dashboard
          </button>

          <div style={styles.headerRow}>
            <div>
              <h1 style={styles.title}>
                Programme Events
              </h1>

              <p style={styles.subtitle}>
                {programme.name_en} · {programme.name_ta}
              </p>
            </div>

            <button
              onClick={openAddForm}
              style={styles.primaryButton}
            >
              + Add Event
            </button>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div style={styles.success}>
            ✓ {message}
          </div>
        )}

        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <section style={styles.formSection}>
            <div style={styles.formHeader}>
              <h2 style={styles.sectionTitle}>
                {editingEvent
                  ? "Edit Event"
                  : "Add New Event"}
              </h2>

              <button
                onClick={closeForm}
                style={styles.closeButton}
              >
                ✕
              </button>
            </div>

            <form onSubmit={saveEvent}>
              {/* Programme Selection */}
<div style={{ marginBottom: "25px" }}>
  <label
    style={{
      display: "block",
      fontWeight: "600",
      marginBottom: "8px",
    }}
  >
    Event Belongs To Programme
  </label>

  <select
    value={selectedProgrammeId}
    onChange={(e) => setSelectedProgrammeId(e.target.value)}
    required
    style={{
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "16px",
    }}
  >
    <option value="">Select Programme</option>

    {allProgrammes.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name_en} — {item.name_ta}
      </option>
    ))}
  </select>
</div>

              {/* Titles */}
              <div style={styles.group}>
                <h3 style={styles.groupTitle}>
                  Event Title
                </h3>

                <div style={styles.grid}>
                  <div>
                    <label style={styles.label}>
                      English Title
                    </label>

                    <input
                      type="text"
                      name="title_en"
                      value={form.title_en}
                      onChange={handleChange}
                      required
                      style={styles.input}
                    />
                  </div>

                  <div>
                    <label style={styles.label}>
                      Tamil Title
                    </label>

                    <input
                      type="text"
                      name="title_ta"
                      value={form.title_ta}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                </div>
              </div>

              {/* Date */}
              <div style={styles.group}>
                <h3 style={styles.groupTitle}>
                  Event Date
                </h3>

                <label style={styles.label}>
                  Date
                </label>

                <input
                  type="date"
                  name="event_date"
                  value={form.event_date}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              {/* Location */}
              <div style={styles.group}>
                <h3 style={styles.groupTitle}>
                  Location
                </h3>

                <div style={styles.grid}>
                  <div>
                    <label style={styles.label}>
                      English Location
                    </label>

                    <input
                      type="text"
                      name="location_en"
                      value={form.location_en}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>

                  <div>
                    <label style={styles.label}>
                      Tamil Location
                    </label>

                    <input
                      type="text"
                      name="location_ta"
                      value={form.location_ta}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={styles.group}>
                <h3 style={styles.groupTitle}>
                  Event Description
                </h3>

                <div style={styles.grid}>
                  <div>
                    <label style={styles.label}>
                      English Description
                    </label>

                    <textarea
                      name="description_en"
                      value={form.description_en}
                      onChange={handleChange}
                      rows="7"
                      style={styles.textarea}
                    />
                  </div>

                  <div>
                    <label style={styles.label}>
                      Tamil Description
                    </label>

                    <textarea
                      name="description_ta"
                      value={form.description_ta}
                      onChange={handleChange}
                      rows="7"
                      style={styles.textarea}
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div style={styles.group}>
                <h3 style={styles.groupTitle}>
                  Event Status
                </h3>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>

              {/* Form buttons */}
              <div style={styles.actions}>
                <button
                  type="button"
                  onClick={closeForm}
                  style={styles.secondaryButton}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  style={styles.primaryButton}
                >
                  {saving
                    ? "Saving..."
                    : editingEvent
                    ? "Update Event"
                    : "Save Event"}
                </button>
              </div>

            </form>
          </section>
        )}

        {/* Events */}
        <section style={styles.eventsSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Events
            </h2>

            <span style={styles.count}>
              {events.length} event
              {events.length !== 1 ? "s" : ""}
            </span>
          </div>

          {events.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyIcon}>
                📅
              </div>

              <h3>No events yet</h3>

              <p>
                Add the first event for this programme.
              </p>

              <button
                onClick={openAddForm}
                style={styles.primaryButton}
              >
                + Add Event
              </button>
            </div>
          ) : (
            <div style={styles.eventList}>
              {events.map((event) => (
                <div
                  key={event.id}
                  style={styles.eventCard}
                >
                  <div style={styles.eventDate}>
                    <div style={styles.dateDay}>
                      {new Date(
                        event.event_date
                      ).getDate()}
                    </div>

                    <div style={styles.dateMonth}>
                      {new Date(
                        event.event_date
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          month: "short",
                        }
                      )}
                    </div>

                    <div style={styles.dateYear}>
                      {new Date(
                        event.event_date
                      ).getFullYear()}
                    </div>
                  </div>

                  <div style={styles.eventContent}>
                    <div style={styles.eventTitleRow}>
                      <div>
                        <h3 style={styles.eventTitle}>
                          {event.title_en}
                        </h3>

                        {event.title_ta && (
                          <div style={styles.eventTamil}>
                            {event.title_ta}
                          </div>
                        )}
                      </div>

                      <span
                        style={{
                          ...styles.status,
                          ...(event.status === "active"
                            ? styles.activeStatus
                            : styles.inactiveStatus),
                        }}
                      >
                        {event.status || "active"}
                      </span>
                    </div>

                    {event.location_en && (
                      <p style={styles.location}>
                        📍 {event.location_en}
                      </p>
                    )}

                    {event.description_en && (
                      <p style={styles.description}>
                        {event.description_en}
                      </p>
                    )}

                    <div style={styles.eventActions}>
                      <button
                        onClick={() =>
                          openEditForm(event)
                        }
                        style={styles.editButton}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteEvent(event)
                        }
                        style={styles.deleteButton}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f7f5",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "30px",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "20px",
  },

  backButton: {
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    color: "#222",
  },

  subtitle: {
    marginTop: "8px",
    color: "#777",
    fontSize: "17px",
  },

  primaryButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#222",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
    whiteSpace: "nowrap",
  },

  secondaryButton: {
    padding: "12px 20px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },

  success: {
    padding: "14px",
    borderRadius: "7px",
    background: "#e8f5e9",
    color: "#2e7d32",
    marginBottom: "20px",
  },

  errorBox: {
    padding: "14px",
    borderRadius: "7px",
    background: "#ffebee",
    color: "#c62828",
    marginBottom: "20px",
  },

  formSection: {
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "20px",
  },

  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  closeButton: {
    border: "none",
    background: "#f5f5f5",
    borderRadius: "50%",
    width: "34px",
    height: "34px",
    cursor: "pointer",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "21px",
    color: "#222",
  },

  group: {
    marginBottom: "25px",
  },

  groupTitle: {
    fontSize: "16px",
    margin: "0 0 15px",
    color: "#444",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#444",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    background: "#fff",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    lineHeight: "1.5",
    resize: "vertical",
    fontFamily: "Arial, sans-serif",
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "20px",
  },

  eventsSection: {
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "25px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  count: {
    color: "#777",
    fontSize: "14px",
  },

  empty: {
    textAlign: "center",
    padding: "60px 20px",
    border: "1px dashed #ccc",
    borderRadius: "8px",
    color: "#777",
  },

  emptyIcon: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  eventList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  eventCard: {
    display: "flex",
    border: "1px solid #e5e5e5",
    borderRadius: "10px",
    overflow: "hidden",
  },

  eventDate: {
    width: "100px",
    minWidth: "100px",
    background: "#f3f3f1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
  },

  dateDay: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#222",
  },

  dateMonth: {
    fontSize: "14px",
    textTransform: "uppercase",
    color: "#555",
  },

  dateYear: {
    fontSize: "12px",
    color: "#888",
    marginTop: "3px",
  },

  eventContent: {
    flex: 1,
    padding: "20px",
  },

  eventTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
  },

  eventTitle: {
    margin: 0,
    fontSize: "20px",
    color: "#222",
  },

  eventTamil: {
    marginTop: "5px",
    color: "#777",
    fontSize: "16px",
  },

  location: {
    margin: "12px 0 5px",
    color: "#555",
    fontSize: "14px",
  },

  description: {
    margin: "10px 0",
    color: "#666",
    lineHeight: "1.5",
  },

  status: {
    height: "fit-content",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    whiteSpace: "nowrap",
  },

  activeStatus: {
    background: "#e8f5e9",
    color: "#2e7d32",
  },

  inactiveStatus: {
    background: "#eeeeee",
    color: "#666",
  },

  eventActions: {
    display: "flex",
    gap: "8px",
    marginTop: "15px",
  },

  editButton: {
    padding: "8px 14px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    background: "#fff",
    cursor: "pointer",
  },

  deleteButton: {
    padding: "8px 14px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    background: "#fff",
    color: "#c62828",
    cursor: "pointer",
  },
};

export default ProgrammeEvents;