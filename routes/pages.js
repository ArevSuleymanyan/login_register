const express = require('express');
const router = express.Router();

router.get("/", (request, response) => {
    if(request.userInfo){
        response.render("home", {
            name: `${request.userInfo.name}`
        })
    }else{
        response.render("home", {
            title: "Home"
        })
    }
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

router.get('/logout', (request, response) => {
    response.clearCookie("jwt");
    response.redirect('/')
})

module.exports = router