const express = require('express');
const { engine }= require('express-handlebars');

const app = express();
const PORT_NODE = 3000;
/*
 * Configuration Handlebars 
 ***************************/

// ! Import des helpers
const { limit } = require('./helper')

app.engine('hbs', engine({
  // ! initialisation des helpers dans notre handlebars 
  helpers: {
    limit
  },
  extname: 'hbs',
  defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

/*
 * Fake DB 
 **********/
const db = [
  {
    titre:"titre 1",
    price: 171
  },
  {
    titre:"titre 2",
    price: 163
  },
  {
    titre:"titre 3",
    price: 99
  },
  {
    titre:"titre 4",
    price: 222
  },
  {
    titre:"titre 5",
    price: 895
  },
  {
    titre:"titre 6",
    price: 910
  },
  {
    titre:"titre 7",
    price: 64
  },
  {
    titre:"titre 8",
    price: 92
  },
  {
    titre:"titre 9",
    price: 15
  }
]

/*
 * Routes 
 *********/

// Première route
app.get('/', (req, res) => {
    res.render('home',{
      db
    });
});

// Deuxième route
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Admin page
app.get('/admin', (req, res) => {
  res.render('admin',{
    layout:"admin",
    db
  });
});

// On demarre notre app en lui demandant d'être à l'écoute du port
app.listen(PORT_NODE, () => console.log(`Server start on localhost:${PORT_NODE} 🚀`));