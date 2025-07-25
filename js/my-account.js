import { user } from './products.data.js';

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
const infoUserCheckOut = localStorage.getItem('checkoutForm');
const infoUsers = infoUserCheckOut ? JSON.parse(infoUserCheckOut) : [];

const infoContainer = document.querySelector('.container');

infoUsers.forEach(user => {
    const divElMyAccount = document.createElement('div');
    divElMyAccount.classList.add('div-my-account');
    divElMyAccount.innerHTML = `
                 <div class="info">
                        <h3>Thông tin cá nhân</h3>
                        <div class="content-info">
                            <p><strong>Họ và tên:</strong> <span id="fullName">${user.name}</span></p>
                            <p><strong>Email:</strong> <span id="email">${user.email}</span></p>
                        </div>
                    </div>

                    <div class="orders">
                        <h3>Lịch sử đặt hàng</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>    
                                    <th>Ngày đặt</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody id="orderHistory">
                                <tr>
                                    <td>${user.id}</td>    
                                    <td>${new Date(user.date).toLocaleString('vi-VN')}</td>
                                    <td>${user.total}</td>
                                    <td>ok</td>
                                </tr>
    
                            </tbody>
                        </table>
                        <button class="delete-account">delete</button>
                    </div>
    `;
    infoContainer.appendChild(divElMyAccount);

    ////
    const deleteBtn = divElMyAccount.querySelector('.delete-account');

    deleteBtn.addEventListener('click', () => {
        const updatedUsers = infoUsers.filter(account => account.email !== user.email);
        localStorage.setItem('checkoutForm', JSON.stringify(updatedUsers));

        divElMyAccount.remove();

        alert('Đã xoá thông tin người dùng');

    });

});
// dnag nhap truoc khi vo trang tai khoang cua toi 
const currentUser = localStorage.getItem('currentUser');
  const pareUser = JSON.parse(currentUser)
  if (!pareUser) {
    alert('Bạn phải đăng nhập trước khi vô trang')
    window.location.href = 'login.html'
    // return;
  }



// console.log(JSON.parse(localStorage.getItem('checkoutForm')));
