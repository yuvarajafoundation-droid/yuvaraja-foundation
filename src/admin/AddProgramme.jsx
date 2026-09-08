import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const PROGRAMME_TYPES = [
  {
    slug: "kalvi",
    name_en: "YRF Kalvi",
    name_ta: "YRF கல்வி",
  },
  {
    slug: "nalam",
    name_en: "YRF Nalam",
    name_ta: "YRF நலம்",
  },
  {
    slug: "opportunity",
    name_en: "YRF Opportunity",
    name_ta: "YRF வாய்ப்பு",
  },
  {
    slug: "oor",
    name_en: "YRF Oor",
    name_ta: "YRF ஊர்",
  },
  {
    slug: "iyarkkai",
    name_en: "YRF Iyarkkai",
    name_ta: "YRF இயற்கை",
  },
  {
    slug: "shakthi",
    name_en: "YRF Shakthi",
    name_ta: "YRF சக்தி",
  },
];

function AddProgramme() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    programme_type: "",
    slug: "",
    name_en: "",
    name_ta: "",
    heading_en: "",
    heading_ta: "",
    description_en: "",
    description_ta: "",
    objectives_en: "",
    objectives_ta: "",
  });

  const [event, setEvent] = useState({
    title_en: "",
    title_ta: "",
    event_date: "",
    location_en: "",
    location_ta: "",
    description_en: "",
    description_ta: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleProgrammeTypeChange(e) {
    const slug = e.target.value;

    const selected = PROGRAMME_TYPES.find(
      (item) => item.slug === slug
    );

    if (!selected) {
      setForm({
        programme_type: "",
        slug: "",
        name_en: "",
        name_ta: "",
        heading_en: "",
        heading_ta: "",
        description_en: "",
        description_ta: "",
        objectives_en: "",
        objectives_ta: "",
      });
      return;
    }

    setForm((prev) => ({
      ...prev,
      programme_type: selected.slug,
      slug: selected.slug,
      name_en: selected.name_en,
      name_ta: selected.name_ta,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEventChange(e) {
    const { name, value } = e.target;

    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    if (!form.programme_type) {
      setError("Please select a YRF programme.");
      setSaving(false);
      return;
    }

    if (!form.name_en.trim()) {
      setError("Please enter the English programme name.");
      setSaving(false);
      return;
    }

    if (!form.name_ta.trim()) {
      setError("Please enter the Tamil programme name.");
      setSaving(false);
      return;
    }

    try {
      // --------------------------------------------------
      // 1. CHECK IF PROGRAMME ALREADY EXISTS
      // --------------------------------------------------

      const { data: existingProgramme, error: checkError } =
        await supabase
          .from("programmes")
          .select("id, name_en")
          .eq("slug", form.slug)
          .maybeSingle();

      if (checkError) {
        throw checkError;
      }

      if (existingProgramme) {
        setError(
          `${existingProgramme.name_en} already exists. Please use Programme Editor to update it.`
        );
        setSaving(false);
        return;
      }

      // --------------------------------------------------
      // 2. CREATE PROGRAMME
      // --------------------------------------------------

      const { data: programme, error: programmeError } =
        await supabase
          .from("programmes")
          .insert([
            {
              slug: form.slug,
              name_en: form.name_en,
              name_ta: form.name_ta,
              heading_en: form.heading_en,
              heading_ta: form.heading_ta,
              description_en: form.description_en,
              description_ta: form.description_ta,
              objectives_en: form.objectives_en,
              objectives_ta: form.objectives_ta,
              sort_order: 99,
              is_active: true,
            },
          ])
          .select()
          .single();

      if (programmeError) {
        throw programmeError;
      }

      // --------------------------------------------------
      // 3. CREATE EVENT IF EVENT DATE IS PROVIDED
      // --------------------------------------------------

      if (event.event_date) {
        const { error: eventError } = await supabase
          .from("programme_events")
          .insert([
            {
              programme_id: programme.id,
              title_en: event.title_en,
              title_ta: event.title_ta,
              event_date: event.event_date,
              location_en: event.location_en,
              location_ta: event.location_ta,
              description_en: event.description_en,
              description_ta: event.description_ta,
              status: "active",
            },
          ]);

        if (eventError) {
          console.error("Event creation error:", eventError);

          setMessage(
            "Programme created, but the event could not be created."
          );

          setTimeout(() => {
            navigate("/admin");
          }, 1500);

          return;
        }
      }

      // --------------------------------------------------
      // 4. SUCCESS
      // --------------------------------------------------

      setMessage("Programme created successfully.");

      setTimeout(() => {
        navigate("/admin");
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f7f5",
        padding: "40px 20px 80px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/admin")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            marginBottom: "20px",
            padding: 0,
          }}
        >
          ← Back to Dashboard
        </button>

        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          Add New Programme
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#666",
            marginBottom: "35px",
          }}
        >
          Create a new YRF programme with its content and first event.
        </p>

        {error && (
          <div
            style={{
              background: "#ffe5e5",
              border: "1px solid #e5a0a0",
              padding: "15px 18px",
              borderRadius: "8px",
              marginBottom: "20px",
              color: "#a00000",
            }}
          >
            {error}
          </div>
        )}

        {message && (
          <div
            style={{
              background: "#e8f7e8",
              border: "1px solid #9ccc9c",
              padding: "15px 18px",
              borderRadius: "8px",
              marginBottom: "20px",
              color: "#236523",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* --------------------------------------------- */}
          {/* PROGRAMME TYPE */}
          {/* --------------------------------------------- */}

          <section style={cardStyle}>
            <h2 style={sectionTitle}>
              Programme Type
            </h2>

            <label style={labelStyle}>
              Select YRF Programme
            </label>

            <select
              value={form.programme_type}
              onChange={handleProgrammeTypeChange}
              style={inputStyle}
            >
              <option value="">
                Select YRF Programme
              </option>

              {PROGRAMME_TYPES.map((programme) => (
                <option
                  key={programme.slug}
                  value={programme.slug}
                >
                  {programme.name_en} — {programme.name_ta}
                </option>
              ))}
            </select>

            <p style={helpStyle}>
              Select the programme category first. The programme
              name and slug will be filled automatically.
            </p>
          </section>

          {/* --------------------------------------------- */}
          {/* PROGRAMME NAMES */}
          {/* --------------------------------------------- */}

          <section style={cardStyle}>
            <h2 style={sectionTitle}>
              Programme Names
            </h2>

            <div style={gridStyle}>
              <div>
                <label style={labelStyle}>
                  English Name
                </label>

                <input
                  type="text"
                  name="name_en"
                  value={form.name_en}
                  onChange={handleChange}
                  placeholder="YRF Kalvi"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Tamil Name
                </label>

                <input
                  type="text"
                  name="name_ta"
                  value={form.name_ta}
                  onChange={handleChange}
                  placeholder="YRF கல்வி"
                  style={inputStyle}
                />
              </div>
            </div>
          </section>

          {/* --------------------------------------------- */}
          {/* SLUG */}
          {/* --------------------------------------------- */}

          <section style={cardStyle}>
            <h2 style={sectionTitle}>
              Programme Slug
            </h2>

            <label style={labelStyle}>
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="kalvi"
              style={inputStyle}
            />

            <p style={helpStyle}>
              This is the technical URL name. Example:
              <strong> kalvi</strong>
            </p>
          </section>

          {/* --------------------------------------------- */}
          {/* HEADINGS */}
          {/* --------------------------------------------- */}

          <section style={cardStyle}>
            <h2 style={sectionTitle}>
              Programme Headings
            </h2>

            <div style={gridStyle}>
              <div>
                <label style={labelStyle}>
                  English Heading
                </label>

                <input
                  type="text"
                  name="heading_en"
                  value={form.heading_en}
                  onChange={handleChange}
                  placeholder="Programme heading"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Tamil Heading
                </label>

                <input
                  type="text"
                  name="heading_ta"
                  value={form.heading_ta}
                  onChange={handleChange}
                  placeholder="திட்டத்தின் தலைப்பு"
                  style={inputStyle}
                />
              </div>
            </div>
          </section>

          {/* --------------------------------------------- */}
          {/* DESCRIPTION */}
          {/* --------------------------------------------- */}

          <section style={cardStyle}>
            <h2 style={sectionTitle}>
              Programme Description
            </h2>

            <div style={gridStyle}>
              <div>
                <label style={labelStyle}>
                  English Description
                </label>

                <textarea
                  name="description_en"
                  value={form.description_en}
                  onChange={handleChange}
                  placeholder="Write the programme description..."
                  style={textareaStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Tamil Description
                </label>

                <textarea
                  name="description_ta"
                  value={form.description_ta}
                  onChange={handleChange}
                  placeholder="திட்டத்தின் விளக்கத்தை எழுதவும்..."
                  style={textareaStyle}
                />
              </div>
            </div>
          </section>

          {/* --------------------------------------------- */}
          {/* OBJECTIVES */}
          {/* --------------------------------------------- */}

          <section style={cardStyle}>
            <h2 style={sectionTitle}>
              Objectives
            </h2>

            <div style={gridStyle}>
              <div>
                <label style={labelStyle}>
                  English Objectives
                </label>

                <textarea
                  name="objectives_en"
                  value={form.objectives_en}
                  onChange={handleChange}
                  placeholder="Write objectives, one per line..."
                  style={textareaStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Tamil Objectives
                </label>

                <textarea
                  name="objectives_ta"
                  value={form.objectives_ta}
                  onChange={handleChange}
                  placeholder="நோக்கங்களை எழுதவும்..."
                  style={textareaStyle}
                />
              </div>
            </div>
          </section>

          {/* --------------------------------------------- */}
          {/* EVENT */}
          {/* --------------------------------------------- */}

          <section style={cardStyle}>
            <h2 style={sectionTitle}>
              First Programme Event
            </h2>

            <p style={helpStyle}>
              Add the first upcoming event for this programme.
              You can add more events later from Programme Events.
            </p>

            <div style={gridStyle}>
              <div>
                <label style={labelStyle}>
                  Event Title — English
                </label>

                <input
                  type="text"
                  name="title_en"
                  value={event.title_en}
                  onChange={handleEventChange}
                  placeholder="Education Awareness Camp"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Event Title — Tamil
                </label>

                <input
                  type="text"
                  name="title_ta"
                  value={event.title_ta}
                  onChange={handleEventChange}
                  placeholder="கல்வி விழிப்புணர்வு முகாம்"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={gridStyle}>
              <div>
                <label style={labelStyle}>
                  Event Date
                </label>

                <input
                  type="date"
                  name="event_date"
                  value={event.event_date}
                  onChange={handleEventChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Location — English
                </label>

                <input
                  type="text"
                  name="location_en"
                  value={event.location_en}
                  onChange={handleEventChange}
                  placeholder="Erode"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={gridStyle}>
              <div>
                <label style={labelStyle}>
                  Location — Tamil
                </label>

                <input
                  type="text"
                  name="location_ta"
                  value={event.location_ta}
                  onChange={handleEventChange}
                  placeholder="ஈரோடு"
                  style={inputStyle}
                />
              </div>

              <div></div>
            </div>

            <div style={gridStyle}>
              <div>
                <label style={labelStyle}>
                  Event Description — English
                </label>

                <textarea
                  name="description_en"
                  value={event.description_en}
                  onChange={handleEventChange}
                  placeholder="Describe the event..."
                  style={textareaStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Event Description — Tamil
                </label>

                <textarea
                  name="description_ta"
                  value={event.description_ta}
                  onChange={handleEventChange}
                  placeholder="நிகழ்வு விளக்கம்..."
                  style={textareaStyle}
                />
              </div>
            </div>
          </section>

          {/* --------------------------------------------- */}
          {/* PHOTOS */}
          {/* --------------------------------------------- */}

          <section style={cardStyle}>
            <h2 style={sectionTitle}>
              Programme Photos
            </h2>

            <p style={helpStyle}>
              Photos can be uploaded after creating the programme
              from the Programme Photos section.
            </p>
          </section>

          {/* --------------------------------------------- */}
          {/* STATUS */}
          {/* --------------------------------------------- */}

          <section style={cardStyle}>
            <h2 style={sectionTitle}>
              Programme Status
            </h2>

            <div
              style={{
                background: "#f5f5f3",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <strong>Active</strong>

              <p style={{ marginBottom: 0, color: "#666" }}>
                The programme will be created as active.
                Event status is automatically set to active.
              </p>
            </div>
          </section>

          {/* --------------------------------------------- */}
          {/* SUBMIT */}
          {/* --------------------------------------------- */}

          <button
            type="submit"
            disabled={saving}
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "16px 28px",
              fontSize: "17px",
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? "Creating Programme..." : "Create Programme"}
          </button>
        </form>
      </div>
    </main>
  );
}

const cardStyle = {
  background: "#fff",
  border: "1px solid #e2e2df",
  borderRadius: "14px",
  padding: "28px",
  marginBottom: "24px",
};

const sectionTitle = {
  fontSize: "26px",
  marginTop: 0,
  marginBottom: "24px",
};

const labelStyle = {
  display: "block",
  fontWeight: "600",
  marginBottom: "9px",
  fontSize: "16px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px 15px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  fontSize: "16px",
  background: "#fff",
};

const textareaStyle = {
  width: "100%",
  minHeight: "150px",
  boxSizing: "border-box",
  padding: "14px 15px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  fontSize: "16px",
  resize: "vertical",
  fontFamily: "Arial, sans-serif",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "22px",
  marginBottom: "22px",
};

const helpStyle = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "1.5",
};

export default AddProgramme;