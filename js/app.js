function ID(IdName){
    document.getElementById(IdName);
}



document.getElementById("product-items").onclick = function(event){
    const findAddToCartBtn = event.target.getAttribute("class");
    if(findAddToCartBtn == "addToCart"){
        
        const id = event.target.parentNode.parentNode.getAttribute("id");
        const productName = event.target.parentNode.children[0].innerText ;
        const productColor = event.target.parentNode.children[1].innerText ;
        const productStock = event.target.parentNode.children[3].children[0].children[0].innerText
        const productPrice = +event.target.parentNode.children[3].children[1].children[0].children[0].innerText ;
        displayData(id, productName, productColor, productStock, productPrice);
        event.target.setAttribute("class" , "added");
        event.target.innerText = "Cancel" ;
        
        totalPriceCalculations()
    }
    else if(findAddToCartBtn == "added"){
        const id = event.target.parentNode.parentNode.getAttribute("id");
        const carts = document.getElementsByClassName('cart-data');
        for(let i = 0; i < carts.length; i++){
            const idTarget = carts[i].getAttribute("target-id");
            if(id == idTarget){
                carts[i].remove();
                event.target.setAttribute("class" , "addToCart");
                event.target.innerHTML = `Add to Cart <i class="fa-solid fa-cart-plus"></i>` ;
                totalPriceCalculations()
            }
        }
    }
}

function displayData (idOfp, nameOfP, colorOfp, stockOfp, priceOfP){
    const cartContainer = document.getElementById("cart-container");
    const tr = document.createElement("tr");
    tr.setAttribute("class" , "cart-data");
    tr.setAttribute("target-id" , idOfp);
    tr.innerHTML = `
    <td class= "serial"> ${1} </td>
    <td> ${nameOfP} </td>
    <td> ${colorOfp} </td>
    <td> $<span class= "pPriceCart">${priceOfP}</span></td>
    <td> ${idOfp} </td>
    <td class= "pQuantityCart"><i class="fa-solid fa-minus qntBtn" target= "decreaseBtn"></i> <input id="QuantityValue" type="number" min="1" max = ${stockOfp} value="1"> <i class="fa-solid fa-plus qntBtn" target= "increaseBtn"></i> </td>
    <td >$<span class= "pTotalPriceCart">${priceOfP}</span></td>
    <td><i class="fa-regular fa-trash-can removeCart" target= "removeCart"></i></td>
    ` ;
    cartContainer.appendChild(tr) ;

}


document.getElementById("cart-container").onclick = function(event){
    const Target = event.target.getAttribute("target");
    if(Target == "removeCart"){
        const selectTr = event.target.parentNode.parentNode ;
        selectTr.parentNode.removeChild(selectTr) ;
        totalPriceCalculations()
    }else if(Target == "decreaseBtn" || Target == "increaseBtn" ){
        const qntValue = +event.target.parentNode.children[1].value ;
        const limitStock = +event.target.parentNode.children[1].getAttribute("max") ;
        // Single cart total price value;
        const TotalPriceCart = event.target.parentNode.parentNode.children[6].children[0];
        const productPrice = +event.target.parentNode.parentNode.children[3].children[0].innerText ;
        if(Target == "decreaseBtn" && qntValue > 1 ){
            const updateValue = qntValue - 1 ;
            event.target.parentNode.children[1].value = updateValue ;

            // Single cart total price update ;
            const updateTotalPrice = updateValue * productPrice ;
            TotalPriceCart.innerText = updateTotalPrice ;
        }else if(Target == "increaseBtn" && qntValue < limitStock){
            const updateValue = qntValue + 1 ;
            event.target.parentNode.children[1].value = updateValue ;

            // Single cart total price update ;
            const updateTotalPrice = updateValue * productPrice ;
            TotalPriceCart.innerText = updateTotalPrice ;
        }else{
            if(Target == "increaseBtn"){
                alert("Stock Limited...!");
            }
        }
        totalPriceCalculations() ;
        console.log(TotalPriceCart.innerText) ;
    }
}

