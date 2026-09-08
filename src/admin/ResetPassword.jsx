import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Password updated successfully.");

    setTimeout(() => {
      navigate("/admin/login");
    }, 1500);

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f7f3",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#fff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          Set New Password
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Yuvaraja Foundation Admin
        </p>

        <form onSubmit={handleReset}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            New Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px 14px",
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "15px",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px 14px",
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "15px",
            }}
          />

          {error && (
            <div
              style={{
                background: "#fdecec",
                color: "#c62828",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          {message && (
            <div
              style={{
                background: "#eaf7ef",
                color: "#217a42",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              background: "#11658a",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;