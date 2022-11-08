
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
        urlImage:"./assets/img/featured3.png",
    }
]


const iconMenu = document.querySelector(".bx-grid-alt");
const menu = document.querySelector(".menu");
const contentCartShopItems = document.querySelector(".contentCartShop__items");
const bxMoon = document.querySelector(".bx-sun");
const toggleLight =document.querySelector(".toggle__light");
const contentClothes = document.querySelector(".contentClothes");

iconMenu.addEventListener("click", function () {
    console.log(menu.classList.toggle("menu-show"));
});
const navbarIcons= document.querySelector(".navbar__icons");
    navbarIcons.addEventListener("click",(e)=>{
   if(e.target.classList.contains("bx-moon")){
    let html=""
    html=`
    <i class='bx bx-sun'></i>`
    toggleLight.innerHTML= html
   }
   if( e.target.classList.contains("bx-sun")){
    let html=""
    html=`
    <i class='bx bx-moon'></i>`
    toggleLight.innerHTML= html
   }
});

let objCartShop={};

function printClothes(){
    let html="";
    clothes.forEach(({id, name, price, stock, urlImage})=>{
    html +=`
    <div class="clothes ${name}" >
    <div class="clothes__img">
        <img src="${urlImage}" alt="${name}">
    </div>
    <div class="clothes__descripcion">
        <div class="clothes__body">
            <p class="clothes__price"><strong>$${price}</strong></p> 
            <p class="clothes__stock" > <strong>| - stock:${stock}</strong></p>
        </div>
        <h3>${name}</h3>
        <div class="clothes__options">
            <button class="btn btn__add" id="${id}">Agregar</button>
        </div>
     </div>   
    </div>`
contentClothes.innerHTML= html
});

}
printClothes();


function printClothesInCart() {
    let html = "";

    const arrayCartShop = Object.values(objCartShop);

    arrayCartShop.forEach(({ id, name, price, amo, urlImage }) => {
        html += `
            <div class="clothes">
            <div class="clothes__img">
                <img src="${urlImage}" alt="${name}">
            </div>
            <div class="clothes__body">
                <h3>${name}</h3>
                <p><span>$${price}</span> - cant: <strong>${amo}</strong></p>
            </div>
            <div class="clothes__options">
                <button class="btn btn__rest" id="${id}">-</button>
                <button class="btn btn__add" id="${id}">+</button>
                <button class="btn btn__del" id="${id}">del</button>
            </div>
        </div>
        `;
    });

    contentCartShopItems.innerHTML = html;
}


contentClothes.addEventListener("click",(e)=>{
if(e.target.classList.contains("btn__add")){
    const idClothes = Number(e.target.id);
    const currentClothes= clothes.find((clothe) => clothe.id ==idClothes)
    if(objCartShop[currentClothes.id])
    {objCartShop[currentClothes.id].amo++;

    }else{
        objCartShop[currentClothes.id]= currentClothes;
        objCartShop[currentClothes.id].amo=1;
    }
    printClothesInCart();
}

})
contentCartShopItems.addEventListener("click",(m)=>{
    if (m.target.classList.contains("btn__add")) {
        const idClothe = Number(m.target.id);
        if(objCartShop[idClothe].amo<objCartShop[idClothe].stock){
            objCartShop[idClothe].amo++;
        }
        if(objCartShop[idClothe].amo==objCartShop[idClothe].stock){
            alert("no hay mas elementos en el carrito")
        }
        
    }
    if (m.target.classList.contains("btn__rest")) {
        const idClothe = Number(m.target.id)
        if(objCartShop[idClothe].amo>0){
            objCartShop[idClothe].amo--;
        }
    }
    if (m.target.classList.contains("btn__del")) {
        const idClothe = Number(m.target.id)
        const op =confirm("seguro que quieres eliminar?")
        if(op)delete objCartShop[idClothe];
    }
    printClothesInCart();
    })

const icontCart = document.querySelector(".bag");
const contentCartShop = document.querySelector(".contentCartShop");


icontCart.addEventListener("click",()=>{
    contentCartShop.classList.toggle("contentCartShop__show");
})