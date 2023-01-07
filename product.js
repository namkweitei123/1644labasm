var express = require('express');
var router = express.Router();
const Product = require("./models/productModel");
const { createNewProduct, viewAllProduct, deleteProduct, findProduct, updateProduct,searchProduct } = require('./productService');
const { handlebars } = require('hbs');
//const { body, validationResult } = require('express-validator');

handlebars.registerHelper("inc", function(index)
{
    return index + 1;
});

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
    const quantity = req.body.txtQuantity;
    const category= req.body.txtCategory;
    const newProduct = new Product();
    newProduct.name = name;
    newProduct.price =Number.parseInt(price);
    newProduct.pic = pic;
    newProduct.quantity = quantity;
    newProduct.category= category;
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
    const category= req.body.txtCategory;
    await updateProduct(id, name, price, pic, quantity,category);
    res.redirect("/products");
})
router.post("/search", async(req,res)=>{
    const search = req.body.search;
    const results = await searchProduct(search);
    console.log(results);
    res.render('product/index', {results:results})
})

module.exports = router




















// handlebars.registerHelper("lar", function(price){
//     return price > 100;
// })

// if(isNaN(price)){
    //     let er = {print:"er"}
    //     res.render("product/create", {results:er})
    // }