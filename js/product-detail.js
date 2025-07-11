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


// lay du lieu cho trang product-detail 
const params = new URLSearchParams(window.location.search);

const productID = params.get('id');

const productDetail = products.find(item => {
  return Number(item.id) === Number(productID)
});
// console.log(productDetail);
if (productDetail) {
  const detailMain = document.querySelector('.detail-main');
  const sizeHTML = productDetail.sizes.map(item => {
    return `<option value="${item}">Size ${item}</option>`
  })
  let priceHTML = `<p class="price-detail">${productDetail.price.toLocaleString('vi-VN')} VND</p>`;
  if (productDetail.priceSale < productDetail.price ) {
    priceHTML = `<p class="price-detail">${productDetail.priceSale  .toLocaleString('vi-VN')} VND</p>`;
  }

  detailMain.innerHTML = `
            <div class="img-detail">
                <img src="${productDetail.imageURL}" alt="">
                <div class="product_overlay_detail"></div>
            </div>
            <div class="content-product">
                <p class="name-detail">${productDetail.name}</p>
                ${priceHTML}
                <div class="size-detail-drop">
                    <select name="" id="select-drop-size">
                        ${sizeHTML}
                    </select>
                </div>
                <p class="thanh-chan"></p>
                <div class="input-detail-product">
                    <label for="" class="content-sl">Số Lượng</label>
                    <span class="span-detail minus">-</span>
                    <input type="number" id="quantity-detail" name="quantity" min="1" value="1">
                    <span class="span-detail plus">+</span>
                </div>
                <button class="button-detail">Add to cart</button>
                <p class="thanh-chan"></p>
                <div class="mo-to-product">
                    <p class="mo-ta">Mô tả</p>
                    <ul class="description-detail">
                        <li>${productDetail.description}</li>
                    </ul>
                </div>
            </div>
`
}
// lam click tang them san pham
const inputPlus = document.querySelector('.plus');
const quantityDetail = document.getElementById('quantity-detail');
let quantity = 1
inputPlus.addEventListener('click', () => {
  quantity++;
  quantityDetail.value = quantity;
});

// lam click giam san pham 
const inputMinus = document.querySelector('.minus');
inputMinus.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    quantityDetail.value = quantity;
  }
})

// lay nhung san pham tuong tu va khong lay san pham da vo trang chi tiet 
const sameProduct = products.filter(item => {
  return item.categoryName === productDetail.categoryName && Number(item.id) !== Number(productID);
})
//
// so san pham se duoc suat hien vd nhu 3 san pham 
const currentProduct = 3
const productShirtSame = document.querySelector('.product-shirt-main-same')
function renderProduct(continer, start, end) {
  const showProduct = sameProduct.slice(start, end);
  showProduct.forEach(item => {
    const divEl = document.createElement('product-main');

    // phan biet gia ban va giam gia
    let priceHTML = `<p>${item.price.toLocaleString('vi-VN')}đ</p>`;
    if (item.priceSale < item.price) {
      priceHTML = `
      <p>${item.priceSale.toLocaleString('vi-VN')}đ</p>
      <p class="sale-m">${item.price.toLocaleString('vi-VN')}đ</p>
        `
    }
    // phan biet san pham nay co sale hay ko sale 
    let saleHTML = '';
    if (item.tags) {
      if (item.tags && item.tags.includes('sale 30%')) {
        saleHTML = `<div class="sale">sale 30%</div>`
      }
      else if (item.tags && item.tags.includes('sale 40%')) {
        saleHTML = `<div class="sale">sale 40%</div>`
      }
    }
    /// 
    divEl.innerHTML = `
        <div class="img_hidden">
            <a href="product-detail.html?id=${item.id}" class="img_box">
                <img src="${item.imageURL}" alt="shirt1" />
                <div class="product_overlay"></div>
                ${saleHTML}
            </a>
        </div>
            <a href="product-detail.html?id=${item.id}" class="product_name">${item.name}</a>
                <div class="money_sale">
                  ${priceHTML}
        </div>  
    `
    continer.appendChild(divEl)
  })
}
renderProduct(productShirtSame, 0, currentProduct)
// click hien xem the,
const loadMoreBtn = document.querySelector('#load-more-btn');
loadMoreBtn.addEventListener('click' ,() => {
  renderProduct(productShirtSame,currentProduct,sameProduct.length)
  loadMoreBtn.classList.add('hidden');
})
// khi mìn add to cart thi phải kiểm tra xem đã đăng nhập chưa , nếu chưa thì qua trang đăng nhâp j
const addToCart = document.querySelector('.button-detail');
addToCart.addEventListener('click', () => {
  const currentUser = localStorage.getItem('currentUser');
  const pareUser =JSON.parse(currentUser)
  if( !pareUser) {
    alert('Đăng nhập trước khi thêm vào giỏ hàng')
    window.location.href = 'login.html'
    return ;
  }
  if( !pareUser.isLogin) {
    alert('Đăng nhập trước khi thêm vào giỏ hàng')
    window.location.href = 'login.html'
    return ;
  }

  alert('Them vao gio hang thanh cong')
})