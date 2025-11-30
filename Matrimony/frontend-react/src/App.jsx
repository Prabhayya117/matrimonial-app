import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ToastContainer from "./components/ToastContainer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Matrimony from "./pages/Matrimony";
import Shortlist from "./pages/Shortlist";
import Media from "./pages/Media";
import Family from "./pages/Family";
import Membership from "./pages/Membership";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/matrimony" element={<Matrimony />} />
        <Route path="/shortlist" element={<Shortlist />} />
        <Route path="/media" element={<Media />} />
        <Route path="/family" element={<Family />} />
        <Route path="/membership" element={<Membership />} />
      </Routes>
    </Router>
  );
}

export default App;
