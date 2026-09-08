import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function ProgrammeEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [programme, setProgramme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
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
    } else {
      setProgramme(data);
    }

    setLoading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setProgramme((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function saveProgramme(e) {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    const { error } = await supabase
      .from("programmes")
      .update({
        name_en: programme.name_en,
        name_ta: programme.name_ta,
        heading_en: programme.heading_en,
        heading_ta: programme.heading_ta,
        description_en: programme.description_en,
        description_ta: programme.description_ta,
        objectives_en: programme.objectives_en,
        objectives_ta: programme.objectives_ta,
        status: programme.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", programme.id);

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      setMessage("Programme updated successfully.");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>Loading programme...</div>
      </div>
    );
  }

  if (error && !programme) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h2>Unable to load programme</h2>
          <p style={styles.error}>{error}</p>

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
          <div>
            <button
              onClick={() => navigate("/admin")}
              style={styles.backButton}
            >
              ← Back to Dashboard
            </button>

            <h1 style={styles.title}>
              Edit Programme
            </h1>

            <p style={styles.subtitle}>
              {programme.name_en}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={saveProgramme}>

          {/* Programme Names */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Programme Names
            </h2>

            <div style={styles.grid}>
              <div>
                <label style={styles.label}>
                  English Name
                </label>

                <input
                  type="text"
                  name="name_en"
                  value={programme.name_en || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.label}>
                  Tamil Name
                </label>

                <input
                  type="text"
                  name="name_ta"
                  value={programme.name_ta || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
          </section>

          {/* Headings */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Programme Headings
            </h2>

            <div style={styles.grid}>
              <div>
                <label style={styles.label}>
                  English Heading
                </label>

                <input
                  type="text"
                  name="heading_en"
                  value={programme.heading_en || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.label}>
                  Tamil Heading
                </label>

                <input
                  type="text"
                  name="heading_ta"
                  value={programme.heading_ta || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Programme Description
            </h2>

            <div style={styles.grid}>
              <div>
                <label style={styles.label}>
                  English Description
                </label>

                <textarea
                  name="description_en"
                  value={programme.description_en || ""}
                  onChange={handleChange}
                  rows="8"
                  style={styles.textarea}
                />
              </div>

              <div>
                <label style={styles.label}>
                  Tamil Description
                </label>

                <textarea
                  name="description_ta"
                  value={programme.description_ta || ""}
                  onChange={handleChange}
                  rows="8"
                  style={styles.textarea}
                />
              </div>
            </div>
          </section>

          {/* Objectives */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Objectives
            </h2>

            <div style={styles.grid}>
              <div>
                <label style={styles.label}>
                  English Objectives
                </label>

                <textarea
                  name="objectives_en"
                  value={programme.objectives_en || ""}
                  onChange={handleChange}
                  rows="7"
                  style={styles.textarea}
                />
              </div>

              <div>
                <label style={styles.label}>
                  Tamil Objectives
                </label>

                <textarea
                  name="objectives_ta"
                  value={programme.objectives_ta || ""}
                  onChange={handleChange}
                  rows="7"
                  style={styles.textarea}
                />
              </div>
            </div>
          </section>

          {/* Status */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Programme Status
            </h2>

            <label style={styles.label}>
              Status
            </label>

            <select
              name="status"
              value={programme.status || "active"}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </section>

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

          {/* Actions */}
          <div style={styles.actions}>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              style={styles.secondaryButton}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              style={styles.primaryButton}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
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

  backButton: {
    border: "none",
    background: "transparent",
    padding: "0",
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

  section: {
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: "0 0 22px",
    fontSize: "20px",
    color: "#222",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
    marginTop: "25px",
    paddingBottom: "40px",
  },

  primaryButton: {
    padding: "13px 24px",
    border: "none",
    borderRadius: "6px",
    background: "#222",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },

  secondaryButton: {
    padding: "13px 24px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },

  success: {
    padding: "14px",
    borderRadius: "6px",
    background: "#e8f5e9",
    color: "#2e7d32",
    marginTop: "20px",
  },

  errorBox: {
    padding: "14px",
    borderRadius: "6px",
    background: "#ffebee",
    color: "#c62828",
    marginTop: "20px",
  },

  error: {
    color: "#c62828",
  },
};

export default ProgrammeEditor;