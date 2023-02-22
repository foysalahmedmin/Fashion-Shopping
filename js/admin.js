// Add form collapsing according to admin btn;
document.getElementById("admin-btn").addEventListener("click", function() {
    this.classList.toggle("active");
    // var content = this.nextElementSibling;
    let content = document.getElementById("add-container");
    if (content.style.maxHeight){
    content.style.maxHeight = null;
    } else {
    content.style.maxHeight = content.scrollHeight + "px";
    } 
});

// take image ;
let url ; //temporary stor new image url ;
document.getElementById("imageInput").onchange = function (){
    const reader = new FileReader()
    reader.onload = function imgUrl(){
    let imageUrl = reader.result ;
    url = imageUrl ;
    document.querySelector(".imageInputField").classList.add("active");
}; 
reader.readAsDataURL(imageInput.files[0]) ;
}

// Add a new card according to Card "addToCard" button ;
document.getElementById("productAddBtn").onclick = function(){
    const imageUrl = url ;
    const imageValue = document.getElementById("imageInput").value ;
    const productNameInput = document.getElementById("productNameInput").value;
    const productColorInput = document.getElementById("productColorInput").value;
    const productDetailsInput = document.getElementById("productDetailsInput").value;
    const productStockInput = document.getElementById("productStockInput").value;
    const productPriceInput = document.getElementById("productPriceInput").value;
    if(productNameInput == "" || productColorInput == "" || productDetailsInput == "" || productStockInput == "" || productPriceInput == ""|| imageValue == "" ){
        alert("Your Input is missing;")
        return false ;
    }

    newCardAdd(imageUrl, productNameInput, productColorInput, productDetailsInput, productStockInput, productPriceInput );

    document.getElementById("imageInput").value = '';
    document.getElementById("productNameInput").value = '';
    document.getElementById("productColorInput").value = '';
    document.getElementById("productDetailsInput").value = '';
    document.getElementById("productStockInput").value = '' ;
    document.getElementById("productPriceInput").value = '' ;

    document.querySelector(".imageInputField").classList.remove("active");
}


// set a new card ;
let productIdNo = 9 ; 
function newCardAdd(imageUrl, productName, productColor, productDetails, productStock, productPrice ){
    productIdNo += 1;
    let productID = "card-" + productIdNo ;
    const productsField = document.getElementById("product-items");
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class" , "card");
    cardDiv.setAttribute("id" , productID);
    
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