import React, { useState, useEffect } from "react";
import { showToast } from "../utils/toast";

function Profile() {
  const [form, setForm] = useState({ 
    name: "", 
    age: "", 
    gender: "", 
    education: "", 
    profession: "", 
    location: "", 
    patriotismValues: [] 
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/users/profile", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setForm({
          name: data.name || "",
          age: data.age || "",
          gender: data.gender || "",
          education: data.education || "",
          profession: data.profession || "",
          location: data.location || "",
          patriotismValues: data.patriotismValues || []
        });
      }
    };
    fetchProfile();
  }, []);

  const saveProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return showToast("Please login first!", "error");

    const res = await fetch("http://localhost:5000/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) showToast("Profile saved successfully!", "success");
    else showToast(data.message, "error");
  };

  const togglePatriotismValue = (value) => {
    setForm(prev => {
      const arr = prev.patriotismValues || [];
      if (arr.includes(value)) {
        return { ...prev, patriotismValues: arr.filter(v => v !== value) };
      } else {
        return { ...prev, patriotismValues: [...arr, value] };
      }
    });
  };

  return (
    <div className="profile">
      <h2>Update Profile</h2>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <input 
          type="text" 
          placeholder="Full Name" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        
        <input 
          type="number" 
          placeholder="Age" 
          value={form.age} 
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />

        <select 
          value={form.gender} 
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', width: '100%', marginBottom: '15px' }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input 
          type="text" 
          placeholder="Education" 
          value={form.education} 
          onChange={(e) => setForm({ ...form, education: e.target.value })}
        />

        <input 
          type="text" 
          placeholder="Profession" 
          value={form.profession} 
          onChange={(e) => setForm({ ...form, profession: e.target.value })}
        />

        <input 
          type="text" 
          placeholder="Location (City/State)" 
          value={form.location} 
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>Patriotism Values:</label>
          {['Seva', 'Discipline', 'Nation First'].map(value => (
            <label key={value} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <input 
                type="checkbox" 
                checked={(form.patriotismValues || []).includes(value)}
                onChange={() => togglePatriotismValue(value)}
              />
              {value}
            </label>
          ))}
        </div>

        <button onClick={saveProfile} style={{ width: '100%' }}>Save Profile</button>
      </div>
    </div>
  );
}

export default Profile;
