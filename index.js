require('dotenv').config(); //env
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Register `hbs.engine` with the Express app.
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// create call api
function call_api(finishedAPI, searchedText) {
    // request from iexapis
    request(`https://cloud.iexapis.com/stable/stock/${searchedText}/quote?token=${process.env.IEX_PUBLISHABLE_KEY}`,
        { json: true },
        (err, res, body) => {
            if (err) console.log(err);
            if (res.statusCode === 200) {
                finishedAPI(body);
            }
        });
}

// handlebars routes
app.get('/', function (req, res) {
    call_api(function (doneAPI) {
        res.render('home', {
            stock: doneAPI,
        });
    }, "fb");
});

// search route
app.post('/', function (req, res) {
    call_api(function (doneAPI) {
        res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stock_search);
});

app.get('/about.html', function (req, res) {
    res.render('about');
});


// set static folder
app.use(express.static(path.join(__dirname, 'public')));


// connecting to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));