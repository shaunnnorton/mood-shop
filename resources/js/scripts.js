import data from './data.js'
const itemsContainer = document.getElementById('items')
const itemList = document.getElementById('item-list')
const cartItems = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')

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
    //console.log(img)
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
    showItems()


}
//Show Items
function showItems() {
    let itemStr = ''
    cartItems.innerHTML = `<p>You have ${getQty()} items in your cart</p>`
    
    for(let i=0; i < cart.length ; i += 1) {
        const {name , price , qty} = cart[i]

        itemStr += `<li>
        ${name} $${price} x ${qty} = $${price * qty}
        <button class="remove" data-name="${name}">Remove</button>
        <button class="remove-one" data-name="${name}" data-price="${price}">-</button>
        <button class="add-one" data-name="${name}" data-price="${price}">+</button>
        <input class="update" type="number" min="0" data-name="${name}"> 
        </li>`
    }
    itemList.innerHTML = itemStr
    cartTotal.innerHTML = `<p>Your total price is $${getTotal()}</p>`

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

function removeItem(name, qty = 0) {
    for(let i = 0; i<cart.length;i+=1){
        if(cart[i].name === name){
            if(qty > 0) {
                cart[i].qty -= qty
            }
            if(cart[i].qty < 1 || qty === 0){
                cart.splice(i,1)
            }
            showItems()
            return
        }
    }

}
const all_items_button = Array.from(document.querySelectorAll("button"))

all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    
    showItems()
}))

//---------------------------------------------------------------
itemList.onclick = function(e) {
    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name 
        removeItem(name)

    }else if (e.target && e.target.classList.contains('add-one')) {
        const name = e.target.dataset.name
        const price = e.target.dataset.price 
        addItem(name,price)
        showItems()

    }else if (e.target && e.target.classList.contains('remove-one')){
        const name = e.target.dataset.name 
        removeItem(name, 1)
    }
}

itemList.onchange = function(e) {
    if (e.target && e.target.classList.contains('update')) {
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
        console.log(name, qty)


    }
}

function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i+=1){
        if( cart[i].name === name) {
            if(cart[i].qty < 1 ){
                removeItem(name)
                return
            }
            cart[i].qty = qty
            showItems()
            return
        }
    }
}

