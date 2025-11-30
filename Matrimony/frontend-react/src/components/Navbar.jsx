import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav style={{
      background: "#1976d2",
      color: "#fff",
      padding: "0 20px",
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '60px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <i className="fas fa-ring"></i> Eduverse
      </Link>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '5px' }}>
          <i className="fas fa-home"></i> Home
        </Link>

        {token && (
          <>
            <Link to="/profile" style={{ color: "white", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '5px' }}>
              <i className="fas fa-user"></i> Profile
            </Link>
            <Link to="/matrimony" style={{ color: "white", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '5px' }}>
              <i className="fas fa-heart"></i> Matches
            </Link>
            <Link to="/shortlist" style={{ color: "white", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '5px' }}>
              <i className="fas fa-bookmark"></i> Shortlist
            </Link>
            <Link to="/media" style={{ color: "white", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '5px' }}>
              <i className="fas fa-image"></i> Media
            </Link>
            <Link to="/family" style={{ color: "white", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '5px' }}>
              <i className="fas fa-users"></i> Family
            </Link>
            <Link to="/membership" style={{ color: "white", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '5px' }}>
              <i className="fas fa-crown"></i> Premium
            </Link>
          </>
        )}

        {!token ? (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '5px' }}>
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
            <Link to="/register" style={{ color: "white", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '5px' }}>
              <i className="fas fa-user-plus"></i> Register
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} style={{
            background: "#ef5350", border: "none", color: "white",
            borderRadius: "6px", padding: "8px 15px", cursor: "pointer",
            display: 'flex', alignItems: 'center', gap: '5px',
            fontFamily: 'Poppins', fontWeight: '600', transition: 'all 0.3s'
          }} onMouseEnter={(e) => e.target.style.background = '#e53935'}
            onMouseLeave={(e) => e.target.style.background = '#ef5350'}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
