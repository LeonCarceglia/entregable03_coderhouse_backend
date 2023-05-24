import fs from "node:fs"

export default class ProductManager {

    //Atributos
    #products
    #path

    //Constructor de la clase
    constructor(){
        this.#products = []
        this.#path = "Products.txt"
        this.#loadProducts()
    }

    //Metodos internos
    #existsId(idExists){ // Busca un id, si existe devuelve el producto 
        return this.#products.find(product => product.id == idExists)
    }

    #loadProducts(){ // Lee el archivo de productos y los carga en el arreglo interno, si no existe el archivo lo crea
        if(fs.existsSync(this.#path)){
            const products = fs.readFileSync(this.#path, "utf-8")
            this.#products = JSON.parse(products)
        }else{
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        }
    }

    addProduct(product){ // Añade un producto al arreglo si este no existe previamente
        if (!this.#products.find((element) => {return element.code == product.code})){
            product.id = this.#products.length+1
            this.#products.push(product)
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        }
    }
    
    getProducts(){ // Devuelve todos los productos del arreglo
        return this.#products
    }
    
    getProductByld(idFind){ // Devuelve el producto que se busca por id solo si existe, sino devuelve un mensaje de error
        return this.#existsId(idFind) || "Not found"
    }

    updateProduct(idUpdate, updatedProduct){ // Actualiza el producto con el id que le pasan
        if(this.#existsId(idUpdate) != undefined){
            this.#products[idUpdate-1] = updatedProduct
            return "Product updated"
        } else {
            return "Not found"
        }
    }

    deleteProduct(idDelete){ // Busca una id y borra ese producto si existe
        if (this.#existsId(idDelete) != undefined){
            this.#products.splice(idDelete-1,1)
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            return "Product deleted"
        }
        else {
            return "Not found"
        }
    }
}


// //Creacion del producto
// const productManager = new ProductManager()

// //Creacion de los productos ejemplo
// const product1 = {
//     title: "Lollapalozza",
//     description: "Evento general",
//     price: 100,
//     thumbnail: "url",
//     code: 1,
//     stock: 50
// }
// const product2 = {
//     title: "Hallaballusa",
//     description: "Evento general",
//     price: 100,
//     thumbnail: "url",
//     code: 2,
//     stock: 50
// }
// const product3 = {
//     title: "Papalozza",
//     description: "Evento general",
//     price: 100,
//     thumbnail: "url",
//     code: 60,
//     stock: 50
// }

// //Añadir productos existentes y nuevos
// productManager.addProduct(product1)
// productManager.addProduct(product2)
// productManager.addProduct(product1)
// productManager.addProduct(product3)

// //Buscar productos existenes o no
// console.log(productManager.getProductByld(1))
// console.log(productManager.getProductByld(3))
// console.log(productManager.getProductByld(10))

// //Devolucion de todos los productos
// console.log(productManager.getProducts())

// //Crea un producto nuevo y lo actualiza en la id 2
// const product4 = {
//     title: "Mamalozza",
//     description: "Evento general",
//     price: 100,
//     thumbnail: "url",
//     code: 2,
//     stock: 50,
//     id: 2
// }
// console.log(productManager.updateProduct(product4.id, product4))

// //Borra un producto del arreglo
// console.log(productManager.deleteProduct(3))

// //Devolucion de todos los productos, con los productos eliminados y actualizados
// console.log(productManager.getProducts())