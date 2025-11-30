import React, { useState, useEffect } from "react";
import { showToast } from "../utils/toast";

function Family() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showRecognitionModal, setShowRecognitionModal] = useState(false);
  
  const [familyData, setFamilyData] = useState({
    fatherProfession: "Not specified",
    motherProfession: "Not specified",
    siblings: "Not specified",
    familyValues: "Not specified"
  });

  const [editFamilyForm, setEditFamilyForm] = useState({
    fatherProfession: "",
    motherProfession: "",
    siblings: "",
    familyValues: ""
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchFamilyBackground();
  }, []);

  const fetchFamilyBackground = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/profiles/family/background", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setFamilyData(data || {
          fatherProfession: "Not specified",
          motherProfession: "Not specified",
          siblings: "Not specified",
          familyValues: "Not specified"
        });
      }
    } catch (err) {
      console.error("Error fetching family data:", err);
    }
  };

  const handleEditFamilyClick = () => {
    setEditFamilyForm(familyData);
    setShowFamilyModal(true);
  };

  const handleSaveFamilyDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login first", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/profiles/family/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editFamilyForm)
      });

      if (res.ok) {
        showToast("Family details updated!", "success");
        setFamilyData(editFamilyForm);
        setShowFamilyModal(false);
      } else {
        showToast("Failed to save family details", "error");
      }
    } catch (err) {
      console.error("Error:", err);
      showToast("Error saving family details", "error");
    }
  };

  const handleStartCall = () => {
    setShowVideoModal(true);
    showToast("Video call feature coming soon!", "info");
  };

  const handleRegisterEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
    showToast(`Registration for ${event.name} initiated`, "success");
  };

  const handleApplyRecognition = () => {
    setShowRecognitionModal(true);
  };

  return (
    <div className="family" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "15px", color: "#d4145a", fontSize: "32px", fontWeight: "700" }}>
        👨‍👩‍👦 Family Connect & Events
      </h2>
      <p style={{ color: "#666", marginBottom: "30px", fontSize: "16px" }}>
        Connect with the entire family. Share family details and schedule video meets with parents/guardians.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }}>
        {/* Family Background */}
        <div style={{ padding: "25px", background: "white", borderRadius: "12px", boxShadow: "0 2px 15px rgba(0,0,0,0.08)" }}>
          <h3 style={{ color: "#d4145a", marginBottom: "20px", fontSize: "20px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
            👨‍👩‍👧‍👦 Family Background
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            <div style={{ padding: "12px", background: "#f9f9f9", borderRadius: "8px" }}>
              <label style={{ fontSize: "14px", color: "#666", fontWeight: "600" }}>Father's Profession</label>
              <p style={{ margin: "5px 0 0 0", color: "#333", fontSize: "16px" }}>{familyData.fatherProfession}</p>
            </div>

            <div style={{ padding: "12px", background: "#f9f9f9", borderRadius: "8px" }}>
              <label style={{ fontSize: "14px", color: "#666", fontWeight: "600" }}>Mother's Profession</label>
              <p style={{ margin: "5px 0 0 0", color: "#333", fontSize: "16px" }}>{familyData.motherProfession}</p>
            </div>

            <div style={{ padding: "12px", background: "#f9f9f9", borderRadius: "8px" }}>
              <label style={{ fontSize: "14px", color: "#666", fontWeight: "600" }}>Siblings</label>
              <p style={{ margin: "5px 0 0 0", color: "#333", fontSize: "16px" }}>{familyData.siblings}</p>
            </div>

            <div style={{ padding: "12px", background: "#f9f9f9", borderRadius: "8px" }}>
              <label style={{ fontSize: "14px", color: "#666", fontWeight: "600" }}>Family Values</label>
              <p style={{ margin: "5px 0 0 0", color: "#333", fontSize: "16px" }}>{familyData.familyValues}</p>
            </div>
          </div>

          <button
            onClick={handleEditFamilyClick}
            style={{
              width: "100%",
              padding: "12px",
              background: "#d4145a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => (e.target.style.background = "#c41250")}
            onMouseLeave={(e) => (e.target.style.background = "#d4145a")}
          >
            ✏️ Edit Family Details
          </button>
        </div>

        {/* Video Meeting */}
        <div style={{ padding: "25px", background: "white", borderRadius: "12px", boxShadow: "0 2px 15px rgba(0,0,0,0.08)" }}>
          <h3 style={{ color: "#d4145a", marginBottom: "15px", fontSize: "20px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
            📹 Family Video Meet
          </h3>

          <p style={{ color: "#666", marginBottom: "15px", lineHeight: "1.6" }}>
            Arrange a video call with your match's family. Our secure video platform ensures privacy and safety.
          </p>

          <div style={{ marginTop: "15px", padding: "15px", background: "#fef3e2", borderRadius: "8px", marginBottom: "20px", borderLeft: "4px solid #fbb03b" }}>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
              💡 Family video calls help both families know each other better before taking major decisions.
            </p>
          </div>

          <button
            onClick={handleStartCall}
            style={{
              width: "100%",
              padding: "12px",
              background: "#fbb03b",
              color: "#333",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => (e.target.style.background = "#f5a500")}
            onMouseLeave={(e) => (e.target.style.background = "#fbb03b")}
          >
            📞 Request Family Call
          </button>
        </div>

        {/* Community Events */}
        <div style={{ padding: "25px", background: "white", borderRadius: "12px", boxShadow: "0 2px 15px rgba(0,0,0,0.08)" }}>
          <h3 style={{ color: "#d4145a", marginBottom: "20px", fontSize: "20px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
            📅 Community Events
          </h3>

          {[
            { id: 1, name: "National Patriotic Matrimony Meet", location: "Delhi", date: "December", fee: "₹1000" },
            { id: 2, name: "State-level Family Meets", location: "Pan-India", date: "Quarterly", fee: "₹500" }
          ].map(event => (
            <div key={event.id} style={{ marginBottom: "15px", padding: "15px", background: "#f9f9f9", borderRadius: "8px", borderLeft: "4px solid #d4145a" }}>
              <h4 style={{ color: "#d4145a", marginBottom: "5px", fontSize: "16px", fontWeight: "700" }}>{event.name}</h4>
              <p style={{ margin: "3px 0", fontSize: "14px", color: "#666" }}>📍 {event.location}</p>
              <p style={{ margin: "3px 0", fontSize: "14px", color: "#666" }}>📅 {event.date}</p>
              <p style={{ margin: "8px 0 0 0", fontSize: "16px", color: "#d4145a", fontWeight: "700" }}>💰 {event.fee}</p>
            </div>
          ))}

          <button
            onClick={() => handleRegisterEvent({ name: "Matrimony Meet" })}
            style={{
              width: "100%",
              padding: "12px",
              background: "#d4145a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
              transition: "all 0.3s",
              marginTop: "15px"
            }}
            onMouseEnter={(e) => (e.target.style.background = "#c41250")}
            onMouseLeave={(e) => (e.target.style.background = "#d4145a")}
          >
            ✅ Register for Event
          </button>
        </div>

        {/* Family Recognition */}
        <div style={{ padding: "25px", background: "white", borderRadius: "12px", boxShadow: "0 2px 15px rgba(0,0,0,0.08)" }}>
          <h3 style={{ color: "#d4145a", marginBottom: "15px", fontSize: "20px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
            🏅 Family Recognition
          </h3>

          <p style={{ color: "#666", marginBottom: "20px", lineHeight: "1.6" }}>
            Get recognized in our Media Hub for inter-regional marriages and patriotic values.
          </p>

          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "14px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#fbb03b", fontSize: "20px" }}>⭐</span>
              <span style={{ color: "#666" }}>Featured in Media Hub</span>
            </p>
            <p style={{ fontSize: "14px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#d4145a", fontSize: "20px" }}>❤️</span>
              <span style={{ color: "#666" }}>Inter-regional Marriage Celebration</span>
            </p>
            <p style={{ fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#66bb6a", fontSize: "20px" }}>🎖️</span>
              <span style={{ color: "#666" }}>Patriotic Family Award</span>
            </p>
          </div>

          <button
            onClick={handleApplyRecognition}
            style={{
              width: "100%",
              padding: "12px",
              background: "#66bb6a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => (e.target.style.background = "#5aa854")}
            onMouseLeave={(e) => (e.target.style.background = "#66bb6a")}
          >
            🏆 Apply for Recognition
          </button>
        </div>
      </div>

      {/* Edit Family Modal */}
      {showFamilyModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000
        }}>
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "40px",
            maxWidth: "500px",
            width: "90%",
            maxHeight: "80vh",
            overflowY: "auto",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
          }}>
            <h2 style={{ color: "#d4145a", marginBottom: "25px", fontSize: "24px", fontWeight: "700" }}>✏️ Edit Family Details</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "25px" }}>
              <input
                type="text"
                placeholder="Father's Profession"
                value={editFamilyForm.fatherProfession}
                onChange={(e) => setEditFamilyForm({ ...editFamilyForm, fatherProfession: e.target.value })}
                style={{
                  padding: "12px",
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontFamily: "Poppins, sans-serif",
                  transition: "border-color 0.3s"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#d4145a")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />

              <input
                type="text"
                placeholder="Mother's Profession"
                value={editFamilyForm.motherProfession}
                onChange={(e) => setEditFamilyForm({ ...editFamilyForm, motherProfession: e.target.value })}
                style={{
                  padding: "12px",
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontFamily: "Poppins, sans-serif",
                  transition: "border-color 0.3s"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#d4145a")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />

              <input
                type="text"
                placeholder="Number of Siblings"
                value={editFamilyForm.siblings}
                onChange={(e) => setEditFamilyForm({ ...editFamilyForm, siblings: e.target.value })}
                style={{
                  padding: "12px",
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontFamily: "Poppins, sans-serif",
                  transition: "border-color 0.3s"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#d4145a")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />

              <textarea
                placeholder="Family Values (e.g., Seva, Discipline, Nation First)"
                value={editFamilyForm.familyValues}
                onChange={(e) => setEditFamilyForm({ ...editFamilyForm, familyValues: e.target.value })}
                style={{
                  padding: "12px",
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontFamily: "Poppins, sans-serif",
                  minHeight: "100px",
                  resize: "vertical",
                  transition: "border-color 0.3s"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#d4145a")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleSaveFamilyDetails}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#d4145a",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => (e.target.style.background = "#c41250")}
                onMouseLeave={(e) => (e.target.style.background = "#d4145a")}
              >
                Save Changes
              </button>

              <button
                onClick={() => setShowFamilyModal(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#ddd",
                  color: "#333",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => (e.target.style.background = "#ccc")}
                onMouseLeave={(e) => (e.target.style.background = "#ddd")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Call Modal */}
      {showVideoModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000
        }}>
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "40px",
            maxWidth: "400px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
          }}>
            <h2 style={{ color: "#d4145a", marginBottom: "20px", fontSize: "28px" }}>📹 Video Call</h2>
            <p style={{ color: "#666", margin: "15px 0", fontSize: "16px", lineHeight: "1.6" }}>
              This feature is coming soon! We're integrating secure video calling powered by industry-leading providers.
            </p>

            <button
              onClick={() => setShowVideoModal(false)}
              style={{
                padding: "12px 30px",
                background: "#d4145a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "700",
                marginTop: "20px",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => (e.target.style.background = "#c41250")}
              onMouseLeave={(e) => (e.target.style.background = "#d4145a")}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Event Registration Modal */}
      {showEventModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000
        }}>
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "40px",
            maxWidth: "400px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
          }}>
            <h2 style={{ color: "#d4145a", marginBottom: "20px", fontSize: "24px", fontWeight: "700" }}>✅ Event Registration</h2>
            <p style={{ color: "#666", margin: "15px 0", fontSize: "16px", lineHeight: "1.6" }}>
              Thank you for your interest! Your registration request has been recorded. We'll send you details shortly.
            </p>

            <button
              onClick={() => setShowEventModal(false)}
              style={{
                padding: "12px 30px",
                background: "#66bb6a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "700",
                marginTop: "20px",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => (e.target.style.background = "#5aa854")}
              onMouseLeave={(e) => (e.target.style.background = "#66bb6a")}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Recognition Modal */}
      {showRecognitionModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000
        }}>
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "40px",
            maxWidth: "450px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
          }}>
            <h2 style={{ color: "#d4145a", marginBottom: "20px", fontSize: "24px", fontWeight: "700" }}>🏆 Apply for Recognition</h2>

            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#666", marginBottom: "15px", lineHeight: "1.6" }}>
                We celebrate inter-regional marriages and patriotic families! Apply to be featured in our Media Hub.
              </p>

              <div style={{
                background: "#f0f7ff",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "15px",
                borderLeft: "4px solid #d4145a"
              }}>
                <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>
                  Your story of patriotism and family values will inspire thousands of families across India.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => {
                  showToast("Application submitted! We'll review and get back to you.", "success");
                  setShowRecognitionModal(false);
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#66bb6a",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => (e.target.style.background = "#5aa854")}
                onMouseLeave={(e) => (e.target.style.background = "#66bb6a")}
              >
                Apply Now
              </button>

              <button
                onClick={() => setShowRecognitionModal(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#ddd",
                  color: "#333",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => (e.target.style.background = "#ccc")}
                onMouseLeave={(e) => (e.target.style.background = "#ddd")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Family;
