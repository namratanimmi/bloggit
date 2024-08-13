require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8005;
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const Blog = require('./models/blog');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

const ConnectToMongoDB = require('./connect');
const { checkForAuthenticationCookie } = require('./middleware/authentication');

ConnectToMongoDB(process.env.MONGO_URL)
.then((e)=>console.log("Connected to mongoDB"))
.catch((err)=>{
    console.log(err);
})

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));

app.get('/', async (req,res)=>{
   const allBlogs = await Blog.find({});
    return res.render('home',{title:"Home Page", user :req.user, blogs : allBlogs });
});

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT,()=>console.log("Server started at port ",PORT));
