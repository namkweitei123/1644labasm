class Product{
    constructor(name, price, pic, quantity){
        this.name = name;
        this.price = price;
        this.pic = pic;
        this.quantity = quantity;
    }

    getUserStats(){
        return `
            Name: ${this.name}
            Price: ${this.price}
            Pic: ${this.pic}
            Quantity: ${this.quantity}
        `;
    }
}

module.exports = Product;