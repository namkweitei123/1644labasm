const express = require('express') // require module express vao project
var app = express() // tao 1 app moi
app.set('view engine','hbs') // su dung hbs lam view engine

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

var productRouter = require('./product') // require product router

const { viewAllProduct, searchProduct, descProduct, ascProduct } = require('./productService')
app.use('/products', productRouter) // Dung productRouter cho tat ca ca router bat dau bang /products


app.get('/', async(req,res)=>{
    let results = await viewAllProduct();
    res.render('home', {results:results})
})

//Tìm kiếm sản phẩm trang home
app.post("/search", async(req,res)=>{
    const search = req.body.search;
    const results = await searchProduct(search);
    console.log(results);
    res.render('home', {results:results})
})

app.get("/asc", async(req,res)=>{
    const results = await ascProduct();
    console.log(results);
    res.render('home', {results:results})
})

app.get("/desc", async(req,res)=>{
    const results = await descProduct();
    console.log(results);
    res.render('home', {results:results})
})

const PORT = process.env.PORT || 10000 // Định nghĩa cổng để chạy ứng dụng NodeJS của bạn trên server
app.listen(PORT,()=>{
    console.log("Server is running at: ", PORT)
})
