import {connect} from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import {NextResponse,NextRequest} from 'next/server'

export async function POST(request:NextRequest){
    try {
        // Ensure database connection
        await connect();
        
        const reqBody = await request.json();
        const {username: rawUsername, email: rawEmail, password} = reqBody;
        
        // Sanitize inputs
        const username = rawUsername?.trim();
        const email = rawEmail?.trim().toLowerCase();
        
        // Validation
        if (!username || !email || !password) {
            return NextResponse.json({error: "All fields are required"}, {status: 400});
        }
        
        if (username.length < 3) {
            return NextResponse.json({error: "Username must be at least 3 characters"}, {status: 400});
        }
        
        if (password.length < 6) {
            return NextResponse.json({error: "Password must be at least 6 characters"}, {status: 400});
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({error: "Please provide a valid email address"}, {status: 400});
        }

        console.log("Signup request:", { username, email });
        
        // Check for existing user by email
        const existingUserByEmail = await User.findOne({email: email});
        if(existingUserByEmail){
            console.log("❌ Email already exists:", email);
            return NextResponse.json({error: "Email already exists"},{status:400});
        }
        
        // Check for existing user by username
        const existingUserByUsername = await User.findOne({username});
        if(existingUserByUsername){
            console.log("❌ Username already exists:", username);
            return NextResponse.json({error: "Username already exists"},{status:400});
        }

        console.log("✅ User validation passed, creating new user...");

        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password,salt);

        // Admin check using env variable
        const adminEmail = process.env.ADMIN_EMAIL;
        const isAdmin = adminEmail === email;
        
        console.log("Creating user with admin status:", isAdmin);
        
        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password: hashedpassword,
            isAdmin,
        })

        const savedUser = await newUser.save();
        console.log("User saved successfully:", savedUser._id);

        // Send verification email
        try {
            await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});
            console.log("Verification email sent successfully");
        } catch (emailError: any) {
            console.error("Email sending failed:", emailError.message);
            // Still return success even if email fails
        }

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                isAdmin: savedUser.isAdmin
            }
        });

    } catch (error:any) {
        console.error("Signup error:", error.message);
        console.error("Stack trace:", error.stack);
        
        // Handle MongoDB duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            const message = field === 'email' ? 'Email already exists' : 
                           field === 'username' ? 'Username already exists' : 
                           'Duplicate entry detected';
            return NextResponse.json({error: message}, {status: 400});
        }
        
        // Handle MongoDB validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err: any) => err.message);
            return NextResponse.json({error: messages.join(', ')}, {status: 400});
        }
        
        return NextResponse.json({error: error.message},{status: 500})        
    }
}