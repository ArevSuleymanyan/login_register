const express = require("express");
const exp_hbs = require("express-handlebars");
const dotenv = require('dotenv');

dotenv.config({path: './.env'})


const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.engine('.hbs', exp_hbs({extname: '.hbs'}));
app.set('view engine', 'hbs');


app.use("/", require("./routes/pages")); 
app.use('/auth', require('./routes/auth'))

app.listen( port, () => {
    console.log(`Server started on port ${port}`);
});