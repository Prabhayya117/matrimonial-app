import React, { useState, useEffect } from "react";
import { showToast } from "../utils/toast";

function Shortlist() {
  const [shortlist, setShortlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShortlist();
  }, []);

  const fetchShortlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login first!", "error");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/profiles/shortlist", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setShortlist(data || []);
      } else {
        showToast("Failed to fetch shortlist", "error");
      }
    } catch (err) {
      console.error("Error fetching shortlist:", err);
      showToast("Error loading shortlist", "error");
    }
    setLoading(false);
  };

  const handleRemoveFromShortlist = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) return showToast("Please login first!", "error");

    try {
      const res = await fetch("http://localhost:5000/api/profiles/shortlist/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
      });

      if (res.ok) {
        showToast("Removed from shortlist", "success");
        // Remove from state
        setShortlist(shortlist.filter(p => p._id !== userId));
      } else {
        showToast("Failed to remove", "error");
      }
    } catch (err) {
      console.error("Error:", err);
      showToast("Error removing from shortlist", "error");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        ⏳ Loading your shortlist...
      </div>
    );
  }

  return (
    <div style={{
      padding: "40px 20px",
      maxWidth: "1200px",
      margin: "0 auto",
      minHeight: "100vh"
    }}>
      <h2 style={{
        color: "#d4145a",
        marginBottom: "10px",
        fontSize: "32px",
        fontWeight: "700"
      }}>
        ❤️ Your Shortlist
      </h2>
      <p style={{ color: "#666", marginBottom: "30px", fontSize: "16px" }}>
        {shortlist.length} profiles saved
      </p>

      {shortlist.length === 0 ? (
        <div style={{
          padding: "60px 20px",
          textAlign: "center",
          background: "#f9f9f9",
          borderRadius: "12px",
          border: "2px solid #ddd"
        }}>
          <p style={{ color: "#999", fontSize: "18px", margin: "0 0 10px 0" }}>
            📭 Your shortlist is empty
          </p>
          <p style={{ color: "#ccc", fontSize: "14px", margin: 0 }}>
            Go to Home page and search for profiles to add them to your shortlist
          </p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "25px"
        }}>
          {shortlist.map((profile) => (
            <div key={profile._id} style={{
              background: "white",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "all 0.3s",
              cursor: "pointer",
              transform: "scale(1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
            }}
            >
              {/* Profile Photo */}
              <div style={{
                height: "250px",
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative"
              }}>
                {profile.mediaPhotos && profile.mediaPhotos.length > 0 && profile.mediaPhotos[0]?.url ? (
                  <img
                    src={profile.mediaPhotos[0].url}
                    alt={profile.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                ) : (
                  <div style={{ textAlign: "center", color: "#999" }}>
                    <div style={{ fontSize: "48px" }}>👤</div>
                  </div>
                )}
                {/* Age Badge */}
                <div style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  background: "rgba(212, 20, 90, 0.9)",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: "20px",
                  fontWeight: "700",
                  fontSize: "16px"
                }}>
                  {profile.age || "N/A"}
                </div>
              </div>

              {/* Profile Info */}
              <div style={{ padding: "20px" }}>
                <h3 style={{
                  margin: "0 0 8px 0",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#1a1a1a"
                }}>
                  {profile.name}
                </h3>

                <p style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  color: "#666"
                }}>
                  📍 {profile.location || "Not specified"}
                </p>

                {profile.profession && (
                  <p style={{
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    color: "#555"
                  }}>
                    💼 {profile.profession}
                  </p>
                )}

                {profile.education && (
                  <p style={{
                    margin: "0 0 12px 0",
                    fontSize: "14px",
                    color: "#555"
                  }}>
                    🎓 {profile.education}
                  </p>
                )}

                {/* Action Buttons */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginTop: "15px"
                }}>
                  <button
                    onClick={() => handleRemoveFromShortlist(profile._id)}
                    style={{
                      padding: "10px",
                      background: "#f0f0f0",
                      color: "#333",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "14px",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => (e.target.style.background = "#e0e0e0")}
                    onMouseLeave={(e) => (e.target.style.background = "#f0f0f0")}
                  >
                    ❌ Remove
                  </button>
                  <button
                    onClick={() => showToast("Message feature coming soon!", "info")}
                    style={{
                      padding: "10px",
                      background: "#d4145a",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "14px",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => (e.target.style.background = "#c41250")}
                    onMouseLeave={(e) => (e.target.style.background = "#d4145a")}
                  >
                    💬 Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shortlist;
