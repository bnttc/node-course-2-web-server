const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view-engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}:  ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next(); // end of middleware
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello Everyone!'
    });
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page'
   });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error handling this request!'
    });
});


app.listen(3000), () => {
    console.log('Server is listening on port 3000.')
};