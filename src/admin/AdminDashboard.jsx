import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
function getProgrammeStatus(events = []) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!events.length) {
    return {
      label: "No Events",
      type: "none",
    };
  }

  const dates = events
    .map((event) => new Date(event.event_date))
    .filter((date) => !isNaN(date));

  const hasToday = dates.some((date) => {
    date.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
  });

  if (hasToday) {
    return {
      label: "Happening Today",
      type: "today",
    };
  }

  const hasUpcoming = dates.some((date) => date > today);

  if (hasUpcoming) {
    return {
      label: "Upcoming",
      type: "upcoming",
    };
  }

  return {
    label: "Completed",
    type: "completed",
  };
}

function AdminDashboard() {
  const navigate = useNavigate();

  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    checkUser();
    loadProgrammes();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      navigate("/admin/login");
    }
  }

  async function loadProgrammes() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
  .from("programmes")
  .select(`
    *,
    programme_events (
      id,
      event_date
    )
  `)
  .order("name_en");

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
     setProgrammes(
  (data || []).map((programme) => ({
    ...programme,
    status: getProgrammeStatus(programme.programme_events || []).type,
  }))
);
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7f5",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              color: "#222",
            }}
          >
            YRF Admin Panel
          </h1>
          <button
  onClick={() => navigate("/admin/programme/add")}
  style={{
    marginTop: "20px",
    padding: "12px 20px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
  }}
>
  + Add Programme
</button>

          <p
            style={{
              marginTop: "8px",
              color: "#777",
            }}
          >
            Manage programmes, photos and events
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            padding: "11px 20px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            background: "#fff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {loading && (
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            Loading programmes...
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#fff0f0",
              color: "#b00020",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <strong>Unable to load programmes</strong>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {programmes.map((programme) => (
              <div
                key={programme.id}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e5e5",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                {/* Programme name */}
                <h2
                  style={{
                    margin: "0 0 6px",
                    fontSize: "22px",
                    color: "#222",
                  }}
                >
                  {programme.name_en}
                </h2>

                <div
                  style={{
                    fontSize: "17px",
                    color: "#666",
                    marginBottom: "18px",
                  }}
                >
                  {programme.name_ta}
                </div>

                {/* Status */}
                <div
                  style={{
                    display: "inline-block",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    background:
                      programme.status === "active"
                        ? "#e8f5e9"
                        : "#eeeeee",
                    color:
                      programme.status === "active"
                        ? "#2e7d32"
                        : "#666",
                    fontSize: "12px",
                    marginBottom: "20px",
                  }}
                >
                  {programme.status || "active"}
                </div>

                {/* Buttons */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  <button
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      background: "#fafafa",
                      cursor: "pointer",
                    }}
                    onClick={() =>
  navigate(`/admin/programme/${programme.slug}`)
}
                  >
                    ✏️ Edit Content
                  </button>

                  <button
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      background: "#fafafa",
                      cursor: "pointer",
                    }}
                    onClick={() =>
  navigate(`/admin/programme/${programme.slug}/photos`)
}
                  >
                    🖼️ Photos
                  </button>

                  <button
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      background: "#fafafa",
                      cursor: "pointer",
                    }}
                    onClick={() =>
  navigate(`/admin/programme/${programme.slug}/events`)
}
                  >
                    📅 Events
                  </button>

                  <button
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      background: "#fafafa",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open(
                        `/programmes/${programme.slug}`,
                        "_blank"
                      )
                    }
                  >
                    👁️ View Website
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;