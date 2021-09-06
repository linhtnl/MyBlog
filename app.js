const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash')
const mongoose = require('mongoose')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

//Mongo-uri
const uri = "mongodb+srv://linhtnl:Cuxin123@cluster0.1ui53.mongodb.net/MyBlog?retryWrites=true&w=majority"

const homeStartingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
const aboutContent = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
const contactContent = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. "

//Mongo connection
mongoose.connect(uri)

//Schemas
const postSchema = {
    title: String,
    content: String
}
const Post = mongoose.model('Post',postSchema)

app.listen(process.env.PORT || 3000, () => {
    console.log('Connected!')
})
app.get('/', (req, res) => {
    Post.find({},(err,posts)=>{
        res.render('home', {
            startingContent: homeStartingContent,
            posts: posts
        })
    })
})
app.get('/about', (req, res) => {
    res.render('about', { aboutContent: aboutContent })
})

app.get('/contact', (req, res) => {
    res.render('contact', { contactContent: contactContent })
})
app.get('/compose', (req, res) => {
    res.render('compose')
})
app.post('/compose', (req, res) => {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    })
    post.save()
    res.redirect('/')
})
app.get('/posts/:postId', (req, res) => {
    const requestedPostId = req.params.postId
    Post.findOne({_id: requestedPostId}, function(err, post){
        res.render("post", {
          title: post.title,
          content: post.content
        })
      })
})
app.get('/home', (req, res) => {
    res.render('home', {})
})