function totalPriceCalculations(){
    const totalPrice = document.getElementById("total-price-value");
    let updateTotalPriceValue = 0;
    let serialNo = 0
    const cartPrices = document.querySelectorAll(".pTotalPriceCart");
    const serialNoFiled = document.getElementsByClassName("serial");
    for(let i = 0; i < serialNoFiled.length; i ++){
        let priceValue = +cartPrices[i].innerText;
        updateTotalPriceValue += priceValue;
        serialNo += 1 ;
        serialNoFiled[i].innerText = serialNo ;
    }
    totalPrice.innerText = updateTotalPriceValue;
    setDiscountPrice ()
}

document.getElementById("test").onclick = function(){
    totalPriceCalculations();
}

document.getElementById('promoCode').addEventListener("keypress" , function (event){
    if(event.key == 'Enter'){
        const totalPriceField = document.getElementById("total-price-value")
        const totalPrice = +totalPriceField.innerText;
        const discountField = document.getElementById("discount-value");
        const promoCode = document.getElementById('promoCode') ;
        const promoCodeValue = promoCode.value ; 
        const discount10 =  "10% discount deee!"
        const discount20 =  "20% discount deee!"
        const discount30 =  "30% discount deee!"
        if(promoCodeValue === discount10){
            const discountValue = totalPrice * 0.1 ;
            discountField.innerText = discountValue ;
        }else if(promoCodeValue === discount20){
            const discountValue = totalPrice * 0.2 ;
            discountField.innerText = discountValue ;
        }else if(promoCodeValue === discount30){
            const discountValue = totalPrice * 0.3 ;
            discountField.innerText = discountValue ;
        }else{
            discountField.innerText = "00" ;
        }
        this.value = '';
        setDiscountPrice ()
    }
    
}) 
function setDiscountPrice (){
    const totalPriceField = document.getElementById("total-price-value")
    const totalPrice = +totalPriceField.innerText;
    const discount = +document.getElementById("discount-value").innerText ;
    totalPriceField.innerText = totalPrice - discount ;
}

let url ;
document.getElementById("imageInput").onchange = function (){
    const reader = new FileReader()
    reader.onload = function imgUrl(){
    let imageUrl = reader.result ;
    document.getElementById("filed").innerText = imageUrl;
    url = imageUrl ;
}; 
reader.readAsDataURL(imageInput.files[0]) ;
}


document.getElementById("productAddBtn").onclick = function(){
    const imageUrl = url ;
    const productNameInput = document.getElementById("productNameInput").value;
    const productColorInput = document.getElementById("productColorInput").value;
    const productDetailsInput = document.getElementById("productDetailsInput").value;
    const productStockInput = document.getElementById("productStockInput").value;
    const productPriceInput = document.getElementById("productPriceInput").value;

    console.log(imageUrl, productNameInput, productColorInput, productDetailsInput, productStockInput, productPriceInput) ;

    newCardAdd(imageUrl, productNameInput, productColorInput, productDetailsInput, productStockInput, productPriceInput );

    document.getElementById("imageInput").value = '';
    document.getElementById("productNameInput").value = '';
    document.getElementById("productColorInput").value = '';
    document.getElementById("productDetailsInput").value = '';
    document.getElementById("productStockInput").value = '' ;
    document.getElementById("productPriceInput").value = '' ;
}


let productIdNo = 9 ;
function newCardAdd(imageUrl, productName, productColor, productDetails, productStock, productPrice ){
    productIdNo += 1;
    let productID = "card-" + productIdNo ;
    const productsField = document.getElementById("product-items");
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class" , "card");
    cardDiv.setAttribute("id" , "card-" + productID);
    
    cardDiv.innerHTML = `
    <img src= ${imageUrl} >
    <div class="contents">
        <h3 class="productName"> ${productName} </h3>
        <h5>Color: <span class="color"> ${productColor} </span></h5>
        <p class="paragraph"> ${productDetails} </p>
        <div class="stock-price">
            <P>Stock: <span class="stock"> ${productStock} </span></P>
            <p>Price: <span>$<span class="price"> ${productPrice} </span></span></p>
        </div>
        <button class="addToCart">Add to Cart <i class="fa-solid fa-cart-plus"></i></button>
    </div>
    `;
    

    productsField.appendChild(cardDiv) ;
}