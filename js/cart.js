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

/// them san pham vao gio hang
const currentCart = localStorage.getItem('cart')
const cart = currentCart ? JSON.parse(currentCart) : [];

const sectionCartRow = document.querySelector('.cart-row');

if (cart.length === 0) {
  sectionCartRow.innerHTML = `
  <p> Gio hang dang trong </p>
  `
}
else {
  // hine thi tieu de cua trang 
  const divELCarPage = document.createElement('div')
  divELCarPage.classList.add('cart-page-layout');
  divELCarPage.innerHTML=`
                <div class="cart-page_head">
                    <h1>Giỏ hàng của bạn</h1>
                    <p>Hiên đang có ${cart.length} sản phẩm</p>
                </div>
                <div class="cartformpage">
                    <div class="head-cart">
                        <div class="content-item">
                            <span>Sản phẩm</span>
                        </div>
                        <div class="quantity-item">
                            <span>Số lượng</span>
                        </div>
                        <div class="price-item">
                            <span class="span-price-cart">Số Tiền</span>
                        </div>
                    </div> 
                    <div class="content-cart">
                    </div>
  `
  sectionCartRow.appendChild(divELCarPage)
  ///
   const divContentCart = document.querySelector('.content-cart')
  cart.forEach(item => {
    const divEl = document.createElement('div')
    divEl.classList.add('cart-page-layout');
    // tin gia tong san cua 1 san pham 
    const price = item.price.replace(/[^\d]/g, '');
  
    const totalPrice = Number(item.quantity) * Number(price);
    divEl.innerHTML = `
            
                        <div class="content-cart-page">
                            <div class="content-item img-cart">
                                <img src="${item.img}" alt="">

                                <div class="content-cart-product">
                                    <p>Mã sản phẩm : ${item.id}</p>
                                    <h1>${item.name}</h1>
                                    <button class="button-cart-remove">Remove</button>
                                </div>
                            </div>
                            <div class="quantity-item">
                                <input type="number" class="quantity-cart" name="quantity" min="1" value="${item.quantity}">
                            </div>
                            <div class="price-item price-cart ">
                                <span> ${totalPrice.toLocaleString('vi-VN')} đ</span>
                            </div>
                        </div>
                        
                        
    `
    divContentCart.appendChild(divEl)
  });
// tinh tong so tien cua san pham
  function tinhTongSoTien (cart) {
    let total = 0
    cart.forEach(item => {
    const price = item.price.replace(/[^\d]/g, '');
    total += (Number(item.quantity) * Number(price));
    })
    return total ;

  }
  // console.log(tinhTongSoTien(cart))

  const cartFormPage = document.querySelector('.cartformpage');
  const divTotal = document.createElement('div');
  divTotal.classList.add('total-cart');
  divTotal.innerHTML =`
          <span>Tổng tiền :</span>
          <p class="total-price"> ${tinhTongSoTien(cart).toLocaleString('vi-VN')}đ</p>  
  `
  cartFormPage.appendChild(divTotal)

  // tien hanh den trang thanh toan
  const divCheckOut = document.createElement('div');
  divCheckOut.classList.add('checkout-cart')
  divCheckOut.innerHTML=`
  <button class="button-checkout-cart">Thanh toán sản phẩm</button>
  `
  cartFormPage.appendChild(divCheckOut);
  // remove san pham 
  const buttonDelete = document.querySelector('.button-cart-remove');
  buttonDelete.addEventListener('click' ,(even) => {
    const deleteButton = even.target;
    const contentCart = deleteButton.parentElement;
    const contenItem = contentCart.parentElement;
    const contentCartPage = contenItem.parentElement;
    // deleteButton.classList.add('hidden')
    const isConfirm = confirm('ban chac chan muon xoa san pham nay')

    if(isConfirm) {
      contentCartPage.remove();
      // localStorage.removeItem('cart')
    }
  } )
  // chuyen sang trang thanh toan
  divCheckOut.addEventListener('click' ,() => {

    window.location.href =`checkout.html`
  })
}