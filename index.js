const express = require("express");
const app = express();
const port = 8080;
const path = require("path");//to use views and public folder
const {v4: uuidv4 } = require("uuid");//for id
const methodOverride = require("method-override");//to acess other rquest like patch,put,delete
app.use(methodOverride("_method"));//to use method overrride


app.use(express.urlencoded({extended:true }));//to parse every data when we use post request
app.use(express.json());

app.set("view engine","ejs"); 
app.set("views",path.join(__dirname,"views"));//set to access views folder to acces from any where
app.use(express.static(path.join(__dirname,"public")));//set to access public folder to acces from any where

let posts = [
    {
        id:uuidv4(),
        username : "apnacollege",
        content : "i love coding",
    },
    {
        id:uuidv4(),
        username : "deepakkumar",
        content : "i love T",
    },
    {
        id:uuidv4(),
        username : "deepak chahal",
        content : "my birthday is on 28 feb 2005",
    },
];

app.get("/posts",(req,res)=>
{
    //console.log(posts);
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>
{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>
{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>
{
    let {id} = req.params;
    let Post = posts.find((p) => id === p.id);
    //console.log(Post);
    if(!Post){
            return res.status(404).send("Post not found!");
        }

    res.render("show.ejs",{Post});
});

app.patch("/posts/:id",(req,res)=>
{
    let {id} = req.params;
   // let Post = posts.find((p) => id === p.id);
   let newcontent = req.body.content;
   let Post = posts.find((p) => id === p.id);
   Post.content = newcontent
    console.log(Post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>
{
     let {id} = req.params;
      let Post = posts.find((p) => id === p.id);
      res.render("edit.ejs",{Post});

});

app.delete("/posts/:id",(req,res)=>
{
     let {id} = req.params;
        posts = posts.filter((p) => id !== p.id);
      //res.send("delete success");
      res.redirect("/posts");

});


app.listen(port,()=>
{
    console.log(`listening on port : ${port}`);
});