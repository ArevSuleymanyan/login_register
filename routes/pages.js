const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

const userService = new UserService()

router.get("/", (request, response) => {
    if(request.userInfo) {
        let userName = request.userInfo.name;
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
        response.render("home", {
            name: `${userName}`,
            title: `Welcome ${userName}`,
        })
    }else{
        response.render("home", {
            title: "Home",
        })
    }
})

router.get("/login", (request, response) => {
    response.render("login", {
        title: "Login",
    })
})

router.get("/register", (request, response) => {
    response.render("register", {
        title: "Register",
    })
})



router.get('/logout', (request, response) => {
    response.clearCookie("jwt");
    response.redirect('/');
})

router.get('/profile', (request, response) => {
    const email = request.userInfo.email;
    response.render("profile", {
        name: ' ',
        email: email,
        title: "Profile",
    })
})

router.get("/game", async (request, response) => {
    if(request.userInfo){
        const id = request.userInfo.Id
        const sql = `INSERT game(user_id, sudoku) VALUES (${id}, ?)`
        userService.insertGameInDb(sql);
        const gameInfo = await userService.getGameById(id);
        
        response.json(`${gameInfo.sudoku}`)
    }else{
        response.send('error')
    }
})


module.exports = router;