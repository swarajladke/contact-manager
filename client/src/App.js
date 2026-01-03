import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// API URL - uses environment variable in production, localhost in development
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(API_URL);
      setContacts(res.data);
    } catch (err) {
      console.error("Fetch Error:", err.response || err.message);
    }
  };

  const validate = () => {
    return (
      formData.name && formData.phone && /\S+@\S+\.\S+/.test(formData.email)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Sending data to Render
      await axios.post(API_URL, formData);
      setFormData({ name: "", email: "", phone: "", message: "" });
      fetchContacts(); 
      alert("Contact Saved Successfully!");
    } catch (err) {
      // Detailed error logging to browser console
      console.error("Submit Error:", err.response || err.message);
      alert(`Error saving contact: ${err.response?.data?.message || "Check server logs"}`);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchContacts();
    } catch (err) {
      console.error("Delete Error:", err.response || err.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <span role="img" aria-label="contacts">📇</span> Contact Manager
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder=" "
            required
            autoComplete="off"
          />
          <label htmlFor="name" className="form-label">Name *</label>
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder=" "
            required
            autoComplete="off"
          />
          <label htmlFor="email" className="form-label">Email *</label>
        </div>
        <div className="form-group">
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder=" "
            required
            autoComplete="off"
          />
          <label htmlFor="phone" className="form-label">Phone *</label>
        </div>
        <div className="form-group">
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder=" "
            rows="3"
          />
          <label htmlFor="message" className="form-label">Message</label>
        </div>
        <button type="submit" disabled={!validate() || loading}>
          {loading ? "Submitting..." : "Add Contact"}
        </button>
      </form>

      <div className="section-divider"></div>

      <div className="section-header">
        <span className="section-icon">👥</span>
        <h3>Saved Contacts</h3>
        {contacts.length > 0 && <span className="contact-count">{contacts.length}</span>}
      </div>
      <div className="contact-list">
        {contacts.length === 0 && !loading && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p className="empty-text">No contacts yet</p>
            <p className="empty-subtext">Add your first contact above to get started!</p>
          </div>
        )}
        {contacts.map((c, index) => (
          <div key={c._id} className="contact-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="contact-avatar">
              {c.name.charAt(0).toUpperCase()}
            </div>
            <div className="contact-info">
              <div className="contact-name-row">
                <h4 className="contact-name">{c.name}</h4>
                <button onClick={() => handleDelete(c._id)} className="delete-btn" title="Delete contact">
                  🗑️
                </button>
              </div>
              <div className="contact-details">
                <p className="contact-email">📧 {c.email}</p>
                <p className="contact-phone">📞 {c.phone}</p>
                {c.message && <p className="contact-message">💬 {c.message}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;