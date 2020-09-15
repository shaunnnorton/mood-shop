import data from './data.js'
const itemsContainer = document.getElementById('items')
// the length of our data determines how many times this loop goes around
for (let i=0; i<data.length; ++i) {
    // create a new div element and give it a class name
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    // create an image element
    let img = document.createElement('img');
    // this will change each time we go through the loop. Can you explain why?
    img.src = data[i].image
    img.width = 300
    img.height = 300

    // Add the image to the div
    newDiv.appendChild(img)

    let des = document.createElement('p');
    des.innerText = data[i].desc
    newDiv.appendChild(des)

    let price = document.createElement('p');
    price.innerText = data[i].price
    newDiv.appendChild(price)

    let button = document.createElement('button')
    button.id = data[i].name
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)


    
    itemsContainer.appendChild(newDiv)
    console.log(img)
}
const cart = []
//Add Item
function addItem(name, price) {
    for (let i=0; i < cart.length; i+=1){
        if (cart[i].name === name ) {
            cart[i].qty += 1
            return
        }
    }
    
    const item = { name , price, qty: 1}
    cart.push(item)


}
//Show Items
function showItems() {
    
    
    console.log(`You have ${getQty()} items in your cart`)
    for(let i=0; i < cart.length ; i += 1) {
        console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty} = $${cart[i].price * cart[i].qty}`)

    }
    
    console.log(`Your total price is $${getTotal()}`)

}
//Get Qty
function getQty(){
    let item_count = 0
    for(let i = 0; i<cart.length; i+=1){
        item_count += cart[i].qty
    }
    return item_count
}
//Get total
function getTotal() {
    let total_price = 0
    for(let i = 0; i<cart.length; i+=1){
        total_price += cart[i].price * cart[i].qty
    }
    return total_price.toFixed(2)

}
addItem('Apple', 0.99)
addItem('Orange', 1.29)
addItem('Opinion', 0.02)
addItem('Apple', 0.99)
addItem('Frisbee', 9.92)
showItems()