import React, { useEffect, useState } from "react";
import "../index.css";

function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  };

  useEffect(() => {
    window.showToast = addToast;
  }, []);

  return (
    <div id="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <i className={
            t.type === "success" ? "fas fa-check-circle" :
              t.type === "error" ? "fas fa-times-circle" :
                "fas fa-info-circle"
          }></i>
          <span>{t.message}</span>
        </div>
      ))}

    </div>
  );
}

export default ToastContainer;
