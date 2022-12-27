var express = require('express');
var router = express.Router();
const Product = require("./models/productModel");
const { createNewProduct, viewAllProduct, deleteProduct, findProduct, updateProduct } = require('./productService');
const { handlebars } = require('hbs');
//const { body, validationResult } = require('express-validator');

handlebars.registerHelper("inc", function(index)
{
    return index + 1;
});

handlebars.registerHelper("lar", function(price){
    return price > 100;
})

router.get("/",async(req,res) =>{
    let results = await viewAllProduct();
    res.render("product/index", {results:results});
})

router.get("/create", (req,res) =>{
    res.render("product/create");
})

router.post("/create",async(req,res) =>{
    const name = req.body.txtName;
    const price = req.body.txtPrice;
    const pic = req.body.pic;
    const quantity = req.body.txtQuantit;
    const newProduct = new Product();
    newProduct.name = name;
    newProduct.price = price;
    newProduct.pic = pic;
    newProduct.quantity = quantity;
    let id = await createNewProduct(newProduct);
    console.log(id);
    res.redirect("/products");
})

router.get("/delete", async(req,res)=>{
    const id = req.query.id;
    await deleteProduct(id);
    res.redirect("/products");
})

router.get("/update", async(req,res)=>{
    const id = req.query.id;
    const productToEdit = await findProduct(id);
    res.render("product/update", {Product:productToEdit});
})

router.post("/update", async(req,res)=>{
    const id = req.body.id;
    const name = req.body.txtName;
    const price = req.body.txtPrice;
    const pic = req.body.pic;
    const quantity = req.body.txtQuantity;
    await updateProduct(id, name, price, pic, quantity);
    res.redirect("/products");
})

router.get("/mystyle", async(req,res)=>{
    res.render("/mystyle.css")
})


module.exports = router