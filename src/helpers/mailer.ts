import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Hash the userId as a token
        const hashedToken = (await bcryptjs.hash(userId.toString(), 10)).replace(/[^a-zA-Z0-9]/g, '');

        // Update the user with appropriate token and expiry
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 900000, // 15 minutes expiry
            });
        }

        console.log("📧 Email details:", { email, emailType, userId });
        console.log("🔑 Generated token:", hashedToken);

        // Check if email service is configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log("⚠️  Email service not configured. Using console output for development.");
            console.log("====================================");
            console.log(`📧 EMAIL SIMULATION FOR: ${email}`);
            console.log(`📝 TYPE: ${emailType}`);
            console.log(`🔗 VERIFICATION LINK:`);
            console.log(`${process.env.DOMAIN}/auth/${emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'}?token=${hashedToken}`);
            console.log("====================================");
            return { success: true, method: 'console', token: hashedToken };
        }

        console.log("📧 Email config:", {
            user: process.env.EMAIL_USER ? 'Configured' : 'Missing',
            pass: process.env.EMAIL_PASS ? 'Configured' : 'Missing'
        });

        // Create a transport instance for sending emails
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address
                pass: process.env.EMAIL_PASS, // App-specific password
            },
        });

        console.log("📧 Transporter created successfully");

        // Remove trailing slash from DOMAIN if present
        const domain = process.env.DOMAIN?.replace(/\/$/, "") || 'http://localhost:3001';

        const verificationLink = `${domain}/auth/${emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'}?token=${hashedToken}`;
        console.log("🔗 Verification link:", verificationLink);

const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: email, 
    subject: emailType === "VERIFY" ? "Verify Your Email with Dev Roadmap Platform" : "Reset Your Password on Dev Roadmap Platform", 
    html: `
        <div style="background-color: #000; color: #fff; padding: 20px; font-family: Arial, sans-serif; background-image: url('https://www.nasa.gov/sites/default/files/thumbnails/image/pia22810-16.jpg'); background-size: cover;">
            <div style="max-width: 600px; margin: auto; background-color: rgba(0, 0, 0, 0.8); border-radius: 10px; overflow: hidden;">
                <div style="padding: 20px; text-align: center;">
                    <h1 style="font-size: 32px; color: #00d8ff; margin-bottom: 10px;">Dev Roadmap Platform</h1>
                    <p style="font-size: 18px; color: #fff;">Learn, Practice, and Grow Your Skills</p>
                </div>
                <div style="padding: 20px; text-align: center;">
                    <h2 style="color: #00ff44; font-size: 24px; margin-bottom: 10px;">
                        ${emailType === "VERIFY" ? "Verify Your Email!" : "Reset Your Password!"}
                    </h2>
                    <p style="font-size: 16px; color: #fff; margin-bottom: 20px;">
                        ${emailType === 'VERIFY' ? 
                            'Welcome to Dev Roadmap Platform! Click the link below to verify your email and start your learning journey.' : 
                            'We received a request to reset your password. Click the link below to reset it securely.'}
                    </p>
                    <a href="${verificationLink}" 
                       style="display: inline-block; text-decoration: none; color: #fff; background: linear-gradient(to right, #6a11cb, #2575fc); 
                              padding: 12px 20px; font-size: 16px; border-radius: 5px; font-weight: bold;">
                        ${emailType === 'VERIFY' ? 'Verify Email' : 'Reset Password'}
                    </a>
                    <p style="color: #ccc; font-size: 14px; margin-top: 10px;">
                        This link is valid for ${emailType === 'VERIFY' ? '1 hour' : '15 minutes'}.
                    </p>
                    <p style="color: #999; font-size: 12px; margin-top: 15px;">
                        Or copy and paste this link in your browser:<br>
                        ${verificationLink}
                    </p>
                </div>
                <div style="padding: 20px; text-align: center; background-color: #0b0b3b;">
                    <p style="color: #aaa; font-size: 14px; margin-bottom: 10px;">Made with 💖 by Harish Saini</p>
                    <p style="color: #aaa; font-size: 14px;">Learn, Practice, and Grow Your Skills</p>
                </div>
            </div>
        </div>
    `, 
};


        try {
            // Try to send the email
            console.log("📧 Attempting to send email...");
            const mailResponse = await transporter.sendMail(mailOptions);
            console.log("✅ Email sent successfully:", mailResponse.messageId);
            return { success: true, method: 'email', messageId: mailResponse.messageId };
        } catch (emailError: any) {
            console.error("❌ Email sending failed:", emailError.message);
            
            // Fallback: Log the verification link for development
            console.log("⚠️  Email failed, using console fallback:");
            console.log("====================================");
            console.log(`📧 VERIFICATION EMAIL FOR: ${email}`);
            console.log(`📝 TYPE: ${emailType}`);
            console.log(`🔗 CLICK THIS LINK TO ${emailType === 'VERIFY' ? 'VERIFY EMAIL' : 'RESET PASSWORD'}:`);
            console.log(verificationLink);
            console.log("====================================");
            
            // Return success with console method
            return { success: true, method: 'console', token: hashedToken, link: verificationLink };
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};
