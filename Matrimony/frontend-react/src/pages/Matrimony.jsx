import React, { useState, useEffect } from "react";
import { showToast } from "../utils/toast";

function Matrimony() {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get search results from sessionStorage (set by Home page search)
    const searchResults = sessionStorage.getItem("searchResults");
    if (searchResults) {
      try {
        const results = JSON.parse(searchResults);
        setProfiles(results || []);
        sessionStorage.removeItem("searchResults"); // Clear after using
      } catch (err) {
        console.error("Error parsing search results:", err);
      }
    }
    setLoading(false);
  }, []);

  const handleShortlist = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) return showToast("Please login first!", "error");

    try {
      const res = await fetch("http://localhost:5000/api/profiles/shortlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Added to shortlist! ❤", "success");
        // Move to next profile
        if (currentIndex < profiles.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          showToast("No more profiles to browse!", "info");
        }
      } else {
        showToast(data.message || "Failed to shortlist", "error");
      }
    } catch (err) {
      console.error("Error:", err);
      showToast("Error adding to shortlist", "error");
    }
  };

  const handleSkip = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      showToast("No more profiles!", "info");
    }
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>⏳ Loading...</div>;
  }

  if (profiles.length === 0) {
    return (
      <div style={{
        padding: "60px 20px",
        textAlign: "center",
        background: "#f9f9f9",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <h2 style={{ color: "#d4145a", fontSize: "32px", marginBottom: "15px" }}>
          🔍 No Search Results
        </h2>
        <p style={{ color: "#666", fontSize: "16px", marginBottom: "30px" }}>
          Go to Home page and search for a profile name, profession, or location
        </p>
        <a href="/" style={{
          padding: "12px 30px",
          background: "#d4145a",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "700",
          fontSize: "16px"
        }}>
          🏠 Go Back to Home
        </a>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div style={{
      padding: "40px 20px",
      maxWidth: "600px",
      margin: "0 auto",
      minHeight: "100vh"
    }}>
      <h2 style={{ color: "#d4145a", marginBottom: "10px", fontSize: "28px", fontWeight: "700" }}>
        💕 Browse Profiles
      </h2>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        {currentIndex + 1} of {profiles.length}
      </p>

      {/* Tinder-style Card */}
      <div style={{
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        overflow: "hidden",
        minHeight: "550px",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}>
        {/* Profile Image */}
        <div style={{
          height: "350px",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative"
        }}>
          {currentProfile.mediaPhotos && currentProfile.mediaPhotos.length > 0 && currentProfile.mediaPhotos[0]?.url ? (
            <img
              src={currentProfile.mediaPhotos[0].url}
              alt={currentProfile.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          ) : (
            <div style={{ textAlign: "center", color: "#999" }}>
              <div style={{ fontSize: "64px", marginBottom: "10px" }}>👤</div>
              <p>No photo available</p>
            </div>
          )}
          {/* Age Badge */}
          <div style={{
            position: "absolute",
            bottom: "15px",
            left: "15px",
            background: "rgba(212, 20, 90, 0.9)",
            color: "white",
            padding: "10px 16px",
            borderRadius: "25px",
            fontWeight: "700",
            fontSize: "18px"
          }}>
            {currentProfile.age || "N/A"}
          </div>
        </div>

        {/* Profile Info */}
        <div style={{
          padding: "25px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          {/* Name & Location */}
          <div>
            <h2 style={{
              margin: "0 0 8px 0",
              fontSize: "26px",
              fontWeight: "700",
              color: "#1a1a1a"
            }}>
              {currentProfile.name}
            </h2>
            <p style={{
              margin: "0 0 15px 0",
              fontSize: "16px",
              color: "#666"
            }}>
              📍 {currentProfile.location || "Not specified"}
            </p>
          </div>

          {/* Details */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px"
          }}>
            {currentProfile.profession && (
              <p style={{ margin: 0, fontSize: "15px", color: "#555" }}>
                💼 <strong>{currentProfile.profession}</strong>
              </p>
            )}
            {currentProfile.education && (
              <p style={{ margin: 0, fontSize: "15px", color: "#555" }}>
                🎓 <strong>{currentProfile.education}</strong>
              </p>
            )}
            {currentProfile.gender && (
              <p style={{ margin: 0, fontSize: "15px", color: "#555" }}>
                👥 <strong>{currentProfile.gender}</strong>
              </p>
            )}
            {currentProfile.patriotismValues && currentProfile.patriotismValues.length > 0 && (
              <p style={{ margin: 0, fontSize: "15px", color: "#d4145a" }}>
                🇮🇳 <strong>{currentProfile.patriotismValues.join(", ")}</strong>
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px"
          }}>
            <button
              onClick={handleSkip}
              style={{
                padding: "14px",
                background: "#e0e0e0",
                color: "#333",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                cursor: "pointer",
                fontWeight: "700",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => (e.target.style.background = "#d0d0d0")}
              onMouseLeave={(e) => (e.target.style.background = "#e0e0e0")}
            >
              ❌ Skip
            </button>
            <button
              onClick={() => handleShortlist(currentProfile._id)}
              style={{
                padding: "14px",
                background: "linear-gradient(135deg, #d4145a 0%, #ff6b9d 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                cursor: "pointer",
                fontWeight: "700",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              ❤️ Shortlist
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        marginTop: "30px",
        height: "6px",
        background: "#e0e0e0",
        borderRadius: "3px",
        overflow: "hidden"
      }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, #d4145a 0%, #ff6b9d 100%)",
          width: `${((currentIndex + 1) / profiles.length) * 100}%`,
          transition: "width 0.3s"
        }}></div>
      </div>
    </div>
  );
}

export default Matrimony;
