import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../utils/toast";

function Home() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("name"); // name, profession, location

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      showToast("Enter a search term", "error");
      return;
    }

    const authToken = localStorage.getItem("token");
    if (!authToken) {
      showToast("Please login to search", "error");
      navigate("/login");
      return;
    }

    try {
      const query = new URLSearchParams();
      if (searchType === "name") query.append("search", searchInput);
      if (searchType === "profession") query.append("profession", searchInput);
      if (searchType === "location") query.append("location", searchInput);

      const res = await fetch(`http://localhost:5000/api/profiles/search?${query.toString()}`, {
        headers: { "Authorization": `Bearer ${authToken}` }
      });

      if (res.ok) {
        const data = await res.json();
        // Store search results in session and navigate to matrimony page
        sessionStorage.setItem("searchResults", JSON.stringify(data));
        showToast(`Found ${data.length} profiles!`, "success");
        navigate("/matrimony");
      } else {
        showToast("Search failed", "error");
      }
    } catch (err) {
      console.error("Search error:", err);
      showToast("Error searching profiles", "error");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="home" style={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #d4145a 0%, #fbb03b 100%)",
          color: "white",
          padding: "80px 20px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "300px",
            height: "300px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%"
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-50px",
            width: "400px",
            height: "400px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%"
          }}
        ></div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "800",
              marginBottom: "15px",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }}
          >
            💍 Patriotic Matrimony & Family Matchmaking
          </h1>

          <p
            style={{
              fontSize: "28px",
              fontWeight: "600",
              marginBottom: "15px",
              fontStyle: "italic",
              letterSpacing: "1px"
            }}
          >
            "Patriotism • Values • Togetherness"
          </p>

          <p
            style={{
              fontSize: "18px",
              marginBottom: "50px",
              maxWidth: "600px",
              margin: "0 auto 50px",
              lineHeight: "1.6"
            }}
          >
            Connecting families with shared values, respect, and Rashtrabhakti.
          </p>

          {!token ? (
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "14px 40px",
                  fontSize: "16px",
                  background: "white",
                  color: "#d4145a",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
                }}
                onMouseEnter={(e) => (e.target.style.transform = "translateY(-3px)")}
                onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
              >
                🔐 Login
              </button>
              <button
                onClick={() => navigate("/register")}
                style={{
                  padding: "14px 40px",
                  fontSize: "16px",
                  background: "#fbb03b",
                  color: "#333",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
                }}
                onMouseEnter={(e) => (e.target.style.transform = "translateY(-3px)")}
                onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
              >
                ✍️ Register Now
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/matrimony")}
              style={{
                padding: "14px 40px",
                fontSize: "16px",
                background: "white",
                color: "#d4145a",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "700",
                transition: "all 0.3s",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
              }}
              onMouseEnter={(e) => (e.target.style.transform = "translateY(-3px)")}
              onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
            >
              💝 Browse Matches
            </button>
          )}
        </div>
      </div>

      {/* Search Section */}
      {token && (
        <div style={{ background: "white", padding: "40px 20px", boxShadow: "0 -5px 20px rgba(0,0,0,0.1)", marginTop: "-30px", position: "relative", zIndex: 10 }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333", fontSize: "28px", fontWeight: "700" }}>
              🔍 Find Your Perfect Match
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 150px 1fr", gap: "15px", alignItems: "flex-end" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#666" }}>Search By</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontFamily: "Poppins, sans-serif",
                    cursor: "pointer",
                    transition: "border-color 0.3s"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#d4145a")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                >
                  <option value="name">Name</option>
                  <option value="profession">Profession</option>
                  <option value="location">Location</option>
                </select>
              </div>

              <div></div>

              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Enter keyword..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{
                    flex: 1,
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
                <button
                  onClick={handleSearch}
                  style={{
                    padding: "12px 25px",
                    background: "#d4145a",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "16px",
                    whiteSpace: "nowrap",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#c41250")}
                  onMouseLeave={(e) => (e.target.style.background = "#d4145a")}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div style={{ padding: "60px 20px", background: "#f9f9f9" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", marginBottom: "50px", color: "#333", fontSize: "32px", fontWeight: "700" }}>
            Why Choose Patriotic Matrimony?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "25px"
            }}
          >
            {[
              { icon: "✅", title: "Verified Profiles", desc: "ID & reference verified members" },
              { icon: "🔒", title: "100% Safe & Secure", desc: "All chats monitored for safety" },
              { icon: "❤️", title: "Patriotic Values", desc: "Matching based on shared values" },
              { icon: "👨‍👩‍👧", title: "Family Connect", desc: "Video calls with parents included" },
              { icon: "📅", title: "Community Events", desc: "National & state matrimony meets" },
              { icon: "🏅", title: "Recognition", desc: "Celebrate inter-regional marriages" }
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "12px",
                  textAlign: "center",
                  boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
                  transition: "all 0.3s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(212, 20, 90, 0.2)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 15px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "15px" }}>{feature.icon}</div>
                <h3 style={{ color: "#d4145a", marginBottom: "10px", fontSize: "18px", fontWeight: "700" }}>
                  {feature.title}
                </h3>
                <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.6" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ padding: "60px 20px", background: "white" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", marginBottom: "50px", color: "#333", fontSize: "32px", fontWeight: "700" }}>
            How It Works?
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {[
              { num: "1", title: "Sign Up", desc: "Create your profile in minutes" },
              { num: "2", title: "Browse", desc: "Search & view compatible profiles" },
              { num: "3", title: "Connect", desc: "Send requests & get connected" },
              { num: "4", title: "Meet", desc: "Family video calls & events" }
            ].map((step, idx) => (
              <div key={idx} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(135deg, #d4145a 0%, #fbb03b 100%)",
                    color: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    fontWeight: "700",
                    margin: "0 auto 15px"
                  }}
                >
                  {step.num}
                </div>
                <h4 style={{ color: "#333", marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{step.title}</h4>
                <p style={{ color: "#666", fontSize: "14px" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!token && (
        <div
          style={{
            background: "linear-gradient(135deg, #d4145a 0%, #fbb03b 100%)",
            color: "white",
            padding: "60px 20px",
            textAlign: "center"
          }}
        >
          <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "20px" }}>
            Ready to Find Your Perfect Match?
          </h2>
          <p style={{ fontSize: "18px", marginBottom: "30px" }}>
            Join thousands of families finding happiness together
          </p>
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "14px 40px",
              fontSize: "16px",
              background: "white",
              color: "#d4145a",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
              transition: "all 0.3s",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
            }}
            onMouseEnter={(e) => (e.target.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            Join Now for Free
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
