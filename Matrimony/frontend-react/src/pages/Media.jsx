import React, { useState, useEffect, useRef } from "react";
import { showToast } from "../utils/toast";

function Media() {
  const [mediaList, setMediaList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/media", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMediaList(data || []);
      }
    } catch (err) {
      console.error("Error fetching media:", err);
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login first", "error");
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target.result;

        const res = await fetch("http://localhost:5000/api/media/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            filename: file.name,
            fileData: base64Data
          })
        });

        if (res.ok) {
          showToast("Photo uploaded successfully!", "success");
          fetchMedia();
          setUrlInput("");
          if (fileInputRef.current) fileInputRef.current.value = "";
        } else {
          showToast("Failed to upload photo", "error");
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Error:", err);
      showToast("Error uploading photo", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleAddMediaUrl = async () => {
    if (!urlInput.trim()) {
      showToast("Please enter a URL", "error");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login first", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/media/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ url: urlInput })
      });

      if (res.ok) {
        showToast("Media added!", "success");
        setUrlInput("");
        fetchMedia();
      }
    } catch (err) {
      console.error("Error:", err);
      showToast("Error adding media", "error");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "10px", color: "#d4145a", fontSize: "32px", fontWeight: "700" }}>
        📸 Media Gallery
      </h2>
      <p style={{ color: "#666", marginBottom: "30px", fontSize: "16px" }}>
        Upload photos and videos to showcase yourself on your profile.
      </p>

      {/* Upload Section */}
      <div style={{
        padding: "30px",
        background: "linear-gradient(135deg, #fef3e2 0%, #fff5f0 100%)",
        borderRadius: "12px",
        marginBottom: "40px",
        border: "2px dashed #d4145a"
      }}>
        <h3 style={{ color: "#d4145a", marginBottom: "20px", fontSize: "20px", fontWeight: "700" }}>
          📤 Upload Your Photos
        </h3>

        {/* File Upload */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{
            display: "block",
            padding: "40px",
            background: "white",
            borderRadius: "12px",
            border: "2px dashed #d4145a",
            cursor: "pointer",
            textAlign: "center",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#fdf8f3")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          onClick={() => fileInputRef.current?.click()}
          >
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>📸</div>
            <p style={{ margin: "0 0 5px 0", fontSize: "16px", fontWeight: "700", color: "#d4145a" }}>
              Click to upload or drag and drop
            </p>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
              PNG, JPG, GIF up to 10MB
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading}
              style={{ display: "none" }}
              onClick={(e) => e.stopPropagation()}
            />
          </label>
        </div>

        {uploading && (
          <div style={{
            padding: "15px",
            background: "#e3f2fd",
            borderRadius: "8px",
            marginBottom: "15px",
            color: "#1976d2",
            fontWeight: "600"
          }}>
            ⏳ Uploading your photo...
          </div>
        )}

        {/* URL Input Alternative */}
        <div style={{ borderTop: "2px solid #ddd", paddingTop: "20px" }}>
          <p style={{ margin: "0 0 15px 0", color: "#666", fontSize: "14px", fontWeight: "600" }}>
            OR enter image URL
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              disabled={uploading}
              style={{
                flex: 1,
                padding: "12px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "Poppins, sans-serif",
                transition: "border-color 0.3s"
              }}
              onFocus={(e) => (e.target.style.borderColor = "#d4145a")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              onKeyPress={(e) => e.key === "Enter" && handleAddMediaUrl()}
            />
            <button
              onClick={handleAddMediaUrl}
              disabled={uploading}
              style={{
                padding: "12px 30px",
                background: "#d4145a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: uploading ? "not-allowed" : "pointer",
                fontWeight: "700",
                transition: "all 0.3s",
                opacity: uploading ? 0.6 : 1
              }}
              onMouseEnter={(e) => !uploading && (e.target.style.background = "#c41250")}
              onMouseLeave={(e) => !uploading && (e.target.style.background = "#d4145a")}
            >
              Add URL
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <h3 style={{ color: "#d4145a", marginBottom: "20px", fontSize: "20px", fontWeight: "700" }}>
        🖼️ Your Gallery
      </h3>

      {mediaList.length === 0 ? (
        <div style={{
          padding: "60px 20px",
          textAlign: "center",
          background: "#f9f9f9",
          borderRadius: "12px",
          border: "2px solid #ddd"
        }}>
          <p style={{ color: "#999", fontSize: "16px", margin: "0 0 10px 0" }}>📭 No photos uploaded yet</p>
          <p style={{ color: "#ccc", fontSize: "14px", margin: 0 }}>
            Upload your first photo to make your profile more attractive
          </p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {mediaList.map((item, idx) => (
            <div key={idx} style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              background: "#fff",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
            >
              {item.url && item.url.startsWith("data:") ? (
                <img
                  src={item.url}
                  alt={`Gallery ${idx}`}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              ) : item.url ? (
                <img
                  src={item.url}
                  alt={`Media ${idx}`}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              ) : null}
              <div style={{
                padding: "12px",
                background: "#fff",
                borderTop: "1px solid #ddd"
              }}>
                <p style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#999",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  {item.filename || `Photo ${idx + 1}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Box */}
      {mediaList.length > 0 && (
        <div style={{
          marginTop: "30px",
          padding: "15px",
          background: "#f0f7ff",
          borderLeft: "4px solid #1976d2",
          borderRadius: "8px"
        }}>
          <p style={{ margin: 0, fontSize: "14px", color: "#1976d2" }}>
            💡 <strong>Tip:</strong> Users with profile photos get more matches! Upload clear, recent photos for best results.
          </p>
        </div>
      )}
    </div>
  );
}

export default Media;
