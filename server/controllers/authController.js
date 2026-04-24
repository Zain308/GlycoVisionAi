import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE } from "../config/emailTemplates.js";

export const register = async (req, res) => {
    const { firstName, lastName, email, password, diabetesType } = req.body;

    if (!firstName || !lastName || !email || !password || !diabetesType) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.json({ success: false, message: "User exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ firstName, lastName, email, password: hashedPassword, diabetesType });
        
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Send Email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Verify Your Account',
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", email),
        };
        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "Registered successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required" });
    }

    try {
        // 1. Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid email" });
        }

        // 2. Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        // 3. Generate Session Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // 4. Set HttpOnly Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, message: "Logged in successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


export const verifyEmail = async (req, res) => {

    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Check if OTP matches and hasn't expired
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOtpExpAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });
        }

        // Strong update: change verified status and clear the OTP fields
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpAt = 0;

        await user.save();
        return res.json({ success: true, message: "Email verified successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Logout Logic
export const logout = async (req, res) => {
    try {
        // Clear the cookie by setting its expiry to 'now'
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Logged Out Successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// 1. Send Password Reset OTP
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.json({ success: false, message: 'Email is required' });

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.json({ success: false, message: 'User not found' });

        // Generate 6-digit OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpAt = Date.now() + 15 * 60 * 1000; // 15 Minutes expiry

        await user.save();

        // Send Email
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting your password is ${otp}. Use this to set a new password.`,
        });

        return res.json({ success: true, message: 'OTP sent to your email' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// 2. Reset User Password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Email, OTP, and New Password are required' });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.json({ success: false, message: 'User not found' });

        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.resetOtpExpAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        // Hash and save new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = ''; // Clear OTP
        user.resetOtpExpAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Password has been reset successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};