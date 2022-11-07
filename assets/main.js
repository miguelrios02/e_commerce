const clothes =[
    {
        id:0,
        name: "Hoodies",
        price: 1200,
        stock:5,
        urlImage:"./assets/img/featured1.png"
    },
    {
        id:1,
        name: "Shirts",
        price: 1009,
        stock:7,
        urlImage:"./assets/img/featured2.png"
    },
    {
        id:2,
        name: "Sweatshirts",
        price: 1300,
        stock:2,
        urlImage:"./assets/img/featured3.png"
    }
]


const iconMenu = document.querySelector(".bx-grid-alt");
const menu = document.querySelector(".menu");

iconMenu.addEventListener("click", function () {
    console.log(menu.classList.toggle("menu-show"));
});

const contentClothes = document.querySelector(".contentClothes");



let html=""
clothes.forEach(({id, name, price, stock, urlImage})=>{
   html +=`
   <div class="clothes">
        <div class="clothes__img">
            <img src="${urlImage}" alt="${name}">
        </div>
        <div class="clothes__body">
            <h3>${name}</h3>
            <p><span>$${price}</span> - stock:${stock} </p>
        </div>
        <div class="clothes__options">
            <button class="btn btn__add" id="${id}">Agregar</button>
        </div>
</div>`
});

contentClothes.innerHTML= html

console.log(contentClothes);
const icontCart = document.querySelector(".bx-shopping-bag");
const contentCartShop = document.querySelector(".contentCartShop");

icontCart.addEventListener("click",()=>{
    contentCartShop.classList.toggle("contentCartShop__show")
})