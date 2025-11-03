// Corrected middlewares/auth.js

const jwt = require("jsonwebtoken");
require("dotenv").config();

// 1. Authentication Middleware
exports.auth = (req, res, next) => {
    try {
        // Ext  ract token (Checking body, query, and header is best practice)
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }

        // Verify the token 
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET); // Corrected JWT_SECRET
            console.log(decode); // Corrected typo
            req.user = decode;

            // CRITICAL: Move to the next middleware/handler after successful auth
            next(); 

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
            // Removed next() here
        }
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token",
        });
    }
}
// ----------------------------------------------------------------------

// 2. Student Authorization Middleware (Role Check)
exports.isStudent = (req, res, next) => { // Corrected name from isStudents
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Students only",
            });
            // Removed next() here
        }

        // CRITICAL: Move to the next middleware/handler after successful role check
        next(); 

    }
    catch (error) {
        // This catch handles cases where req.user is undefined (meaning auth middleware failed)
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified. Are you logged in?",
        })
    }
}
// ----------------------------------------------------------------------

// 3. Admin Authorization Middleware (Role Check)
exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admins only",
            });
            // Removed next() here
        }
        
        // CRITICAL: Move to the next middleware/handler after successful role check
        next(); 

    }
    catch (error) {
        // This catch handles cases where req.user is undefined (meaning auth middleware failed)
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified. Are you logged in?",
        });
    }
}