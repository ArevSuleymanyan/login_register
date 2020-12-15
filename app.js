const express = require("express");
const exp_hbs = require("express-handlebars");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
dotenv.config({path: './.env'});
const UserService = require('./services/UserService');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());


const allow = ['register', 'login', 'auth/login', 'auth/register'];
app.use( async (request, response, next) => {
   
    const foundUrl = allow.find(el => new RegExp(`${el}\/?$`, 'gm').test(request.url));
    if(foundUrl) {
        next();
        return;
    }

    const {jwt: token} = request.cookies;
    if (!token) {
        response.status(404).render('error', {
            message: 'Please log in',
        });
        return;
    }
    

    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (!data) {
        response.status(404).render('error', {
            message: 'Error',
        });
        return;
    }

    const user = new UserService();
    const userInfo = await user.getUserById(data.id);
    if (!userInfo) {
        response.status(404).render('login', {
            message: 'Error',
        });
        return;
    }
    request.userInfo = userInfo;
    next();
})


//view
app.engine('.hbs', exp_hbs({extname: '.hbs'}));
app.set('view engine', 'hbs');

//router
app.use("/", require("./routes/pages")); 
app.use('/auth', require('./routes/auth'));
app.use('/game', require('./routes/game'));

app.listen( port, () => {
    console.log(`Server started on port ${port}`);
});