const { ObjectId } = require('mongodb')
var mongoClient = require("mongodb").MongoClient
var url = "mongodb+srv://nhn11102:201794nam@1644lab.ahrqlwh.mongodb.net/test"

async function getDB(){
    let client = await mongoClient.connect(url);
    let db = client.db("Toy");
    return db;
}

async function createNewProduct(newProduct){
    let db = await getDB();
    let id = await db.collection("products").insertOne(newProduct);
    return id;
}

async function viewAllProduct(){
    let db = await getDB();
    let results = await db.collection("products").find().toArray();
    return results;
}

async function deleteProduct(id){
    let db = await getDB();
    await db.collection("products").deleteOne({_id: ObjectId(id)});
}

async function findProduct(id){
    let db = await getDB();
    const productToEdit = await db.collection("products").findOne({_id: ObjectId(id)});
    return productToEdit;
}

async function updateProduct(id, name, price, pic, quantity,category){
    let db = await getDB();
    await db.collection("products").updateOne( {_id: ObjectId(id)} , {$set: {"name": name, "price":price, "quantity": quantity, "pic": pic, "category":category}} );
}

async function searchProduct(name){
    let db = await getDB();
    const results = await db.collection("products").find({name: new RegExp(name,'i')}).toArray();
    return results;
}




module.exports = {createNewProduct, viewAllProduct, deleteProduct, findProduct,  updateProduct, searchProduct}