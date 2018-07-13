const express = require('express');
const hbs = require('hbs');  // HANDLEBARS
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view emgine', 'hbs');

// Middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log)
    fs.appendFile('server log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs')
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (txt) => {
    return txt.toUpperCase();
});

// Express.js
app.get('/', (request, response) => {
  //  response.send('<h1>Hello Express!</h1>');
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my website!'
});
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        name: 'Error',
        errorCode: 404,
        description: 'Page not found'
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});