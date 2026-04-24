import transporter from "../config/nodemailer.js";

const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.SENDER_NAME}" <${process.env.SENDER_EMAIL}>`,
            to,
            subject,
            html,
        });
        console.log(`📧 Email sent to ${to}: ${info.messageId}`);
        return { success: true };
    } catch (error) {
        console.error("❌ Email sending failed:", error.message);
        return { success: false, error: error.message };
    }
};

export default sendEmail;