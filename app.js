const express = require("express");
const exp_hbs = require("express-handlebars");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userService = require("./services/userService");

dotenv.config({path: './.env'})


const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser())

const allow = [ 'auth/login', 'auth/register'];
app.use( (request, response, next) => {
    const foundUrl = allow.find(el => new RegExp(`${el}\/?$`, 'gm').test(request.url));
    if(foundUrl){
        next();
        return
    }
    const {jwt: token} = request.cookies;
    if (!token) {
        response.status(404).render('login', {
            message: 'Error'
        });
        return;
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (!data) {
        response.status(404).render('login', {
            message: 'Error'
        });
        return;
    }

    // const user = await userService.getUserById(data.id)
    // const user =  await userService.getUserById(data.id)

    if (!user) {
        response.status(404).render('login', {
            message: 'Error'
        });
        return;
    }
    request.user = user;
    next();
})


app.engine('.hbs', exp_hbs({extname: '.hbs'}));
app.set('view engine', 'hbs');


app.use("/", require("./routes/pages")); 
app.use('/auth', require('./routes/auth'))

app.listen( port, () => {
    console.log(`Server started on port ${port}`);
});