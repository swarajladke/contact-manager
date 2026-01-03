const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. UPDATE CORS: Allow your specific Vercel URL or leave empty to allow all (common for interviews)
app.use(cors()); 
app.use(express.json());

// MongoDB connection - MUST be set via environment variable for security
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI environment variable is not set!");
  console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes('MONGO')));
  process.exit(1);
}
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: String
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// API Routes
app.post('/api/contacts', async (req, res) => {
  try {
    console.log("Received contact data:", req.body);
    const newContact = new Contact(req.body);
    await newContact.save();
    console.log("Contact saved successfully:", newContact);
    res.status(201).json(newContact);
  } catch (err) { 
    console.error("Post Error Details:", {
      message: err.message,
      name: err.name,
      errors: err.errors,
      stack: err.stack
    });
    res.status(400).json({ 
      message: "Error saving contact", 
      error: err.message,
      details: err.errors || err.message
    }); 
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) { res.status(500).json(err); }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json(err); }
});

// 3. FIX PORT: Render uses process.env.PORT. Using 5000 fixed will cause a crash on deploy.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));