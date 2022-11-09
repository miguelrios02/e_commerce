
let clothes =[
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

window.addEventListener("load",function (){
    const loading = this.document.querySelector(".loading");
    
    setTimeout(()=>{
        loading.style.display="none";
    },1500);
})

const iconMenu = document.querySelector(".bx-grid-alt");
const menu = document.querySelector(".menu");
const contentCartShopItems = document.querySelector(".contentCartShop__items");
const bxMoon = document.querySelector(".bx-sun");
const toggleLight =document.querySelector(".toggle__light");
const contentClothes = document.querySelector(".contentClothes");
const contentCartShopTotal =document.querySelector(".contentCartShop__total");
const icontCart = document.querySelector(".bag");
const contentCartShop = document.querySelector(".contentCartShop");
const countBag = document.querySelector(".count__bag");
const navbarIcons= document.querySelector(".navbar__icons");
let objCartShop={};

function addClothes(idClothe){
    const currentClothes= clothes.find((clothe) => clothe.id ==idClothe)
    if(currentClothes.stock=== objCartShop[idClothe].amo)
    return alert("We don not have enough in stock");

    objCartShop[currentClothes.id].amo++;
}

function deleteClothes(idClothe){
     const op =confirm("seguro que quieres eliminar?")
    if(op)delete objCartShop[idClothe];
}
function countProduct(){
    const arrayCartShop = Object.values(objCartShop);
    let suma =arrayCartShop.reduce((acum,curr)=>{
        acum += curr.amo;
        return acum;
    },0);
    countBag.textContent=suma;
}
function printTotal(){
    const arrayCartShop = Object.values(objCartShop);
if(!arrayCartShop.length) return (contentCartShopTotal.innerHTML= `<h3>carrito bacio</h3>`)

let total =arrayCartShop.reduce((acum,curr)=>{
    acum = curr.price * curr.amo;
    return acum;
},0);
contentCartShopTotal.innerHTML=`
<h3>${total}</h3>
<button class="btn btn__buy">Comprar</button>
`;
}
function printClothes(){
    let html="";
    clothes.forEach(({id, name, price, stock, urlImage})=>{
    const btnBuy =stock
    ?`<button class="btn btn__add" id="${id}">Agregar</button>`
    :`<button class="btn"> No disponible</button>`;
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
            ${btnBuy}
        </div>
     </div>   
    </div>`
contentClothes.innerHTML= html
});

}

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
    printTotal();
    countProduct();
}
contentClothes.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btn__add")){
        const idClothes = Number(e.target.id);
        const currentClothes= clothes.find((clothe) => clothe.id ==idClothes)
        if(objCartShop[currentClothes.id])
        {addClothes(idClothes)
    
        }else{
            objCartShop[currentClothes.id]= {...currentClothes};
            objCartShop[currentClothes.id].amo=1;
        }
        printClothesInCart();
    }
    
    })
contentCartShopItems.addEventListener("click",(m)=>{
    if (m.target.classList.contains("btn__add")) {
            const idClothe = Number(m.target.id);
            addClothes(idClothe)
            
    }
    if (m.target.classList.contains("btn__rest")) {
        const idClothe = Number(m.target.id)
        if(objCartShop[idClothe].amo===1){
            alert("quieres eliminar");
            deleteClothes(idClothe);
        }else{
            objCartShop[idClothe].amo--;
        }
    }
    if (m.target.classList.contains("btn__del")) {
        const idClothe = Number(m.target.id)
        deleteClothes(idClothe);
    }
    printClothesInCart();
}) 
icontCart.addEventListener("click",()=>{
    contentCartShop.classList.toggle("contentCartShop__show");
})   

contentCartShopTotal.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btn__buy")){
        const op = confirm("estas seguro de esto?")
        if(op){
           clothes= clothes.map((clothe)=>{
                if(objCartShop[clothe.id]?.id === clothe.id){
                    return{
                        ...clothe,
                        stock:clothe.stock - objCartShop[clothe.id].amo,
                    };

                }else{
                    return clothe;

                }
            });
            objCartShop={};
            printClothes();
            printClothesInCart();
        }
    }
})
printClothes();
printTotal();

iconMenu.addEventListener("click", function () {
    console.log(menu.classList.toggle("menu-show"));
});

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






