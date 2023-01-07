const express = require('express') 
var app = express() 
app.set('view engine','hbs') 

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

var productRouter = require('./product') 

const { viewAllProduct, searchProduct} = require('./productService')
app.use('/products', productRouter) 


app.get('/', async(req,res)=>{
    let results = await viewAllProduct();
    res.render('home', {results:results})
})

app.post("/search", async(req,res)=>{
    const search = req.body.search;
    const results = await searchProduct(search);
    console.log(results);
    res.render('home', {results:results})
})


const PORT = process.env.PORT || 10000 
app.listen(PORT,()=>{
    console.log("Server is running at: ", PORT)
})
