// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

app.use(express.static('public'))

mongoose.connect("mongodb+srv://admin_kanishk:Kanishk@69@cluster0.uhtbj.mongodb.net/todolistDB" ,{useNewUrlParser:true, useUnifiedTopology:true});

var WorkList ="";

var founditems ="";

const itemsSchema = {
    name : String
};

const Item = mongoose.model("Item",itemsSchema);

const item1 = new Item({
    name : "Go to shop"
});

const item2 = new Item({
    name : "Buy Food"
});

const item3 = new Item({
    name : "Buy Milk"
});

const defaultitems = [item1, item2, item3];

// Item.insertMany(defaultitems, function(err){
//    if(err){
//        console.log(err);
//     } else{
//        console.log("Successfully added to DB");
//    }
//  });

var today= new Date();
var options = {
    weekday: "long",
    day : "numeric",
    month: "long"
} ;

var day = today.toLocaleDateString("en-us",options);
 
app.get("/",function(req,res){
   
    Item.find({},function(err, founditems){
        
        res.render("list", {ListTitle: day , newlistItems: founditems});

    }); 
   

});

app.post("/", function(req,res){
       
    var newItem = req.body.newEntry;
    var listName = req.body.list;

    const item = new Item({
        name : newItem
    } );

    item.save();

    res.redirect("/");
    
});

app.get("/work",function(req,res){
    res.render("list", {ListTitle: "WorkList" , newlistItems: workitems});
});

app.get("/about",function(req,res){
    res.render("about");
});

app.post("/delete",function(req,res){
    const checkedItem = req.body.checkbox;
    Item.findByIdAndRemove({_id : checkedItem},{useFindAndModify: false},function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Successfully deleted the item");
            res.redirect("/");
        }
    });
});

let port = process.env.PORT;
if(port == null || port == ""){
    port = 8000;
}


app.listen(port,function(){
    console.log("Server is running!");
});











































































