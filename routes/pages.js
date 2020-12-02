const express = require('express');
const router = express.Router();

router.get("/", (request, response) => {
    response.render("home", {
        title: "Home"
    })
    console.log('home')
})

router.get("/login", (request, response) => {
    response.render("login", {
        title: "Login"
    })
    console.log("login")
})

router.get("/register", (request, response) => {
    response.render("register", {
        title: "Register"
    })
    console.log("register")
})

module.exports = router