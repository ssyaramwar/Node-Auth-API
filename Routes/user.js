// routes/user.js
const express = require('express');
const router = express.Router();

// ⬅️ Now this will correctly import the functions from Auth.js
const { login, signup } = require("../controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");


router.post("/login", login); // 'login' is a function
router.post("/signup", signup); // 'signup' is a function




router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "This is a protected route for test",
    });
});
//protected route
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        sucesss: true,
        message: "welcome to the protected route for students",
    });


});
router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        sucesss: true,
        message: "welcome to the protected route for admin",
    });
});
module.exports = router;