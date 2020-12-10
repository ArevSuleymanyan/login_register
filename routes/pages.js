const express = require('express');
const router = express.Router();

router.get("/", (request, response) => {
    if(request.userInfo){
        let userName = request.userInfo.name;
        userName = userName.charAt(0).toUpperCase() + userName.slice(1)
        response.render("home", {
            name: `${userName}`,
            title: `Welcome ${userName}`
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

router.get('/profile', (request, response) => {
    console.log(request.userInfo)
    const email = request.userInfo.email;
    response.render("profile", {
        name: ' ',
        email: email,
        title: "Profile"
    })
})


module.exports = router