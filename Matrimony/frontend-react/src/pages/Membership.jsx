import React, { useState } from "react";

function Membership() {
  const [showModal, setShowModal] = useState(false);

  const plans = [
    { name: "Basic", price: "Free", features: ["Browse profiles", "See limited matches", "Basic profile"] },
    { name: "Premium", price: "₹999/mo", features: ["Unlimited browse", "Unlimited matches", "Priority support", "Advanced filters"] },
    { name: "VIP", price: "₹1999/mo", features: ["All Premium features", "Verified badge", "Exclusive events", "Personal matchmaker"] }
  ];

  return (
    <div className="membership">
      <h2>Membership Plans</h2>
      <p>Choose a plan that works best for you.</p>
      <div className="plans-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {plans.map((plan, index) => (
          <div key={index} className="plan-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', textAlign: 'center', background: plan.name === 'Premium' ? '#f0f7ff' : '#fff' }}>
            <h3>{plan.name}</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2', margin: '10px 0' }}>{plan.price}</p>
            <ul style={{ textAlign: 'left', margin: '20px 0', listStyle: 'none' }}>
              {plan.features.map((feature, idx) => (
                <li key={idx} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <i className="fas fa-check" style={{ color: '#66bb6a', marginRight: '8px' }}></i>
                  {feature}
                </li>
              ))}
            </ul>
            <button onClick={() => setShowModal(true)} style={{ width: '100%', marginTop: '15px' }}>💳 Choose Plan</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: '#fff', borderRadius: '12px', padding: '40px', maxWidth: '400px',
            textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
          }}>
            <h2>💳 Payment Gateway</h2>
            <p style={{ fontSize: '18px', color: '#666', marginTop: '15px', marginBottom: '30px' }}>
              This feature will be available very soon! We're integrating secure payment options for you.
            </p>
            <button onClick={() => setShowModal(false)} style={{
              background: '#1976d2', color: '#fff', border: 'none', padding: '12px 30px',
              borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600'
            }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Membership;
