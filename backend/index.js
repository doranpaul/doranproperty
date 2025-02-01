require('dotenv').config({ path: '../backend/.env' });

console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

const allowedOrigins = [
    "http://localhost:3000", // Local frontend (React)
    "http://localhost:5173", // Local frontend (Vite)
    "https://homefromhome.onrender.com" // Production frontend
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
}));

// Serve the frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Route to serve index.html (so users always get the frontend)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Example: API endpoint for contact form
app.post('/send-message', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        console.log("Message sent:", name, email, message);

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Change this if you're using another provider
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send email to yourself
            subject: `New Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Send Message Error:', error); // Log full error
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
