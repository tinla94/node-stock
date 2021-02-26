const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');

const app = express();

// Register `hbs.engine` with the Express app.
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set handlebars routes
app.get('/', function(req, res) {
    res.render('home', {
        stuff: "This is stuff..."
    });
})

// set static folder
app.use(express.static(path.join(__dirname, 'public')));


// connecting to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));