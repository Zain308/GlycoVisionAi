import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import path from 'path';

// Force load from the .env file in the current (server) folder
dotenv.config(); 

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // 587 is usually TLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// This is our "truth" check
console.log("--- ENV CHECK ---");
console.log("HOST:", process.env.SMTP_HOST);
console.log("USER:", process.env.SMTP_USER);
console.log("PASS LOADED:", process.env.SMTP_PASS ? "Yes" : "No");

export default transporter;