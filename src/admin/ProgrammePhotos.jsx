import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function ProgrammePhotos() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [programme, setProgramme] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProgramme();
  }, [slug]);

  async function loadProgramme() {
    setLoading(true);
    setError("");

    const { data: programmeData, error: programmeError } =
      await supabase
        .from("programmes")
        .select("*")
        .eq("slug", slug)
        .single();

    if (programmeError) {
      console.error(programmeError);
      setError(programmeError.message);
      setLoading(false);
      return;
    }

    setProgramme(programmeData);

    await loadPhotos(programmeData.id);

    setLoading(false);
  }

  async function loadPhotos(programmeId) {
    const { data, error } = await supabase
      .from("programme_photos")
      .select("*")
      .eq("programme_id", programmeId)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error(error);
      setError(error.message);
      return;
    }

    setPhotos(data || []);
  }

  function getPhotoUrl(storagePath) {
    const { data } = supabase.storage
      .from("programme-media")
      .getPublicUrl(storagePath);

    return data.publicUrl;
  }

  async function uploadPhotos(event) {
    const files = Array.from(event.target.files || []);

    if (!files.length || !programme) return;

    setUploading(true);
    setError("");
    setMessage("");

    try {
      for (const [index, file] of files.entries()) {
        const fileExtension = file.name.split(".").pop();

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExtension}`;

        const storagePath = `${programme.slug}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("programme-media")
          .upload(storagePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { error: databaseError } = await supabase
          .from("programme_photos")
          .insert({
            programme_id: programme.id,
            storage_path: storagePath,
            caption_en: "",
            caption_ta: "",
            is_cover: photos.length === 0 && index === 0,
            sort_order: photos.length,
          });

        if (databaseError) {
          await supabase.storage
            .from("programme-media")
            .remove([storagePath]);

          throw databaseError;
        }
      }

      setMessage("Photo(s) uploaded successfully.");

      await loadPhotos(programme.id);

      event.target.value = "";
    } catch (err) {
      console.error(err);
      setError(err.message || "Photo upload failed.");
    }

    setUploading(false);
  }

  async function deletePhoto(photo) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this photo?"
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    const { error: storageError } = await supabase.storage
      .from("programme-media")
      .remove([photo.storage_path]);

    if (storageError) {
      console.error(storageError);
      setError(storageError.message);
      return;
    }

    const { error: databaseError } = await supabase
      .from("programme_photos")
      .delete()
      .eq("id", photo.id);

    if (databaseError) {
      console.error(databaseError);
      setError(databaseError.message);
      return;
    }

    setMessage("Photo deleted successfully.");

    await loadPhotos(programme.id);
  }

  async function setCover(photo) {
    setError("");
    setMessage("");

    const { error: resetError } = await supabase
      .from("programme_photos")
      .update({ is_cover: false })
      .eq("programme_id", programme.id);

    if (resetError) {
      console.error(resetError);
      setError(resetError.message);
      return;
    }

    const { error: coverError } = await supabase
      .from("programme_photos")
      .update({ is_cover: true })
      .eq("id", photo.id);

    if (coverError) {
      console.error(coverError);
      setError(coverError.message);
      return;
    }

    setMessage("Cover photo updated successfully.");

    await loadPhotos(programme.id);
  }

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          Loading photos...
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

          <h1 style={styles.title}>
            Programme Photos
          </h1>

          <p style={styles.subtitle}>
            {programme.name_en} · {programme.name_ta}
          </p>
        </div>

        {/* Upload */}
        <section style={styles.uploadBox}>
          <h2 style={styles.sectionTitle}>
            Upload Photos
          </h2>

          <p style={styles.helpText}>
            You can select multiple photos at once.
          </p>

          <label style={styles.uploadButton}>
            {uploading ? "Uploading..." : "🖼️ Choose Photos"}

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={uploadPhotos}
              disabled={uploading}
              style={{ display: "none" }}
            />
          </label>
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

        {/* Photos */}
        <section style={styles.photoSection}>
          <div style={styles.photoHeader}>
            <h2 style={styles.sectionTitle}>
              Photos
            </h2>

            <span style={styles.photoCount}>
              {photos.length} photo
              {photos.length !== 1 ? "s" : ""}
            </span>
          </div>

          {photos.length === 0 ? (
            <div style={styles.empty}>
              No photos uploaded yet.
            </div>
          ) : (
            <div style={styles.photoGrid}>
              {photos.map((photo) => (
                <div key={photo.id} style={styles.photoCard}>

                  <div style={styles.imageWrapper}>
                    <img
                      src={getPhotoUrl(photo.storage_path)}
                      alt={photo.caption_en || programme.name_en}
                      style={styles.image}
                    />

                    {photo.is_cover && (
                      <div style={styles.coverBadge}>
                        COVER PHOTO
                      </div>
                    )}
                  </div>

                  <div style={styles.photoActions}>

                    {!photo.is_cover && (
                      <button
                        onClick={() => setCover(photo)}
                        style={styles.coverButton}
                      >
                        ⭐ Set Cover
                      </button>
                    )}

                    {photo.is_cover && (
                      <div style={styles.coverText}>
                        ⭐ Current Cover
                      </div>
                    )}

                    <button
                      onClick={() => deletePhoto(photo)}
                      style={styles.deleteButton}
                    >
                      🗑️ Delete
                    </button>

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
    maxWidth: "1200px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "30px",
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

  uploadBox: {
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "21px",
    color: "#222",
  },

  helpText: {
    color: "#777",
    margin: "8px 0 20px",
  },

  uploadButton: {
    display: "inline-block",
    padding: "13px 22px",
    background: "#222",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
  },

  success: {
    background: "#e8f5e9",
    color: "#2e7d32",
    padding: "14px",
    borderRadius: "7px",
    marginBottom: "20px",
  },

  errorBox: {
    background: "#ffebee",
    color: "#c62828",
    padding: "14px",
    borderRadius: "7px",
    marginBottom: "20px",
  },

  photoSection: {
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "25px",
  },

  photoHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  photoCount: {
    color: "#777",
    fontSize: "14px",
  },

  photoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
  },

  photoCard: {
    border: "1px solid #e5e5e5",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fff",
  },

  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "190px",
    background: "#f1f1f1",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  coverBadge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "#222",
    color: "#fff",
    padding: "6px 9px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "bold",
  },

  photoActions: {
    padding: "12px",
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },

  coverButton: {
    flex: 1,
    padding: "9px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    background: "#fff",
    cursor: "pointer",
  },

  deleteButton: {
    padding: "9px 12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    background: "#fff",
    color: "#c62828",
    cursor: "pointer",
  },

  coverText: {
    flex: 1,
    fontSize: "13px",
    color: "#555",
  },

  empty: {
    textAlign: "center",
    padding: "50px 20px",
    color: "#888",
    border: "1px dashed #ccc",
    borderRadius: "8px",
  },

  secondaryButton: {
    padding: "12px 20px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#fff",
    cursor: "pointer",
  },
};

export default ProgrammePhotos;