
//***************** REMOVE BUTTON CART */

var removeCartItemButtons = document.getElementsByClassName("btn-danger");

//**loop inside all buttons inside cart */
for (var i = 0; i < removeCartItemButtons.length; i++) {
    //button es igual a cualquier elemento que estemos en
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();

}

//***************** CHANGE QUANTITY */

var quantityInputs = document.getElementsByClassName('cart-quantity-input')
console.log(quantityInputs)

for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}


//***************** UPDATE CART TOTAL */

//1. iterate through every row in cart
//2. find price
//3. multiply price by quantity
//4. add that together for every row
//5. display sum in 'total'
function updateCartTotal() {
    //cart items wraps all rows. and the first one
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')

    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        
        console.log(priceElement, quantityElement)
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value //parseInt(quantityElement.getAttribute("value"))

        total = total + (price * quantity)

        console.log(total)
    }

    // total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = `$ ${total}`
}


//***************** ADD TO CART */
//shop-item-button

var addToCartButtons = document.getElementsByClassName('shop-item-button')
console.log(addToCartButtons)

for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement

    var title = shopItem.getElementsByClassName('product-title')[0].innerText;
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imgSrc = shopItem.getElementsByClassName('img-product')[0].src
    console.log(title, price, imgSrc)

    addItemToCart(title, price, imgSrc)

    //que se actualice total luego de agregar nuevo item
    updateCartTotal()
    
}

function addItemToCart(title, price, imgSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]

    //Avoid repeaeting add to cart product
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    console.log(cartItemNames)
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Producto ya esta en el carrito de compras')
            return
        }
    }

    var cartRowContents = `
        <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">ELIMINAR</button>
    </div>
    `

    cartRow.innerHTML = cartRowContents;

    cartItems.append(cartRow)

    //lograr que funcione remove button de item agregado
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)

    //lo mismo con quantity input
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

}


//***************** BUY ITEM */

var buyButton = document.getElementsByClassName('btn-purchase')[0]

buyButton.addEventListener('click', purchaseItem)

function purchaseItem(event) {
    let accessTotal = document.getElementsByClassName('cart-total-price')[0];

    var total = parseFloat(accessTotal.innerText.replace('$', ''))

    console.log(total)

    if(total <= 0) {
        alert('No hay productos en el carrito')
        return
    }

    if (total > 0) {  
     let buy = confirm(`El monto total es $${total}. Al hacer click en 'ok' seras redirigdo para realizar el pago.`)

     //eliminar productos al click en 'ok'
     if(buy) {
        var cartItems = document.getElementsByClassName('cart-items')[0]

        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }

        updateCartTotal()

     }
    
    }
}



