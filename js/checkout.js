import { imagesList, products } from './products.data.js';

//
const openPopup = document.querySelector(".open-popup");
const navigationPopup = document.querySelector(".navigation-popup");
const closePopup = document.querySelector(".delete-navigation");
const imgBannerPopup = document.querySelector(".img-banner-overlod-navigation");
//
const navigationSit = document.querySelector(".navigation-sit");
const menuSub = document.querySelector(".menu-sub1");
const navigationUp = document.querySelector(".navigation-up");
//nút input tìm kiếm
const openInput = document.querySelector(".open-input");
const openInputFind = document.querySelector(".input-find");

openPopup.addEventListener("click", () => {
  navigationPopup.classList.add("navigation-popup--open");
});

closePopup.addEventListener("click", () => {
  navigationPopup.classList.remove("navigation-popup--open");
});
imgBannerPopup.addEventListener("click", () => {
  navigationPopup.classList.remove("navigation-popup--open");
});

//
navigationSit.addEventListener("click", () => {
  menuSub.classList.add("menu-sub1--open");
  navigationSit.classList.add("hidden");
  navigationUp.classList.remove("hidden");
});

// })
navigationUp.addEventListener("click", () => {
  menuSub.classList.remove("menu-sub1--open");
  navigationUp.classList.add("hidden");
  navigationSit.classList.remove("hidden");
});
//
openInput.addEventListener("click", () => {
  openInputFind.classList.remove("hidden");
});
const closeInputFind = document.querySelector('.input-find');

closeInputFind.addEventListener('blur', () => {
  closeInputFind.classList.add('hidden')
});

const currentCart = localStorage.getItem('cart')
const cart = currentCart ? JSON.parse(currentCart) : [];

const divInformation = document.querySelector('.div-information');
if (divInformation) {
  cart.forEach(item => {
    const divCartCheckout = document.createElement('div')
    divCartCheckout.classList.add('cart-checkout-page');
    divCartCheckout.innerHTML = `
        <div class="cart-page-check">
              <img class="img-cart-checkout" src="${item.img}" alt="">
              <div class="content-checkout">
                  <div class="content-size-quantity">
                      <p class="checkout-size">Size: ${item.sizes}</p>
                      <p class="checkout-quantity">Số lượng: ${item.quantity}</p>
                  </div>
                  <p class="checkout-name">${item.name}</p>
              </div>
          </div>
  `
    divInformation.appendChild(divCartCheckout)
  });
}

const totalPrice = cart.reduce((total, item) => {
    const price = item.price.replace(/[^\d]/g, '');
     total += (Number(price) * Number(item.quantity));
  return total ;
},0);

const divtTotalCheckout = document.createElement('div');
divtTotalCheckout.classList.add('total-checkout-content')
divtTotalCheckout.innerHTML =`
<p class="total-checkout">Tổng tiền: ${totalPrice.toLocaleString('vi-VN')} đ </p>
`
divInformation.appendChild(divtTotalCheckout)