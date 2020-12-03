const express = require('express');
const router = express.Router();

router.get("/", (request, response) => {
    response.render("home", {
        title: "Home"
    })
})

router.get("/login", (request, response) => {
    response.render("login", {
        title: "Login"
    })
})

router.get("/register", (request, response) => {
    response.render("register", {
        title: "Register"
    })
})

module.exports = router