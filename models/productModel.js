class Product{
    constructor(name, price, pic, quantity, category){
        this.name = name;
        this.price = price;
        this.pic = pic;
        this.quantity = quantity;
        this.category= category;
    }

    getUserStats(){
        return `
            Name: ${this.name}
            Price: ${this.price}
            Pic: ${this.pic}
            Quantity: ${this.quantity}
            Category: ${this.category}
        `;
    }
}

module.exports = Product;