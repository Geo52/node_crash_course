const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { result } = require("lodash");
const { render } = require("ejs");

// experss app
const app = express();

// connect to mongoDB
const dbURI = "mongodb+srv://jrios:1234@nodetuts.qydyih9.mongodb.net/";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}))
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about");
});

//blog routes
app.get("/blogs", (req, res) => {
  Blog.find().sort({ createdAt: -1})
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
      console.log(err)
    })
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
    .then((result) => {
      res.redirect('/blogs')
    })
    .catch((err) => {
      
    })
})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: "Blog details"})
    })
    .catch(err => {
      console.log(err)
    })
})

app.get("/blogs/create", (req, res) => {
  res.render("create");
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404");
});
