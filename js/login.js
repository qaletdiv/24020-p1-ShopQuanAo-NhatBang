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



const inputEmail = document.getElementById('email-login');
const inpurPassword = document.getElementById('password-login');

const buttonLogin = document.querySelector('.button-login');

buttonLogin.addEventListener('click' ,(even) => {
  even.preventDefault();
  const email = inputEmail.value.trim() ;
  const password = inpurPassword.value.trim() ;
  if( email === '' || password === '') {
    alert('khong duoc bo trong')
    return ;
  }
  const loadUser = localStorage.getItem('user') ;
  const user = JSON.parse(loadUser);
  const confirmUser = user.find(item => {
    return item.email === email && item.password === password ;
  })
  if( !confirmUser) {
    alert('email hoac mat khau khong dung');
    return ;
  }
  localStorage.setItem('curretnUser' , JSON.stringify({
    email : confirmUser.email ,
    password:confirmUser.password ,
    // user : confirmUser ,
    // isLogin : true ,
  }))
  alert('dang nhap thanh cong')
  window.location.href ='index.html'
} )
