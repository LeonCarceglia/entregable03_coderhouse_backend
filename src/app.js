// Declaracion de imports

import ProductManager from "./ProductManager.js"
import express from "express"

// Creacion de variables

const PM = new ProductManager()
const app = express()

// Creacion del servidor

app.use(express.urlencoded({extended:true}))

// Devuelve todos los productos o x cantidad en caso de que se especifique un limite

app.get("/products", (req,res) =>{
    const limit = parseInt(req.query.limit)
    const products = PM.getProducts()
    if (!limit){
       return res.json(products) 
    }
    else{
        return res.json(products.slice(0, parseInt(limit)))
    }
})

// Devuelve el producto con el id buscado en caso de que exista

app.get("/products/:pId", (req,res) => {
    const { pId } = req.params
    const product = PM.getProductByld(pId)
    return res.json(product)
})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})