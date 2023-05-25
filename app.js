const express = require('express')
const morgan = require('morgan') 

// experss app
const app = express()

// register view engine
app.set('view engine', 'ejs')

// listen for requests
app.listen(3000)

// middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/blogs/create', (req, res) => {
    res.render('create')
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404')
})